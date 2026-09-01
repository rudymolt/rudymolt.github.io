# WikiSkill plain-English explainer

Status: approved for implementation

## Problem

The Google Research paper introduces a useful way for agents to turn experience into persistent knowledge and tested skills, but the paper is too dense for a general reader scanning the Rudy Molt Ideas Portal. The portal needs a concise, evidence-bound explainer that preserves the paper's main distinctions, results, and limitations without equations or research jargon.

## User stories and acceptance criteria

### Read the idea quickly

As a curious non-specialist, I can understand the paper's main claim in roughly six minutes.

- The explainer distinguishes raw traces, the persistent wiki, and active skills.
- It shows the Try → Distil → Propose → Test → Remember loop.
- It describes score changes as percentage-point differences and scopes them to the reported benchmarks.
- It covers transfer risk and the paper's stated limitations.

### Find it from the homepage

As a portal visitor, I can open the explainer from the Ideas Index.

- The homepage count changes from 04 to 05 entries.
- Row 05 links to `wikiskill/index.html` and follows the existing row hierarchy.
- The row includes a labelled artwork placeholder for the future GrokBot image.

### Replace the artwork later

As the site owner, I can replace the placeholder without restructuring the homepage row.

- The placeholder has an explicit class and accessible text.
- Replacing it with an image requires changing only the placeholder element and related asset reference.

## Approved design contract

- Use the Rudy Molt soot, oxblood, parchment, gold, and ember tokens.
- Use Oxanium for display type and IBM Plex Mono for reading text.
- Preserve the approved full-bleed editorial hero and original diagrams.
- Use 17px reading text on desktop and 16px on mobile.
- Keep visible interactive targets at least 44px high.
- Provide dedicated vertical diagrams on mobile.

## Public verification seams

1. `GET /wikiskill/` renders one `h1`, the two explanatory diagrams, the paper source link, and no planning-review controls.
2. `GET /` exposes a fifth Ideas Index row whose link resolves to `/wikiskill/`.
3. The homepage artwork slot exposes the text `Artwork pending` until the GrokBot asset replaces it.
4. Both pages have no horizontal body overflow at 390px, 768px, and 1440px.

## Out of scope

- Reproducing the paper's equations or every ablation.
- Claiming the benchmark results prove production reliability or autonomous self-improvement.
- Generating the final GrokBot artwork.
- Redesigning existing homepage rows or the software section.
- Adding a framework, build system, analytics, or runtime dependency.

## Implementation seams

- One self-contained production page at `wikiskill/index.html`.
- One additive Ideas Index row and count update in `index.html`.
- One CSS-only artwork placeholder contained within the new row.
- Surgical updates to `DESIGN-GLOSSARY.md` and `frontend-design-language-guide.html` so the existing Index row contract permits numeric labels `01`–`05`.

## Testing decisions

- Static HTML parser and link-resolution checks cover the public document seams.
- Browser QA covers layout, responsive diagrams, accessible targets, and horizontal overflow at 390px, 768px, and 1440px.
- No unit-test framework is introduced for a dependency-free static HTML site.

## Open questions

None. The user approved the mockup and explicitly requested publication with a future-artwork placeholder.
