# Plan: Making the Playbook Accessible to Coding Newcomers

**Scope** · Hub, Foundations, Process map, Align, Breakdown, Docs lifecycle (Drive Agent and Theory excluded as already working well)
**Date** · 2026-06-06
**Status** · v3 — all decisions resolved (§5); ready to implement in §4 order
**Audience decision** · Readers who have **never written code before**

---

## 1. Diagnosis: why Drive Agent and Theory work and the others don't

The difference is measurable in the source:

| Page | Lines of HTML | Glossary popovers used | Worked examples | Diagrams |
|---|---|---|---|---|
| 50 Drive agent | 1,272 | 32 | Yes (Mission Control / athlete roster) | Yes (contract, loop) |
| 60 Theory | 1,191 | 20 | Yes | Yes |
| 00 Foundations | 119 | **0** | No | No |
| 10 Process map | 96 | **0** | No | No |
| 10.01 Align | 85 | **0** | No | No |
| 10.04 Breakdown | 86 | **0** | No | No |
| 30 Docs lifecycle | 97 | **0** | No | No |
| Hub | 214 | **0** | No | No |

Drive Agent succeeds because of four habits the other pages lack:

1. **Click-to-define jargon.** Every term like "PR" or "branch" is a dotted-underline popover. The glossary (`playbook-glossary.js`, ~50 plain-English entries) is *already loaded on every page* — the weaker pages just never use it. The "Tip: words with a dotted underline…" box also only appears on §50 and §60.
2. **"Say:" framing.** It tells the reader the exact sentence to type, then explains what happens.
3. **One running story.** A concrete feature makes every abstract idea tangible.
4. **Diagrams.** The human/agent contract and the five-stage loop are drawn, not just described.

The weaker pages are thin interactive shells: a row of buttons whose payoff is one or two sentences of *denser* jargon than the question. A newcomer clicks "Greenfield" on the Align page and gets `/office-hours -> /plan-ceo-review -> /grill-with-docs` — three slash commands with no explanation of what a slash command even is.

A structural problem compounds this: **the guide path puts the hardest pages first.** A newcomer following "Step 1 of 8" meets Foundations, Process map, Align, and Breakdown (the terse pages) before reaching Drive Agent (the friendly one) at step 6. **Decision: reorder for everyone (C6).**

---

## 2. Cross-cutting fixes

### C1 · Wire the existing glossary in — the cheapest, highest-value fix

The popover JS and 50 definitions already ship on every page. Mark up terms with the existing pattern (`<button class="term" data-def="slice">slice</button>`) on all weak pages, and copy §50's "dotted underline" tip box to the top of each. Terms needing it most: TDD, ADR, CONTEXT.md, slice, branch, PR, refactor, doc-close, mockup, regression test, triage, canary.

Terms used on weak pages with **no glossary entry yet**: *grill*, *vocabulary drift*, *greenfield*, *seam*, *editability tier*, *demoable*, *horizontal slice*, *slash command / skill*, *PRD*, *staff-engineer review*, *devex*.

**New for the never-coded audience** — add a bedrock tier of entries the current glossary assumes: *code*, *database*, *server*, *UI / frontend*, *logic / backend*, *deploy*, *production*, *bug*, *issue tracker*, *terminal*.

### C2 · Jargon policy (decision 6)

The guide's job is to make readers *fluent* in real engineering language, not to shield them from it:

- **Real industry terms** (PR, TDD, smoke test, canary, regression) — keep, always popover-defined, never replaced with invented friendlier names.
- **Playbook-coined terms** (smoke floor, doc-close, grill) — keep, define, and tag the popover "(playbook term)" so readers know not to expect it elsewhere. "Smoke floor" gets its origin explained: from *smoke test* — switch it on and check nothing visibly smokes; the floor is the minimum set of those checks.
- **One-off insider phrases** with no reuse value ("incident archaeology") — replace with plain English.

### C3 · A "what is a slash command?" explainer box

