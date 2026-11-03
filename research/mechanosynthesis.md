# Mechanosynthesis and mechanical computing: filing map for ingest

Date: 2026-11-02

**Correction 2026-11-03 (audit):** `cited_by` in the tables below counted rows across Google's overlapping citation tables and is overstated. Distinct citing documents from the cached pages: EP3636589B1 2; US10067160B2 13; US10072031B1 11; US10138172B2 19; US10197597B2 14; US10308514B2 12; US10309985B2 14; US10481866B2 17; US10664233B2 14; US10678293B2 8; US10683924B1 10; US10822229B2 9; US10822230B2 11; US10942704B2 9; US10949166B2 9; US11148944B2 6; US11155461B2 8; US11180514B2 8; US11391355B2 4; US11526182B2 10; US11592463B2 7; US11604489B2 0; US11708384B2 0; US11720084B2 3; US11809165B2 2; US11815881B2 2; US20090056802A1 76; US20130178626A1 0; US20130178627A1 22; US20130184461A1 9; US20190250187A1 8; US20210149630A1 8; US20220106338A1 0; US20230087289A1 2; US7414437B1 15; US7687146B1 51; US8171568B2 44; US8276211B1 41; US9244097B1 16; US9676677B2 19; WO2018093410A1 7; WO2018093728A1 1.


Scope: (a) US20220106338A1 / US11708384B2 and related mechanosynthesis filings; (b) mechanical-computing filings around US10481866B2 and US11720084B2.

## Decision summary

Tier 1 = 9 documents, 310 drawing_images, 301 drawing sheets (D00001 onward; see Method).

| Tier 1 | Why it is needed | drawing_images | Sheets | Estimated new sheets if overlapping sheets could reuse traces |
|---|---|---:|---:|---:|
| US11708384B2 | Named document (grant of US20220106338A1). FIG. 1-49 of the 2016 set; FIG. 51-53 appear in no other document checked | 36 | 35 | 35 |
| US10822229B2 | Adds sequential-tip method, half-SiRad build sequence, strain-affinity figures, process flowcharts | 43 | 42 | ~11 |
| US9244097B1 | Superset of the 2007-2013 set: FIG. 1A-57, including pyramid build and reaction figures | 29 | 28 | 28 |
| US10308514B2 | Adds FIG. 24-46, row initiation / extension / termination reaction products | 45 | 44 | ~23 |
| US7687146B1 | Independent family (Zyvex, Freitas): tooltip built into a CVD-grown handle | 24 | 23 | 23 |
| US10949166B2 | Superset of named US10481866B2: adds FIG. 43-55 | 40 | 39 | 39 |
| US11720084B2 | Named document | 41 | 40 | 40 |
| US11809165B2 | Same title as US11720084B2, but 9 of 16 comparable sheets have no match there | 17 | 16 | ~9 |
| US11815881B2 | Same provisionals, different subject: non-contact force management; 28 of 33 comparable sheets have no match in US11720084B2 | 35 | 34 | ~28 |
| **Total** | | **310** | **301** | **~236** |

The last column is an estimate, derived from sheet-count differences and numeral matching (see Method). It only applies if the pipeline can reuse traces across documents, and no sheet image was visually compared.

Decisions for you:
1. **US10481866B2 is named in the request but has no unique drawings.** Its 42 captions all recur in US10949166B2, and 27 of 28 comparable sheets match. I recommend US10949166B2 in its place, and it is the lapsed one: fee lapse effective 2025-03-16, while US10481866B2 is Active. To keep the named number, ingest US10481866B2 (29 images) and lose FIG. 43-55, or ingest both.
2. **Cheaper mechanosynthesis option:** US11708384B2 alone (36 images) covers the named document and FIG. 1-53. It loses FIG. 50A-F, 51, 52A-O and 54-58 of US10822229B2, plus the entire 2007-2013 branch.
3. **Historical value versus cost:** US8171568B2 (Tier 2, 16 images, cited_by 66) is the 2007-priority root. It has no unique drawing caption, but about 46% of its text (8-word shingles) is absent from the Tier 1 set. Its drawings add nothing beyond US9244097B1.

## Blocks and gaps

