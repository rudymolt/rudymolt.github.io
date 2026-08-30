# Field report — Rudy Molt Ideas Portal

- **Project:** Rudy Molt Ideas Portal — static published ideas and explainers
- **Playbook version:** V0.4.0
- **Period covered:** 2026-08-30 – 2026-08-30
- **Slices shipped this period:** 7

## Observational eval baseline

| Period | Slices shipped | Rework rate | Time-to-merge (med/max) | Verifier passes | Catches |
|---|---:|---:|---|---:|---:|
| 2026-08-30 | 7 | 3/7 (43%) | 26m 58s / 1h 43m 10s | 7 | 3 |

Time-to-merge uses feature-branch granularity because Slices 1–4 shared PR #4. Rework counts the three post-gate remediation slices prompted by production comparison.

## Proof events

### 1. Independent verifier caught a real defect

- 2026-08-30, initial migration: fresh browser review found that Drive mobile diagrams remained scaled desktop SVGs and that target/local-overflow accessibility contracts were incomplete. A second fresh review found the mobile responsibility exchange still lacked a visible handoff. Each finding was reproduced in Chrome and closed by a later independent pass.
- 2026-08-30, control polish: fresh review found the mobile guide disclosure visible but inert at tablet and desktop widths. Chrome confirmed the control existed outside its active breakpoint; the shared CSS was corrected and freshly reverified.
- Self-review had inspected screenshots but did not consistently probe computed styles, accessibility-tree presence, and breakpoint absence. Independent execution was material.

### 2. A run-level ceiling tripped and paused correctly

- None. No max-iteration, wall-time, no-progress, or cost/quota ceiling stopped a run.

### 3. Acceptance-criteria gate refused a build

- None. Every implemented slice had an explicit verification target.

### 4. Structured escalation instead of thrashing

- 2026-08-30, footer verification: clean Chrome stopped returning 1440px CDP responses. The verifier stopped at its retry ceiling and reported a blocker, evidence, attempted checks, and the exact rerun required. After unrelated long-lived browser resources were released, the unchanged candidate passed the missing seam.

## Friction

- The large responsive screenshot matrix created substantial evidence volume, though it also exposed defects that static checks missed.
- Repeated fresh verifier handoffs were valuable for browser-only issues but expensive when the candidate differed only in evidence/state files.
- No cadence was dismissed.

## Verdict

- **Working as expected?** Yes, with measurable verification cost. Fresh-context browser checks caught three substantive UI problems, canonical-content guards prevented editorial drift, and the retry ceiling produced a useful bounded escalation instead of continued retries.
- **Recommended playbook action:** Keep the current independent-verification and retry rules. Collect at least two more observational periods before tuning them; meanwhile, encourage shared-component geometry and breakpoint-absence assertions so screenshot review focuses on genuinely visual judgment.
