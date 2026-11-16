# DevLog-003: Noyce integrated circuit patent (US 2,981,877)

| Field | Value |
|---|---|
| Date | 2026-11-15 |
| Status | Built and audited 2026-11-15; not committed |
| Scope | Ingest and trace US 2,981,877, "Semiconductor Device-and-Lead Structure" (Robert N. Noyce, Fairchild) |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-15)
"read the patent ingestion skill, and do it for Robert Noyce's 1959 patent on integrated circuit"

## Document
- US 2,981,877, filed 1959-07-30 (Ser. No. 830,507), issued 1961-04-25, 10 claims, Cl. 317-235.
- Assignor to Fairchild Semiconductor Corporation, Mountain View, Calif.
- 8 pages: p-000..p-002 drawing sheets (FIG. 1-7), p-003..p-007 columns 1-10 (pre-1971 layout, no front page).
- PDF from USPTO (`pipeline/fetch.py --uspto US2981877A`), Google page cached in `work/_research/google/`.
- Group: Classic products (next to Kilby US 3,138,743).
- Term: 17 years from grant, ended 1978-04-25. Google: "Expired - Lifetime", no expiration date given.

## Plan
1. Stage 1: extract + OCR. Done.
2. Stage 2 + 3 in parallel: text agent, figure-table agent.
3. Stage 4: tracers grouped by the figure agent's complexity estimates.
4. Build `--only 2981877` + gallery, self-test, screenshots.
5. Fresh-context audit, corrections recorded here.
6. README table row.

## TODO
- [x] PDF, `sources/2981877.pdf`, extract + OCR (8 pages)
- [x] `meta.json`, `entities.json`
- [x] `text.json` (45 paras 1:15-7:21, 10 claims, 7 brief drawings, 4 refs, 55 OCR fixes)
- [x] `figures.json`, `notes.json`, crops (7 figures, 62 parts)
- [x] Traces FIG. 1-7
- [x] Build + self-test + screenshots
- [x] Fresh-context audit (corrections below)
- [x] README row

## Progress
- 2026-11-15: fetched Google page (1 request) and USPTO PDF (1 request); extract.sh: 8 pages, 2320x3408.
- 2026-11-15: figure-table agent done: 7 figures, rotation 0, no front page; 62 parts. Drawing-only numerals with empty names:
  16', 17', 19', 26' (FIG. 5), 45 (oxide, FIGS. 6-7). Numeral 33 unused. FIG. 5 crop unavoidably takes in part of the
  signature block ("INVENTO", "ROBERT N.NOY") at lower right; tracers skip it.
- 2026-11-15: 5 tracers started: FIG. 4 (complexity 9); FIGS. 2+7 (sections, shared helpers); FIG. 3 (7); FIGS. 1+6 (plan views);
  FIG. 5 (schematic).
- 2026-11-15: text agent done. Header matches entities.json. Typos kept: "last-menttioned" (4:67), "congentially" (claim 9),
  "contacts a adherent" (claim 1), "Figs, 3 and 4" (6:48). Gutter numbers drift one line at the foot of cols 6-8; line numbers follow
  the printed marks. Dropped the run-on "What is claimed is:" from the last description paragraph (7:21); reverted after the audit (see below).
- 2026-11-15: FIG. 5 traced: 59 elements, 99.2 % covered net of the signature block (91.7 % raw), 2.3 % off-scan.
- 2026-11-15: FIGS. 1, 6 traced: 98.2 % / 1.6 % and 96.4 % / 2.5 % (covered / off-scan). FIG. 1 bold outer C assigned to
  oxide 5 (edge of the window cleared in the oxide), not contact 8: leader 8 points into the r 83-139 band between junctions 3 and 4.
- 2026-11-15: FIG. 4 traced: 78 elements, 21 refs (27 and 24 labelled twice), 99.7 % covered, 0.8 % off-scan. Hatch split into
  strips with per-strip pitch (renderer has no hatch phase). Unnumbered P-N junction curve drawn without ref.
