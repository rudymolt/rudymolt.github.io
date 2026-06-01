# Task Decomposition Matrix: Post-Event Performance Reporting

**Firm:** Operations Team
**Function under analysis:** Post-event Track & Field performance reporting
**Date:** 2026-05-31
**Owner:** TBD: Event Lead / Results Lead
**Mode:** Shadow mode only

## Scope

This workflow begins after a Track & Field competition has finished and verified results are available. Its purpose is to turn verified event data, timing/operations logs, feedback, and approved notes into draft reports for human review.

It does **not** certify results, publish rankings, send communications, reference medical/safeguarding details, or make athlete decisions.

## Matrix

| Role | Task | Category | Agent Readiness | Disposition | Notes |
|---|---|---:|---:|---|---|
| Event Lead | Define report purpose and audiences | J | 2 | stay_human | Agent can suggest, leadership owns purpose. |
| Event Lead | Approve final internal report | J | 1 | stay_human | Human-owned. |
| Event Lead | Approve external narrative | J | 2 | stay_human | Human-owned reputation decision. |
| Event Lead | Review improvement backlog | J | 2 | stay_human | Agent drafts; human prioritizes. |
| Results Lead | Export verified results dataset | C | 3 | pilot_step_5 | Agent can check completeness after export. |
| Results Lead | Identify result corrections and dispute status | P | 3 | pilot_step_5 | Agent flags; human confirms. |
| Results Lead | Certify results as final | J | 1 | stay_human | Never delegated. |
| Results Lead | Create results summary table | P | 4 | agent_now | Strong draft task. |
| Results Lead | Flag missing, duplicate, or inconsistent records | P | 4 | agent_now | Good validation support. |
| Performance Analyst | Calculate participation metrics | P | 5 | agent_now | Low-risk if source data is verified. |
| Performance Analyst | Calculate event starts by category/team/event | P | 5 | agent_now | Useful structured reporting. |
| Performance Analyst | Identify PB/SB candidate highlights | P | 3 | pilot_step_5 | Needs historical baseline quality. |
| Performance Analyst | Draft athlete/team result summaries | Cr | 4 | agent_now | Human review before sharing. |
| Performance Analyst | Draft event performance summary | Cr | 4 | agent_now | Strong draft output. |
| Performance Analyst | Detect unusual performance/result patterns | P | 3 | pilot_step_5 | Human checks false positives. |
| Operations Lead | Summarize timetable drift | P | 4 | agent_now | Uses planned vs actual timetable. |
| Operations Lead | Summarize call-room, equipment, venue issues | P | 4 | agent_now | Good structured synthesis. |
| Operations Lead | Convert issues into improvement backlog | P | 4 | agent_now | Human prioritizes. |
| Operations Lead | Approve operational lessons | J | 2 | stay_human | Human owns final lessons. |
| Safety / Medical / Safeguarding Lead | Produce sanitized safety learning summary | J | 2 | stay_human | Sensitive; human-owned. |
| Safety / Medical / Safeguarding Lead | Remove medical/safeguarding references from report | P | 3 | pilot_step_5 | Agent assists redaction; human approves. |
| Safety / Medical / Safeguarding Lead | Approve any safety wording | J | 1 | stay_human | Human-owned. |
| Communications Lead | Draft coach/team follow-up message | Cr | 4 | agent_now | Draft only. |
| Communications Lead | Draft public event recap | Cr | 3 | pilot_step_5 | Blocked until approvals. |
| Communications Lead | Adapt tone by audience | Cr | 4 | agent_now | Human reviews tone. |
| Communications Lead | Send or publish report/recap | C | 1 | stay_human | No autonomous sending/publishing. |
| Coach Liaison | Identify team-specific follow-up points | J | 2 | stay_human | Relationship judgment. |
| Coach Liaison | Draft team-level follow-up notes | Cr | 3 | pilot_step_5 | Human reviews. |
| Coach Liaison | Decide which insights to share with coaches | J | 2 | stay_human | Human-owned. |
| Data Steward | Apply privacy and minimization checks | P | 3 | pilot_step_5 | Agent assists; data owner approves. |
| Data Steward | Verify data source list and provenance | P | 3 | pilot_step_5 | Needs human confirmation. |
| Data Steward | Create report audit log | C | 4 | agent_now | Correlation IDs and source fields. |
| Data Steward | Archive report pack and reusable learning | C | 4 | agent_now | Good repeatable task. |
| Post-Event Reporting Copilot | Generate draft report pack | Cr | 4 | agent_now | Draft-only and approval-gated. |
| Post-Event Reporting Copilot | Capture accepted/edited/rejected review outcomes | C | 5 | agent_now | Core LEARN-layer task. |

## Summary Counts

| Disposition | Task count | % of total |
|---|---:|---:|
| agent_now | 15 | 43% |
| pilot_step_5 | 9 | 26% |
| stay_human | 11 | 31% |
| **Total** | **35** | **100%** |

## Category Distribution

| Category | Task count | % of total |
|---|---:|---:|
| Judgment | 11 | 31% |
| Pattern | 13 | 37% |
| Coordination | 5 | 14% |
| Creation | 6 | 17% |
| **Total** | **35** | **100%** |

## Wave Assignment

### Wave 1: immediate draft-only support

1. Verified results summary table
2. Participation and event-flow metrics
3. Draft internal post-event report
4. Improvement backlog draft
5. Coach/team follow-up draft

### Wave 2: medium-complexity

1. PB/SB candidate highlights
2. Team-level summaries
3. Public event recap draft
4. Data provenance and privacy checks

### Wave 3: stay human / high judgment

1. Result certification
2. External narrative approval
3. Medical/safeguarding wording
4. Coach relationship decisions
5. Publishing and sending

## Recommended Agent

**Name:** Post-Event Performance Reporting Copilot
**Autonomy:** `recommend_only`
**Purpose:** Draft structured post-event reports from verified event data, operations logs, feedback, and approved notes.

## Next Required Artifact

Create the Workflow Data Manifest for this reporting workflow before using real event data.
