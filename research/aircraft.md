# Aircraft structures: patent shortlist for the Interactive Patents gallery

Date: 2026-11-02

**Correction 2026-11-03 (audit):** `cited_by` in the tables below counted rows across Google's overlapping citation tables and is overstated. Distinct citing documents from the cached pages: EP3064430A1 5; US10173255B2 134; US10220932B2 1; US10689088B2 6; US10926858B2 8; US1114364A 1; US11618215B2 2; US11667368B2 2; US1425113A 7; US1619372A 13; US1704326A 9; US1822943A 3; US1894011A 7; US20170106964A1 6; US20200079013A1 3; US20200189714A1 11; US4310132A 201; US4489123A 151; US5039571A 74; US5062589A 109; US6595467B2 83; US7410352B2 79; US7459048B2 72; US7527222B2 251; US8182628B2 205; US8226870B2 40; US8371532B2 31; US8939404B2 28; US9593740B2 4; US9637215B2 13; US9776704B1 20.


Topics, from the friend's proposal: (F) fuselage constructions; (B) pressure bulkheads; (T) tension fittings; (S) novel structural component designs; (A) 3D printing in commercial aircraft construction.

## Read this first

- **Google Patents blocked this research partway through; four Tier 1 records are incomplete.** See "Blocked sources". Those four show `N/A` for `drawing_images`, `status` and `cited_by`. They were read from USPTO print PDFs instead.
- **Weak on notability:** T and A. None of the T or A picks has a documented aircraft program link, and their citation counts are low or unknown. They are in Tier 1 only because each topic needs at least one entry. All four are marked "weak" below.
- **No historical pressure bulkhead found.** The earliest bulkhead pick is from 1990. The closest older document is Wallis's pressure cabin (Tier 2), which does not claim a bulkhead.
- **Almost no source cites a patent number.** Only US1425113 has an independent source naming its number. The other evidence ties an inventor or company to a construction or aircraft, not to the patent. Each row says which case applies.
- **Tier 1 printed drawing sheets total 80.** Of these, 22 are US8016236B2. Dropping it leaves 58 sheets across 11 patents.

## Tier 1 (recommended): 12 patents

Era spread by publication year: 1922, 1927, 1931, 1933, 1982, 1991, 1991, 2009, 2011, 2017, 2017, 2023. All are US grants. Topic counts: F 4, B 2, T 2, S 3, A 1.

`drawing_images` is what `pipeline/fetch.py` reports from Google. `sheets` is the count printed on the USPTO document, and it is the number to use for cost. `claims` is `N/A` for pre-1976 patents because the parser returns null and they print no reliable count.

