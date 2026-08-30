# Fresh verifier report — portal design unification

## Verdict

**FAIL** for candidate `4553682e93170e73a4a0998d7f234ab1028cc59f` against editorial baseline `99e9c2957bb934381f05f5ad4453d9c388d97ea5`.

The migration passes canonical-content, route/asset, syntax, palette, 320px body-overflow, browser-runtime, landmark, focus, motion, contrast, and preserved-interaction checks. It has two objective findings: Drive diagrams do not fully recompose on mobile, and the mobile accessibility contract is incomplete because navigation targets are below 44px while six horizontally overflowing code blocks lack explicit accessible-region labels and tabindex hooks.

This was a report-only run. No product source, test, design artefact, playbook state, planning contract, Git state, branch, remote, PR, or external system was changed. Fresh evidence is confined to `planning/portal-design-unification/verification/`.

## Review boundary and repository state

- Initial `git rev-parse HEAD`: `4553682e93170e73a4a0998d7f234ab1028cc59f` — exact required candidate.
- Initial `git status --short`: empty — clean worktree before evidence generation.
- Exact reviewed range: `99e9c2957bb934381f05f5ad4453d9c388d97ea5..4553682e93170e73a4a0998d7f234ab1028cc59f`.
- Current branch was not renamed or modified.
- Candidate diff: 25 files, 1,251 insertions, 381 deletions. It is limited to the approved active playbook pages/assets, the three design artefacts, deterministic audit/baseline, and active planning/state records. No package manifest, dependency lock, workflow, deployment, secret, authentication, repository-protection, or release surface is added.
- The Mac-only playbook path was unavailable in this cloud workspace; the project-local report-only design-review skill and cloud fallback contract were used.

## Exact diff and canonical parity

`python3 tools/audit_playbook.py` passed all 12 active pages. The audit parses each page; hashes normalized main-article text; hashes ordered `href` and `data-*` inventories; checks one `h1`, heading progression, skip/main/footer/guide/current-state markers, local links/assets/anchors, palette/radius drift, reduced motion, and the shared guide enhancement contract.

The exact diff confirms:

- The sole editorial exception is exact: the first Hub `What's New` label changes from `V0.4 · 2026-08-24` to `V0.4`. `V0.4` remains and no other editorial/verification date is removed.
- Drive changes `Human` and `Agent` from `h4` to `h3`; Theory changes `Matt Pocock's skills` and `gstack (Garry Tan)` from `h4` to `h3`. Their text and order are unchanged.
- All other canonical main copy, link destinations/order, and interaction `data-*` contracts match the baseline.
- The shared script adds only masthead portal reuse and progressive mobile-guide behavior; existing initializers remain wired.

## Commands and deterministic results

| Command | Result |
|---|---|
| `git rev-parse HEAD` | PASS — exact candidate |
| `git status --short` before testing | PASS — empty |
| `git diff --stat` and `git diff --name-status` for the exact range | Reviewed; scope described above |
| `python3 tools/audit_playbook.py` | PASS — 12 pages, canonical baseline and local resources agree |
| `node --check agent-engineering-playbook/assets/playbook-docs.js` | PASS |
| Python `json.load` of `canonical-content-baseline.json` | PASS |
| `git diff --check 99e9c... 4553682...` | PASS |
| Secret/dependency/protected-surface grep and exact changed-file review | PASS — no relevant surface or credential pattern added |
| Real Chrome `152.0.7977.64` through `browser-harness.mjs` against a bounded local HTTP server | Completed; structured results in `browser-results.json` |

Every local server, Chrome process, and browser profile used a fresh bounded port/profile and was cleaned up. Native CDP full-page rasterization stalled once and then rejected the two tallest 1440px captures. This was a harness limitation, not product behavior. The completed run reused the successful fresh captures and produced the affected full-page evidence through bounded Chromium page-coordinate tiles; temporary tiles and profiles were removed. `interactive-1440.jpg` records `tiledFallback: true` in the JSON.

