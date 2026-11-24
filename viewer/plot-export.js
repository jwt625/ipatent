// Pen-plotter export of a traced figure: trace JSON -> SVG of stroked polylines only, in mm (DevLog-006).
// No DOM: runs in the viewer and in node (pipeline/plot_svg.js). Text uses the single-stroke font window.PlotFont.
// Painter's order is kept: an opaque fill (solid, paper, arrowhead) or a paper-ink line removes the parts of earlier lines
// it covers; fills become line hatching; dashes are cut; text is set in the stroke font with the viewer's metrics.
(function (root) {
  const PAPERS = { A5: [148, 210], A4: [210, 297], A3: [297, 420], Letter: [215.9, 279.4], '11x14 in': [279.4, 355.6], '12x12 in': [304.8, 304.8] };
  const TAU = Math.PI * 2;
  const CAP = 0.717;           // Helvetica cap height / em (the viewer's trace lettering), measured in Chrome
  const SUBSHIFT = 0.575;      // Chrome baseline-shift sub/super: about half the line height of the smaller font
  const ITALIC = Math.tan(12 * Math.PI / 180);

  // ---------- small geometry helpers (points are [x, y] in trace px) ----------
  const bboxOf = (polys) => {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const p of polys) for (const q of p) { if (q[0] < x0) x0 = q[0]; if (q[0] > x1) x1 = q[0]; if (q[1] < y0) y0 = q[1]; if (q[1] > y1) y1 = q[1]; }
    return [x0, y0, x1, y1];
  };
  const overlap = (a, b) => a[0] <= b[2] && b[0] <= a[2] && a[1] <= b[3] && b[1] <= a[3];
  const closeRing = r => (r.length && (r[0][0] !== r[r.length - 1][0] || r[0][1] !== r[r.length - 1][1]) ? [...r, r[0]] : r);

  function ellipse(cx, cy, rx, ry, e) {
    const r = Math.max(rx, ry), da = r > e ? 2 * Math.acos(Math.max(-1, 1 - e / r)) : TAU / 8;
    const n = Math.max(8, Math.min(1440, Math.ceil(TAU / da)));
    const out = [];
    for (let i = 0; i <= n; i++) { const a = (i % n) / n * TAU; out.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return out;
  }

  function bezier(out, p0, p1, p2, p3, e, depth = 0) {
    // adaptive de Casteljau; p2 == null for quadratic (converted by caller)
    const d1 = distLine(p1, p0, p3), d2 = distLine(p2, p0, p3);
    if (depth > 14 || Math.max(d1, d2) <= e) { out.push(p3); return; }
    const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const a = m(p0, p1), b = m(p1, p2), c = m(p2, p3), ab = m(a, b), bc = m(b, c), mid = m(ab, bc);
    bezier(out, p0, a, ab, mid, e, depth + 1); bezier(out, mid, bc, c, p3, e, depth + 1);
  }
  function distLine(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
    if (L < 1e-9) return Math.hypot(p[0] - a[0], p[1] - a[1]);
    return Math.abs((p[0] - a[0]) * dy - (p[1] - a[1]) * dx) / L;
  }
  function arc(out, p0, rx, ry, phi, large, sweep, p1, e) {
    // SVG arc endpoint -> centre parameterisation (SVG 1.1 F.6.5)
    if (rx === 0 || ry === 0) { out.push(p1); return; }
    rx = Math.abs(rx); ry = Math.abs(ry);
    const c = Math.cos(phi), s = Math.sin(phi);
    const dx = (p0[0] - p1[0]) / 2, dy = (p0[1] - p1[1]) / 2;
    const x1 = c * dx + s * dy, y1 = -s * dx + c * dy;
    const lam = x1 * x1 / (rx * rx) + y1 * y1 / (ry * ry);
    if (lam > 1) { rx *= Math.sqrt(lam); ry *= Math.sqrt(lam); }
    let num = rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1; if (num < 0) num = 0;
    let k = Math.sqrt(num / (rx * rx * y1 * y1 + ry * ry * x1 * x1)); if (large === sweep) k = -k;
    const cx1 = k * rx * y1 / ry, cy1 = -k * ry * x1 / rx;
    const cx = c * cx1 - s * cy1 + (p0[0] + p1[0]) / 2, cy = s * cx1 + c * cy1 + (p0[1] + p1[1]) / 2;
    const ang = (ux, uy, vx, vy) => { const a = Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy); return a; };
    const t1 = ang(1, 0, (x1 - cx1) / rx, (y1 - cy1) / ry);
    let dt = ang((x1 - cx1) / rx, (y1 - cy1) / ry, (-x1 - cx1) / rx, (-y1 - cy1) / ry);
    if (!sweep && dt > 0) dt -= TAU; else if (sweep && dt < 0) dt += TAU;
    const r = Math.max(rx, ry), da = r > e ? 2 * Math.acos(Math.max(-1, 1 - e / r)) : TAU / 8;
    const n = Math.max(2, Math.ceil(Math.abs(dt) / da));
    for (let i = 1; i <= n; i++) {
      const t = t1 + dt * i / n, ex = rx * Math.cos(t), ey = ry * Math.sin(t);
      out.push(i === n ? p1 : [c * ex - s * ey + cx, s * ex + c * ey + cy]);
    }
  }

  // SVG path data -> [{pts, closed}] (absolute and relative commands)
  function flattenPath(d, e) {
    const toks = String(d).match(/[A-Za-z]|[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) || [];
    const subs = []; let cur = null, i = 0, cmd = 'M', x = 0, y = 0, sx = 0, sy = 0, lc = null, lq = null;
    const num = () => +toks[i++];
    const isNum = () => i < toks.length && !/^[A-Za-z]$/.test(toks[i]);
    const start = (px, py) => { cur = { pts: [[px, py]], closed: false }; subs.push(cur); sx = px; sy = py; };
    while (i < toks.length) {
      if (/^[A-Za-z]$/.test(toks[i])) cmd = toks[i++];
      const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
      const ox = rel ? x : 0, oy = rel ? y : 0;
      if (C === 'Z') { if (cur) { cur.closed = true; cur.pts.push([sx, sy]); } x = sx; y = sy; lc = lq = null; cur = null; continue; }
      if (!isNum()) { i++; continue; }
      if (!cur && C !== 'M') start(x, y);
      if (C === 'M') { x = ox + num(); y = oy + num(); start(x, y); cmd = rel ? 'l' : 'L'; lc = lq = null; continue; }
      if (C === 'L') { x = ox + num(); y = oy + num(); cur.pts.push([x, y]); lc = lq = null; }
      else if (C === 'H') { x = ox + num(); cur.pts.push([x, y]); lc = lq = null; }
      else if (C === 'V') { y = oy + num(); cur.pts.push([x, y]); lc = lq = null; }
      else if (C === 'C' || C === 'S') {
        const p0 = [x, y];
        const p1 = C === 'C' ? [ox + num(), oy + num()] : (lc ? [2 * x - lc[0], 2 * y - lc[1]] : [x, y]);
        const p2 = [ox + num(), oy + num()], p3 = [ox + num(), oy + num()];
        bezier(cur.pts, p0, p1, p2, p3, e); lc = p2; lq = null; x = p3[0]; y = p3[1];
      } else if (C === 'Q' || C === 'T') {
        const p0 = [x, y];
        const q = C === 'Q' ? [ox + num(), oy + num()] : (lq ? [2 * x - lq[0], 2 * y - lq[1]] : [x, y]);
        const p3 = [ox + num(), oy + num()];
        const p1 = [p0[0] + 2 / 3 * (q[0] - p0[0]), p0[1] + 2 / 3 * (q[1] - p0[1])], p2 = [p3[0] + 2 / 3 * (q[0] - p3[0]), p3[1] + 2 / 3 * (q[1] - p3[1])];
        bezier(cur.pts, p0, p1, p2, p3, e); lq = q; lc = null; x = p3[0]; y = p3[1];
      } else if (C === 'A') {
        const rx = num(), ry = num(), rot = num() * Math.PI / 180, la = num(), sw = num(), p1 = [ox + num(), oy + num()];
        arc(cur.pts, [x, y], rx, ry, rot, !!la, !!sw, p1, e); x = p1[0]; y = p1[1]; lc = lq = null;
      } else { i++; }
    }
    return subs.filter(s => s.pts.length >= 2 || s.closed);
  }

  // ---------- regions (closed rings, nonzero fill rule like the viewer's SVG): point test, hatching, clipping ----------
  function inside(pt, rings) {
    let wn = 0;
    for (const r of rings) for (let i = 0; i + 1 < r.length; i++) {
      const a = r[i], b = r[i + 1], c = (b[0] - a[0]) * (pt[1] - a[1]) - (pt[0] - a[0]) * (b[1] - a[1]);
      if (a[1] <= pt[1]) { if (b[1] > pt[1] && c > 0) wn++; } else if (b[1] <= pt[1] && c < 0) wn--;
    }
    return wn !== 0;
  }
  // parallel lines u = k * pitch + phase with u = x cos(a) + y sin(a): the viewer's pattern rotate(a) of a vertical line
  function hatch(rings, angleDeg, pitch, phase = 0) {
    const a = angleDeg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a), out = [];
    const R = rings.map(r => r.map(p => [p[0] * c + p[1] * s, -p[0] * s + p[1] * c]));
    let u0 = Infinity, u1 = -Infinity;
    R.forEach(r => r.forEach(p => { if (p[0] < u0) u0 = p[0]; if (p[0] > u1) u1 = p[0]; }));
    if (!(pitch > 0) || (u1 - u0) / pitch > 20000) return out;
    for (let k = Math.ceil((u0 - phase) / pitch); k * pitch + phase <= u1; k++) {
      const u = k * pitch + phase + 1e-7, xs = [];
      for (const r of R) for (let i = 0; i < r.length - 1; i++) {
        const p = r[i], q = r[i + 1];
        if ((p[0] <= u) !== (q[0] <= u)) xs.push([p[1] + (u - p[0]) * (q[1] - p[1]) / (q[0] - p[0]), q[0] > p[0] ? 1 : -1]);
      }
      xs.sort((m, n) => m[0] - n[0]);
      let wn = 0, v0 = 0;
      for (const [v, dir] of xs) {
        const was = wn; wn += dir;
        if (!was && wn) v0 = v;
        else if (was && !wn && v > v0) out.push([[u * c - v0 * s, u * s + v0 * c], [u * c - v * s, u * s + v * c]]);
      }
    }
    return out;
  }
  function segT(a, b, p, q) {
    const rx = b[0] - a[0], ry = b[1] - a[1], sx = q[0] - p[0], sy = q[1] - p[1], den = rx * sy - ry * sx;
    if (Math.abs(den) < 1e-12) return -1;
    const t = ((p[0] - a[0]) * sy - (p[1] - a[1]) * sx) / den, u = ((p[0] - a[0]) * ry - (p[1] - a[1]) * rx) / den;
    return u >= 0 && u <= 1 ? t : -1;
  }
  // parts of a polyline inside (keep = true) or outside (keep = false) the region
  function clip(pts, rings, keep) {
    const out = []; let cur = null;
    for (let i = 0; i + 1 < pts.length; i++) {
      const a = pts[i], b = pts[i + 1], ts = [0, 1];
      for (const r of rings) for (let j = 0; j + 1 < r.length; j++) { const t = segT(a, b, r[j], r[j + 1]); if (t > 0 && t < 1) ts.push(t); }
      ts.sort((m, n) => m - n);
      const at = t => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      for (let k = 0; k + 1 < ts.length; k++) {
        if (ts[k + 1] - ts[k] < 1e-9) continue;
        if (inside(at((ts[k] + ts[k + 1]) / 2), rings) === keep) {
          const p0 = at(ts[k]), p1 = at(ts[k + 1]), last = cur && cur[cur.length - 1];
          if (last && Math.abs(last[0] - p0[0]) < 1e-6 && Math.abs(last[1] - p0[1]) < 1e-6) cur.push(p1);
          else { cur = [p0, p1]; out.push(cur); }
        } else cur = null;
      }
    }
    return out;
  }
  function dashLine(pts, pat) {
    const tot = pat.reduce((m, n) => m + n, 0);
    if (!(tot > 0)) return [pts];
    const out = []; let k = 0, left = pat[0], on = true, cur = on ? [pts[0]] : null;
    for (let i = 0; i + 1 < pts.length; i++) {
      let a = pts[i]; const b = pts[i + 1]; let L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      while (L > left) {
        const t = left / L, p = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        if (on) { cur.push(p); out.push(cur); cur = null; } else cur = [p];
        on = !on; k = (k + 1) % pat.length; L -= left; a = p; left = pat[k];
      }
      left -= L; if (on) cur.push(b);
    }
    if (on && cur && cur.length > 1) out.push(cur);
    return out;
  }

  // parallel copy of a polyline at signed distance d, round joins on the outer side of each turn (the viewer's
  // stroke-linejoin: round), the miter point on the inner side (the vertex itself for turns sharper than ~150 deg)
  function offsetLine(p, d, closed, tol) {
    const q = [p[0]];
    for (const pt of p) { const l = q[q.length - 1]; if (Math.hypot(pt[0] - l[0], pt[1] - l[1]) > 1e-9) q.push(pt); }
    const n = q.length, nr = [], out = [];
    if (n < 2) return out;
    for (let i = 0; i + 1 < n; i++) { const dx = q[i + 1][0] - q[i][0], dy = q[i + 1][1] - q[i][1], L = Math.hypot(dx, dy); nr.push([-dy / L, dx / L]); }
    const m = nr.length, ring = closed && n > 2, sg = d < 0 ? -1 : 1, r = Math.abs(d);
    for (let i = 0; i < n; i++) {
      const a = i === 0 ? (ring ? nr[m - 1] : nr[0]) : nr[i - 1], b = i === n - 1 ? (ring ? nr[0] : nr[m - 1]) : nr[i], P = q[i];
      const z = a[1] * -b[0] - -a[0] * b[1];   // cross of the segment directions (n = direction turned +90 deg)
      if (a[0] * b[0] + a[1] * b[1] > 0.9999 || r < 1e-9) { out.push([P[0] + a[0] * d, P[1] + a[1] * d]); continue; }
      if (d * z < 0) {   // outer side of the turn: arc
        const a0 = Math.atan2(sg * a[1], sg * a[0]); let da = Math.atan2(sg * b[1], sg * b[0]) - a0;
        while (da > Math.PI) da -= TAU; while (da < -Math.PI) da += TAU;
        const step = r > tol ? 2 * Math.acos(Math.max(-1, 1 - tol / r)) : Math.PI / 4, ns = Math.max(1, Math.ceil(Math.abs(da) / step));
        for (let j = 0; j <= ns; j++) { const g = a0 + da * j / ns; out.push([P[0] + r * Math.cos(g), P[1] + r * Math.sin(g)]); }
      } else {
        const mx = a[0] + b[0], my = a[1] + b[1], ml = Math.hypot(mx, my), cos = ml / 2;
        out.push(cos < 0.25 ? [P[0], P[1]] : [P[0] + mx / ml * d / cos, P[1] + my / ml * d / cos]);
      }
    }
    return out;
  }
  // a stroke of width w drawn with a pen of width pen: parallel passes; open lines get round caps (each pass runs on
  // by its chord of the cap circle) and are joined end to end into one serpentine
  function weighted(p, w, pen, tol) {
    if (!(w > pen * 1.4) || p.length < 2) return [p];
    const closed = Math.abs(p[0][0] - p[p.length - 1][0]) < 1e-6 && Math.abs(p[0][1] - p[p.length - 1][1]) < 1e-6;
    const ds = lastDir(p, true), de = lastDir(p, false);
    if (!ds) return [p];
    const half = (w - pen) / 2, n = Math.ceil(2 * half / (pen * 0.8)) + 1, out = [];
    let snake = null;
    for (let k = 0; k < n; k++) {
      const d = -half + 2 * half * k / (n - 1), q = offsetLine(p, d, closed, tol);
      if (q.length < 2) continue;
      if (closed) { out.push(q); continue; }
      const e = Math.sqrt(Math.max(0, half * half - d * d)), a = q[0], b = q[q.length - 1];
      if (e > 1e-6) { q.unshift([a[0] + ds[0] * e, a[1] + ds[1] * e]); q.push([b[0] + de[0] * e, b[1] + de[1] * e]); }
      if (k % 2) q.reverse();
      if (snake) snake.push(...q); else { snake = q; out.push(snake); }
    }
    return out;
  }

  // ---------- text in the stroke font ----------
  function textLines(s, ctx) {
    const font = ctx.font, sz = s.size || 28, k = CAP / font.cap;   // px per font unit = font size * k (cap = CAP em)
    const ss = s.sub || ctx.sub || {}, ks = ss.scale != null ? ss.scale : 0.68;
    const glyphs = []; let cx = 0;
    String(s.s).split(/(_\{[^}]*\}|\^\{[^}]*\})/).forEach(p => {
      if (!p) return;
      const sub = p.startsWith('_{'), sup = p.startsWith('^{'), str = sub || sup ? p.slice(2, -1) : p;
      const fs = sub || sup ? sz * ks : sz;
      const dy = sub ? (ss.drop != null ? ss.drop : SUBSHIFT * fs) : sup ? -(ss.rise != null ? ss.rise : SUBSHIFT * fs) : 0;
      for (const ch of str) {
        const g = font.glyphs[ch] || font.glyphs['?'];
        glyphs.push({ g, x: cx, u: fs * k, dy });
        cx += g[0] * fs * k;
      }
    });
    // natural width cx (px); textLength stretches glyphs and spacing together
    const sx = s.len && cx > 0 ? s.len / cx : 1, W = cx * sx;
    const ax = s.anchor === 'middle' ? -W / 2 : s.anchor === 'end' ? -W : 0;
    const rot = (s.rot || 0) * Math.PI / 180, rc = Math.cos(rot), rs = Math.sin(rot);
    // stroke width of the viewer's Helvetica stems; without weight emulation bold is a second pass half a pen over
    const stem = s.bold ? 0.14 : 0.085, out = [], bold = s.bold && !ctx.weight ? [0, ctx.penPx * 0.5] : [0];
    for (const gl of glyphs) {
      // Hershey strokes are centrelines: squeeze them vertically so the inked stroke (stem, or the pen in single
      // stroke mode) spans baseline to cap height like the viewer's filled glyphs
      const fs = gl.u / k, sw = Math.min(ctx.weight ? stem * fs : ctx.penPx, CAP * fs * 0.5), vy = (CAP * fs - sw) / (CAP * fs);
      for (const pl of gl.g[1]) for (const off of bold) {
        const poly = [];
        for (let i = 0; i < pl.length; i += 2) {
          const gx = pl[i] * gl.u, gy = pl[i + 1] * gl.u * vy + sw / 2;   // px; y up from the glyph baseline
          let x = ax + (gl.x + gx) * sx + off + (s.italic ? gy * ITALIC : 0), y = gl.dy - gy;
          poly.push([s.x + x * rc - y * rs, s.y + x * rs + y * rc]);
        }
        out.push([poly, gl.u / k * stem]);
      }
    }
    return out;   // [[polyline, stroke width px], ...]
  }

  // ---------- trace -> layers of polylines (trace px) ----------
  function build(trace, ctx) {
    const items = [];   // {p: pts, b: bbox, layer}
    const add = (polys, layer, w = 0) => polys.forEach(p0 => {
      if (p0.length < 2) return;
      for (const p of ctx.weight && w ? weighted(p0, w, ctx.penPx, ctx.tolPx) : [p0]) if (p.length > 1) items.push({ p, b: bboxOf([p]), layer });
    });
    const occlude = rings => {
      const rb = bboxOf(rings);
      for (let i = items.length - 1; i >= 0; i--) {
        const it = items[i];
        if (!overlap(it.b, rb)) continue;
        const parts = clip(it.p, rings, false);
        if (parts.length === 1 && parts[0].length === it.p.length && parts[0].every((q, k) => Math.abs(q[0] - it.p[k][0]) < 1e-6 && Math.abs(q[1] - it.p[k][1]) < 1e-6)) continue;
        items.splice(i, 1, ...parts.map(p => ({ p, b: bboxOf([p]), layer: it.layer })));
      }
    };
    const solidFill = rings => hatch(rings, 45, ctx.penPx * 0.8);
    const dflt = trace.stroke || 3, e = ctx.tolPx;
    (trace.elements || []).forEach(el => (el.shapes || []).forEach(s => {
      if (s.t === 't') {
        if (s.ink === 'paper') return;
        textLines(s, ctx).forEach(([p, w]) => add([p], 'text', w)); return;
      }
      const w = s.w != null ? s.w : dflt;
      let rings = [], strokes = [];
      if (s.t === 'r') {
        const [x0, y0, x1, y1] = s.d; if (x1 < x0 || y1 < y0) return;   // negative size: the viewer draws nothing
        const r = [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]; rings = [r]; strokes = [r];
      } else if (s.t === 'c' || s.t === 'e') {
        const rx = s.d[2], ry = s.t === 'c' ? s.d[2] : s.d[3]; if (!(rx > 0) || !(ry > 0)) return;
        const r = ellipse(s.d[0], s.d[1], rx, ry, e); rings = [r]; strokes = [r];
      } else if (s.t === 'p') { const r = closeRing(s.d.map(q => [q[0], q[1]])); rings = [r]; strokes = [r]; }
      else if (s.t === 'l') { strokes = [s.d.map(q => [q[0], q[1]])]; }
      else if (s.t === 'path') { const subs = flattenPath(s.d, e); rings = subs.map(x => closeRing(x.pts)); strokes = subs.map(x => x.pts); }
      else return;
      const fill = s.t === 'l' ? 'none' : (s.fill || 'none');
      if (rings.length && (fill === 'solid' || fill === 'paper')) occlude(rings);
      if (fill === 'solid') add(solidFill(rings), 'draw');
      // the viewer's hatch line sits on the pattern tile edge: visible width hw/2, centred hw/4 past k * pitch
      else if (fill === 'hatch') add(hatch(rings, s.angle != null ? s.angle : 45, s.pitch || 14, (s.hw || 2) / 4), 'draw', (s.hw || 2) / 2);
      else if (fill === 'stipple' || fill === 'dashes') {
        const b = bboxOf(rings), tw = fill === 'stipple' ? 18 : 28, th = fill === 'stipple' ? 18 : 20;
        for (let ty = Math.floor(b[1] / th) * th; ty < b[3]; ty += th) for (let tx = Math.floor(b[0] / tw) * tw; tx < b[2]; tx += tw) {
          // a stipple dot (r 1.6 px) is one pen touch: a short stroke, lengthened only if the dot is wider than the pen
          if (fill === 'stipple') [[4, 4], [13, 9], [6, 14]].forEach(([dx, dy]) => {
            const c = [tx + dx, ty + dy], h = Math.max(3.2 - ctx.penPx, ctx.tolPx * 2.5) / 2;
            if (inside(c, rings)) add([[[c[0] - h, c[1]], [c[0] + h, c[1]]]], 'draw');
          });
          else [[[3, 5], [13, 5]], [[17, 15], [27, 15]]].forEach(([a, b2]) => add(clip([[tx + a[0], ty + a[1]], [tx + b2[0], ty + b2[1]]], rings, true), 'draw'));
        }
      }
      if (s.ink === 'paper') {   // white stroke: erase its width plus half a pen, so neighbouring ink stays out of it
        if (w > 0) strokes.forEach(p => { for (let i = 0; i + 1 < p.length; i++) { const q = band(p[i], p[i + 1], w / 2 + ctx.penPx / 2); if (q) occlude([q]); } });
      } else if (w > 0 || fill === 'solid') {
        const ws = w > 0 ? w : 0;
        const pat = s.dash && ws > 0 ? (Array.isArray(s.dash) ? s.dash : [ws * 4, ws * 3]) : null;
        strokes.forEach(p => add(pat ? dashLine(p, pat) : [p], 'draw', ws));
      }
      if ((s.t === 'l' || s.t === 'path') && s.arrow && w > 0 && s.ink !== 'paper' && strokes.length && strokes[0].length > 1) {
        const p = strokes[strokes.length - 1], p0 = strokes[0];
        if (s.arrow === 'end' || s.arrow === 'both') arrow(p[p.length - 1], lastDir(p, false), w);
        if (s.arrow === 'start' || s.arrow === 'both') arrow(p0[0], lastDir(p0, true), w);
      }
    }));
    function arrow(tip, d, w) {   // viewer marker: 10x10 box scaled to 5 stroke widths, tip at refX 9
      if (!d) return;
      const n = [-d[1], d[0]], h = w / 2, P = (a, b) => [tip[0] + d[0] * a * h + n[0] * b * h, tip[1] + d[1] * a * h + n[1] * b * h];
      const tri = [P(-9, -5), P(1, 0), P(-9, 5), P(-9, -5)];
      occlude([tri]); add(solidFill([tri]), 'draw'); add([tri], 'draw');
    }
    return items;
  }
  function band(a, b, h) {
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy); if (L < 1e-9) return null;
    const nx = -dy / L * h, ny = dx / L * h, ex = dx / L * h, ey = dy / L * h;
    return [[a[0] - ex + nx, a[1] - ey + ny], [b[0] + ex + nx, b[1] + ey + ny], [b[0] + ex - nx, b[1] + ey - ny], [a[0] - ex - nx, a[1] - ey - ny], [a[0] - ex + nx, a[1] - ey + ny]];
  }
  function lastDir(p, atStart) {   // unit direction pointing out of the line end
    const n = p.length;
    for (let i = 1; i < n; i++) {
      const a = atStart ? p[i] : p[n - 1 - i], b = atStart ? p[0] : p[n - 1];
      const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
      if (L > 1e-6) return [dx / L, dy / L];
    }
    return null;
  }

  // ---------- ordering: greedy nearest neighbour with reversal, grid accelerated; joins touching ends ----------
  function order(polys, start, maxMm) {
    const n = polys.length, used = new Uint8Array(n), cell = 5, grid = new Map(), R = Math.ceil(maxMm / cell) + 2;
    const key = (x, y) => Math.floor(x / cell) + ',' + Math.floor(y / cell);
    polys.forEach((p, i) => [p[0], p[p.length - 1]].forEach(q => { const k = key(q[0], q[1]); (grid.get(k) || grid.set(k, []).get(k)).push(i); }));
    const chains = []; let cur = null, pos = start, left = n;
    while (left > 0) {
      let best = -1, bd = Infinity, rev = false;
      const gx = Math.floor(pos[0] / cell), gy = Math.floor(pos[1] / cell);
      const visit = (ix, iy) => {
        const lst = grid.get(ix + ',' + iy); if (!lst) return;
        for (const i of lst) {
          if (used[i]) continue;
          const p = polys[i], a = p[0], b = p[p.length - 1];
          const da = Math.hypot(a[0] - pos[0], a[1] - pos[1]), db = Math.hypot(b[0] - pos[0], b[1] - pos[1]);
          if (da < bd) { bd = da; best = i; rev = false; }
          if (db < bd) { bd = db; best = i; rev = true; }
        }
      };
      // rings of cells at Chebyshev distance r hold points at least (r - 1) * cell away
      for (let r = 0; r <= R; r++) {
        if (best >= 0 && (r - 1) * cell >= bd) break;
        if (r === 0) { visit(gx, gy); continue; }
        for (let ix = gx - r; ix <= gx + r; ix++) { visit(ix, gy - r); visit(ix, gy + r); }
        for (let iy = gy - r + 1; iy <= gy + r - 1; iy++) { visit(gx - r, iy); visit(gx + r, iy); }
      }
      if (best < 0) { for (let i = 0; i < n; i++) if (!used[i]) { best = i; rev = false; bd = Math.hypot(polys[i][0][0] - pos[0], polys[i][0][1] - pos[1]); break; } }
      used[best] = 1; left--;
      const p = rev ? polys[best].slice().reverse() : polys[best];
      if (cur && bd < 0.01) for (let i = 1; i < p.length; i++) cur.push(p[i]);
      else { cur = p.slice(); chains.push(cur); }
      pos = p[p.length - 1];
    }
    return chains;
  }

  // ---------- public ----------
  function fitScale(bw, bh, o) {
    const [pw, ph] = PAPERS[o.paper] || PAPERS.A4, m = o.margin;
    const opts = o.orient === 'portrait' ? [[pw, ph]] : o.orient === 'landscape' ? [[ph, pw]] : [[pw, ph], [ph, pw]];
    let best = null;
    for (const [W, H] of opts) { const s = Math.min((W - 2 * m) / bw, (H - 2 * m) / bh); if (!best || s > best.s + 1e-9) best = { s, W, H }; }
    if (!(best.s > 0) || Math.min(best.W, best.H) - 2 * m < 5) throw new Error(`margin ${m} mm leaves no room on ${o.paper}`);
    return best;
  }

  // opts: paper (key of PAPERS), orient auto|portrait|landscape, margin mm, pen mm, text merge|layer|off,
  // weight drawn|single (drawn: strokes wider than the pen get parallel passes), title, desc, font
  function toPlotSVG(trace, opts = {}) {
    const o = Object.assign({ paper: 'A4', orient: 'auto', margin: 15, pen: 0.3, text: 'merge', weight: 'drawn', title: '', desc: '' }, opts);
    const font = o.font || root.PlotFont;
    if (!font) throw new Error('PlotFont not loaded');
    let fit = fitScale(trace.w, trace.h, o), items, b;
    for (let pass = 0; pass < 2; pass++) {   // second pass refits to the ink box (crops carry white margins)
      const ctx = { font, sub: trace.sub, penPx: o.pen / fit.s, tolPx: 0.02 / fit.s, weight: o.weight !== 'single' };
      items = build(trace, ctx).filter(it => o.text !== 'off' || it.layer !== 'text');
      b = bboxOf(items.map(it => it.p));
      if (!isFinite(b[0])) { b = [0, 0, 0, 0]; items = []; break; }
      const f2 = fitScale(Math.max(b[2] - b[0], 1e-6), Math.max(b[3] - b[1], 1e-6), o);
      const again = Math.abs(f2.s / fit.s - 1) > 0.02;
      fit = f2; if (!again) break;
    }
    const { s, W, H } = fit;
    const ox = (W - (b[2] - b[0]) * s) / 2 - b[0] * s, oy = (H - (b[3] - b[1]) * s) / 2 - b[1] * s;
    const layers = o.text === 'layer' ? [['1 drawing', 'draw'], ['2 lettering', 'text']] : [['1 drawing', null]];
    let svgBody = '', nChains = 0, down = 0, travel = 0, nPolys = 0, pos = [0, 0];
    const f2 = v => (Math.round(v * 100) / 100).toString();
    layers.forEach(([label, which], li) => {
      const polys = [];
      for (const it of items) {
        if (which && it.layer !== which) continue;
        const p = [];
        for (const q of it.p) { const x = q[0] * s + ox, y = q[1] * s + oy, l = p[p.length - 1]; if (!l || Math.abs(l[0] - x) > 0.005 || Math.abs(l[1] - y) > 0.005) p.push([x, y]); }
        if (p.length > 1) polys.push(p);
      }
      nPolys += polys.length;
      const chains = order(polys, pos, Math.max(W, H));
      let paths = '';
      for (const c of chains) {
        travel += Math.hypot(c[0][0] - pos[0], c[0][1] - pos[1]);
        for (let i = 1; i < c.length; i++) down += Math.hypot(c[i][0] - c[i - 1][0], c[i][1] - c[i - 1][1]);
        pos = c[c.length - 1];
        // stroke on every path too, in case a sanitiser drops group attributes
        paths += `<path fill="none" stroke="#000" d="M${f2(c[0][0])} ${f2(c[0][1])}L${c.slice(1).map(q => f2(q[0]) + ' ' + f2(q[1])).join(' ')}"/>\n`;
      }
      nChains += chains.length;
      svgBody += `<g inkscape:groupmode="layer" inkscape:label="${label}" id="layer${li + 1}" fill="none" stroke="#000" stroke-width="${o.pen}" stroke-linecap="round" stroke-linejoin="round">\n${paths}</g>\n`;
    });
    const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="${f2(W)}mm" height="${f2(H)}mm" viewBox="0 0 ${f2(W)} ${f2(H)}">\n`
      + (o.title ? `<title>${esc(o.title)}</title>\n` : '') + (o.desc ? `<desc>${esc(o.desc)}</desc>\n` : '') + svgBody + '</svg>\n';
    return { svg, stats: { paper: o.paper, wMm: W, hMm: H, scale: s, drawW: (b[2] - b[0]) * s, drawH: (b[3] - b[1]) * s, polylines: nPolys, paths: nChains, downM: down / 1000, travelM: travel / 1000, layers: layers.length, bytes: new TextEncoder().encode(svg).length, empty: !items.length } };
  }

  root.PlotExport = { toPlotSVG, PAPERS };
})(typeof window !== 'undefined' ? window : globalThis);
