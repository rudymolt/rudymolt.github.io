# Portal design unification — vertical slice plan

Build mode: autonomous AFK sequence to exact PR handback. The approved Paper and alignment evidence settle all taste decisions required by these slices.

## Slice 1 — Published-document vocabulary and regression harness

- **Mode:** AFK
- **Depends on:** nothing
- **Demoable outcome:** opening `ui-kitchen-sink.html` shows the approved published-document shell, guide rail, numbered row, responsibility exchange, process loop, handoff lanes, interactive panel, and glossary entry examples at desktop, tablet, and mobile widths.
- **Implementation:** update all three root design artefacts; add the deterministic audit and bind it to `canonical-content-baseline.json`.
- **Verification target:** glossary terms and kitchen-sink anchors agree; guide decisions name every new surface; canonical-content checks pass; new production-design assertions fail before Slice 2 because the active playbook still carries the legacy theme.

## Slice 2 — Shared shell, Hub, and Drive Agent

- **Mode:** AFK
- **Depends on:** Slice 1
- **Demoable outcome:** the Hub and Drive Agent render in the approved Paper hierarchy at 390px and 1440px, with a tablet recomposition, accessible mobile guide disclosure, visible previous/next, and readable mobile exchanges/loops/handoff.
- **Implementation:** migrate shared CSS and the minimal shared guide JavaScript; add shell/accessibility hooks; migrate Hub and Drive Agent; remove only the approved Hub section-02 publication date; correct the empty duplicate Hub article tag.
- **Verification target:** canonical-content inventory passes; the approved date is absent and `V0.4` remains; guide disclosure passes keyboard/Escape/focus checks; Hub and Drive screenshots match Paper composition and graphic vocabulary; no body overflow at 320px.

## Slice 3 — Remaining published-playbook archetypes

- **Mode:** AFK
- **Depends on:** Slice 2
- **Demoable outcome:** theory essay, process route map, reference chapters, interactive stage guides, quickstart tutorial, and glossary all visibly belong to the same published-document system while retaining their content and tools.
- **Implementation:** migrate legacy literals and archetype-specific surfaces across the remaining ten pages; give the glossary the shared shell; make wide tables/code/diagrams readable without body overflow.
- **Verification target:** all 12 pages pass parse, canonical inventory, local link/asset, one-`h1`, heading, landmark, current-state, previous/next, focus, reduced-motion, palette-drift, and 320px overflow checks; representative screenshots cover all seven archetypes.

## Slice 4 — Contract, independent verification, and exact PR handback

- **Mode:** AFK
- **Depends on:** Slice 3
- **Demoable outcome:** the exact candidate head has durable deterministic and browser evidence, an independent verifier verdict, and an open PR against `main` ready for human review.
- **Implementation:** remove remaining legacy-theme residue, run stage 08 and stage 09 in a fresh report-only session, remediate only objective in-scope findings through a separate build task, rerun fresh verification, update state/evidence, commit, push, and open/update the exact PR.
- **Verification target:** `git diff --check`, deterministic audit, local HTTP browser smoke, 390/768/1440 representative matrix, all-page 320px overflow, keyboard/interactive flow, and fresh verifier pass bind to the pushed head SHA; PR base is exactly `main` and head is the tested commit.

## Slice 5 — Production control and navigation polish

- **Mode:** AFK remediation
- **Depends on:** merged Slice 4 and the supplied production screenshot
- **Demoable outcome:** dark-theme controls retain readable foreground colour, guide sequence labels and destinations have deliberate hierarchy, the Hub start row uses the approved transparent published-document surface, and the guide disclosure appears only where the mobile path actually collapses.
- **Implementation:** add cascade regression contracts, repair shared control/sequence/start-row/disclosure styles, and bump the stylesheet cache key across all 12 pages without changing editorial copy.
- **Verification target:** the regression audit passes after first failing on the reproduced defects; real Chrome at 390/768/1440 confirms control contrast, sequence spacing, disclosure visibility and behavior, responsive targets, interactions, and unchanged canonical digests; a fresh report-only design review returns no objective finding.

## Slice 6 — Shared sidebar rhythm isolation

- **Mode:** AFK remediation
- **Depends on:** merged Slice 5 and the supplied Drive Agent production screenshot
- **Demoable outcome:** Drive Agent and Theory use the same guide-row height and total rail rhythm as Hub and every other published guide at matched viewports.
- **Implementation:** isolate `.timeline-step` from legacy article-wide list margins and bump the stylesheet cache key across all 12 pages without changing editorial copy.
- **Verification target:** the regression contract fails before the reset and passes after it; computed-style probes at 390/768/1440 confirm identical guide-row geometry across Hub, Drive Agent, Theory, and Process Map; canonical digests, links, interactions, and body-overflow checks remain green.

## Slice 7 — Paper-aligned editorial footer

- **Mode:** AFK remediation
- **Depends on:** merged Slice 6 and the supplied Hub production screenshot
- **Demoable outcome:** the editorial footer continues the published-document grid: its rule, tagline, and identity align exactly with the article measure on desktop and tablet, then stack cleanly on mobile.
- **Implementation:** add a shared measured footer-content wrapper, align it with the guide-content column, preserve the canonical footer wording, and bump the stylesheet cache key across all 12 pages.
- **Verification target:** the footer-shell contracts fail before the repair and pass after it; Chrome at 390/768/1440 confirms matching left and right article edges, correct responsive composition, no body overflow, and unchanged canonical digests; a fresh report-only Paper comparison returns no objective finding.

## Dependency frontier

`Slice 1 → Slice 2 → Slice 3 → Slice 4 → Slice 5 → Slice 6 → Slice 7`

This is the stage-04 expand–migrate–contract exception for a shared visual-system refactor: expand the sanctioned vocabulary and checks, migrate the two approved references, migrate the remaining consumers, then contract away the legacy theme and freeze verification evidence.

## Run ceilings

- Productive-work budget: approximately 60 tool calls, tuned upward only while diff or evidence materially changes.
- Verification reserve: final 20% of capacity is reserved for fresh review, browser QA, diff review, state, commit, push, and PR handback.
- Same-failure retry: stop after 3 occurrences.
- No-progress: stop after 3 iterations with the same failing check or no material diff/evidence change.
- Wall time: 45 minutes per unattended worker run.
- Maximum authority: open/update an exact PR; never merge, deploy, release, or change protections.
