# REWRITE Readiness Scorecard: the Operations Team

**Firm:** the Operations Team
**Date:** 2026-05-31
**Headcount:** 8
**Mode:** Direct Mode
**Sector:** Hybrid / professional sports
**Scored by:** Codex using Building an ExO skill

## Context

the Operations Team has completed a serious workflow-level AI transformation prototype: Competition Planning Copilot v0.2 for Track & Field events. It includes a task decomposition, data manifest, agent spec, event brief, timetable rules, role cards, event-control checklists, synthetic evals, and an end-to-end synthetic run.

This scorecard evaluates whether the Operations Team is ready for REWRITE as an organization. The answer is: ready for **MVIS + 90-Day Sprint**, not full organizational REWRITE yet.

## Dimension Scores

## 1. Organizational Drag

**Score:** 5 / 10

Competition planning clearly has coordination drag: entries, venue readiness, staffing, timing, safety gates, communications, and results workflows all need alignment. The copilot work surfaced this well.

Because the Operations Team is only 8 people, organization-wide drag is probably not deep hierarchy. It is more likely coordination load, tacit knowledge, and inconsistent AI use.

**Reasoning:** Drag is concentrated in high-coordination workflows rather than the whole firm.

## 2. AI Elevation

**Score:** 7 / 10

Senior leadership uses AI extensively every day and is actively exploring agentic workflow redesign. That is a strong signal. In a company of 8, a formal CAIO role is unnecessary if the founder/leadership team directly sponsors the work.

The gap is that not all team members are AI-native yet, and the AI operating system is not yet embedded in daily work.

**Reasoning:** AI is treated as strategic by leadership, but not yet organization-wide.

## 3. Work Architecture

**Score:** 6 / 10

The competition-planning function has been decomposed into 49 tasks, with agent readiness and human ownership mapped. That is the strongest REWRITE signal so far.

However, only one workflow has been decomposed. the Operations Team does not yet appear to use task-level architecture across coaching, athlete services, partnerships, operations, finance, or communications.

**Reasoning:** One function is task-decomposed; the rest are still likely role-based.

## 4. Firm Boundary Design

**Score:** 4 / 10

The v0.2 workflow recognizes external roles: venues, officials, volunteers, suppliers, coaches, parents, and teams. It has started to treat the firm boundary as a coordination surface.

But there is no broader Capability Registry or deliberate internal / external / agent composition model yet.

**Reasoning:** Mix of internal and external capability exists, but not deliberately composed.

## 5. Decision Autonomy

**Score:** 6 / 10

The copilot workflow has clear decision boundaries:

- Agents recommend only.
- Two-way planning drafts move quickly.
- One-way decisions are gated.
- Safety, eligibility, payments, publishing, and final timetable stay human-owned.

This is good. The limitation is that decision autonomy is only documented for one workflow.

**Reasoning:** Some delegation and Permission Envelopes exist; major decisions remain human-gated.

## 6. Network Structure

**Score:** 5 / 10

the Operations Team's small size likely enables direct peer-to-peer flow. The competition-planning workflow now creates shared artifacts that can coordinate across roles without routing everything through hierarchy.

But there is no formal pod-based intelligence network yet, and no organization-wide agent registry or operating cadence.

**Reasoning:** Peer flow likely exists, but network structure is not yet designed.

## 7. Reinvention Cadence

**Score:** 5 / 10

The v0.1 to v0.2 copilot loop shows a real reinvention cadence: prototype, synthetic run, review, improve, test again. This is promising.

But it has not yet been repeated against real events or institutionalized as a weekly/monthly operating rhythm.

**Reasoning:** Reinvention is active in the pilot, not yet continuous across the organization.

## 8. Tacit Knowledge Accessibility

**Score:** 5 / 10

The workflow has started extracting tacit knowledge into event briefs, checklists, role cards, timetable rules, start gates, and review tables.

The next gap is real-world elicitation: the people who actually plan the Operations Team competitions need to fill and challenge the artifacts with real data.

