# Portal design unification — alignment and design review

Status: design approved; ready for specification and breakdown.

Plan route: `route-20260830-portal-design-unification` · GPT-5.6 Sol/high · verified read-only Codex sidecar `01a05299-3749-79e1-8e66-b69f28cb3975`.

## Goal

Make every published page feel unmistakably part of the Rudy Molt Ideas Portal while preserving the navigation, reading measure, and interaction support required by dense documentation. The system has one brand and two sanctioned modes:

1. **Editorial index** — the existing portal composition.
2. **Published document** — a dark editorial field guide for hubs, essays, references, process routes, and interactive learning pages.

## Audience and jobs

- A first-time non-coder needs to understand the playbook and start a guided route without learning its information architecture first.
- A practising builder needs to jump directly to a process stage, guide, or reference.
- A returning reader needs to recognise the page, recover their place, and move to the previous or next guide.
- A portal visitor needs to recognise Rudy as the publisher and return to the Ideas Portal.

## Approved direction

1. Review and design all seven page archetypes, not only the first hub example.
2. Make **Start the guided path** the hub's dominant action; place the task index below it as an expert shortcut.
3. Use an **editorial field guide** character: authored on arrival, calm and operational while reading.
4. Use Oxanium for display and IBM Plex Mono for prose, navigation, metadata, controls, and code.
5. On mobile, replace the eleven-step rail with a 44px inline guide disclosure; keep previous/next navigation visible.
6. Express `HUMAN`, `AGENT`, `CAUTION`, success, and current states through explicit labels plus distinct border/shape treatments inside the portal palette. Meaning never depends on colour alone.
7. Treat Paper as the canonical visual source and the existing published HTML as the canonical editorial-copy source. Implementation must preserve existing text, links, terminology, and content order unless a specific copy change is recorded here.

Approved copy exception: remove the publication date from Hub section 02 at every breakpoint; retain `V0.4` as the release identifier.

## Scope

- Establish the shared documentation vocabulary, tokens, components, states, and responsive rules.
- Produce the first Paper example for `agent-engineering-playbook/index.html` at 1440px and 390px.
- Cover the seven representative page archetypes before rollout.
- Update the three root design artefacts before production HTML/CSS.
- Preserve content, destinations, guide order, glossary behaviour, and interactive learning tools.
- Migrate published pages archetype by archetype and verify at 390px, 768px, and 1440px.

## Not in scope

- Redesigning the Ideas Portal itself; it is the approved brand source.
- Rewriting editorial content or changing the operational AI engineering playbook.
- Adding destinations or automatic publication synchronisation.
- Introducing a framework, build system, datastore, or server runtime.
- Forcing every page into the homepage composition.
- Retaining a second blue/green documentation palette.

## What already exists

- `index.html` supplies the approved soot, oxblood, parchment, gold, ember, Oxanium, and IBM Plex Mono language.
- `DESIGN-GLOSSARY.md` names the current foundations and editorial components.
- `ui-kitchen-sink.html` is the component reference that must gain the new documentation primitives.
- `frontend-design-language-guide.html` supplies surface-decision rules.
- `agent-engineering-playbook/assets/playbook-docs.css` already centralises most playbook document styles and interactions, making it the primary migration seam.
- Existing document HTML contains useful semantic structure, guide order, interactive tools, and local links that should be preserved.

## Seven page archetypes

| # | Archetype | Representative page | Required composition |
|---|---|---|---|
| 1 | Published hub | `agent-engineering-playbook/index.html` | Orientation, edition status, primer, dominant guided-path row, grouped destinations |
| 2 | Editorial field guide/tutorial | `50-how-to-write-code-with-ai.html`, `80-quickstart.html` | Sequential instruction, examples, dialogue, retained next action |
| 3 | Theory essay | `60-the-theory-behind-the-playbook.html` | Long-form reading, anchored contents, restrained diagrams |
| 4 | Process route map | `10-process/index.html` | Ordered phases, stage rows, routing support, bounded choice tools |
| 5 | Reference chapter | `00-foundations.html`, `20-frontend-track.html`, `30-document-lifecycle.html`, `70-lite-mode.html` | Scannable rules, tables, definitions, evidence, local contents |
| 6 | Interactive stage guide | `10-process/01-align.html`, `10-process/04-breakdown.html` | Stage explanation plus labelled checklist, choice, quiz, output, error, and recovery states |
| 7 | Glossary reference | `glossary.html` | Grouped terminology as dense index entries rather than cards or pills |

## Exact design mapping

