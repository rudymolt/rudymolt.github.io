# Post-Pilot Standardization And Expansion Decision

**Firm:** the Operations Team
**Source report:** `operations-team-synthetic-real-pilot-evaluation-report.md`
**Decision date:** 2026-05-31
**Status:** Synthetic decision based on synthetic real-pilot report

## Decision Summary

the Operations Team should standardize the Competition Planning Copilot as a draft-only workflow and build v0.3.

the Operations Team may also start **one second workflow in shadow mode only**: Post-event performance reporting.

No autonomy increase is approved.

## Gate Review

| Gate | Status | Decision |
|---|---|---|
| Real-style pilot completed without safety/governance incident | Pass | Continue |
| Planning pack saved meaningful time after review | Pass | Continue |
| Override taxonomy produced useful learning | Pass | Continue |
| Team operating rhythm sustained | Pass | Continue |
| Reusable templates adopted | Pass | Standardize |
| Four Pillars maturity at least 3 | Pass in synthetic scenario | New shadow workflow allowed |
| HIDO complete for core objects | Pass in synthetic scenario | New shadow workflow allowed |
| Kill switch and rollback tested | Partial | Do not increase autonomy |

## Standardize These Assets

| Asset | Standard version |
|---|---|
| Competition Planning Copilot | v0.3 after updates |
| Event brief | v0.2 template, with v0.3 additions |
| Timetable rules | v0.3 |
| Role cards | v0.3 |
| Venue/event-control checklist | v0.2 accepted |
| Human Review Queue | v1 |
| Audit Log | v1 |
| HIDO pack | v1 |
| Post-event learning template | v1 |

## v0.3 Backlog

| Priority | Change | Reason |
|---:|---|---|
| 1 | Add implement-transition buffer rules for throws. | Shot/discus transitions still required human edits. |
| 2 | Add youth-age flow adjustment. | Younger athletes need more call-room and check-in support. |
| 3 | Add radio charged/tested/assigned/backup fields. | Radio readiness caused operational risk. |
| 4 | Add audience tone profiles. | Communications drafts were correct but too terse. |
| 5 | Add supplier preference / relationship field. | Budget/procurement suggestions missed local context. |
| 6 | Add optional role-roster approval gate before public posts. | Public comms may need staffing certainty, not only timetable approval. |

## Second Workflow: Post-Event Performance Reporting

### Scope

The Post-Event Performance Reporting Copilot drafts structured reports after a Track & Field event. It remains `recommend_only`.

### Draft outputs

- Event performance summary
- Athlete/team result summaries
- Personal-best and season-best highlights
- Participation and event-flow metrics
- Delay and operations metrics
- Lessons learned
- Coach/team follow-up draft
- Internal improvement backlog

### Forbidden actions

- No public publishing
- No athlete ranking publication without human approval
- No medical/safeguarding references
- No eligibility decisions
- No results certification
- No external sending

### Why this workflow is a good next candidate

It uses existing event data and strengthens the LEARN layer. It is close to the competition-planning workflow, so the Operations Team gets compounding value without opening a high-risk new domain.

## Next Artifacts To Build

1. `operations-team-competition-planning-copilot-v03-backlog.md`
2. `operations-team-post-event-performance-reporting-task-decomposition.md`
3. `operations-team-post-event-performance-reporting-data-manifest.md`
4. `operations-team-post-event-performance-reporting-agent-spec.md`

## Final Decision

Proceed with v0.3 precision improvements and start the second workflow in shadow mode.

Do not increase autonomy beyond `recommend_only`.
