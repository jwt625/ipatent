# Satoshi Kinoshita (Fanuc): parallel-link and wrist patents

Date: 2026-11-02

**Correction 2026-11-03 (audit):** `cited_by` in the tables below counted rows across Google's overlapping citation tables and is overstated. Distinct citing documents from the cached pages: EP0468061B1 14; EP0988939A1 12; EP2042273A1 17; JP2000190273A 9; JP2011056661A 8; JP2011240456A 7; JP4598864B2 61; JP4653848B1 86; JP4659098B2 70; JPH03239483A 16; JPH08197463A 5; JPH0847886A 5; JPH1026204A 6; JPS63192575A 1; US10272564B2 21; US5187996A 21; US6484067B1 43; US8047093B2 64; US8109173B2 73; US8307732B2 87; US8893578B2 25; US9168657B2 18; US9211647B2 26; US9806457B2 28; US9827682B2 19.


Scope: Fanuc-assigned patents naming inventor Satoshi Kinoshita (木下 聡), screened for parallel-link (delta) robots and wrist mechanisms, M-1iA / M-1iA/0.5A class.

All bibliographic numbers come from `pipeline/fetch.py` runs on Google Patents pages (cached in `work/_research/google/<id>.html`). `drawing_images` counts images on the Google page, not figures. `cited_by` is Google's forward-reference count. Status is as shown by Google, not checked against a register.

## Recommendation

| Tier | ID | drawing_images | Figure labels (from brief description) |
|---|---|---:|---:|
| 1 | US8109173B2 | 11 | 14 (1-6, 7A-B, 8A-B, 9A-B, 10, 11) |
| 1 | US8307732B2 | 15 | 23 (1-3, 4A-B, 5-7, 8A-C, 9A-B, 10A-B, 11-14, 15A-B, 16A-B) |
| 1 | US8047093B2 | 7 | 7 (1-3, 4A-B, 5, 6) |
| Total | | 33 | 44 |

Do not trace US8893578B2 as well as US8109173B2: it is a continuation-in-part of it (see Siblings).

## Families

Dates are for the representative. A JP or EP representative means no US grant was seen in that family on Google.

### Tier 1 and Tier 2

| Family | Representative | Title | Co-inventors | Filed | Published | Status (Google) | drawing_images | Claims | cited_by | Topic fit | Relationship to the two named patents | Tier |
|---|---|---|---|---|---|---|---:|---:|---:|---|---|---|
| F1 | US8109173B2 | Parallel robot provided with wrist section having three degrees of freedom | Hikaru Yamashiro | 2010-02-11 | 2012-02-07 | Active (anticipated expiration 2030-02-11) | 11 | 1 | 80 | wrist + delta | Named patent | 1 |
| F2 | US8307732B2 | Parallel link robot | Tomoaki Nagayama, Masahiro Yamamoto, Hidenori Kurebayashi, Katsumi Fujimoto, Tokitaka Uemura | 2010-07-16 | 2012-11-13 | Active (adjusted expiration 2031-05-24) | 15 | 8 | 105 | delta + wrist | Named patent. Separate family from F1; only Kinoshita in common | 1 |
| F3 | US8047093B2 | Parallel robot | Hikaru Yamashiro | 2010-01-12 | 2011-11-01 | Active (adjusted expiration 2030-02-01) | 7 | 5 | 73 | wrist + delta | Separate family, same two inventors as F1, earlier priority (2009-01-29 vs 2009-02-13). Its holder assembly recurs in F1 claim 1 | 1 |
| F4 | JPH0847886A | Hollow wrist of industrial robot | Akira Nihei, Kuniyasu Matsumoto | 1994-08-04 | 1996-02-20 | Pending (implausible for a 1994 filing; unverified) | 0 | 1 | 9 | wrist (serial arm) | None found | 2 |
| F5 | JPS63192575A | Wrist device for stud gun robot | Kenichi Toyoda, Nobutoshi Torii, Yasuo Naito, Kazuhisa Otsuka | 1987-02-03 | 1988-08-09 | Pending (implausible for a 1987 filing; unverified) | 0 | 1 | 2 | wrist (serial arm) | None found | 2 |
| F6 | JP2011240456A | Component supply device and assembly system | Hikari Yamashiro, Koji Yamamoto, Noboru Iwamatsu | 2010-05-20 | 2011-12-01 | Withdrawn | 8 | 8 | 11 | other (delta used as a component) | Separate. Embodiment robot is a parallel mechanism with a wrist; claims cover tray supply | 2 |