| ID | Title | Inventors | Assignee | Filed | Published | Status | drawing_images | sheets | claims | cited_by | Topic | Tier |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| US1425113A | Process of manufacturing curved forms of plywood or fibrous compositions | Malcolm Loughead | Assignor of one-fourth each to Allen H. Loughead, John K. Northrop, Anthony Stadlman | 1919-08-12 | 1922-08-08 | Expired - Lifetime | 1 | 1 | N/A | 14 | F | 1 |
| US1894011A | Construction of fuselage or other bodies of aircraft | Barnes Neville Wallis | Vickers (Aviation) Limited | 1932-08-15 (GB 1931-08-27) | 1933-01-10 | N/A (blocked) | N/A (blocked) | 4 | N/A | N/A (blocked) | F | 1 |
| US4310132A | Fuselage structure using advanced technology fiber reinforced composites | Robert K. Robinson, Harry M. Tomlinson | NASA Administrator (Robert A. Frosch), "with respect to an invention of" the inventors | 1978-02-16 | 1982-01-12 | Expired - Lifetime | 4 | 4 | 25 | 293 | F | 1 |
| US7527222B2 | Composite barrel sections for aircraft fuselages and other structures, and methods and systems for manufacturing such barrel sections | Robert D. Biornstad, Bruce C. Blankinship, Terry J. George, William H. Ingram | Boeing Co | 2004-05-20 | 2009-05-05 | Expired - Lifetime | 12 | 11 | 36 | 320 | F | 1 |
| US5062589A | Fiber reinforced pressure bulkhead with integrated frame | Siegfried Roth, Detlef Benz, Anton Reichle, Reiner Teske, Peter Zimmermann, Peter Hager, Josef Mueller, Werner Poenitzsch | Dornier Luftfahrt GmbH | 1990-02-27 | 1991-11-05 | Expired - Lifetime | 3 | 3 | 19 | 160 | B | 1 |
| US9776704B1 | Composite pressure bulkhead | Russell Rufino, Kyle McNamara, Ta Yau Lin, Brice A. Johnson, Robert Vitlip | Boeing Co | 2016-05-16 | 2017-10-03 | Active | 12 | 11 | 20 | 31 | B | 1 |
| US9593740B2 | Energy-absorbing composite tension-shear fitting | Matthew S. Stauffer, Douglas R. Ludin, Eric J. Schulze | Boeing Co | 2015-05-13 | 2017-03-14 | Active | 10 | 9 | 20 | 5 | T | 1 (weak) |
| US8016236B2 | Method and apparatus for attaching a wing to a body | James C. Grieve, Francis A. Andrews, Marcus A. Erickson | The Boeing Company | 2007-04-04 | 2011-09-13 | N/A (blocked) | N/A (blocked) | **22 (over 15)** | 20 | N/A (blocked) | T | 1 (weak, large) |
| US1619372A | Wing construction for metal airplanes | Adolf Rohrbach | N/A (none printed) | 1924-03-24 (Google priority 1922-11-03) | 1927-03-01 | Expired - Lifetime | 1 | 1 | N/A | 21 | S | 1 |
| US1822943A | Plate wall girder | Herbert Wagner | Rohrbach Metall-Flugzeugbau G.m.b.H. | 1927-06-29 (DE 1926-07-09) | 1931-09-15 | N/A (blocked) | N/A (blocked) | 2 | N/A | N/A (blocked) | S | 1 |
| US5039571A | Metal-resin laminate reinforced with S2-glass fibres | Laurens B. Vogelesang, Gerardus H. J. J. Roebroeks | Akzo NV | 1988-10-11 (NL 1987-10-14) | 1991-08-13 | Expired - Lifetime | 7 | 7 | 13 | 118 | S | 1 |
| US11618215B2 | Method for manufacturing a fuselage component for an aircraft, fuselage component for an aircraft and aircraft | Peter Linde, Norbert Heltsch | Airbus Operations GmbH | 2019-08-29 | 2023-04-04 | N/A (blocked; Google shows "Granted" on the A1) | N/A (blocked; A1 shows 6) | 5 | 8 | N/A (blocked; A1 shows 4) | A | 1 (weak) |

### Topic fit: one verbatim line from each document

Old-patent locations are page and line of the printed specification.

| ID | Quote | Where read |
|---|---|---|
| US1425113A | "The accompanying drawing illustrates a typical application of my invention as applied to the manufacture of aircraft bodies." | p.1 l.67-70, USPTO scan, checked by eye |
| US1894011A | "the bracing members, instead of being straight and so reducing the interior space of the structure, are formed with their axes as geodesics" | p.1 l.25-29, USPTO scan, checked by eye |
| US4310132A | "A fuselage structure comprising: a fuselage having a longitudinal axis; an external skin of alternate layers of composite material" | Claim 1, cached Google text |
| US7527222B2 | "An aircraft fuselage comprising: a one-piece barrel section having a cross-sectional dimension of at least 12 feet" | Claim 34, cached Google text |
| US5062589A | "Pressure loaded aircraft bulkhead element, internal aircraft partition element or end element in an aircraft" | Claim 1, cached Google text |
| US9776704B1 | "A pressure bulkhead comprising: a plurality of layers of composite fiber material having uni-directional fibers" | Claim 1, cached Google text |
| US9593740B2 | "The fitting of this disclosure is a structural composite tension-shear fitting for use in an aircraft structure." | Description, Field, cached Google text |
| US8016236B2 | "This fitting is a tension fitting." (said of wing spar fitting 200) | Description, OCR of USPTO PDF. The term appears once; claim 1 says "wing spar fitting" |
| US1619372A | "a novel wing structure, generally of the box girder type, including an internal frame construction and stressed skin covering plates" | Description, cached Google OCR |
| US1822943A | "the vertical plate is provided with such thin walls, that it forms a closed diagonal panel with transverse folds" | p.1 l.46-49, USPTO scan, checked by eye |
| US5039571A | "An aircraft fuselage, wherein the skin sheet is composed of the laminate according to claim 1." | Claim 10, cached Google text |
| US11618215B2 | "A method for manufacturing a fuselage component for an aircraft using material extrusion" | Claim 1, OCR of USPTO PDF |

