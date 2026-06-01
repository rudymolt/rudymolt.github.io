# 90-Day MVIS Sprint Plan: the Operations Team

**Firm:** the Operations Team
**Mode:** Direct Mode
**Anchor workflow:** Track & Field competition planning
**Anchor agent:** Competition Planning Copilot v0.2
**Created:** 2026-05-31
**Planning horizon:** 90 days

## Sprint Objective

Stand up the Operations Team's Minimal Viable Intelligence Stack around one real competition-planning workflow, run the Competition Planning Copilot v0.2 in shadow mode on a real Track & Field event, and convert the learning into repeatable operating infrastructure.

This sprint is not about headcount reduction. It is about reducing coordination drag, improving competition reliability, and building the Operations Team's first reusable AI-native operating loop.

## Starting Point

| Item | Current state |
|---|---|
| DRIVE score | 12 / 25 |
| SHAPE score | 12 / 25 |
| REWRITE readiness | 43 / 80 |
| Readiness band | Foundational work needed first |
| Miura-Ko level | L2, with narrow L3 edge in competition planning |
| Recommended on-ramp | MVIS + 90-Day Sprint |
| Four Pillars maturity | 2 / 5 |
| Current autonomy | `recommend_only` only |

## Target By Day 90

| Area | Day 90 target |
|---|---|
| MVIS | One planning workspace, one agent registry, one audit log, one human review queue |
| Real pilot | One actual Track & Field competition run in shadow mode |
| Override rate | Real baseline measured; target below synthetic v0.1 baseline of 31% |
| Four Pillars maturity | Trusted Evals, Searchable Logs, and Granular Rollback raised from 2 to 3 |
| HIDO | Nine core data objects completed |
| Team adoption | Weekly 45-minute AI operating rhythm with all team members |
| Reusable assets | Event brief, timetable rules, role cards, venue checklist, event-control checklist adopted as standard templates |

## MVIS Design

The Minimal Viable Intelligence Stack is intentionally small.

| MVIS component | the Operations Team implementation |
|---|---|
| Event bus | Shared planning workspace with one event ID and correlation ID per action |
| Agent registry | A simple registry listing approved agents, version, owner, autonomy tier, allowed sources, and eval status |
| Central logging | Audit log table with correlation IDs, source fields, recommendation, confidence, human decision, override reason, and outcome |
| One agent per class | Competition Planning Copilot v0.2 only |
| Human review queue | Approval queue for timetable, communications, safety/medical/safeguarding, budget, entries/results, publishing |

## MVIS Tables To Create

### 1. Agent Registry

| Field | Example |
|---|---|
| Agent ID | RUW-AGENT-CPC-001 |
| Agent name | Competition Planning Copilot |
| Version | v0.2 |
| Owner | Competition Director |
| Autonomy tier | recommend_only |
| Workflow | Track & Field competition planning |
| Allowed sources | Event brief, entries summary, venue data, equipment list, staffing roster, approved templates |
| Forbidden actions | Send, publish, approve, decide eligibility/safety/payment, edit source-of-truth systems |
| Eval status | Synthetic eval passed; real eval pending |
| Last review date | TBD |

### 2. Audit Log

| Field | Required |
|---|---|
| Correlation ID | Yes |
| Event ID | Yes |
| Timestamp | Yes |
| User/requester | Yes |
| Agent/version | Yes |
| Source fields used | Yes |
| Recommendation/output | Yes |
| Confidence | Yes |
| Start-gate status | Yes |
| Permission check | Yes |
| Human approver | Yes |
| Human decision | Accepted / edited / rejected |
| Override reason | Required if edited/rejected |
| Outcome | Added when known |

### 3. Human Review Queue

| Review item | Owner | SLA | Gate |
|---|---|---:|---|
| Final timetable | Technical Lead | 24h | Required before external communications |
| Entries / eligibility / seeding | Entries / Results Lead | 24h | Human decision only |
| Safety / safeguarding plan | Safety Lead | 24h | Required before event start |
| Medical plan | Medical Lead | 24h | Required before event start |
| Budget / spend | Finance Lead | 48h | Human approval only |
| External communications | Communications Lead | 24h | Requires final timetable |
| Public publishing | Communications Lead + Event Lead | 24h | Requires approval |
| Results publication | Results Lead + Technical Lead + Communications Lead | Same day | Requires two-person verification |

