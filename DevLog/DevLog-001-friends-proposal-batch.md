# DevLog-001: friends' proposal batch (aircraft structures, mechanosynthesis, robot wrists)

| Field | Value |
|---|---|
| Date | 2026-11-02 |
| Status | Built, audited and pushed 2026-11-03 |
| Scope | Research, cache, ingest and trace a list of patents proposed by friends |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-02)
Topic proposal, no numbers given:
- Aircraft fuselage constructions; pressure bulkheads; tension fittings; novel structural component designs; 3D printing
  applications in commercial aircraft construction

Named documents:
- EP0200202A2 Wrist mechanism for industrial robot
- US20220106338A1 Systems and Methods for Mechanosynthesis (and related filings on the topic)
- US10481866B2 Mechanical computing systems
- US11720084B2 Efficient and manufacturable mechanical computing
- US8109173B2 Parallel robot provided with wrist section having three degrees of freedom
- US8307732B2 Parallel link robot
- Patents by inventor Satoshi Kinoshita (Fanuc M-1iA/0.5A robots, wrist mechanisms)

## Plan
1. Research: resolve named numbers; enumerate the open-ended sets (Kinoshita, mechanosynthesis family, aircraft topics)
   into `research/` with evidence for each pick. Cache pages and PDFs with `pipeline/fetch.py`.
2. Toolchain: poppler (brew), uv venv at `work/.venv` for numpy/scipy; `work/` regenerated for the 13 existing patents,
   because `build.py` drops any patent without `work/` from the gallery.
3. Viewer: support non-US documents and citation schemes other than col:line.
4. Pilot one modern document end to end before the batch.
5. Batch: text + figure agents per patent, tracers grouped by complexity, max 10 concurrent subagents.
6. Build, self-test, screenshots, fresh-context audit.

## TODO
- [x] Named numbers resolved against Google Patents
- [x] Research manifests: `research/kinoshita.md`, `research/mechanosynthesis.md`, `research/aircraft.md`
- [x] PDFs cached: accepted set in `sources/`; 8 further mechanosynthesis and Kinoshita candidates in `work/_research/pdf/`
- [x] `work/` regenerated for the 13 existing patents; rebuilt pages pixel-identical to the committed ones
- [x] Viewer changes for non-US and paragraph citations
- [x] Pilot: EP 0 200 202 A2
- [x] Batch ingest + trace: 19 documents, 376 figures, all traced
- [x] Build + self-test + audits: 20 of 20 pages PASS; 3 fresh-context audits, corrections below
- [x] Commit and push (2026-11-03)

## Progress
- 2026-11-02: brew installed poppler 26.10.0 (was missing); uv venv at `work/.venv` (Python 3.12, Pillow 13.0.0,
  numpy 2.5.4, scipy 1.18.1). Run scripts with `PATH=work/.venv/bin:$PATH python3 -I ...` so the subprocess in
  `coverage.py` finds the same interpreter.
- 2026-11-02: named numbers resolved. US20220106338A1 is a pre-grant publication, Google links the grant US 11,708,384 B2.
  EP0200202A2 status on Google: Withdrawn.
- 2026-11-02: Google Patents returned 503 from about 23:45. Causes: research agents' `xhr/query` searches, then a burst from a
  `pipeline/fetch.py` bug (no pause after errors, 35 requests in 23 s). Fixed: pauses after errors, stops on 403/429/503.
  Added `--uspto`: PDFs straight from image-ppubs.uspto.gov, which stayed reachable. Google still 503 at 2026-11-03T00:14.
- 2026-11-03: viewer and build, all optional so existing pages are unaffected: `doc`, `date_label`, `cite_scheme`, `scan_source`,
  per-paragraph `cite` + `page`; numerals to 4 digits; hyphenated refs (54-1). The 13 existing `p/*.html` are not rebuilt.
- 2026-11-03: pilot accepted after checking the rendered redraw of FIG. 9: part 28 highlights body, leader and label.

## Decisions
- Named documents are ingested as named, including US20220106338A1 (not its grant) and US10481866B2 (research prefers the
  superset US10949166B2, pending Wentao).
