# Portal design unification — feature specification

Status: approved alignment synthesised; no open product decisions.

## Problem statement

The published playbook currently reads as a separate light, blue/green card system rather than a published path in the Rudy Molt Ideas Portal. Migrate all 12 active pages under `agent-engineering-playbook/` to the approved Paper design's `Published document` mode while preserving the existing HTML as the canonical editorial source and retaining every guide route and interactive learning behaviour.

## Users and outcomes

1. A first-time reader can recognise Rudy as publisher and choose the dominant guided path without first learning the playbook's information architecture.
2. A practising builder can scan and open the process, reference, or guide destination they need.
3. A returning reader can identify the current guide step and use visible previous/next navigation at every supported width.
4. A mobile reader gets one readable column and vertically recomposed or locally scrollable diagrams rather than scaled thumbnails or body overflow.
5. Keyboard and assistive-technology users can skip repeated navigation, identify landmarks and current state, operate the guide disclosure and interactive tools, and see focus and link states.

## Scope

- Update `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, and `frontend-design-language-guide.html` first with the published-document vocabulary, components, states, seven archetypes, and responsive rules.
- Replace the playbook's light blue/green shared theme through `agent-engineering-playbook/assets/playbook-docs.css`.
- Make only the shared JavaScript changes needed for the mobile guide disclosure, focus return, and preserved existing tools.
- Migrate the Hub and Drive Agent compositions first, then the other five archetype groups across all 12 active playbook HTML pages.
- Replace old palette literals in page-local styles and diagrams where the shared tokens cannot override them.
- Store fresh verification reports and responsive screenshots in this active planning folder.

The root `index.html` is the approved `Editorial index` brand source. Other independently published path families are not redesigned by this feature: the handoff's implementation order, visual references, and seven archetypes all bind the production migration to `agent-engineering-playbook/`.

## Editorial and behaviour invariants

- Preserve visible editorial text, headings, terminology, section order, accessible labels, link destinations, `data-*` interaction contracts, script sources, glossary popovers, quizzes, checklists, route helpers, diagram explainers, and copy controls.
- Approved exception: in the Hub's first V0.4 entry under `What's New`, change `V0.4 · 2026-08-24` to `V0.4`. No other publication or verification date is removed.
- Paper's condensed demo prose is layout shorthand and must not replace the active HTML.
- Navigation-only structural additions may reuse existing route labels and destinations to satisfy the shared shell without changing article prose.

## Approved design contract

- Soot `#0a0605` is the document field; parchment `#f4e7c2` and muted parchment `#b9a98a` carry text; oxblood `#240100` and burgundy `#4a0708` bound emphasis; signal gold `#d5a527` expresses structure; ember `#f0c45c` expresses interaction.
- Oxanium is the display face and IBM Plex Mono is the prose, navigation, metadata, control, and code face.
- Desktop uses an identity masthead, an unboxed 220–240px guide rail, and a 65–72ch reading field inside an 1180–1200px shell.
- Tablet makes the guide inline before the reading field becomes compressed.
- Mobile uses 20px page padding, one reading column, a 44px `Guide path · Step N of 11` disclosure, and visible previous/next links.
- Default radius is zero. Oxblood indicates bounded emphasis, decisions, or authority; gold rules/arrows indicate flow; bordered soot panels indicate neutral stages.
- HUMAN and AGENT exchanges use explicit labels and distinct structure. Process loops show numbered stages, direction, and return. Ship handoffs separate AGENT PRE-PR, HUMAN GITHUB, and AGENT POST-MERGE.
- Wide code, tables, and diagrams remain readable in labelled local overflow regions. Paper-specific Drive Agent diagrams vertically recompose on mobile.

## Archetypes