### Tier X (read, out of topic)

| Representative | Title | Co-inventors | Filed | Published | Status (Google) | drawing_images | Claims | cited_by | Topic fit | Why out | Tier |
|---|---|---|---|---|---|---:|---:|---:|---|---|---|
| US5187996A | Industrial articulated robot provided with a driving linkage | Nobutoshi Torii, Yasuo Naito | 1991-02-15 | 1993-02-23 | Expired - Fee Related | 5 | 4 | 32 | other | Vertical articulated arm with two out-of-phase linkages to pass dead center. "Parallel link" here is an arm drive linkage, not a delta. This is the family of JPH03239483A | X |
| JP2000190273A | End effector tilt mechanism | Akira Nihei | 1998-12-25 | 2000-07-11 | Pending (unverified) | 0 | 5 | 15 | other (wrist-adjacent) | Pneumatic tilt attachment on a faceplate of a 4/5-axis robot; borderline | X |
| JPH1026204A | Pressing mechanism of servo motor driven end effector | Akira Nihei | 1996-07-08 | 1998-01-27 | Pending (unverified) | 0 | 3 | 10 | other | Crank mechanism in a spot welding gun | X |
| JPH08197463A | Link devices such as industrial robots | Akira Nihei, Tamotsu Sakai | 1995-01-26 | 1996-08-06 | Pending (unverified) | 0 | 2 | 10 | other | Parallel four-bar link on a serial articulated arm, motor wiring | X |
| US6484067B1 | Industrial robot | Jun Ibayashi | 1998-07-14 | 2002-11-19 | Expired - Fee Related | 1 | 4 | 54 | other | Food-grade lubricant and seals | X |
| EP2042273A1 | Industrial robot | Ryo Nihei, Ryuji Takikawa | 2008-08-20 | 2009-04-01 | Withdrawn | 5 | 3 | 18 | other | Robot split into units for conveyance | X |
| EP0988939A1 | Industrial robot | Hiroshi Nakagawa | 1999-09-09 | 2000-03-29 | Withdrawn | 2 | 9 | 18 | other | Antimicrobial coating | X |
| US10272564B2 | Articulated industrial robot with downsized joint unit | Masahide Shinagawa, Yasuyoshi Tanaka | 2016-12-21 | 2019-04-30 | Active (adjusted expiration 2037-09-25) | 16 | 6 | 21 | other | Motor and reducer support in a joint | X |
| US9806457B2 | Articulated robot with connection member for connecting wire body arranged on arm | Hideyuki Watanabe | 2016-03-21 | 2017-10-31 | Active (anticipated expiration 2036-03-21) | 10 | 7 | 32 | other | Tube coupling recessed in an arm frame | X |
| US9827682B2 | Joint structure for robot including motor for causing arm to be swung | Satoshi Adachi, Yasuyoshi Tanaka | 2016-03-22 | 2017-11-28 | Active (anticipated expiration 2036-03-22) | 6 | 6 | 24 | other | Motor removal path through a serial arm joint | X |

The remaining 61 records are listed under "Screened by title and abstract snippet". Their pages were not cached.

## What each Tier 1 and Tier 2 family discloses

**F1, US8109173B2.** A parallel mechanism (three assembled-link structures, three servo-motors) gives the movable section three-axis translation; a wrist on it gives three-axis orientation change, for six axes in total. The text uses "delta-type" only for the conventional robot of FIG. 11 (JP4-45310B).
- Wrist: three rotary members on fourth, fifth and sixth axes, each orthogonal to the next; the tool attachment surface is inclined to the sixth axis at a predetermined angle.
- Claim 1 also requires three independent drive mechanisms, each with hollow outer, intermediate and inner holders, a servo-motor and a rod-shaped transmission member joined to the wrist through a universal joint.
- Figures: robot perspective and section (1-3), wrist front views (4, 5), robot perspective (6), hand attached (7A-B), wrist structure (8A-B), holder assembly sections (9A-B, 10), conventional parallel robot (11).

