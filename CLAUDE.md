# CLAUDE.md — Rudy Molt Ideas Portal

> Project governance for AI engineering agents. This is the contract. Read it before any work.

---

## ⛔ The first rule — a feature request is not a coding instruction

When a message describes a new feature or any non-trivial change ("add X", "build Y", "support Z"), your next action is **stage 01 alignment** (`/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/01-align.md`) — never code.

- Do **not** create or edit source files. Do **not** write implementation code in your reply — not even a sketch.
- Your first response names the feature, then starts the alignment grilling: goal, constraints, non-goals, vocabulary.
- Code is permitted only once alignment is recorded in `planning/{slug}/` and the feature has a spec and slices (stages 01 → 04).
- Sole exception: genuine one-liners (a typo, a comment, a broken link). If you're weighing up whether it qualifies, it doesn't.

This rule is first because it is the one agents break most: in benchmarking, agents that read this playbook and even cited its cadences correctly still jumped straight to implementation 20 times out of 20. Coding immediately *is* the failure mode, not a way of being helpful.

---

## What this project is

Rudy Molt Ideas Portal is a public static index of Rudy's software, explainers,
visualisations, and working methods. It gives visitors one coherent route into
the projects while keeping each published explainer independently addressable.

## Stack

Static HTML, CSS, JavaScript, and image assets with no build system, package
manager, datastore, or server runtime. GitHub Pages publishes the repository
root from `main`. The visual source of truth is the approved Paper.design file,
distilled into the three root frontend design artefacts.

## Dev commands

```bash
# install
# No dependencies.

# run dev
python3 -m http.server 4173 --bind 127.0.0.1

# test
python3 -c "from html.parser import HTMLParser; from pathlib import Path; p=HTMLParser(); p.feed(Path('index.html').read_text()); print('HTML parse: PASS')"

# typecheck / lint
git diff --check

# build
# No build step; GitHub Pages serves the tracked files directly.
```

## Editability tiers

| Tier | Folder(s) | Rule |
|---|---|---|
| **Frozen reference** | `archive/` | Never use as current instructions; read only for an explicitly requested historical investigation. |
| **Generated/local output** | `.gstack/`, `.playbook-routing/` | Never commit; disposable local tooling state. |
| **Design source of truth** | `DESIGN-GLOSSARY.md`, `ui-kitchen-sink.html`, `frontend-design-language-guide.html` | Update before changing visual vocabulary, tokens, or interaction patterns. |
| **Active publication** | `index.html`, `assets/`, published explainer directories | Edit surgically and verify all local links plus responsive rendering. |

## Folders agents must not read

- `archive/` — shipped-feature planning artefacts. Stale by definition.
- `planning/{slug}/` where the slug is not in `active_features` of `.playbook-state.yml`.

If you need archive content for an incident investigation, ask the human to surface the relevant file.

## Playbook configuration

- **Session entry point:** read `/Users/tom/Developer/ai-engineering-playbook/v0.4/AGENT-DIGEST.md` first each session — stage map, routing rules, and hard rules in one read.
- **Playbook version:** V0.4 (`/Users/tom/Developer/ai-engineering-playbook/v0.4/`)
- **Intrusion level:** nudge   *# silent | nudge | insist*
- **Cadence config:** `./playbook-cadences.yml`
- **State file:** `./.playbook-state.yml`
- **Model routing:** gated — use `/Users/tom/Developer/ai-engineering-playbook/v0.4/93-model-routing-track.md` at Plan, Build, and Verify. The normal typed action accepts the displayed OpenAI default; `models` shows verified alternatives; every route states current tab, sidecar, or Conductor new-tab behavior.
- **Codex pace:** standard by default. When the human is waiting, they may append `fast` to a Build action (for example `build all fast`); carry fast pace through returned fixes and the fresh Verify handoff for that run only. Fast changes generation pace and usage, never the selected model, reasoning, tests, permissions, or safety gates.
- **Technical decisions:** ask by default. If `.playbook-state.yml → decisions.technical_decisions` is explicitly `auto_recommend`, choose only routine, reversible engineering details with a clear best option. Still ask about product/taste, scope, cost, credentials, external effects, destructive actions, security, and close trade-offs.
- **Budget floor (§11 — tune per project, never delete):**
  - _Loop guards (universal — set regardless of billing):_
    - productive-work budget: estimate from the verification plan before the run; for browser-heavy UI work, start near 60 tool calls and tune from evidence
    - verification reserve: preserve the final 20% for verification, diff review, commit, and handoff
    - max-retry: 3 occurrences of the same failure signature, then escalate
    - wall-time: 45 minutes for any unattended run
    - no-progress halt: 3 consecutive iterations with the same failing test or no diff change → stop
  - _Cost/quota overlay (pick the row for your billing):_
    - Subscription / OAuth: no observable dollar cap; the loop guards above are the quota protection and remain mandatory
  A small call counter never stops productive work that is still changing evidence. A run stops at the failure/no-progress/wall-time/cost ceilings, or before consuming its verification reserve, and **reports in four parts** — what it was doing, progress state (done/verified/incomplete), which ceiling at what value, and typed options for the human. A session-level ceiling stated by the human overrides these file values; the agent restates the governing ceiling at run start.