| Current playbook term | Published-document term |
|---|---|
| Light page/panel backgrounds | Soot field `#0a0605`; oxblood field `#240100` for cadence and bounded emphasis |
| Dark neutral text | Parchment `#f4e7c2`; muted parchment `#b9a98a` |
| Grey panel rules | Gold rule `rgba(213, 165, 39, .28)` |
| Blue links/current state | Ember `#f0c45c`, with underline/current label/focus treatment |
| Blue/green/brown semantic tints | Portal palette plus explicit labels and structural differences |
| Source Serif/Inter/JetBrains Mono | Oxanium 500–700 plus IBM Plex Mono 400–600 |
| 210px rounded timeline card | Unboxed 220–240px guide rail with gold rule |
| Mobile horizontal guide pills | Inline `Guide path · Step N of 11` disclosure plus visible previous/next |
| Grid/button destination links | Numbered full-width index rows |
| White rounded cards and shadows | Editorial rows or oxblood fields; bounded interactive panels only when interaction requires them |
| Rounded semantic tags | Unfilled uppercase eyebrows such as `START HERE`, `HUMAN`, or `CAUTION` |
| Blue start button | Dominant whole-row guided-path action |

Typography and spacing contract:

- Body: 17px/1.65 desktop, 16px/1.65 mobile; sustained prose stays within 65–72 characters.
- Headings: left-aligned Oxanium with compact line-height; never centred.
- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, and 56px.
- Radius: 0 by default; no more than 4px for images and genuinely bounded interactive surfaces.

## Information architecture

The hub's first three jobs are fixed:

1. Establish publisher, playbook identity, edition, and purpose.
2. Offer one dominant **Start the guided path** action.
3. Give returning readers the quieter **Choose what you need** index.

Route hierarchy: Rudy identity → published playbook → guide sequence → page contents. Each long-form document ends with explicit previous/next navigation and the editorial footer.

## Interaction states

| Feature | Default | Current/success | Error/unavailable | Focus and partial state |
|---|---|---|---|---|
| Guide path | Ordered destinations | Gold current rule, text label, `aria-current` | Broken destinations fail pre-merge link checks | Ember outline; disclosure reports expanded state |
| Index row | Underlined ember destination | Visited colour remains distinguishable | No disabled rows; legacy destination stays live until migrated | Whole row is the target; metadata remains visible |
| Interactive panel | Label, instruction, control | Output appears next to the initiating task | Labelled recovery text and retained input | Keyboard order follows visual order; partial answers remain editable |
| Mobile guide | Collapsed with current step visible | Expanded ordered path | Disclosure never hides document previous/next | `aria-expanded`, Escape, focus return, 44px control |
| Tables/diagrams/code | Fits the reading measure | — | — | Labelled internal scroll region when wider than viewport |

Static documents do not invent loading or empty states. Missing local pages and assets are build failures, not public-facing placeholders.

## User journey

| Horizon | Reader experience | Design response |
|---|---|---|
| 5 seconds | “This is Rudy's work, and I know where to begin.” | Identity lockup, numbered eyebrow, authored heading, dominant guided-path row |
| 5 minutes | “I can follow this while doing the work.” | Calm 68ch reading column, visible sequence, scannable labels, bounded tools |
| Returning visit | “I recognise the system and can recover my place.” | Stable masthead, current-step treatment, visited links, previous/next |
| Long term | “This is a coherent published body of work.” | Shared tokens and components across every explainer archetype |

## Responsive and accessibility contract

- Test 1440px, 768px, and 390px; there must be no body overflow at 320px or wider.
- Desktop uses an 1180–1200px shell, 220–240px guide rail, and one 65–72ch reading column; no third column.
- Tablet makes the guide non-sticky and inline before content pressure creates overflow.
- Mobile uses 20px side padding, one reading column, and the inline guide disclosure.
- One `h1`; visual and semantic heading order agree.
- Landmarks: masthead, primary/local navigation, main, complementary guide rail, and footer.
- A skip link targets main content.
- Body links are underlined; visited and unvisited states differ without hover.
- Focus is a 2px ember outline with a 4px offset.
- Contrast: 4.5:1 normal text; 3:1 large text and meaningful non-text boundaries.
- Whole-row links or otherwise 44px minimum targets.
- Hover never carries unique meaning or changes layout.
- Reduced motion disables smooth scrolling and transitions.
- Long URLs wrap; tables, code, and diagrams get labelled local scrolling.
- Desktop and mobile preserve the same wording and content order unless a documented reordering rule exists.