## Browser matrix

All 12 active pages were loaded at 320px. Every page had:

- no document/body horizontal overflow;
- exactly one `h1`;
- zero console errors;
- zero runtime exceptions;
- zero network-load failures.

All seven representatives were loaded at 390px, 768px, and 1440px. Across all 21 combinations:

- no body overflow;
- one `h1`;
- zero console/runtime/network failures;
- nav, main, complementary guide, footer, and skip target present;
- two visible previous/next links.

Representatives:

| Archetype | Page |
|---|---|
| Hub | `agent-engineering-playbook/index.html` |
| Drive | `agent-engineering-playbook/50-how-to-write-code-with-ai.html` |
| Theory | `agent-engineering-playbook/60-the-theory-behind-the-playbook.html` |
| Process | `agent-engineering-playbook/10-process/index.html` |
| Reference | `agent-engineering-playbook/00-foundations.html` |
| Interactive | `agent-engineering-playbook/10-process/01-align.html` |
| Glossary | `agent-engineering-playbook/glossary.html` |

## Interaction and accessibility results

| Assertion | Result |
|---|---|
| Mobile guide current label | PASS — `Current: 02 Drive agent` |
| Mobile guide open state | PASS — `aria-expanded=false → true` |
| Mobile guide Escape/focus return | PASS — closes and focus returns to the 44px toggle |
| No-JavaScript guide fallback | PASS — no toggle, full 11-link path visible |
| Glossary popover | PASS — opens with definition, Escape closes, focus returns |
| Choice output | PASS — second choice becomes active and output updates |
| Quiz feedback | PASS — correct choice reports `✓ Right`, status becomes visible and focused |
| Checklist status | PASS — `0 of 6` updates to `1 of 6` |
| Route selector | PASS — `feature` produces `Type: I want to build [feature].` |
| Copy status | PASS — click reports `Copied: What's next?` |
| Previous/next | PASS for visibility at 390/768/1440; target-size failure is separate below |
| Focus | PASS — keyboard Tab produced a 2px solid ember outline with 4px offset |
| Visited links | PASS — explicit distinguishable `:visited` rule present |
| Reduced motion | PASS — smooth scrolling, transitions, and animation are disabled |
| Contrast | PASS for primary tokens against soot: parchment 16.38:1, muted parchment 8.75:1, gold 8.88:1, ember 12.25:1 |
| Landmarks and skip target | PASS across all 21 representative combinations |

## Visual comparison

All 21 screenshots were opened and inspected.

- Hub desktop/mobile preserve the Paper identity masthead, unboxed guide/path hierarchy, dominant guided-path action, oxblood primer, numbered destination rhythm, soot/parchment/gold palette, and responsive single-column order. The longer live editorial copy is correctly retained instead of Paper shorthand.
- Drive desktop follows the Paper field-guide rhythm and responsibility/loop/handoff vocabulary. At mobile, the content column and semantic panels stack, but the wide SVG flow diagrams remain visibly scaled down; this is a contract failure, not a subjective mismatch.
- Theory, Process, Reference, Interactive, and Glossary representatives consistently use the durable root vocabulary: soot reading field, Oxanium display hierarchy, IBM Plex Mono reading/control text, oxblood bounded emphasis, gold structure, ember interaction, unboxed guide rail, restrained reading measure, and square surfaces.
- No screenshot shows body clipping, accidental light/blue/green theme residue, centred marketing composition, or card-grid drift.

Paper references inspected directly:

- `planning/portal-design-unification/paper/hub-desktop-full.jpg`
- `planning/portal-design-unification/paper/hub-mobile-full.jpg`
- `planning/portal-design-unification/paper/drive-agent-desktop-full.jpg`
- `planning/portal-design-unification/paper/drive-agent-mobile-full.jpg`

