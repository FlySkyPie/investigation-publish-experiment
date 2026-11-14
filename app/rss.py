import argparse
import re
import sys
from datetime import datetime, timezone
from email.utils import format_datetime
from pathlib import Path
from urllib.parse import quote
from xml.etree import ElementTree as ET

import requests

from app.patch_export import PatchError, normalize_base_href
from app.setting import settings

__all__ = [
    "fetch_note",
    "fetch_note_content",
    "list_notes",
    "note_description",
    "build_feed",
    "write_feed",
    "main",
]

DEFAULT_PARENT_NOTE_ID = "root"
DEFAULT_OUTPUT_DIR = Path("downloads")
DEFAULT_TIMEOUT = 300.0
DEFAULT_LIMIT = 25
FEED_FILENAME = "rss.xml"
FEED_TITLE = "Trilium investigation results"
FEED_DESCRIPTION = "Exported Trilium notes as an RSS 2.0 feed."
FEED_GENERATOR = "app.rss"
HTML_SUFFIX = ".html"
DESCRIPTION_LIMIT = 400
TTL_MINUTES = 60
_EPOCH = datetime(1970, 1, 1, tzinfo=timezone.utc)

# Trilium hands out UTC timestamps in a few different spellings depending on
# the note field and server version, so try each before giving up.
_DATE_FORMATS = (
    "%Y-%m-%d %H:%M:%S.%f%z",
    "%Y-%m-%d %H:%M:%S%z",
    "%Y-%m-%d %H:%M:%S.%f",
    "%Y-%m-%d %H:%M:%S",
    "%Y-%m-%dT%H:%M:%S.%f%z",
    "%Y-%m-%dT%H:%M:%S%z",
    "%Y-%m-%dT%H:%M:%S.%f",
    "%Y-%m-%dT%H:%M:%S",
)

_FOOTNOTE = re.compile(r"\[\^[^\]]+\]")
_LINK = re.compile(r"\[([^\]]*)\]\([^)]*\)")
_WHITESPACE = re.compile(r"\s+")


class RsError(RuntimeError):
    pass


def _url(path: str) -> str:
    return f"{settings.trilium_url.rstrip('/')}/etapi/{path.lstrip('/')}"


def _headers() -> dict[str, str]:
    headers = {"Accept": "application/json"}
    if settings.trilium_token:
        headers["Authorization"] = f"Bearer {settings.trilium_token}"
    return headers


def _describe_error(action: str, response: requests.Response) -> str:
    try:
        payload = response.json()
    except ValueError:
        payload = None

    if isinstance(payload, dict) and "message" in payload:
        code = payload.get("code", "UNKNOWN")
        return f"{action} failed ({response.status_code} {code}): {payload['message']}"

    return f"{action} failed with HTTP {response.status_code} {response.reason}"


def fetch_note(note_id: str, timeout: float = DEFAULT_TIMEOUT) -> dict:
    response = requests.get(
        _url(f"notes/{note_id}"), headers=_headers(), timeout=timeout
    )
    if not response.ok:
        raise RsError(f"note {note_id}: {_describe_error('get note', response)}")

    note = response.json()
    if not isinstance(note, dict):
        raise RsError(f"note {note_id}: unexpected response payload")
    return note


def fetch_note_content(note_id: str, timeout: float = DEFAULT_TIMEOUT) -> str:
    response = requests.get(
        _url(f"notes/{note_id}/content"), headers=_headers(), timeout=timeout
    )
    if not response.ok:
        raise RsError(f"note {note_id}: {_describe_error('get content', response)}")

    return response.text


def list_notes(
    parent_note_id: str = DEFAULT_PARENT_NOTE_ID,
    timeout: float = DEFAULT_TIMEOUT,
) -> list[dict]:
    """Walk the note tree, returning every note below ``parent_note_id`` in order."""
    notes: list[dict] = []
    visited: set[str] = set()

    def visit(note_id: str, path: list[str]) -> None:
        if note_id in visited:
            return
        visited.add(note_id)

        note = fetch_note(note_id, timeout=timeout)
        title = note.get("title") or note_id
        children = note.get("childNoteIds") or []

        if note_id == parent_note_id:
            # The parent is the export root rather than a page of its own, so it
            # contributes no path segment to its descendants.
            child_path = []
        else:
            notes.append(
                {
                    "noteId": note_id,
                    "title": title,
                    "path": path,
                    "modified": note.get("utcDateModified") or note.get("dateModified"),
                    "hasChildren": bool(children),
                }
            )
            child_path = path + [title]

        for child_id in children:
            visit(child_id, child_path)

    visit(parent_note_id, [])
    return notes


def _plain_text(text: str) -> str:
    text = _FOOTNOTE.sub("", text)
    text = _LINK.sub(r"\1", text)
    for marker in ("**", "__", "`", "*", "_"):
        text = text.replace(marker, "")
    return _WHITESPACE.sub(" ", text).strip()


def note_description(title: str, content: str) -> str:
    """Return a short synopsis, never the full body.

    A feed item carries a teaser and links to the exported page for the rest,
    so the description stops at the first meaningful paragraph and is trimmed
    to ``DESCRIPTION_LIMIT`` characters on a word boundary.
    """
    lines = content.splitlines()

    for index, line in enumerate(lines):
        stripped = line.strip()
        if not stripped or stripped.startswith(("#", ">", "|", "```", "---")):
            continue

        paragraph = []
        for following in lines[index:]:
            if not following.strip():
                break
            paragraph.append(following.strip())

        text = _plain_text(" ".join(paragraph))
        if text:
            return _truncate(text)

    return title