**F2, US8307732B2.** Delta type. An additional actuator sits between the two parallel driven links of a link, parallel to them, and a coaxial power transmission shaft carries its torque to a posture changing mechanism on the moving part.
- Figures: embodiment (1-3), driven link motion (4A-B), posture mechanisms for one and three added degrees of freedom (5, 6), spherical bearing (7), transmission shaft (8A-C), further embodiments (9A-B, 10A-B), background and prior art (11-14, 15A-B, 16A-B).
- Eight of the 23 figure labels are that background material. FIGS. 15A-B are discussed as background but their brief description does not say "prior art"; the others do.

**F3, US8047093B2.** A parallel mechanism with three assembled-link structures gives three-axis translation; the wrist gives rotation, and its drive comes from the base through a holder assembly.
- Claim 1: hollow outer holder rotatable about a first axis, hollow intermediate holder about an orthogonal second axis, hollow inner holder about an orthogonal third axis, plus a transmission member moving linearly in the inner holder while rotationally restrained.
- Figures: robot perspective and section (1, 2), movable section and wrist (3), holder assembly sections (4A-B, 5), second embodiment (6).

**F4, JPH0847886A.** Serial robot wrist with a hollow hole through the output-end rotation axis, routing cables and hoses inside the casing instead of around it. One figure (partial cutaway section).
- JP only per Google. No scan on the Google page (`pdf_url` null, 0 images), so ingest needs another source. English text is machine translation.

**F5, JPS63192575A.** Stud gun wrist with a swivel body at a set angle to the bend body, enlarging the gun's movable range. Three figures (side view, wrist schematic, conventional wrist).
- JP only per Google. No scan on the Google page (`pdf_url` null, 0 images). English text is machine translation.

**F6, JP2011240456A.** Component supply device: a storage shelf of trays with an assembly surface on top and a conveyor between them. The assembly robot in FIG. 4 is described as a parallel mechanism robot with three link structures at 120 degrees, a wrist part 130, a detachable hand and tool device, and motors 4a to 4f on the base. The description states a serial robot could also be used.

## Siblings per family

| Family | Member | Note |
|---|---|---|
| F1 | **US8893578B2** | **Continuation-in-part of US 12/704,027 (US8109173B2), stated in its text. Flag: shared spec and drawings.** Filed 2011-09-21, published 2014-11-25, Active (adjusted expiration 2031-08-15), 12 images, 1 claim, cited_by 29. Adds one figure (FIG. 12, schematic with the wall, cover and movable-section drive omitted) and one "another aspect" passage. Brief descriptions of FIGS. 1-11 match. Sheets were not compared as images |
| F1 | US20100206120A1 | Pre-grant publication of US8109173B2 |
| F1 | US20120060637A1 | Pre-grant publication of US8893578B2 |
| F1 | JP4659098B2 (JP2010184328A) | JP counterpart, priority application JP2009-030876, filed 2009-02-13, 11 images, cited_by 75 |
| F1 | JP5394358B2 (JP2011056661A) | JP division of JP2009-030876, filed 2010-12-14, 11 images. Romanized "Hikari Yamashiro" on Google, same name 光 山城 |
| F1 | CN101804631A/B, DE102010007631A1/A8/B4 | Listed on the Google family table; not opened |
| F2 | US20110097184A1 | Pre-grant publication of US8307732B2 |
| F2 | JP4653848B1 (JP2011088262A) | JP counterpart, priority application JP2009-245365, filed 2009-10-26, 16 images, cited_by 95 |
| F2 | CN102049776A/B, DE102010047315A1/B4 | Listed; not opened |
| F3 | US20100186534A1 | Pre-grant publication of US8047093B2 |
| F3 | JP4598864B2 (JP2010173019A) | JP counterpart, priority application JP2009-018519, filed 2009-01-29, 6 images, cited_by 61 |
| F3 | CN101791797A/B, DE102010006155A1/B4 | Listed; not opened |
| US5187996A | JPH03239483A | JP priority, filed 1990-02-15, 0 images, `pdf_url` null, status Pending on Google (unverified) |
| US5187996A | EP0468061A1/A4/B1, WO1991012117A1, DE69106255D1/T2, CA2050282A1 | EP0468061B1 opened (Expired - Lifetime); the others listed only |
| US6484067B1 | JPH1133949A, WO1999003649A1, EP0937549A1/A4 | Listed; not opened |
| EP2042273A1 | US20090084927A1, CN101396828A | Listed; no US grant seen |
| US10272564B2 | US20170182655A1, JP6416746B2 (JP2017113837A), CN106914918A/B, DE102016124969A1/B4 | Listed; not opened |
| US9806457B2 | US20160297081A1, JP6068548B2 (JP2016198849A), CN106041999A/B, DE102016003955A1/B4 | Listed; not opened |
| US9827682B2 | US20160288321A1, JP5980984B1 (JP2016196054A), CN106041988A/B, DE102016003641A1/B4 | Listed; not opened |