- **Google Patents returned HTTP 503 at 2026-11-02T23:47:19 and every request afterwards; I stopped.** This run cached no PDFs. US11708384B2.pdf and US11720084B2.pdf were already in `work/_research/pdf/`; the other 7 Tier 1 PDFs are still to fetch. 35 candidates remain uncached (listed below).
- **My batch caused a burst.** `pipeline/fetch.py` sleeps only after a successful fetch, so the failing batch sent 35 requests in 23 s (23:47:19 to 23:47:42), which ignored `--pause 8`. Other fetch processes shared the same cache and log directory around this time (logged fetches at about 8-9 s intervals up to 23:45:53, and two more 503s at 23:48:07). The trigger for the block is unconfirmed. I did not edit the script (out of scope); it needs a sleep on error and a stop on 503.
- **I also sent one Google `xhr/query` keyword search, which returned 503.** No full-text or assignee listing was obtained from Google, so family enumeration rests on the family and citation data in cached pages plus web search.
- **Justia returned HTTP 403** on all three pages tried (inventor Merkle, inventor Freitas, assignee CBN Nano). I did not retry or work around it. Barton and Ryley pages were not attempted.
- **Filings after 2023 are unverified.** No CBN Nano US12-series or 2024+ US publication appeared in cached pages or one web search, but with no assignee search this is absence of evidence only.
- **Applications with no document found:** Ser. Nos. 13/187,523 (abandoned per US10822230B2), 13/556,122, 13/556,130, 14/047,668, 14/542,547. These are cited in cross-reference paragraphs, and publication numbers are N/A. 13/781,515 and 13/781,526 are probably US20130178626A1 and US20130184461A1 (speculation: only 13/781,532 is mapped by Google, to US20130178627A1).
- **Unresolved drawing question:** FIG. 27-33 captions read `...DonationO` in US10072031B1, US10067160B2, US10197597B2 and US10822229B2, but `...DonationNH` in US11180514B2 and US11708384B2. This could be a caption correction or a real drawing change. Check by viewing those sheets once PDFs are available.

## Method and how to read the columns

- `filed`, `published`, `status`, `drawing_images`, `claims`, `cited_by` come from `pipeline/fetch.py` on the cached Google HTML. `cited_by` is its count of `forwardReferences` rows. Status is Google's label, not a legal conclusion.
- **`drawing_images` overstates cost by one.** It counts Google's listed images, and for US documents those filenames run D00000-D00NN. D00000 is by USPTO convention the front-page representative image (convention, not visually confirmed here). Real sheets = highest D number.
- **Google's image lists have gaps that explain several count differences:** US10072031B1 lacks D00000 and D00028 (30 listed, 31 sheets, same as US11180514B2); US10481866B2 lacks D00026 (29 listed, 29 sheets, same as US10664233B2 at 30 listed); US10138172B2 and US20130178626A1 lack D00000 (22 sheets, same as US20130178627A1 at 23 listed).
- **Drawing relation** uses three comparisons from cached HTML:
  - Captions: BRIEF DESCRIPTION text per FIG label.
  - Sheets: Google's per-sheet reference-numeral callouts, matched at Jaccard >= 0.6, on sheets with at least 3 numerals, excluding D00000. Written as "A/B sheets match". This is a proxy: chemistry sheets often have few numerals, so a low match does not prove different art.
  - Text: fraction of 8-word shingles of the document present in the other, after joining formula subscripts (`CH 2` to `CH2`).
- No drawing sheet image was viewed. "Same drawings" below means same captions and matching numerals, not pixel comparison.
- Google's parent/child tables are noisy (US10072031B1 lists a later application as its parent). The continuity sketch follows the printed cross-reference paragraphs where they exist.

## Family table A: mechanosynthesis

Fee evidence is from Google legal events. "Reminder" = maintenance-fee reminder with no later payment event on the page.

