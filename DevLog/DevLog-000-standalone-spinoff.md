# DevLog-000: standalone spin-off

| Field | Value |
|---|---|
| Date | 2026-10-28 |
| Status | Done |
| Scope | Spin off PlayGround `20261027_cray` into github.com/jwt625/ipatent, GitHub Pages at outside5sigma.com/ipatent/ |
| Authors | Claude Code, at Wentao Jiang's request |

## Decisions
- Name: product "Interactive Patents"; repo, folder and URL subroute `ipatent`.
- Fresh history: `git archive` of PlayGround commit 4a81d73 (folder `20261027_cray`), 295 files, sha1 identical.
- PlayGround folder frozen at 4a81d73; this repo is canonical from now on.
- Repo created with `gh repo create` (public); license GPL-3.0.
- Pages: legacy branch build from `main` `/`, `.nojekyll`, no CNAME (inherits outside5sigma.com from the user site).
- Listed in PlayGround `readme.md` (spun-off section) and blog `_data/projects.yml`.

## Changes vs the PlayGround copy
- Page title "Patent Figures" -> "Interactive Patents" (template, app.js fallback, and the same string in the built
  `index.html` and `p/*.html`; no rebuild needed, `work/` is not shipped).
- Standalone `.gitignore` (dropped the negations that only beat the PlayGround root ignores), `LICENSE`, `.nojekyll`,
  README header / Deploy / License sections, repo-local skill path note.

## TODO
- [x] Copy + verify checksums
- [x] Standalone files
- [ ] Create repo, push, enable Pages
- [ ] Verify live URL (root, a patent page, interactions)
- [ ] PlayGround readme entry + screenshot
- [ ] Blog projects.yml entry + thumbnail