- Kinoshita set: US8109173B2, US8307732B2, US8047093B2. US8893578B2 skipped: CIP of US8109173B2 adding one figure.
- Aircraft set: research Tier 1, with US20170106964A1 "Corner tension fitting" replacing US8016236B2 (22 sheets; the phrase
  "tension fitting" appears once). The grant status of US20170106964A1 is unverified while Google is blocked.
- Mechanosynthesis beyond the named documents: 7 documents, 226 sheets (about 161 if overlapping sheets could reuse traces), not
  started, pending Wentao.
- Friends' names and handles are left out of this repo until Wentao decides on credit.

## Audit corrections
- 2026-11-03, fresh-context audit of Robot wrists (EP0200202, 8109173, 8307732, 8047093). Sampled 24 paragraphs, 7 claims,
  40 parts, 12 overlays, 36 refs: no text differences; term dates all reproduced from printed filing dates and adjustments.
  Applied: EP withdrawal date 1988-06-22 (1988-08-17 was the publication of the event), family member US 4,696,202 noted,
  HARMONIC DRIVE wording, wrist-axis wording, title period and priority; delta and Clavel marked as our classification;
  an inference dropped from 8109173 FIG. 4; 8307732 locator and range-named parts 21a, 21c; unverified "dynamic spline" note removed.
  Not applied: FIG. 9 ref 2 running into what FIG. 1 calls 45 (queued for a trace fix).
- 2026-11-03, fresh-context audit of Aircraft structures. Sampled 48 text items, 60 parts, 25 overlays, all 12 notes, all term dates:
  no text or term errors; US 2017/0106964 A1 diffed in full against Google, 0 real differences. Applied: a truncated
  quote (dropped Northrop); an unsupported "priority is contested"; citation counts in 3 notes and all research tables (`fetch.py`
  counted rows across overlapping tables, 160 was 109 distinct; fixed in the script, corrected values added to `research/*.md`);
  collection-rationale wording removed from notes; ISO dates; assignee as printed; 7527222 front-page flag moved to FIG. 6 only.
  Documented conventions: `[claims]` cite, omitted claims lead-in. Judged and kept: NASA as assignee from [76] on 4310132;
  hyphens at line ends in 5062589 ("mat-like", "fleece-like"), which the scan cannot settle.
  Queued for a trace fix: 20170106964 FIG. 17 web hatch, 9776704 FIG. 6 hatch stubs, EP0200202 FIG. 9 ref 2.
- 2026-11-03, trace fixes from the audits: EP FIG. 9 ref 2 stopped where FIG. 1 stops it; 20170106964 FIG. 17 web dashes and cap;
  9776704 FIG. 6 hatch stubs.
- 2026-11-03, fresh-context audit of Mechanosynthesis and mechanical computing. Sampled 24 text items, 24 parts, 25 overlays, all notes, all term
  dates: no text errors. Applied: a glossary entry for a word the patent does not use removed; pipeline wording removed from a figure note;
  terminal disclaimer of the grant US 11,708,384 added to the A1's status; part 208 figs; FIG. 53 concentration 0.05 M corrected to 0.09 M after
  viewing it next to the flat-topped 5 on the same sheet; FIG. 26 note records that it prints Pr3N while FIG. 18 and [0142] have Pr4N.
  Kept as read: FIG. 46 "CH3Cl3" (chemically odd; the scan looks like a 3; the grant sheet is the same bitmap).

## Open for Wentao
1. Mechanosynthesis beyond the named documents (research Tier 1 less US11708384B2 and US11720084B2: 226 sheets, about 161 with reuse): ingest or not. US10949166B2 is the superset of
   US10481866B2, adding FIG. 43-55.
2. Credit for the friends who proposed this batch: names and handles are not in the repo.
3. EP 0 200 202 A2: no EPO statement on reuse of patent documents found to cite.

## Known limits
- Kinoshita sweep incomplete: Justia and Espacenet 403, Google query 503; page 1 of 3 of the namesake sweep.
- Post-2023 CBN Nano filings unverified.
- Named-only elements hover only on pages rebuilt after 2026-11-03; the 13 older pages keep their earlier bundle.
- `In force` rests on Google Patents status and legal events, not on USPTO records.
