# Workflow Data Manifest: Competition Planning Copilot

**Firm:** the Operations Team
**Workflow:** Track & Field athletics competition planning
**Mode:** Direct Mode
**Date drafted:** 2026-05-31
**Manifest version:** v0.1 draft

## Workflow Identification

| Field | Value |
|---|---|
| Workflow name | Competition Planning Copilot |
| Workflow owner (named human) | TBD: Competition Director / Event Lead |
| CAIO sign-off | TBD |
| Data steward sign-off | TBD |
| CISO / security sign-off | TBD, or delegated senior owner if no formal CISO |
| Manifest version | v0.1 draft |
| Date drafted | 2026-05-31 |
| Date approved | Not yet approved |

## Workflow Scope

The Competition Planning Copilot supports the Operations Team in planning Track & Field Athletics competitions. It is triggered when an event lead creates or updates a structured competition brief. It produces draft planning artifacts only: master timeline, action tracker, timetable options, equipment checklist, venue setup checklist, officials and volunteer roster draft, briefing pack drafts, communications calendar, draft messages, and post-event learning template. The copilot does not approve safety decisions, eligibility decisions, seeding decisions, payments, final timetables, public communications, or incident responses.

## Data Sources Table

| # | Source | Purpose | Access | Sensitivity tier | Retention in copilot memory | Named data owner |
|---:|---|---|---|---|---|---|
| 1 | Structured event brief | Defines event date, venue, competition type, age groups, event list, expected athlete volume, stakeholders, and planning constraints. | read | internal | Retain in event workspace until post-event review, then archive with event pack. | Competition Director / Event Lead |
| 2 | Competition rules and local operating policies | Allows the copilot to flag timetable, equipment, official-role, and process issues against approved rules. | read | internal / public | Cache approved reference version for the event; refresh when rules change. | Technical Manager / Athletics Lead |
| 3 | Venue information | Provides track layout, field areas, room availability, access points, storage, power, toilets, medical point, and setup constraints. | read | internal | Retain event-relevant extracts only in event workspace. | Venue / Operations Lead |
| 4 | Previous event plans and templates | Reuses proven timelines, checklists, briefing formats, and lessons learned. | read | internal | Retain derived templates; do not retain unrelated historic event data. | Post-Event Learning Owner |
| 5 | Entries summary data | Supports timetable options, event load estimates, heat planning drafts, and equipment requirements. Use aggregate counts where possible. | read | confidential; restricted if minors or sensitive categories are included | Retain only event-needed fields until results pack is complete, then archive per policy. | Entries / Results Coordinator |
| 6 | Officials and volunteer availability | Supports role roster drafts, confirmation tracking, and gap detection. | read | confidential | Retain for current event only; remove personal data from reusable templates. | Officials / Volunteers Coordinator |
| 7 | Equipment inventory and supplier list | Produces event-by-event equipment checklist, gaps, procurement tracker, and setup plan. | read | internal | Retain current event snapshot and reusable equipment checklist. | Venue / Operations Lead |
| 8 | Stakeholder contact groups | Supports communications calendar and draft messages to coaches, teams, officials, volunteers, venue, partners, and internal staff. | read | confidential | No retention beyond approved contact group labels unless explicitly needed for the event. | Communications Lead |
| 9 | Budget template and procurement tracker | Helps draft budget forecast, compare quotes, and produce cost-variance report. | read | confidential | Retain event budget workspace until post-event finance review, then archive per policy. | Finance / Procurement Lead |
| 10 | Safety, safeguarding, medical, and incident templates | Produces draft risk register, checklist prompts, and escalation-plan skeletons for human review. | read | restricted | Retain approved templates only; do not retain incident personal data by default. | Safety / Safeguarding / Medical Lead |
| 11 | Weather forecast and public disruption data | Supports contingency prompts for heat, rain, wind, transport disruption, or venue access issues. | read | public | No retention required beyond event log. | Venue / Operations Lead |
| 12 | Planning workspace / event pack | Stores copilot-produced drafts, action tracker, version history, approvals, and final event pack. | read_write | internal; inherits highest sensitivity of contained documents | Retain as official event planning record. | Competition Director / Event Lead |

## Explicitly Excluded Data

The copilot does **not** need these data sources for Wave 1:

