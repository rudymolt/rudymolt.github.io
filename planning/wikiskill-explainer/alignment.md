# WikiSkill plain-English explainer — alignment

Status: approved
Approved: 2026-09-01
Source: [WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution](https://arxiv.org/html/2608.27454)

## Goal

Publish a concise, source-faithful published path explaining how WikiSkill turns agent experience into persistent knowledge and validated skills, and what the research does and does not prove.

## Audience

Curious AI users and builders who understand “agent” and “skill” conversationally but do not need machine-learning research knowledge, equations, or benchmark familiarity.

## Approved scope

- One dedicated `wikiskill/index.html` published path plus a fifth Ideas index row.
- Roughly a six-minute read with an “In 30 seconds” summary, six numbered editorial sections, two simplified diagrams, and only decision-useful statistics.
- Redraw the three-layer architecture and evolution loop in the RudyMolt red and gold visual language, crediting the paper rather than embedding screenshots.
- Cover the problem, Raw/Wiki/Skills layers, evolutionary loop, headline results, transfer caveat, limitations, and source notes.

## Non-goals

- Reproduce equations, appendices, full result tables, or every baseline.
- Provide an implementation tutorial or runnable WikiSkill system.
- Present the Wiki Layer as information the task-running agent reads directly.
- Claim all models, tasks, or transferred skills improve.
- Generalise benchmark evidence to production reliability, safety, or autonomous self-improvement.
- Redesign the Ideas portal or introduce a generic card-based visual language.

## Accuracy rules

- Treat arXiv v1, dated 27 August 2026, as the canonical source.
- Say “percentage points,” not “percent better,” for score differences.
- Attach every number to its model, benchmark, baseline, and experimental condition.
- Distinguish highest average per evaluated model from best on every model–dataset pair.
- Label the wiki-access result as a Gemini-3.5-Flash ablation over four benchmarks.
- Pair positive cross-model transfer evidence with the negative-transfer caveat.
- Separate authors’ findings from their hypotheses.

## Approved responsive sketch

```text
SOOT FIELD
┌─────────────────────────────────────────────────┐
│ RUDY MOLT                         Paper ↗        │
│ PLAIN-ENGLISH EXPLAINER                         │
│ How agents turn experience into better skills  │
└─────────────────────────────────────────────────┘

OXBLOOD FIELD
┌─ In 30 seconds ─────────────────────────────────┐
│ Three concise takeaways                         │
└─────────────────────────────────────────────────┘

01 / The missing memory
02 / Three layers       RAW → WIKI → SKILLS
03 / How it learns      run → distil → propose → test ↺
04 / What improved      three carefully labelled results
05 / Transfer caveat    reusable method ≠ model workaround
06 / What remains open  limitations and interpretation
07 / Source             paper details and link
```

At 1440px the diagrams may run horizontally. At 768px the hierarchy remains without side navigation or wide tables. At 390px the layers and loop stack vertically, links keep a 44px target, and the body must not overflow horizontally.

## Durable vocabulary and decisions

No new portal domain term or hard-to-reverse architecture decision is introduced. Paper-specific terms remain content vocabulary inside this published path, so `CONTEXT.md` and ADRs do not change.
