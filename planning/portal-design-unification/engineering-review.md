# Portal design unification — engineering review

Verdict: READY FOR BREAKDOWN.

## System shape

The published playbook is static HTML with one shared stylesheet and two shared scripts. Eleven pages duplicate the same navigation and guide-rail markup; the glossary uses the shared stylesheet but omits the rail. `50-how-to-write-code-with-ai.html` and `60-the-theory-behind-the-playbook.html` also contain large page-local styles before the shared stylesheet, and several pages embed literal-colour SVGs.

The safest implementation keeps HTML as the editorial source, uses the existing shared CSS/JS seams, and changes page-local markup only where shared rules cannot express the approved result.

## Findings and decisions

### 1. Cascade ownership — high confidence

The shared stylesheet loads after both page-local style blocks, so shared selectors and token definitions can own the new system without deleting large canonical files. Page-local rules with higher specificity still need explicit shared overrides. Do not rewrite the two long HTML files or remove their style blocks wholesale.

### 2. Literal SVG palette — high confidence

Legacy colours remain in embedded SVG attributes and cannot be fixed by root variables alone. Apply one documented palette mapping across active playbook HTML, then use structural classes and labels to preserve HUMAN/AGENT/CAUTION meaning. Do not introduce new colours outside the approved palette.

### 3. Mobile diagrams — high confidence

The Drive Agent already has semantic HTML equivalents for the responsibility split and development stages. At narrow widths, prefer those vertical structures and prevent the matching wide SVGs from becoming thumbnails. The ship diagram and theory diagrams must either recompose through existing semantic blocks or stay full-size inside labelled local overflow; body-level overflow is never acceptable.

### 4. Guide disclosure — high confidence

Enhance the existing rail progressively in shared JavaScript. The static fallback keeps the full guide visible. JavaScript adds a mobile-only button using the existing title/status text, controls the ordered list, reports `aria-expanded`, closes on Escape, and restores focus. Previous/next remains outside the collapsed region.

### 5. Accessibility shell — high confidence

Add a real skip link and main target to every page rather than relying on CSS-generated content. The glossary must join the shared guide shell or provide equivalent guide and previous/next landmarks. Preserve existing `aria-current`, labels, and interaction data attributes.

### 6. Canonical copy guard — high confidence

The main regression risk is accidental copy drift during markup edits. A deterministic snapshot now hashes normalized main article text, heading order, article links, and `data-*` interaction contracts. The Hub's approved first V0.4 date removal is normalized in the baseline so no other change is permitted.

### 7. Existing malformed Hub article — medium confidence

The Hub contains a duplicated opening `<article class="learning-card">` immediately before the first real learning card. Browsers recover it, but the migration should remove only the empty duplicate tag. This is a structural correction with no editorial change and is covered by the canonical-content guard.

### 8. Verification tooling — high confidence

No application dependency is warranted. Use Python's standard-library HTML parser and path resolution for deterministic checks. Use installed headless Chrome against a local HTTP server for responsive screenshots, computed overflow, focus, disclosure, and interaction smoke tests. Evidence is committed under the active planning folder.

## Risk review

| Risk | Control |
|---|---|
| Editorial or link drift across 12 pages | canonical inventory hash plus local-link audit |
| Shared CSS breaks a rare archetype | representative browser matrix for all seven archetypes plus 320px all-page overflow |
| Page-local CSS retains old theme | legacy token/literal audit across active playbook source |
| JavaScript enhancement hides navigation | progressive fallback, `aria-expanded`, Escape/focus tests, visible previous/next |
| Diagrams become unreadable | semantic mobile alternatives or labelled local overflow; screenshot review |
| External font request fails | approved local fallback stacks remain usable; screenshots record actual rendering |
| Scope expands into unrelated publications | fixed approved path list in spec and verification script |

## Testing seams

1. Static contract audit: page set, parse, one `h1`, heading progression, landmarks, skip target, guide/current/previous-next, palette drift, canonical inventory, local resources.
2. JavaScript smoke: glossary popover, choice output, quiz feedback, checklist count, route helper, copy status, mobile guide disclosure.
3. Responsive layout: all-page 320px body overflow; representative 390/768/1440 screenshots for seven archetypes.
4. Visual comparison: Hub and Drive Agent against the four committed Paper screenshots; other archetypes against the updated kitchen sink and guide.
5. Source hygiene: `git diff --check` and review of the exact base-to-head diff.

## Implementation sequence

1. Publish vocabulary and examples in all three design artefacts.
2. Add the failing deterministic design/accessibility audit while keeping canonical-content checks green.
3. Migrate shared CSS and guide behaviour.
4. Apply minimal Hub and Drive Agent structural changes, including the single copy exception.
5. Apply palette/shell hooks and archetype-specific rules across the remaining pages.
6. Run full deterministic checks, then fresh independent review and browser QA.

No architecture ADR is needed: the work uses existing static-site seams and introduces no hard-to-reverse technical decision.

## Post-slice architecture cadence review

Verdict: CLEAN; no refactor, ADR, or follow-up issue required.

- **Depth and leverage:** the shared stylesheet remains the deep presentation module for all 12 consumers, while the shared script adds two small initialisers behind the existing class and `data-*` interfaces. Moving the duplicated static shell into a new build-time include system would add a framework-sized seam for no approved product outcome, so it is explicitly rejected.
- **Locality:** page edits are limited to shell/accessibility hooks, the approved Hub date removal, two heading-level corrections, and embedded diagram palette/radius treatment. Editorial text and interaction contracts stay owned by the HTML pages.
- **Verification seam:** `tools/audit_playbook.py` and the committed baseline deepen the static-site contract without becoming a production dependency. Browser verification remains separate from source generation.
- **Scope guardian:** the diff does not touch deployment, workflow, authentication, billing, migration, secret, repository-administration, or protection surfaces. No new dependency or runtime is introduced.
- **Coherence:** `published document`, `Editorial index`, `guide rail`, `Hub`, and `Drive Agent` match `CONTEXT.md` and the approved design artefacts; no competing vocabulary or second documentation theme remains.

The cadence counter can reset because the only shared hotspot is intentionally the high-leverage CSS seam, objective residue was corrected before independent review, and no structural debt needs to escape this feature.
