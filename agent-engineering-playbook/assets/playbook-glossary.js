/*
  Playbook glossary.
  Each entry: { title, def, group }
  group: "bedrock"  - absolute basics for readers who have never written code
         "everyday" - real industry terms, used everywhere in engineering
         "playbook" - terms this playbook coined; tagged in the popover so
                      readers know not to expect them elsewhere
  Entries without a group default to "everyday".
*/
window.PLAYBOOK_GLOSSARY = {
  /* ---- Bedrock: never-written-code-before basics ---- */
  code: {
    title: "Code",
    def: "Instructions written by people (or agents) that tell a computer exactly what to do. An app is made of thousands of lines of it.",
    group: "bedrock"
  },
  database: {
    title: "Database",
    def: "Where an app stores its information permanently - like a collection of spreadsheets that the code can read and write.",
    group: "bedrock"
  },
  server: {
    title: "Server",
    def: "A computer running somewhere else that answers requests from the app - when you book something online, a server records it.",
    group: "bedrock"
  },
  ui: {
    title: "UI / frontend",
    def: "The part of the app you can see and touch: screens, buttons, and forms.",
    group: "bedrock"
  },
  backend: {
    title: "Logic / backend",
    def: "The part of the app you cannot see: the rules and data-handling that run behind the screens.",
    group: "bedrock"
  },
  deploy: {
    title: "Deploy",
    def: "Putting a new version of the app live so real people can use it.",
    group: "bedrock"
  },
  production: {
    title: "Production",
    def: "The live version of the app that real users are using right now - as opposed to a private copy used for building and testing.",
    group: "bedrock"
  },
  bug: {
    title: "Bug",
    def: "Anything the app does that it should not do - from a typo on screen to a full crash.",
    group: "bedrock"
  },
  issuetracker: {
    title: "Issue tracker",
    def: "A shared to-do list for the project where every task or bug gets a numbered ticket, like #12.",
    group: "bedrock"
  },
  terminal: {
    title: "Terminal",
    def: "The text window where you type commands to a computer (or to the agent) instead of clicking buttons.",
    group: "bedrock"
  },

  /* ---- Everyday engineering terms ---- */
  adapter: {
    title: "Adapter",
    def: "A thin layer at the edge of the system whose only job is to translate between the outside world and the canonical internal form."
  },
  adr: {
    title: "ADR",
    def: "Architecture Decision Record - a one-page note explaining why a hard-to-reverse choice was made, so future-you does not have to guess."
  },
  afkhitl: {
    title: "AFK / HITL",
    def: "AFK = away from keyboard: the agent can finish this alone. HITL = human in the loop: it needs a person's input partway through."
  },
  atomiccommit: {
    title: "Atomic commit",
    def: "One commit that captures a single, complete change - the slice plus its tests - so it can be understood or undone as one unit."
  },
  ballofmud: {
    title: "Ball of mud",
    def: "Slang for a codebase so tangled that no part can be changed safely without risking breakage somewhere else."
  },
  benchmark: {
    title: "Benchmark",
    def: "A baseline measurement of how fast or reliable something is, so you can tell if a change made it better or worse."
  },
  branch: {
    title: "Branch",
    def: "A safe parallel copy of the code where you can build something without affecting the main version."
  },
  browsercheck: {
    title: "Browser check",
    def: "Opening the actual app in a browser to look at the real screen, not just trusting the code or the tests."
  },
  build: {
    title: "Build",
    def: "Turning the source code into the runnable app. A failed build usually means a syntax or wiring error."
  },
  canary: {
    title: "Canary",
    def: "Watching new code closely in production right after release, ready to pull it back at the first sign of trouble."
  },
  ci: {
    title: "CI",
    def: "Continuous Integration - automated checks that run every time you push, to catch problems before a human looks."
  },
  commit: {
    title: "Commit",
    def: "A saved snapshot of your changes with a short message describing what they do."
  },
  demoable: {
    title: "Demoable",
    def: "Something you could show working to another person - click the button, see the result - rather than progress you have to take on faith."
  },
  designreview: {
    title: "Design review",
    def: "A check of how a screen looks and behaves - layout, spacing, and how it holds up at different screen sizes."
  },
  devex: {
    title: "Devex",
    def: "Developer experience - how quick and pleasant something is for a developer to use: clear errors, good docs, a fast first success."
  },
  diff: {
    title: "Diff",
    def: "The exact list of lines that were added, removed, or changed between two versions."
  },
  draftpr: {
    title: "Draft PR",
    def: "A pull request marked not ready to merge yet - used to share work in progress without inviting the merge button."
  },
  featurebranch: {
    title: "Feature branch",
    def: "A branch made specifically to build one feature on. It exists until the work is merged, then is thrown away."
  },
  github: {
    title: "GitHub",
    def: "The website where the team's code, pull requests, and review discussions live."
  },
  greenfield: {
    title: "Greenfield",
    def: "A brand-new project with no existing code - a green field with nothing built on it yet."
  },
  headinghierarchy: {
    title: "Heading hierarchy",
    def: "The nested structure of titles and subtitles. It should match what the eye sees, which also lets screen readers navigate the page."
  },
  horizontalslice: {
    title: "Horizontal slice",
    def: "Cutting work by layer - all the screens first, or all the database first. Looks tidy, but nothing actually works until every layer is done. The opposite of a vertical slice."
  },
  interface: {
    title: "Interface",
    def: "The way you use a module from outside - its buttons and dials - as opposed to the machinery hidden behind them."
  },
  ladder: {
    title: "Verification ladder",
    def: "A simple rule that scales how hard you check a change to how costly it would be to get wrong.",
    group: "playbook"
  },
  main: {
    title: "main",
    def: "The shared, live version of the code that everyone works from. Nothing in main should be broken."
  },
  merge: {
    title: "Merge",
    def: "Combining the changes from one branch into another - usually pulling finished work into main."
  },
  mockup: {
    title: "Mockup",
    def: "A drawing or fake version of the screen, used to agree what something should look like before real code is written."
  },
  module: {
    title: "Module",
    def: "A self-contained piece of the program that does one job, with a defined way of being used from outside."
  },
  nontrivial: {
    title: "Non-trivial",
    def: "Not a tiny one-line fix - a real piece of work big enough to deserve the full process: branch, tests, and PR."
  },
  pr: {
    title: "Pull request (PR)",
    def: "A proposal to add changes to the main code. A person has to review and accept it before it lands."
  },
  prd: {
    title: "PRD",
    def: "Product Requirements Document - a one-page description of what a feature should do, written before building starts."
  },
  productcall: {
    title: "Product call",
    def: "A decision about what something should do, not how to build it. Those decisions belong to the human project owner."
  },
  publicinterface: {
    title: "Public interface",
    def: "The official, supported way to use a piece of code - its front door - rather than reaching into its internal wiring."
  },
  push: {
    title: "Push",
    def: "Uploading your local commits to GitHub so the rest of the world, and the PR, can see them."
  },
  redgreen: {
    title: "Red / green",
    def: "A failing test is red; once code makes it pass it turns green. Test-first work goes red, then green, then tidy-up."
  },
  refactor: {
    title: "Refactor",
    def: "Rewriting code so it is cleaner or easier to change, without changing what it actually does."
  },
  regression: {
    title: "Regression test",
    def: "A test added after fixing a bug, so that exact bug is caught automatically if it ever reappears."
  },
  repo: {
    title: "Repo",
    def: "Short for repository - the folder where the project's code and its full history live."
  },
  retro: {
    title: "Retro",
    def: "Short for retrospective - a brief review after a piece of work to capture what went well and what to do differently."
  },
  seam: {
    title: "Seam",
    def: "A natural joint in the code where two parts meet and can be separated cleanly - a good place to cut, test, or change."
  },
  slashcommand: {
    title: "Slash command / skill",
    def: "A pre-written instruction pack installed into the agent. You never type these - your plain sentences trigger them. The names (like /autoplan) are shown so you can recognise what the agent is doing."
  },
  slice: {
    title: "Slice (vertical slice)",
    def: "A small piece of the feature that works end-to-end, from screen to database, rather than building one whole layer first."
  },
  sourceoftruth: {
    title: "Source of truth",
    def: "The one canonical place a piece of data lives. Everything else reads it or works it out from there - never keeps its own rival copy."
  },
  staffreview: {
    title: "Staff-engineer review",
    def: "A code review done at the standard of a very senior engineer: architecture, naming, and edge cases - not just 'does it run'."
  },
  tdd: {
    title: "Test-driven development (TDD)",
    def: "Writing a small test describing the desired behaviour before writing the code that satisfies it."
  },
  test: {
    title: "Test",
    def: "A small piece of code that automatically checks a bit of your app behaves the way it should."
  },
  touchtarget: {
    title: "Touch target",
    def: "The tappable area of a button or link. Roughly 44 pixels square is the floor for it to be comfortable to hit on a phone."
  },
  tracerbullet: {
    title: "Tracer bullet",
    def: "A single thin feature built all the way through every layer, so you can see it work end-to-end and adjust."
  },
  trunk: {
    title: "Trunk",
    def: "Slang for the main branch - the trusted, shared version everyone builds from."
  },
  typecheck: {
    title: "Typecheck",
    def: "A quick automated check that you are using data of the right shape - catches lots of bugs without running the app."
  },
  urlstate: {
    title: "URL state",
    def: "When the web address itself remembers which drawer, filter, or tab you have open - so a refresh or shared link lands you back in the same place."
  },
  vocabdrift: {
    title: "Vocabulary drift",
    def: "When the same thing gets different names in different places (booking / reservation / appointment), which confuses humans and agents alike."
  },

  /* ---- Playbook-coined terms ---- */
  contextmd: {
    title: "CONTEXT.md",
    def: "A file holding the project's glossary of real-world terms, so the agent uses your exact words everywhere.",
    group: "playbook"
  },
  designartefacts: {
    title: "The three design artefacts",
    def: "The three files that own a project's visual language: the design glossary (what each UI term means), the kitchen sink (what each component looks like), and the design-language guide (which surface to use when). UI code may only use what they sanction.",
    group: "playbook"
  },
  designglossary: {
    title: "Design glossary",
    def: "A file (DESIGN-GLOSSARY.md) defining every UI term the project uses - pill, container, primary button - exactly once, so humans and agents mean the same thing by the same word.",
    group: "playbook"
  },
  designinterview: {
    title: "Design interview",
    def: "A set of questions the agent asks at project kickoff - colours, type, spacing, default layouts, change surfaces, viewports - whose answers all land in the three design artefacts rather than staying in the chat.",
    group: "playbook"
  },
  designlanguageguide: {
    title: "Design-language guide",
    def: "An HTML file holding the interaction rules of the UI: application-level principles and a decision table saying which surface (row, drawer, modal, dedicated page) fits which job. The kitchen sink shows what a drawer looks like; the guide says when a drawer is the right answer.",
    group: "playbook"
  },
  docclose: {
    title: "Doc-close",
    def: "The tidy-up at ship: lasting decisions and vocabulary move into permanent docs, finished planning notes get archived, and the cleanup is committed on purpose.",
    group: "playbook"
  },
  editabilitytier: {
    title: "Editability tier",
    def: "A label that says how safe a file is to edit: active source, generated output, frozen reference, or archive.",
    group: "playbook"
  },
  gbrain: {
    title: "GBrain",
    def: "The agent's long-term memory that persists across sessions and projects, so lessons learned are not forgotten next time.",
    group: "playbook"
  },
  grill: {
    title: "Grill",
    def: "A deliberately tough question-and-answer session in which the agent challenges your plan before any code is written, hunting for gaps and contradictions.",
    group: "playbook"
  },
  kitchensink: {
    title: "Kitchen sink",
    def: "A single HTML page (ui-kitchen-sink.html) showing every approved UI component live in the browser - the visual twin of the design glossary. If a style isn't in the kitchen sink, the code shouldn't be using it.",
    group: "playbook"
  },
  playbook: {
    title: "The playbook",
    def: "This collection of guides - the process the agent follows on every project.",
    group: "playbook"
  },
  playbookstate: {
    title: ".playbook-state.yml",
    def: "A small file in the project recording which playbook version it was set up with, when it was last upgraded, and explicit decisions like 'this project has no UI' - so the agent doesn't re-ask settled questions.",
    group: "playbook"
  },
  smokefloor: {
    title: "Smoke floor",
    def: "From 'smoke test' - switch it on and check nothing visibly smokes. The floor is the minimum set of those quick checks a screen must pass before it counts as done - a floor, not a full test plan.",
    group: "playbook"
  },
  surface: {
    title: "Surface",
    def: "Where a piece of UI work happens: an inline row, a slide-out drawer, a pop-up modal, or a dedicated page. The design-language guide owns the rules for which surface fits which job.",
    group: "playbook"
  },
  triggerphrase: {
    title: "Trigger phrase",
    def: "A short, standard thing you type to start a stage. The agent recognises the phrase and runs the right process.",
    group: "playbook"
  },
  upgradeproject: {
    title: "/upgrade-project",
    def: "A skill that brings a project set up under an older playbook version up to date: it reads the project's recorded version, walks the changelog, and applies changes carefully - copying new files, patching boilerplate with diffs shown, and only proposing changes to content you wrote.",
    group: "playbook"
  }
};
