# Destination Architecture: the Operations Team

**REWRITE step:** 1, Backcast & Define
**Firm:** the Operations Team
**Mode:** Direct Mode, 8-person professional sports organization
**Sector focus:** Track & Field competition planning and event operations
**Drafted:** 2026-05-31
**Status:** Working draft using synthetic / assumed inputs. Requires real leadership review and sign-off.

## 1. Step 1 Purpose

This document defines what the Operations Team is trying to become before more workflows, agents, or autonomy are added.

The skill's rule is strict: Step 1 is not complete until there is a signed Destination Architecture, five design conditions are instantiated, the first workflow pipeline is ranked, Steps 2-6 are sequenced, and the leadership mandate is written.

Because the Operations Team is small, this applies in **Direct Mode**. the Operations Team does not need to spawn a separate Edge Twin. The company itself becomes the edge, and the first intelligence stack is built around one workflow before spreading.

## 2. Current State Snapshot

| Item | Current state |
|---|---|
| Headcount | 8 |
| AI adoption | Senior leadership uses AI extensively; adoption uneven across team |
| DRIVE score | 12 / 25 |
| SHAPE score | 12 / 25 |
| REWRITE readiness | 43 / 80 |
| Readiness band | Foundational work first |
| Miura-Ko level | L2, with narrow L3 edge in competition planning |
| Four Pillars maturity | 2 / 5 |
| Current autonomy ceiling | `recommend_only` |
| First proven workflow candidate | Track & Field competition planning |
| Second candidate | Post-event performance reporting |

## 3. Backcast: If the Operations Team Were Built Today

If the Operations Team were built from scratch with agentic AI available from day one, it would not be organized primarily around manual coordination, meetings, and person-to-person memory.

It would look like this:

1. Every competition is run through a shared event intelligence workspace.
2. Agents draft plans, checklists, reports, role cards, risk prompts, and learning logs.
3. Humans own purpose, judgment, athlete welfare, safety, trust, relationships, and final approvals.
4. Every recommendation is logged with source fields, confidence, approver, decision, override reason, and outcome.
5. Each event improves the next event through reusable templates, evals, and post-event learning.

## 4. the Operations Team MTP-As-Protocol

### MTP Statement

the Operations Team builds trusted, athlete-centered competition systems that help sport communities deliver better events, better performance environments, and faster learning.

### Constraint Layer

Agents are categorically forbidden from:

- Certifying results, publishing rankings, or sending external communications without human approval.
- Making safety, safeguarding, medical, eligibility, selection, disciplinary, or athlete-status decisions.
- Editing source-of-truth systems for results, finance, medical, safeguarding, or official entries.
- Using the Operations Team operational, athlete, or feedback data for model training without separate written approval.
- Expanding into a new workflow unless data owners, HIDO, evals, logs, rollback, and review gates are in place.

### Decision Layer

When tradeoffs appear, the Operations Team's agents should apply these priorities:

| Tradeoff | Priority |
|---|---|
| Athlete welfare vs. schedule pressure | Athlete welfare wins. |
| Result accuracy vs. publication speed | Accuracy wins. |
| Trust vs. operational convenience | Trust wins. |
| Reusable learning vs. one-off speed | Reusable learning wins unless the event is in rescue mode. |
| Human review time vs. autonomy | Human review wins until Four Pillars maturity is at least 3 / 5. |
| Performance opportunity vs. event complexity | Performance opportunity wins only if safety, staffing, and timing gates pass. |

### Identity Layer

the Operations Team operates as a small, high-trust, AI-native sports team. The cultural center is not the office or hierarchy; it is the shared operating rhythm of planning, delivering, reviewing, and improving competitions together.

## 5. MTP Litmus Tests

| Test | Draft answer | Status |
|---|---|---|
| Could an agent, given only this MTP, make a decision leadership would endorse? | Yes for low-risk planning recommendations; no for safety, results, eligibility, or public comms. | Conditional pass |
| Could an agent, given only this MTP, decide what not to build? | Yes: do not build autonomous publishing, autonomous result certification, autonomous safety decisions, or sponsor/commercial workflows before governance matures. | Pass |

