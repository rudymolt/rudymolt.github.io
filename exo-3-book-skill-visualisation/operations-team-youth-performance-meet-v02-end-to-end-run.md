# v0.2 End-To-End Synthetic Run: the Operations Team Youth Performance Meet

**Copilot:** Competition Planning Copilot v0.2
**Input brief:** `operations-team-youth-performance-meet-v02-brief.md`
**Rules module:** `operations-team-timetable-rules-module-v02.md`
**Role cards:** `operations-team-role-cards-template-v02.md`
**Venue/event control:** `operations-team-venue-event-control-checklists-v02.md`
**Generated:** 2026-05-31
**Status:** Synthetic only

## 1. v0.2 Planning Pack

### Event Proximity Mode

**Mode:** 30-day build.
**Reason:** Event is 19 days away. The copilot should produce the full planning pack, not just a rescue checklist.

### Start-Gate Status

| Gate | Status | Owner | Note |
|---|---|---|---|
| Medical cover confirmed | Pass | Medical Lead | 2 confirmed |
| Safeguarding lead confirmed | Pass | Safety / Medical Lead | 1 confirmed |
| Timing and backup confirmed | Pass | Technical Lead | Electronic + manual backup |
| Emergency access route confirmed | Pass | Operations Lead | Gate C clear |
| Results verification assigned | Pass | Results Lead | 3 confirmed |
| Call-room lead assigned | Pass | Technical Lead | 4 confirmed |
| Final timetable approved | Fail until human sign-off | Technical Lead | Draft only |
| External communications approved | Fail until human sign-off | Communications Lead | Draft only |

**Copilot decision:** Event is operationally plausible, but **not publish-ready** until final timetable and communications approvals are recorded.

### Planning Gap List

| Priority | Gap | Owner | Due | Confidence |
|---:|---|---|---|---:|
| 1 | Approve final timetable. | Technical Lead | 17 June | High |
| 2 | Approve external communications after timetable approval. | Communications Lead | 17 June | High |
| 3 | Confirm remaining technical official and field official. | Technical Lead / Field Lead | 14 June | High |
| 4 | Confirm U14 shot weights and throws implement availability. | Field Lead | 16 June | High |
| 5 | Test PA, timing, hotspot, radios, wind gauge, and power. | Operations / Technical | 18 June | High |
| 6 | Print signage, bibs, and role cards. | Communications / Results | 17 June | Medium |
| 7 | Confirm coach drop-off map. | Operations Lead | 17 June | Medium |

### Timetable Logic

The v0.2 rules recommend **timed finals** because athlete performance and low waiting time are the primary goals.

Relay threshold check:

| Rule | Status |
|---|---|
| At least 6 confirmed relay teams | Pass: 7 teams |
| At least 20 minutes clean buffer | Pass if relay starts by 20:15 |
| Full call-room staffing | Pass |
| Does not delay close or results | Conditional |

**Copilot recommendation:** Include relay as optional, but automatically cancel if the event is more than 10 minutes behind schedule by 19:45.

### Field-Event Duration Check

Long jump has 28 entries. v0.2 rule says 25+ entries should use 3 attempts or split groups.

```text
Long jump estimated duration per group:
10m setup + 15m warm-up + (14 entries * 3 attempts * 75s / 60) + 10m buffer
= 87.5 minutes per group
```

**Recommendation:** Run long jump as two groups of 14, each capped at 3 attempts. Do not run all 28 in a single group.

Shot put has 18 entries:

```text
10m setup + 15m warm-up + (18 entries * 4 attempts * 70s / 60) + 10m buffer
= 119 minutes
```

**Recommendation:** Either split by implement category or run with strict group flow. Discus should not overlap with shot put if the same athletes overlap.

### Draft Timetable

