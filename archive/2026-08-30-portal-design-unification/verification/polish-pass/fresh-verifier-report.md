# Production polish fresh-verifier report

## Verdict

**FAIL** for candidate `fd797cf1d634289634ad352a9cbfa73be44ed82f` against `origin/main` at `33181f730564d8d23f6e7334f8593c86a1be32e3`.

The three diagnosed cascade remediations pass, but the candidate cannot receive a final PASS because the mobile-only `Guide +` disclosure is also visible and inert at tablet and desktop widths. A separate generator fix and a fresh verifier run are required.

## Review boundary

- Exact range: `33181f730564d8d23f6e7334f8593c86a1be32e3..fd797cf1d634289634ad352a9cbfa73be44ed82f`.
- Candidate parent is exactly `origin/main`; the range is one commit (`fix: polish published document controls`).
- Authority remained report-only. No product, source, test, specification, state, commit, branch, remote, PR, deployment, or external state was changed.
- Fresh evidence is confined to `planning/portal-design-unification/verification/polish-pass/`.
- Browser: real headless `Chrome/152.0.7977.64`, clean disposable profile, local HTTP origin.
- Widths: 390, 768, and 1440 CSS px.
- Post-run transaction note: the bound browser run finished at `2026-08-30T17:57:35Z`. Separate uncommitted generator edits for F1 appeared in the shared worktree afterward and are excluded from this verdict; they require a new exact candidate SHA and fresh verification.

## Results

| Check | Result | Evidence |
|---|---|---|
| Exact diff and whitespace | PASS | Candidate is a direct child of `origin/main`; `git diff --check origin/main fd797cf…` returned clean. |
| Canonical copy, guide order, links, labels, scripts, and interaction contracts | PASS | `python3 tools/audit_playbook.py`: 12/12 canonical digests passed; all active pages parsed and local resources resolved. The candidate HTML changes only the shared stylesheet cache key. |
| JavaScript and baseline JSON | PASS | `node --check agent-engineering-playbook/assets/playbook-docs.js` and JSON parsing passed. |
| Process Map quiz, before selection | PASS | All four controls resolve to parchment on soot at **16.38:1** at 390/768/1440; each is at least 44px tall. See `browser-results.json` and `screenshots/process-*-quiz-before.png`. |
| Process Map quiz, after selection | PASS | Correct answer resolves to gold on soot at **8.88:1**; feedback appears, has `role=status`, receives focus, and retains readable recovery copy at all widths. See `screenshots/process-*-quiz-after.png`. |
| Previous/Next label hierarchy | PASS | Both links use stacked grid layout with a 2px gap; gold 9px labels remain separate from destinations; measured target height is 45.98px at every width. |
| Hub start row | PASS | Normal and visited surfaces are transparent with parchment text; hover/focus use oxblood without reflow; focus is a 2px ember outline with 4px offset; height is 66px. See `screenshots/hub-1440-start-{normal,visited,hover,focus}.png`. |
| Relevant 44px targets | PASS | All inspected skip, masthead, guide sequence, guide toggle, quiz, and start-row targets passed across all 36 page/width checks. |
| Horizontal overflow and heading floor | PASS | All 12 active pages at all three widths: 0 body-overflow failures and 0 one-`h1` failures. |
| Console/network/runtime | PASS | 0 console errors, 0 runtime exceptions, 0 network failures, and 0 HTTP errors across the responsive and state probes. |
| Mobile guide interaction | PASS | At 390 the disclosure starts closed, opens the ordered path, closes on Escape, returns focus, reports `aria-expanded`, and measures 44px. |
| Tablet/desktop guide interaction | **FAIL** | At 768 and 1440 the mobile-only toggle is visible. Clicking changes `Guide +` to `Guide −` and `aria-expanded=false` to `true`, but the already-visible path remains `display:grid` at exactly 136px/495px high. |
| Representative visual coherence | PASS apart from the finding below | All 15 fresh screenshots were inspected. Quiz, guide Previous/Next, and Hub row surfaces use the approved soot/parchment/gold/ember/oxblood vocabulary without collision or body overflow. |

## Deduplicated findings

### F1 — Mobile guide disclosure is visible and inert at tablet and desktop widths

- **Severity:** P1 — release-blocking interaction/contract defect
- **Confidence:** High
- **Action tag:** `REMEDIATE-BEFORE-REVERIFY`
- **Evidence:**
  - Supplied desktop evidence: `.context/attachments/assets/024edc23-ac2f-42b9-9289-8c53d81a9842/Screenshot 2026-08-30 at 18.35.26.png` visibly shows `Guide +` in the desktop rail.
  - Fresh Chrome evidence: `screenshots/process-768-guide.png` and `screenshots/process-1440-guide.png` show `Guide −` after activation while the full path remains visible.
  - `browser-results.json`: at 768, button display remains `block`, steps remain `grid`, and height remains `136px`; at 1440, button display remains `inline-block`, steps remain `grid`, and height remains `495px`. Only `aria-expanded` changes.
  - Source cause: shared JavaScript creates `.guide-toggle` at every width; the shared CSS gives it a visible base style, while the layout-changing `.has-mobile-guide` rules exist only inside `@media (max-width: 640px)`.
- **Impact:** Tablet and desktop readers receive a visible control that promises to open/close the guide but produces no visible change. Its ARIA state changes despite unchanged content visibility, contradicting the approved mobile-only disclosure contract and creating misleading interaction semantics.
- **Remediation boundary:** In a separate generator task, keep the disclosure hidden outside the mobile breakpoint (or instantiate it only when the mobile contract applies), preserve the 390px open/Escape/focus-return behavior, and retain visible tablet/desktop guide steps plus Previous/Next. Then rerun a fresh report-only verifier against the new exact SHA.

No other deduplicated product findings were observed.

## Reproduction commands

```bash
git diff --check origin/main fd797cf1d634289634ad352a9cbfa73be44ed82f
python3 tools/audit_playbook.py
node --check agent-engineering-playbook/assets/playbook-docs.js
node planning/portal-design-unification/verification/polish-pass/browser-harness.mjs
```

The final browser harness returns `FAIL` solely because F1 fails at 768 and 1440; all requested remediation probes and runtime checks otherwise pass.

## Handoff

Return F1 to a separate stage-07/09 generator remediation. Do not proceed as verified. After the generator produces a new candidate, start a fresh stage-08/09 report-only verifier and repeat the 390/768/1440 interaction and visual checks.