The updated `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, and `frontend-design-language-guide.html` were inspected and agree on the seven archetypes, palette/type, guide behavior, labelled local overflow, mobile recomposition, target-size, focus, visited, and reduced-motion rules.

## Findings and bounded remediation

### F1 — Drive mobile diagrams remain scaled wide SVGs

- **Severity:** high
- **Confidence:** high
- **Action:** fix in a separate stage-07/09 generator task, then re-enter a fresh report-only verification context.
- **Evidence:** at 390px `browser-results.json` reports `driveMobile.wideDiagramVisible: true`; `screenshots/drive-390.jpg` visibly shows wide flow graphics compressed into the mobile column. Source has no mobile rule hiding/recomposing the `940`-unit responsibility, development-loop, and ship-handoff SVGs. The vertically stacked role cards do not replace the still-visible wide graphics, and the loop/ship flows lack equivalent vertical mobile structures.
- **Bounded remediation:** at the mobile breakpoint, present semantic vertical responsibility, five-stage loop with explicit return, and three-lane ship handoff structures matching the Paper mobile reference; do not merely scale the desktop SVG. Preserve the existing accessible labels/content and desktop composition.

### F2 — Mobile target and local-overflow accessibility contracts are incomplete

- **Severity:** medium
- **Confidence:** high
- **Action:** fix in the same bounded generator task, then rerun the 320/390 target and keyboard/local-overflow probes.
- **Evidence:** every 390px representative reports the same non-inline target dimensions: masthead portal `137.7×17px`, previous/next links `170×32px`, and focused skip link `184×40.8px`. The same four-signature failure appears on every 320px page. The documented compact exception applies to inline glossary-term buttons, not these navigation controls. Separately, at 390px five Drive `pre` regions and one Theory `pre` region actually overflow horizontally (`scrollWidth > clientWidth`) and use `overflow-x:auto`, but each has no `aria-label` and no `tabindex` attribute in `browser-results.json`; body overflow remains correctly contained.
- **Bounded remediation:** give the masthead portal, both guide-sequence links, and skip link an effective minimum 44px hit area without changing visible copy/order or causing body overflow. Checkbox controls should continue to use their surrounding labels as the hit area. Make each genuinely wide code region an explicitly labelled, keyboard-reachable local overflow region (wrapper or `pre`), retaining code text and local containment.

No other objective product finding was observed.

## Fresh evidence files

Structured results and reproducible harness:

- `planning/portal-design-unification/verification/browser-results.json`
- `planning/portal-design-unification/verification/browser-harness.mjs`

Screenshots (all inspected):

| Archetype | 390 | 768 | 1440 |
|---|---|---|---|
| Hub | `screenshots/hub-390.jpg` | `screenshots/hub-768.jpg` | `screenshots/hub-1440.jpg` |
| Drive | `screenshots/drive-390.jpg` | `screenshots/drive-768.jpg` | `screenshots/drive-1440.jpg` |
| Theory | `screenshots/theory-390.jpg` | `screenshots/theory-768.jpg` | `screenshots/theory-1440.jpg` |
| Process | `screenshots/process-390.jpg` | `screenshots/process-768.jpg` | `screenshots/process-1440.jpg` |
| Reference | `screenshots/reference-390.jpg` | `screenshots/reference-768.jpg` | `screenshots/reference-1440.jpg` |
| Interactive | `screenshots/interactive-390.jpg` | `screenshots/interactive-768.jpg` | `screenshots/interactive-1440.jpg` |
| Glossary | `screenshots/glossary-390.jpg` | `screenshots/glossary-768.jpg` | `screenshots/glossary-1440.jpg` |

## Remaining risk and handoff

The deterministic audit is strong for normalized article copy, ordered links, and `data-*` parity, but it does not detect the two browser-only findings above. The candidate must not proceed as verified. Hand F1–F2 to a separate generator task under stages 07/09, preserve the approved copy and interaction contracts, then run a new independent stage-08/09 verification against the remediated exact head.
