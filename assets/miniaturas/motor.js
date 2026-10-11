/*!
 * Prompt Atlas · Motor de miniaturas
 * ------------------------------------------------------------
 * Dibuja imágenes de referencia en SVG, sin archivos externos.
 * Cada miniatura es una RECETA que combina:
 *
 *   MOTIVO  → qué aparece   (retrato, paisaje, gato…)   ver motivos.js
 *   TÉCNICA → cómo se ve    (acuarela, píxel, neón…)    ver tecnicas.js
 *
 * En data/comandos.js:   miniatura: 'retrato + acuarela'
 * Variantes de motivo:   miniatura: 'retrato:mago'
 * Solo técnica:          miniatura: 'acuarela'  (usa su motivo por defecto)
 *
 * Abre miniaturas.html para ver todos los motivos y técnicas disponibles.
 */
(function (root) {
  'use strict';

  const W = 400, H = 300;
  /* Región de filtro a lienzo completo (evita recortes de trazos). */
  const FR = 'filterUnits="userSpaceOnUse" x="-20" y="-20" width="440" height="340"';
  const motivos = {};
  const tecnicas = {};

  /* ---------- Color ---------- */
  function hex2rgb(h) {
    h = String(h).replace('#', '');
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    const n = parseInt(h.slice(0, 6), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgb2hex(r, g, b) {
    return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  }
  function isHex(c) { return typeof c === 'string' && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(c); }
  function mix(a, b, t) {
    const A = hex2rgb(a), B = hex2rgb(b);
    return rgb2hex(A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t);
  }
  function shade(c, amt) { return isHex(c) ? (amt < 0 ? mix(c, '#000000', -amt) : mix(c, '#ffffff', amt)) : c; }
  function lum(c) {
    if (!isHex(c)) return 0.8;
    const [r, g, b] = hex2rgb(c).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function hsl(c) {
    let [r, g, b] = hex2rgb(c).map(v => v / 255);
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    let h = 0, s = 0; const l = (mx + mn) / 2;
    if (mx !== mn) {
      const d = mx - mn;
      s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
      h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [h * 360, s, l];
  }
  function hslHex(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;
    const f = (p, q, t) => { if (t < 0) t += 1; if (t > 1) t -= 1; if (t < 1 / 6) return p + (q - p) * 6 * t; if (t < 1 / 2) return q; if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6; return p; };
    if (s === 0) return rgb2hex(l * 255, l * 255, l * 255);
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    return rgb2hex(f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255);
  }
  /* Color de tubo de neón a partir de cualquier color: mismo tono, saturado y luminoso. */
  function neon(c) {
    if (!isHex(c)) return '#7df9ff';
    const [h, s] = hsl(c);
    if (s < 0.12) return '#f4f7ff';
    return hslHex(h, 1, 0.66);
  }

  /* ---------- Aleatorio determinista ---------- */
  function hash(str) {
    let x = 2166136261;
    for (let i = 0; i < str.length; i++) { x ^= str.charCodeAt(i); x = Math.imul(x, 16777619); }
    return x >>> 0;
  }
  function rng(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- Geometría ---------- */
  const r1 = n => Math.round(n * 10) / 10;
  function pts(arr) { return arr.map(p => r1(p[0]) + ',' + r1(p[1])).join(' '); }
  function star(cx, cy, ro, ri, n, rot = -90) {
    const out = [];
    for (let i = 0; i < n * 2; i++) {
      const a = (rot + i * 180 / n) * Math.PI / 180, r = i % 2 ? ri : ro;
      out.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts(out);
  }
  function gear(cx, cy, r, teeth, depth = 0.18) {
    const out = [], n = teeth * 4;
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, k = i % 4;
      const rr = (k === 0 || k === 1) ? r : r * (1 - depth);
      out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]);
    }
    return pts(out);
  }
  function arc(cx, cy, r, a0, a1) {
    const p = a => [cx + Math.cos(a * Math.PI / 180) * r, cy + Math.sin(a * Math.PI / 180) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `M${r1(x0)} ${r1(y0)}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} 1 ${r1(x1)} ${r1(y1)}`;
  }

  /* ---------- Paleta base (ilustración plana, luz de día neutra) ---------- */
  const PALETA = {
    fondo: '#e7e1d6', fondo2: '#cfc6b6',
    cielo: '#9fc7dc', cielo2: '#e9f0e6', sol: '#f7c65e', nube: '#ffffff',
    lejos: '#9ab3c1', medio: '#6f9c84', cerca: '#3f6f5a', suelo: '#8bab6c', agua: '#6fa8c2',
    piel: '#e9b896', pielS: '#c98b6b', pelo: '#3a2a24', peloS: '#231915',
    ropa: '#2f5d7c', ropaS: '#21445b', ojo: '#1e262c', labio: '#c0665a', blanco: '#fbfaf6',
    hoja: '#5f9a5c', hojaS: '#3f7141', tronco: '#7a5236', piedra: '#b9b2a6', piedraS: '#8c867c',
    tejado: '#b9533c', muro: '#efe3cf', muroS: '#d4c3a8', ventana: '#2f4757', luz: '#ffd77a',
    metal: '#9aa6ad', metalS: '#68757d', oscuro: '#22262b', acento: '#e07a4f', acento2: '#f2c14e',
    uiFondo: '#eef1f5', uiPanel: '#ffffff', uiTexto: '#1f2933', uiSuave: '#d5dbe3', uiAcento: '#3b6cf6', uiAcento2: '#f2a531', uiLinea: '#e1e6ec'
  };

  /* ---------- Estilo: decide cómo se pintan las formas según la técnica ---------- */
  function estilo(T, seed) {
    const c = Object.assign({}, PALETA, T.paleta || {});
    const S = {
      W, H, c, T,
      modo: T.modo || 'fill',
      sw: T.sw == null ? 2 : T.sw,
      lc: T.lc || '#1d2226',
      papel: T.papel || '#fbf8f1',
      oscuroNeon: T.oscuroNeon || '#0d0f1a',
      tonos: null,
      ps: T.porForma ? ` filter="url(#${T.porForma})"` : '',
      defs: [], ids: {},
      r: rng(seed)
    };
    S.col = x => (x in c ? c[x] : x);
    S.def = (id, markup) => { if (!S.ids[id]) { S.ids[id] = 1; S.defs.push(markup); } return `url(#${id})`; };
    S.lg = (id, stops, x1 = 0, y1 = 0, x2 = 0, y2 = 1) => S.def(id,
      `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map((s, i) => {
        const [col, off] = Array.isArray(s) ? s : [s, i / (stops.length - 1)];
        return `<stop offset="${off}" stop-color="${S.col(col)}"/>`;
      }).join('')}</linearGradient>`);
    S.rg = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) => S.def(id,
      `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map((s, i) => {
        const [col, off, op] = Array.isArray(s) ? s : [s, i / (stops.length - 1)];
        return `<stop offset="${off}" stop-color="${S.col(col)}"${op != null ? ` stop-opacity="${op}"` : ''}/>`;
      }).join('')}</radialGradient>`);
    S.tono = col => {
      if (!S.tonos) return S.papel;
      const L = lum(col);
      return L < 0.07 ? S.tonos[0] : L < 0.2 ? S.tonos[1] : L < 0.45 ? S.tonos[2] : S.tonos[3];
    };
    /* Relleno de una forma. `col` puede ser un rol de la paleta o un color #hex. */
    S.f = (col, extra = '') => {
      const v = S.col(col);
      const join = ' stroke-linejoin="round" stroke-linecap="round"';
      switch (S.modo) {
        case 'outline': return `fill="${v}" stroke="${S.lc}" stroke-width="${S.sw}"${join}${T.dash ? ` stroke-dasharray="${T.dash}"` : ''}${S.ps}${extra}`;
        case 'wash': return `fill="${v}" stroke="${shade(v, -0.3)}" stroke-opacity=".55" stroke-width="${S.sw}"${join}${S.ps}${extra}`;
        case 'line': return `fill="${isHex(v) ? S.tono(v) : S.papel}" stroke="${S.lc}" stroke-width="${S.sw}"${join}${S.ps}${extra}`;
        case 'neon': return `fill="${S.oscuroNeon}" stroke="${neon(v)}" stroke-width="${S.sw}"${join}${S.ps}${extra}`;
        default: return `fill="${v}"${S.ps}${extra}`;
      }
    };
    /* Trazo de detalle (ojos, bocas, juntas…). */
    S.k = (col, w = 2, extra = '') => {
      const v = S.col(col);
      const stroke = S.modo === 'line' ? S.lc : S.modo === 'neon' ? neon(v) : v;
      const ww = S.modo === 'line' ? Math.min(w, S.sw * 1.2) : S.modo === 'neon' ? Math.max(1.5, Math.min(w, S.sw)) : w;
      return `fill="none" stroke="${stroke}" stroke-width="${ww}" stroke-linecap="round" stroke-linejoin="round"${extra}`;
    };
    /* Fondo a sangre (cielos, paredes). Respeta el modo: papel en línea, oscuro en neón. */
    S.fondo = (a, b, id = 'fondo') => {
      if (S.modo === 'line') return `<rect width="${W}" height="${H}" fill="${S.papel}"/>`;
      if (S.modo === 'neon') return `<rect width="${W}" height="${H}" fill="${S.oscuroNeon}"/>`;
      return `<rect width="${W}" height="${H}" fill="${b ? S.lg(id, [a, b]) : S.col(a)}"/>`;
    };
    /* Sombra de contacto suave. */
    S.sombra = (cx, cy, rx, ry, op = 0.18) =>
      (S.modo === 'line' || S.modo === 'neon') ? '' : `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#000" opacity="${op}"/>`;
    /* Brillo/emisión (sol, ventanas, faroles). */
    S.halo = (cx, cy, r, col, op = 0.55) =>
      S.modo === 'line' ? '' : `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${S.rg('halo' + hash(String(col)) % 997, [[col, 0, op], [col, 1, 0]])}"/>`;
    S.txt = (x, y, txt, size, col, extra = '') => {
      const v = S.col(col);
      const fill = S.modo === 'line' ? S.lc : S.modo === 'neon' ? neon(v) : v;
      return `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}"${extra}>${txt}</text>`;
    };
    return S;
  }

  /* ---------- Definiciones reutilizables ---------- */
  const FILTROS = {
    blanco: '<filter id="blanco" ' + FR + '><feFlood flood-color="#fff"/><feComposite in2="SourceAlpha" operator="in"/></filter>',
    grano: '<filter id="grano" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>',
    papelTex: '<filter id="papelTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".04 .5" numOctaves="3" seed="11"/><feColorMatrix type="saturate" values="0"/></filter>'
  };
  function usar(S, nombre) { return S.def(nombre, FILTROS[nombre]); }

  /* Grano fotográfico/papel encima de todo (mezcla multiplicar). */
  function capaGrano(S, op = 0.18, modo = 'multiply', tipo = 'grano') {
    usar(S, tipo);
    return `<rect width="${W}" height="${H}" filter="url(#${tipo})" opacity="${op}" style="mix-blend-mode:${modo}"/>`;
  }
  /* Máscara con la silueta de un dibujo (para texturas que solo cubren el motivo). */
  function mascara(S, id, dibujo) {
    usar(S, 'blanco');
    return S.def(id, `<mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><g filter="url(#blanco)">${dibujo}</g></mask>`);
  }
  /* Viñeta oscura radial. */
  function vineta(S, op = 0.45, col = '#000') {
    return `<rect width="${W}" height="${H}" fill="${S.rg('vineta' + op, [[col, 0.55, 0], [col, 1, op]], 0.5, 0.5, 0.75)}"/>`;
  }
  /* Filtro de mapa de degradado: convierte la luminosidad en una gama de colores. */
  function mapaDegradado(id, colores, extra = '') {
    const ch = i => colores.map(c => (hex2rgb(c)[i] / 255).toFixed(3)).join(' ');
    return `<filter id="${id}" color-interpolation-filters="sRGB" ${FR}><feColorMatrix type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0"/><feComponentTransfer><feFuncR type="table" tableValues="${ch(0)}"/><feFuncG type="table" tableValues="${ch(1)}"/><feFuncB type="table" tableValues="${ch(2)}"/></feComponentTransfer>${extra}</filter>`;
  }
  /* Pixelado real del dibujo (bloques de `t` px). */
  function filtroPixel(id, t, posterizar = 0) {
    const half = Math.floor(t / 2);
    const post = posterizar ? `<feComponentTransfer><feFuncR type="discrete" tableValues="${steps(posterizar)}"/><feFuncG type="discrete" tableValues="${steps(posterizar)}"/><feFuncB type="discrete" tableValues="${steps(posterizar)}"/></feComponentTransfer>` : '';
    return `<filter id="${id}" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}" color-interpolation-filters="sRGB"><feFlood x="${half - 1}" y="${half - 1}" width="2" height="2"/><feComposite width="${t}" height="${t}"/><feTile result="a"/><feComposite in="SourceGraphic" in2="a" operator="in"/><feMorphology operator="dilate" radius="${half}"/>${post}</filter>`;
  }
  function steps(n) { return Array.from({ length: n }, (_, i) => (i / (n - 1)).toFixed(2)).join(' '); }

  /* ---------- Recetas ---------- */
  function parse(receta) {
    const txt = String(receta || '').trim().toLowerCase();
    const partes = txt.split(/\s*[+·]\s*/).filter(Boolean);
    let motivo = null, variante = '', tecnica = null;
    for (const p of partes) {
      const [id, v] = p.split(':');
      if (!motivo && motivos[id]) { motivo = id; variante = v || ''; }
      else if (!tecnica && tecnicas[id]) tecnica = id;
    }
    if (!tecnica) tecnica = 'plano';
    if (!motivo) [motivo, variante = ''] = (tecnicas[tecnica].motivo || 'retrato').split(':');
    if (!motivos[motivo]) motivo = 'retrato';
    return { motivo, variante, tecnica };
  }
  function valida(receta) {
    const partes = String(receta || '').trim().toLowerCase().split(/\s*[+·]\s*/).filter(Boolean);
    return partes.length > 0 && partes.every(p => motivos[p.split(':')[0]] || tecnicas[p]);
  }

  function render(receta, opciones = {}) {
    const R = parse(receta);
    const T = tecnicas[opciones.base ? 'plano' : R.tecnica];
    const M = motivos[R.motivo];
    const S = estilo(T, hash(receta));
    S.motivo = M;
    const op = Object.assign({}, M.opciones || {}, opciones.base ? {} : (T.opciones || {}));
    if (T.defs) T.defs(S);
    let fig = M.dibujo(S, R.variante, op);
    if (T.figura) fig = T.figura(S, fig, M);
    const fondo = M.escena ? '' : (T.fondo ? T.fondo(S, M) : fondoBase(S));
    const capa = `<g${T.filtro ? ` filter="url(#${T.filtro})"` : ''}${T.capa || ''}>${fig}</g>`;
    let cuerpo = fondo + (T.antes ? T.antes(S, M, fig) : '') + capa + (T.despues ? T.despues(S, M, fig) : '');
    if (T.envolver) cuerpo = T.envolver(S, cuerpo, { fig, fondo, M, R });
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Helvetica, Arial, sans-serif"><defs>${S.defs.join('')}</defs>${cuerpo}</svg>`;
  }
  function fondoBase(S) {
    return `<rect width="${W}" height="${H}" fill="${S.lg('fb', ['fondo', 'fondo2'])}"/><ellipse cx="200" cy="120" rx="230" ry="170" fill="${S.rg('fbluz', [['#ffffff', 0, 0.45], ['#ffffff', 1, 0]])}"/>`;
  }

  const cache = new Map();
  function uri(receta, opciones = {}) {
    const k = receta + (opciones.base ? '|base' : '');
    if (!cache.has(k)) cache.set(k, 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(render(receta, opciones)));
    return cache.get(k);
  }
  function describe(receta) {
    const R = parse(receta);
    const m = motivos[R.motivo], t = tecnicas[R.tecnica];
    const nm = (m.variantes && m.variantes[R.variante]) || m.nombre;
    return R.tecnica === 'plano' ? nm : `${nm} · ${t.nombre.toLowerCase()}`;
  }
  function comparable(receta) { return parse(receta).tecnica !== 'plano'; }

  root.Miniaturas = {
    W, H, motivos, tecnicas, render, uri, describe, comparable, parse, valida,
    motivo(id, def) { motivos[id] = def; },
    tecnica(id, def) { tecnicas[id] = def; },
    util: { FR, hex2rgb, rgb2hex, mix, shade, lum, hsl, hslHex, neon, hash, rng, pts, star, gear, arc, r1, usar, capaGrano, mascara, vineta, mapaDegradado, filtroPixel, FILTROS }
  };
})(typeof window !== 'undefined' ? window : globalThis);