**Reasoning:** Some SOPs and tacit patterns are now documented, but key operating judgment still lives in people's heads.

## Total And Banding

| Dimension | Score |
|---|---:|
| Organizational Drag | 5 / 10 |
| AI Elevation | 7 / 10 |
| Work Architecture | 6 / 10 |
| Firm Boundary Design | 4 / 10 |
| Decision Autonomy | 6 / 10 |
| Network Structure | 5 / 10 |
| Reinvention Cadence | 5 / 10 |
| Tacit Knowledge Accessibility | 5 / 10 |
| **Total** | **43 / 80** |

**Band:** Foundational work needed first.

Interpretation: the Operations Team is past dabbling, but not ready for full REWRITE. It is well-positioned for a focused 90-day sprint around one high-coordination workflow.

## Four Pillars Maturity

| Pillar | Score |
|---|---:|
| Trusted Evals | 2 / 5 |
| Searchable Logs with Correlation IDs | 2 / 5 |
| Granular Rollback | 2 / 5 |
| Human Review Queue | 3 / 5 |
| **Four Pillars Maturity** | **2 / 5** |

**Rule:** Do not deploy a new agent class until Four Pillars Maturity is at least 3.

Current implication: continue with the Competition Planning Copilot in shadow mode. Do not add new agent classes or increase autonomy until logs, rollback, evals, and HIDO are strengthened.

## Miura-Ko L0-L5 Cross-Reference

**Current Miura-Ko level:** L2, with a narrow L3 edge emerging in competition planning.

the Operations Team is beyond personal productivity because the competition-planning workflow has become a shared team workflow. It is not yet L3 organization infrastructure because MVIS is not live and the workflow has not run against real event data.

**Score-vs-ladder note:** The readiness score and ladder agree. the Operations Team is in the foundational band and L2 team-workflow reality.

## On-Ramp Recommendation

**Selected on-ramp:** MVIS + 90-Day Sprint.

Why:

- Headcount is 8, so Direct Mode applies.
- The competition-planning workflow is high-coordination and low-to-medium judgment.
- A v0.2 copilot already exists.
- Four Pillars maturity is too low for new agent classes or higher autonomy.

## Next Six Months

### Three Lowest-Scoring Dimensions

1. Firm Boundary Design: 4 / 10
2. Organizational Drag: 5 / 10
3. Network Structure, Reinvention Cadence, and Tacit Knowledge Accessibility: 5 / 10

### Highest-Leverage REWRITE Step

Repeat and deepen **Step 5: BUILD & PROVE** for the competition-planning workflow, while standing up MVIS from Step 2/3 foundations.

The practical sequence:

1. Stand up MVIS.
2. Complete HIDO for core data objects.
3. Run one real competition in shadow mode.
4. Review override rate and start-gate performance.
5. Convert the strongest outputs into standard the Operations Team operating templates.

### Retake Date

**Retake:** 2026-11-30

## 90-Day Sprint Goals

| Goal | Target |
|---|---|
| MVIS live | One planning workspace, one agent registry, one audit log, one human review queue |
| Real shadow-mode pilot | One actual Track & Field competition |
| Override rate | Establish real baseline; target below synthetic v0.1 baseline of 31% |
| Four Pillars maturity | Raise Trusted Evals, Logs, Rollback from 2 to 3 |
| HIDO | Complete 9 core data objects |
| Team adoption | Weekly 45-minute AI operating rhythm with all team members |

## Readiness Decision

the Operations Team should not attempt full organizational REWRITE yet.

the Operations Team should run a 90-day Direct Mode sprint with the Competition Planning Copilot v0.2 as the anchor workflow. This is the right scale: concrete enough to prove, broad enough to build the operating muscle.

## Assumptions To Verify

- Real event planning data is available for one upcoming competition.
- the Operations Team can assign named human owners for event, technical, operations, entries/results, communications, safety/medical, and finance approvals.
- A shared planning workspace can be established quickly.
- The team can commit to a weekly operating rhythm.
- Leadership agrees that the first sprint is not about headcount reduction.
