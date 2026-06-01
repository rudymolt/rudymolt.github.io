# Pilot Evaluation Report: Competition Planning Copilot

**Firm:** Operations Team
**Workflow:** Track & Field athletics competition planning
**Synthetic event:** Aspire Invitational 9
**Evaluation type:** Synthetic shadow-mode pilot
**Date:** 2026-05-31

## Executive Summary

The synthetic shadow-mode pilot suggests the Competition Planning Copilot is useful as a **draft-only coordination and planning agent**. It should not be moved beyond `recommend_only`, but it is ready for a controlled real-world pilot on the next competition if Operations Team provides real entries, venue data, role owners, and approved templates.

The strongest value came from:

- Surfacing planning gaps early
- Creating the first planning pack quickly
- Producing a usable action tracker
- Flagging staffing and equipment gaps
- Drafting communications and briefings
- Capturing post-event learning in a reusable format

The main weakness was timetable realism for field events and entry-overlap logic.

## Scorecard

| Dimension | Score / 5 | Rationale |
|---|---:|---|
| Planning usefulness | 4 | Good first draft; clear gaps and owners. |
| Timetable usefulness | 3 | Directionally useful, but needed technical edits. |
| Operations usefulness | 4 | Venue, equipment, and staffing checklists were strong. |
| Communications usefulness | 3 | Drafts useful, but tone and publishing gates needed human polish. |
| Governance discipline | 5 | Correctly stayed draft-only and preserved human approvals. |
| Learning capture | 5 | Strong post-event review structure. |
| Overall pilot readiness | 4 | Ready for real shadow-mode pilot, not production automation. |

## Key Metrics

| Metric | Synthetic result | Interpretation |
|---|---:|---|
| Recommendations reviewed | 98 | Enough surface area to evaluate behavior. |
| Accepted without material change | 68 | Strong coordination usefulness. |
| Edited | 27 | Human judgment still required. |
| Rejected | 3 | Low rejection rate; most failures were bounded. |
| Human override rate | 31% | Baseline for future events. Should fall over time. |
| First planning pack time saved | 2h 55m net | Useful even after human review time. |
| Safety incidents caused by copilot | 0 | Synthetic only, but guardrails held. |
| Forbidden actions attempted by copilot | 0 | Stayed inside recommend_only envelope. |

## What The Copilot Got Right

1. It correctly identified the highest-risk planning gaps: entries, timing, medical cover, venue readiness, staffing, and equipment.
2. It recommended a timed-finals-first format, which matched the performance-first purpose better than a showcase-heavy format.
3. It made staffing gaps visible in a way the event lead could act on.
4. It separated draft communications from approved sending/publishing.
5. It created a clear post-event learning structure.

## What Humans Overrode

| Area | Override | Why it matters |
|---|---|---|
| Relay | Cancelled | Low entry count and staffing pressure made it poor value. |
| Sprint showcase/final | Removed | Timed finals better protected athlete recovery. |
| Long jump timing | Extended | Copilot underestimated reset and measurement time. |
| Public social post | Blocked | Public comms needed final timetable approval first. |
| Results workflow | Edited | Field sheet runner improved verification. |
| Throws control | Strengthened | Spectator boundary risk required more control. |

## Updated Requirements For Version 0.2

### Data Inputs

Add or improve these input fields in the event brief:

- Final entries by event, category, and athlete overlap
- Field-event attempts policy
- Estimated event duration formula by event type
- Equipment confirmation status: available / confirmed / tested / backup
- Venue emergency access route
- PA/Wi-Fi/power confidence
- Minimum thresholds for optional events such as relays or finals

### Agent Behavior

Update the agent to:

- Default to timed finals when event duration is compressed.
- Reject optional relays unless minimum entries, staffing, and timetable buffer are present.
- Add field-event duration estimates using entries x attempts x reset time.
- Flag public communications as blocked until final timetable approval.
- Produce "start gate" staffing warnings for medical, timing, results, call room, and safety control.

### Governance

Keep these restrictions:

- No sending or publishing.
- No final timetable approval.
- No eligibility/seeding decisions.
- No safety, safeguarding, medical, or incident decisions.
- No payment approvals.
- No source-of-truth edits.

## Reusable Assets Created

| Asset | Reuse decision |
|---|---|
| Structured event brief | Keep as standard intake. |
| Planning gap list | Make mandatory first output. |
| Action tracker | Keep and connect to real owners. |
| Timed-finals timetable pattern | Reuse for compressed invitational events. |
| Venue setup checklist | Convert to standard operations checklist. |
| Role roster draft | Reuse with criticality ranking. |
| Communications drafts | Reuse with human tone review. |
| Risk prompt table | Convert into live event control checklist. |
| Post-event learning template | Make standard closeout artifact. |
| Override taxonomy | Use across future pilots. |

## Decision

**Recommendation:** Proceed to a real shadow-mode pilot for the next Track & Field competition.

**Do not proceed to:** autonomous execution, automated sending, automated publishing, eligibility decisions, safety decisions, or payment approvals.

## Next Step

Build **Competition Planning Copilot v0.2** as a repeatable operating workflow:

1. Update the event brief template with the new fields above.
2. Add a timetable rules module for field-event duration and optional-event thresholds.
3. Create reusable role-card, venue-check, and event-control checklist templates.
4. Run one real event in shadow mode.
5. Compare human plan vs copilot plan using the shadow-review table.
6. Measure whether the human override rate falls from the synthetic baseline of 31%.
