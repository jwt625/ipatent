# DevLog-007: batch 005 (66 -> 120 patents)

| Field | Value |
|---|---|
| Date | 2026-11-25 |
| Status | Ingestion |
| Scope | Propose and ingest 54 new patents (expired preferred), reusing cached candidates from earlier rounds; commit and push |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-25)
"let's plan to ~double it again, to 120 patents. Go repeat similar research, reuse the candidates if possible. And then cache and
ingest them."

Answer to the one up-front question (2026-11-25): run the ingestion as a Workflow again, reusing the batch-004 script.

## Plan
1. Research: 4 parallel subagents as in DevLog-004 (landmark lists; forums and articles; blog topics; Bell Labs and other industrial
   labs), each oversupplies 18-25 candidates with evidence and endorses items of the cached pool. No Google / USPTO requests from agents.
2. Reuse: the 86 PDFs cached in `work/_research/pdf/` and not ingested (batch-004 reserves, DevLog-001 leftovers, other research
   hits). OCR inventory of the 74 with 30 pages or fewer: printed header, sheet count.
3. Fetch new picks centrally (`pipeline/fetch.py --uspto`, 5 s pacing), OCR-inventory them the same way.
4. Select 54: expired, drawings present, no duplicates, light drawing load, reuse first. List and evidence in `research/batch-005.md`.
5. Stage 1 for all + meta.json (group, term status); Google pages cached (8 s pacing) for text cross-checks.
6. Workflow (batch-004 script): text + figure-table agents per patent, tracers packed by complexity, max 10 concurrent.
7. Build, self-test, screenshots, fresh-context audits per group; README rows; commit and push.

## TODO
- [x] Research candidates (4 agents, about 120 candidates)
- [x] OCR inventory of the cached pool
- [x] Fetch + inventory new picks (52 PDFs)
- [x] Select 54 (list in `research/batch-005.md`, written at the end with the evidence)
- [x] Stage 1 + meta + Google pages for all 54
- [ ] Workflow: text + figure tables + traces (46 of 54 fully traced, 2026-11-25 23:10; paused for the usage window)
- [x] Build + self-test for 13 more (gallery 112), committed and pushed 2026-11-25
- [x] Build + self-test + screenshots for the 33 finished patents (gallery 99; `--complete` keeps the 21 unfinished out)
- [ ] Audits
- [ ] Remaining 21 patents traced, README rows, final commit and push (the finished 33 committed and pushed 2026-11-25)

## Progress
- 2026-11-25: 3 of 4 research agents back: landmark lists 35 candidates, blog topics 29, industrial labs 29 (files in the session
  scratchpad, merged into `research/batch-005.md` at selection). Agents could not open uspto.report / Justia / freepatentsonline
  (403), so sheet counts come from the central OCR inventory.
- 2026-11-25: OCR inventory of 74 cached pool PDFs (30 pages or fewer): printed headers confirm identity; about 55 are light
  (1-6 sheets) landmark candidates.
- 2026-11-25: forums agent back (25 + 16 overflow). 52 new candidate PDFs fetched from USPTO (`fetch.py --uspto`, 5 s pacing, 0 errors),
  OCR-inventoried: every printed header matches the expected number, title and inventor.
- 2026-11-25: 54 selected, PDFs copied to `sources/`, `pipeline/extract.sh` for all (2-23 pages each). Google pages cached for all 54
  (8 s pacing, 0 errors). `meta.json`: `col1_page` = first page with more than 600 OCR words (text agents confirm); term status from
  the statutory rules: 14 years from grant before 1861 (Lincoln), 17 from grant, later of 17 and 20 from filing when in force on
  1995-06-08 (8 patents; US 4,725,110 counts 20 years from its 1984-08-13 parent, front page [63]). Grants before 1898 could end with an
  earlier foreign patent (R.S. 4887): noted in the basis, not checked (7 patents). Google lists US 3,789,832 expiring 1992-02-24,
  statute gives 1991-02-05: audit to check. US 4,958,898 "Expired - Fee Related" and US 5,374,564 "Ceased" on Google: noted.
- 2026-11-25: `build.py` GROUPS gains Radio and television, Computing and cryptography, Science and medicine, Electric light and power
  (before Forum favorites).
