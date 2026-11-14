import argparse
import sys
from pathlib import Path

import requests

from app.setting import settings

__all__ = ["export_note_subtree", "main"]

EXPORT_FORMATS = ("html", "markdown", "share")
DEFAULT_NOTE_ID = "root"
DEFAULT_FORMAT = "share"
DEFAULT_OUTPUT_DIR = Path("downloads")
DEFAULT_TIMEOUT = 300.0


class ExportError(RuntimeError):
    pass


def export_note_subtree(
    note_id: str = DEFAULT_NOTE_ID,
    fmt: str = DEFAULT_FORMAT,
    output_dir: Path = DEFAULT_OUTPUT_DIR,
    timeout: float = DEFAULT_TIMEOUT,
) -> Path:
    if fmt not in EXPORT_FORMATS:
        raise ExportError(
            f"Unrecognized export format '{fmt}', "
            f"supported values are {', '.join(repr(f) for f in EXPORT_FORMATS)}."
        )

    url = f"{settings.trilium_url.rstrip('/')}/etapi/notes/{note_id}/export"

    headers = {}
    if settings.trilium_token:
        headers["Authorization"] = f"Bearer {settings.trilium_token}"

    response = requests.get(
        url, params={"format": fmt}, headers=headers, timeout=timeout
    )

    if not response.ok:
        raise ExportError(_describe_error(response))

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    destination = output_dir / f"{note_id}-{fmt}.zip"
    destination.write_bytes(response.content)

    return destination


def _describe_error(response: requests.Response) -> str:
    try:
        payload = response.json()
    except ValueError:
        payload = None

    if isinstance(payload, dict) and "message" in payload:
        code = payload.get("code", "UNKNOWN")
        return f"export failed ({response.status_code} {code}): {payload['message']}"

    return f"export failed with HTTP {response.status_code} {response.reason}"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Export a note subtree from Trilium through ETAPI."
    )
    parser.add_argument("note_id", nargs="?", default=DEFAULT_NOTE_ID)
    parser.add_argument("--format", "-f", default=DEFAULT_FORMAT, choices=EXPORT_FORMATS)
    parser.add_argument("--output-dir", "-o", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--timeout", type=float, default=DEFAULT_TIMEOUT)
    args = parser.parse_args(argv)

    try:
        destination = export_note_subtree(
            note_id=args.note_id,
            fmt=args.format,
            output_dir=args.output_dir,
            timeout=args.timeout,
        )
    except (ExportError, requests.RequestException) as error:
        print(error, file=sys.stderr)
        return 1

    print(destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
