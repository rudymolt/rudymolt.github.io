# Assess & Prepare Pack: the Operations Team

**REWRITE step:** 2, Assess & Prepare
**Firm:** the Operations Team
**Mode:** Direct Mode
**Anchor workflow:** Track & Field competition planning
**Prepared:** 2026-05-31
**Status:** Assessment complete as draft; MVIS not yet operational.

## 1. Step 2 Purpose

Step 2 answers four questions:

1. How ready is the Operations Team for REWRITE?
2. Which on-ramp should the Operations Team use?
3. Are the Four Pillars strong enough to deploy or expand agents?
4. What must be prepared before real workflow migration?

The answer is clear: the Operations Team should not attempt full organizational REWRITE yet. It should run an **MVIS + 90-Day Sprint** using Track & Field competition planning as the anchor workflow.

## 2. Inputs

| Input | Artifact |
|---|---|
| Step 1 Destination Architecture | `operations-team-destination-architecture-step1.md` |
| DRIVE scorecard | `operations-team-drive-scorecard.md` |
| SHAPE scorecard | `operations-team-shape-scorecard.md` |
| REWRITE readiness scorecard | `operations-team-rewrite-readiness-scorecard.md` |
| 90-day MVIS sprint plan | `operations-team-90-day-mvis-sprint-plan.md` |
| Competition Planning Copilot artifacts | v0.2 planning pack, evals, role cards, rules, checklists |
| Post-event reporting artifacts | v0.1 task decomposition, data manifest, agent spec, synthetic eval |

## 3. Assessment Summary

| Assessment | Score / status | Interpretation |
|---|---:|---|
| DRIVE | 12 / 25 | Pilot-stage intelligence engine; not yet an operating core. |
| SHAPE | 12 / 25 | Good workflow-level safety design; weak live governance and team-wide adoption. |
| REWRITE readiness | 43 / 80 | Foundational work needed first. |
| Four Pillars maturity | 2 / 5 | Blocks autonomy increase and real deployment of new agent classes. |
| Miura-Ko level | L2, narrow L3 edge | Team workflow exists; organization infrastructure not live. |
| Autonomy ceiling | `recommend_only` | Correct ceiling for current maturity. |

## 4. Readiness Score Detail

| Dimension | Score | Step 2 implication |
|---|---:|---|
| Organizational Drag | 5 / 10 | Coordination drag is real but concentrated in event workflows. |
| AI Elevation | 7 / 10 | Leadership sponsorship is strong enough for a sprint. |
| Work Architecture | 6 / 10 | Competition planning has been decomposed; other workflows have not. |
| Firm Boundary Design | 4 / 10 | External actors are visible but not yet managed through a capability registry. |
| Decision Autonomy | 6 / 10 | Recommendation boundaries are clear for one workflow. |
| Network Structure | 5 / 10 | Small-team communication helps, but shared AI operating infrastructure is missing. |
| Reinvention Cadence | 5 / 10 | Synthetic v0.1 to v0.2 loop exists; real cadence not yet proven. |
| Tacit Knowledge Accessibility | 5 / 10 | Key event-planning knowledge has started moving into templates and rules. |
| **Total** | **43 / 80** | **Foundational work needed first.** |

## 5. Four Pillars Maturity

| Pillar | Current score | Evidence | Required to reach 3 / 5 |
|---|---:|---|---|
| Trusted Evals | 2 | Synthetic evals exist for planning and reporting. | Convert evals into recurring test set used before each event. |
| Searchable Logs with Correlation IDs | 2 | Correlation ID formats are defined. | Create a real audit log and prove retrieval by event ID and correlation ID. |
| Granular Rollback | 2 | Versioned markdown artifacts exist. | Create rollback register for agent specs, prompts, templates, rules, and approved versions. |
| Human Review Queue | 3 | Approval gates and owners are explicit in artifacts. | Keep as is, but test with real owner names and mock approvals. |
| **Maturity minimum** | **2** | Lowest pillar controls the score. | Raise evals, logs, and rollback before deployment. |

**Step 2 gate:** Do not increase autonomy. Do not deploy real-data workflows until the minimum pillar score is at least 3.

## 6. Miura-Ko Cross-Reference

| Signal | the Operations Team status |
|---|---|
| What can AI see? | Structured event briefs and synthetic workflow data; no live governed data access yet. |
| What can AI do? | Draft, summarize, compare, flag, and recommend. It cannot act. |
| Who can extend the system? | Currently leadership / AI operator with Codex support; not yet all team members. |
| How has the org changed? | One workflow has become shared and artifact-driven; the company has not yet reorganized around the Stack. |