`/grill-with-docs`, `/autoplan`, `/whats-next` appear with zero context. Add one reusable callout (Align page first, linked from Process map): slash commands are *skills* — instruction packs installed into the agent (from Matt Pocock's skills and GStack). The reader never types them; plain sentences trigger them. Names are shown so you can recognise what the agent is doing.

### C4 · A second running story: the booking form (decision 2)

§50 keeps its athlete-roster story untouched. The five weak pages get a **booking form** thread — universally recognisable, no sports knowledge needed:

- **Align**: the agent grills "I want people to book a session online" — what happens to double bookings? can people cancel?
- **Breakdown**: the feature cut into three slices — *user can see free slots* → *user can book a slot* → *user gets a confirmation email*.
- **Foundations**: one source of truth = bookings live in one table; the calendar screen and the confirmation email both read from it, neither keeps its own copy.
- **Docs lifecycle**: the fate of the three documents the booking build created.

### C5 · "What you type" before "what it's called"

Newcomers act through sentences, not stage names. Every routing answer leads with the sentence:

> **You type:** "I want to build [feature]."
> **What happens:** the agent goes to Align and questions the plan before writing code.
> *(Internally this is Stage 01 and the `/grill-with-docs` skill.)*

### C6 · Reorder the guide path for everyone (decision 4)

Single new order, story-first. Filenames and §-numbers stay (renaming breaks links); only the timeline labels and prev/next links on all 8 pages change:

| Step | Page | Why here |
|---|---|---|
| 1 | Hub | Orientation + primer |
| 2 | Drive agent (§50) | See the whole workflow as a story; absorb vocabulary |
| 3 | Process map (§10) | The loop you just watched, as a map |
| 4 | Align (§10.01) | First everyday tool, in process order |
| 5 | Breakdown (§10.04) | Second everyday tool |
| 6 | Foundations (§00) | The principles, now that they have referents |
| 7 | Theory (§60) | Why it works |
| 8 | Docs lifecycle (§30) | Reference |

### C7 · Make widget content scannable, not click-gated

Auto-select the first option on load in choice panels (explainers already do this), and add a "Show all answers" toggle that expands everything into a list — for scanning, search, and print.

### C8 · Mini-quizzes (decision 5)

Add a small shared quiz component to `playbook-docs.js` (`data-quiz`: one question, 3–4 options, instant feedback, explanation always shown, no scoring/persistence). One per page:

- **Process map**: "A user says 'the app crashes when I click save' — where does this route?"
- **Align**: "You have a brand-new project idea — which alignment tool first?"
- **Breakdown**: "Which of these four tickets is a vertical slice?"
- **Foundations**: "You fixed a typo in a comment — how much checking does it need?"
- **Docs lifecycle**: "The build's plan-notes.md after ship — what happens to it?"

Mock of the component:

```
┌─ Check yourself ────────────────────────────────────────────────┐
│ Which of these is a vertical slice?                             │
│  ( ) Build the database tables for bookings                     │
│  ( ) Build all five booking screens                             │
│  (●) User can book one slot and see it confirmed                │
│  ( ) Rewrite the whole booking system                           │
│ ✓ Right — it cuts through screen, logic, data and tests, and    │
│   you could demo it. The others build one layer or everything.  │
└─────────────────────────────────────────────────────────────────┘
```

### C9 · Diagrams ship as styled HTML/SVG (decision 3)

All diagrams below are drafted in ASCII for this plan but will be built as HTML/SVG matching §50's existing diagram style (same palette, fonts, responsive behaviour).

### C10 · Absolute-beginner primer (decision 1)

A short "Never written code? Two minutes of background" block on the hub: what code is, what a repo is, what a database/server/UI are, what a test is, what deploying means — eight definitions, each one sentence, reusing the new bedrock glossary entries. Everything else in the guide then has a floor to stand on.

### C11 · A browsable glossary page

Generate `glossary.html` from `PLAYBOOK_GLOSSARY` (one loop of JS, near-zero maintenance), grouped into *Bedrock* / *Everyday* / *Playbook terms*, linked in the nav.

---

## 3. Page-by-page changes

### 3.1 Hub (`index.html`)

1. One-paragraph plain-English framing above the fold: *"You describe what you want in normal sentences. The agent writes the code. These guides teach you what to say, when to pause it, and how to check its work."*
2. The primer block (C10) directly below it.
3. Reordered guide path (C6) with a "Start the guided path →" button to §50.
4. Re-caption the "Choose What You Need" cards in reader language — e.g. "Design slices" → "Cut a feature into pieces small enough to check one at a time".
5. Tag each card: `[start here]`, `[everyday use]`, `[reference]`.

```
┌──────────────────────────────────────────────────────────────┐
│  AI Engineering Playbook                                     │
│  You talk. The agent codes. You stay in charge.              │
│                                                              │
│  ┌─ Never written code? ─────────────────────────────────┐   │
│  │ Two minutes of background: code · repo · database ·   │   │
│  │ server · UI · test · deploy · production              │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
│  [ Start the guided path → ]   (begins with the story of     │
│                                 one feature, start to ship)  │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Foundations (`00-foundations.html`)

1. **Analogies for the four architecture cards.** E.g. one source of truth = "one master calendar; every printout copies from it; nobody edits a printout and expects the wall calendar to change" — then the booking-form version (C4).
2. **Reframe the pitfall checklist** from the human's seat: *"Before you accept the agent's work, check that it…"* — each item with a one-line failure example ("inventing a domain rule" → *the agent decided bookings can be cancelled up to two hours before, without asking you*).
3. **Draw the verification ladder** (SVG):

```
 more risk ▲
           │ 5 ▓ Auth, payments, deploys   → everything below + security
           │   ▓                             review + watched rollout
           │ 4 ▓ Change crossing modules   → tests + browser check
           │ 3 ▓ New behaviour             → write the test first (TDD)
           │ 2 ▓ Tidy-up of one file       → typecheck + existing tests
           │ 1 ▓ Typo                      → just look at it and save
           ▼
            Match the checking effort to what a mistake would cost.
```

4. Glossary-link: TDD, module, interface, refactor, CONTEXT.md, source of truth.
5. Quiz: typo rung (C8).

### 3.3 Process map (`10-process/index.html`)

1. **Actually draw the map** (SVG loop with side-exits):

```
   ┌────────────────────────── next feature ◄─────────────────────┐
   ▼                                                              │
 ALIGN ──► CONTEXT ──► PRD ──► SLICE ──► BUILD ──► REVIEW ──► QA ──► SHIP
 (agree     (write     (one    (cut it  (one      (check    (try it    │
  the plan)  terms      page    up)      slice     the       for       ▼
             down)      spec)            at a      code)     real)   RETRO
                                         time)                     (lessons)
            side doors: TRIAGE "what's next?" · ARCHITECTURE
            "code feels messy" · DEBUG "something broke"
```

2. **Group the 13 stages into 4 phases**: *Agree* (00–03), *Cut up* (04–06), *Build & check* (07–09), *Ship & learn* (10–12).
3. **Mark the beginner core.** Badge Align, Breakdown, Build, Review, Ship as `[the everyday five]`; the rest `[the agent mostly handles this]`.
4. **De-jargon routing answers** using the C5 pattern.
5. Stage cards each get one concrete booking-form example line.
6. Quiz: route the crash report (C8).

### 3.4 Align (`10-process/01-align.html`) — highest priority page

1. Slash-command explainer box (C3) at the top.
2. **Restructure each tool card**:

```
┌─ Your screen/UI is changing ────────────────────────────────────┐
│ YOU TYPE      "Before we code, make a mockup."                  │
│ WHAT HAPPENS  The agent builds a fake HTML version of the       │
│               screen so you react to a picture, not a           │
│               description.                                      │
│ DONE WHEN     You've said "yes, build that" to a mockup.        │
│ (skill: /plan-design-review)                                    │
└─────────────────────────────────────────────────────────────────┘
```

3. **A 6–8 line sample grilling dialogue** for the booking form (C4): user asks for the feature, agent asks "what happens if two people pick the same slot?" and "can people cancel?", user answers, agent records *slot* and *booking window* in CONTEXT.md.
4. Reword exit criteria: "Every meaningful branch has an answer" → "Every open question has an answer or a written 'not now'."
5. Quiz: pick the tool for a greenfield idea (C8).

### 3.5 Breakdown (`10-process/04-breakdown.html`)

1. **Lead with the layer-cake diagram** (SVG):

```
        HORIZONTAL (wrong)                 VERTICAL (right)
  ┌───────────────────────────┐     ┌────┬──────────────────────┐
  │ UI     ████████████████   │     │ ██ │                      │
  │ Logic  (nothing yet)      │     │ ██ │   rest of the cake,  │
  │ Data   (nothing yet)      │     │ ██ │   one slice at a     │
  │ Tests  (nothing yet)      │     │ ██ │   time, later        │
  └───────────────────────────┘     └────┴──────────────────────┘
  "All five booking screens        "User can book one slot and
   built, none of them save         see it confirmed — screen,
   anything"                        logic, database, and a test,
                                    all working"
```

2. **Annotate every checklist item** with a plain rewrite + example:
   - "Independently grabbable" → *someone else (or a second agent) could pick this up without waiting on other unfinished work*.
   - "Tagged AFK or HITL" → *marked either 'agent can finish alone' or 'will need to stop and ask me something'*.
   - "Depends on #NNN" → *#NNN is just an issue number, e.g. "depends on #12"*.
3. **Show the booking feature cut into 3 slices** (C4) so "Common Wrong Cuts" has a right cut to contrast against.
4. Quiz: spot the vertical slice (C8).

### 3.6 Docs lifecycle (`30-document-lifecycle.html`)

1. **Open with the journey of one document** (SVG):

```
  feature starts                 feature ships (doc-close)
       │                                 │
       ▼                                 ▼
  plan-notes.md ──── used daily ────► what now?
                                        ├─► decision that's hard to undo → ADR (keep)
                                        ├─► words everyone now uses → CONTEXT.md (keep)
                                        └─► the rest → archive/ (out of the agent's
                                                       sight, but not deleted)
```

2. **Recognisable descriptions on classifier options**: "Planning notes or prompt scratchpad" → add *("the to-do list and thinking-out-loud notes from the build")*.
3. Define **tier** at first use; output text "Tier 1: ephemeral" → "Tier 1 — temporary (archive it at ship)".
4. Replace "incident archaeology" with "digging into how an old bug was introduced" (per C2: one-off insider phrase, not industry jargon).
5. Quiz: fate of plan-notes.md (C8).

---

## 4. Suggested order of work

| Priority | Item | Effort | Notes |
|---|---|---|---|
| 1 | C1 glossary wiring + tip box on 5 pages; new bedrock + missing entries | Small | Infrastructure exists; pure markup + JS data |
| 2 | C6 reorder guide path | Small | Touches timeline markup on all 8 pages |
| 3 | Align restructure (3.4) + slash-command box | Medium | Worst page, gateway to the process |
| 4 | Quiz component (shared JS) + Breakdown page (3.5, layer-cake SVG) | Medium | Component built once here, reused everywhere |
| 5 | Process map: loop SVG, 4 phases, badges, quiz (3.3) | Medium | |
| 6 | Hub: framing, primer, new path (3.1) | Small–medium | |
| 7 | Foundations (3.2) | Medium | |
| 8 | Docs lifecycle (3.6) | Small | |
| 9 | Glossary page (C11), show-all toggles (C7) | Small | Polish |

---

## 5. Decisions from review (2026-06-06)

1. **Audience**: never written code before → bedrock glossary tier + hub primer (C10).
2. **Second story**: booking form, threaded through the five weak pages; athlete roster stays on §50 (C4).
3. **Diagrams**: HTML/SVG matching the site style; ASCII only in this plan (C9).
4. **Guide path**: reorder for everyone, story-first (C6).
5. **Quizzes**: yes — one "check yourself" per weak page (C8).
6. **Jargon**: keep real engineering terms and explain them; tag playbook-coined terms; replace only one-off insider phrases (C2). "Smoke floor" stays, with its smoke-test origin explained.

7. **Primer**: inline block on the hub (C10).
8. **Story flavour**: session booking — familiar to the audience, understandable to anyone (C4).
9. **Quiz feedback**: explanation shown on every answer, right or wrong (C8).
