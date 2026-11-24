# DevLog-006: plotter SVG export

| Field | Value |
|---|---|
| Date | 2026-11-23 |
| Status | Implemented, audited |
| Scope | New export of traced figures as pen-plotter SVG (lines only); one button in the Figures tab; batch CLI |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-23)
"do we have some svg handy from this project for sharing to [Plotterverse, a pen-plotter art gallery]" -> no SVG files exist;
traces are JSON rendered in the browser, with pattern fills, paper-colour knockouts and font text that a plotter cannot draw.
Then: "build the export and add button to FE."

Target site constraints (from the site context he pasted): one SVG per upload, max 5 MB; the server strips scripts, fills and
editor leftovers and keeps only lines; metadata includes paper size (A5, A4, A3, Letter, 11x14 in, 12x12 in), pen count, pen width.

## Plan
1. `viewer/plot-export.js` (no DOM, runs in the browser and in node): trace JSON -> SVG of stroked polylines only, in mm.
   - Every shape flattened to polylines in trace px (rect, circle, ellipse, polygon, polyline, path incl. C S Q T A).
   - Painter's order kept: opaque fills (`solid`, `paper`, arrowheads) remove the parts of earlier lines they cover
     (`ink: paper` lines remove a stroke-wide band); then the fill is drawn as lines; then the outline.
   - Fills as lines: `solid` -> dense 45 deg hatch at ~0.8 pen width; `hatch` -> printed hatching (pitch, angle, phase as the
     viewer's pattern); `stipple` -> dots; `dashes` -> short dashes; `light` -> outline only.
   - Dashed strokes cut into dash segments; arrow markers as filled triangles.
   - Text in a single-stroke Hershey font (Sans 1-stroke for Latin, Hershey Greek, math symbols), cap height matched to the
     viewer's Helvetica, `len`, `anchor`, `rot`, italic (12 deg shear), bold (heavier stem; in single-stroke mode a second pass),
     sub/superscripts. `ink: paper` text dropped.
   - Fit to paper with margin, auto orientation, centred; greedy nearest-neighbour path order with reversal and joining.
   - Layers: drawing and lettering, either one layer (one pen) or two Inkscape layers; lettering can be turned off.
   - Line weight (added after the first visual check): "as drawn" fills strokes wider than 1.4 pen widths with parallel passes
     (serpentine for open lines, concentric for closed), text stems at the viewer's Helvetica weight (0.085 em, bold 0.14 em);
     "single stroke" draws every line once.
2. `viewer/plot-font.js`: generated glyph table (polylines in 1/1000 em) from the `hersheytext` npm package 2.0.0 (MIT code; Hershey
   font data with its required acknowledgement in the file header) by `pipeline/make_plot_font.py`.
3. Figures tab: "Plot SVG" button next to Fit opens a small panel: paper, orientation, margin, pen width, line weight, lettering, preview,
   stats (paths, pen-down and travel length), Download. Settings remembered per browser.
4. `pipeline/plot_svg.js`: node CLI, same code, writes `work/plot/<pn>-fig-<id>-<paper>.svg` for one figure, a patent, or all.
5. `build.py`: plot scripts embedded in patent pages only (gallery has no Figures tab).

## TODO
- [x] DevLog plan (this file)
- [x] Font generator + `viewer/plot-font.js`
- [x] `viewer/plot-export.js`
- [x] Node CLI, export every traced figure, check timings, sizes, errors
- [x] Visual check against the viewer redraw on diverse figures (hatching, stipple, paper knockouts, arrows, Greek, rotated text)
- [x] Button + panel in `viewer/app.js` / `app.css`, `build.py`, rebuild, screenshot dark and light, phone width
- [x] Self-test: every traced figure exported in the browser, panel opened once per patent page
- [x] README + skill note
- [x] Fresh-context audit, 13 defects fixed (below)
- [ ] Download button click not exercised headless (blob URL + `a.download`); check by hand

## Progress
- 2026-11-23 Survey of all 805 traces: fills solid 8773, hatch 1125, paper 412, stipple 231, light 98, dashes 3; 440 dashed
  strokes, 45 arrows, 15 paper-ink lines; 27k text shapes (23k with `len`, 6.3k italic, 3.3k bold, 1.7k rotated, 590 with sub
  style); non-ASCII: O-slash 283, degree 99, Greek (tau, alpha, phi, Delta, beta, epsilon, gamma, mu, theta, delta, Lambda,
  Phi, omega, sigma, Omega, pi, lambda), and a few math signs.
- 2026-11-23 Font: Hershey Sans 1-stroke (EMS SVG font, Latin-1) + Hershey Greek/Math/Script from `hersheytext` 2.0.0; 243 glyphs,
  every one of the 117 characters used in traces covered. Raw Hershey paths list several points per `L`; the first parser read only
  the first (Greek came out as stubs), fixed.
- 2026-11-23 Measured in Chrome: Helvetica cap height 0.717 em; `baseline-shift: sub/super` moves by about 0.575 x the smaller font
  size (half its line height). Used for stroke text so it lands where the viewer draws it.
- 2026-11-23 Visual checks (viewer redraw vs export, headless Chrome side by side): Kilby 3,138,743 Fig. 1, Noyce 2,981,877 Fig. 2,
  Hellman 4,200,770 Fig. 1, Cray 5,131,233 Figs. 3 and 5, Dornier 5,062,589 Fig. 3b, Hornbeck 5,061,049 Fig. 21, 2,832,897 Fig. 10.
  Two fixes from them: line weight (small figures scaled to A4 lost their heavy lines), stipple dots as one pen touch (circles at
  pen width plotted far darker than the viewer's dots).
- 2026-11-23 Fresh-context audit (read-only subagent, probe scripts + side-by-side renders). Confirmed and fixed:
  1. occlusion skipped any trimmed line that kept its point count (2,142 clips in 14 figures; lines poked through white
     knockouts) -> compare points; 2. even-odd fill where the viewer's SVG uses nonzero (50 shapes, overlapping solid stripes
     left hollow in 3,118,022 Fig. 2) -> winding rule in point test and hatching; 3. heavy-line passes had flat ends and miter
     spikes or cut corners -> round caps (each pass runs on by its chord of the cap circle) and round outer joins;
     4. white strokes erased only their own width, neighbouring ink bled into thin slashes -> erase width + half a pen;
     5. plus-minus glyph drawn 0.5 em right of its box -> Hershey Math glyph; 6. `.` `,` `:` `;` dots 3 Hershey units above the
     baseline in the source data -> lowered; 7. margin larger than the paper gave an empty SVG -> error shown in the panel;
     8. no warning over 5 MB -> "(over 5 MB)" in the stats; 9. arrow on an empty path crashed; 10. empty result gave
     -Infinity stats -> "Nothing to draw"; 11. hatch phase missed the viewer's hw/4 offset; 12. panel: Escape inside a field,
     empty margin read as 0, download during the debounce, object URL not revoked on leaving the tab; 13. CLI: missing figure
     aborted the run, non-numeric options became NaN.
  Also taken from its uncertain list: stroke attributes on every path (in case the upload sanitiser drops group attributes),
  lettering squeezed by one stroke width so the inked text spans baseline to cap height like the viewer's, byte count in UTF-8.
  Left as is: theta draws as the script form (Hershey Greek has no upright lowercase theta); arc flags without separators
  (schema allows absolute commands only, none in data); ink may reach pen/2 into the margin.
- 2026-11-23 Batch after the audit fixes: all 805 traced figures on A4 in 5.2 s in node, 0 failures, 101 MB in `work/plot/`; largest
  SVG 1.3 MB and most paths 16,525 (1,894,011 Fig. 2), longest pen-down 58.7 m (10,481,866 Fig. 30). Self-test PASS on all 67 pages.
  Re-checked side by side: 3,118,022 Fig. 2, 821,393 Fig. 2, 10,481,866 Fig. 1, 3,138,743 Fig. 1.
