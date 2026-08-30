# Cross-version migration reference

> Read this file for every `/ai-playbook-upgrade-project` run. The changelog explains releases; this file is the field-level project migration contract. The three-tier rule in `SKILL.md` governs every item here.

## V0.3.31+ → V0.4.0

Use `scripts/migrate-project.py`. It three-way merges the current V0.4
templates against committed `.playbook-base/` provenance, installs and verifies
the manifest-owned `/ai-playbook-deliver` runtime, stamps V0.4.0 only when no
manual review remains, and only then removes digest-verified files from the
approved historical pilot lock. It preserves unrelated files in both skill
directories and refuses a modified owned file, unknown pilot digest, malformed
lock, or partial V0.4 install.

| Delta | Tier | Detail |
|---|---|---|
| Edition paths and stamp | 2 | Route managed playbook paths to `v0.4/`; stamp `V0.4.0` only after deterministic status and runtime verification. |
| Delivery runtime | 1 | Install `.agents/skills/ai-playbook-deliver/` from `v0.4/delivery/MANIFEST.yml`; do not hand-copy it. |
| Delivery mission state | 2 + 3 | Add the optional discovery list; preserve every project mission locator and treat mission/control truth as project content. |
| Historical pilot removal | 2 + 3 | After V0.4 verification, remove only files in the approved pilot `manifest-lock.yml`; modified owned files are tier 3 and block removal. |
| K4.1 policy/admission | 3 | Preserve project authority and disabled/enabled state. Migration never activates K4.1 or creates standing authority. |

## V0.2 → V0.3.41 prerequisite

V0.4 does not certify a direct pre-V0.3.31 jump. First use the preserved V0.3
rollback upgrader to reach V0.3.41, verify that edition, then use the
V0.3.31+ → V0.4.0 route above. Confirm before the prerequisite: **“This first
migrates the project from playbook v0.2 to the V0.3.41 rollback baseline; V0.4
migration is a separate verified step. Proceed?”**

| # | Change | Tier | Detail |
|---|---|---|---|
| H1 | Close out v0.2 deltas | per delta | If the project is below `V0.2.13`, walk `/Users/tom/Developer/ai-engineering-playbook/v0.2/CHANGELOG.md` read-only up to V0.2.13. Expect the UI-diagram template, learnings-refresh cadence, retro anti-pattern prompt, and CI-gate additions. |
| H2 | Retarget playbook paths | 2 | In `CLAUDE.md`, `AGENTS.md`, `.playbook-state.yml`, `playbook-cadences.yml`, `planning/README.md`, and `archive/README.md`: `/Users/tom/Developer/ai-engineering-playbook/v0.2/` → `/Users/tom/Developer/ai-engineering-playbook/v0.3/`. Show the diff. |
| H3 | Walk v0.4 deltas | per delta | Apply every newer V0.3 changelog entry with the three-tier rule. Use the known project-side list below as a prompt, then verify against the changelog. |
| H4 | Stamp | — | Set `playbook_version` to the newest V0.3 entry and `last_upgraded` to today after verification. |

### Versioned V0.3 project-side deltas

Apply this table to same-major V0.3 upgrades as well as the cross-version branches above. Every V0.3 release from V0.3.31 onward must have a row, including an explicit “no project-side delta” row when applicable, so release-readiness checks can detect missing upgrade guidance.