- Raw medical records
- Full athlete date-of-birth records unless required for a specific eligibility check
- Payment card or bank details
- Private HR records
- Safeguarding case files
- Unapproved WhatsApp or personal-message history
- Broad access to email inboxes
- Broad access to shared drives
- Any source where the workflow-specific purpose cannot be stated

## Binary-Rule Check

For each source above:

- [ ] Purpose is workflow-specific.
- [ ] Access is minimum necessary.
- [ ] Sensitivity tier is confirmed by the data owner.
- [ ] Retention is bounded.
- [ ] Data owner has approved access in writing.

**Current status:** draft only. Approval is still required before connecting real systems or uploading production data.

## Permission Envelope Mapping

| Agent | Permission Envelope | Autonomy Tier | Escalation rule |
|---|---|---|---|
| Competition Planning Copilot | May read approved event-planning sources and write drafts into the event planning workspace. No external send, publish, payment, safety sign-off, eligibility decision, seeding decision, or final timetable approval. | recommend_only | Escalate to Event Lead when confidence is low, source data conflicts, deadline risk appears, safety/safeguarding/medical issues appear, or a human approval is required. |
| Timetable Drafting Assistant | May generate timetable options from event brief, entries summary, venue constraints, and approved competition rules. | recommend_only | Escalate to Technical Manager for conflicts, rule ambiguity, athlete welfare concerns, or venue constraint tradeoffs. |
| Communications Drafting Assistant | May draft messages and communication calendar from approved event details and contact group labels. Cannot send or publish. | recommend_only | Escalate every outgoing communication to Communications Lead for approval. |

## Credential and Identity Plan

- [ ] Workflow identity provisioned for this workflow only.
- [ ] No shared human login credentials.
- [ ] Read credentials separated from write credentials.
- [ ] Write access limited to the planning workspace / event pack.
- [ ] Credentials revocable on demand.
- [ ] Per-action logging operational.
- [ ] Correlation ID format agreed before pilot, recommended: `RUW-EVENTID-YYYYMMDD-SEQUENCE`.
- [ ] No destructive write endpoints in Wave 1.

## Source-of-Truth Statement

- Operational systems remain the source of truth.
- If the copilot output and the operational system disagree, the operational system wins.
- The planning workspace is the event planning record, not a second source of truth for entries, eligibility, payments, safety, or results.

Signed by senior owner: _____________________________________

## HIDO Cross-Reference

Before Step 5 shadow-mode use with real data, complete HIDO Six Questions for at least these object types:

1. Event brief
2. Event list
3. Venue constraint record
4. Entries summary
5. Official / volunteer availability record
6. Equipment inventory item
7. Stakeholder contact group
8. Budget line item
9. Safety / safeguarding / medical checklist item
10. Action tracker item

## Access-vs-Training Statement

- The copilot may retrieve approved data at runtime for this workflow.
- The copilot does **not** train on the Operations Team data by default.
- No vendor, model, or assistant may use the Operations Team competition data for model training unless the Operations Team separately approves it in writing.
- Any future fine-tuning must use approved, curated, de-identified datasets under a separate decision.
- Vendor contract or platform settings must pin retention, training rights, deletion rights, audit rights, and model isolation.

Signed by CAIO / senior owner: _____________________________________

## First Shadow-Mode Success Metrics

For the first competition pilot, measure:

| Metric | Baseline | Target |
|---|---:|---:|
| Time to produce first complete planning pack | TBD | 50% reduction |
| Number of missed planning actions found late | TBD | 50% reduction |
| Human override rate on copilot recommendations | TBD | Falls across event cycles |
| Timetable rework after technical review | TBD | Falls across event cycles |
| Volunteer / official confirmation gaps one week out | TBD | Falls across event cycles |
| Safety / safeguarding items requiring late correction | TBD | Zero tolerance for preventable misses |

## Manifest Review Cadence

- First review: 30 days after the first shadow-mode pilot starts.
- Subsequent reviews: every 90 days or before each major competition cycle.
- Review immediately if a new data source, new agent, new communication channel, or new sensitive data category is proposed.
- Increment manifest version on every change.

## Current Build Gate

the Operations Team can proceed to design the Wave 1 agent specification, but should not connect live production data until:

1. Named data owners are confirmed.
2. Source sensitivity tiers are approved.
3. Retention rules are accepted.
4. HIDO answers are completed for the core objects.
5. Draft-only permission envelope is signed.
