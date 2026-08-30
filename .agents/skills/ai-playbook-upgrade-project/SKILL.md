---
name: ai-playbook-upgrade-project
description: Upgrade or migrate a bootstrapped project to V0.4 through three safety tiers. Use for version drift, explicit playbook upgrades, V0.3 migration, or older cross-version planning.
---

# /ai-playbook-upgrade-project

Upgrade a project without erasing anything the project has filled in. Legacy alias: `/upgrade-project`.

## The three tiers

Classify every difference before editing.

| Tier | What | Action |
|---|---|---|
| **1. New files** | Template files absent at the project's recorded version | Copy from `templates/`; pause where bootstrap requires a choice. |
| **2. Boilerplate** | Uncustomised routing, rule, and state sections inherited from templates | Patch in place and show the diff. |
| **3. Project content** | Glossary entries, constraints, stack details, tokens, decisions, counters, timestamps, or any uncertain file | Propose one minimal edit and apply only on explicit approval. |

Uncertainty resolves to tier 3.

## Procedure

1. **Detect the version.** Read `playbook_version` from `.playbook-state.yml`. If absent, infer the newest plausible version from shipped artefacts or use “unknown — assume oldest.” Completion criterion: one starting version and its evidence are recorded.
2. **Select the migration branch.** Read [`MIGRATIONS.md`](MIGRATIONS.md) completely for every upgrade. V0.4 projects use the same-edition upgrader. V0.3.31+ projects use the deterministic major-edition migrator; older projects first follow the explicit cross-version rows. Completion criterion: every applicable delta is in one worklist.
3. **Build the plan.** Classify each delta, remove non-applicable items such as UI work for `decisions.no_ui: true`, and present change/tier/action before editing. Completion criterion: the user has seen the complete plan.
4. **Apply tiers 1 and 2.** Pause at bootstrap choices and keep tier 3 separate. For same-edition V0.4, run `python3 /Users/tom/Developer/ai-engineering-playbook/v0.4/scripts/upgrade-project.py {project-path} --apply-safe`. For V0.3.31+, run `python3 /Users/tom/Developer/ai-engineering-playbook/v0.4/scripts/migrate-project.py {project-path}` for the read-only plan and repeat with `--apply` after approval. Migration must install and verify V0.4 before it removes only digest-verified historical pilot files. Exit 2 or any `manual review:` is tier 3, never success. Completion criterion: every accepted tier 1/2 item is applied and diffed.
5. **Walk tier 3.** Show current content, the new expectation, and one minimal proposal; apply on explicit approval and log declines. Completion criterion: every tier-3 item is accepted or recorded as declined.
6. **Stamp and record.** Set `playbook_version: V0.4.0` only when no migration item remains unresolved and `/ai-playbook-deliver` verifies against its manifest; otherwise retain the starting version. Set `last_upgraded` to today and `prereqs_required: true`. Record applied and declined items in the project changelog or commit message. Completion criterion: version, date, cold-path flag, and every disposition are persisted without certifying incomplete work.
7. **Verify.** Re-run the recent safe migrator when applicable and require a no-change result, run `python3 /Users/tom/Developer/ai-engineering-playbook/v0.4/scripts/compute-status.py {project-path} --check`, then run stage 00's cold path. Inspect the `planning/STATUS.md` mirrors and local `CLAUDE.md`/`AGENTS.md` routing contract; stage 00 alone does not prove those surfaces migrated. Completion criterion: project content is preserved, every delta is applied or logged, deterministic state is current, and the project passes at the new version.

## Guardrails

- Preserve project-filled content through tier 3 and minimal accepted patches.
- Show cross-version plans before edits and migrate only upward to V0.4.
- Reuse recorded decisions and declined items until the user reopens them.
- Never promote historical model identity from generated self-description. Re-prove it from provider, session/thread, or host metadata; otherwise record `identity-unverifiable` and keep the starting version.
- Never remove `.agents/skills/ai-playbook-deliver-pilot/` until the V0.4 delivery skill and project stamp verify; remove only paths and digests in the approved historical lock.
- Keep the direction playbook → project; send project discoveries to the self-improvement loop.
- Run cross-version migration on a clean tree, commit it separately, then resume feature work.

## Output shape

> **Upgrade plan: {old version} → {current version}** ({n} changelog entries)
>
> | Change | Tier | Action |
> |---|---|---|
> | {…} | {1/2/3} | {copy / patch / propose} |
>
> Reply `go` to apply tiers 1–2, then we'll walk tier 3 individually.

After completion:

> **Upgraded to {version}.** Applied: {n}. Proposed and accepted: {n}. Declined (logged): {n}. `.playbook-state.yml` stamped.