| Time | Track | Field | Control note |
|---|---|---|---|
| 15:00 | Venue opens | Setup starts | Start-gate checks begin |
| 15:45 | Check-in opens | Field equipment test | Results/admin live |
| 16:35 | Officials briefing | Field event briefings | Role cards issued |
| 16:50 | Technical welcome | Athletes to warm-up/call room | PA test complete |
| 17:00 | Hurdles timed finals | Long jump group A starts | Hurdle spacing chart required |
| 17:35 | 100m timed finals | Long jump group A continues | Seed fastest later |
| 18:25 | 400m timed finals | High jump starts | Watch high-jump/200m overlap |
| 18:45 | 10-minute hydration reset | Long jump group A closeout | Medical check |
| 19:00 | 800m timed finals | Shot put starts | Separate 400m/800m athletes where possible |
| 19:35 | 1500m timed finals | Long jump group B starts | Distance block |
| 20:00 | 200m timed finals | Shot put continues | Watch high-jump overlap |
| 20:15 | Optional 4x100m relay | Field closeout | Cancel if >10m behind |
| 20:35 | Buffer / results verification | Results verification | Protect publication accuracy |
| 21:00 | Target close | Debrief and tear-down | No new events after 20:35 |

### Action Tracker

| ID | Task | Owner | Due | Status |
|---|---|---|---|---|
| YPM-001 | Approve final timetable. | Technical Lead | 17 June | Open |
| YPM-002 | Approve coaches/teams message. | Communications Lead | 17 June | Blocked by timetable approval |
| YPM-003 | Confirm one technical official. | Technical Lead | 14 June | Open |
| YPM-004 | Confirm one field official. | Field Lead | 14 June | Open |
| YPM-005 | Confirm U14 implement weights. | Field Lead | 16 June | Open |
| YPM-006 | Test timing and backup process. | Technical Lead | 18 June | Scheduled |
| YPM-007 | Test PA and hotspot. | Operations Lead | 18 June | Scheduled |
| YPM-008 | Print role cards and signage. | Communications Lead | 17 June | Open |
| YPM-009 | Confirm coach drop-off map. | Operations Lead | 17 June | Open |
| YPM-010 | Prepare post-event review sheet. | Event Lead | 19 June | Drafted |

### Critical Role Cards To Generate

1. Competition Director
2. Technical Lead
3. Call Room / Athlete Flow Lead
4. Results Lead
5. Field Event Lead
6. Medical Lead
7. Safeguarding Lead
8. Communications Lead

### Draft Communications Gate

| Communication | Status |
|---|---|
| Coaches/teams note | Draftable but blocked until final timetable approval |
| Athletes/parents note | Draftable but blocked until final timetable approval |
| Officials briefing | Draftable after role roster approval |
| Volunteers briefing | Draftable after role roster approval |
| Public/social post | Blocked until final timetable and public publish approval |
| Results publication | Blocked until two-person verification |

## 2. Synthetic Event Reality

| Metric | Synthetic outcome |
|---|---:|
| Athletes checked in | 129 |
| Teams represented | 10 |
| Event starts | 181 |
| Spectators | 155 |
| Officials/volunteers present | 39 |
| First event start | 17:03 |
| Target finish | 21:00 |
| Actual finish | 20:58 |
| Medical incidents | 0 serious, 1 minor cramp |
| Safeguarding incidents | 0 |
| Results corrections before publication | 1 |

### Synthetic Run Notes

| Time | Observation | Human action |
|---|---|---|
| 15:45 | Check-in opened on time. | No action. |
| 16:40 | One technical official arrived late. | Competition Director reassigned spare field official temporarily. |
| 17:03 | Hurdles started 3 minutes late. | Within tolerance. |
| 17:50 | Long jump group A moving slower than formula by 6 minutes. | Field Lead shortened non-competition reset time. |
| 18:45 | Hydration reset held. | Medical Lead approved continuation. |
| 19:20 | Shot put implement transition took longer than expected. | Field Lead moved discus warm-up later by 8 minutes. |
| 19:50 | Event 7 minutes behind schedule. | Relay retained because buffer still above 20 minutes. |
| 20:16 | Relay started 1 minute late. | Technical Lead approved. |
| 20:45 | Results verification found one field transcription error. | Results Lead corrected before publication. |
| 20:58 | Event closed 2 minutes early. | Debrief started. |