**F1 representative choice.** Both grants have one claim, and they differ:
- US8109173B2 claim 1: inclined attachment surface plus the holder assemblies.
- US8893578B2 claim 1: three input shaft members geared to the rotary members, driven by three servo-motors on the base. No inclined surface and no holder assembly. Its abstract still mentions the inclined surface.

US8109173B2 stays the representative because it was named and has the higher cited_by (80 vs 29). Swapping to US8893578B2 would add FIG. 12 at 12 images instead of 11.

**Link between F1 and F3.** Both claim the hollow outer, intermediate and inner holder assembly. On the Google pages, each appears in the other's similar-documents list, not as a citation. FIGS. 4A-B and 5 of US8047093B2 and FIGS. 9A-B and 10 of US8109173B2 have closely matching brief descriptions; the drawings themselves were not compared, so tracing overlap is possible but unconfirmed.

## Product link

Result for all families: **no documented product link found.** No cached patent page contains "M-1iA" or "Genkotsu", and no web source found names a patent or inventor for the M-1iA.

Official M-1iA sources:
- https://www.fanuc.co.jp/en/product/robot/f_r_genkotu2.html (read 2026-11-02): "FANUC Robot M-1iA", variants /0.5A /0.5S /0.5AL /0.5SL, controlled axes 6 / 4 / 6 / 4, max payload at wrist 0.5 kg standard, 1 kg option.
- https://www.fanucamerica.com/press-releases/fanuc-canada-demontrates-m-1ia-parallel-link-robot-at-advanced-manufacturing-canada (dated 2015-11-18): "The M-1iA is a lightweight and compact parallel-link robot designed for small part handling".

Speculation, axis count only: the six-axis architecture of US8109173B2 resembles the six-axis /0.5A, and the single-rotation wrist of US8047093B2 resembles the four-axis /0.5S. No drawing was compared with the product, and no source states either link.

## Excluded namesakes and other people

Non-Fanuc "Satoshi Kinoshita" records from the query `(parallel OR delta)` with no assignee filter. This is page 1 of 3, so 100 of 241 records were seen; 81 were non-Fanuc. No robot patent appeared among them.

| Assignee (as written by Google) | Records | Example |
|---|---:|---|
| Seiko Epson Corp | 23 | JP2008170931A |
| Seiko Epson Corporation | 14 | US8416494B2 |
| Nichia Chem Ind Ltd | 5 | JP2012015176A |
| Sony Corp | 5 | JP2009059504A |
| Fuji Kiko Co Ltd | 3 | JP2008207766A |
| Toshiba Corp | 3 | JP2009075791A |
| Casio Comput Co Ltd | 2 | JP2012145388A |
| Fuji Kiko Company, Limited | 2 | US5117707A |
| Mitsui Chemicals, Inc. | 2 | EP3045941B1 |
| Panasonic Corp | 2 | JP2010272993A |
| Toyota Boshoku Corp | 2 | JP2010142274A |
| 大成建設株式会社 | 2 | JP2016108805A |
| Fuji Kiko Kk | 1 | DE69207218T2 |
| Fujifilm Business Innovation Corp. | 1 | US20220067183A1 |
| I Peace, Inc. | 1 | US20220195370A1 |
| Kabushiki Kaisha Toshiba | 1 | US6904429B2 |
| Kinoshita Seisakusho:Kk | 1 | JP2009221528A |
| Kyushu Institute Of Technology | 1 | JP2014099490A |
| Mitsubishi Heavy Industries Engine & Turbocharger, Ltd. | 1 | US20220213933A1 |
| Nissan Motor Co., Ltd. | 1 | US4900059A |
| Nissan Motor Company | 1 | US4307626A |
| Shibuya Kogyo Co Ltd | 1 | JP2012161729A |
| Sony Corporation | 1 | US8285501B2 |
| Taiyo Yuden Co., Ltd. | 1 | US6566993B1 |
| Toshiba Tungaloy Co. Ltd., Kawasaki | 1 | DE69525248T2 |
| アイ ピース，インコーポレイテッド | 1 | JP2023086915A |
| セイコーエプソン株式会社 | 1 | JP2015018019A |
| 大日本印刷株式会社 | 1 | JP2017044498A |