### A1. 2016-priority set (`Systems and methods for mechanosynthesis`, sequential tip, build sequences)

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US10072031B1 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2016-05-12 | 2018-09-11 | Active; 4y paid 2021-09-22; reminder 2026-05-04 | 30 | 6 | 17 | Root of set. FIG. 1-49, all contained in US11708384B2 (24/25 sheets match) | X |
| US11180514B2 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2018-08-02 | 2021-11-23 | Expired - Fee Related; lapse effective 2025-11-23 | 32 | 20 | 9 | Division of US10072031B1. Same drawings; 7 captions (FIG. 27-33) say -NH instead of -O | X |
| US10067160B2 | Sequential tip systems and methods for positionally controlled chemistry | Merkle, Freitas, Barton | CBN Nano | 2016-11-16 | 2018-09-04 | Active; 4y paid 2021-09-22; reminder 2026-04-27 | 34 | 14 | 19 | Adds figures relative to US10072031B1: FIG. 50A-E, 51. All contained in US10822229B2 (26/26 sheets match) | X |
| US10197597B2 | Build sequences for mechanosynthesis | Allis, Barton, Drew | CBN Nano | 2017-05-05 | 2019-02-05 | Active; 4y paid 2022-02-07 | 43 | 20 | 22 | CIP of US9676677B2 but different drawings (0/28 sheets match). Same drawings as US10822229B2 (28/28) | X |
| US10309985B2 | Build sequences for mechanosynthesis | Allis, Barton, Drew | CBN Nano | 2017-11-07 | 2019-06-04 | Active; 4y paid 2022-06-09 | 43 | 16 | 21 | Continuation of US10197597B2. Same drawings | X |
| US20190250187A1 | Build Sequences for Mechanosynthesis | Allis, Barton, Drew | CBN Nano | 2019-04-16 | 2019-08-15 | Abandoned 2020-07-07 | 43 | 19 | 12 | Continuation of US10309985B2 per Google. Same captions | X |
| WO2018093410A1 | Improved systems and methods for mechanosynthesis | Freitas, Merkle, Barton | Nanofactory | 2017-03-14 | 2018-05-24 | Ceased | 0 | N/A | 8 | CIP of US10067160B2. 58 FIG labels; Google lists no images | X |
| WO2018093728A1 | Systems and methods for mechanosynthesis | Freitas (printed FRIETAS), Merkle, Barton | Nanofactory | 2017-11-13 | 2018-05-24 | Ceased | 0 | N/A | 2 | PCT source of US10822229B2. 58 FIG labels; Google lists no images | X |
| US10822229B2 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2017-11-13 | 2020-11-03 | Active; 4y paid 2023-11-08 | 43 | 21 | 13 | National phase of WO2018093728A1. Adds relative to US10067160B2: FIG. 50 now A-F, 52A-O, 53, 54A-D, 55-58 | **Tier 1** |
| US11148944B2 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2020-09-29 | 2021-10-19 | Expired - Fee Related; lapse effective 2025-10-19 | 43 | 20 | 7 | Division of US10822229B2. Same drawings (28/28) | X |
| US11592463B2 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2021-09-14 | 2023-02-28 | Active; no fee event on page | 43 | 20 | 7 | Division of US11148944B2. Same drawings (28/28). Text has about 10 k characters of sentences not matched in US10822229B2 (sampled: rewording plus some synthesis-route sentences; not fully classified). Alternate to US10822229B2, not an addition | X |
| US11708384B2 | Systems and methods for mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2021-11-22 | 2023-07-25 | Active; no fee event on page; expiry per Google 2036-08-01 | 36 | 20 | 0 | CIP / division per its own cross-reference. Adds relative to US10072031B1: FIG. 50 (AdamRad-Br, also FIG. 53 in US10822229B2) and FIG. 51-53 (PAO-HAbst-I, MAO-MeDon-I, EAO-C2Don-I), found nowhere else checked | **Tier 1** |
| US20220106338A1 | Systems and Methods for Mechanosynthesis | Merkle, Freitas, Barton | CBN Nano | 2021-11-22 | 2022-04-07 | Granted (as US11708384B2) | 36 | 20 | 0 | Pre-grant publication. All 53 captions same; text 100% shared | X |

