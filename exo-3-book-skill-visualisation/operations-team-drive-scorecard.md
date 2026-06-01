# DRIVE Scorecard: the Operations Team

**Firm:** the Operations Team
**Date:** 2026-05-31
**Scored by:** Codex using Building an ExO skill
**Sector:** Hybrid / professional sports
**Scope:** Organization-level score, informed by the completed competition-planning copilot slice

## Context

the Operations Team is an 8-person professional sports organization. Senior leadership uses AI extensively every day, but not all team members do yet. The strongest current AI-native artifact is the **Competition Planning Copilot v0.2** for Track & Field competition planning.

This scorecard evaluates the Operations Team's current DRIVE maturity as an organization, not just the prototype workflow. Where the competition-planning workflow is ahead of the rest of the organization, that is called out explicitly.

## Component Scores

### D: Decision Architecture

**Score:** 3 / 5

the Operations Team now has a concrete decision architecture for one workflow: the Competition Planning Copilot has start gates, approval owners, forbidden actions, escalation rules, and a `recommend_only` autonomy tier. This is real progress.

The organization does not yet appear to have a full agency map for all major decision classes: athlete decisions, commercial decisions, coaching decisions, operations, finance, partnerships, hiring, safeguarding, and communications.

**Reasoning:** Some decision categories are mapped to agents under guardrails, but this is not yet organization-wide.

## R: Recursive Learning

**Score:** 3 / 5

The competition-planning workflow now has a learning loop: synthetic event data, shadow-mode review, pilot evaluation, override taxonomy, v0.2 improvements, and a fresh synthetic run. This is better than a one-off AI demo.

However, recursive learning is not yet operational across the Operations Team. The system still needs real event data, a recurring post-event review cadence, versioned templates, and a standard mechanism for propagating lessons to future competitions and other workflows.

**Reasoning:** Some workflows are versioned, and learnings are codified in artifacts, but this has not yet become an operating cadence.

## I: Intelligence Stack

**Score:** 2 / 5

the Operations Team has a strong pilot stack for competition planning:

- PURPOSE: event purpose and decision priorities
- SENSE: structured event brief and data manifest
- INTERPRET: planning gaps, timetable logic, staffing and risk analysis
- DECIDE: recommendations only
- ORCHESTRATE / ACT: draft planning packs, role cards, checklists
- LEARN: shadow-mode review and override capture
- GOVERN / ASSURE: start gates, permission envelope, synthetic eval

But this is not yet a Minimal Viable Intelligence Stack. There is no operational event bus, agent registry, central logging system, or reusable production agent class. GOVERN/ASSURE is designed but not live.

### Four Pillars Sub-Rubric

| Pillar | Score | Reasoning |
|---|---:|---|
| Trusted Evals | 2 | Synthetic v0.2 eval exists, but no real recurring eval suite against real events. |
| Searchable Logs with Correlation IDs | 2 | Correlation ID format exists; no live searchable audit system yet. |
| Granular Rollback | 2 | Versioned markdown artifacts exist; no live prompt/model/workflow rollback mechanism. |
| Human Review Queue | 3 | Approval owners, start gates, and draft-only restrictions are explicit. |
| **Four Pillars Maturity** | **2** | Minimum pillar score is 2. |

**I score cap:** The Intelligence Stack score is capped at 2 by the Four Pillars maturity minimum.

### HIDO Check

- [ ] HIDO Six Questions answered for every data object an agent reads or writes
- [ ] HIDO metadata immutable, hashed, signed
- [ ] HIDO metadata travels with the data across firm boundary, if applicable

**Reasoning:** Strong pilot architecture, but no operational MVIS or live GOVERN/ASSURE layer yet.

## V: Value Moat

**Score:** 2 / 5

the Operations Team's emerging moats are:

- Curatorial judgment in athlete-centered competition design
- Reconfiguration speed through AI-supported planning
- Potential proprietary event data and post-event learning
- Potential repeatable operating system for sports competition delivery