Notes:
- The two I Peace records are cell culture filings, and Google shows US20220195370A1 under Fanuc in another query. Out of topic either way.
- Fanuc inventors with other given names, excluded: Mitsuo Kinoshita, Jiro Kinoshita, Hiroshi Kinoshita, Shinichi Kinoshita.
- A shared name and the Fanuc assignee do not prove one person across 1987-2026. Co-inventor overlap supports it for the robot filings; the cell culture filings were not checked.

Fanuc parallel-link leads that are not Kinoshita patents:

| ID | Inventors on Google | Note |
|---|---|---|
| US9168657B2 | Tokitaka Uemura | Additional actuator between driven links; same topic as US8307732B2, and Uemura is a co-inventor there. Cached and read |
| US9211647B2 | Tomoaki Nagayama | Calibration fixtures. Cached and read |
| US9694493 | Akira Kanemaru per search snippet | Umbilical member. Not opened; absent from the Kinoshita result set |
| US11420324B2, US11130224B2, US12090657B2, US10350753B2 | Not opened | Search hits; absent from the Kinoshita result set |

A search summary suggested a December 2016 Kinoshita umbilical filing for a parallel link robot. The December 2016 Kinoshita record found is US10272564B2, which is a joint unit patent. No such umbilical filing was found.

## Screened by title and abstract snippet

61 of the 79 records from the query below. Not cached, tier X by title and snippet only. Many are cell culture, molding take-out, brake, stopper and welding filings.

- DE102009035637B4: Robot system that uses a robot to load and unload a workpiece into and out of a … (filed 2009-07-31)
- DE102017108478B4: Joint construction for a robot (filed 2017-04-21)
- US10099389B2: Industrial robot comprising drive shaft provided with brake unit (filed 2015-03-10)
- US20070244609A1: Device and method for controlling electric motor (filed 2007-04-16)
- US11898130B2: Cell culture equipment (filed 2019-08-20)
- US20250250525A1: Cell culture vessel and cell culture device (filed 2025-04-23)
- EP3981446A1: Red blood cell removal device, mononuclear cell collector, cell culture device, … (filed 2020-06-10)
- US20250327008A1: Cell production system (filed 2025-06-27)
- JP2010221355A: Robot system equipped with articulated robot (filed 2009-03-24)
- US20260209667A1: Cell production device and system therefor (filed 2026-04-10)
- EP4056673A1: Cell culture device (filed 2020-10-30)
- US20160297066A1: Joint structure for robot including motor and speed reducer (filed 2016-03-23)
- EP4108757A1: Solution conveyance apparatus (filed 2020-02-21)
- EP4019620A1: Cell culture vessel and method for culturing cell (filed 2021-12-22)
- EP3992274A1: Cell cluster divider, cell cluster divider manufacturing method, and cell … (filed 2020-06-23)
- EP4023746A1: Cell production device (filed 2020-05-28)
- EP4023741A1: Cell production device and cell production method (filed 2020-05-28)
- US6956347B2: Robot with sensor (filed 2003-10-17)
- DE69114444D1: Control system for robots with acceleration and deceleration time constants. (filed 1991-05-15)
- EP0289614A1: Apparatus for setting the revolving zone of revolving drum of industrial robot (filed 1987-10-15)
- JPH0430988A: Display method for loading state of robot (filed 1990-05-24)
- JPH01228793A: Shunting condition detecting device for industrial robot (filed 1988-03-08)
- JPH09254076A: Heat insulation structure of robot (filed 1996-03-25)
- JPH01107979A: Method for controlling welding action of welding robot (filed 1987-10-20)
- JPH01143778A: Universal stud gun holder for welding robot (filed 1987-12-01)
- JPH06236205A: Gravity correction method during robot mastering (filed 1993-02-08)
- JPH0230485A: Detection device for operation zone of industrial robot (filed 1988-07-15)
- JPS63251811A: Controller for industrial robot (filed 1987-04-09)
- JPH01202378A: Method for controlling robot for stud welding (filed 1988-02-05)
- JPH05329792A: Robot arm balancer device (filed 1992-05-26)
- JPH0271991A: Mechanical stoppage device incorporated with electric stopper (filed 1988-09-03)
- JPH04256594A: Regulation device for motion area of industrial robot (filed 1991-02-06)
- US20050276877A1: Extracting device of molded article (filed 2005-06-07)
- US20050231332A1: Manual operating unit for robot (filed 2005-03-28)
- US20050057526A1: Teaching operation unit having touch panel (filed 2004-08-26)
- US7442030B2: Molded component retrieving apparatus and a molding machine having the molded … (filed 2005-03-08)
- JPH07293604A: Brake device built into the rotating device (filed 1994-04-25)
- JPH1158287A: Balance device for robots (filed 1997-08-12)
- EP1779982A2: Stop device for robot (filed 2006-10-23)
- EP1574299A1: Molded-product removing device (filed 2005-03-07)
- JPH08118282A: Arm extension type industrial robot (filed 1994-10-25)
- JPH04201193A: Cable handling device on industrial robot (filed 1990-11-30)
- JP2016055430A: Industrial robot having drive shaft including brake part (filed 2016-01-25)
- JPH04240089A: Revolving trunk stopper device for industrial robot (filed 1991-01-16)
- JPH11221789A: Sealed structure of industrial robot (filed 1998-02-06)
- EP1679174A1: Formed article taking-out apparatus and forming machine (filed 2006-01-10)
- JP2005349765A: Molded product ejector (filed 2004-06-11)
- US20260003172A1: Microscope observation system (filed 2025-09-05)
- JPH08155880A: Cables for industrial robots (filed 1994-12-05)
- US20020035413A1: Industrial robot (filed 1998-07-14)
- JPH07241787A: Balancer device for industrial robot (filed 1994-03-03)
- JPH0923679A: Robot drive mechanism using linear motor (filed 1995-07-05)
- JPH07243459A: Fluid pressure brake device (filed 1994-03-04)
- JPH09222318A: Linear motor traveling axis position detection mechanism (filed 1996-02-19)
- JPH0985670A: Swing motion range control device for industrial robot (filed 1995-09-27)
- JP2005254366A: Safety device of extraction machine (filed 2004-03-10)
- JPH10112971A: Mechanical brake mechanism for linear motor travel axis (filed 1996-10-03)
- JP2000141272A: Industrial robot (filed 1999-09-03)
- JPH1034574A: Winter cover for teaching operation panel (filed 1996-07-19)
- JPH04261797A: Turning drum over-travel detecting device for industrial robot (filed 1991-02-13)
- JPH1133973A: Shielded industrial robot (filed 1997-07-14)

