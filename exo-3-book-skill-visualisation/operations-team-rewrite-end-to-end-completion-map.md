# REWRITE End-To-End Completion Map: the Operations Team

**Firm:** the Operations Team
**Purpose:** Show how far the skill has been run and what remains real vs. simulated
**Created:** 2026-05-31

## Summary

We have now walked through all six REWRITE steps as a learning simulation.

We have **not** completed the real-world process, because the real MVIS, real owners, real HIDO sign-off, real event data, and real shadow pilot have not happened.

## Step Completion Map

| Step | Name | Learning simulation status | Real-world status |
|---:|---|---|---|
| 1 | Backcast & Define | Complete as draft | Needs leadership edits, named owners, and signature |
| 2 | Assess & Prepare | Complete as draft | MVIS not operational; leadership review needed |
| 3 | Extract | Partly complete | Data manifests exist; HIDO still incomplete |
| 4 | Diagnose & Strip | Complete for two workflows | Needs real SME validation |
| 5 | Build & Prove | Synthetic proof complete | Needs real shadow pilot and operational logs |
| 6 | Rewire & Evolve | Simulated endpoint now created | Requires real Step 5 proof before adoption |

## Artifact Map

| Step | Main artifacts |
|---:|---|
| 1 | `operations-team-destination-architecture-step1.md` |
| 2 | `operations-team-assess-prepare-step2.md`, `operations-team-drive-scorecard.md`, `operations-team-shape-scorecard.md`, `operations-team-rewrite-readiness-scorecard.md`, `operations-team-90-day-mvis-sprint-plan.md` |
| 3 | `operations-team-competition-planning-data-manifest.md`, `operations-team-post-event-performance-reporting-data-manifest.md` |
| 4 | `operations-team-track-field-task-decomposition.md`, `operations-team-post-event-performance-reporting-task-decomposition.md` |
| 5 | Copilot specs, synthetic data, shadow packs, eval reports, v0.2/v0.3 backlog |
| 6 | `operations-team-rewire-evolve-step6.md` |

## What Each Step Teaches

| Step | What you learn |
|---:|---|
| 1 | Define the destination before building agents. |
| 2 | Assess readiness and choose the right on-ramp. |
| 3 | Extract only the data and knowledge a workflow truly needs. |
| 4 | Decompose work at task level, not job-title level. |
| 5 | Build in shadow mode and prove with override rates, evals, logs, and rollback. |
| 6 | Redesign the operating rhythm around the Intelligence Stack after proof. |

## Real-World Gate To Watch

The biggest difference between the simulation and reality is Step 5.

In the simulation, we generated synthetic events and passed synthetic evals. In reality, the Operations Team would need one actual Track & Field event run through:

1. Real event brief
2. Approved data manifest
3. HIDO-complete data objects
4. Human Review Queue
5. Audit log with correlation IDs
6. Shadow comparison
7. Accepted / edited / rejected outcomes
8. Override-rate trend
9. Post-event report
10. vNext standardization decision

Only then should Step 6 become the actual operating model.

## Current Recommendation

For understanding the skill, the end-to-end walkthrough is now complete.

For real implementation, return to Step 3 and complete HIDO, then operationalize Step 2's MVIS before running Step 5 on a real event.
