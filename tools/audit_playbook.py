#!/usr/bin/env python3
"""Deterministic static audit for the published AI Engineering Playbook."""

from __future__ import annotations

import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
BASELINE = ROOT / "planning/portal-design-unification/canonical-content-baseline.json"
ALLOWED_HEX = {"#0a0605", "#f4e7c2", "#b9a98a", "#240100", "#4a0708", "#d5a527", "#f0c45c"}
HEX_LITERAL = re.compile(r"(?<![0-9a-zA-Z_-])#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![0-9a-zA-Z_-])")
CSS_RADIUS = re.compile(r"border-radius\s*:\s*([^;}{]+)", re.IGNORECASE)
WHITE_SURFACE = re.compile(r":\s*(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255(?:\s*,[^)]*)?\))\s*(?:;|})", re.IGNORECASE)
LEGACY_BLUE = re.compile(r"rgba?\(\s*30\s*,\s*78\s*,\s*140(?:\s*,[^)]*)?\)", re.IGNORECASE)


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.main_depth = 0
        self.excluded_depth = 0
        self.text: list[str] = []
        self.headings: list[str] = []
        self.hrefs: list[str] = []
        self.data_attrs: list[tuple[str, str, str]] = []
        self.ids: set[str] = set()
        self.tags: list[tuple[str, dict[str, str]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}
        self.tags.append((tag, values))
        if "id" in values:
            self.ids.add(values["id"])
        if tag == "main":
            self.main_depth += 1
        if self.main_depth and tag in {"nav", "aside", "style", "script"}:
            self.excluded_depth += 1
        if self.main_depth and not self.excluded_depth:
            if re.fullmatch(r"h[1-6]", tag):
                self.headings.append(tag)
            if "href" in values:
                self.hrefs.append(values["href"])
            self.data_attrs.extend((tag, key, value) for key, value in values.items() if key.startswith("data-"))

    def handle_endtag(self, tag: str) -> None:
        if self.main_depth and tag in {"nav", "aside", "style", "script"}:
            self.excluded_depth -= 1
        if tag == "main":
            self.main_depth -= 1

    def handle_data(self, data: str) -> None:
        if self.main_depth and not self.excluded_depth:
            self.text.append(data)


def normalize_article(page: Page, path: str) -> str:
    text = re.sub(r"\s+", " ", " ".join(page.text)).strip()
    if path == "agent-engineering-playbook/index.html":
        text = text.replace("V0.4 · 2026-08-24", "V0.4")
    return text


def ordered_inventory_digest(items: list[object]) -> str:
    """Hash an ordered inventory without depending on incidental JSON whitespace."""
    payload = json.dumps(items, ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def is_local(value: str) -> bool:
    parts = urlsplit(value)
    return not parts.scheme and not parts.netloc and not value.startswith("//")


def resource_target(page_path: Path, value: str) -> Path | None:
    parts = urlsplit(value)
    if not is_local(value) or not parts.path:
        return None
    return (page_path.parent / unquote(parts.path)).resolve()


def audit_page(relative: str, expected: dict[str, int | str]) -> list[str]:
    path = ROOT / relative
    parser = Page()
    try:
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
    except Exception as error:  # pragma: no cover - parser provides the diagnostic
        return [f"{relative}: HTML parser failure: {error}"]

    failures: list[str] = []
    article = normalize_article(parser, relative)
    observed = {
        "text_chars": len(article),
        "headings": len(parser.headings),
        "hrefs": len(parser.hrefs),
        "data_attrs": len(parser.data_attrs),
    }
    for key, actual in observed.items():
        if actual != expected[key]:
            failures.append(f"{relative}: canonical {key} changed ({expected[key]} → {actual})")
    digest = hashlib.sha256(article.encode("utf-8")).hexdigest()
    if not re.fullmatch(r"[0-9a-f]{64}", str(expected["sha256"])):
        failures.append(f"{relative}: baseline hash is malformed")
    elif digest != expected["sha256"]:
        failures.append(f"{relative}: canonical article digest changed")
    inventories = {
        "hrefs_sha256": parser.hrefs,
        "data_attrs_sha256": parser.data_attrs,
    }
    for key, items in inventories.items():
        expected_digest = str(expected.get(key, ""))
        if not re.fullmatch(r"[0-9a-f]{64}", expected_digest):
            failures.append(f"{relative}: baseline {key} is malformed")
        elif ordered_inventory_digest(items) != expected_digest:
            failures.append(f"{relative}: canonical ordered {key.removesuffix('_sha256')} inventory changed")
    if parser.headings.count("h1") != 1:
        failures.append(f"{relative}: expected one h1, found {parser.headings.count('h1')}")
    levels = [int(tag[1]) for tag in parser.headings]
    if any(next_level > current + 1 for current, next_level in zip(levels, levels[1:])):
        failures.append(f"{relative}: heading hierarchy skips a level")
    required = {"main-content"}
    if not required.issubset(parser.ids):
        failures.append(f"{relative}: missing main target")
    if not any(tag == "a" and attrs.get("href") == "#main-content" and "skip-link" in attrs.get("class", "") for tag, attrs in parser.tags):
        failures.append(f"{relative}: missing skip link")
    if not any(tag == "footer" and "doc-footer" in attrs.get("class", "") for tag, attrs in parser.tags):
        failures.append(f"{relative}: missing editorial footer")
    if relative.endswith("glossary.html"):
        if not any(tag == "aside" and "guide-timeline" in attrs.get("class", "") for tag, attrs in parser.tags):
            failures.append(f"{relative}: glossary lacks reference rail")
    else:
        if not any(tag == "aside" and "guide-timeline" in attrs.get("class", "") for tag, attrs in parser.tags):
            failures.append(f"{relative}: missing guide rail")
        if not any(tag == "a" and attrs.get("aria-current") == "page" for tag, attrs in parser.tags):
            failures.append(f"{relative}: missing current guide state")
    for tag, attrs in parser.tags:
        if tag == "rect" and "rx" in attrs:
            try:
                if float(attrs["rx"]) > 4:
                    failures.append(f"{relative}: SVG rect rx exceeds 4 ({attrs['rx']})")
            except ValueError:
                failures.append(f"{relative}: SVG rect rx is not numeric ({attrs['rx']})")
        for attribute in ("href", "src"):
            value = attrs.get(attribute)
            if not value:
                continue
            target = resource_target(path, value)
            if target and not target.exists():
                failures.append(f"{relative}: missing local {attribute} {value}")
        href = attrs.get("href")
        if href and href.startswith("#") and href != "#" and unquote(href[1:]) not in parser.ids:
            failures.append(f"{relative}: missing local anchor {href}")
    print(f"PASS {relative}: canonical digest {digest}")
    return failures


def source_contract_audit(paths: list[str]) -> list[str]:
    failures: list[str] = []
    for relative in paths + ["agent-engineering-playbook/assets/playbook-docs.css"]:
        source = (ROOT / relative).read_text(encoding="utf-8").lower()
        invalid = sorted({literal.lower() for literal in HEX_LITERAL.findall(source)} - ALLOWED_HEX)
        if invalid:
            failures.append(f"{relative}: non-approved hex literals: {', '.join(invalid)}")
        for match in CSS_RADIUS.finditer(source):
            value = match.group(1)
            for number, unit in re.findall(r"(-?\d+(?:\.\d+)?)(px|%)?", value):
                amount = float(number)
                if unit == "%":
                    context = source[max(0, match.start() - 160):match.start()]
                    if amount != 50 or ".avatar" not in context:
                        failures.append(f"{relative}: disallowed percentage border-radius ({value.strip()})")
                elif amount > 4:
                    failures.append(f"{relative}: border-radius exceeds 4 ({value.strip()})")
    css = (ROOT / "agent-engineering-playbook/assets/playbook-docs.css").read_text(encoding="utf-8")
    css_without_comments = re.sub(r"/\*.*?\*/", "", css, flags=re.DOTALL)
    if WHITE_SURFACE.search(css_without_comments):
        failures.append("shared CSS: named or RGB white interactive surface remains")
    if LEGACY_BLUE.search(css_without_comments):
        failures.append("shared CSS: legacy blue RGB/RGBA treatment remains")
    if ".site-nav::before" in css or ".site-nav::after" in css:
        failures.append("shared CSS: masthead navigation remains pseudo-content")
    if ".masthead-portal" not in css or ".guide-current" not in css:
        failures.append("shared CSS: masthead portal or current guide label is not styled")
    if not re.search(r"@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)", css_without_comments):
        failures.append("shared CSS: reduced-motion media contract is missing")
    if not re.search(r"scroll-behavior\s*:\s*auto", css_without_comments) or not re.search(r"transition\s*:\s*none\s*!important", css_without_comments):
        failures.append("shared CSS: reduced-motion contract does not disable smooth scrolling and transitions")
    js = (ROOT / "agent-engineering-playbook/assets/playbook-docs.js").read_text(encoding="utf-8")
    if 'guide.classList.add("has-mobile-guide")' not in js:
        failures.append("shared JS: mobile guide does not opt into enhanced disclosure")
    if ".guide-timeline.has-mobile-guide .timeline-steps" not in css or ".guide-timeline.has-mobile-guide.is-open .timeline-steps" not in css:
        failures.append("shared CSS: mobile guide collapse is not scoped to the enhanced state")
    return failures


def main() -> int:
    baseline = json.loads(BASELINE.read_text(encoding="utf-8"))
    pages = baseline["pages"]
    failures: list[str] = []
    for relative in sorted(pages):
        failures.extend(audit_page(relative, pages[relative]))
    failures.extend(source_contract_audit(sorted(pages)))
    if failures:
        print("\nFAIL")
        print("\n".join(failures))
        return 1
    print(f"\nPASS: {len(pages)} active pages parsed; canonical content baseline and local resources agree.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
