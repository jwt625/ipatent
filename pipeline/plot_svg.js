#!/usr/bin/env node
// Pen-plotter SVG export from the command line, same code as the viewer's "Plot SVG" button (viewer/plot-export.js).
// Usage: node pipeline/plot_svg.js <pn|all> [fig ...] [--paper A4] [--orient auto] [--margin 15] [--pen 0.3]
//        [--text merge|layer|off] [--out work/plot]
// Writes <out>/<pn>-fig-<id>-<paper>.svg and prints one line per figure (paths, pen-down m, travel m, kB, ms).
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
require(path.join(ROOT, 'viewer/plot-font.js'));
require(path.join(ROOT, 'viewer/plot-export.js'));
const { toPlotSVG, PAPERS } = globalThis.PlotExport;

const args = process.argv.slice(2), opt = { paper: 'A4', orient: 'auto', margin: 15, pen: 0.3, text: 'merge', out: 'work/plot' }, pos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) { const k = args[i].slice(2), v = args[++i]; opt[k] = ['margin', 'pen'].includes(k) ? +v : v; } else pos.push(args[i]);
}
for (const k of ['margin', 'pen']) if (!(opt[k] >= 0)) { console.error(`--${k} must be a number >= 0`); process.exit(2); }
if (!pos.length || !PAPERS[opt.paper]) {
  console.error(`usage: node pipeline/plot_svg.js <pn|all> [fig ...] [--paper ${Object.keys(PAPERS).join('|')}] ...`);
  process.exit(2);
}
const pns = pos[0] === 'all' ? fs.readdirSync(path.join(ROOT, 'data')).filter(d => fs.existsSync(path.join(ROOT, 'data', d, 'traces'))).sort() : [pos[0]];
const outDir = path.resolve(ROOT, opt.out); fs.mkdirSync(outDir, { recursive: true });
const slug = opt.paper.replace(/\s+/g, '');
let n = 0, fails = 0;
for (const pn of pns) {
  const tdir = path.join(ROOT, 'data', pn, 'traces');
  const figs = pos.length > 1 && pos[0] !== 'all' ? pos.slice(1) : fs.readdirSync(tdir).filter(f => /^fig-.*\.json$/.test(f)).map(f => f.slice(4, -5));
  for (const fig of figs) {
    const t0 = Date.now();
    try {
      const trace = JSON.parse(fs.readFileSync(path.join(tdir, `fig-${fig}.json`), 'utf8'));
      const { svg, stats: s } = toPlotSVG(trace, { ...opt, title: `${pn} Fig. ${fig}` });
      const out = path.join(outDir, `${pn}-fig-${fig}-${slug}.svg`);
      fs.writeFileSync(out, svg);
      console.log(`${pn} fig ${fig}: ${s.paths} paths, ${s.downM.toFixed(1)} m down, ${s.travelM.toFixed(1)} m travel, ${(s.bytes / 1e3).toFixed(0)} kB, ${Date.now() - t0} ms`);
      n++;
    } catch (e) { fails++; console.log(`${pn} fig ${fig}: FAILED ${e.message}`); }
  }
}
console.log(`${n} written to ${path.relative(ROOT, outDir)}, ${fails} failed`);