## ASCII approval surface

### Desktop · 1440px

```text
┌────────────────────────────────────────────────────────────────────────────┐
│ (RM) RUDY MOLT      AI ENGINEERING PLAYBOOK / V0.4          PORTAL ↗     │
├──────────────────┬─────────────────────────────────────────────────────────┤
│ GUIDE PATH       │  01 / PUBLISHED PLAYBOOK                              │
│ 01 Hub ●         │  AI Engineering Playbook                              │
│ 02 Drive agent   │  Human-led, agent-assisted engineering.               │
│ 03 Process map   │                                                       │
│ …                │  ───────────────────────────────────────────────────  │
│                  │  01  START THE GUIDED PATH                       ↗    │
│ PREVIOUS         │      One feature, from first sentence to ship.        │
│ Rudy portal      │  ───────────────────────────────────────────────────  │
│                  │  02  WHAT'S NEW                                      │
│ NEXT             │      V0.4 makes the whole workflow visible.           │
│ Drive agent ↗    │                                                       │
│                  │  03  WHERE DO YOU WANT TO START?                      │
│                  │  A   Drive the agent                             ↗    │
│                  │  B   See the process run once                    ↗    │
│                  │  C   Check the principles                        ↗    │
└──────────────────┴─────────────────────────────────────────────────────────┘
```

### Mobile · 390px

```text
┌──────────────────────────────┐
│ (RM) RUDY MOLT    PORTAL ↗  │
├──────────────────────────────┤
│ PLAYBOOK · STEP 1 OF 11      │
│ CURRENT: HUB      [GUIDE +]  │
├──────────────────────────────┤
│ 01 / PUBLISHED PLAYBOOK      │
│ AI Engineering Playbook      │
│ Human-led, agent-assisted…   │
│                              │
│ ───────────────────────────  │
│ 01 START THE GUIDED PATH  ↗  │
│    One feature end to end.   │
│ ───────────────────────────  │
│ 02 WHAT'S NEW                │
│    V0.4 makes the whole      │
│    workflow visible.         │
│    V0.4 · 24 AUG 2026        │
│                              │
│ 03 WHERE DO YOU WANT TO      │
│    START?                    │
│ A  Drive the agent        ↗  │
│ B  See the process once   ↗  │
│ C  Check principles       ↗  │
├──────────────────────────────┤
│ PREVIOUS: RUDY PORTAL        │
│ NEXT: DRIVE THE AGENT     ↗  │
└──────────────────────────────┘
```

## Paper mockups — approved

