# AGENTS.md — Rudy Molt Ideas Portal

> Quick-start index for AI engineering agents. Read **only the files needed for the requested scope**. Don't try to read the whole repo "to understand it first" — that's the enemy of momentum.

---

## Before you do anything

1. Read `/Users/tom/Developer/ai-engineering-playbook/v0.4/AGENT-DIGEST.md` — the playbook entry point.
2. Read `CLAUDE.md` for the project contract — **including its first rule: a feature request routes to stage 01 alignment, never directly to code.**
3. Read `CONTEXT.md` for the domain vocabulary you'll need.
4. Run the prereqs check in `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/00-prereqs.md`.

## Routing — which files to read for which task

| Task | Read first |
|---|---|
| Anything new | `CLAUDE.md`, `CONTEXT.md`, `.playbook-state.yml`, the relevant stage in `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/` |
| New feature | `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/01-align.md` — **mandatory first stop; no source edits before alignment is recorded** |
| Choose a Plan, Build, or Verify model | `/Users/tom/Developer/ai-engineering-playbook/v0.4/93-model-routing-track.md`, then `/model-router` |
| Bug fix | `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/11-debug.md` |
| Refactor | `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/06-architecture.md` |
| UI change | `/Users/tom/Developer/ai-engineering-playbook/v0.4/20-frontend-track.md`, then `DESIGN-GLOSSARY.md`, then `ui-kitchen-sink.html` |
| New screen design | `frontend-design-language-guide.html` (surface decision rules) before choosing components |
| Ship / deploy | `/Users/tom/Developer/ai-engineering-playbook/v0.4/10-process/10-ship-and-deploy.md` |
| "What should I work on?" | Run `/whats-next` |

## Project-specific file pointers

- **Portal source:** `index.html`
- **Published explainers:** one self-contained directory per idea, including `agent-engineering-playbook/`
- **Shared visual assets:** `assets/`
- **Approved design source:** Paper file “Rudy Molt — Ideas Portal Redesign”; distilled rules live in the three root design artefacts
- **Verification:** HTML parsing, local-link checks, responsive browser QA at 390px/768px/1440px, then GitHub Pages canary
- **Deployment:** GitHub Pages publishes the repository root from `main`

## What not to do

- Don't read `archive/`.
- Don't read planning folders of features not currently in `active_features`.
- Don't treat `.playbook-routing/` handoffs as durable feature docs; use them only to resume the named pending route.
- Don't invent vocabulary not in `CONTEXT.md`.
- Don't rewrite a file wholesale unless the user has explicitly asked.
- Don't run the full test suite for a typo fix; don't ship a parser rewrite with only a type-check (see verification ladder in `/Users/tom/Developer/ai-engineering-playbook/v0.4/00-foundations.md` §4).
