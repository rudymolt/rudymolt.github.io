# Workflow Data Manifest: Post-Event Performance Reporting

**Firm:** Operations Team
**Workflow:** Post-event Track & Field performance reporting
**Agent:** Post-Event Performance Reporting Copilot
**Mode:** Shadow mode only
**Version:** v0.1 draft
**Date drafted:** 2026-05-31

## Workflow Identification

| Field | Value |
|---|---|
| Workflow name | Post-Event Performance Reporting |
| Workflow owner | TBD: Event Lead / Results Lead |
| Data steward | TBD |
| Communications approver | TBD |
| Safety / safeguarding approver | TBD |
| Manifest version | v0.1 draft |
| Date approved | Not yet approved |

## Workflow Scope

This workflow drafts post-event performance and operations reports after a Track & Field competition. It uses verified event data and approved operational notes to produce draft summaries, metrics, learning logs, and follow-up communications for human review.

The workflow does not certify results, decide athlete eligibility, publish rankings, send messages, make medical/safeguarding statements, or expose sensitive personal data.

## Data Sources Table

| # | Source | Purpose | Access | Sensitivity tier | Retention in copilot memory | Named data owner |
|---:|---|---|---|---|---|---|
| 1 | Verified results dataset | Produce results summaries, event metrics, team summaries, and performance report drafts. | read | confidential | Retain in event workspace until report closeout, then archive per policy. | Results Lead |
| 2 | Start lists / entry summary | Compare entries to actual participation and identify DNS/DNF/participation rates. | read | confidential | Retain event-relevant fields only. | Entries / Results Lead |
| 3 | Planned timetable | Compare planned vs actual event flow and delays. | read | internal | Retain with event report pack. | Technical Lead |
| 4 | Actual event timing log | Calculate timetable drift, delay causes, and flow metrics. | read | internal | Retain with event report pack. | Event Lead |
| 5 | Operations issue log | Produce operational lessons and improvement backlog. | read | internal / confidential | Retain sanitized issues only in reusable learning. | Operations Lead |
| 6 | Feedback survey responses | Summarize athlete, coach, official, and volunteer feedback. | read | confidential | Retain aggregated outputs; avoid retaining unnecessary free-text personal data. | Event Lead |
| 7 | Incident / risk summary | Include sanitized operational risk learnings. | read | restricted | Do not retain raw incident details; only approved sanitized lessons. | Safety / Medical / Safeguarding Lead |
| 8 | Approved communication templates | Draft follow-up notes and report cover messages. | read | internal | Retain approved templates only. | Communications Lead |
| 9 | Historical performance baseline | Identify PB/SB candidates where approved baseline exists. | read | confidential | Retain derived flags only; do not copy broad history. | Performance / Results Lead |
| 10 | Event media / photo list | Suggest non-sensitive report visuals or captions. | read | internal / confidential | Retain selected approved media references only. | Communications Lead |
| 11 | Audit log | Record recommendations, sources, confidence, human decisions, and override reasons. | read_write | internal | Retain with event report pack. | Data Steward |

## Explicitly Excluded Data

The copilot does not need:

- Raw medical records
- Safeguarding case files
- Private coach/parent messages
- Athlete home addresses
- Payment or bank details
- Full date-of-birth data unless explicitly required and approved
- Unapproved photos or media involving minors
- Disciplinary records
- Any data used only "for analytics" without a workflow-specific purpose

## Permission Envelope Mapping

| Agent | Permission Envelope | Autonomy Tier | Escalation rule |
|---|---|---|---|
| Post-Event Performance Reporting Copilot | May read approved post-event sources and write drafts to the reporting workspace. No send, publish, certify, rank publicly, or reference sensitive incidents. | recommend_only | Escalate result disputes, privacy concerns, medical/safeguarding content, public rankings, or low-confidence highlights. |

## Credential And Identity Plan

- [ ] Workflow identity scoped to reporting workspace only.
- [ ] No broad email/shared-drive access.
- [ ] No source-of-truth results edits.
- [ ] Write access only to draft report workspace and audit log.
- [ ] Per-action logging with correlation IDs.
- [ ] Human review required before any external use.

## Source-Of-Truth Statement

- Verified results system/spreadsheet remains the source of truth for results.
- Human-certified results override copilot summaries.
- The copilot report is not a second source of truth.
- Any discrepancy must be escalated to the Results Lead.

Signed by Results Lead: _____________________________________

## HIDO Cross-Reference

Complete HIDO Six Questions for:

1. Verified result record
2. Start-list record
3. Timetable record
4. Event timing log item
5. Operations issue log item
6. Feedback response
7. Incident / risk summary
8. Communication draft
9. Historical performance baseline record
10. Media/photo reference

## Access-Vs-Training Statement

- The copilot may retrieve approved data at runtime for this workflow.
- The copilot does not train on Operations Team data by default.
- No report, result, feedback, or athlete data may be used for model training without separate written approval.
- Reusable learning must be de-identified and approved.

## Review Cadence

- First review: after first shadow-mode report pack.
- Subsequent reviews: after every competition report cycle for the first three events, then quarterly.
- Immediate review if a new data source, public publishing use case, or historical performance baseline is added.

## Build Gate

Do not use real event data until:

1. Results Lead approves the data source.
2. Safety / safeguarding owner approves incident-summary handling.
3. Communications Lead approves external-use gates.
4. Audit log is ready.
5. HIDO is complete for result record, communication draft, and feedback response at minimum.
