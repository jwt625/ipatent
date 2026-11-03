# Interactive Patents

Interactive gallery of classic patents, built from the USPTO scans with one pipeline: verbatim text with
column:line citations, and every figure retraced as vector elements keyed to its reference numerals.

Live: https://outside5sigma.com/ipatent/

| Group | Patent | Title | Figures |
|---|---|---|---|
| Cray | US 4,128,880 (1978) | Computer Vector Register Processing | 12 |
| Cray | US 5,131,233 (1992) | Gas-Liquid Forced Turbulence Cooling | 5 |
| Impact and royalties | US 4,018,121 (1977) | Method of Synthesizing a Musical Sound (Chowning, FM synthesis) | 18 |
| Impact and royalties | US 4,200,770 (1980) | Cryptographic Apparatus and Method (Hellman, Diffie, Merkle) | 6 |
| Impact and royalties | US 4,859,016 (1989) | Fiber Optic Amplifier (Shaw, Digonnet; 3 reexamination certificates) | 14 |
| Impact and royalties | US 6,285,999 B1 (2001) | Method for Node Ranking in a Linked Database (Page, PageRank) | 3 |
| Classic products | US 3,138,743 (1964) | Miniaturized Electronic Circuits (Kilby, integrated circuit) | 14 |
| Classic products | US 3,659,915 (1972) | Fused Silica Optical Waveguide (Maurer, Schultz, Corning) | 2 |
| Classic products | US 3,821,715 (1974) | Memory System for a Multi-Chip Digital Computer (Hoff, Mazor, Faggin, Intel) | 5 |
| Classic products | US 5,061,049 (1991) | Spatial Light Modulator and Method (Hornbeck, TI DMD) | 73 |
| Industry legends | US 2,524,035 (1950) | Three-Electrode Circuit Element (Bardeen, Brattain, transistor) | 18 |
| Industry legends | US 3,387,286 (1968) | Field-Effect Transistor Memory (Dennard, DRAM cell) | 9 |
| Industry legends | US 3,541,541 (1970) | X-Y Position Indicator (Engelbart, mouse) | 7 |
| Robot wrists | EP 0 200 202 A2 (1986) | Wrist Mechanism for Industrial Robot (Hitachi; withdrawn application) | 12 |
| Robot wrists | US 8,047,093 (2011) | Parallel Robot (Kinoshita, Yamashiro, Fanuc) | 7 |
| Robot wrists | US 8,109,173 (2012) | Parallel Robot Provided with Wrist Section Having Three Degrees of Freedom (Kinoshita, Yamashiro, Fanuc) | 14 |
| Robot wrists | US 8,307,732 (2012) | Parallel Link Robot (Kinoshita et al., Fanuc) | 23 |
| Mechanosynthesis and mechanical computing | US 10,481,866 (2019) | Mechanical Computing Systems (Merkle, Freitas et al., CBN Nano) | 45 |
| Mechanosynthesis and mechanical computing | US 2022/0106338 A1 (2022) | Systems and Methods for Mechanosynthesis (Merkle, Freitas et al., CBN Nano; published application) | 53 |
| Mechanosynthesis and mechanical computing | US 11,720,084 (2023) | Efficient and Manufacturable Mechanical Computing (Ryley et al., CBN Nano) | 94 |
| Aircraft structures | US 1,425,113 (1922) | Process of Manufacturing Curved Forms of Plywood (Malcolm Loughead) | 2 |
| Aircraft structures | US 1,619,372 (1927) | Wing Construction for Metal Airplanes (Rohrbach) | 7 |
| Aircraft structures | US 1,822,943 (1931) | Plate Wall Girder (Wagner) | 11 |
| Aircraft structures | US 1,894,011 (1933) | Construction of Fuselage or Other Bodies of Aircraft (Wallis, geodetic) | 5 |
| Aircraft structures | US 4,310,132 (1982) | Fuselage Structure Using Advanced Technology Fiber Reinforced Composites (NASA) | 6 |
| Aircraft structures | US 5,039,571 (1991) | Metal-Resin Laminate Reinforced with S2-Glass Fibres (Akzo) | 15 |
| Aircraft structures | US 5,062,589 (1991) | Fiber Reinforced Pressure Bulkhead with Integrated Frame (Dornier) | 6 |
| Aircraft structures | US 7,527,222 (2009) | Composite Barrel Sections for Aircraft Fuselages (Boeing) | 21 |
| Aircraft structures | US 9,593,740 (2017) | Energy-Absorbing Composite Tension-Shear Fitting (Boeing) | 9 |
| Aircraft structures | US 9,776,704 (2017) | Composite Pressure Bulkhead (Boeing) | 16 |
| Aircraft structures | US 2017/0106964 A1 (2017) | Corner Tension Fitting (Boeing; published application, granted as US 9,926,066) | 19 |
| Aircraft structures | US 11,618,215 (2023) | Method for Manufacturing a Fuselage Component for an Aircraft (Airbus) | 11 |

