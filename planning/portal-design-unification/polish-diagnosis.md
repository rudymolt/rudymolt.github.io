# Production polish diagnosis

Observed 2026-08-30 from the supplied production screenshot of the Process Map at desktop width.

## Reproduction

- The four `Check Yourself` answer controls render near-black text on a near-black surface before an answer is selected.
- `PreviousDrive agent` and `NextAlign` read as collided strings in the sticky guide rail.
- A cascade review found the Hub start row still retained the pre-migration solid-gold button background, weakening text contrast and breaking the published-document row treatment.
- A second supplied production screenshot shows `Guide +` on the desktop rail. The guide is already expanded there, so pressing the mobile-only disclosure appears to do nothing.

## Root cause

1. The shared dark theme sets body text colour, but native form controls do not consistently inherit it. Several component rules set dark backgrounds without setting or inheriting foreground colour.
2. The published-document override changes `.guide-sequence a` from its intended stacked layout to `display: flex` without a gap, overriding the earlier block label treatment.
3. The published-document `.start-path` override changes geometry but does not reset the legacy `background` or visited-link colour.
4. JavaScript progressively creates the mobile guide disclosure at every width, but the shared CSS never hides that control outside the mobile breakpoint.

## Fix boundary

- Make form controls inherit the surrounding published-document foreground colour.
- Restore stacked guide sequence labels and destinations while retaining the 44px target.
- Reset the start row to a transparent editorial surface with explicit hover/focus and visited colours.
- Hide the guide disclosure by default and expose it only at the 640px mobile breakpoint where it controls a collapsed path.
- Bump the shared stylesheet cache key across all 12 active pages.
- Preserve all canonical editorial copy and interaction contracts.

## Regression loop

`tools/audit_playbook.py` now asserts these cascade contracts. The new checks failed against the reproduced state and pass after the scoped CSS changes.

## Post-merge sidebar rhythm remediation

A later production comparison found that Drive Agent and Theory rendered the shared guide rail 66px taller than Hub and the remaining guides at the same desktop viewport. Their canonical inline styles include a broad `li { margin-bottom: 6px; }` rule; because guide rows are list items, that legacy article rule leaked into the shared navigation. The shared `.timeline-step` contract now resets `margin: 0`, and the stylesheet cache key is bumped across all active pages. This changes presentation only; canonical article copy remains untouched.

## Post-merge editorial footer remediation

The supplied Hub production screenshot shows the editorial footer beginning at the viewport edge while the Paper reference keeps its rule, tagline, and identity inside the article column. The footer sat outside the `.page` shell and retained a standalone `max-width: 72ch`, so it had neither the shell offset nor a shared inner measure. The repair gives every footer an explicit content wrapper, reconstructs the published-document grid at the body level, and caps the inner row to the same 72-character article measure. Desktop and tablet keep the tagline and identity on opposite edges; mobile stacks them. Footer wording and all article copy remain unchanged.