Fit caveats:
- **US1425113A:** a process patent, and claim 1 says only "curved shells". The aircraft application is in the description and the drawing ("one half of the shell of a fusilage", as printed).
- **US1619372A:** a wing, not a fuselage, so it sits under S.
- **US9593740B2:** the described use is an aircraft floor, such as a cargo tie-down joint in an underfloor frame. It is not a wing-to-body joint.

### Notability evidence

"Number cited" says whether the source names this patent number. Quotes were checked against the fetched page text, except where noted.

| ID | Basis | Evidence URL | Quote | Number cited? What is not documented |
|---|---|---|---|---|
| US1425113A | Program link, historical | http://www.aviation-history.com/theory/plywood.htm | "Northrop, Stadlman, and the Lougheads devised and patented a process to make molded plywood monocoque fuselage shells (US Patent #1,425,113, August 8, 1922)." | **Yes.** The same number is in https://en.wikipedia.org/wiki/Loughead_S-1_Sport, tied to the S-1: "The fuselage was built using an all-wood, multi-layer monocoque laid up in concrete molds." The patent itself names Malcolm Loughead as sole inventor, so the source's group attribution is looser than the document. |
| US1894011A | Program link via inventor and construction, historical | https://www.barneswallisfoundation.co.uk/?p=14 | "Designed by Barnes Wallis using geodetic construction, a Vickers Type 253 bi-plane won the G4/31 contest"; "Wallis' geodesic airframe construction pioneered in the Wellesley and Wellington" | No. Science Museum holds Wallis's own account of geodetic construction on these aircraft (https://collection.sciencemuseumgroup.org.uk/documents/aa110121499; catalogue page read, quote not byte-checked). A later Wallis patent, US2060387, cites 1,894,011 as the geodetic type, but that is a patent citing a patent. |
| US4310132A | High citations, NASA record | https://ntrs.nasa.gov/citations/19820018508 | Record metadata: "NASA-CASE-LAR-11688-1\|US-PATENT-4,310,132"; organization "Boeing Commercial Airplane Co." | Yes, as a NASA-hosted patent record. **No specific aircraft documented.** cited_by 293. |
| US7527222B2 | Highest citations; 787 context only | https://www.compositesworld.com/articles/the-first-composite-fuselage-section-for-the-first-composite-commercial-jet | "combining an automated fiber/tape placement process with co-cured stringers to form a one-piece barrel" (Spirit AeroSystems' 787 fuselage section) | **No.** The cached patent text never names the 787 or 7E7. The 787 did use one-piece barrels, but no source found says this patent covers them. Do not state that it does. cited_by 320. |
| US5062589A | High citations only | https://patents.google.com/patent/US5062589A/en | N/A | **No aircraft link documented.** cited_by 160. |
| US9776704B1 | Moderate citations only | https://patents.google.com/patent/US9776704B1/en | N/A | **No aircraft link documented.** The text names no Boeing model. The 787 has a composite aft bulkhead, built by EADS Augsburg (https://www.compositesworld.com/news/boeing-787-aft-pressure-bulkhead-passes-fatigue-test-for-certification), but nothing ties this patent to it. cited_by 31. |
| US9593740B2 | Weak | https://patents.google.com/patent/US9593740B2/en | N/A | **Fails criterion 2 on its own.** No aircraft link, cited_by 5. Kept for literal topic fit. |
| US8016236B2 | Weak | https://patents.google.com/patent/US20200189714A1/en | N/A (lists US8016236B2 among its cited documents) | **No aircraft link documented.** Forward count unavailable; one citing document confirmed (Bombardier). Kept because it is the clearest literal wing-to-body tension fitting found. |
| US1619372A | Historical | https://en.wikipedia.org/wiki/Stressed_skin | "Dr.-Ing Adolf Rohrbach is credited with coining the term \"stressed skin\" in 1923." | No. The same page says "Oswald Short patented an all-metal, stressed-skin wing in the early 1920s", so priority is contested and this patent is not claimed as first. cited_by 21. |
| US1822943A | Historical; theory lineage | https://ntrs.nasa.gov/citations/19930081248 | NACA-TN-469 abstract: "beams with very thin webs, as developed by Professor Wagner of Germany." Also https://en.wikipedia.org/wiki/Herbert_A._Wagner: "he also invented the so-called Wagner beam" | No. The match to Wagner's diagonal-tension beam is my inference from the inventor, the Rohrbach assignment and the text ("closed diagonal panel with transverse folds"). **No specific aircraft documented for this patent.** |
| US5039571A | Program link via assignee and date; citations | https://tudelft.nl/innovatie-impact/project-cases/glare | "Akzo Nobel filed the patent for GLARE in 1987. It's currently being applied on the Airbus A380." | No. The assignee (Akzo) and NL priority (1987-10-14) match, and the page does not name the number. cited_by 118. |
| US11618215B2 | Weak | https://patents.google.com/patent/US20200079013A1/en | N/A | **Fails criterion 2 on its own.** No aircraft or program link, cited_by 4 on the A1. Press on a printed fuselage panel (https://assemblymag.com/articles/94203-printed-fuselage-panel-is-self-reinforced) covers Stelia's metal wire-arc process, a different technology from a different company, and is not evidence for this patent. |