### A2. 2007-priority set (`Positional diamondoid mechanosynthesis` and its CIPs)

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US8171568B2 | Positional diamondoid mechanosynthesis | Freitas, Merkle | Nanofactory | 2008-09-04 | 2012-05-01 | Active; 12y paid 2023-08-18; expiry per Google 2030-12-27 | 16 | 35 | 66 | Root. FIG. 1A-19D. All captions recur in US9244097B1, but only 9/15 sheets match by numerals (re-laid out, unverified). Text about 46% unique against Tier 1 | Tier 2 |
| US8276211B1 | Positional diamondoid mechanosynthesis | Freitas, Merkle | Individual per Google | 2011-07-21 | 2012-09-25 | Expired - Fee Related; lapse effective 2024-09-25 | 16 | 24 | 56 | Division of US8171568B2. Same drawings (15/15); text 99% shared | X |
| US20130178627A1 | Methods, Systems and Workpieces Using Mechanosynthesis | Freitas, Merkle | Individual per Google | 2013-02-28 | 2013-07-11 | Abandoned 2017-07-22 | 23 | 20 | 28 | CIP. Adds FIG. 20-56 (flowcharts, pyramid build, reactions) | X |
| US20130178626A1 | Bootstrapping and Synthesis of Mechanosynthesis Tips | Freitas, Merkle | Individual per Google | 2013-02-28 | 2013-07-11 | Abandoned 2017-10-16 | 22 | 52 | 0 | Sibling of US20130178627A1. Same captions; text 99% shared | X |
| US20130184461A1 | Mechanosynthesis Trajectories | Freitas, Merkle | Individual per Google | 2013-02-28 | 2013-07-18 | Abandoned 2017-10-16 | 23 | 22 | 13 | Sibling of US20130178627A1. Same captions; text 99% shared | X |
| US10138172B2 | Methods, systems and workpieces using mechanosynthesis | Freitas, Merkle | CBN Nano | 2016-07-07 | 2018-11-27 | Active; 4y paid 2021-12-01; reminder 2026-07-20 | 22 | 18 | 26 | Division of US20130178627A1 application. Same captions; text 98% shared | X |
| EP3636589B1 | Method of mechanosynthetic manufacture | Freitas, Merkle | CBN Nano | 2013-02-28 | 2024-10-30 | Active per Google; PG25 national lapses recorded 2025-04-11 to 2026-06-30 | 27 | 4 | 2 | EP member of the same set. Same captions; 16/16 sheets match US9244097B1 | X |
| US9244097B1 | Mechanosynthetic tools for a atomic-scale fabrication | Freitas, Merkle | Individual per Google | 2013-10-07 | 2016-01-26 | Active; 8y paid 2023-01-27; expiry per Google 2028-09-09 | 29 | 4 | 24 | CIP of 13/187,523. Adds FIG. 57 (tip causing feedstock bond strain) relative to the US20130178627A1 set; about 34 k characters of added sentences. Largest set in this branch | **Tier 1** |
| US9676677B2 | Build sequences for mechanosynthesis | Freitas, Merkle | Individual per Google | 2015-05-14 | 2017-06-13 | Expired - Fee Related; lapse effective 2025-06-13 | 22 | 10 | 29 | CIP of PCT/US2013/028419. FIG. 1A-23 only; all captions recur in US10308514B2 (12/15 sheets match). About 9% of text unique against Tier 1 | Tier 2 |
| US10308514B2 | Systems and methods for the manufacture of atomically-precise products | Freitas, Merkle | CBN Nano | 2016-02-22 | 2019-06-04 | Active; 4y paid 2022-06-07; expiry per Google 2029-12-17 | 45 | 20 | 19 | CIP of 13/187,523. Adds FIG. 24-46 (row reaction products), absent from US9244097B1. FIG. 1-23 match US9244097B1 (15/16) | **Tier 1** |
| US10822230B2 | Systems and methods for the manufacture of atomically-precise products | Freitas, Merkle | CBN Nano | 2019-04-16 | 2020-11-03 | Active; 4y paid 2023-11-08 | 45 | 20 | 14 | Division of US10308514B2. Same drawings (16/16) | X |
| US11155461B2 | Atomically-precise products and methods and systems for manufacturing the same | Freitas, Merkle | CBN Nano | 2020-09-29 | 2021-10-26 | Expired - Fee Related; lapse effective 2025-10-26 | 45 | 14 | 8 | Division of US10822230B2. Same drawings (16/16) | X |

