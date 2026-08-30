# CI gates — Rudy Molt Ideas Portal

> This static site uses GitHub Pages' native build/deploy workflow. Until a
> repository workflow is added, the author records the local gates below in the
> PR body and GitHub Pages provides the deployment gate.

## Required before merge

| Gate | Project implementation |
|---|---|
| HTML validity | Parse every changed HTML entry point with Python's `html.parser`; malformed markup blocks merge. |
| Local routes and assets | Resolve every relative `href` and `src` from each changed page; missing files block merge. |
| Diff hygiene | `git diff --check` must pass. |
| Responsive UI | For UI changes, verify 390px, 768px, and 1440px widths; require no body overflow and no browser console errors. |
| Design conformance | Compare UI changes with Paper and the three project design artefacts; wording shared across desktop/mobile must be checked in both. |
| Dependency advisories | Not applicable while the site has no package manager or runtime dependencies. Re-enable if a manifest or lockfile is introduced. |
| Secrets | Run a diff-level secret scan before push; never commit `.env`, session data, credentials, or tokens. |
| Acceptance criteria | Record the requested outcome and verification evidence in the PR body. |
| Human authority | The human explicitly authorises live deployment; agents do not force-push or bypass a failing gate. |
| Deployment | GitHub's `pages-build-deployment` workflow must complete successfully for the exact `main` commit. |
| Production canary | Verify `https://rudymolt.github.io/` returns 200, contains the changed content, has no critical console errors, and has no horizontal overflow. |

## Current mapping

- **Host:** GitHub Pages, legacy branch deployment.
- **Source:** `main`, repository root.
- **Build step:** none; tracked static files are published directly.
- **Local preview:** `python3 -m http.server 4173 --bind 127.0.0.1`.
- **Recorded decision:** existing GitHub Pages delivery is preserved rather than
  adding generic framework CI (2026-08-30).

Any future package manager, generator, test framework, or custom Actions workflow
must update this file before it becomes part of the release path.
