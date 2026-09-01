#!/usr/bin/env python3
"""Verify the public WikiSkill document seams without external dependencies."""

from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.links = []
        self.text = []
        self._stack = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        self.tags.append((tag, attributes))
        self._stack.append(tag)
        for attribute in ("href", "src"):
            if attributes.get(attribute):
                self.links.append(attributes[attribute])

    def handle_startendtag(self, tag, attrs):
        attributes = dict(attrs)
        self.tags.append((tag, attributes))
        for attribute in ("href", "src"):
            if attributes.get(attribute):
                self.links.append(attributes[attribute])

    def handle_endtag(self, tag):
        if self._stack and self._stack[-1] == tag:
            self._stack.pop()

    def handle_data(self, data):
        self.text.append(data)


def read_document(path):
    document = Document()
    document.feed(path.read_text(encoding="utf-8"))
    document.close()
    return document


def local_link_errors(page, document):
    errors = []
    for link in document.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc or link.startswith("#"):
            continue
        target = (page.parent / unquote(parsed.path)).resolve()
        if not target.exists():
            errors.append(f"{page.relative_to(ROOT)}: missing local link target {link}")
    return errors


def main():
    errors = []
    homepage = ROOT / "index.html"
    explainer = ROOT / "wikiskill" / "index.html"

    if not explainer.exists():
        errors.append("wikiskill/index.html is missing")
    else:
        wiki = read_document(explainer)
        if sum(tag == "h1" for tag, _ in wiki.tags) != 1:
            errors.append("wikiskill/index.html must contain exactly one h1")
        diagram_ids = {attrs.get("id") for _, attrs in wiki.tags}
        if not {"layers-svg-title", "loop-svg-title"}.issubset(diagram_ids):
            errors.append("wikiskill/index.html must expose both explanatory diagrams")
        if not any(link.startswith("https://arxiv.org/html/2608.27454") for link in wiki.links):
            errors.append("wikiskill/index.html must link to the paper source")
        page_text = " ".join(wiki.text).lower()
        if "lavish" in page_text or "mockup" in page_text:
            errors.append("wikiskill/index.html must not contain planning-review wording")
        if any("review" in attrs.get("class", "").split() for _, attrs in wiki.tags):
            errors.append("wikiskill/index.html must not contain planning-review controls")
        errors.extend(local_link_errors(explainer, wiki))

    home = read_document(homepage)
    home_source = homepage.read_text(encoding="utf-8")
    home_text = " ".join(home.text)
    if "05 entries / Explore" not in home_text:
        errors.append("homepage Ideas Index count must be 05 entries")
    row = next((attrs for tag, attrs in home.tags if tag == "a" and attrs.get("href") == "wikiskill/index.html"), None)
    if row is None:
        errors.append("homepage must link row 05 to wikiskill/index.html")
    elif not re.search(r'href="wikiskill/index\.html"[^>]*>\s*<span class="idea-index">05</span>', home_source):
        errors.append("homepage WikiSkill destination must be row 05")
    if "Artwork pending" not in home_text:
        errors.append("homepage must expose the Artwork pending placeholder")
    if not any("artwork-placeholder" in attrs.get("class", "").split() for _, attrs in home.tags):
        errors.append("homepage artwork placeholder must have an explicit class")
    errors.extend(local_link_errors(homepage, home))

    glossary = (ROOT / "DESIGN-GLOSSARY.md").read_text(encoding="utf-8")
    guide = (ROOT / "frontend-design-language-guide.html").read_text(encoding="utf-8")
    if "`01`, `02`, `03`, `04`, or `05`" not in glossary:
        errors.append("design glossary must permit index rows 01–05")
    if "<code>01</code>–<code>05</code>" not in guide:
        errors.append("design language guide must permit index rows 01–05")

    if errors:
        print("WikiSkill public seams: FAIL")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)
    print("WikiSkill public seams: PASS")


if __name__ == "__main__":
    main()
