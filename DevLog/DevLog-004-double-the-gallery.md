# DevLog-004: double the gallery (33 -> 66 patents)

| Field | Value |
|---|---|
| Date | 2026-11-18 |
| Status | Audits |
| Scope | Propose and ingest 33 new patents (expired preferred) from BSTJ / Bell Labs, online forums and articles, and topics of the outside5sigma.com blog; commit and push |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-18)
"inspect repo, and dispatch subagents to propose new patents to ingest from e.g. BSTJ, online forums and articles, and my own topics I cover
in my personal blog. Goal is to double the total patents ingested. Prioritize expired ones. Work out the list, and then ingest them following
the skills, and cmt & push once all done."

## Plan
1. Research: 4 parallel subagents, each oversupplies ~15-20 candidates with evidence (no Google Patents / USPTO requests from agents):
   BSTJ and Bell Labs; online forums and articles; landmark lists (IEEE Milestones, NIHF, CHM); blog topics (photonics, CPO, lasers, ...).
2. Central verification (paced `pipeline/fetch.py`): USPTO PDF, sheet count, drawings present, Google status and expiration.
3. Select 33: expired first, drawings required, no duplicates of the 33 already in, figure load kept moderate (cost scales with figures,
   DevLog-002: about $1.15 per figure). List and evidence in `research/batch-004.md`.
4. Stage 1 for all (extract + OCR), meta.json with group and term status.
5. Batch ingest: text + figure-table agents per patent, tracers by complexity, max 10 concurrent subagents.
6. Build, self-test, screenshots, fresh-context audits per group; README rows; commit and push.

## TODO
- [x] Research candidates (4 agents, about 110 candidates)
- [x] Verify + select 33, `research/batch-004.md`
- [x] Stage 1 + meta for all 33; Google pages cached for text cross-checks
- [x] Ingestion kick-off: timer set for 2026-11-18 13:10 PT (Wentao: "cache the patents first, and then set yourself a timer/reminder
      at 1:10 pm PT today to kick off the ingestion")
- [x] Text + figure tables (+ entities.json)
- [x] Traces (236 figures)
- [x] Build + self-test + screenshots
- [ ] Audits
- [ ] README, commit, push

## Progress
- 2026-11-18 08:29 PT: 4 research agents (BSTJ / Bell Labs; forums and articles; landmark lists; blog topics) returned about 110 candidates.
- 2026-11-18 08:34-08:49: 108 candidate PDFs cached from USPTO into `work/_research/pdf/` (5 s pacing, 0 errors after the fix below).
  `fetch.py --uspto`: numbers below 1,000,000 got HTTP 400; fixed by zero-padding to 7 digits.
- 2026-11-18: OCR inventory of every candidate (scratch script): header confirms number, title, inventor; sheet counts from
  "N Sheets-Sheet k". 33 selected (`research/batch-004.md`), PDFs copied to `sources/`, `pipeline/extract.sh` for all 33 (4-19 pages each).
- 2026-11-18 09:01-09:06: 33 Google Patents pages cached, 8 s pacing, no errors. `work/_research/google/US<pn>A.html`; text agents read
  these instead of requesting Google.
- 2026-11-18: `meta.json` for all 33: `col1_page` = first page with more than 700 OCR words; status from the statutory rules
  (17 years from grant; later of 17 from grant and 20 from filing when in force on 1995-06-08). 32 of 33 match Google's anticipated
  expiration. US 4,724,318: rule gives 2006-08-04, Google 2005-11-26 and "Ceased" (20 years from a 1985-11-26 prior-art date); check the
  front page for a parent application [63] in the audit. Vernam has no Google filing date: printed 1918-09-13 used.
- 2026-11-18: `build.py` GROUPS gains Bell Labs, Lasers and integrated optics, Chips and microdevices, Forum favorites.
- 2026-11-18 13:10 PT: timer fired; ingestion workflow `ingest-batch-004` started (pipeline per patent: text agent || figure-table agent,
  then tracers packed by complexity: >=7 solo, else load 10, max 6 figures; runtime cap 10 concurrent agents). Text agents also write
  `entities.json`; all agents read the cached Google page, no network.
- 2026-11-18 15:06 PT: all 33 text + figure tables done (about 236 figures); 7 patents fully traced. Test build `--only` of those 7:
  self-test 7/7 PASS; screenshots of Vernam FIG. 1 (part 14 pinned) and Shockley FIG. 1 look right. To check in audit: notes write
  "R_L" in plain text (2569347 FIG. 1 note) where the viewer shows subscripts only for `_{}` in patent text.
- 2026-11-18 about 15:45 PT: workflow stopped by the 5-hour usage limit (resets 18:10 PT). 115 agents done, 95 tracers refused
  (21.6M subagent tokens). 15 patents fully traced; all 33 text/figures done; text agents confirm `col1_page` for all 33.
- 2026-11-18 18:10 PT: resumed the same run (`resumeFromRunId`), completed agents replay from cache. 11 of 15 finished patents built
  `--only`, self-test 11/11 PASS.
- 2026-11-18 about 21:10 PT: workflow complete: 210 agents, 0 errors, about 19.3M subagent tokens, 3 h 18 min wall clock
  (two sessions, split by the usage limit). 236 figures, 236 traces. Tracer-reported coverage below 88 % or off-scan above 4 %
  on 5 figures, all explained: neighbour ink or the signature block inside the crop (Maiman FIG. 18 net 98.9 %, Hall FIG. 4 net
  98.2 %), stipple tile phase (Dragone FIG. 2), hand-lettering glyph shape (Metcalfe FIGS. 1, 7).
- 2026-11-18 21:20 PT: Shockley FIGS. 10-12: part P added ("substantially parallel layers", 8:65), zone and letter carry ref P
  (tracer report). Notes of the 33: 38 plain subscripts (R_L, V_f, n_eff, ...) converted to `_{}` markup, which `subsup()` renders.
- 2026-11-18 21:30 PT: `build.py --only` all 33: no warnings, gallery 66 patents (4.0 MB); self-test 34/34 PASS (gallery + 33),
  no figure missing a ref in its trace. Screenshots of the gallery, Maiman FIG. 1, Metcalfe FIG. 1, Wright FIG. 1 look right.
- 2026-11-18 21:40 PT: 8 fresh-context audits started (each group split in two, 3-5 patents each), fixing in place and reporting.

## Decisions
- 33 patents, 4 new groups: Bell Labs 10, Lasers and integrated optics 9, Chips and microdevices 7, Forum favorites 7. All expired.
- Excluded for drawing load: Black US 2,102,671 (35 sheets), Kilby calculator (21), marching cubes (25), NVIDIA US 6,198,488 (42), and others
  listed under Reserves in `research/batch-004.md`.
- Group names are working names; rename in `meta.json` + `build.py` GROUPS if wanted.

## Audit corrections
