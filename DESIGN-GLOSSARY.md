# Design glossary — Rudy Molt Ideas Portal

> Textual source of truth for the portal UI. The approved Paper desktop and
> mobile artboards are the visual reference; this file names their reusable
> parts. Update this glossary and the kitchen sink before introducing a new
> visual term.

## Foundations

### Editorial index

The overall page pattern: a dark, full-width sequence of numbered editorial
sections rather than a conventional marketing landing page or card dashboard.

**Related:** section heading, index row, software plate.

### Soot field

The near-black `#0a0605` default page background.

### Oxblood field

The deep red `#240100` alternate section background used to create cadence
between editorial sections.

### Parchment text

The warm primary text colour `#f4e7c2`; never replace with pure white.

### Muted parchment

Secondary copy colour `#b9a98a`.

### Signal gold

Structural/accent colour `#d5a527` for labels, dividers, borders, and metadata.

### Ember

Interactive accent `#f0c45c` for arrows, active links, and focus states.

## Typography

### Display face

Oxanium, used for headings and project names. Headings are bold, compact, and
slightly tightened; they are never centred.

### Editorial mono

IBM Plex Mono, used for body copy, labels, metadata, and navigation.

### Published document

The reading mode for a complete published path: an identity masthead, an
unboxed guide rail, one calm reading field, persistent previous/next links,
and a restrained editorial footer. It is distinct from the portal's editorial
index mode, but uses the same palette and type.

**Kitchen sink:** `ui-kitchen-sink.html#published-document`.

### Guide rail

An ordered complementary navigation path. Desktop keeps it unboxed and sticky
beside the reading field; tablet places it inline; mobile presents the current
step and a 44px disclosure for the same ordered list. Previous/next links
remain visible even while the mobile path is closed. Route rows keep one shared
44px target and divider rhythm; article-local list margins never alter the rail.
The disclosure exists only at the mobile breakpoint and is absent from layout
and the accessibility tree at tablet and desktop widths. When enhanced, it
closes on Escape and returns focus to its control. Without JavaScript, the
disclosure stays hidden and the complete ordered path remains visible.

**Kitchen sink:** `ui-kitchen-sink.html#guide-rail`.

### Numbered destination row

A whole-row destination with a fixed number or letter lane, a fluid title and
supporting copy lane, and a reserved trailing arrow lane. It replaces cards
when a reader is choosing a published route.

**Kitchen sink:** `ui-kitchen-sink.html#destination-row`.

### Bounded emphasis

An oxblood field with a gold rule, reserved for a decision, caution, handoff,
or a compact interactive outcome. It always includes a visible label; colour
never supplies the meaning alone.

### Responsibility exchange

A labelled HUMAN and AGENT pair separated by an explicit directional handoff.
The human panel uses oxblood emphasis; the agent panel remains a bordered soot
surface. On mobile the exchange stacks vertically with the handoff in between.

**Kitchen sink:** `ui-kitchen-sink.html#responsibility-exchange`.

### Process loop

Numbered neutral stages connected by gold directional rules and an explicit
return path. Mobile recomposes it as a vertical sequence rather than shrinking
the desktop diagram.

**Kitchen sink:** `ui-kitchen-sink.html#process-loop`.

### Ship handoff lanes

Three labelled lanes: AGENT PRE-PR, HUMAN GITHUB, and AGENT POST-MERGE. Gold
arrows show the handoff boundary; the lanes remain individually readable when
stacked on mobile.

**Kitchen sink:** `ui-kitchen-sink.html#ship-handoff-lanes`.

### Local overflow region

A labelled, keyboard-reachable horizontal scroll container for a wide table,
code block, or diagram. It protects the page body from horizontal overflow.

### Eyebrow

Small uppercase mono text with generous tracking, normally signal gold. It
identifies a numbered section or content category.

### Section statement

A large Oxanium heading carrying the section's main idea, such as “Published
paths...” or “RuStack loading...”.

## Components

### Identity lockup

Rudy's circular avatar plus the `RUDY MOLT` wordmark. Desktop may include the
descriptor; mobile keeps only the name.

**Kitchen sink:** `ui-kitchen-sink.html#identity-lockup`.

### Hero plate

The bordered `Ideas` artwork spanning the content width. It preserves the 2:1
artwork ratio and uses no rounded marketing-card treatment.

**Kitchen sink:** `ui-kitchen-sink.html#hero-plate`.

### Section heading

A numbered eyebrow, section statement, and optional right-aligned metadata
above a thin gold divider.

**Kitchen sink:** `ui-kitchen-sink.html#section-heading`.

### Index row

A full-width editorial link containing a numeric index, title, metadata, and
arrow. The left index is the number only: `01`, `02`, `03`, `04`, or `05`.

On mobile it becomes a vertical composition, with the arrow pinned to the top
right and the metadata beneath the title.

**Kitchen sink:** `ui-kitchen-sink.html#index-row`.

### Featured work

The highlighted Playbook entry: image and supporting copy side-by-side on
desktop, reordered into editorial copy then artwork on mobile.

**Kitchen sink:** `ui-kitchen-sink.html#featured-work`.

### Software plate

An image-led link for RuOps, RuChamps, or RuComps with a dark caption overlay.
Desktop shows a large RuOps plate and paired RuChamps/RuComps plates; mobile uses
one large plate followed by two compact split plates.

**Kitchen sink:** `ui-kitchen-sink.html#software-plate`.

### Editorial footer

The closing statement, identity metadata, and restrained external links. It
continues the page rhythm rather than becoming a separate marketing footer. In
a published document, its rule and content use the exact reading-field measure:
tagline left and identity right on desktop/tablet, stacked on mobile.

**Kitchen sink:** `ui-kitchen-sink.html#editorial-footer`.

## Interaction states

### Hover lift

Image plates scale their image by roughly 1%; index-row titles shift to ember.
Motion stays subtle and never changes layout.

### Focus ring

All keyboard-focusable elements use a 2px ember outline with a 4px offset.

### Reduced motion

When `prefers-reduced-motion: reduce` is active, smooth scrolling and
transitions are disabled.

## Rules

- No gradients except functional dark image-caption fades.
- No purple/blue SaaS palette, pill-heavy controls, bubbly cards, or centred
  feature grids.
- No invented rounded component system; current image plates use only the small
  radius documented in the kitchen sink.
- Body copy should remain comfortably readable; compact sizes are reserved for
  labels and metadata.
- Native controls on soot or oxblood explicitly use parchment foreground text;
  browsers' default control colours never define a published-document state.
- Mobile tap targets should reach 44px where the whole row/card is not already
  the target.
- Wording shared between responsive designs must be checked in both Paper
  artboards and in the live DOM.