### A3. Independent mechanosynthesis filings

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US7687146B1 | Simple tool for positional diamond mechanosynthesis, and its method of manufacture | Freitas | Zyvex Labs | 2005-02-11 | 2010-03-30 | Expired - Fee Related; lapse effective 2014-03-30 | 24 | 36 | 88 | No parent other than provisional 60/543,802. Different; no text overlap with CBN sets at the 15% threshold | **Tier 1** |
| US20090056802A1 | Practical method and means for mechanosynthesis and assembly of precise nanostructures and materials including diamond, ... | Rabani | Individual | 2008-02-18 | 2009-03-05 | Abandoned 2010-11-03 (never granted) | 46 | 20 | 125 | Different; no text overlap with CBN sets at the 15% threshold. Tier 2 because it is an abandoned application, and 46 images is the highest cost here | Tier 2 |

## Family table B: mechanical computing

### B1. 2015-priority set (`Mechanical computing systems`)

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US10481866B2 | Mechanical computing systems | Merkle, Freitas, Ryley | CBN Nano | 2015-12-31 | 2019-11-19 | Active; 4y paid 2022-11-21; expiry per Google 2037-01-22 | 29 | 21 | 21 | Root. FIG. 1-42. Named in request, but all contained in US10949166B2 (27/28 sheets; text 97%) | Tier 2 (named) |
| US10664233B2 | Mechanical computing systems | Merkle, Freitas, Ryley | CBN Nano | 2019-09-19 | 2020-05-26 | Active; 4y paid 2023-08-14 | 30 | 14 | 17 | Continuation of US10481866B2. Same drawings (42/42 captions, 27/28 sheets) | X |
| US10942704B2 | Mechanical computing systems | Merkle, Freitas, Ryley | CBN Nano | 2020-03-30 | 2021-03-09 | Expired - Fee Related; lapse effective 2025-03-09 | 30 | 19 | 10 | Continuation of US10664233B2. Same drawings (42/42 captions, 27/28 sheets) | X |
| US10949166B2 | Mechanical computing systems | Merkle, Freitas, Ryley | CBN Nano | 2019-09-17 | 2021-03-16 | Expired - Fee Related; lapse effective 2025-03-16 | 40 | 19 | 11 | CIP of US10481866B2. Adds FIG. 43-55 (adders, 4-phase clock, shift register, Moore machine, Harvard / von Neumann systems, NOR gates, I/O, signal conditioner) | **Tier 1** |
| US20210149630A1 | Mechanical Computing Systems | Merkle, Freitas, Ryley | CBN Nano | 2021-01-29 | 2021-05-20 | Abandoned 2025-08-18 | 40 | 23 | 9 | Continuation of US10949166B2. All 55 captions same | X |

### B2. 2020-priority set (provisionals 63/083,265 and 63/083,276)

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US11720084B2 | Efficient and manufacturable mechanical computing | Ryley, Jobes, MacArthur | CBN Nano | 2021-09-22 | 2023-08-08 | Active; no fee event on page; expiry per Google 2041-09-22 | 41 | 23 | 4 | Same provisionals as the two below. FIG. 1-17 with many lettered sub-figures. Named | **Tier 1** |
| US20230087289A1 | Efficient and Manufacturable Mechanical Computing | Ryley, Jobes, MacArthur | CBN Nano | 2021-09-22 | 2023-03-23 | Granted (as US11720084B2) | 41 | 28 | 3 | Pre-grant publication. All 17 captions same | X |
| US11809165B2 | Efficient and manufacturable mechanical computing | Ryley, Jobes, Semprebon | CBN Nano | 2021-09-22 | 2023-11-07 | Active; no fee event on page | 17 | 6 | 2 | Different with partial overlap: 7/16 sheets match US11720084B2; text 38% shared. Balance-mechanism logic starting at FIG. 1A | **Tier 1** |
| US11815881B2 | Managing non-contact forces in mechanisms | Ryley, Jobes, MacArthur | CBN Nano | 2021-09-22 | 2023-11-14 | Active; no fee event on page | 35 | 22 | 2 | Different with partial overlap: 5/33 sheets match US11720084B2; under 15% text shared. Van der Waals management, belts, memory | **Tier 1** |

