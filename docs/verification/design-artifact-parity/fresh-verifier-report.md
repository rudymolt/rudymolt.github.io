# Fresh verifier report — design-artifact parity

## Verdict

`blocked`

Candidate `5b98d4e1e0924f67e70da78931270765e3a8b515` is visually and functionally sound, but it does not satisfy the accepted durability contract. The no-JavaScript fallback is implemented by the kitchen-sink specimen, yet it is not stated in the glossary or design-language guide and is not enforced by `tools/audit_playbook.py`. The glossary also does not name the disclosure's Escape/focus-return behavior. A generator fix is required before a fresh verification run.

## Review boundary

- Range: `origin/main` (`f2b1137e8a50f5861a25d2415ab14fe0a7cae823`) through exact candidate `5b98d4e1e0924f67e70da78931270765e3a8b515`.
- Repository scope: `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, `frontend-design-language-guide.html`, `tools/audit_playbook.py`, `ci-gates.md`, and `.playbook-state.yml` only.
- Route: project-local `ai-playbook-design-review`, manual report-only procedure.
- Permitted repository write: this report only.
- Transient browser evidence: `/tmp/design-artifact-qa.lcpWtn/`.
- Production-scope diff: empty for `index.html`, `assets/`, and `agent-engineering-playbook/`.

## Acceptance results

| Acceptance criterion | Result | Evidence |
|---|---|---|
| All three artifacts durably encode guide-row isolation/rhythm, mobile-only functional disclosure with Escape/focus and no-JS fallback, explicit dark-control foreground, and reading-field-aligned responsive footer | **Fail** | The kitchen sink implements the complete behavior. The design-language guide names Escape/focus return but not the no-JS fallback. The glossary names mobile-only disclosure but neither Escape/focus return nor the no-JS fallback. Repository search found no no-JS/progressive-enhancement rule in any of the three artifacts. |
| Kitchen sink renders at 390/768/1440 without overflow/errors, with 44px targets, correct toggle visibility, and matching document/footer bounds | **Pass** | Fresh Chrome 152 results in `/tmp/design-artifact-qa.lcpWtn/browser-results.json`; screenshots `published-390.png`, `published-768.png`, and `published-1440.png`. |
| Deterministic audit contracts genuinely enforce the artifact requirements | **Fail** | `python3 tools/audit_playbook.py` passes even though the cross-artifact no-JS requirement is absent. `design_artifact_contract_audit()` has no no-JS contract for any artifact and no Escape/focus contract for the glossary or design-language guide. |
| No production HTML/CSS/JS changes | **Pass** | `git diff --name-only origin/main...HEAD -- index.html assets agent-engineering-playbook` returned no paths. |

## Fresh browser flows

Chrome `152.0.7977.64` loaded `http://127.0.0.1:4188/ui-kitchen-sink.html` from a fresh local server at each required width.

- **390px:** body `390px` client/scroll width; no overflow or console errors. The disclosure is visible at `56×44px`. Click changes `aria-expanded` from `false` to `true`, label from `Guide +` to `Guide −`, and steps from hidden to grid. Escape closes it, restores `aria-expanded=false`, restores the label, and returns focus to the button. Previous/next remain grid-displayed throughout. With script execution disabled, enhancement is absent, the toggle is hidden, all steps remain visible, and all three route links measure `44px` high.
- **768px:** body `768px` client/scroll width; no overflow or console errors. The disclosure computes to `display:none`; three guide links and both sequence links measure `44px` high. Reading stack, copy, and footer share `x=20px`; stack/copy/footer width is `612px`. Footer is a desktop/tablet row.
- **1440px:** body `1440px` client/scroll width; no overflow or console errors. The disclosure computes to `display:none`; guide and sequence links measure `44px` high. Reading stack, copy, and footer share `x=420px`, `right=1032px`, and `width=612px`. Footer is a desktop/tablet row.
- At all widths the select is `44px` high with computed parchment foreground `rgb(244, 231, 194)` on soot `rgb(10, 6, 5)`.
- The 390px footer stacks; the 768px and 1440px footers retain left/right composition. Screenshots show the footer rule and content on the exact reading-field measure.
- URL/query/filter/table flows are not applicable: this reference page has no URL-driven UI, filtering, or data table. The guide disclosure is the only changed stateful surface and was exercised above.

## Static verification

- `python3 tools/audit_playbook.py` — pass for all 12 canonical published pages and current artifact regex contracts.
- Python `html.parser` on both changed HTML artifacts — pass.
- Relative `href`/`src` resolution for both changed HTML artifacts — pass.
- `git diff --check origin/main...HEAD` — pass.
- Exact candidate and parent confirmed with `git show -s`; worktree was clean before this permitted report write.

## Findings

### F-01 — Cross-artifact progressive-enhancement contract is incomplete

- **Severity:** high (acceptance blocker)
- **Confidence:** high
- **Action:** `generator-fix`
- **Evidence:** `ui-kitchen-sink.html` supplies a working no-JS fallback because `.sample-guide-toggle` is hidden by default, the ordered path is visible by default, and collapse activates only after `data-enhanced` is set. Fresh script-disabled Chrome confirms that behavior. However, neither `DESIGN-GLOSSARY.md` nor `frontend-design-language-guide.html` says the full ordered path must remain visible when JavaScript is unavailable. The glossary also omits the disclosure's Escape-close/focus-return behavior. `tools/audit_playbook.py:260-292` enforces other artifact phrases and the kitchen-sink Escape handler but contains no no-JS/progressive-enhancement contract, so the deterministic audit passes despite this omission.

Required remediation: state the no-JS fallback in the guide-rail glossary term and the design-language interaction contract; state Escape/focus return in the glossary if the acceptance criterion remains explicitly cross-artifact; add deterministic contracts that fail when those rules or the kitchen-sink default-visible/enhanced-only collapse hooks disappear. Then re-run this review in a fresh verifier context.

## Handoff

Return F-01 to the generator under the current documentation-coherence slice. Do not proceed to merge/ship on this verdict. After remediation is committed, bind a new report-only review to the new exact candidate.
