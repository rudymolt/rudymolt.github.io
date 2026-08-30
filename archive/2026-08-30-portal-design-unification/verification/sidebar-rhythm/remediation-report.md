# Sidebar rhythm remediation — generator evidence

## Scope and acceptance criteria

- Compare Hub, Drive Agent, Theory, and Process Map at matched 390px, 768px, and 1440px viewports.
- Remove article-local list spacing from shared guide rows.
- Preserve the mobile guide disclosure, active state, previous/next navigation, body containment, and all canonical editorial copy.
- Load the changed stylesheet through a fresh cache key on every active page.

## Reproduction and fix

Before the fix, computed geometry at 1440px showed Hub and Process Map at `721.97px` total rail height while Drive Agent and Theory were `787.97px`. Both legacy articles declare `li { margin-bottom: 6px; }`, which leaked into each of the 11 shared guide rows for a total 66px difference.

The shared `.timeline-step` rule now sets `margin: 0`. `tools/audit_playbook.py` first failed with `shared CSS: isolated guide-step rhythm contract is missing`, then passed after the reset. All 12 active pages now request `playbook-docs.css?v=20260830-polish3`.

## Browser results

Real Chrome 152 was driven against a local HTTP server. The structured evidence is in `browser-results.json`; viewport captures are under `screenshots/`.

| Viewport | Result |
|---|---|
| 390px | All four pages have `0px` row margins and 45px expanded rows; disclosure starts collapsed, opens to `Guide −`, and exposes the grid; no body overflow. |
| 768px | All four pages have 45px rows and identical `265.98px` rail heights; desktop/tablet disclosure remains hidden; no body overflow. |
| 1440px | All four pages have 45px rows and identical `721.97px` rail heights; desktop disclosure remains hidden; no body overflow. |

The 390px collapsed rail can differ by 4px where the current-page label wraps; this is content-driven and does not alter row styling or the expanded guide geometry.

## Deterministic checks

- `python3 tools/audit_playbook.py` — PASS; 12 pages parsed and every canonical digest unchanged.
- `python3 /home/vercel-sandbox/ai-engineering-playbook/v0.4/scripts/compute-status.py --check .` — PASS.
- `git diff --check` — PASS.

Generator verdict: **PASS**. The fresh report-only design review of exact candidate `684f431b85747bc9a53b937094dc1453632e202e` also returned **PASS** with no findings; see `fresh-verifier-report.md`.
