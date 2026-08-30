# Final fresh verifier report — portal design unification

## Verdict

**FAIL** for candidate `20f39c704b89bd17d92da5e56f6776737ca92220` against editorial baseline `99e9c2957bb934381f05f5ad4453d9c388d97ea5`.

The remediation closes the prior wide-SVG, target-size, and local-overflow defects, and every deterministic, runtime, interaction, responsive, and accessibility probe otherwise passes. One objective visual-contract finding remains: at 390px, Drive's HUMAN and AGENT responsibility cards stack without the visible directional handoff required by Paper and the durable `Responsibility exchange` vocabulary.

This was report-only verification. No product source, test, existing verification evidence, design artefact, playbook state, spec, Git state, commit, branch, remote, PR, or external system was changed. Fresh writes are confined to `planning/portal-design-unification/verification/final/`.

## Review boundary and repository state

- Initial `git rev-parse HEAD`: `20f39c704b89bd17d92da5e56f6776737ca92220` — exact requested candidate.
- Initial `git status --short` and `git status --porcelain=v1 --untracked-files=all`: empty — clean initial tree.
- Exact reviewed range: `99e9c2957bb934381f05f5ad4453d9c388d97ea5..20f39c704b89bd17d92da5e56f6776737ca92220`.
- Intended later PR base: `main`; no PR or remote action was performed.
- The Mac playbook path is unavailable in this Linux VM. The identical V0.4 mirror at `/home/vercel-sandbox/ai-engineering-playbook/v0.4/`, the project-local `ai-playbook-design-review` skill, and the manual report-only route were used. Normal prerequisite timestamp/state writes were omitted because this verifier has evidence-only authority.
- Warm prerequisites are structurally covered: the nine required project entries, `ci-gates.md`, and all three frontend artefacts exist; state records V0.4.0, `prereqs_required: false`, extended capability routes, and a current capability audit. The read-only security floor found `.env` coverage and no obvious tracked assigned secret pattern.

## Exact diff, scope, and canonical parity

The exact base-to-HEAD range contains 49 files because it includes the feature's planning and historical first-verifier evidence. Product changes remain limited to the 12 active published-playbook pages, shared playbook CSS/JS, and the three root design artefacts. The remaining changed paths are the deterministic audit/baseline, active planning/state, and verification evidence.

Independent base-versus-candidate parsing, excluding navigation-only shell additions, footers, and mobile diagram duplicates, found exact equality for all 12 pages across normalized article text, ordered article links, and ordered `data-*` contracts. This independently agrees with `tools/audit_playbook.py`.

- Sole editorial exception: Hub's first `What's New` label changes from `V0.4 · 2026-08-24` to `V0.4`; `V0.4` remains. No other date removal was observed.
- Documented structural corrections only: Drive's `Human` and `Agent`, plus Theory's `Matt Pocock's skills` and `gstack (Garry Tan)`, change from `h4` to `h3`. Text and order remain unchanged.
- Destinations, script sources, guide order, accessible labels, glossary triggers, and existing interaction `data-*` contracts are preserved.
- No package manifest, lockfile, dependency, workflow, deployment, authentication, payment, user-data, secret, repository-protection, or release surface is introduced or changed.

## Deterministic commands

| Command | Result |
|---|---|
| `git rev-parse HEAD` | PASS — exact candidate |
| `git status --short` before evidence | PASS — clean |
| `git diff --stat`, `--name-status`, `--numstat`, and source review for the exact range | Completed; scope above |
| Independent Python baseline/HEAD article text, ordered link, and ordered `data-*` comparison | PASS — 12/12 exact after the one approved date normalization |
| `python3 tools/audit_playbook.py` | PASS — 12 pages parsed; canonical baseline and local resources agree |
| `node --check agent-engineering-playbook/assets/playbook-docs.js` | PASS |
| Python `json.loads` of `canonical-content-baseline.json` | PASS |
| `git diff --check 99e9c... 20f39c...` | PASS |
| Exact changed-path dependency/protected/deploy scan and added-line secret scan | PASS — no applicable surface or credential pattern |
| `node --check planning/portal-design-unification/verification/final/browser-harness.mjs` | PASS |

## Fresh browser execution

The final harness run used real `Chrome/152.0.7977.64`, a new bounded local HTTP port, a new bounded DevTools port, and a new temporary browser profile. Chrome, server, and profile cleanup all completed. The final run recorded zero harness retries or harness errors.

An earlier verifier-authored probe used programmatic focus, which does not activate Chromium's `:focus-visible` keyboard heuristic. It was classified as a harness false negative, replaced with real Tab key events, and the full target was rerun from fresh Chrome state. It is not used as product evidence. One browser-synthesised, unreferenced `/favicon.ico` request was recorded separately as browser noise; there were zero page-resource network failures, console errors, or runtime exceptions.

All captures used bounded full-page Chromium scaling from the outset with a 15,000px raster-height ceiling and JPEG quality 70. The built-in dependency-free tiled Chromium fallback was available but was not invoked. The 21 required full-page JPEGs are present under `final/screenshots/`; all 21 were opened and inspected after the final run.

## Responsive matrix