## 90-Day Plan

## Phase 1: Days 1-14, MVIS Setup

**Goal:** Create the operating surface before using real event data.

| Day | Work | Output | Owner |
|---:|---|---|---|
| 1 | Confirm sprint sponsor and workflow owner. | Named owner list | Leadership |
| 2 | Create shared planning workspace. | Workspace link / folder | Operations Lead |
| 3 | Create Agent Registry table. | Registry v1 | Event Lead |
| 4 | Create Audit Log table. | Audit Log v1 | Event Lead |
| 5 | Create Human Review Queue table. | Review Queue v1 | Event Lead |
| 6 | Confirm correlation ID convention. | `RUW-{EVENTID}-{YYYYMMDD}-{SEQUENCE}` | Event Lead |
| 7 | Load v0.2 artifacts into workspace. | Approved template set | Operations Lead |
| 8-10 | Replace sample owners with real owners. | Owner map | Leadership |
| 11-12 | Confirm no live integrations yet; file/workspace only. | Permission boundary | Event Lead |
| 13-14 | Run synthetic dry run in workspace. | Dry-run audit log | Team |

**Exit criteria:**

- [ ] Agent Registry exists
- [ ] Audit Log exists
- [ ] Human Review Queue exists
- [ ] Correlation ID format used in dry run
- [ ] All real owners named
- [ ] Copilot still `recommend_only`

## Phase 2: Days 15-30, Data Governance And Evals

**Goal:** Raise Four Pillars maturity from 2 toward 3 before real data use.

| Workstream | Action | Output |
|---|---|---|
| Trusted Evals | Convert v0.2 synthetic eval into recurring eval set. | Eval suite v1 |
| Searchable Logs | Test audit log retrieval by correlation ID. | Log retrieval test |
| Granular Rollback | Version all prompts/templates/rules with rollback notes. | Rollback register |
| Human Review Queue | Run two mock approvals through queue. | Queue test |
| HIDO | Complete nine core data objects. | HIDO pack v1 |
| Access-vs-training | Confirm no training on the Operations Team data. | Signed setting/policy note |

## HIDO Objects For This Sprint

Complete HIDO Six Questions for:

1. Event brief
2. Entries summary
3. Venue constraints
4. Role roster
5. Equipment inventory
6. Timetable
7. Communication draft
8. Incident / risk item
9. Results record

**Exit criteria:**

- [ ] Eval suite v1 exists
- [ ] Audit log search test passed
- [ ] Rollback register exists
- [ ] Human Review Queue tested
- [ ] HIDO completed for nine objects
- [ ] Access-vs-training statement signed

## Phase 3: Days 31-45, Real Event Intake

**Goal:** Prepare one real competition for shadow mode.

| Step | Action | Output |
|---:|---|---|
| 1 | Choose the real Track & Field competition. | Event ID |
| 2 | Complete v0.2 event brief with real data. | Event brief v1 |
| 3 | Confirm data manifest still covers sources. | Manifest update |
| 4 | Confirm entries summary and source of truth. | Entries summary |
| 5 | Confirm venue readiness data. | Venue readiness table |
| 6 | Confirm staffing and equipment data. | Staffing/equipment tables |
| 7 | Run copilot to produce draft planning pack. | Planning pack v1 |
| 8 | Route outputs through Human Review Queue. | Approval decisions |

**Exit criteria:**

- [ ] Real event brief complete
- [ ] No unapproved data sources used
- [ ] Planning pack generated with correlation IDs
- [ ] Human approvals/rejections logged
- [ ] Start-gate status visible

## Phase 4: Days 46-60, Shadow-Mode Parallel Run

**Goal:** Compare copilot output with human planning, without delegating authority.

Use the four cold-start learning feeds:

| Feed | the Operations Team version |
|---|---|
| Historical replay | Compare copilot against prior event plans, if available |
| Shadow comparison | Compare copilot recommendations to human plan for the real event |
| Human-correction capture | Log accepted/edited/rejected with override reason |
| Synthetic edge cases | Test rare cases: medical cover missing, timing failure, weather delay, throws boundary breach |

**Primary metric:** human override rate.

Override taxonomy:

- Safety / medical / safeguarding
- Technical correctness
- Athlete performance / recovery
- Venue constraint
- Staffing constraint
- Equipment constraint
- Communications / tone
- Budget / supplier constraint
- Missing data
- Policy / approval gate