### Drawing count: checked or inferred

Checked means I looked at the sheets in a USPTO print PDF and read the printed count. All 12 have real drawings. Quality notes are from looking at them.

| ID | Check | Sheets | Note |
|---|---|---|---|
| US1425113A | Checked | 1 | Mold section and elevation, 2 figures |
| US1894011A | Checked (sheet 1 and 2 viewed; legend "4 Sheets") | 4 | Geodetic frame detail |
| US4310132A | Checked | 4 | 6 figures. The front page's "6 Drawing Figures" is figures, not sheets |
| US7527222B2 | Checked | 11 | Barrel structure and manufacturing cells |
| US5062589A | Checked | 3 | Bulkhead sections |
| US9776704B1 | Checked | 11 | Includes a flowchart and layup views |
| US9593740B2 | Checked | 9 | Simple fitting views |
| US8016236B2 | Checked | **22** | 28 figures, many near-repeat views of one fitting, so tracing is partly repetitive |
| US1619372A | Checked | 1 | 6 or more small figures on one sheet |
| US1822943A | Checked | 2 | 11 figures |
| US5039571A | Checked | 7 | **Borderline on "real mechanical drawings":** 4 sheets are plots, 2 are test coupons, 1 is laminate sections |
| US11618215B2 | Checked | 5 | Shell, print head, layer sections |

`drawing_images` is not a safe proxy for cost. It ran one above printed sheets on US7527222B2, US9776704B1, US9593740B2 and the US11618215B2 family, apparently because it counts the front-page figure. It matched on US4310132A, US5062589A, US5039571A, US1425113A and US1619372A.

## Tier 2 (alternates)

Counts are `drawing_images` from Google unless marked. "Checked" means a printed legend or USPTO sheets were seen; otherwise the count is inferred from Google or from page layout. None was program-linked by an independent source except where stated.

