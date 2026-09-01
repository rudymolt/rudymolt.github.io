# WikiSkill explainer slices

## Slice 01 — Publish the explainer and homepage entry

Type: AFK
Depends on: nothing
Status: approved

### Demoable outcome

A visitor can open the WikiSkill plain-English explainer from row 05 of the homepage Ideas Index, while a labelled slot reserves space for future GrokBot artwork.

### Work

- Promote the approved planning mockup to `wikiskill/index.html`.
- Remove planning-only review controls and mockup language.
- Correct production-relative links and metadata.
- Add the fifth homepage Ideas Index row and update the entry count.
- Add an accessible, responsive `Artwork pending` placeholder to the new row.
- Extend the existing Index row design contract from `01`–`04` to `01`–`05`.

### Verification target

- The four public seams in `spec.md` pass.
- HTML parses successfully and all local links resolve.
- Browser QA passes at 390px, 768px, and 1440px with no horizontal overflow or broken images.
