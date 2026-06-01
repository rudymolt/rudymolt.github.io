# Structured Event Brief Template v0.2

**Use case:** Input for Operations Team Competition Planning Copilot v0.2
**Workflow:** Track & Field athletics competition planning
**Status:** Blank operational template with synthetic examples

## Instruction

Fill this brief before running the copilot. Unknown values must be written as `UNKNOWN`, not guessed. The copilot treats `UNKNOWN` as a planning gap.

## 1. Event Identity

| Field | Value |
|---|---|
| Event name | UNKNOWN |
| Event type | Invitational / school meet / club meet / championship / other |
| Event date(s) | UNKNOWN |
| Time before first event | UNKNOWN |
| Venue | UNKNOWN |
| City / country | UNKNOWN |
| Event owner | UNKNOWN |
| Technical lead | UNKNOWN |
| Operations lead | UNKNOWN |
| Entries / results lead | UNKNOWN |
| Communications lead | UNKNOWN |
| Safety / safeguarding / medical lead | UNKNOWN |

## 2. Purpose And Decision Priorities

| Field | Value |
|---|---|
| Primary purpose | UNKNOWN |
| Secondary purpose | UNKNOWN |
| Success criteria | UNKNOWN |
| Non-negotiable constraints | Athlete safety; medical cover; safeguarding cover; final timetable human-approved; no external communications without approval |
| Known tradeoffs | UNKNOWN |

## 3. Entries Summary

| Field | Value |
|---|---|
| Expected athletes | UNKNOWN |
| Confirmed athletes | UNKNOWN |
| Total event starts | UNKNOWN |
| Teams / schools / clubs | UNKNOWN |
| Spectators expected | UNKNOWN |
| Entry source of truth | UNKNOWN |
| Entry data owner | UNKNOWN |
| Final entries deadline | UNKNOWN |

### Event Counts

| Event | Age/category | Gender/category | Entries | Likely athlete overlaps | Notes |
|---|---|---|---:|---|---|
| 100m | Example: U18/Open | Example: F/M | 0 | Example: 200m, long jump | Synthetic example only |

## 4. Timetable Policy

| Field | Value |
|---|---|
| Desired format | Timed finals / heats + finals / mixed / UNKNOWN |
| Event proximity mode | Same-day / 48-hour / 7-day / 30-day / UNKNOWN |
| Earliest first event | UNKNOWN |
| Latest final event | UNKNOWN |
| Required breaks | UNKNOWN |
| Minimum end-of-day buffer | 20 minutes |
| Recovery rule | Minimum 45-60 minutes between sprint rounds where possible |
| Field-event attempts policy | Use v0.2 rules unless Technical Lead overrides |
| Optional relay threshold | At least 6 confirmed teams plus staffing and 20-minute buffer |
| Showcase final threshold | Recovery, staffing, timing, buffer, and Technical Lead approval required |

## 5. Venue Readiness

| Area | Status | Confidence | Owner | Notes |
|---|---|---|---|---|
| Track lanes | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Field areas | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Warm-up area | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Call room | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Results/admin area | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| PA | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Wi-Fi | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Power | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Toilets/changing | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Medical point | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Emergency access route | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Gate/security control | UNKNOWN | Low / Medium / High | UNKNOWN |  |
| Parking/drop-off | UNKNOWN | Low / Medium / High | UNKNOWN |  |

## 6. Staffing

| Role | Required | Confirmed | Criticality | Owner | Notes |
|---|---:|---:|---|---|---|
| Competition director | 1 | 0 | Start gate | UNKNOWN |  |
| Medical support | 2 | 0 | Start gate | UNKNOWN |  |
| Safeguarding | 1 | 0 | Start gate | UNKNOWN |  |
| Timing / backup timing | 4 | 0 | Start gate | UNKNOWN |  |
| Call room / athlete flow | 4 | 0 | Start gate | UNKNOWN |  |
| Results/admin | 3 | 0 | Start gate | UNKNOWN |  |
| Technical officials | 8 | 0 | Critical | UNKNOWN |  |
| Field event officials | 10 | 0 | Critical | UNKNOWN |  |
| Equipment/setup crew | 4 | 0 | Important | UNKNOWN |  |
| Communications/announcer | 2 | 0 | Important | UNKNOWN |  |