| ID | Title (assignee, published) | Topic | Count | Why alternate |
|---|---|---|---|---|
| US9481931B2 | Method and arrangement for building metallic objects by solid freeform fabrication (Norsk Titanium AS, 2016-11-01) | A | 4 sheets, checked | **Best real-part link in this topic, but fails criterion 1.** Norsk's process made 787 structural parts: "the first FAA-approved 3D printed titanium structural components" (https://3dprint.com/170652/norsk-titanium-boeing-aircraft/). The patent never mentions aircraft (OCR search: 0 hits), and the article cites no number. Promote it if a production link should outrank text fit. 2 of the 4 sheets are prior art. Not cached in Google. |
| US10828722B2 | Manufacturing metallic components having integrated crack stoppers (Airbus Operations GmbH) | A | 2 sheets, from the printed legend | Description: "components of aircraft". Claim 1 is a generic metallic component with a hole. No notability evidence. Not cached. |
| US10518489B2 | Composite structures incorporating additive manufactured components (Aurora Flight Sciences) | A | 10 sheets, from the printed legend | Printed joints in a composite fuselage structure. No commercial aircraft link found. Not cached. |
| US2362951A | Pressure-tight cabin for aircraft (Wallis, 1944-11-14) | B/F | 1 sheet, checked | Oldest pressure document found. Claim 1: "A pressure cabin for aircraft, comprising a structural frame, an airtight inner wall". It claims a cabin wall, not a bulkhead, so it fails strict fit. It names a geodetic fuselage in the text. Wellington high-altitude variants are documented only by enthusiast sources I did not quote, and none ties this patent to them. Not cached. |
| US8226870B2 | Pressure bulkhead made of composite material for an aircraft (Airbus Espana SL, 2012-07-24) | B | 4 | cited_by 47. One-piece sandwich rear bulkhead. No aircraft named. Claims are a manufacturing process. |
| US8939404B2 | Pressure fuselage of an aircraft with dome-shaped pressure bulkhead (Airbus Operations GmbH, 2015-01-27) | B | 3 | cited_by 35. Claims a ring frame and tension struts. Cheap to trace. |
| US9637215B2 | Pressure bulkhead for an aircraft and device as well as method (Airbus Operations GmbH, 2017-05-02) | B | 4 | **Lead confirmed.** Fits, cited_by 18, no aircraft link. |
| US10689088B2 | Extended rear pressure bulkhead (Airbus Operations GmbH, 2020-06-23) | B | 4 | **Lead confirmed.** Claims a non-circular, non-planar bulkhead edge. cited_by 7, no aircraft link. |
| US10926858B2 | Pressure bulkhead system (Boeing Co, 2021-02-23) | B | 11 | cited_by 8. Aft bulkhead with compression ring and splice angles. No model named. |
| US9701392B2 | Joint (Airbus Operations Ltd/SAS, 2017-07-11) | T | 6 sheets, checked | "A tension joint typically comprises two or more abutting components joined with one or more tension fittings." The preferred use is wing tip to wing. Cheaper than US8016236B2. No program link found. Not cached. |
| US20200189714A1 | Aircraft wing-to-fuselage interface permitting positional adjustment (Bombardier Inc, 2020-06-18) | T | **20 (over 15)** | Figures 11A, 11B and 14 show aft and forward tension fittings. **Application, status Pending; EP3619108B1 is granted but foreign.** cited_by 17. The text mentions a long-range business jet; no source ties it to a model. |
| US8371532B2 | Aircraft joint (Airbus Operations Ltd, 2013-02-12) | T/S | 7 | cited_by 38. Pinned lug wing-fuselage joint. Discusses tension joints only as background. |
| US4489123A | Laminate of metal sheet material and threads bonded thereto (Delft University of Technology, 1984-12-18) | S | 5 | cited_by 234. ARALL, the predecessor of GLARE. Claim 1: "adapted for use as a structural component of an air craft". Drawings not inspected. |
| US6595467B2 | Aircraft fuselage shell component with crack propagation resistance (Airbus Operations GmbH, 2003-07-22) | F/S | 4 | cited_by 114. Welded shell with tension band. No aircraft link documented. |
| US8182628B2 | Composite barrel sections (Boeing Co, 2012-05-22) | F | 12 | Same family as US7527222B2. cited_by 225. Pick one. |
| US7459048B2 / US7410352B2 | One-piece inner shell for full barrel composite fuselage; Multi-ring system for fuselage barrel formation (Boeing Co, 2008) | F | 6 / 9 | cited_by 97 / 95. Tooling focus. No 787 mention in the text. |
| US2060387A | Aircraft body structure (Wallis, 1936-11-10) | F | 3 sheets, from the printed legend | Follow-on to US1894011. States that its bracing members "lie in geodetic lines". Not cached. |
| US2307708A | Monocoque structure (Northrop, Pavlecka; Northrop Aircraft, 1943-01-05) | F/S | 4 sheets, from the printed legend | "monocoque or stressed skin structures". Airfoil section joints. No aircraft link found. Not cached. |
| US1618536A | Erection of the hulls and the like of flying machines (Junkers, 1927-02-22) | F | 1, inferred from layout | Fits fuselage assembly: "built around a longitudinal support or girder". No program link found. Not cached. |
| US1704326A | Corrugated sheet-metal shape (Junkers, 1929-03-05) | S | 2 sheets, from the printed legend | cited_by 17. Connections between corrugated sheets. |