| Delta | Tier | Detail |
|---|---|---|
| `field-report.md` (V0.3.6) | 1 | Copy `templates/field-report.md` to the project root. Completed reports travel back to the playbook's `analysis/field-reports/`. |
| Retro field-report hooks (V0.3.6, 8) | 2 | Add the retro §6 field-report prompt and §7 checklist. Custom placement is tier 3. |
| Budget ceilings (V0.3.7) | 2 + 3 | Add the template block. Presence is tier 2; preserve existing tuned values as tier 3. |
| Budget floor restructure (V0.3.13) | 2 + 3 | Use loop guards (max retry/iteration, wall time, no-progress) plus the project's billing-specific cost/quota overlay. Preserve tuned values. |
| Field-report proof event 2 (V0.3.13) | 2 | Use “run-level ceiling tripped”; max-retry escalations belong under proof event 4. |
| Four-part stop report (V0.3.15) | 2 | A stop records doing, progress, exact ceiling/value, and typed options; session ceilings override file defaults and are restated at run start. |
| State keys (V0.3.20) | 2 | Add absent `last_run.learnings_refresh`, `last_run.kitchen_sink_drift_audit`, `last_run.align`, and `decisions.graduated_from_lite` as `null`. Preserve existing values. |
| Cadence counter (V0.3.20) | 2 | Rename the kitchen-sink counter to `days_since_last_kitchen_sink_drift_audit`; preserve thresholds. |
| Digest pointer (V0.3.20) | 2 | Add the V0.3 digest entry to project `CLAUDE.md` and `AGENTS.md`. |
| Status transitions and compute-status (V0.3.20, 23) | behavioural | Mention the new state transitions and deterministic recompute command in the upgrade summary. |
| Spec vocabulary (V0.3.30) | 2 + 3 | Migrate `prd-written` → `spec-written` and `planning/{slug}/prd.md` → `spec.md`. Show the file move; preserve its project-written contents. Legacy names remain accepted until the migration is approved. |
| Capability route state (V0.3.31) | 2 | Add `prereqs_required: true`, `decisions.capability_profile: null`, and the eight-key `capability_routes` map from the current template; stage 00's next cold path records the actual routes, timestamps the audit, and clears the flag. |
| Wayfinder visibility state (V0.3.32) | 2 | Add `active_wayfinding_maps: []` and the `planning/STATUS.md → Open Wayfinder maps` empty section. Preserve and mirror any genuinely open tracker map instead of defaulting it to empty during upgrade. |
| Model routing and schema 3 (V0.3.33) | 2 + 3 | Upgrade `schema_version` 2 → 3; add `status.pending_plan_routes`, `model_routing`, `pending_model_routes`, `capability_routes.model_routing`, and `planning/STATUS.md → Pending Plan routes`. Patch project `CLAUDE.md` with the gated Plan/Build/Verify policy and project `AGENTS.md` with the routing row plus `.playbook-routing/` durability rule. Add `.playbook-routing/` to `.gitignore`; create `.gitignore` when absent. Preserve existing counters, route decisions, tuned values, feature statuses, and project content. Existing features may omit `routing` until their next lane boundary. |
| Authoritative model identity (V0.3.34) | 2 + 3 | Scan pending routes and active-feature lane selections previously marked verified. Valid proof requires provider, session/thread, or host metadata, a non-null reported model matching the requested model, and a verification timestamp; a model-generated self-description never proves identity. Re-prove old records from authoritative runtime metadata or, with explicit approval, mark them `identity-unverifiable`; never invent evidence. Existing route records and timestamps are tier 3. A route that cannot be resolved blocks the V0.3.34 stamp but may remain fully upgraded through V0.3.33. No state-schema change is required. |
| No project-side file delta (V0.3.35) | — | Bootstrap baseline preservation affects new or incomplete setup; status, command-path, metadata, and test fixes live in the playbook installation. Existing bootstrapped projects require only the normal version stamp and stage 00 cold-path verification; preserve their cadence timestamps and tuned configuration unchanged. |
| Run-scoped execution and closeout controls (V0.3.36) | 2 | Add `status.pending_closeouts`, `pending_closeouts: []`, `last_run.feature_ship: null`, and `decisions.technical_decisions: null` without changing existing feature, cadence, or routing values. Add the `CLAUDE.md` Codex pace rule beside model routing: standard requires no stored choice; `fast` is an explicit Build-action suffix for a single Build → returned-fix → fresh-Verify run, carries increased usage, and never weakens tests, permissions, or safety gates. Existing lane records need no backfill; future handoffs may record the pace actually used as historical evidence. |
| Repository evidence and validation (V0.3.37) | 2 | Advance the recorded playbook version after the safe migrator validates known state and cadence fields. This release changes maintainer tooling and repository gates; it adds no new project-file contract beyond the version stamp. |
| Lane reasoning defaults (V0.3.38) | 2 + 3 | When the complete route tuple still exactly matches the former shared defaults, update Build from Terra/medium to Terra/high and Verify from Sol/high to Sol/medium; keep Plan at Sol/high. Treat any partially customized tuple as project-owned tier 3 and preserve it unchanged. Active or historical per-feature route selections are evidence of what actually ran and are never rewritten. |
| Observational retro baseline (V0.3.39) | 2 + 3 | Before the next applicable retro, copy either missing project template, then merge the current `templates/retro-template.md` learning-coverage/eval section and `templates/field-report.md` observational row into existing customized copies. Preserve project-specific prompts and numbering. This is a project-owned template merge rather than a state rewrite; no thresholds or gates are introduced, and missing historical evidence is recorded explicitly rather than reconstructed. |
| One closeout PR (V0.3.40) | 2 + 3 | If the project has an installed `.agents/skills/whats-next/SKILL.md`, extend the unmodified pending-closeout rule so same-session doc-close and feature retro use one closeout branch and PR. The safe migrator applies the exact boilerplate rewrite; a customized rule is tier 3. Projects without a local copy keep using the playbook source and need only the normal version stamp. The architecture timing and live TDD corrections are playbook-source guidance, not project-file deltas. |
| Template provenance (V0.3.41) | 1 + 2 + 3 | The safe migrator first applies this rollout's three unmodified managed-file deltas (upgrade skill, this migration row, release profile); a customized one remains tier 3 and is not backfilled or certified. It then records a committed `.playbook-base/` snapshot and a typed, machine-owned `template_provenance` state block for every managed prose file (`CLAUDE.md`, `AGENTS.md`, `CONTEXT.md`, `ci-gates.md`, retro/field-report templates, planning/archive READMEs, installed `.agents/skills/`). Existing customisations are preserved against the known current render. From then on template changes apply only by three-way merge: clean merges are tier 2, conflicts are tier 3 with project/template hunk evidence (`merge manually, then re-run with --adopt-current {file}`), and an edited, missing, or non-text `.playbook-base/` snapshot blocks certification. A missing whole block on a V0.3.41+ stamp, duplicate/malformed keys, or a recorded path absent from the current registry is also tier 3 until explicitly repaired/migrated. Future managed-surface releases add a "template merge" row here instead of bespoke migration code. |