### B3. Adjacent mechanical-logic filings

| ID | Title | First inventors | Assignee | Filed | Published | Status | drawing_images | Claims | cited_by | Drawing relation to parent | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|
| US10683924B1 | Buffered cam assembly | Ryley | CBN Nano | 2019-07-12 | 2020-06-16 | Active; 4y paid 2023-08-14 | 14 | 17 | 14 | Different. Clock-input cam for mechanical computing | Tier 2 |
| US11391355B2 | Buffered cam assembly | Ryley | CBN Nano | 2020-05-06 | 2022-07-19 | Active; reminder 2026-03-09 | 14 | 20 | 5 | Continuation of US10683924B1 per Google. Same drawings (12/12); text 98% shared | X |
| US11526182B2 | Sensing and operation of devices in viscous flow using derived parameters to reduce data-handling requirements | Hogg | CBN Nano | 2019-03-25 | 2022-12-13 | Active; reminder 2026-08-03; expiry per Google 2041-10-10 | 24 | 42 | 11 | Different; out of topic (devices in viscous flow) | X |
| US10678293B2 | Systems for mechanical logic based on additively manufacturable micro-mechanical logic gates | Pascall, Mancini, Panas | Lawrence Livermore National Security | 2018-11-02 | 2020-06-09 | Active; 4y paid 2023-10-19 | 10 | 19 | 13 | Different; bi-stable buckling flexure gates | Tier 2 |
| US11604489B2 | System and method for micromechanical logical and gate | Panas, Sun | Lawrence Livermore National Security | 2021-05-26 | 2023-03-14 | Active; 4y paid 2026-07-31; expiry per Google 2041-07-11 | 8 | 17 | 0 | Different | Tier 2 |
| US7414437B1 | Nanomechanical computer | Blick, Marsland | Wisconsin Alumni Research Foundation | 2007-05-16 | 2008-08-19 | Active; 12y paid 2020-01-23 | 4 | 12 | 22 | Different | Tier 2 |

## Not cached (Google 503): 35 IDs, metadata N/A, none read

Identifiers below come from family and citation rows on cached pages or from web search. Tier is not assessed from their content.

| Group | IDs | Expected value |
|---|---|---|
| US pre-grant publications in these families | US20170192748A1, US20200012478A1, US20200026490A1, US20200225911A1, US20180136254A1, US20190202690A1, US20210047178A1, US20210403322A1, US20230238965A1, US20230244263A1, US20150355228A1, US20160167970A1, US20180093930A1, US20180120346A1, US20180267082A1, US20190241436A1, US20210024353A1, US20090093659A1 | Presumed X, unverified. In every pair checked here, a publication shared its grant's captions |
| WO / EP members | WO2017116482A1, WO2022066679A1, WO2022066680A2, WO2022066681A2, WO2014133529A1, WO2014133530A1, WO2014133531A1, WO2014133532A1, EP2786402B1, EP3541740B1, EP3954649A1, EP4107596B1 | Presumed X, unverified. WO2014133529A1-532A1 are the likely PCT sources of the 2013 US set; one could carry text not checked here |
| Adjacent, scope unknown | US20200132718A1, US7326293B2, US9329201B2 (web search describes these as Zyvex scanning-tunneling hydrogen-depassivation work, not force-driven mechanosynthesis), US20030172205A1 (Bastian, mechanical computer), US8436637B1 (US Navy, nanomechanical logic) | Not assessed |

Other family members seen only as listing rows, not attempted (CA, JP, ES, AU), include CA3034215C, CA3158939A1, CA3158948C, JP6781824B2, ES2905559T3, CA2851906C, CA3078356C, CA3129940C, CA3113363C, JP7079205B2, JP7289386B2, plus the AU / CA / JP / ES list on the US11720084B2 page.

US8276211B2 returned HTTP 404: the correct kind code is B1, cached as US8276211B1.

## Continuity sketch

From printed cross-reference paragraphs where available. Google's family tables fill the rest, marked (G).

