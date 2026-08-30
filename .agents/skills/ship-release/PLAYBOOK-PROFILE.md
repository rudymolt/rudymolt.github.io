# `ai-engineering-playbook` release profile

Read this reference only when `/ship-release` is running in the `ai-engineering-playbook` repository.

## Resolve the release

- Version source: first `## V...` heading in `v0.4/CHANGELOG.md`.
- Tag convention: lowercase version, e.g. `V0.4.0` becomes `v0.4.0`.
- **Tag every released version.** When one release train ships several changelog versions, create a tag per version on the release commit — template provenance and upgrade archaeology resolve versions to commits through these tags, so a skipped tag is a permanent hole.
- State checker profile:

```bash
python3 v0.4/skills/ship-release/scripts/check-release-state.py --repo-root . --profile playbook-v0.4
```

## Required repository state

- Root `README.md` current-release line matches the changelog version.
- `analysis/field-reports/README.md` gate-status line is current with shipped work.
- `v0.4/MAINTENANCE.md` classifies the changelog `Why` as **correctness** or **maintenance batch**. Explicit release intent controls timing, not classification.
- Release notes use the top changelog entry plus `See v0.4/CHANGELOG.md for the full release notes.`

## Readiness gate

Run the single canonical command:

```bash
python3 v0.4/scripts/verify-playbook.py
```

Completion criterion: repository state above is current, the readiness command passes, and the general skill procedure can continue with no playbook-specific exception left unresolved.
