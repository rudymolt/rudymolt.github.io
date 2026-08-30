# Cloud build handoff — portal design unification

Status: ready for cloud specification, breakdown, implementation, verification, and exact PR handback.

## Objective

Update every active published page in the Rudy Molt Ideas Portal repository so it uses the approved portal design language while preserving editorial meaning, destinations, and behaviour. Start by establishing the shared design vocabulary, then migrate the AI Engineering Playbook Hub and Drive Agent page, then roll the system across the remaining documented archetypes.

Repository: `https://github.com/rudymolt/rudymolt.github.io.git`

Base branch: `main`

Feature slug: `portal-design-unification`

## Authority and terminal condition

- The agent may create and edit task-owned repository files, run local verification, push the feature branch, and open or update an exact pull request.
- The agent must not merge the pull request, deploy to production, publish a release, or change repository protections.
- Stop at an exact PR handback with a tested head and durable verification evidence.
- Ask the human only when a decision cannot be safely derived from the approved design and existing source.

## Required starting context

Read in order:

1. `/Users/tom/Developer/ai-engineering-playbook/v0.4/AGENT-DIGEST.md` when available; in cloud, use the repository's project-local playbook skills and `CLAUDE.md` routing when the Mac playbook path is absent.
2. `CLAUDE.md`, `CONTEXT.md`, `.playbook-state.yml`, and `planning/STATUS.md`.
3. `planning/portal-design-unification/design-review.md`.
4. The four approved visual references in `planning/portal-design-unification/paper/`.
5. `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, and `frontend-design-language-guide.html`.
6. The active published HTML and shared CSS under `agent-engineering-playbook/`; do not read `archive/`.

Paper file: [Rudy Molt — Ideas Portal Redesign](https://app.paper.design/file/01M17PVD32F204HBY78WH2Z9Z8/1-0)

## Source-of-truth boundary

- **Visual source:** approved Paper artboards and the committed Paper screenshots. They control composition, hierarchy, tokens, diagrams, graphic treatment, responsive recomposition, navigation surfaces, spacing, and interaction presentation.
- **Editorial source:** existing active HTML. Preserve text, links, terminology, section order, accessible labels, and interactive behaviour verbatim.
- **Approved copy exception:** remove the publication date from Hub section 02 at every breakpoint while retaining `V0.4` as the release identifier.
- The condensed prose visible in parts of the Paper mockups is layout shorthand, not replacement copy.

## Approved visual system

- Modes: `Editorial index` and `Published document`.
- Palette: soot `#0A0605`, parchment `#F4E7C2`, muted parchment `#B9A98A`, oxblood `#240100`, burgundy `#4A0708`, gold `#D5A527`, ember `#F0C45C`.
- Typography: Oxanium for display; IBM Plex Mono for prose, navigation, metadata, controls, and code.
- Desktop document shell: identity masthead, 220–240px unboxed guide rail, 65–72ch reading field, visible previous/next.
- Mobile: 20px page padding, one reading column, `Guide path · Step N of 11` disclosure, visible previous/next.
- Default radius is zero; oxblood marks bounded emphasis, decisions, or authority; gold rules/arrows express sequence; bordered soot panels express neutral stages.
- Responsibility exchanges use distinct HUMAN and AGENT panels with labelled directional handoff.
- Process loops use numbered stage panels connected by gold directional rules and an explicit return path.
- Ship diagrams use separate AGENT PRE-PR, HUMAN GITHUB, and AGENT POST-MERGE lanes with the handoff boundary labelled.
- Mobile diagrams recompose vertically; never scale desktop diagrams into unreadable thumbnails.

## Required playbook route

1. Run stage 03 specification from the approved alignment without re-interviewing. Write `planning/portal-design-unification/spec.md`, including acceptance criteria, seams, testing decisions, out of scope, and open questions.
2. Run coherence and scope checks, then the required engineering review before implementation.
3. Run stage 04 breakdown. Write durable vertical slices with dependency lines, AFK/HITL labels, demoable outcomes, and verification targets. Because this is an agent-owned route capped at an open PR, read the delivery-mission guidance before stage 07 if the project route requires an envelope.
4. Update `.playbook-state.yml` and `planning/STATUS.md` at every stage transition and recompute the status block using the playbook script.
5. Implement through the repository's TDD/build route. Update the three root design artefacts before production HTML/CSS.
6. Verify independently, then run real browser QA at 390px, 768px, and 1440px plus a 320px overflow check.
7. Push and open/update the exact PR. Stop before merge.

## Implementation order

1. Design vocabulary: `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, `frontend-design-language-guide.html`.
2. Shared document system: `agent-engineering-playbook/assets/playbook-docs.css` and only the shared JS changes necessary for approved behaviour.
3. Hub: `agent-engineering-playbook/index.html`.
4. Drive Agent: `agent-engineering-playbook/50-how-to-write-code-with-ai.html`.
5. Remaining six page archetypes listed in `design-review.md`, migrated surgically across active published pages.
6. Cross-page verification and exact PR handback.

## Acceptance criteria

- Every active published page belongs visibly to the portal design system; no parallel blue/green light-card theme remains.
- Existing editorial copy, links, headings, terminology, guide order, glossary behaviour, and interactive learning tools are preserved, except for the approved Hub date removal.
- The Hub and Drive Agent match the approved visual references in composition and graphic vocabulary.
- All seven archetypes use documented primitives from the updated root design artefacts.
- Desktop/tablet/mobile layouts follow the responsive contract; diagrams recompose rather than shrink.
- One `h1`, valid heading hierarchy, landmarks, skip link, visible keyboard focus, distinguishable visited links, reduced-motion handling, 44px mobile targets, labelled overflow regions, and no body overflow at 320px or wider.
- HTML parsing and all local-link/asset checks pass.
- Browser QA passes at 390px, 768px, and 1440px for the Hub, Drive Agent, and one representative page per remaining archetype.
- A fresh verifier reruns the required checks and stores evidence before the PR is handed back.

## Durable evidence

Store the spec, slice plan, engineering review, verification report, responsive screenshots, and exact test commands/results under the active planning folder or another task-owned committed evidence path. Do not depend on `.context`, the local Mac filesystem, or an uncommitted Paper session.

## Definition of done

The feature branch contains the approved design-system migration, all required documentation/state updates, and durable verification evidence; the exact branch head is pushed; an exact PR against `main` exists; and the cloud agent reports the PR identity, commit SHA, checks run, remaining risks, and that merge/deploy were not performed.