## Gaps and blocked sources

- Justia: HTTP 403 on the inventor page and on a patent page. Not retried.
- Espacenet: HTTP 403 on one search URL. Not retried.
- Google query endpoint: nine scripted queries succeeded, then HTTP 503 on the tenth (2026-11-02). Treated as a rate signal and stopped, which is why the namesake sweep has only page 1 of 3.
- USPTO search and J-PlatPat were not queried, so enumeration rests on Google's inventor index alone. A patent missing from that index would be missed.
- Google's query appears to collapse families to one record, and which member it shows varies between queries. So 79 is a record count, not a verified family count.
- Fanuc brochures: `RM-1iA(E)-06c.pdf` returned 404; `DELTA(E)-01.pdf` exceeded the fetch size limit. Neither was read. automation.com returned 403.
- The six JP publications from 2000 or earlier that were read (JPH03239483A, JPS63192575A, JPH0847886A, JPH08197463A, JPH1026204A, JP2000190273A) have 0 images and no `pdf_url` on Google.
- PDFs were not downloaded for any pick. Sheet counts are not verified against scans.

## Sources

- Google Patents pages: `https://patents.google.com/patent/<id>/en` for every ID marked read or opened above, cached in `work/_research/google/`.
- Inventor query: `https://patents.google.com/xhr/query?url=inventor%3D%2522Satoshi%2BKinoshita%2522%26assignee%3DFanuc%26num%3D100` (79 records, 1 page; the query `inventor="Kinoshita Satoshi"` also gave 79).
- Other queries (same endpoint): `inventor="木下 聡"` + `assignee=ファナック` (19 records, no title containing parallel or パラレル); `inventor=Kinoshita` + `assignee=Fanuc` + `q=(parallel OR delta OR wrist)` (118); `inventor="Hikaru Yamashiro"` + `assignee=Fanuc` (255); `inventor="Tomoaki Nagayama"` + `assignee=Fanuc` + `q=(parallel)` (4).
- Fanuc pages listed under Product link.