## Rejected

Examined:

| ID | Reason |
|---|---|
| US10220932B2 (lead) | Real fit (flat sandwich bulkhead), but cited_by 1, 2 images, no aircraft link |
| US11667368B2 (lead) | Real fit (tanks seated on a bulkhead), but cited_by 2, no aircraft link |
| EP3064430A1 (lead) | Foreign counterpart of US10689088B2; the US grant is preferred |
| US20200079013A1 (lead) | Confirmed and on topic, replaced by its grant US11618215B2 |
| US1114364A (lead area: Junkers) | Thick-wing flying machine, not a fuselage construction. Google title field is garbled ("Hugo junkers") |
| US10173255B2 (lead: Divergent) | Claim 1 is "A vehicle" with an extrusion A-surface. "airplanes" appears only in a list of vehicle types. 29 images, over the limit. No commercial aircraft link. Other Divergent node filings were seen only as search snippets |
| US1929255A (lead: Northrop) | Objects are drag reduction and retractable gear, not structure |
| US2171818A (Wagner, Muttray) | Transparent crew compartment wall. The printed assignee is Junkers; Google search metadata wrongly showed Messerschmitt |
| US8348196B2 | Claim 1 concerns access openings in an airfoil. "tension fitting" is incidental. 13 sheets |

Not examined, so neither confirmed nor rejected on the merits. The block or a 403 stopped each one, or the lead turned up too late:

| ID | Status |
|---|---|
| CH92554A "Fuselage" (Junkers, priority 1917); AT96559B | Possibly the real Junkers landmark; foreign. Title seen only in search results. **Worth checking once Google clears** |
| US20170106964A1 "Corner tension fitting" (Boeing) | Title looks squarely on topic. Google blocked, Justia 403 |
| JPH0740895A "Composite tension fitting" (Mitsubishi Heavy, priority 1993) | Title looks on topic; foreign |
| US20160136891A1 (Airbus) | 3DPrint.com links this number in coverage of printing whole aircraft. Justia 403, text not read, so the claim is unverified |
| US20240409199A1 "Bionic Structural Element..." (Airbus) | Search snippet only; printing method not confirmed |
| US8042767B2 (Velicki, Thrash; Boeing) | Possible PRSEUS (NASA/Boeing stitched panel) link, not confirmed |
| US6843953 (EADS, VAP process) | CompositesWorld says the 787 aft bulkhead is made by "EADS' patented vacuum-assisted process (VAP)". PDF downloaded, claims not read. Likely a process patent rather than a bulkhead design |
| US11597490B1, US2157042A, US1549687A, EP1976751B1, WO2010003818A2, US9004406B2 | Seen in search results only |