## 7. Equipment

| Item | Needed | Available | Confirmed | Tested | Backup | Owner | Notes |
|---|---|---|---|---|---|---|---|
| Timing system | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Starting equipment | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Hurdles | If hurdles included | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Long jump equipment | If jumps included | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| High jump equipment | If high jump included | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Throws implements | If throws included | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Measuring equipment | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Wind gauge | For sprints/jumps | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Bibs/numbers | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Radios/comms | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| Signage | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |
| First-aid supplies | Yes | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN |  |

## 8. Communications Gates

| Communication | Draft owner | Approval owner | Gate |
|---|---|---|---|
| Coaches/teams operational note | Communications Lead | Communications Lead + Technical Lead | Final timetable approved |
| Athletes/parents note | Communications Lead | Communications Lead | Final timetable approved |
| Officials briefing | Technical Lead | Technical Lead | Role roster approved |
| Volunteers briefing | Operations Lead | Operations Lead | Role roster approved |
| Public/social post | Communications Lead | Communications Lead + Competition Director | Final timetable approved and public publish approved |
| Results publication | Results Lead | Results Lead + Technical Lead + Communications Lead | Two-person results verification complete |

## 9. Machine-Readable YAML

```yaml
event_identity:
  event_name: UNKNOWN
  event_type: UNKNOWN
  event_dates: UNKNOWN
  time_before_first_event: UNKNOWN
  venue: UNKNOWN
  city_country: UNKNOWN
  event_owner: UNKNOWN
  technical_lead: UNKNOWN
  operations_lead: UNKNOWN
  entries_results_lead: UNKNOWN
  communications_lead: UNKNOWN
  safety_safeguarding_medical_lead: UNKNOWN

purpose:
  primary_purpose: UNKNOWN
  success_criteria: []
  non_negotiable_constraints:
    - athlete_safety
    - medical_cover
    - safeguarding_cover
    - final_timetable_human_approved
    - no_external_communications_without_approval

entries:
  expected_athletes: UNKNOWN
  confirmed_athletes: UNKNOWN
  total_event_starts: UNKNOWN
  teams_count: UNKNOWN
  source_of_truth: UNKNOWN
  event_counts:
    - event: UNKNOWN
      category: UNKNOWN
      entries: UNKNOWN
      likely_overlaps: []

timetable_policy:
  desired_format: UNKNOWN
  event_proximity_mode: UNKNOWN
  earliest_first_event: UNKNOWN
  latest_final_event: UNKNOWN
  minimum_end_of_day_buffer_minutes: 20
  field_attempts_policy: use_v02_rules_unless_overridden
  optional_relay_threshold:
    min_confirmed_teams: 6
    min_clean_buffer_minutes: 20
    requires_full_call_room_staffing: true
  public_comms_blocked_until_final_timetable_approval: true

start_gates:
  medical_cover_confirmed: false
  safeguarding_lead_confirmed: false
  timing_and_backup_confirmed: false
  emergency_access_route_confirmed: false
  results_verification_assigned: false
  call_room_lead_assigned: false
  final_timetable_approved: false
  external_communications_approved: false
```

## v0.2 Copilot Instruction

```text
Generate the v0.2 planning pack.

Use:
- This event brief
- operations-team-timetable-rules-module-v02.md
- operations-team-role-cards-template-v02.md
- operations-team-venue-event-control-checklists-v02.md

Stay recommend_only.
Show every start-gate pass/fail.
Show timetable duration assumptions.
Reject optional relays/finals unless thresholds are met.
Block public communications until final timetable approval.
```
