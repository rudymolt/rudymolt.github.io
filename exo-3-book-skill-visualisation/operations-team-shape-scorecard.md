# SHAPE Scorecard: the Operations Team

**Firm:** the Operations Team
**Date:** 2026-05-31
**Scored by:** Codex using Building an ExO skill
**Scope:** Organization-level score, informed by Competition Planning Copilot v0.2

## Context

the Operations Team is an 8-person professional sports organization. Senior leadership uses AI heavily, but adoption is uneven across the team. The strongest current SHAPE artifact is the Competition Planning Copilot v0.2, which has a clear permission envelope, start gates, human approval boundaries, and draft-only restrictions.

This score evaluates the Operations Team's organizational form, not only the copilot workflow.

## Component Scores

## S: Safe Autonomy

**Score:** 3 / 5

the Operations Team now has a documented safe-autonomy model for one workflow:

- `recommend_only` autonomy tier
- Explicit forbidden actions
- Human approval gates
- Medical, safeguarding, timing, emergency-access, results, call-room, final-timetable, and communications start gates
- Synthetic evals for v0.2
- Human override capture

This is a meaningful Fiduciary Wedge for the competition-planning workflow: every critical decision still routes to a named human role.

However, safe autonomy is not yet operational across the organization. The kill switch is conceptual, not tested. There is no live audit system, scoped credential plan, or formal rollback mechanism.

### Permission Envelope Check

- [x] Scope isolation documented for the competition-planning workflow
- [x] Approval threshold for destructive / external actions
- [x] No irreversible operations permitted in Wave 1
- [ ] Tested kill switch with documented recovery procedure
- [ ] Live credential isolation

### Four Pillars Sub-Rubric

| Pillar | Score | Reasoning |
|---|---:|---|
| Trusted Evals | 2 | Synthetic eval suite exists; no real recurring eval suite yet. |
| Searchable Logs with Correlation IDs | 2 | Correlation ID format exists; no live searchable log yet. |
| Granular Rollback | 2 | Versioned markdown artifacts exist; no live rollback mechanism. |
| Human Review Queue | 3 | Start gates and approval owners are explicit in v0.2. |
| **Four Pillars Maturity** | **2** | Minimum pillar score is 2. |

### HIDO Check

- [ ] HIDO Six Questions answered for every data object an agent acts on
- [ ] HIDO metadata immutable, hashed, signed
- [ ] HIDO metadata travels with the data, including across firm boundary

**Reasoning:** Safe autonomy is well-designed for the pilot, but not yet live as an operating control plane.

## H: Human Architecture

**Score:** 2 / 5

the Operations Team is small enough that the Middle 60% problem is not primarily a layoff/absorption issue. The real risk is **AI bifurcation**: senior leadership becomes AI-native while some team members remain outside the loop.

The competition-planning workflow helps because it turns AI use into shared artifacts: briefs, checklists, role cards, reviews, and learning templates. But there is no formal team-wide AI learning rotation, mentoring pattern, or capability map yet.

### Absorption Math

- Current headcount in target function: approximately 8 total organization members; target workflow spans several roles.
- AI-native headcount projection: no reduction recommended.
- Math published and reviewed by leadership? No.
- Transition budget allocated? Not applicable yet; no reduction plan.
- Outcomes mapped: concentrate / redeploy / exit? No; not relevant to current small-team use case.

### Missing Junior Loop Check

- [ ] Stack-mentored learning rotations exist
- [ ] AI-augmented mentoring program in place
- [ ] Structured exposure to judgment patterns agents cannot yet handle

### Bifurcation / Caste Check

- [ ] Promotion paths from outer ring to inner ring exist
- [ ] Caste-formation measured as a leading indicator
- [ ] Inner ring is porous

**Reasoning:** Because absorption math and AI adoption bridge are not yet modeled, H is capped at 2. The practical focus should be a team-wide operating rhythm, not headcount change.

## A: Adaptive Architecture

**Score:** 3 / 5

The competition-planning copilot is modular:

- Agent spec
- Event brief
- Data manifest
- Timetable rules module
- Role-card templates
- Venue/event-control checklists
- Synthetic evals
- Shadow-mode review table

This is a good sign. The workflow can be changed without rewriting everything. The v0.1 to v0.2 upgrade proves the Operations Team can learn and refactor the workflow.

But this modularity is still mostly document/runbook-based. It is not yet a live system with swappable model providers, reusable software components, or pod-based operating cadence.