## Constraints

Always, in every project:

- **Never write a credential, token, or key into a tracked file or echo one into chat.** If a task seems to need a secret, stop and ask — the answer is an environment variable and a `.gitignore` entry, not a hard-coded value "for now". (Security floor: `/Users/tom/Developer/ai-engineering-playbook/v0.4/00-foundations.md` §10.)

- **Before modifying any database or doing a bulk data edit, create a timestamped backup** — and for schema changes, ship only with a rollback that has actually been run (stage 10, "Shipping a migration").

- **Match the length of every written deliverable to what the task needs.** Cover the substance, then stop — no filler sections, redundant summaries, or boilerplate. Documents written here become future agents' context, so inflation compounds.

- Do not replace the Paper-derived visual direction with a framework or generic template.
- Do not change copy in one responsive artboard or implementation without checking its counterpart.
- Do not publish directly from unverified HTML: parse it, check local routes/assets, and run responsive browser QA.
- Do not commit local browser/session artifacts, macOS metadata, or FUSE temporary files.
- Preserve `_planning/` as historical local material unless the human explicitly chooses to publish or remove it.

## Agent file roles

- **`CLAUDE.md`** (this file) — governance: stack, commands, tiers, constraints.
- **`AGENTS.md`** — quick-start: which files to read for which task.
- **`CONTEXT.md`** — domain vocabulary so agents don't re-derive it.
- **`DESIGN-GLOSSARY.md`** *or* **`design-glossary/`** (if UI) — the textual ubiquitous language for UI. A large glossary is split into `design-glossary/` (read `index.md` first, then the entries you need); see `/Users/tom/Developer/ai-engineering-playbook/v0.4/20-frontend-track.md`.
- **`ui-kitchen-sink.html`** (if UI) — the visual ubiquitous language for UI.
- **`frontend-design-language-guide.html`** (if UI) — the interaction language: application-level principles and surface decision rules (row vs card, drawer vs modal, history disclosure).

## UI rule (if the project has a UI)

When proposing or writing UI code, refer to elements only by names defined in the glossary (`DESIGN-GLOSSARY.md`, or `design-glossary/` when split — read `index.md` first and load only the entries the feature touches), use only styles that exist in `ui-kitchen-sink.html`, and use only surfaces and interaction patterns sanctioned by `frontend-design-language-guide.html`. If a new element, style, or pattern is needed, stop and propose an update to the relevant artefact first (for a split glossary, add a `components/<term>.md` entry and rebuild the index). If any of the three artefacts is missing, run the frontend bootstrap prompt in `/Users/tom/Developer/ai-engineering-playbook/v0.4/20-frontend-track.md` before any UI work.

## Where the playbook lives

The full playbook V0.4 is at `/Users/tom/Developer/ai-engineering-playbook/v0.4/`. The agent reads it for stage definitions, cadence rules, and the `/whats-next` skill.
