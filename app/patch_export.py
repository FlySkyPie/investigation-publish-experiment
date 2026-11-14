import argparse
import sys
from pathlib import Path

from lxml import etree, html

from app.setting import settings

__all__ = [
    "patch_directory",
    "patch_file",
    "patch_html",
    "normalize_base_href",
    "main",
]

DEFAULT_OUTPUT_DIR = Path("downloads")
HTML_SUFFIX = ".html"
INDENT = "    "
_TAG_BOUNDARY = set(" \t\r\n/>")


class PatchError(RuntimeError):
    pass


def normalize_base_href(value: str) -> str:
    href = value.strip()
    if not href:
        raise PatchError(
            "export base URL is empty; set EXPORT_BASE_URL (or pass --base-url)"
        )
    # The base URL names a directory, so it must end with a slash. Otherwise
    # relative links resolve against its last path segment instead.
    if not href.endswith("/"):
        href += "/"
    return href


def _tag_end(content: str, start: int) -> int:
    quote = ""
    for index in range(start + 1, len(content)):
        char = content[index]
        if quote:
            if char == quote:
                quote = ""
        elif char in "\"'":
            quote = char
        elif char == ">":
            return index + 1
    return len(content)


def _find_tag(content: str, name: str, start: int = 0) -> tuple[int, int] | None:
    """Locate the first <name ...> tag, skipping longer names like <header>."""
    lowered = content.lower()
    needle = f"<{name.lower()}"
    index = lowered.find(needle, start)

    while index != -1:
        following = index + len(needle)
        if following < len(content) and content[following] in _TAG_BOUNDARY:
            return index, _tag_end(content, index)
        index = lowered.find(needle, index + 1)

    return None


def _base_tag(base_href: str) -> str:
    element = etree.Element("base")
    element.set("href", base_href)
    return etree.tostring(element, encoding="unicode", method="html")


def patch_html(content: str, base_href: str) -> tuple[str, bool]:
    tree = html.document_fromstring(content)

    if tree.find(".//head") is None:
        return content, False

    base = tree.find(".//base")
    if base is not None:
        if base.get("href") == base_href:
            return content, False
        span = _find_tag(content, "base")
        if span is None:
            return content, False
        # Rewrite the element rather than replacing it, so sibling attributes
        # such as target="_parent" on ZIP exports survive.
        base.set("href", base_href)
        start, end = span
        rewritten = etree.tostring(base, encoding="unicode", method="html")
        return content[:start] + rewritten + content[end:], True

    span = _find_tag(content, "head")
    if span is None:
        return content, False

    _, end = span
    injection = f"\n{INDENT}{_base_tag(base_href)}"
    return content[:end] + injection + content[end:], True


def patch_file(path: Path, base_href: str) -> bool:
    content = path.read_text(encoding="utf-8")
    patched, changed = patch_html(content, base_href)
    if changed:
        path.write_text(patched, encoding="utf-8")
    return changed


def _html_files(directory: Path) -> list[Path]:
    directory = Path(directory)
    if not directory.is_dir():
        raise PatchError(f"directory '{directory}' does not exist")
    return sorted(directory.rglob(f"*{HTML_SUFFIX}"))


def patch_directory(
    directory: Path = DEFAULT_OUTPUT_DIR, base_href: str | None = None
) -> list[Path]:
    href = normalize_base_href(
        base_href if base_href is not None else settings.export_base_url
    )
    return [path for path in _html_files(directory) if patch_file(path, href)]


def plan_patches(directory: Path, base_href: str) -> list[Path]:
    href = normalize_base_href(base_href)
    return [
        path
        for path in _html_files(directory)
        if patch_html(path.read_text(encoding="utf-8"), href)[1]
    ]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Insert a <base href> into exported Trilium HTML pages."
    )
    parser.add_argument("directory", nargs="?", type=Path, default=DEFAULT_OUTPUT_DIR)
    parser.add_argument("--base-url", help="base URL to write into each page")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="list the files that would be patched without writing them",
    )
    args = parser.parse_args(argv)

    try:
        if args.dry_run:
            planned = plan_patches(
                args.directory, args.base_url or settings.export_base_url
            )
            for path in planned:
                print(path)
            print(f"{len(planned)} file(s) would be patched", file=sys.stderr)
            return 0

        patched = patch_directory(directory=args.directory, base_href=args.base_url)
    except (PatchError, OSError) as error:
        print(error, file=sys.stderr)
        return 1

    print(f"{len(patched)} file(s) patched", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
