# Competition Planning Copilot v0.2

**Firm:** the Operations Team
**Workflow:** Track & Field athletics competition planning
**Version:** v0.2
**Built from:** Synthetic Aspire Invitational 9 shadow-mode review
**Status:** Ready for real shadow-mode pilot, not production automation

## Purpose

Competition Planning Copilot v0.2 is a draft-only planning workflow for Track & Field competitions. It turns a structured event brief, entries summary, venue readiness data, staffing data, equipment status, and approved rules into a planning pack for human review.

It remains `recommend_only`. It does not send, publish, approve, decide eligibility, make safety decisions, approve spend, or edit source-of-truth systems.

## v0.2 Upgrade Summary

| v0.1 gap | v0.2 fix |
|---|---|
| Field-event timings were too optimistic. | Added field-event duration formulas and attempts policy. |
| Optional relays/showcase finals were suggested too easily. | Added optional-event thresholds and rejection rules. |
| Venue readiness lacked operational depth. | Added PA, Wi-Fi, power, emergency access, gate, and confidence fields. |
| Staffing gaps were visible but not ranked by criticality. | Added start-gate roles and criticality ranking. |
| Public communications could appear too early. | Public comms are blocked until final timetable approval. |
| Same timeline used regardless of event proximity. | Added same-day, 48-hour, 7-day, and 30-day planning modes. |
| Briefing outline was useful but not actionable enough. | Added reusable one-page role-card templates. |
| Risk prompts were not yet live-control ready. | Added venue and event-control checklists. |

## Artifact Map

| Artifact | File |
|---|---|
| v0.2 agent contract | `operations-team-competition-planning-agent-spec-v02.md` |
| v0.2 event brief template | `operations-team-track-field-event-brief-template-v02.md` |
| Timetable rules module | `operations-team-timetable-rules-module-v02.md` |
| Role-card templates | `operations-team-role-cards-template-v02.md` |
| Venue and event-control checklists | `operations-team-venue-event-control-checklists-v02.md` |
| v0.2 synthetic eval | `operations-team-competition-planning-copilot-v02-synthetic-eval.md` |
| v0.1 synthetic evaluation baseline | `operations-team-aspire-invitational-9-pilot-evaluation-report.md` |

## Run Sequence

1. Complete `operations-team-track-field-event-brief-template-v02.md`.
2. Confirm the data manifest still covers every source used.
3. Run the copilot prompt from the v0.2 event brief.
4. Apply `operations-team-timetable-rules-module-v02.md` before drafting timetable options.
5. Produce the planning pack.
6. Human leads review the pack against the start gates.
7. Run the event or synthetic event in shadow mode.
8. Complete the review table.
9. Compare override rate against the v0.1 synthetic baseline of **31%**.

## Required Inputs

- Event identity and purpose
- Entry counts by event, category, and likely athlete overlap
- Field-event attempts policy
- Venue readiness, including emergency access and PA/Wi-Fi/power confidence
- Staffing roster by required / confirmed / gap
- Equipment status by available / confirmed / tested / backup
- Optional-event thresholds
- Communications approval gates
- Human approvers

## Required Outputs

The copilot must produce:

1. Planning gap list
2. Event proximity mode
3. Start-gate checklist
4. Master timeline
5. Action tracker
6. Timetable options with duration logic shown
7. Optional-event decisions
8. Equipment checklist
9. Venue readiness checklist
10. Officials and volunteer roster with criticality
11. Role cards
12. Event-control checklist
13. Communications calendar and draft messages
14. Risk and contingency prompts
15. Budget and procurement draft
16. Post-event learning template
17. Shadow-mode review table

## Start Gates

The copilot must label the event **not ready to start** if any of these are missing:

| Gate | Required human owner |
|---|---|
| Medical cover confirmed | Medical Lead |
| Safeguarding lead confirmed | Safeguarding Lead |
| Timing method and backup confirmed | Technical Lead |
| Venue emergency access route clear | Operations Lead |
| Results verification process assigned | Results Lead |
| Call-room / athlete-flow lead assigned | Technical Lead |
| Final timetable approved | Technical Lead |
| External communications approved | Communications Lead |

## Copilot Prompt

```text
You are the Operations Team's Competition Planning Copilot v0.2 for Track & Field competition planning.

Operate in recommend_only mode.

Use the completed v0.2 structured event brief, the timetable rules module, the role-card templates, and the venue/event-control checklist templates.

Rules:
- Do not send, publish, approve, or finalize anything.
- Do not decide eligibility, seeding, safety, safeguarding, medical, payment, or incident matters.
- Do not invent missing information.
- Treat unknown values as planning gaps.
- Block public communications until final timetable approval is present.
- Reject optional relays/showcase finals unless the optional-event thresholds are met.
- Show timetable duration assumptions for track, field, hurdles, relays, and buffers.
- Label start-gate failures explicitly.
- For every output, include assumptions, source fields used, confidence level, and required human approver.

Produce the full v0.2 planning pack.
```

## Success Metrics

| Metric | v0.1 synthetic baseline | v0.2 target |
|---|---:|---:|
| Human override rate | 31% | <25% |
| Public-comms gate failures | 1 | 0 |
| Optional-event rejections after human review | 2 | 0 |
| Field-event timing edits | 1 major | 0 major |
| Start-gate misses | Not explicit | 0 |
| Planning pack net time saved | 2h 55m | 3h+ |

## Current Decision

v0.2 is ready to test on a real or synthetic competition in shadow mode. It is not approved for autonomous execution.
