# DevLog-005: type styles and element restyle

| Field | Value |
|---|---|
| Date | 2026-11-18 |
| Status | Implemented, awaiting review |
| Scope | Viewer look only: fonts, element styles, palette. Layout, data and behavior unchanged |
| Authors | Claude Code, at Wentao Jiang's request |

## Request (2026-11-18)
"review repo and improve the visual and theme styles. The compact layout is fine, but i want
1. better font and element style to match the old school classic handwritten patent style, to different degrees, e.g., major and
   head text/elements with more curly and flamboyant font, and remaining font less, but still stylish.
2. pivot away from the LLM-like default styling and elements such as left vertical color line. Take a look at [a private project's] output pdf
   styling, as well as photonics atlas history tab immersive mode styling, and adapt it to this repo."
Follow-up: "maybe offer three styles for the user to pick, similar to the lithium-niobate project. (or three sets of fonts)"

## Plan
1. References: a private PDF style (Plate) and the photonics-atlas history tab. Adopted: warm neutral palette
   (#0d0d0d / #f2f1ec dark, #f1f0ec light), Playfair Display + Source Serif 4, all-small-caps labels, scotch rules (2px over 1px)
   over major heads, booktabs tables, light-fill tags and highlights, no shadows.
2. Element restyle, all styles: no left color bars (figure list, parts list, quotes, notes); selection = light accent fill; Note = amber
   tag on a light amber fill; tabs = italic display face with a fill when active; facet chips as fill tags; theme toggle as a sun /
   moon icon; numerals and citations in the text face with lining tabular figures instead of monospace.
3. Three type styles, picked in the header (three "Aa" buttons) like lithium-niobate's modes: `html[data-type]` set before paint
   from `?type=`, else localStorage `ipatent-type`, else the default.
   - Plate: Playfair Display heads (italic), Source Serif 4 text. Figure labels as printed (FIG. 1).
   - Copperplate (default): Pinyon Script for the brand, group names and figure labels (Fig. 1), IM Fell English for titles and
     section heads, Source Serif 4 text.
   - Specification: Mrs Saint Delafield signature script for the brand and group names, Old Standard TT (19th-century
     specification type) for everything else, italic drawing-style figure labels.
   Patent titles and most section headings are printed in caps (65 of 66 titles), so scripts are used only on mixed-case text.
4. Fonts: self-hosted in `fonts/` (OFL, license texts beside them), latin subsets; pages reference `fonts/` (gallery) and
   `../fonts/` (patent pages). Browsers that block file:// fonts fall back to Georgia; on the site all load.
5. Trace lettering in figures stays Helvetica: the retraced numerals are fitted to the scan and Overlay mode compares them.

## TODO
- [x] Preview the three styles on gallery, figures, description, about (scratch build, screenshots)
- [x] Fonts into `fonts/` with OFL texts
- [x] `viewer/app.css`, `viewer/template.html`, `viewer/app.js`, `pipeline/build.py`
- [x] Build all, self-test, screenshots of each style in dark and light
- [x] README views section
- [ ] Wentao picks the default style; commit when asked

## Progress
- 2026-11-18 23:20 PT: three previews built in a scratch folder from the repo data; screenshots checked.
- 2026-11-18 23:30 PT: follow-up "offer three styles for the user to pick": switch added (`html[data-type]`, header buttons).
- 2026-11-18 23:35 PT: full build, 66 patents, no skips; self-test 67/67 PASS. Screenshots checked: each style in light (figures) and
  dark (gallery table), Copperplate claims, phones at 390 px. Every selector of the old `app.css` is still defined.
- 2026-11-18 23:45 PT: phone header: brand reduced below 1000 px so the style buttons fit; rebuild, self-test 67/67 PASS.

## Open
- At 390 px the figures tab side panel is clipped on the right. Same in the committed pages before this change; not touched here.
- Firefox may block fonts from `../fonts/` when a patent page is opened from file://; text falls back to Georgia. Not tested.