**Level:** L2 with a narrow L3 edge in competition planning.

The readiness score and ladder agree. the Operations Team is beyond personal productivity but not yet operating with organization-wide AI infrastructure.

## 7. On-Ramp Decision

| On-ramp | Fit | Decision |
|---|---|---|
| MVIS only | Necessary but insufficient by itself. | Include |
| 90-Day Sprint | Best fit for a small team with one strong high-coordination workflow. | Select |
| Full REWRITE | Too early; governance and adoption are not ready. | Reject for now |

**Selected path:** MVIS + 90-Day Sprint.

## 8. MVIS Preparation Plan

| MVIS component | Required Step 2 preparation | Current status |
|---|---|---|
| Event bus | Shared planning workspace with event IDs and correlation IDs. | Planned |
| Agent registry | Registry listing agent, version, owner, autonomy, sources, eval status. | Designed in sprint plan |
| Central logging | Audit log with source fields, recommendation, confidence, human decision, override reason. | Designed, not live |
| One agent per class | Competition Planning Copilot only. | Selected |
| Human review queue | Queue for timetable, comms, safety, medical, budget, entries/results, publishing. | Designed; needs real owner names |

## 9. 90-Day Sprint Recommendation

### Sprint Objective

Stand up the Operations Team's Minimal Viable Intelligence Stack around Track & Field competition planning, run one real competition in shadow mode, and convert the learning into reusable operating infrastructure.

### Primary Success Metrics

| Metric | Target |
|---|---|
| Real shadow-mode pilot | One actual Track & Field competition |
| Override rate | Establish real baseline; target below synthetic v0.1 baseline of 31% |
| Forbidden actions | 0 |
| Start-gate misses | 0 |
| Four Pillars maturity | Raise minimum from 2 to 3 |
| HIDO coverage | Complete nine core competition-planning objects |
| Team rhythm | Weekly 45-minute AI operating session with all team members |

### Sprint Phases

| Phase | Days | Outcome |
|---|---:|---|
| MVIS setup | 1-14 | Workspace, registry, audit log, review queue, real owners. |
| Data governance and evals | 15-30 | HIDO pack, eval suite, rollback register, log retrieval test. |
| Real event intake | 31-45 | Real event brief and approved source data. |
| Shadow-mode parallel run | 46-60 | Copilot vs. human planning comparison and override log. |
| Event execution and learning | 61-75 | Day-of learning and post-event closeout. |
| Evaluation and standardization | 76-90 | Real pilot evaluation, v0.3 decisions, Four Pillars rescore. |

## 10. Preparation Backlog

| Priority | Item | Owner pattern | Required before real data? |
|---:|---|---|---|
| 1 | Name sponsor, AI Operating Owner, workflow owner, data steward, and approvers. | Leadership | Yes |
| 2 | Create shared planning workspace. | Operations / Event Lead | Yes |
| 3 | Create agent registry v1. | AI Operating Owner | Yes |
| 4 | Create audit log v1 with correlation IDs. | Data Steward | Yes |
| 5 | Create Human Review Queue v1. | Event Lead | Yes |
| 6 | Complete HIDO for nine core competition-planning objects. | Data Steward + workflow owners | Yes |
| 7 | Convert synthetic evals into recurring eval suite. | AI Operating Owner | Yes |
| 8 | Create rollback register. | AI Operating Owner | Yes |
| 9 | Confirm access-vs-training policy. | Sponsor + Data Steward | Yes |
| 10 | Schedule weekly AI operating rhythm. | Sponsor | Before sprint starts |

## 11. Step 2 Exit Criteria

| Exit criterion | Status |
|---|---|
| Readiness Score complete | Complete as draft |
| DRIVE and SHAPE scored | Complete as draft |
| Four Pillars maturity scored | Complete as draft |
| Miura-Ko level cross-checked | Complete as draft |
| On-ramp selected | Complete: MVIS + 90-Day Sprint |
| MVIS operational | Not complete |
| Sprint plan created | Complete as draft |
| Real owners named | Not complete |
| Presented to leadership | Not complete |

## 12. Step 2 Decision

Step 2 is **analytically complete** but **operationally incomplete**.

the Operations Team can proceed in the simulation to Step 3, because the on-ramp is clear and the missing real-world setup items are known.

For real execution, Step 2 remains open until MVIS exists in a real workspace, owners are named, and the assessment is reviewed by leadership.