- 2026-11-15: FIG. 3 traced: 52 elements, 99.3 % covered, 0.4 % off-scan. Scan stretched about 1.2 % vertically, circles fitted as
  ellipses.
- 2026-11-15: FIGS. 2, 7 traced: 99.4 % / 0.2 % and 99.8 % / 0.1 %. Hatch as measured strokes (hand ruling varies about
  +-4 px). Tongues 5', 5'' split from oxide 5 in FIG. 2 at x positions taken from FIG. 1. Ref 45 elements carry the text's
  unnumbered phrase "insulating oxide layer" as a name override; figures.json keeps 45 with an empty name.
- 2026-11-15: build `--only 2981877`, self-test PASS (index + page), screenshots of FIG. 3 with 24 pinned, Description, gallery.
- 2026-11-15: `build.py`: section lines "2—2", "4—4", "7—7" were linked as numerals 2, 4, 7. Added `SECTION_RE` (same number either
  side of a dash, skipped when the whole match is itself a ref, e.g. Fanuc gear "6-6"). Span diff over all 33 patents: removes exactly
  3 links here and 1 in US 1,894,011 ("line 3—3"); nothing else changes. Rebuilt p/1894011.html, self-test PASS.
- Open, not fixed (outside this ingest): the Description tab shows an empty "Abstract / front" block for every patent without an
  abstract (pre-1971 layouts: Kilby, Bardeen, Noyce, ...). `viewer/app.js` TextTab.

## Decisions
- FIG. 3: the six dashed junction circles carry refs 14, 15, 18, 20, 21, 22 although FIG. 3 prints no numeral for them. Mapping from
  the description ("Figs. 3 and 4" describe one structure) and the FIG. 4 section; `figs` of those parts now include "3". The ring
  around contact 26 has no ref (the text names no junction there). To make it strictly printed-only, set them name-only in
  `work/2981877/tmp/trace-3/gen.py` and rerun.
- FIG. 1: the bold outer C belongs to oxide 5 (edge of the cleared window), not contact 8.

## Audit corrections (2026-11-15, one fresh-context audit)
Sampled: all 45 paragraphs, 10 claims, 7 brief drawings, 4 references, 59 part names, all 7 overlays (also coloured by ref), notes, term.
No claim, part-name or trace-ref errors.
- text 6:48 "Figs, 3 and 4" -> "Figs. 3 and 4": the mark is the same 6 px blob as the periods at 3:52 and 6:56. Added to `ocr_fixes`.
  Side effect: "3" and "4" there no longer link to junctions 3 and 4 (172 mentions, was 174).
- text 7:21: "What is claimed is:" restored. It is run in with the last sentence, not a bare line; US 1,894,011 keeps its run-in lead-in.
- notes `patent`: oxide statement narrowed (FIGS. 1-2 keep oxide only where leads cross junction edges); Kilby sentence reworded to what
  is established (priority contest in an interference, CCPA ruled for Noyce in 1969), without claiming which Kilby application or
  which claims were in interference.
- notes FIG. 1: "bold outlines bound cleared areas" -> heavy lines are shade lines; the outermost heavy arcs bound the oxide window.
- notes part 30: only lead 30 is "thin and narrow" in the text; 31, 32 described as similar / resistive.
- meta: `google_expiration` 1978-04-25 (cached Google page, "Anticipated expiration").
- traces: FIG. 7 oxide elements no longer carry a name override for 45 (consistent with FIG. 6 and the empty part name); FIG. 4
  unnumbered junction named "P–N junction". Generators `trace-7/gen7.py`, `trace-4/gen.py` updated and reproduce the files exactly.
- Not changed (outside this ingest): `data/3138743/notes.json` (Kilby) also says the interference was "over interconnection claims"
  between "the two applications"; same unverified detail.