- 2026-11-25 05:05 PT: workflow stopped by the weekly usage limit (resets 19:00): 312 agents, 40.1M subagent tokens.
  53 of 54 text agents done (US 223,898 blocked by the API content filter, not the limit), all 54 figure tables done,
  115 of 204 tracer agents done; the other 88 failed on the limit.
- 2026-11-25 09:50 PT: 33 of 54 fully traced (220 figures), registered in the gallery and pushed; the 21 unfinished stay out.
  `build.py` gains `--complete`, which skips a patent with any untraced figure so a part-finished batch cannot enter the gallery.
  `--complete --only <33>` built 99 patents (6.28 MB); `pipeline/selftest.sh` PASS on the gallery and all 33 pages
  (desktop, figures/hover/parts tour, plot export, description/claims/about); screenshots of 3413573 FIG. 1, 1773980 FIG. 2 and
  1113149 FIG. 1 checked. Open issues: 1113149 and 395782 print uppercase lettered parts (A, C^{2}), so their description has no
  linked refs (`lettered()` only matches lowercase; same as 174,465) and the parts panel shows `C^{2}` literally (`esc`, not `subsup`).
- 2026-11-25 20:35 PT: limit reset; same run resumed (`resumeFromRunId`), finished agents replay from cache, the 88 refused tracers
  and the content-filtered text agent run again for the remaining 21 patents.
- 2026-11-25 23:10 PT: paused at the user's request (5 h usage window); workflow stopped at 22:55. The resume cache is positional,
  so the replay re-ran 189 tracers, including those of the 33 committed patents: 76 of their traces rewritten by finished tracers.
  Old vs new `coverage.py` (net covered minus off-scan): 34 better, 41 same, 1 worse (1860123 FIG. 4, 99.6 / 0.0 -> 97.5 / 1.2 %):
  committed version kept, re-trace saved aside; the other 75 taken. US 223,898 text agent blocked by the content filter again
  (20:33-20:37), likely the recitation filter on a famous verbatim text: next try builds paragraphs by script from OCR line ranges.
- 2026-11-25 23:10 PT: 13 more patents complete (1061206, 1219881, 207559, 2495429, 2525352, 2612994, 2736880, 3005282, 4405829,
  465588, 6469, 748626, 1948384; 99 figures). 1948384 FIG. 5 was written by a tracer still running at the stop: 99.0 % covered,
  0.5 % off-scan, every ref in parts and labeled, page screenshot checked; included. Raw coverage under 88 % on 16 of the
  92 figures is neighbour-figure ink inside shared-sheet crops (diff images of 207559 FIG. 12 and 748626 FIG. 2 checked).
  `build.py --complete --only` the 13 + the 22 re-traced: gallery 112 patents (7.67 MB); `selftest.sh` PASS on index.html and
  all 35 pages. Left: 8 patents (2939952 10/12 figures, 3057356 2/3, 1203495, 223898, 307031, 349611, 3789832, 454622),
  223898 text, audits, README rows. Resume planned 2026-11-26 02:00 PT.

## Decisions
- 54 patents: 32 reused from the cached pool (batch-004 reserves and other cached research hits), 22 new. All expired.
  Bell Labs 7, Lasers and integrated optics 9, Chips and microdevices 8, Radio and television 7, Computing and cryptography 6,
  Forum favorites 8, Science and medicine 5, Electric light and power 4.
- Left out for drawing load or to keep groups balanced (cached, reserves for a next round): Tesla motor US 381,968 (27 small figures),
  Marcatili US 3,589,794 (8 sheets), Chemla QCSE US 4,525,687 (15 sheets), Cuk US 4,184,197 (10), Blonder US 4,904,036 (7),
  Levy-Osgood US 6,120,597 (6), Velcro, Slinky, Etch A Sketch, Gibson humbucker, Fender tremolo and Telecaster, Edison phonograph
  US 200,521, Lucky equalizer, Arthur MBE, Esaki superlattice, Keck-Schultz fiber, Grover heat pipe, Randall-Boot magnetron,
  Hall diamond, Starkweather scanner, floppy disk, Xerox mouse, Hollerith-era peers, and the rest of the batch-004 reserves.
- Group names are working names; rename in `meta.json` + `build.py` GROUPS if wanted.

## Audit corrections