Not found:
- **Airbus bionic A320 partition and A350 titanium bracket:** well documented as parts, but no patent number found.
- **Literal "tension clip":** no fuselage or wing-to-body patent found. The search returned 10 hits, and those seen were incidental or unrelated.
- **Pre-1970 pressure bulkhead structure:** the "pressure bulkhead" search before 1980 returned 54 hits. I saw the first 25, all incidental mentions such as cable seals and galleys. **The rest were not reviewed** because of the block.

## Blocked sources

- **`patents.google.com`: HTTP 503, an anti-bot signal.** From 2026-11-02 about 23:45 until 23:48:15.
  - My own paced `xhr/query` search calls came first. That endpoint was my choice and is not in the brief; 11 succeeded before the 12th returned 503, and they probably triggered the block.
  - I then retried once through `pipeline/fetch.py`: 17 requests, all 503, sent without a pause. `fetch.py` sleeps only after a success and does not stop on an error. That retry should not have gone out at that speed.
  - No further Google traffic from me after that. I have not probed since, so I do not know whether it has cleared.
  - Other research agents working in this repo share the same IP and may be affected.
- **Consequence for caching.** These were not cached in `work/_research/google/`: US1894011A, US1822943A, US8016236B2, US11618215B2 (Tier 1), plus US2060387A, US2157042A, US2362951A, US2171818A, US1618536A, US2307708A, US1929255A, US8348196B2, US9701392B2, US20170106964A1, US10518489B2, US10828722B2, US11597490B1, US9481931B2.
- **No `--pdf` run.** PDFs for the picks are not in `work/_research/pdf/`. USPTO print PDFs were used for checking in session scratch only, because this task may edit only this file.
- **To fill the gaps once Google clears** (try one ID first; `fetch.py` will not stop by itself on errors):
  ```
  python3 -I pipeline/fetch.py --pause 8 US1894011A US1822943A US8016236B2 US11618215B2
  ```
- **`patents.justia.com`:** 403 to WebFetch on the 2 pages tried; not retried.
- **Flightglobal:** paywalled. **aerospacemanufacturinganddesign.com:** returned an empty page.
- **USPTO print links (`image-ppubs.uspto.gov`):** worked, paced at 8 s, 24 PDFs, no errors.

## Sources

Patent documents:
- Cached pages: `https://patents.google.com/patent/<id>/en`, fetched 2026-11-02.
- USPTO print PDFs: `https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/<number>`.

Other sources, with page text checked against the quotes above unless noted:
- http://www.aviation-history.com/theory/plywood.htm
- https://en.wikipedia.org/wiki/Loughead_S-1_Sport
- https://www.barneswallisfoundation.co.uk/?p=14
- https://collection.sciencemuseumgroup.org.uk/documents/aa110121499 (read through WebFetch only)
- https://ntrs.nasa.gov/citations/19820018508
- https://ntrs.nasa.gov/citations/19930081248
- https://www.compositesworld.com/articles/the-first-composite-fuselage-section-for-the-first-composite-commercial-jet (dated 2018-07-01 per WebFetch)
- https://www.compositesworld.com/news/boeing-787-aft-pressure-bulkhead-passes-fatigue-test-for-certification (dated 2008-03-01 per WebFetch)
- https://en.wikipedia.org/wiki/Stressed_skin
- https://en.wikipedia.org/wiki/Herbert_A._Wagner
- https://tudelft.nl/innovatie-impact/project-cases/glare
- https://3dprint.com/170652/norsk-titanium-boeing-aircraft/ (dated 2017-04-10 per WebFetch)
- https://3dprint.com/135561/airbus-patent-airplanes/ (read through WebFetch only)
- https://assemblymag.com/articles/94203-printed-fuselage-panel-is-self-reinforced (dated 2018-03-28 per WebFetch)

Secondary sources are Wikipedia, enthusiast history sites and trade press. No primary manufacturer record was found linking any of these patent numbers to a production part.
