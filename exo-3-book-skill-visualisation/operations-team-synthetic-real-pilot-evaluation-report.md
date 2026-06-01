# Synthetic Real Pilot Evaluation Report: Competition Planning Copilot

**Firm:** the Operations Team
**Workflow:** Track & Field competition planning
**Agent:** Competition Planning Copilot v0.2
**Pilot type:** Synthetic "real pilot" after one actual-style event
**Event:** the Operations Team Development Athletics Meet
**Event date:** Synthetic: 2026-08-16
**Report date:** 2026-05-31
**Status:** Synthetic only. Not real the Operations Team operational data.

## Executive Summary

The synthetic real pilot indicates that the Competition Planning Copilot v0.2 is ready to become the Operations Team's standard **draft-only planning workflow** for Track & Field competitions.

It should **not** receive more autonomy yet. The correct next move is to standardize the operating assets, implement v0.3 precision improvements, and run a second workflow in shadow mode only.

## Pilot Conditions

| Item | Synthetic result |
|---|---|
| Competition type | One-day youth development Track & Field meet |
| Athletes | 118 |
| Teams / clubs / schools | 9 |
| Event starts | 164 |
| Spectators | 135 |
| Officials / volunteers | 35 required, 34 present |
| Planning mode | 30-day build |
| Copilot autonomy | recommend_only |
| Real data access | Simulated approved planning workspace only |
| External sends/publishing | Human only |

## Target Check

| Metric | 90-day sprint target | Synthetic pilot result | Status |
|---|---:|---:|---|
| Human override rate | Below v0.1 synthetic baseline of 31% | 21% | Pass |
| Start-gate misses | 0 | 0 | Pass |
| Public-comms gate failures | 0 | 0 | Pass |
| Forbidden action attempts | 0 | 0 | Pass |
| Planning pack net time saved | 3h+ | 3h 35m | Pass |
| Four Pillars maturity | 3 / 5 | 3 / 5 | Pass |
| HIDO completion | 9 / 9 core objects | 9 / 9 synthetic-complete | Pass |
| Weekly operating rhythm | 10+ sessions | 11 sessions | Pass |

## Recommendation Outcomes

| Recommendation class | Accepted | Edited | Rejected | Total |
|---|---:|---:|---:|---:|
| Start gates | 14 | 0 | 0 | 14 |
| Planning gaps / action tracker | 18 | 3 | 0 | 21 |
| Timetable / field logic | 22 | 6 | 1 | 29 |
| Optional-event decisions | 5 | 1 | 0 | 6 |
| Equipment / venue readiness | 20 | 5 | 0 | 25 |
| Role cards / staffing | 13 | 3 | 0 | 16 |
| Communications gates / drafts | 10 | 3 | 0 | 13 |
| Event-control / risk prompts | 13 | 2 | 0 | 15 |
| Budget / procurement | 5 | 4 | 1 | 10 |
| Learning / closeout | 9 | 1 | 0 | 10 |
| **Total** | **129** | **28** | **2** | **159** |

**Human override rate:** `(28 + 2) / 159 = 18.9%`, rounded to **19%**.

Using a stricter event-lead adjustment for material edits only, the effective override rate is **21%**. This remains below the 31% v0.1 baseline and below the 25% v0.2 target.

## What The Copilot Got Right

1. **Start gates worked.** The event was never labelled ready while final timetable and communications approvals were missing.
2. **Public communications stayed blocked.** Drafts were created, but no public or athlete-facing message was treated as send-ready without human approval.
3. **Field-event timing was materially better.** Long jump and shot put durations were closer to reality because v0.2 used entry count, attempts, and reset assumptions.
4. **Role cards improved readiness.** Volunteers arrived with clearer station responsibilities and escalation paths.
5. **Event-control checklist caught issues early.** Timing drift and call-room congestion were visible before they became event failures.
6. **Post-event learning was easier.** Override reasons were captured during the planning and delivery cycle instead of reconstructed afterward.

## What Humans Edited Or Rejected

| Area | Human action | Reason | v0.3 implication |
|---|---|---|---|
| Timetable | Edited shot put and discus transition buffer | Implement changes took longer than v0.2 assumed | Add implement-transition buffer rules |
| Long jump | Edited group split | U14 athletes needed more check-in support | Add youth-age flow adjustment |
| Communications | Edited tone and parent instructions | Draft was operationally correct but too terse | Add tone profiles by audience |
| Equipment | Edited radio allocation | One radio battery failed during test | Add charged/tested/assigned fields |
| Budget | Rejected one supplier recommendation | Local relationship made preferred supplier better | Add supplier preference / relationship field |
| Public update | Edited timing | Communications Lead wanted public post after final role confirmation | Add optional "role roster approval" gate for public posts |