```text
2005 Zyvex, independent
  60/543,802 prov -> US7687146B1

2007 Freitas / Merkle
  60/970,658 prov (2007-09-07)
    US8171568B2 (12/204,642)
      division -> US8276211B1 (13/187,511)
      division -> 13/187,523 (abandoned, publication N/A)
        CIP -> 13/781,532 = US20130178627A1 (abandoned)
                 division -> US10138172B2
        CIP -> 13/781,515 and 13/781,526 (probably US20130178626A1, US20130184461A1; speculation)
        CIP -> US9244097B1 (14/047,674)
        CIP -> 14/047,668 and 14/542,547 (publications N/A)
        CIP -> US10308514B2 (15/050,067)
                 division -> US10822230B2
                               division -> US11155461B2

2013 Build sequences
  PCT/US2013/028419 = WO2014133532A1 (G)
    CIP -> US9676677B2 (14/712,506)
             CIP -> US10197597B2 (15/588,494)   drawings replaced with the 2016 set
                      continuation -> US10309985B2
                                        continuation -> US20190250187A1 (abandoned) (G)

2016 Modular / surface-bound tips
  US10072031B1 (15/153,671)
    division -> US11180514B2 (16/052,688)
                  CIP -> US11708384B2 = US20220106338A1 (17/531,998)
  US10067160B2 (15/353,380)
    CIP -> PCT/US2017/022330 = WO2018093410A1
    CIP -> PCT/US2017/061363 = WO2018093728A1 (also from PCT/US2017/022330)
             national phase -> US10822229B2 (16/325,241)
               division -> US11148944B2 (17/035,844)
                 division -> US11592463B2 (17/474,472)
                   division -> US11708384B2 (second parent, as printed)

2015 Mechanical computing
  US10481866B2 (14/986,568)
    continuation -> US10664233B2 (16/575,461)
                      continuation -> US10942704B2 (16/833,735)
    CIP -> US10949166B2 (16/573,435)
             continuation -> US20210149630A1 (17/161,738, abandoned)

2020 Mechanical computing: provisionals 63/083,265 and 63/083,276
    PCT/US2021/051405 = WO2022066679A1 -> US11720084B2 (17/802,742)
    PCT/US2021/051407 = WO2022066680A2 -> US11809165B2 (18/041,235)
    PCT/US2021/051411 = WO2022066681A2 -> US11815881B2 (18/003,697)

2019 Clock component
  US10683924B1 (16/509,550)
    continuation -> US11391355B2 (17/601,795) (G)
```

## Copyright-notice findings (37 CFR 1.71(d)-(e))

Search: `copyright`, `facsimile reproduction`, `mask work`, `all rights reserved`, `(c) YYYY` and the copyright symbol across the Google full-text description of each document.

| Document | Finding |
|---|---|
| US11708384B2 | none found |
| US10822229B2 | none found |
| US9244097B1 | none found |
| US10308514B2 | none found |
| US7687146B1 | none found |
| US10949166B2 | none found |
| US11720084B2 | none found |
| US11809165B2 | none found |
| US11815881B2 | none found |

The other cached documents in the tables were also searched for `copyright` and related phrases, with no hits. Limit: this covers Google's text only. The printed pages were not read: 7 Tier 1 PDFs are not cached, and the 2 present (US11708384B2, US11720084B2) have no text layer. Re-check at ingest, from the OCR.

## Sources

- Google Patents, cached 2026-11-02 at `work/_research/google/<id>.html`: https://patents.google.com/patent/US11708384B2/en and the same URL pattern for every ID in the family tables.
- Fetch logs: `work/_research/fetch-*.jsonl` (503s recorded in `fetch-20261102T234719.jsonl`).
- Web search result pointers only, not used for table values:
  - https://foresight.org/freitas-awarded-first-mechanosynthesis-patent
  - https://trea.com/organization/zyvex-labs-llc/8aa70689-420c-44e2-986e-d5212179722b
  - https://arxiv.org/abs/1801.03534v2
- Blocked:
  - https://patents.justia.com/inventor/ralph-c-merkle (403)
  - https://patents.justia.com/inventor/robert-a-freitas-jr (403)
  - https://patents.justia.com/assignee/cbn-nano-technologies-inc (403)
  - https://patents.google.com/xhr/query (503)
