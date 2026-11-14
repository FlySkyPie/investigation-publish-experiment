import argparse
import sys
from pathlib import Path
from typing import Any

import requests

from app.setting import settings

__all__ = [
    "create_note",
    "existing_child_titles",
    "note_title",
    "plan_uploads",
    "upload_researches",
    "main",
]

# Trilium renders Markdown through its "Markdown" note type, which is a code
# note carrying the text/x-markdown MIME rather than a separate type.
NOTE_TYPE = "code"
NOTE_MIME = "text/x-markdown"
DEFAULT_SOURCE_DIR = Path("researches")
DEFAULT_PARENT_NOTE_ID = "root"
DEFAULT_TIMEOUT = 300.0
POSITION_STEP = 10
SUPPORTED_SUFFIXES = (".md",)


class UploadError(RuntimeError):
    pass


def _url(path: str) -> str:
    return f"{settings.trilium_url.rstrip('/')}/etapi/{path.lstrip('/')}"


def _headers() -> dict[str, str]:
    headers = {"Content-Type": "application/json"}
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


def create_note(
    parent_note_id: str,
    title: str,
    content: str,
    note_type: str = NOTE_TYPE,
    mime: str | None = NOTE_MIME,
    note_position: int | None = None,
    timeout: float = DEFAULT_TIMEOUT,
) -> dict[str, Any]:
    payload: dict[str, Any] = {
        "parentNoteId": parent_note_id,
        "title": title,
        "type": note_type,
        "content": content,
    }
    if note_type in ("code", "file", "image"):
        if mime is None:
            raise UploadError(f"note type '{note_type}' requires a MIME type")
        payload["mime"] = mime
    if note_position is not None:
        payload["notePosition"] = note_position

    response = requests.post(
        _url("create-note"), json=payload, headers=_headers(), timeout=timeout
    )

    if not response.ok:
        raise UploadError(f"{title}: {_describe_error('create note', response)}")

    return response.json()


def existing_child_titles(
    parent_note_id: str, timeout: float = DEFAULT_TIMEOUT
) -> set[str]:
    response = requests.get(
        _url(f"notes/{parent_note_id}"), headers=_headers(), timeout=timeout
    )

    if not response.ok:
        raise UploadError(
            f"could not read parent note {parent_note_id}: "
            f"{_describe_error('get note', response)}"
        )

    parent = response.json()
    titles: set[str] = set()

    for child_note_id in parent.get("childNoteIds", []):
        child = requests.get(
            _url(f"notes/{child_note_id}"), headers=_headers(), timeout=timeout
        )
        if not child.ok:
            raise UploadError(
                f"could not read child note {child_note_id}: "
                f"{_describe_error('get note', child)}"
            )
        title = child.json().get("title")
        if isinstance(title, str):
            titles.add(title)

    return titles


def note_title(path: Path) -> str:
    return path.stem


def plan_uploads(
    source_dir: Path = DEFAULT_SOURCE_DIR,
    parent_note_id: str = DEFAULT_PARENT_NOTE_ID,
    timeout: float = DEFAULT_TIMEOUT,
    skip_existing: bool = True,
) -> list[tuple[Path, str]]:
    source_dir = Path(source_dir)
    if not source_dir.is_dir():
        raise UploadError(f"source directory '{source_dir}' does not exist")

    files = sorted(
        path
        for path in source_dir.iterdir()
        if path.is_file() and path.suffix.lower() in SUPPORTED_SUFFIXES
    )
    if not files:
        raise UploadError(f"no Markdown files found in '{source_dir}'")

    existing = (
        existing_child_titles(parent_note_id, timeout=timeout) if skip_existing else set()
    )

    planned: list[tuple[Path, str]] = []
    for path in files:
        title = note_title(path)
        if title in existing:
            continue
        planned.append((path, title))

    return planned


def upload_researches(
    source_dir: Path = DEFAULT_SOURCE_DIR,
    parent_note_id: str = DEFAULT_PARENT_NOTE_ID,
    timeout: float = DEFAULT_TIMEOUT,
    skip_existing: bool = True,
) -> list[dict[str, Any]]:
    planned = plan_uploads(
        source_dir=source_dir,
        parent_note_id=parent_note_id,
        timeout=timeout,
        skip_existing=skip_existing,
    )

    created: list[dict[str, Any]] = []
    for index, (path, title) in enumerate(planned, start=1):
        created.append(
            create_note(
                parent_note_id=parent_note_id,
                title=title,
                content=path.read_text(encoding="utf-8"),
                note_type=NOTE_TYPE,
                note_position=index * POSITION_STEP,
                timeout=timeout,
            )
        )

    return created


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Upload Markdown files to Trilium as child notes through ETAPI."
    )
    parser.add_argument("directory", nargs="?", type=Path, default=DEFAULT_SOURCE_DIR)
    parser.add_argument("--parent-note-id", "-p", default=DEFAULT_PARENT_NOTE_ID)
    parser.add_argument("--timeout", type=float, default=DEFAULT_TIMEOUT)
    parser.add_argument(
        "--include-existing",
        dest="skip_existing",
        action="store_false",
        help="create notes even when a child note with the same title exists",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="list the notes that would be created without creating them",
    )
    args = parser.parse_args(argv)

    try:
        if args.dry_run:
            planned = plan_uploads(
                source_dir=args.directory,
                parent_note_id=args.parent_note_id,
                timeout=args.timeout,
                skip_existing=args.skip_existing,
            )
            for _path, title in planned:
                print(title)
            print(f"{len(planned)} note(s) would be created", file=sys.stderr)
            return 0

        created = upload_researches(
            source_dir=args.directory,
            parent_note_id=args.parent_note_id,
            timeout=args.timeout,
            skip_existing=args.skip_existing,
        )
    except (UploadError, requests.RequestException) as error:
        print(error, file=sys.stderr)
        return 1

    print(f"{len(created)} note(s) created", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())