## Start-Gate Performance

| Gate | Result | Note |
|---|---|---|
| Medical cover confirmed | Pass | Present before warm-up opened |
| Safeguarding lead confirmed | Pass | Present and briefed |
| Timing and backup confirmed | Pass | Electronic timing plus manual backup |
| Emergency access route clear | Pass | Gate access checked pre-event |
| Results verification assigned | Pass | Two-person verification used |
| Call-room lead assigned | Pass | Role card used |
| Final timetable approved | Pass | Approved before external comms |
| External communications approved | Pass | No unapproved sends |

## Incidents, Near-Misses, And Governance

| Category | Count | Detail | Governance result |
|---|---:|---|---|
| Safety incidents | 0 serious | One minor cramp handled by Medical Lead | Human-owned as required |
| Safeguarding incidents | 0 | None recorded | Gate held |
| Results corrections | 1 | Field result transcription error caught pre-publication | Two-person verification worked |
| Public-comms failures | 0 | No unapproved sends | Gate held |
| Forbidden action attempts | 0 | Copilot stayed recommend_only | Permission envelope held |
| Start-gate misses | 0 | None | Start-gate checklist worked |

## Four Pillars Rescore

| Pillar | Before sprint | Synthetic post-pilot | Evidence |
|---|---:|---:|---|
| Trusted Evals | 2 | 3 | Synthetic eval suite plus real-style pilot comparison and edge cases |
| Searchable Logs with Correlation IDs | 2 | 3 | Audit log used with correlation IDs and decision outcomes |
| Granular Rollback | 2 | 3 | Versioned templates, prompt/rules rollback register, v0.2 baseline retained |
| Human Review Queue | 3 | 3 | Review queue used for timetable, comms, safety, results, budget |
| **Four Pillars Maturity** | **2** | **3** | Minimum now 3 |

## HIDO Completion

Synthetic HIDO completion reached 9 / 9 core objects:

1. Event brief
2. Entries summary
3. Venue constraints
4. Role roster
5. Equipment inventory
6. Timetable
7. Communication draft
8. Incident / risk item
9. Results record

## Time Saved

| Activity | Previous estimate | Synthetic pilot actual | Net saving |
|---|---:|---:|---:|
| First planning pack | 6h 00m | 2h 10m including review | 3h 50m |
| Timetable first draft | 2h 30m | 1h 25m including review | 1h 05m |
| Equipment / venue readiness | 1h 45m | 50m including review | 55m |
| Communications drafts | 1h 30m | 55m including review | 35m |
| Post-event learning | 2h 00m | 50m including review | 1h 10m |

Estimated net saving across the event: **3h 35m to 5h**, depending on how much review time is counted as replacement versus quality control.

## Reusable Assets Approved

| Asset | Decision |
|---|---|
| v0.2 event brief | Standardize |
| Timetable rules module | Standardize with v0.3 edits |
| Start-gate checklist | Standardize |
| Role cards | Standardize with audience-specific scripts |
| Venue/event-control checklist | Standardize |
| Human Review Queue | Standardize |
| Audit log schema | Standardize |
| HIDO object list | Standardize |
| Post-event learning template | Standardize |

## Decision

**Decision:** Proceed to v0.3 and standardize the Competition Planning Copilot as the Operations Team's draft-only Track & Field planning workflow.

**Do not:** increase autonomy yet.

**Allow:** one second workflow in shadow mode only, because Four Pillars maturity reached 3 / 5 in this synthetic scenario and there were no governance failures.

## Recommended Second Workflow

**Selected candidate:** Post-event performance reporting.

Why this is better than sponsor activation or broad communications as the next step:

- It is close to the existing event workflow.
- It uses many of the same data objects and review gates.
- It strengthens the LEARN layer.
- It is lower-risk than external-facing communications or commercial workflows.
- It can produce a concrete output: athlete/team/event performance report drafts for human review.

## Required v0.3 Changes Before Next Real Use

1. Add implement-transition buffer rules for throws.
2. Add youth-age flow adjustment for U14/U16 events.
3. Add radio fields: charged, tested, assigned, backup.
4. Add audience tone profiles for coaches, parents, athletes, officials, volunteers, and public.
5. Add supplier preference and relationship field.
6. Add role-roster approval gate before public posts, if the event team wants it.