All 12 active pages at 320px passed:

- no document/body horizontal overflow;
- exactly one `h1`;
- zero page console errors, runtime exceptions, page-resource network failures, or HTTP errors;
- main, masthead navigation, complementary guide, footer, and valid skip target;
- two visible previous/next links;
- skip, masthead portal, previous, and next targets each rendered at least 44px high.

All 12 pages were also freshly probed at 390px for the same four 44px navigation targets. All passed.

The seven representatives at 390/768/1440 passed the DOM/runtime matrix and produced all 21 screenshots:

| Archetype | Representative |
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
| Mobile guide default/open | PASS — `false → true`, path becomes visible |
| Mobile guide Escape/focus return | PASS — closes and focus returns to 44px control |
| No-JavaScript fallback | PASS — no toggle; all 11 guide links visible |
| Glossary popover | PASS — definition opens; Escape closes; focus returns |
| Choice panel | PASS — second choice activates and output updates |
| Quiz | PASS — correct feedback appears as focused status |
| Checklist | PASS — `0 of 6 → 1 of 6` |
| Route helper | PASS — `feature` yields `Type: I want to build [feature].` |
| Copy status | PASS — `Copied: What's next?` |
| Keyboard focus | PASS — real Tab produces 2px solid ember outline and 4px offset |
| Visited state | PASS — explicit muted-parchment `:visited` rule differs from body link colour |
| Reduced motion | PASS — smooth scrolling, transitions, and animation resolve to disabled |
| Contrast | PASS — parchment 16.38:1, muted parchment 8.75:1, gold 8.88:1, ember 12.25:1 against soot |
| Landmarks and heading hierarchy | PASS across the representative matrix |
| Wide `pre` regions | PASS — all 16 actual width-specific overflow instances are labelled, `tabindex="0"`, locally contained, and show the keyboard focus ring |

No applicable drawer, live filter, tab, URL-state, or row-expansion surface exists in the reviewed scope.

## Prior F1/F2 rerun

- Drive at 390px: all three wide responsibility, loop, and ship SVGs compute to `display:none`.
- The vertical responsibility cards, five-stage loop with explicit return, and three ship lanes are visible. Accessibility-tree names are present for all three replacements.
- Skip, masthead portal, previous, and next targets render at 44px at both 320px and 390px.
- Every actually overflowing `pre` has a nonempty accessible label, `tabindex="0"`, local horizontal containment, keyboard reachability, and visible focus.
- Residual issue: the responsibility cards have no visible direct child or pseudo-element expressing the required `intent` / `pull request` direction between HUMAN and AGENT. The off-screen accessible summary does not replace that visible structural cue.

## Visual inspection

The four local Paper references and all three root design artefacts were inspected directly.

- Hub preserves the Paper identity/masthead, guide hierarchy, dominant guided-path row, oxblood primer, numbered route rhythm, soot/parchment/gold/ember palette, and single-column mobile recomposition while retaining canonical live copy.
- Drive desktop preserves the Paper field-guide rhythm and wide responsibility/loop/ship vocabulary. Drive mobile correctly replaces the loop and ship SVGs with readable vertical structures, but the responsibility exchange omits Paper's visible handoff between its stacked cards.
- Theory, Process, Reference, Interactive, and Glossary consistently use the durable `Published document` vocabulary: unboxed guide rail, one restrained reading field, Oxanium display hierarchy, IBM Plex Mono prose/controls, oxblood bounded emphasis, gold structure, ember interaction, square surfaces, and responsive recomposition/local containment.
- No screenshot shows body clipping, accidental light/blue/green theme residue, centred marketing composition, or card-grid drift.

## Finding

### F1 — Mobile responsibility exchange lacks its visible directional handoff

- **Severity:** medium
- **Confidence:** high
- **Action tag:** `auto-fix` in a separate stage-07/09 generator task, then re-enter a new independent report-only verification context
- **Decision relationship:** defect inside the approved approach; it does not reopen a settled design decision
- **Evidence:** `screenshots/drive-390.jpg` shows the HUMAN and AGENT cards stacked with no handoff between them. Fresh DOM evidence in `browser-results.json → priorDefects.drive390.responsibilityDirectionalHandoff` reports empty direct and pseudo handoff inventories. The Paper mobile reference shows a labelled bidirectional handoff, while `DESIGN-GLOSSARY.md → Responsibility exchange` requires the stacked panels to be separated by an explicit directional handoff.
- **Bounded remediation:** add the visible mobile handoff between the existing cards using the approved gold/ember vocabulary and existing `intent` / `pull request` wording. Preserve canonical article copy, the existing accessible summary, desktop SVG, card order, and all interaction contracts.

No other objective product finding was observed.

## Fresh evidence

- `planning/portal-design-unification/verification/final/browser-results.json`
- `planning/portal-design-unification/verification/final/browser-harness.mjs`
- `planning/portal-design-unification/verification/final/screenshots/*.jpg` — 21 inspected captures
- `planning/portal-design-unification/verification/final/fresh-verifier-report.md`

The candidate must not proceed as verified. Hand F1 to a separate generator task, then run a new fresh verifier against the remediated exact HEAD. No product fix was made here.
