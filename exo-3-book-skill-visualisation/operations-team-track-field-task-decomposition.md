# Task Decomposition Matrix: Track & Field Competition Planning

**Firm:** the Operations Team
**Function under analysis:** Track & Field athletics competition planning
**Date:** 2026-05-31
**Owner:** TBD

## Scope

This is a first-pass REWRITE Step 4 diagnostic for planning Track & Field Athletics competitions. It assumes the Operations Team is in **Direct Mode** because the team has 8 people. The goal is not headcount reduction; the goal is to remove coordination drag, improve event reliability, and create a repeatable competition operating system.

## Scoring Method

- **5:** agent handles today, ready to deploy
- **4:** agent handles with light human oversight
- **3:** pilot in REWRITE Step 5
- **2:** agent assists; human owns
- **1:** fully human, no foreseeable delegation

Disposition:

- **agent_now:** readiness 4-5
- **pilot_step_5:** readiness 3
- **stay_human:** readiness 1-2

Categories:

- **J:** judgment
- **P:** pattern
- **C:** coordination
- **Cr:** creation

## Matrix

| Role | Task | Category | Agent Readiness | Disposition | Notes |
|---|---|---:|---:|---|---|
| Competition Director / Event Lead | Define event objectives and success criteria | J | 2 | stay_human | Agent can draft options; leadership owns purpose and tradeoffs. |
| Competition Director / Event Lead | Confirm competition scope, events, age groups, and divisions | J | 2 | stay_human | Human owns final competition proposition. |
| Competition Director / Event Lead | Create master planning timeline | C | 4 | agent_now | Good Wave 1 candidate. |
| Competition Director / Event Lead | Maintain action log and meeting summaries | C | 5 | agent_now | Low-risk, high-frequency coordination work. |
| Competition Director / Event Lead | Approve final timetable and participant experience | J | 2 | stay_human | Agent drafts; human approves. |
| Competition Director / Event Lead | Make day-of escalation decisions | J | 1 | stay_human | Safety, reputation, and stakeholder judgment stay human. |
| Technical Manager / Athletics Lead | Draft timetable options from entries and venue constraints | P | 4 | agent_now | Strong candidate for structured prompt/tool workflow. |
| Technical Manager / Athletics Lead | Check track/field event sequencing conflicts | P | 3 | pilot_step_5 | Needs rule and local venue validation. |
| Technical Manager / Athletics Lead | Map equipment requirements per event | P | 4 | agent_now | Use event list to generate equipment checklist. |
| Technical Manager / Athletics Lead | Check rules and compliance requirements | P | 3 | pilot_step_5 | Agent flags issues; qualified human confirms. |
| Technical Manager / Athletics Lead | Approve technical competition format | J | 2 | stay_human | Human owns format, fairness, and field constraints. |
| Technical Manager / Athletics Lead | Produce technical briefing pack | Cr | 4 | agent_now | Draft for officials, volunteers, coaches, and teams. |
| Venue / Operations Lead | Generate venue setup checklist | C | 4 | agent_now | Repeatable from event profile. |
| Venue / Operations Lead | Build equipment inventory and gap analysis | P | 4 | agent_now | Needs current equipment data. |
| Venue / Operations Lead | Draft site zones and flow map | Cr | 3 | pilot_step_5 | Useful draft; venue expert validates. |
| Venue / Operations Lead | Create setup and tear-down schedule | C | 4 | agent_now | Strong coordination use case. |
| Venue / Operations Lead | Generate weather contingency scenarios | P | 3 | pilot_step_5 | Agent suggests; team validates feasibility. |
| Venue / Operations Lead | Confirm final venue readiness | J | 2 | stay_human | Requires physical inspection. |
| Officials / Volunteers Coordinator | Define role roster by event and station | P | 4 | agent_now | Good Wave 1 candidate. |
| Officials / Volunteers Coordinator | Match people to roles and availability | C | 4 | agent_now | Agent can produce draft roster and gaps. |
| Officials / Volunteers Coordinator | Draft briefing notes and check-in instructions | Cr | 4 | agent_now | Human reviews tone and local details. |
| Officials / Volunteers Coordinator | Track confirmations and send reminder drafts | C | 5 | agent_now | Do not auto-send until approved. |
| Officials / Volunteers Coordinator | Produce options for no-show gaps | C | 3 | pilot_step_5 | Human still decides critical substitutions. |
| Officials / Volunteers Coordinator | Assign critical official roles finally | J | 2 | stay_human | Human accountability remains. |
| Entries / Results Coordinator | Design entry form fields and validation rules | P | 4 | agent_now | Agent drafts schema; human approves. |
| Entries / Results Coordinator | Validate entry completeness and duplicates | P | 5 | agent_now | Good automation candidate if data is clean. |
| Entries / Results Coordinator | Flag eligibility or classification anomalies | P | 3 | pilot_step_5 | Agent flags only; human decides. |
| Entries / Results Coordinator | Draft start lists and heats | P | 3 | pilot_step_5 | Needs competition rules, seeding policy, and review. |
| Entries / Results Coordinator | Make final eligibility and seeding decisions | J | 1 | stay_human | Do not automate. |
| Entries / Results Coordinator | Draft results pack after the competition | P | 3 | pilot_step_5 | Needs source-of-truth timing/results system. |
| Communications Lead | Build stakeholder communications calendar | C | 4 | agent_now | Good Wave 1 candidate. |
| Communications Lead | Draft routine emails, WhatsApp messages, and briefings | Cr | 4 | agent_now | Human approves before sending. |
| Communications Lead | Publish or send approved communications | C | 2 | stay_human | Keep send/publish human-controlled initially. |
| Communications Lead | Answer routine FAQs from an approved knowledge base | P | 3 | pilot_step_5 | Only after source content is approved. |
| Communications Lead | Handle crisis or sensitive communications | J | 1 | stay_human | Human-owned. |
| Safety / Safeguarding / Medical Lead | Draft event risk register from event profile | P | 3 | pilot_step_5 | Agent drafts; responsible lead owns. |
| Safety / Safeguarding / Medical Lead | Generate medical and safeguarding checklist | P | 3 | pilot_step_5 | Useful support, not sign-off. |
| Safety / Safeguarding / Medical Lead | Identify control gaps and named owners | P | 3 | pilot_step_5 | Human validates risk treatment. |
| Safety / Safeguarding / Medical Lead | Final safety and safeguarding sign-off | J | 1 | stay_human | Never autonomous. |
| Safety / Safeguarding / Medical Lead | Incident response decisions | J | 1 | stay_human | Human-led escalation. |
| Finance / Procurement Lead | Draft budget forecast template | P | 4 | agent_now | Based on prior events and supplier data. |
| Finance / Procurement Lead | Compare supplier quotes | P | 4 | agent_now | Agent summarizes; human chooses. |
| Finance / Procurement Lead | Maintain procurement tracker | C | 4 | agent_now | Good coordination task. |
| Finance / Procurement Lead | Approve payments or commitments | J | 1 | stay_human | Human authority only. |
| Finance / Procurement Lead | Produce cost variance report | P | 4 | agent_now | Useful for post-event learning. |
| Post-Event Learning Owner | Draft participant feedback survey | Cr | 4 | agent_now | Human checks language and audience fit. |
| Post-Event Learning Owner | Synthesize lessons learned | P | 4 | agent_now | Pull from survey, incident log, action log, results. |
| Post-Event Learning Owner | Create next-event improvement backlog | P | 3 | pilot_step_5 | Human prioritizes improvements. |
| Post-Event Learning Owner | Archive event pack with metadata | C | 4 | agent_now | Helps build repeatable memory. |

