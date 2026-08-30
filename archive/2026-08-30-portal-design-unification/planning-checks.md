# Portal design unification — coherence and scope checks

## Coherence

Verdict: PASS.

- Vocabulary matches `CONTEXT.md`: Ideas portal, Paper design, published path, and published playbook retain their defined meanings.
- The approved design and source boundary are compatible: Paper controls presentation; active HTML controls editorial content and behaviour.
- The apparent Hub hierarchy conflict is resolved without changing article order: the existing guided-path link becomes the dominant full-width row, while the canonical primer and later sections stay in source order.
- The approved date exception is exact: only `2026-08-24` is removed from the first V0.4 `What's New` label. Historical release dates and verification metadata remain.
- Desktop unboxed rail, tablet inline guide, mobile disclosure, and persistent previous/next form one responsive contract rather than separate navigation systems.
- Colour meaning remains redundant with explicit `HUMAN`, `AGENT`, `CAUTION`, current, success, and recovery labels plus borders and layout.

## Scope guardian

Verdict: PASS after narrowing one ambiguous phrase to the handoff's exact implementation inventory.

- Production migration scope is the 12 active HTML pages under `agent-engineering-playbook/`, the shared playbook CSS/JS needed by them, and the three root design artefacts.
- Root `index.html` is a read-only visual source for this feature. Other published-path families are not among the seven approved archetypes and receive no speculative redesign.
- No framework, component library, build system, generated site, templating conversion, or new dependency is justified for 12 static pages.
- Shared CSS and progressive shared JavaScript are the smallest seams. Page-local changes are limited to the approved date exception, accessibility/shell hooks, legacy literal colours, and mobile diagram treatment.
- A duplicated-template cleanup is not required. Converting all pages to a generator would expand scope and risk canonical-copy drift.
- No content rewrite, new destination, operational-playbook refresh, merge, deploy, or release is included.

## Baseline evidence

- 12 active published playbook HTML pages.
- All local playbook links and assets resolve before migration.
- All pages have exactly one `h1` before migration.
- Eleven pages contain the guide rail; the glossary is the one shell exception to close.
- No page currently contains a skip link.
- Active playbook HTML contains 315 legacy light/blue/green palette literals, concentrated in inline SVGs and the two page-local stylesheets.
- `canonical-content-baseline.json` records normalized article text, heading, link, and interaction-contract hashes before production edits.

## Open questions

None.