## 6. Destination Architecture

### 18-Month Target State

the Operations Team runs its recurring sports operations through a Minimal Viable Intelligence Stack that supports the whole team.

The first mature loop is Track & Field competition planning:

- Event brief becomes the structured intake.
- Data manifest defines approved sources.
- HIDO travels with core data objects.
- Competition Planning Copilot drafts planning packs.
- Human Review Queue routes approvals.
- Audit log records all recommendations and overrides.
- Post-event reporting captures what actually happened.
- Lessons update the next event's templates, rules, and evals.

The destination is not "AI does the event." The destination is: **the Operations Team becomes a faster learning sports operator with human-owned trust and AI-supported coordination.**

### Intelligence Stack Shape

| Layer | the Operations Team destination behavior |
|---|---|
| PURPOSE | MTP protocol governs all agents and workflow decisions. |
| SENSE | Event briefs, entries, venue constraints, equipment, staffing, feedback, and results are structured before use. |
| INTERPRET | Agents identify planning gaps, timetable risks, staffing issues, data conflicts, and feedback themes. |
| DECIDE | Agents recommend; humans approve all one-way or trust-sensitive decisions. |
| ORCHESTRATE / ACT | Agents generate drafts, checklists, role cards, reports, and queues. |
| LEARN | Every event produces accepted / edited / rejected data, override reasons, and reusable lessons. |
| GOVERN / ASSURE | Evals, logs, rollback, review queues, permission envelopes, and kill switches are always on. |

## 7. Five Design Conditions Gate

| # | Condition | What it looks like at the Operations Team | Step 1 status |
|---:|---|---|---|
| 1 | AI-Centric Workflow Architecture | Competition planning and reporting move through structured workspaces, manifests, agents, review queues, and audit logs. Humans validate and decide instead of manually routing everything. | Instantiated for first two workflows |
| 2 | Recursive Improvement Infrastructure | Each event produces override logs, eval failures, template changes, and a vNext backlog. The human-override rate should fall over time. | Instantiated in draft; needs real event loop |
| 3 | Model Sovereignty and Governed Autonomy | Agents stay `recommend_only`; no source-of-truth edits; data access is workflow-scoped; no training on the Operations Team data by default. | Instantiated in policy; needs live credential and log controls |
| 4 | Intelligence Density at Every Layer | Leadership, operations, technical, results, communications, and safety roles all interact with shared AI-supported artifacts. | Partially instantiated; team-wide adoption still needed |
| 5 | Human Flourishing as Binding Constraint | No headcount reduction objective. The sprint is about lowering coordination load, spreading AI capability, and preserving human judgment. Weekly AI operating rhythm closes adoption gaps. | Instantiated as principle; needs real cadence |

### Gate Decision

**Step 1 design gate:** Conditional pass as a working draft.

It is strong enough to guide the next simulated steps. It is not formally complete until the Operations Team leadership signs it and names real owners.

## 8. Direct Mode Workflow Pipeline

In Direct Mode, the pipeline is not an Edge Twin portfolio. It is a ranked workflow migration queue for the whole company.

| Rank | Workflow | Value at stake | Coordination : judgment ratio | Wave | Decision |
|---:|---|---|---|---|---|
| 1 | Track & Field competition planning | High: event reliability, time saved, athlete experience, repeatable operating model | High coordination, medium judgment | Wave 1 | Anchor workflow |
| 2 | Post-event performance reporting | Medium-high: learning loop, coach/team follow-up, reusable intelligence | Medium-high coordination, medium judgment | Wave 1b | Shadow only |
| 3 | Event communications drafting | Medium: speed and consistency | Medium coordination, higher trust/reputation judgment | Wave 2 | Draft-only after gates improve |
| 4 | Supplier / equipment readiness | Medium: cost, reliability, reduced failure risk | Medium coordination, low-medium judgment | Wave 2 | Later, after supplier data manifest |
| 5 | Sponsor / partner reporting | Medium-high commercial value | Medium coordination, high external judgment | Wave 3 | Not yet |
| 6 | Athlete selection / eligibility / ranking | High consequence | High judgment | Stay human | No autonomous delegation |