For V0.3.31+ projects, the approved tier-1/2 application seam is:

```bash
python3 /Users/tom/Developer/ai-engineering-playbook/v0.4/scripts/upgrade-project.py {project-path} --apply-safe
```

Exit 0 means the known safe deltas were applied. Exit 2 means safe changes were applied but one or more tier-3 reviews remain; the project is deliberately not certified at the newest version. Exit 1 is an operational failure: no certification occurred, but safe partial changes may remain and must be inspected before retrying. Re-running after resolution must report no changed files before stage 00 cold-path verification.

Verification: no live `v0.2/` paths remain outside historical notes; required project-side deltas are present or explicitly declined; stage 00 passes at the new version.

## V0.1 → V0.3.41 prerequisite

Use the same two-step boundary: certify V0.3.41 with the preserved rollback
tooling, then run the V0.4 migrator. Confirm before the prerequisite:
**“This first migrates the project from playbook v0.1 to the V0.3.41 rollback
baseline; V0.4 migration is a separate verified step. Proceed?”**

| # | Change | Tier | Detail |
|---|---|---|---|
| M1 | Retarget playbook paths | 2 | Replace V0.1 paths with V0.3 paths in `CLAUDE.md`, `AGENTS.md`, `.playbook-state.yml`, cadences, planning README, and archive README. Show the diff. |
| M2 | First rule | 2 | Insert the current template's “feature request is not a coding instruction” section immediately after the header blockquote in `CLAUDE.md`. |
| M3 | Agent routing | 2 | Patch project `AGENTS.md` first-step and new-feature routing to the current template. |
| M4 | Digest pointer | 2 | Add the V0.3 digest entry to `CLAUDE.md` and update the version line. |
| M5 | State schema | 2 + 3 | Add current schema 3 and a computed status block, including pending Plan route visibility. Compute from real counters/cadences/routes; preserve counters, timestamps, and existing project decisions. |
| M6 | Planning status | 1 | Create `planning/STATUS.md`, then fill it from actual folders and active features; folders win on disagreement. |
| M7 | Archive status | 1 | Create `archive/STATUS.md`, then count folder names without reading archived contents. |
| M8 | Cadence guard | 2 | Update doc-close-after-feature-ship semantics while preserving tuned thresholds. |
| M9 | CI gates | 1 / 3 | Ask first; map existing CI, copy the manual fallback, or record the human's deferral. |
| M10 | Frontend artefacts | 3 | For UI projects, propose changes individually; preserve project tokens, vocabulary, and interaction decisions. |
| M11 | Later deltas and stamp | per delta | Apply the V0.2.10+, V0.2.12/13, and all V0.3 deltas, verify, then stamp current. |

Verification:

1. No live `v0.1/` or `v0.2/` paths remain outside historical notes.
2. State schema 3 parses; status totals match active features, pending Plan routes, and planning folders.
3. Planning/archive status counts match their folders.
4. The first rule appears before project-specific instructions.
5. CI gates exist or the upgrade note records a human deferral.
6. Stage 00 passes at the new version.

## Tier-3 glossary split (V0.2.10+)

For a UI project, the split glossary form (`design-glossary/` plus generated `index.md`) remains project content.

1. Skip when `decisions.no_ui: true`.
2. Count entries. Below the project's threshold (about 30 by default), record the option without proposing work.
3. Above the threshold, propose `python3 /Users/tom/Developer/ai-engineering-playbook/v0.4/scripts/check-glossary.py split ./DESIGN-GLOSSARY.md ./design-glossary`; explain the read-first `index.md` and `**Related.**` links.
4. On explicit approval, split, run `build-index` and `check`, and update `CLAUDE.md`/`AGENTS.md` pointers. Keep the old glossary until the human confirms the new form.
5. Log a decline so the next upgrade does not re-propose it.

The ADR index is tier 1/2: offer `check-glossary.py adr-index` and bundle-relative cross-links. ADR contents remain tier 3.