Paper file: [Rudy Molt — Ideas Portal Redesign](https://app.paper.design/file/01M17PVD32F204HBY78WH2Z9Z8/1-0)

| Artboard | Size | Direction |
|---|---:|---|
| Desktop — Complete Playbook Hub | 1440 × 4623 | Full hub content, eleven-route index, release history, explainer sequence, publication inventory, and acknowledgements |
| Mobile — Complete Playbook Hub | 390 × 3997 | Native status bar, disclosure rail, vertical explainer sequence, and the complete route/content order |
| Desktop — Complete Drive Agent | 1440 × 5164 | Full six-section field guide with responsibility exchange, development loop, ship swimlanes, smoke floor, and phrase tool |
| Mobile — Complete Drive Agent | 390 × 5217 | Full content reflow with vertically recomposed diagrams and single-column interactive surfaces |

All four artboards reuse the Paper file's existing palette and typography tokens and cloned identity artwork. Paper's screenshot checkpoint passed spacing, typography, contrast, alignment, repetition, responsive recomposition, and artboard-fit review.

Paper feedback round 1 is resolved: destination rows now use `A / B / C`; sections 02 and 03 use the same number → large heading → supporting-copy hierarchy as section 01; the repeated category legend is removed; and the desktop edits are mirrored on mobile.

Paper feedback round 2 is resolved: sections 02 and 03 now reuse section 01's fixed number, fluid content, and reserved trailing lanes (`64px / fluid / 40px` on desktop; `32px / fluid / 28px` on mobile), together with its rule, spacing, and heading treatment. Their existing content and semantics are unchanged.

Paper feedback round 3 is resolved: section 02 contains no publication date on either breakpoint; `V0.4` remains as the release identifier. The Hub and Drive Agent are now mocked through their complete page structures. Diagrams use the same token vocabulary as prose surfaces: gold rules and arrows express flow, oxblood expresses decisions or authority boundaries, and bordered soot panels express neutral stages. Mobile diagrams recompose vertically rather than shrinking.

## Acceptance evidence

- Human approved both ASCII compositions before Paper work.
- Paper contains complete desktop 1440 and mobile 390 artboards for both the playbook Hub and Drive Agent pages in “Rudy Molt — Ideas Portal Redesign”.
- Human approves the Paper mockup before specification and implementation planning.
- The design glossary, kitchen sink, and design-language guide define every new term before source migration.
- The hub and one representative page per remaining archetype demonstrate the shared system without changing content meaning or destinations.
- HTML parsing and local-link/asset checks pass.
- Keyboard, disclosure, visited-link, focus, reduced-motion, contrast, and overflow behaviour pass.
- Browser QA passes at 390px, 768px, and 1440px, followed by GitHub Pages canary verification.

## Implementation Tasks

Synthesized from this review's findings. Each task derives from a specific finding above. Run with Codex; checkbox as work ships.

- [ ] **T1 (P1, human: ~3h / Codex: ~25min)** — Design vocabulary — Add the published-document foundations, components, states, and seven archetypes.
  - Surfaced by: Design-system alignment — the playbook currently carries a separate light/card vocabulary.
  - Files: `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, `frontend-design-language-guide.html`
  - Verify: inspect kitchen-sink examples at 390/768/1440 and check every new term against the glossary.
- [ ] **T2 (P1, human: ~4h / Codex: ~35min)** — Paper — Produce and approve the playbook hub at 1440px and 390px, with a 768px recomposition annotation.
  - Surfaced by: UI preview gate — visual approval is required before source edits.
  - Files: Paper file “Rudy Molt — Ideas Portal Redesign”
  - Verify: human approval of both artboards and responsive annotations.
- [ ] **T3 (P1, human: ~5h / Codex: ~45min)** — Shared document CSS — Replace the parallel light/card theme with the published-document contract.
  - Surfaced by: Exact design mapping — typography, palette, guide navigation, semantics, focus, motion, overflow, and radii all change.
  - Files: `agent-engineering-playbook/assets/playbook-docs.css`
  - Verify: CSS/HTML parse, contrast, reduced motion, keyboard focus, and responsive browser QA.
- [ ] **T4 (P1, human: ~3h / Codex: ~30min)** — Published hub — Migrate the hub to guided-path-first information architecture.
  - Surfaced by: Information architecture — the current hero and route grid compete for attention.
  - Files: `agent-engineering-playbook/index.html`
  - Verify: content/link parity plus 390/768/1440 screenshots against Paper.
- [ ] **T5 (P2, human: ~2d / Codex: ~3h)** — Page archetypes — Migrate the remaining six archetypes surgically while preserving behaviour.
  - Surfaced by: Scope assessment — 21 active HTML pages use shared CSS plus page-local variants.
  - Files: active published explainer directories, excluding `archive/`
  - Verify: parse every HTML file; check every local route/asset and representative page for each archetype.
- [ ] **T6 (P1, human: ~4h / Codex: ~45min)** — Release verification — Run cross-page accessibility, responsive, and GitHub Pages canary checks.
  - Surfaced by: Responsive/accessibility pass — desktop, tablet, mobile, and interactive states require explicit evidence.
  - Files: verification evidence only; no production mutation during report-only review.
  - Verify: 390/768/1440 browser QA, no 320px overflow, keyboard flow, local links/assets, then production canary.

## Completion summary

| Review dimension | Before | After |
|---|---:|---:|
| Information architecture | 7/10 | 10/10 |
| Interaction states | 8/10 | 10/10 |
| User journey | 8/10 | 10/10 |
| AI-slop resistance | 8/10 | 10/10 |
| Design-system alignment | 8/10 | 10/10 |
| Responsive/accessibility | 7/10 | 10/10 |
| Unresolved design decisions | 2 open | 0 open |
| Overall design completeness | 6/10 | 10/10 |

No TODO items were deferred. The complete Hub and Drive Agent Paper artboards were approved by the human on 2026-08-30.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | Not run; no fundamental product-direction gap surfaced |
| Codex Review | `/codex review` | Independent second opinion | 0 | — | Not run |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | REQUIRED | Run after Paper approval and specification |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAR | Score 6/10 → 10/10; six decisions approved; no deferrals |
| DX Review | `/plan-devex-review` | Developer-experience gaps | 0 | — | Not run |

**VERDICT:** DESIGN APPROVED — ASCII and Paper approval gates are complete; specification, breakdown, and eng review remain before implementation.

NO UNRESOLVED DECISIONS
