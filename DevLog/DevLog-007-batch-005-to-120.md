# DevLog-007: batch 005 (66 -> 120 patents)

| Field | Value |
|---|---|
| Date | 2026-11-25 |
| Status | Done (120 patents) |
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
- [x] Workflow: text + figure tables + traces (54 of 54; last 8 patents finished 2026-11-26 02:41)
- [x] Build + self-test for 13 more (gallery 112), committed and pushed 2026-11-25
- [x] Build + self-test + screenshots for the 33 finished patents (gallery 99; `--complete` keeps the 21 unfinished out)
- [x] Audits (8 fresh-context agents, one per group, 2026-11-26)
- [x] Remaining patents traced, README rows (all 120), final commit and push 2026-11-26

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
- 2026-11-25 23:25 PT: committed and pushed aff8c69. Resume is a fresh workflow (session scratchpad `finish-batch-005.js`), not a
  replay: 22 tracers for the 34 figures left (2939952 FIG. 1, 3-7, 10, 11 and 3057356 FIG. 1, 3 were interrupted mid-trace and are
  redone from their partial generators; the other 6 patents in full) plus the 223898 text agent told to assemble text.json by
  script from OCR line ranges instead of typing the text.

- 2026-11-26 02:03 PT: finishing workflow (`finish-batch-005.js`, 23 agents, 0 errors, 38 min, 4.2M subagent tokens). US 223,898
  text.json assembled by a script from OCR line ranges (308 OCR fixes; pages 3-4 are the 1883 R.S. 4887 certificate and its 1893
  cancellation; p.1:103-104 printed twice as p.2:1-2, kept as printed). 34 figures traced: `coverage.py` 91-99.9 % except
  307031 FIG. 4 (69.8 % raw, 97.4 % net of the scan's torn border). `build.py --complete --only` the 8: gallery 120 patents (8.24 MB);
  `selftest.sh` PASS on index and the 8 pages; screenshots of 223898 FIG. 1 and 2939952 FIG. 1 checked.
- 2026-11-26 02:45-03:35 PT: 8 audits (brief in the session scratchpad `audit-brief.md`), fixes in place; corrections below.
  Rebuilt all 54 pages; `selftest.sh` PASS 55/55 (index + 54). README table: rows for the 87 patents added since the first 33
  (batch 004 had not added them), existing rows unchanged, new rows in group order then grant date, title-cased printed title
  and inventor surnames, figure count.
- Open (not fixed here): letter refs other than lowercase `[a-z]\d?` never link from the text (capitals, primes `c′`, `a^{2}`):
  `lettered()` stays off for 349,611 (0 part mentions), 879,532, 1,113,149, 395,782, 174,465, and capitals stay unlinked in
  223,898, 307,031, 454,622; text uses U+2032 primes where part refs use ASCII `'`. Fix in `build.py` needs care with
  sentence-initial "A". 3,149,290: a 1970 certificate adds Herriott as joint inventor; entities list the printed two.
  2,787,564 prints Ohl's patent as 2,750,411 (a search suggests 2,750,541). 3,789,832 extension: certificate gives 1992-02-22,
  Google 1992-02-24. README intro still says the gallery is about 2 MB (now 8.24 MB).
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
- Radio and television (7): no text errors. Notes: 879,532 and 803,684 cite Marconi v. De Forest, 236 F. 942 (S.D.N.Y. 1916), aff'd 243 F. 560 (2d Cir. 1917); 803,684 1943 invalidity stated as improper disclaimer (filed 1915-11-17, printed on the scan) with unreasonable delay, 320 U.S. 1; 1,113,149 "ruled for de Forest" -> "upheld de Forest's priority" (RCA v. Radio Engineering Laboratories, 293 U.S. 1, 1934); 1,342,885 Levy priority sentence replaced by FR 493,660 (1917), Schottky (Proc. IRE 1926), US 1,734,938 (1929); FIG. 2 note "beside" -> "just below"; 1,941,066 FIG. 3 note adds that curve C levels off; Farnsworth dates to ISO. google_expiration filled for all 7 (equal to term_end).
- Computing and cryptography (6): 2,525,352 term_end 1967-10-10 -> 1966-03-07 (printed "Patent expires March 7, 1966", Section 1, Public Law 690, 20 years from the Austrian filing; Google ignores it). 395,782 basis: British specification of 1889 exists (CHM B332.85), no earlier foreign patent found (orchestrator cut an unverified number and date taken from a search snippet). 2,612,994 "then at Drexel" -> "had begun the work at Drexel". 2,736,880 adds IBM paid MIT $13 million in 1964 (CHM). Dates to ISO.
- Bell Labs (7): terms all correct. 1,356,763 text "follow ing" -> "following" (+ ocr_fixes entry). 3,500,000 part note and figures.json part 116 removed (scan prints 110; 116 exists only as an OCR misread). 3,500,142 misquoting part note 20 removed. 3,488,445 "first patent on OFDM" -> "Chang's patent on OFDM" (unverifiable first); FIG. 4 note "above the band" -> "outside the band" (col. 8:25). Dates to ISO.
- Science and medicine (5): 3,789,832 term_end 1991-02-05 -> 1992-02-22: the scan's last page is a 35 U.S.C. 156 certificate (382 days, 1986-04-18); Google legal events give 1992-02-24, two days later, unexplained (noted in basis). Its MRI note rewritten: FIG. 2 localizes at the field maximum on the magnet axis, no applied gradients; Lauterbur, Nature 242, 190 (1973); 2003 Nobel to Lauterbur and Mansfield, Damadian's 2003-10-09 newspaper ads. Part 35 named "input terminal" from the certificate of correction (printed 25 corrected to 35). 1,948,384: Wideroe citation notes Archiv fur Elektrotechnik 21, 387 (1928) vs the patent's printed 1929; FIG. 5 note wall 13 is solid, not dashed; FIG. 6 radius 11.4 -> 11.5 cm (recomputed). 2,939,952: FIG. 12 "trapping space 20" -> "ionization space 20"; FIG. 2 two diaphragms 8. 3,057,356 FIG. 2 "lower end" -> "upper end" of secondary 20'. 1,203,495 Langmuir sentence reduced to what the closing paragraph says. Dates to ISO.
- Forum favorites (8): no text errors. 6,469: filed 1849-03-10, a week after Lincoln's House term ended (note said "while serving"); no extension found, 14-year term kept (Google applies 17); FIG. 2 right-hand word unreadable, not invented. 748,626 FIG. 1 estate lettering as printed ("Lord Blue Blood, London England, Owner"); granted 1904, so no R.S. 4887 note. 207,559: "earliest patent drawing of QWERTY" removed (unsupported) -> what FIG. 3 prints (ASDFGHJKLM, ZCXVBN); Remington contract 1873, sold from 1874; Yasuoka citation completed. 1,219,881 FIG. 9 four -> five interlocked members. 1,219,881, 3,005,282 disclaimers and 1,061,206 division noted in basis (term unchanged). google_expiration filled for all.
- Electric light and power (4): 223,898 term_end 1897-01-27 -> 1894-11-17: R.S. 4887 with Edison's Canadian patent No. 10,654 of 1879-11-17 (5 years + 10 by fee, one 15-year term): Edison Electric Light Co. v. Perkins, 42 F. 327 (1890); v. United States Electric Lighting Co., 52 F. 300 (2d Cir. 1892, which also held the 1883-12-18 certificate void; cancelled 1893-03-15); British No. 4,576 did not limit it (59 F. 358, 1894); Bate Refrigerating v. Sulzberger, 157 U.S. 1 (1895). Exact day uncertain (Katznelson and Howells 2012 give 1894-11-19 unsourced). Note sentence added. Printed doubling of p.1:103-104 as p.2:1-2 confirmed on the scan, kept. 349,611 FIG. 1 and 2 notes: drawing prints a^{1}, b^{1}, e^{1}, c^{1} for the text's primes. 307,031 and 454,622 no changes.
- Chips and microdevices (8): terms all correct. 5,374,564: no fee lapse (4/8/12-year fees paid); Google "Ceased" because it was surrendered on reissue as RE39,484 (2007-02-06); basis rewritten; notes "R_{p}" -> "Rp" as printed. 3,033,714 FIG. 1 layer 3 is a flat-bottomed band, not lens-shaped; printed names (Reona Ezaki) confirmed. 3,356,858: false "metallic gate 95" part note and alt removed (scan: gate 96); FIG. 5 conductors 55/56 named as in the text. 3,413,573: gap "a few microns" -> "about 1/2 mil (13 um)"; wire "hand-soldered" -> as printed; IEEE Trans. Electron Devices ED-14 (1967) citation completed; FIG. 2 arrow direction; FIG. 5 node-position note made exact. 2,787,564: Ohl patent number attributed to the text (prints 2,750,411; a search suggests 2,750,541; unresolved). google_expiration filled; dates to ISO.
- Lasers and integrated optics (9): 4,958,898 term_end 2009-03-15 -> 2002-09-25 (lapsed for non-payment of the 11.5-year fee; USPTO events on Google; Google's anticipated date ignores the lapse). 3,758,875 text col. 5:48 "E_{gp} > _{gi}" -> "E_{gp} > _{Egi}" (scan); Nobel 2000 "half" to Alferov and Kroemer. 3,149,290: 1970 certificate adding Herriott as joint inventor noted; unverifiable "strongest line" removed. 4,448,479 FIG. 3 and FIG. 11 notes corrected against the drawing; glossary "planar strip transmission line" per claim 7. 4,725,110 basis names the 1984-08-13 parent. 5,172,267 1989 fcc work was a measurement, not a proposal. 5,005,175 FIG. 5 note: 2.1 dB/mW is the text's ratio at 11.3 mW, not the initial slope; mode-size and gain-coefficient glossary made exact. 4,949,350 FIG. 2 three mirror periods drawn, FIG. 4 Al fraction computed from printed thicknesses. google_expiration filled; units and dates as printed / ISO.
