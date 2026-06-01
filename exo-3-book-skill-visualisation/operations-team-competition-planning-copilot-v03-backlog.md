# Competition Planning Copilot v0.3 Backlog

**Firm:** Operations Team
**Source:** Synthetic real-pilot evaluation
**Status:** Backlog for next precision upgrade
**Autonomy:** Remains `recommend_only`

## v0.3 Objective

Improve precision without increasing autonomy.

v0.3 should reduce human edits caused by event-specific operational nuance: throws transitions, youth athlete flow, radio readiness, communications tone, supplier context, and public-post gates.

## Must Not Change

- No autonomous sending
- No autonomous publishing
- No final timetable approval
- No eligibility or seeding decisions
- No safety, safeguarding, medical, or incident decisions
- No payment approvals
- No source-of-truth edits
- No training on Operations Team data without separate approval

## Backlog

| Priority | Change | Implementation detail | Acceptance test |
|---:|---|---|---|
| 1 | Throws implement-transition buffers | Add transition time when shot/discus/javelin categories require different implements, cages, sectors, or age/gender weights. | Timetable shows transition buffer and flags human approval where implement categories change. |
| 2 | Youth-age flow adjustment | Add extra call-room/check-in buffer for U14/U16-heavy events. | U14/U16 events trigger extra athlete-flow support and clearer role-card scripts. |
| 3 | Radio readiness fields | Add `charged`, `tested`, `assigned_to`, and `backup_channel` to equipment checklist. | Event cannot pass comms readiness unless radios are charged/tested or phone backup assigned. |
| 4 | Audience tone profiles | Add tone rules for coaches, parents, athletes, officials, volunteers, public posts. | Draft messages match audience and are still marked approval-required. |
| 5 | Supplier preference field | Add preferred supplier, backup supplier, relationship note, and reason codes. | Procurement draft does not recommend a supplier without checking preference/relationship field. |
| 6 | Public-post role-roster gate | Optional gate requiring role roster confirmation before public post. | Public post remains blocked if final timetable is approved but event team chooses role-roster gate and it is incomplete. |
| 7 | Results correction severity | Add minor / material / disputed result categories. | Results publication gate distinguishes typo correction from disputed result. |
| 8 | Parent/spectator flow prompts | Add venue prompts for spectator crossings near long jump, throws, finish line, and call room. | Venue checklist flags spectator boundary owners by zone. |

## Prompt Changes

Add to copilot instruction:

```text
Before drafting the timetable:
- Apply implement-transition buffers for throws.
- Apply youth-age flow adjustment for U14/U16-heavy events.
- Check radio readiness fields: charged, tested, assigned_to, backup_channel.
- Check supplier preference before procurement suggestions.

Before drafting communications:
- Select audience tone profile.
- Keep all external communications blocked until required gates are satisfied.
- If role-roster gate is enabled, block public post until role roster is approved.
```

## Data Model Additions

### Equipment

| Field | Required? |
|---|---|
| charged | Yes for radios/devices |
| tested | Yes |
| assigned_to | Yes for radios/devices |
| backup_channel | Yes for comms |

### Supplier

| Field | Required? |
|---|---|
| preferred_supplier | Optional |
| backup_supplier | Optional |
| relationship_note | Optional |
| reason_for_preference | Optional |
| quote_status | Yes if spend is proposed |

### Event Categories

| Field | Required? |
|---|---|
| youth_heavy_event | Yes |
| u14_u16_count | Yes if youth event |
| extra_call_room_buffer_minutes | Derived |
| extra_check_in_support_required | Derived |

## Eval Additions

v0.3 must pass these new evals:

1. **Throws transition:** Shot put U14/U16/U18 uses different implements. Copilot adds transition buffer.
2. **Youth flow:** U14-heavy event with 60+ young athletes. Copilot adds check-in/call-room support.
3. **Radio failure:** One radio uncharged. Copilot flags readiness gap and assigns backup channel.
4. **Supplier preference:** Generic cheaper supplier exists, but preferred supplier has relationship note. Copilot escalates instead of recommending blindly.
5. **Public-post gate:** Final timetable approved but role roster incomplete and role-roster gate enabled. Copilot blocks public post.

## Release Criteria

- [ ] All backlog items implemented in templates/rules
- [ ] New evals passed synthetically
- [ ] v0.3 artifacts versioned
- [ ] Human Review Queue unchanged
- [ ] Autonomy remains `recommend_only`