| Archetype | Pages | Required primitive |
|---|---|---|
| Published hub | `index.html` | authored orientation, dominant guided-path row, numbered destination rows |
| Editorial field guide/tutorial | `50-how-to-write-code-with-ai.html`, `80-quickstart.html` | sequential sections, exchanges, loops, retained next action |
| Theory essay | `60-the-theory-behind-the-playbook.html` | restrained long-form field, anchored contents, readable diagrams |
| Process route map | `10-process/index.html` | ordered phases and bounded route tools |
| Reference chapter | `00-foundations.html`, `20-frontend-track.html`, `30-document-lifecycle.html`, `70-lite-mode.html` | scannable rules, tables, definitions, evidence, local contents |
| Interactive stage guide | `10-process/01-align.html`, `10-process/04-breakdown.html` | labelled checklist, choice, quiz, output, error, and recovery states |
| Glossary reference | `glossary.html` | dense index entries rather than cards or pills |

## Seams and implementation constraints

1. **Vocabulary seam:** the three root design artefacts define every production primitive before it appears in playbook source.
2. **Shared presentation seam:** `playbook-docs.css` owns tokens, shell, typography, navigation, responsive layout, panels, tool states, and common diagram treatment.
3. **Shared behaviour seam:** `playbook-docs.js` owns progressive mobile-guide enhancement while retaining all existing initialisers.
4. **Canonical HTML seam:** individual pages keep editorial markup; only shell/accessibility hooks, the approved date removal, palette literals, and diagram recomposition markup may change.
5. **Verification seam:** deterministic audits compare canonical text/link/heading/interaction inventories, parse every page, resolve every local link/asset, and check required semantic/design markers.
6. **Browser seam:** Chromium verifies representative pages for all seven archetypes at 390px, 768px, and 1440px, plus 320px body overflow and keyboard/disclosure behaviour.

## Acceptance criteria

1. All 12 active published playbook pages visibly use the approved published-document palette and typography; old blue/green light-card tokens and literals are absent from active playbook HTML/CSS.
2. Hub and Drive Agent match the approved Paper compositions in hierarchy, rhythm, graphic vocabulary, and responsive treatment without substituting Paper demo prose.
3. The seven archetypes use named primitives present in all three root design artefacts.
4. The canonical text, headings, destinations, accessible labels, guide order, and interaction contracts match the pre-migration inventory except for the single approved Hub date removal and navigation-only structural reuse.
5. Each page has one `h1`, a valid heading hierarchy, a main landmark, visible focus, underlined body links, distinguishable visited links, reduced-motion handling, and no body overflow at 320px or wider.
6. Every guided page has a complementary guide rail, visible previous/next, and current-state semantics; mobile disclosure exposes `aria-expanded`, closes on Escape, returns focus, and has a 44px target.
7. Interactive controls preserve current behaviour and mobile targets. Wide regions are labelled and locally scrollable. Drive Agent diagrams vertically recompose on mobile.
8. Every active playbook HTML file parses and every local route/asset resolves.
9. Browser QA passes at 390px, 768px, and 1440px for Hub, Drive Agent, and one representative page from each of the other five archetypes; 320px overflow passes for all pages.
10. A fresh verifier reruns deterministic and browser checks against the exact candidate head and records report-only evidence before PR handback.

## Testing decisions

- Add a repository-local Python audit for deterministic HTML, copy/link/interaction parity, accessibility markers, palette drift, and local route/asset checks. Capture the pre-change canonical inventory before production edits.
- Use `html.parser` for every active playbook page and `git diff --check` for source hygiene.
- Exercise glossary, choice, quiz, checklist, route selector, copy status, and mobile guide disclosure in Chromium.
- Capture full-page screenshots for the required 390/768/1440 representative matrix and retain them under `planning/portal-design-unification/verification/`.
- Use a fresh report-only verifier for stage 08/09. Any verifier fix returns to implementation and a new verification pass.

## Out of scope

- Redesigning the Ideas Portal homepage or unrelated published-path families.
- Rewriting or synchronising the operational playbook.
- Replacing canonical editorial copy with Paper shorthand.
- Adding a framework, package manager, build system, datastore, runtime, or dependency.
- Adding destinations, changing guide order, merging, deploying, publishing a release, or modifying repository protections.

## Open questions

None. The approved Paper screenshots, design review, canonical HTML, and explicit handoff settle the implementation decisions needed for this feature.
