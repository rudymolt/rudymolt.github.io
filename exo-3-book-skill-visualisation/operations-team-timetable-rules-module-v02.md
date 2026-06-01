# Timetable Rules Module v0.2

**Workflow:** Operations Team Track & Field competition planning
**Purpose:** Make timetable assumptions explicit before the copilot drafts event schedules.
**Status:** Draft rules for shadow-mode pilot

## Rule 1: Choose Event Proximity Mode

| Time before first event | Mode | Copilot behavior |
|---|---|---|
| 0-24 hours | Same-day rescue | Start gates, safety, staffing, and minimum viable timetable only. |
| 24-72 hours | 48-hour compression | Prioritize gaps, start gates, final timetable, communications, and equipment. |
| 4-10 days | 7-day sprint | Full planning pack plus procurement and role cards. |
| 11-45 days | 30-day build | Full workflow, supplier options, rehearsal, and comms cadence. |

## Rule 2: Default Timed Finals For Compressed Events

Use timed finals by default when:

- Event is within 7 days.
- Athlete-performance purpose is primary.
- Athlete count exceeds 120.
- Officials or call-room staffing has gaps.
- Venue operating window is 5 hours or less.

Do not recommend heats + finals unless:

- Final entries are low enough for recovery and schedule buffers.
- Call room and timing teams are fully staffed.
- Technical Lead approves recovery windows.
- Timetable still keeps at least 20 minutes of end-of-day buffer.

## Rule 3: Field-Event Duration Formula

For each field event:

```text
estimated_duration =
  setup_minutes
  + warmup_minutes
  + (entries * attempts * average_attempt_cycle_seconds / active_runways_or_circles / 60)
  + reset_buffer_minutes
```

Default values:

| Event type | Setup | Warm-up | Attempt cycle | Reset buffer | Notes |
|---|---:|---:|---:|---:|---|
| Long jump | 10m | 15m | 75s | 10m | Add raking delay for large groups. |
| Triple jump | 10m | 15m | 80s | 10m | Similar to long jump, more board setup. |
| High jump | 10m | 20m | 90s | 15m | Duration depends on bar progression. |
| Shot put | 10m | 15m | 70s | 10m | Add implement-weight transitions. |
| Discus | 15m | 20m | 100s | 15m | Sector control required. |
| Javelin | 15m | 20m | 110s | 15m | Sector control and runway reset. |

Attempts policy:

| Entries | Recommended attempts |
|---:|---:|
| 1-12 | 6 |
| 13-24 | 4 |
| 25+ | 3 or split into groups |

The copilot must show the formula result and may not compress field events without naming the tradeoff.

## Rule 4: Optional-Event Thresholds

### Relays

Recommend a relay only if all are true:

- At least 6 confirmed teams.
- At least 20 minutes clean timetable space.
- Starter/timing team confirms setup.
- Call-room team has no active critical gap.
- Relay does not delay results verification or event close.

If fewer than 6 teams are confirmed, default recommendation is reject or defer.

### Showcase Finals

Recommend a sprint showcase final only if all are true:

- Timed finals alone do not meet event purpose.
- Recovery window is at least 60 minutes from prior round.
- Call-room and timing teams are fully staffed.
- Final does not remove the end-of-day buffer.
- Technical Lead approves.

## Rule 5: Track Duration Defaults

| Event block | Default duration |
|---|---:|
| 100m heat | 4m per heat |
| 200m heat | 5m per heat |
| 400m heat | 6m per heat |
| 800m heat | 8m per heat |
| 1500m heat | 12m per heat |
| Hurdles heat | 7m per heat, plus setup block |
| 400m hurdles heat | 8m per heat, plus setup block |

Add:

- 10 minutes for hurdles setup/check.
- 5 minutes for category transition where hurdle height/spacing changes.
- 10-minute reset/water break in each 4-hour session.
- Minimum 20-minute end-of-day buffer.

## Rule 6: Athlete Overlap Check

The copilot must flag conflicts where the same athlete or likely athlete group appears in:

- 100m and 200m
- 200m and long/high jump
- 400m and 800m
- Hurdles and sprint blocks
- Field event and track event within 30 minutes

The copilot does not resolve eligibility or seeding. It flags conflicts for the Technical Lead.

## Rule 7: Results Publication Gate

No result or timetable output is publish-ready until:

- Entries / Results Coordinator verifies source data.
- Technical Lead approves timetable or results.
- Communications Lead approves message.
- Two-person results verification is complete for results.