**Exit criteria:**

- [ ] Shadow comparison complete
- [ ] Override rate calculated
- [ ] Override reasons captured
- [ ] Start-gate failures tracked
- [ ] No forbidden actions executed

## Phase 5: Days 61-75, Event Execution And Learning

**Goal:** Use the copilot as a draft/review system during the real event, not as an execution agent.

| Moment | Copilot role | Human owner |
|---|---|---|
| Pre-event readiness | Summarize start gates and unresolved gaps | Event Lead |
| Day-of changes | Draft options and consequences | Competition Director |
| Timetable drift | Flag drift and options | Technical Lead |
| Communications | Draft updates only | Communications Lead |
| Results | Support verification checklist only | Results Lead |
| Closeout | Produce learning template | Event Lead |

**Exit criteria:**

- [ ] Event-control checklist used
- [ ] Day-of issues logged
- [ ] Human decisions captured
- [ ] Results publication gate respected
- [ ] Post-event learning session scheduled

## Phase 6: Days 76-90, Evaluation And Standardization

**Goal:** Decide what becomes standard operating infrastructure.

| Work | Output |
|---|---|
| Complete pilot evaluation report | Real pilot evaluation |
| Compare real override rate to synthetic baselines | Baseline trend |
| Update copilot to v0.3 if needed | v0.3 change list |
| Promote reusable artifacts | Standard template set |
| Re-score Four Pillars | Updated maturity score |
| Re-score selected DRIVE/SHAPE deltas | 90-day delta note |

**Exit criteria:**

- [ ] Pilot evaluation complete
- [ ] Real override rate measured
- [ ] v0.3 backlog created
- [ ] Standard templates approved
- [ ] Four Pillars target checked
- [ ] Decision made: repeat sprint, expand to next workflow, or pause

## Weekly Operating Rhythm

Run a 45-minute weekly AI operating meeting.

| Segment | Time | Prompt |
|---|---:|---|
| Workflow demo | 10m | What did the copilot produce this week? |
| Judgment lesson | 10m | Where did a human override it, and why? |
| Template improvement | 10m | What prompt, rule, checklist, or data field should change? |
| Governance check | 10m | Any log gaps, HIDO gaps, start-gate issues, or forbidden-action attempts? |
| Commitments | 5m | What changes before next week? |

## Metrics Dashboard

| Metric | Baseline | Target |
|---|---:|---:|
| Human override rate | Synthetic v0.1: 31%; synthetic v0.2: 14% | Real baseline below 31%; trend downward |
| Start-gate misses | Not yet real | 0 |
| Public-comms gate failures | Synthetic v0.2: 0 | 0 |
| Forbidden action attempts | Synthetic v0.2: 0 | 0 |
| Planning pack creation time | Synthetic v0.1 saved 2h55m | 3h+ net saving |
| Four Pillars maturity | 2 / 5 | 3 / 5 |
| HIDO completion | 0 / 9 | 9 / 9 |
| Team operating rhythm | Not live | 10+ weekly sessions |

## Decision Gates

### Do Not Increase Autonomy Unless

- [ ] Four Pillars maturity is at least 3
- [ ] HIDO pack complete for all core data objects
- [ ] Real shadow-mode override trend is falling
- [ ] Start-gate misses are zero
- [ ] Human owners are satisfied with review queue
- [ ] Kill switch and rollback are tested

### Consider Expanding To A Second Workflow If

- [ ] Real pilot completes without safety/governance incident
- [ ] Planning pack saves meaningful time after review
- [ ] Override taxonomy produces useful learning
- [ ] Team operating rhythm is sustained
- [ ] Reusable templates are adopted

## Suggested Second Workflow Candidates

Do not start these until the first sprint exits cleanly.

| Candidate | Why |
|---|---|
| Athlete communications calendar | High coordination, low judgment if approvals stay human |
| Sponsor / partner activation planning | Repeatable planning, clear approvals |
| Training camp logistics | Similar event-planning structure |
| Post-event performance reporting | Strong learning loop potential |

## Final Recommendation

Proceed with the 90-day sprint. Keep the Competition Planning Copilot v0.2 in `recommend_only` mode. Treat the sprint as the Operations Team's first operational intelligence stack, not a software demo.