Open `index.html` (gallery, about 2 MB); each patent is a self-contained `p/<pn>.html` (1~10 MB) that
works from `file://` with no network. Term status (`meta.json` `status`) is computed from the statutory
rules and printed disclaimers, cross-checked against Google Patents legal status; it is not legal advice.

## Views

- **Gallery** (`index.html`): search (number, title, people, places, part names), Cards / Table views,
  12 sort keys (table headers sort too), facet chips (group, decade, assignee kind, country). State is in the
  hash (`#/?v=table&s=issued&d=desc&q=stanford`). Each patent opens its own page `p/<pn>.html`.
- **Figures**: figure list, pan/zoom stage, part panel. Every reference numeral is a traced
  vector element: hover or click its body, label or leader. Named unnumbered bodies (molecules) show their name
  on hover. View modes: Redraw (vector trace),
  Scan (original sheet), Overlay (trace over scan). Parts tour steps through parts in order of first
  mention; timing figures get a clock-period slider. Keys: Left/Right part, Up/Down figure, F fit, Esc clear.
- **Description / Claims**: verbatim text with column:line citations (click a citation for the scanned
  page). Numerals and FIG. references are links; hovering a numeral highlights the part in the
  figure pane beside the text.
- **About**: context note, bibliographic data, glossary, parts index, references, sources.

Patent text is quoted verbatim (typos as printed). Context added by us is always in a box labeled "Note".

## Pipeline

See `pipeline/DATA_SCHEMA.md` and `pipeline/TRACE_SCHEMA.md`. The whole workflow, including agent
briefs and lessons learned, is the Claude skill `.claude/skills/patent-figure-viewer/`.

Fresh checkout: `index.html` is committed and works as is. To rebuild or trace, regenerate `work/`
first: `pipeline/extract.sh <pn>` and `python3 -I pipeline/crop.py <pn>` for each patent.
Tools: poppler (`pdfimages`), tesseract, Python 3 with Pillow (numpy + scipy for `coverage.py`),
ImageMagick, Google Chrome (overlay, screenshots, self-test). For the packages:
`uv venv work/.venv --python 3.12 && uv pip install --python work/.venv/bin/python pillow numpy scipy`, then run with
`PATH=$PWD/work/.venv/bin:$PATH`.

```
python3 -I pipeline/fetch.py [--pdf] [--uspto] <id>...  # 0 paced cache of pages and PDFs -> work/_research/
pipeline/extract.sh <pn>                 # 1 page PNGs + OCR       -> work/<pn>/
(agents)                                 # 2 text.json: OCR corrected against scans + Google Patents
(agents) + python3 -I pipeline/crop.py <pn>   # 3 figures.json + upright crops
(agents) + python3 -I pipeline/overlay.py <pn> <fig> [--region x0,y0,x1,y1]   # 4 traces, overlay-checked
python3 -I pipeline/coverage.py <pn> <fig>   # 4 covered % + largest missing/extra ink regions
(agents)                                 # 5 notes.json
python3 -I pipeline/build.py             # 6 -> index.html
pipeline/selftest.sh                     # headless interaction self-test
pipeline/shoot.sh '#/<pn>/figures/<fig>' out.png   # headless screenshot
```

`work/` is regenerable (`extract.sh` + `crop.py`) and git-ignored. `data/` holds every hand-checked
artifact. Adding a patent: drop `sources/<pn>.pdf`, add `data/<pn>/meta.json` (`col1_page` = 0-based page
index of column 1), run the stages. `pipeline/build.py` rebuilds `index.html` plus the pages named in `--only`; a patent
without `work/` is skipped and drops from the gallery. `research/` holds how the 2026-11 batch was chosen, with evidence.

## Deploy

GitHub Pages from `main` at `/` (no build step; `.nojekyll`). The site inherits the custom domain of the
user site, so this repo has no CNAME: https://outside5sigma.com/ipatent/. All links are relative.
After `pipeline/build.py`, commit `index.html` and `p/*.html` and push.

## License

Code: GPL-3.0 (`LICENSE`). U.S. patent text and drawings are typically not subject to copyright (USPTO; exceptions in
37 CFR 1.71(d)-(e), 1.84(s)); no such notice was found in the 2026-11 batch of US documents. Several of these are in force:
reproducing a document here is not a licence to its invention. EP 0 200 202 A2 is reproduced as the EPO published it;
we did not find an EPO statement on reuse of patent documents to cite. Context notes added here are ours.