**Reasoning:** Some stack layers can be swapped with effort; the competition workflow is modular, but the broader organization is not yet pod-based.

## P: Purpose Control

**Score:** 2 / 5

The competition workflow has a clear local purpose: **help athletes achieve the best possible performances**. That purpose informed several good decisions: timed finals over showcase rounds, lower waiting time, start gates, and no public comms before approval.

However, the Operations Team does not yet have a full MTP protocol with:

- Constraint Layer
- Decision Layer
- Identity Layer

The local event purpose is not yet enough for an agent to make leadership-endorsed decisions across the organization or decide what not to build.

### MTP Litmus Tests

- [ ] Could an agent, given only the MTP, make a decision leadership would endorse?
- [ ] Could that agent, given only the MTP, decide what NOT to build?

**Reasoning:** Strong workflow-level purpose, but no organization-level machine-readable MTP yet.

## E: Ecosystem Trust

**Score:** 2 / 5

Sports competitions depend on trust across athletes, coaches, clubs, schools, officials, venues, parents, suppliers, and potentially governing bodies. the Operations Team's current artifacts recognize this through approval gates, results verification, communications gates, safety controls, and role owners.

But trust is still mostly role/reputation/process-based. There is no verifiable credential system, cross-party API surface, cryptographic identity, liability framework, or partner-facing agent protocol.

### Balkanization Design Check

- [ ] Designed for cognitive blocs: US / China / EU divergence
- [ ] Sovereign AI capability evaluated
- [ ] Multi-bloc partner strategy

### Cross-Organizational Accountability Check

- [ ] Policy-controlled API surface for external agents
- [ ] HIDO metadata travels with every data object exchanged
- [ ] Liability framework codesigned with counterparty
- [ ] Legal / governance owner in the room when integration is designed

**Reasoning:** Auditability and trust patterns are emerging, but ecosystem trust is not yet protocolized.

## Totals

| Component | Score |
|---|---:|
| S: Safe Autonomy | 3 / 5 |
| H: Human Architecture | 2 / 5 |
| A: Adaptive Architecture | 3 / 5 |
| P: Purpose Control | 2 / 5 |
| E: Ecosystem Trust | 2 / 5 |
| **Total** | **12 / 25** |

## Middle-60% Rule

| Field | Value |
|---|---|
| Absorption modeled? | No |
| H capped at 2 due to absorption / adoption-bridge gap? | Yes |

For the Operations Team, the cap is less about workforce reduction and more about the missing team-wide AI adoption bridge.

## Interpretation

the Operations Team's SHAPE maturity is strongest where the competition-planning copilot has forced explicit boundaries. The organization now has a clear safe-autonomy pattern for one workflow.

The main gap is organizational: human architecture, purpose protocol, and ecosystem trust are not yet formal. the Operations Team can safely keep building the competition-planning copilot, but should not increase autonomy until HIDO, logs, and real review queues are in place.

## Highest-Leverage Area

**Lowest-scoring components:** Human Architecture, Purpose Control, Ecosystem Trust.

The most immediate 90-day priority is **Human Architecture**, because uneven AI adoption will limit everything else.

## First Three Actions

1. **Create a the Operations Team AI operating rhythm.**
   Weekly 45-minute team session: one workflow demo, one judgment lesson, one reusable prompt/template, one risk or override reviewed.

2. **Draft the Operations Team's MTP protocol.**
   Convert "help athletes achieve the best possible performances" into an organization-level Constraint Layer, Decision Layer, and Identity Layer.

3. **Complete HIDO for competition-planning data objects.**
   Start with event brief, entries summary, timetable, role roster, equipment inventory, venue constraints, communication draft, incident/risk item, and results record.

## 90-Day Target

| Component | Current | 90-day target |
|---|---:|---:|
| Safe Autonomy | 3 | 3 |
| Human Architecture | 2 | 3 |
| Adaptive Architecture | 3 | 3 |
| Purpose Control | 2 | 3 |
| Ecosystem Trust | 2 | 2 |
| **SHAPE total** | **12** | **14** |

The fastest realistic gain is not more agents. It is turning the v0.2 pilot into a shared team operating discipline.

## Assumptions To Verify

- the Operations Team has no formal MTP protocol yet.
- the Operations Team has no team-wide AI learning cadence yet.
- AI usage is currently uneven across the 8-person team.
- No formal HIDO data-object governance exists yet.
- No live searchable log or human review queue exists yet.