def _truncate(text: str) -> str:
    if len(text) <= DESCRIPTION_LIMIT:
        return text

    clipped = text[:DESCRIPTION_LIMIT].rstrip()
    head, separator, _ = clipped.rpartition(" ")
    if separator and head:
        clipped = head
    return clipped.rstrip(" .,;:") + "..."


def _link(base_href: str, note: dict) -> str:
    segments = [*note["path"], note["title"]]
    path = "/".join(quote(segment) for segment in segments) + HTML_SUFFIX
    return base_href + path


def _parse_date(value: str | None) -> datetime | None:
    if not value:
        return None

    text = str(value).strip()
    for fmt in _DATE_FORMATS:
        try:
            parsed = datetime.strptime(text, fmt)
        except ValueError:
            continue
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)

    return None


def build_feed(
    parent_note_id: str = DEFAULT_PARENT_NOTE_ID,
    base_url: str | None = None,
    timeout: float = DEFAULT_TIMEOUT,
    limit: int | None = DEFAULT_LIMIT,
) -> ET.Element:
    base_href = normalize_base_href(
        base_url if base_url is not None else settings.export_base_url
    )

    rss = ET.Element("rss", {"version": "2.0"})
    channel = ET.SubElement(rss, "channel")
    ET.SubElement(channel, "title").text = FEED_TITLE
    ET.SubElement(channel, "link").text = base_href
    ET.SubElement(channel, "description").text = FEED_DESCRIPTION
    ET.SubElement(channel, "generator").text = FEED_GENERATOR
    ET.SubElement(channel, "lastBuildDate").text = format_datetime(
        datetime.now(timezone.utc)
    )
    # The feed is a rolling window of recent notes, not a full archive, so it
    # tells aggregators how long a channel may be cached before refetching.
    ET.SubElement(channel, "ttl").text = str(TTL_MINUTES)

    notes = list_notes(parent_note_id=parent_note_id, timeout=timeout)
    # A feed reports what changed lately, so surface the newest notes first and
    # stop once enough items have been emitted, rather than dumping the whole
    # notebook. The limit counts emitted items, not candidates.
    notes.sort(key=lambda note: _parse_date(note["modified"]) or _EPOCH, reverse=True)

    seen_links: set[str] = set()
    emitted = 0
    for note in notes:
        if limit is not None and limit >= 0 and emitted >= limit:
            break

        location = _link(base_href, note)
        # Notes with the same title share one page in the static export, so
        # keeping both would emit duplicate links and guid values.
        if location in seen_links:
            continue

        content = fetch_note_content(note["noteId"], timeout=timeout)
        # Container notes (books, canvases) carry no text of their own and have
        # no page in the static export, so they would only produce dead links.
        if note["hasChildren"] and not content.strip():
            continue

        seen_links.add(location)
        emitted += 1
        item = ET.SubElement(channel, "item")
        ET.SubElement(item, "title").text = note["title"]
        ET.SubElement(item, "link").text = location
        guid = ET.SubElement(item, "guid", {"isPermaLink": "true"})
        guid.text = location
        ET.SubElement(item, "description").text = note_description(
            note["title"], content
        )

        modified = _parse_date(note["modified"])
        if modified is not None:
            ET.SubElement(item, "pubDate").text = format_datetime(modified)

    return rss


def write_feed(
    output_dir: Path = DEFAULT_OUTPUT_DIR,
    parent_note_id: str = DEFAULT_PARENT_NOTE_ID,
    base_url: str | None = None,
    timeout: float = DEFAULT_TIMEOUT,
    limit: int | None = DEFAULT_LIMIT,
    filename: str = FEED_FILENAME,
) -> Path:
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    rss = build_feed(
        parent_note_id=parent_note_id,
        base_url=base_url,
        timeout=timeout,
        limit=limit,
    )
    destination = output_dir / filename
    ET.ElementTree(rss).write(destination, encoding="utf-8", xml_declaration=True)
    return destination


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Generate an RSS 2.0 feed from notes stored in Trilium."
    )
    parser.add_argument("--parent-note-id", "-p", default=DEFAULT_PARENT_NOTE_ID)
    parser.add_argument("--output-dir", "-o", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--base-url", help="base URL prepended to each item link")
    parser.add_argument("--timeout", type=float, default=DEFAULT_TIMEOUT)
    parser.add_argument(
        "--limit",
        "-n",
        type=int,
        default=DEFAULT_LIMIT,
        help="maximum number of recent notes to include; use -1 for no limit",
    )
    parser.add_argument("--filename", default=FEED_FILENAME)
    args = parser.parse_args(argv)

    try:
        destination = write_feed(
            output_dir=args.output_dir,
            parent_note_id=args.parent_note_id,
            base_url=args.base_url,
            timeout=args.timeout,
            limit=args.limit,
            filename=args.filename,
        )
    except (RsError, PatchError, requests.RequestException, OSError) as error:
        print(error, file=sys.stderr)
        return 1

    print(destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