## Summary Counts

| Disposition | Task count | % of total |
|---|---:|---:|
| agent_now | 23 | 47% |
| pilot_step_5 | 13 | 27% |
| stay_human | 13 | 27% |
| **Total** | **49** | **100%** |

## Categorization Distribution

| Category | Task count | % of total |
|---|---:|---:|
| Judgment | 12 | 24% |
| Pattern | 21 | 43% |
| Coordination | 11 | 22% |
| Creation | 5 | 10% |
| **Total** | **49** | **100%** |

## Wave Assignment Recommendation

### Wave 1: immediate, low-risk, high-frequency

1. **Competition planning timeline and action tracker**
   Turns the event brief into a live plan, recurring meeting agenda, action log, owner tracker, and deadline reminders.

2. **Draft timetable and equipment checklist generator**
   Turns event list, venue constraints, and known rules into timetable options, equipment requirements, and setup schedule.

3. **Officials, volunteers, and communications coordination pack**
   Produces role roster, briefing pack, confirmation tracker, stakeholder comms calendar, and draft messages.

### Wave 2: medium-complexity

1. **Entry validation and start-list drafting**
   Validate entries, flag anomalies, draft heats/start lists, and prepare results pack drafts.

2. **Risk, medical, safeguarding, and contingency support**
   Draft risk register, medical checklist, safeguarding checklist, and contingency scenarios for human review.

### Wave 3: higher-judgment

1. **Decision-support for eligibility, seeding, crisis response, and final approvals**
   Agent provides context, policy references, and options. Humans decide.

## Recommended Wave 1 Agent

**Name:** Competition Planning Copilot

**Purpose:** Turn a structured Track & Field competition brief into the core planning pack: timeline, action tracker, draft timetable options, equipment checklist, officials/volunteer roster draft, briefing pack, communications calendar, and post-event learning template.

**Initial Autonomy Tier:** Draft-only.

**Hard limits:**

- No autonomous publishing or sending.
- No eligibility decisions.
- No safety, safeguarding, medical, or incident decisions.
- No payment approvals.
- No final timetable approval.

## Headcount Implication

Current FTE is not yet measured. For an 8-person team, this should be treated as a capacity and quality intervention, not a reduction exercise.

Expected effect: reduce coordination load during competition planning and redeploy saved time into athlete experience, sponsor/partner relationships, coaching quality, and post-event improvement.

## Next Required Artifact

Before building the Wave 1 workflow, produce a **Workflow Data Manifest** for the Competition Planning Copilot:

- What data sources it needs
- Why it needs each source
- Whether access is read or write
- Sensitivity level
- Retention in agent memory
- Named data owner
