# Editorial footer alignment — generator evidence

## Scope

The supplied production screenshot showed the Hub footer detached from the published-document grid. Paper places the closing rule and text inside the article measure, with the tagline at the left edge and identity at the right edge.

## Root cause and repair

The shared footer was a body-level element with only `max-width: 72ch`; unlike `.page`, it had no centred shell, guide-column offset, or measured inner row. The first repair aligned its left edge but a browser probe found the identity extended 57.61px beyond the article. The final structure uses a body-level 1200px shell, a 232px guide offset, the shared responsive gap, and a `.doc-footer-content` row capped to the same `72ch` measure as `.guide-content`.

Canonical wording is preserved. All active pages request `playbook-docs.css?v=20260830-polish4`.

## Verification

- `tools/audit_playbook.py` first reported the two missing footer contracts, then passed after the repair with all 12 canonical digests unchanged.
- Chrome 152 tested Hub, Drive Agent, and Theory at 390px, 768px, and 1440px. Every case had no body overflow and loaded the `polish4` stylesheet.
- At 1440px, both article and footer content measured `x=464.5`, `right=1198.89`, `width=734.39`.
- At 768px, both measured `x=30.72`, `right=722.28`, `width=691.56`.
- At 390px, both measured `x=20`, `right=355`, `width=335`; the tagline and identity stack with an 8px gap.
- The footer remains a semantic `<footer>` and its rule spans exactly the measured content row.
- Structured results: `browser-results.json`. Visual captures: `screenshots/`.

Generator verdict: **PASS**. Independent report-only verification also returned **PASS** with no findings for exact candidate `a0b23ff53935c09c31c3366f391fe81fa0d4bfd3`.