These are promising, but they are not yet compounding. The event data is not yet structured into a reusable intelligence asset. Model/provider strategy is not defined. Owned orchestration logic is emerging in markdown/runbook form, but not yet productized.

### Sources Present

- [ ] Proprietary data: emerging, not yet structured
- [ ] Network effects: not demonstrated
- [x] Intelligence density: emerging through copilot workflow
- [x] Reconfiguration speed: emerging
- [x] Curatorial judgment: present

### Cognitive Captivity Check

- [ ] Inference across at least two model families
- [x] Owned orchestration logic, partially in runbooks/templates
- [ ] Owned fine-tuning data

### Customer-Side Agent Inversion Check

- [ ] Pricing legible to agents
- [ ] APIs designed for agent buyers
- [ ] Counter-agent strategy in place

**Reasoning:** Durable advantage is plausible but early. The moat becomes real only when repeated events generate structured learning faster than competitors can copy.

## E: Elastic Agency

**Score:** 2 / 5

the Operations Team has started to define how AI agents and humans combine in one workflow. The Competition Planning Copilot v0.2 has roles, start gates, and clear human approval boundaries.

There is not yet a broader Capability Registry across the organization. Agent/human composition is not yet used as a hiring or resourcing model. Graduated authority exists in the copilot design, but not in daily operations.

**Reasoning:** Some agent/human composition logic exists, but it is still workflow-specific and mostly ad hoc.

## Totals

| Field | Value |
|---|---:|
| D: Decision Architecture | 3 / 5 |
| R: Recursive Learning | 3 / 5 |
| I: Intelligence Stack | 2 / 5 |
| V: Value Moat | 2 / 5 |
| E: Elastic Agency | 2 / 5 |
| **Raw total** | **12 / 25** |

## GOVERN-Cap Rule

| Field | Value |
|---|---|
| GOVERN/ASSURE status | Designed for one workflow; not operational |
| GOVERN-cap rule applied? | Yes, cap at 13 |
| Final DRIVE score | 12 / 25 |

The raw score is already below the cap, so the cap does not reduce it further.

## Interpretation

the Operations Team is no longer at pure AI-theater level. It has a serious pilot workflow with a real decision boundary, learning loop, and governance language.

But the current maturity is still **pilot-stage DRIVE**, not an intelligence engine. The next leap is turning the competition-planning copilot from markdown artifacts and synthetic tests into a real operating loop with live logs, real event data, HIDO governance, and repeated post-event learning.

## Highest-Leverage Area

**Lowest-scoring component:** Intelligence Stack / GOVERN operationalization.

The best next 90-day move is not to expand autonomy. It is to operationalize the Minimal Viable Intelligence Stack around one real competition workflow.

## First Three Actions

1. **Stand up MVIS for competition planning.**
   Create one shared planning workspace, one agent registry, one audit log with correlation IDs, and one review queue for human approvals.

2. **Run one real event in shadow mode.**
   Use the v0.2 copilot on an actual the Operations Team competition, compare it with the human plan, and measure override rate against the synthetic baseline.

3. **Complete data-side governance.**
   Fill HIDO Six Questions for the core data objects: event brief, entries summary, venue constraints, role roster, equipment inventory, timetable, communication draft, incident/risk item, and results record.

## 90-Day Target

| Component | Current | 90-day target |
|---|---:|---:|
| Decision Architecture | 3 | 3 |
| Recursive Learning | 3 | 4 |
| Intelligence Stack | 2 | 3 |
| Value Moat | 2 | 3 |
| Elastic Agency | 2 | 3 |
| **DRIVE total** | **12** | **16** |

To reach 16/25, the Operations Team needs a real MVIS and one repeated learning cycle from a live event.

## Assumptions To Verify

- the Operations Team has no existing central audit log for AI-assisted planning.
- the Operations Team has no formal organization-wide Capability Registry yet.
- The competition-planning copilot has not yet been used on real production event data.
- Current model/provider strategy is not yet defined.
- Real approvers and data owners still need to replace sample role labels in the artifacts.