**First workflow:** Track & Field competition planning.

**Second workflow:** Post-event performance reporting, shadow mode only.

## 9. Architecture Blueprint For First Workflow

| Component | the Operations Team implementation |
|---|---|
| Workflow | Track & Field competition planning |
| Agent | Competition Planning Copilot v0.2, moving toward v0.3 |
| Autonomy | `recommend_only` |
| Approved sources | Event brief, entries summary, venue constraints, equipment list, role roster, timetable, approved templates, incident/risk prompts |
| Core outputs | Planning pack, gap list, draft timetable, role cards, venue/event-control checklists, communications drafts, learning log |
| Human-owned decisions | Final timetable, safety, medical, safeguarding, eligibility, seeding, payments, public comms, results publication |
| GOVERN / ASSURE | Synthetic evals, audit log, correlation IDs, Human Review Queue, rollback register, HIDO pack |
| Success metric | Lower coordination time and falling human-override rate without governance failure |
| Rollback | Revert to previous human-only planning process and last approved template version |

## 10. Steps 2-6 Sequenced

| Step | Owner | Duration | Exit criteria |
|---|---|---:|---|
| 2. Assess & Prepare | Leadership / AI Operating Owner | Completed in draft, retake every 6 months | DRIVE, SHAPE, readiness score, Four Pillars maturity, on-ramp selected |
| 3. Extract | Event Lead + Data Steward | 2-4 weeks | Data manifests complete; HIDO complete for core objects; access-vs-training signed |
| 4. Diagnose & Strip | Event Lead + workflow owners | 1-2 weeks per workflow | Task decomposition scored; low-risk agent tasks separated from human judgment tasks |
| 5. Build & Prove | AI Operating Owner + workflow owner | 60-90 days | MVIS live; one real shadow pilot; override rate measured; evals/logs/rollback/review queue working |
| 6. Rewire & Evolve | Leadership | After real proof | Weekly AI operating rhythm; pod-like ownership; standard templates; continuous kill switch cadence |

## 11. Leadership Roles

For an 8-person company, this does not need a heavy C-suite structure. It does need named accountability.

| Role | Recommended owner pattern |
|---|---|
| Sponsor | CEO / Managing Director |
| AI Operating Owner / CAIO equivalent | One senior leader with technical fluency and P&L awareness |
| Workflow owner | Event Lead / Competition Director |
| Data steward | Person accountable for approved data sources, HIDO, retention, and access-vs-training policy |
| Human Review Queue owner | Event Lead or Operations Lead |
| Safety / safeguarding owner | Named human approver |
| Communications approver | Named human approver |
| Results approver | Named Results Lead |

## 12. Leadership Mandate Draft

the Operations Team commits to redesigning selected sports operations around the Intelligence Stack while preserving human accountability for trust-sensitive decisions.

For the next 90 days, the Operations Team will use Track & Field competition planning as the anchor workflow. The Competition Planning Copilot remains `recommend_only`. It may draft, structure, compare, summarize, and log. It may not certify, send, publish, select, approve, spend, or alter source-of-truth records.

the Operations Team will fund the sprint as an organization-level operating priority, not as a side project. GOVERN / ASSURE will operate from day one in alert-only mode and progress toward tested rollback and kill-switch capability before autonomy increases.

This sprint is not a headcount-reduction program. It is a coordination, reliability, learning, and team-capability program.

**Sponsor signature:** _____________________________________
**AI Operating Owner:** _____________________________________
**Date:** _____________________________________

## 13. Step 1 Exit Criteria

| Exit criterion | Status |
|---|---|
| Destination Architecture produced | Complete as draft |
| CEO / sponsor signed | Not complete |
| Five Design Conditions instantiated | Conditional pass |
| Direct Mode workflow pipeline ranked | Complete as draft |
| Architecture Blueprint for first workflow | Complete as draft |
| Steps 2-6 sequenced | Complete as draft |
| Leadership mandate in writing | Drafted, not signed |

## Step 1 Decision

This is a usable Step 1 working draft for learning the process.

For real execution, Step 1 remains **not formally complete** until the Operations Team leadership reviews, edits, names the owners, and signs the mandate.