## 3. Shadow-Mode Review

| Output | Accepted | Edited | Rejected | Override reason | Learning |
|---|---:|---:|---:|---|---|
| Event proximity mode | Yes | No | No | None | 30-day build was right. |
| Start-gate checklist | Yes | No | No | None | Strong improvement over v0.1. |
| Planning gap list | Yes | Minor | No | Due dates adjusted around local availability. | Keep. |
| Timetable option | Yes | Minor | No | Shot/discus transition needed more space. | Add implement-transition buffer by category. |
| Relay decision | Yes | No | No | None | Threshold logic worked. |
| Field duration logic | Yes | Minor | No | Long jump estimate was close; shot put needed transition nuance. | Add implement-change buffer. |
| Equipment checklist | Yes | Minor | No | Add "charged" status for radios. | Add charged/tested field. |
| Venue checklist | Yes | No | No | None | Gate C route check useful. |
| Role cards | Yes | Minor | No | Call-room card needed clearer late-athlete script. | Add scripts for common edge cases. |
| Communications gates | Yes | No | No | None | Public-comms block worked. |
| Risk/event-control checklist | Yes | Minor | No | Add check for parent/spectator crossing near long jump. | Add spectator flow prompt. |
| Budget/procurement | Partial | Yes | No | Synthetic supplier prices not used. | Needs real supplier table for actual event. |
| Post-event learning | Yes | No | No | None | Keep as standard closeout. |

## 4. v0.2 Recommendation Metrics

| Recommendation class | Accepted | Edited | Rejected | Total |
|---|---:|---:|---:|---:|
| Event proximity / start gates | 12 | 0 | 0 | 12 |
| Planning gaps / action tracker | 14 | 2 | 0 | 16 |
| Timetable / field logic | 16 | 5 | 0 | 21 |
| Optional-event decisions | 4 | 0 | 0 | 4 |
| Equipment / venue | 15 | 3 | 0 | 18 |
| Role cards / staffing | 10 | 2 | 0 | 12 |
| Communications gates | 8 | 0 | 0 | 8 |
| Event-control / risks | 9 | 2 | 0 | 11 |
| Budget / procurement | 3 | 2 | 0 | 5 |
| Learning / closeout | 7 | 0 | 0 | 7 |
| **Total** | **98** | **16** | **0** | **114** |

**Human override rate:** 16 / 114 = **14%**.

## 5. Evaluation Against v0.1 Baseline

| Metric | v0.1 synthetic baseline | v0.2 synthetic run | Result |
|---|---:|---:|---|
| Human override rate | 31% | 14% | Improved |
| Target override rate | <25% | 14% | Passed |
| Public-comms gate failures | 1 | 0 | Passed |
| Optional-event rejections after human review | 2 | 0 | Passed |
| Field-event timing edits | 1 major | 2 minor | Improved |
| Start-gate misses | Not explicit | 0 | Passed |
| Actual finish vs target | N/A | 2 minutes early | Passed |

## 6. v0.2 Lessons

1. Start gates materially improved readiness discipline.
2. Optional relay threshold prevented unnecessary human rejection while still allowing relay when viable.
3. Field-event duration formula improved timetable realism.
4. Shot/discus implement transitions need a specific buffer rule.
5. Communications gate logic worked cleanly.
6. Role cards should include scripts for late athletes, missing bibs, and spectator boundary issues.
7. Budget/procurement remains weak without a real supplier table.

## 7. Recommended v0.3 Changes

Do not expand autonomy. Improve precision:

- Add implement-transition buffer rules for throws.
- Add radio "charged/tested/assigned" fields.
- Add spectator-flow prompts around long jump and throws.
- Add role-card scripts for common operational edge cases.
- Add a supplier table template for timing, medical, printing, water/ice, and equipment.

## Decision

v0.2 passes the synthetic fresh-event run and is ready for a real shadow-mode pilot.

It should remain `recommend_only`.
