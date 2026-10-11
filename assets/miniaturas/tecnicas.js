/*!
 * Prompt Atlas · Técnicas (cómo se representa el motivo)
 * Propiedades de una técnica (todas opcionales):
 *   nombre, motivo (motivo por defecto), paleta (cambia colores de la paleta),
 *   modo: 'fill' | 'outline' | 'wash' | 'line' | 'neon', sw (grosor), lc (color de línea),
 *   opciones (se pasan al motivo), defs(S), filtro (id del filtro aplicado al motivo),
 *   porForma (id de filtro aplicado a cada forma), fondo(S), antes(S), despues(S, M, fig),
 *   envolver(S, svg, ctx)
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const U = M.util;
  const { FR, capaGrano, mascara, vineta, mapaDegradado, filtroPixel, r1, rng, star, pts } = U;
  const add = M.tecnica;
  const W = 400, H = 300;

  /* ---------- Ayudas ---------- */
  const lienzo = (S, col) => `<rect width="${W}" height="${H}" fill="${col}"/>`;
  const pat = (S, id, w, h, body, extra = '') => S.def(id, `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"${extra}>${body}</pattern>`);
  const enMotivo = (S, fig, relleno, op = 1, blend = 'multiply', id = 'mk') =>
    `<rect width="${W}" height="${H}" fill="${relleno}" mask="${mascara(S, id, fig)}" opacity="${op}" style="mix-blend-mode:${blend}"/>`;
  const desplazar = (id, freq, escala, semilla = 3, extra = '') =>
    `<filter id="${id}" ${FR}><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="${semilla}" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="${escala}" xChannelSelector="R" yChannelSelector="G"/>${extra}</filter>`;
  /* Rompe la superficie con ruido (tiza, pastel, cera). */
  const textura = (id, freq, corte = 1.25, semilla = 5, previo = '') =>
    `<filter id="${id}" ${FR}>${previo}<feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="${semilla}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2.2 0 0 0 ${corte}" result="m"/><feComposite in="${previo ? 'p' : 'SourceGraphic'}" in2="m" operator="in"/></filter>`;
  const inflar = (id, blur = 9, spec = 0.55, exp = 22, escala = 6) =>
    `<filter id="${id}" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" result="b"/><feSpecularLighting in="b" surfaceScale="${escala}" specularConstant="${spec}" specularExponent="${exp}" lighting-color="#fff" result="sp"><fePointLight x="110" y="20" z="220"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="spi"/><feDiffuseLighting in="b" surfaceScale="${escala}" diffuseConstant="1" lighting-color="#fff" result="df"><feDistantLight azimuth="235" elevation="48"/></feDiffuseLighting><feComposite in="df" in2="SourceAlpha" operator="in" result="dfi"/><feBlend in="SourceGraphic" in2="dfi" mode="multiply" result="sh"/><feComposite in="spi" in2="sh" operator="arithmetic" k2=".8" k3="1"/></filter>`;
  const relieve = (id, freq, escala, semilla = 9, luz = 1.15) =>
    `<filter id="${id}" ${FR}><feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="3" seed="${semilla}" result="s"/><feDiffuseLighting in="s" surfaceScale="${escala}" diffuseConstant="${luz}" lighting-color="#fff" result="L"><feDistantLight azimuth="235" elevation="58"/></feDiffuseLighting><feBlend in="SourceGraphic" in2="L" mode="multiply" result="m"/><feComposite in="m" in2="SourceGraphic" operator="in"/></filter>`;
  const malla = (S, semilla = 4, paso = 34) => {
    const r = rng(semilla), P = [];
    for (let j = 0; j <= H / paso + 1; j++) { P.push([]); for (let i = 0; i <= W / paso + 1; i++) P[j].push([i * paso + (r() - 0.5) * paso * 0.7, j * paso + (r() - 0.5) * paso * 0.7]); }
    let o = '';
    for (let j = 0; j < P.length - 1; j++) for (let i = 0; i < P[j].length - 1; i++) {
      const a = P[j][i], b = P[j][i + 1], c = P[j + 1][i], d = P[j + 1][i + 1];
      o += `<polygon points="${pts([a, b, d])}" fill="${r() > 0.5 ? '#fff' : '#000'}" opacity="${r1(0.04 + r() * 0.16)}"/><polygon points="${pts([a, d, c])}" fill="${r() > 0.5 ? '#fff' : '#000'}" opacity="${r1(0.04 + r() * 0.16)}"/>`;
    }
    return o;
  };
  const material = (id, nombre, colores, extra = {}) => add(id, Object.assign({
    nombre, motivo: 'busto',
    defs(S) { S.def('mat' + id, mapaDegradado('mat' + id, colores)); },
    filtro: 'mat' + id
  }, extra));
  const destello = (x, y, s = 10, col = '#fff') => `<polygon points="${star(x, y, s, s / 6, 4)}" fill="${col}"/>`;
  const sinFondo = () => '';

  /* ---------- Base ---------- */
  add('plano', { nombre: 'Ilustración plana', motivo: 'retrato' });

  /* ============================================================
     PINTURA
     ============================================================ */
  add('acuarela', {
    nombre: 'Acuarela', motivo: 'paisaje', modo: 'wash', sw: 1.6,
    paleta: { cielo: '#a9cfe0', cielo2: '#f7f1e3', lejos: '#a9b9d6', medio: '#8fbf8c', cerca: '#5f9a7a', agua: '#8cc3d6', fondo: '#f8f4ea', fondo2: '#f8f4ea' },
    defs(S) {
      S.def('acu', `<filter id="acu" ${FR}><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="7" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="6" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation=".7" result="b"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 -.45 1.12" result="gm"/><feComposite in="b" in2="gm" operator="in"/></filter>`);
      S.def('acuBorde', `<filter id="acuBorde" ${FR}><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="4" seed="3"/><feDisplacementMap in="SourceGraphic" scale="40" xChannelSelector="R" yChannelSelector="G"/></filter>`);
      S.def('acuM', `<mask id="acuM" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="300"><rect width="400" height="300" fill="#000"/><rect x="30" y="22" width="340" height="256" rx="40" fill="#fff" filter="url(#acuBorde)"/></mask>`);
    },
    fondo: sinFondo,
    envolver(S, svg) {
      const esc = S.motivo.escena;
      return lienzo(S, '#f8f4ea') + `<g ${esc ? 'mask="url(#acuM)"' : ''} opacity=".9" style="mix-blend-mode:multiply"><g filter="url(#acu)">${svg}</g></g>` + capaGrano(S, 0.14, 'multiply', 'papelTex');
    }
  });

  add('oleo', {
    nombre: 'Óleo', motivo: 'paisaje',
    paleta: { cielo: '#6f9fc4', cielo2: '#f0d9a8', sol: '#f5b041', lejos: '#5e7ca0', medio: '#5b8a4f', cerca: '#2f5634', agua: '#4e86a8', fondo: '#5a4630', fondo2: '#2a2118' },
    defs(S) { S.def('oleo', `<filter id="oleo" ${FR}><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="4" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".09 .045" numOctaves="3" seed="9" result="s"/><feDiffuseLighting in="s" surfaceScale="1.8" diffuseConstant="1.18" lighting-color="#fff" result="L"><feDistantLight azimuth="235" elevation="60"/></feDiffuseLighting><feBlend in="d" in2="L" mode="multiply" result="m"/><feComposite in="m" in2="d" operator="in"/></filter>`); },
    filtro: 'oleo',
    despues: S => vineta(S, 0.4, '#1a120a') + capaGrano(S, 0.1)
  });

  add('impasto', {
    nombre: 'Impasto', motivo: 'flor:girasol',
    defs(S) { S.def('imp', `<filter id="imp" ${FR}><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="9" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="turbulence" baseFrequency=".08 .03" numOctaves="3" seed="12" result="s"/><feSpecularLighting in="s" surfaceScale="5" specularConstant=".7" specularExponent="16" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="45"/></feSpecularLighting><feDiffuseLighting in="s" surfaceScale="5" diffuseConstant="1.2" lighting-color="#fff" result="L"><feDistantLight azimuth="235" elevation="50"/></feDiffuseLighting><feBlend in="d" in2="L" mode="multiply" result="m"/><feComposite in="sp" in2="m" operator="arithmetic" k2=".35" k3="1" result="mm"/><feComposite in="mm" in2="d" operator="in"/></filter>`); },
    fondo: S => lienzo(S, '#2a4a8a') + Array.from({ length: 9 }, (_, i) => `<path d="M${-20 + i * 50} 0 C${20 + i * 50} 60 ${-10 + i * 50} 120 ${30 + i * 50} 180 S${10 + i * 50} 260 ${40 + i * 50} 300" fill="none" stroke="${['#3a6ac0', '#1f3a7a', '#6a9ae0'][i % 3]}" stroke-width="18"/>`).join(''),
    capa: '',
    envolver: (S, svg) => `<g filter="url(#imp)">${svg}</g>`
  });

  add('gouache', {
    nombre: 'Gouache', motivo: 'paisaje',
    paleta: { cielo: '#f2c9a0', cielo2: '#f6e7cf', sol: '#e86a4a', lejos: '#d98a6a', medio: '#5a8a6a', cerca: '#2f5a4a', agua: '#3a7a8a', nube: '#fbf2e2', hoja: '#3f7a5a', hojaS: '#2f5a44', tejado: '#c0533c' },
    defs(S) { S.def('gou', desplazar('gou', '.04', 3, 6, `<feComponentTransfer><feFuncR type="discrete" tableValues="${'0 .2 .4 .6 .8 1'}"/><feFuncG type="discrete" tableValues="0 .2 .4 .6 .8 1"/><feFuncB type="discrete" tableValues="0 .2 .4 .6 .8 1"/></feComponentTransfer>`)); },
    filtro: 'gou',
    despues: S => capaGrano(S, 0.22, 'multiply', 'papelTex')
  });

  add('acrilico', {
    nombre: 'Acrílico', motivo: 'flor',
    defs(S) { S.def('acr', relieve('acr', '.1 .03', 2.4, 15, 1.12)); },
    fondo: S => lienzo(S, '#f2c14e') + `<path d="M0 0 L400 300 M80 0 L400 240 M0 80 L320 300" stroke="#e8a83a" stroke-width="40" opacity=".5"/>`,
    envolver: (S, svg) => `<g filter="url(#acr)">${svg}</g>` + capaGrano(S, 0.08)
  });

  add('pastel', {
    nombre: 'Pastel', motivo: 'retrato',
    paleta: { fondo: '#e6d6c4', fondo2: '#d9c6b0', piel: '#f4c9b0', pielS: '#e0a08a', pelo: '#7a4a5a', ropa: '#8ab6d6', ropaS: '#6a96b6', labio: '#e08a8a' },
    defs(S) { S.def('pas', textura('pas', '.75', 1.75, 8, `<feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="2" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="4" result="p"/>`)); },
    fondo: S => lienzo(S, '#e3d5c3') + `<path d="M20 40 C120 10 300 30 380 60 M10 260 C140 240 260 280 390 250" stroke="#c9b8e0" stroke-width="30" opacity=".5" fill="none"/>`,
    filtro: 'pas',
    despues: S => capaGrano(S, 0.2, 'multiply', 'papelTex')
  });

  add('fresco', {
    nombre: 'Fresco', motivo: 'retrato',
    paleta: { fondo: '#d9c4a0', fondo2: '#c9ad84', piel: '#e2b48e', pielS: '#c08a66', pelo: '#5a3a24', ropa: '#5a7a8a', ropaS: '#465f6b', labio: '#b06a5a' },
    defs(S) {
      S.def('fre', `<filter id="fre" ${FR}><feColorMatrix type="saturate" values=".6"/><feComponentTransfer><feFuncR type="linear" slope=".82" intercept=".14"/><feFuncG type="linear" slope=".82" intercept=".12"/><feFuncB type="linear" slope=".82" intercept=".1"/></feComponentTransfer></filter>`);
      S.def('grietas', `<filter id="grietas" ${FR}><feTurbulence type="turbulence" baseFrequency=".03" numOctaves="3" seed="23"/><feColorMatrix type="matrix" values="0 0 0 0 .35 0 0 0 0 .28 0 0 0 0 .2 -6 0 0 0 .55"/></filter>`);
    },
    fondo: S => lienzo(S, '#d6bf98') + `<path d="M0 0 H400 V40 Q200 10 0 40 Z" fill="#8a5a3a" opacity=".5"/>`,
    filtro: 'fre',
    despues: S => `<rect width="400" height="300" filter="url(#grietas)" opacity=".6"/>` + capaGrano(S, 0.3, 'multiply', 'papelTex') + `<path d="M330 0 Q360 80 400 90 V0 Z M0 240 Q40 260 60 300 H0 Z" fill="#efe2c8"/>`
  });

  add('cera', {
    nombre: 'Ceras de colores', motivo: 'paisaje', modo: 'wash', sw: 3,
    paleta: { cielo: '#7ac6f0', cielo2: '#bfe6fa', sol: '#ffd23f', lejos: '#a07ad0', medio: '#5ac45a', cerca: '#3aa63a', agua: '#3a8ae0', tejado: '#e8432f', muro: '#ffe08a', muroS: '#f2c45a' },
    defs(S) { S.def('cer', textura('cer', '.9 .12', 1.75, 3, `<feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="5" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="7" result="p"/>`)); },
    envolver: (S, svg) => lienzo(S, '#fffdf8') + `<g filter="url(#cer)" style="mix-blend-mode:multiply">${svg}</g>`
  });

  add('rotulador', {
    nombre: 'Rotulador', motivo: 'retrato', modo: 'outline', sw: 3.4, lc: '#1b1b1b',
    paleta: { piel: '#ffcfae', pielS: '#f2a07a', pelo: '#ff6a3a', ropa: '#3ab0e6', ropaS: '#2a8abf', labio: '#e8432f' },
    fondo: S => lienzo(S, '#ffffff'),
    despues(S, M, fig) {
      const trazo = pat(S, 'marc', 10, 10, '<path d="M-2 12 L12 -2" stroke="#000" stroke-width="3" opacity=".25"/>');
      return enMotivo(S, fig, trazo, 0.6);
    }
  });

  add('tiza', {
    nombre: 'Tiza', motivo: 'paisaje', modo: 'line', sw: 2.6, lc: '#f4f1e8', papel: '#2c3a34',
    defs(S) {
      S.def('tiz', textura('tiz', '.9', 1.5, 7));
      const t = (id, gap, op) => pat(S, id, gap, gap, `<rect width="${gap}" height="${gap}" fill="#2c3a34"/><path d="M0 ${gap} L${gap} 0" stroke="#f4f1e8" stroke-width="1.4" opacity="${op}"/>`);
      S.tonos = [t('tz0', 4, 0.6), t('tz1', 5, 0.45), t('tz2', 7, 0.3), '#2c3a34'];
    },
    fondo: S => lienzo(S, '#2c3a34'),
    filtro: 'tiz',
    envolver: (S, svg) => svg + `<path d="M40 60 C120 40 200 70 300 50" stroke="#f4f1e8" stroke-width="30" opacity=".05" fill="none"/><rect x="0" y="0" width="400" height="300" fill="none" stroke="#8a5a32" stroke-width="16"/>`
  });

  add('carbon', {
    nombre: 'Carboncillo', motivo: 'retrato', modo: 'outline', sw: 2.8, lc: '#141414',
    defs(S) {
      S.def('car', mapaDegradado('car', ['#101010', '#2a2a2a', '#6a6a66', '#d9d6cf', '#f4f1ea']));
      S.def('carD', desplazar('carD', '.05', 4, 8, '<feGaussianBlur stdDeviation=".7"/>'));
    },

    fondo: S => lienzo(S, '#f1ede4') + `<path d="M40 280 C120 200 300 260 380 180" stroke="#555" stroke-width="40" opacity=".08" fill="none"/>`,
    filtro: 'car',
    envolver: (S, svg) => `<g filter="url(#carD)">${svg}</g>` + capaGrano(S, 0.35, 'multiply', 'papelTex')
  });

  add('cuento', {
    nombre: 'Ilustración de cuento', motivo: 'paisaje', modo: 'wash', sw: 2,
    paleta: { cielo: '#f6d6b0', cielo2: '#fbefdc', sol: '#f6a04a', lejos: '#c9a8d6', medio: '#a6c98a', cerca: '#7aa86a', agua: '#8ac0d6', tejado: '#d9674a', nube: '#fffaf0' },
    defs(S) { S.def('cue', desplazar('cue', '.05', 3, 2)); },
    filtro: 'cue',
    despues: S => capaGrano(S, 0.2, 'multiply', 'papelTex')
  });

  add('ghibli', {
    nombre: 'Animación pintada a mano', motivo: 'paisaje', modo: 'wash', sw: 1,
    paleta: { cielo: '#3a8ad6', cielo2: '#bfe4f6', sol: '#fff2c4', lejos: '#7aa6c4', medio: '#6ab04a', cerca: '#3f8a3a', agua: '#4aa6d6', nube: '#ffffff', hoja: '#4f9a3a', hojaS: '#3a7a2e', tejado: '#c0533c' },
    opciones: { nubesGrandes: true, solY: 40 },
    defs(S) { S.def('ghi', desplazar('ghi', '.03', 2.5, 5, '<feGaussianBlur stdDeviation=".4"/>')); },
    filtro: 'ghi',
    despues: S => capaGrano(S, 0.08)
  });

  add('expresionismo', {
    nombre: 'Expresionismo', motivo: 'paisaje',
    paleta: { cielo: '#e8562a', cielo2: '#f2b03a', sol: '#ffe08a', lejos: '#3a4a8a', medio: '#2a6a5a', cerca: '#1a2a4a', agua: '#2a5ab0', nube: '#f28a3a', muro: '#e8c48a', tejado: '#8a1a1a' },
    defs(S) { S.def('exp', desplazar('exp', '.012 .02', 34, 11)); },
    filtro: 'exp',
    despues: S => vineta(S, 0.35)
  });

  add('renacimiento', {
    nombre: 'Renacimiento', motivo: 'retrato',
    paleta: { piel: '#e2bc94', pielS: '#b88a64', pelo: '#3a2416', ropa: '#3a3a26', ropaS: '#26261a', labio: '#a86a54' },
    defs(S) { S.def('ren', `<filter id="ren" ${FR}><feGaussianBlur stdDeviation=".7"/><feColorMatrix type="saturate" values=".8"/></filter>`); },
    fondo: S => lienzo(S, '#2f3424') + `<path d="M0 200 Q60 150 120 180 T240 170 T400 190 V300 H0Z" fill="#5a6a4a" opacity=".7"/><path d="M0 150 Q100 120 200 140 T400 130" stroke="#8aa0a8" stroke-width="30" opacity=".35" fill="none"/>`,
    filtro: 'ren',
    despues: S => vineta(S, 0.55, '#120c06') + `<path d="M0 0 H400 V300 H0 Z M60 300 V110 Q60 20 200 20 Q340 20 340 110 V300 Z" fill="#1a120a" fill-rule="evenodd"/>` + capaGrano(S, 0.12)
  });

  add('barroco', {
    nombre: 'Barroco (claroscuro)', motivo: 'retrato',
    paleta: { piel: '#f0c8a0', pielS: '#a86a48', pelo: '#2a1810', ropa: '#7a1a1a', ropaS: '#4a0e0e', labio: '#b0584a' },
    fondo: S => lienzo(S, '#140c08') + `<path d="M0 0 C60 80 40 200 90 300 H0 Z" fill="#5a1010" opacity=".8"/>`,
    despues: S => `<rect width="400" height="300" fill="${S.rg('bar', [['#000', 0.15, 0], ['#000', 0.7, 0.7]], 0.4, 0.3, 0.75)}"/><rect x="6" y="6" width="388" height="288" fill="none" stroke="${S.lg('barM', ['#f2d38a', '#8a5a1a', '#d9a640'], 0, 0, 1, 1)}" stroke-width="12"/>` + capaGrano(S, 0.1)
  });

  /* ============================================================
     DIBUJO Y TINTA
     ============================================================ */
  function tramas(S, col, papel, densidad = 1, op = 1) {
    const l = (id, gap, w, o, cruz) => pat(S, id, gap, gap,
      `<rect width="${gap}" height="${gap}" fill="${papel}"/><line x1="0" y1="0" x2="0" y2="${gap}" stroke="${col}" stroke-width="${w}" opacity="${o * op}"/>${cruz ? `<line x1="0" y1="0" x2="${gap}" y2="0" stroke="${col}" stroke-width="${w}" opacity="${o * op}"/>` : ''}`,
      ' patternTransform="rotate(45)"');
    S.tonos = [l('t0', 3 / densidad, 1, 0.9, true), l('t1', 4 / densidad, 0.9, 0.75, true), l('t2', 5 / densidad, 0.8, 0.6, false), papel];
  }

  add('lapiz', {
    nombre: 'Lápiz', motivo: 'retrato', modo: 'line', sw: 1.3, lc: '#3d3d3f', papel: '#fbfaf6',
    defs(S) {
      tramas(S, '#55555a', '#fbfaf6', 1, 0.55);
      S.def('lapiz', desplazar('lapiz', '.07', 2.2, 3));
    },
    fondo: S => lienzo(S, '#fbfaf6'),
    filtro: 'lapiz',
    despues: S => capaGrano(S, 0.08, 'multiply', 'papelTex')
  });

  add('tinta', {
    nombre: 'Tinta', motivo: 'retrato', modo: 'line', sw: 2.4, lc: '#111111', papel: '#fffdf8',
    defs(S) { tramas(S, '#111', '#fffdf8', 0.9); },
    fondo: S => lienzo(S, '#fffdf8')
  });

  add('lineart', {
    nombre: 'Line art', motivo: 'retrato', modo: 'line', sw: 2.6, lc: '#1f2a44', papel: '#f3efe6',
    fondo: S => lienzo(S, '#f3efe6')
  });

  add('blueprint', {
    nombre: 'Plano técnico', motivo: 'casa', modo: 'line', sw: 1.8, lc: '#e8f4ff', papel: '#1f4f8f',
    fondo(S) {
      const g = pat(S, 'bpG', 20, 20, '<rect width="20" height="20" fill="#1f4f8f"/><path d="M20 0 V20 H0" fill="none" stroke="#5a86c0" stroke-width=".6"/>');
      return `<rect width="400" height="300" fill="${g}"/>`;
    },
    despues: S => `<g fill="none" stroke="#e8f4ff" stroke-width="1.2"><path d="M96 280 H304 M96 274 V286 M304 274 V286 M70 128 V260 M64 128 H76 M64 260 H76"/></g><text x="200" y="295" text-anchor="middle" font-size="10" fill="#e8f4ff" font-family="'Courier New', monospace">8,40 m</text><text x="58" y="198" font-size="10" fill="#e8f4ff" font-family="'Courier New', monospace" transform="rotate(-90 58 198)">5,20 m</text><rect x="300" y="14" width="88" height="34" fill="none" stroke="#e8f4ff"/><text x="306" y="35" font-size="10" fill="#e8f4ff" font-family="'Courier New', monospace">PLANO 01 · 1:50</text>`
  });

  add('manga', {
    nombre: 'Manga', motivo: 'retrato', modo: 'outline', sw: 1.8, lc: '#141414',
    opciones: { ojos: 'anime', iris: '#6a6a6a' },
    defs(S) { S.def('man', mapaDegradado('man', ['#141414', '#5a5a5a', '#a8a8a8', '#f4f2ee', '#ffffff'])); },
    fondo(S) {
      let o = lienzo(S, '#fbfaf6');
      for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180; o += `<path d="M${r1(200 + Math.cos(a) * 120)} ${r1(130 + Math.sin(a) * 100)} L${r1(200 + Math.cos(a) * 400)} ${r1(130 + Math.sin(a) * 400)}" stroke="#141414" stroke-width="${1 + (i % 3)}"/>`; }
      return o;
    },
    filtro: 'man',
    despues(S, M, fig) {
      const tono = pat(S, 'scr', 6, 6, '<circle cx="3" cy="3" r="1.3" fill="#141414"/>');
      return enMotivo(S, fig, tono, 0.3) + `<rect x="300" y="10" width="86" height="160" fill="#141414"/><text x="343" y="60" text-anchor="middle" font-size="30" font-weight="900" fill="#fff" font-family="Impact, 'Arial Black', sans-serif" writing-mode="tb">ZEN</text><rect x="14" y="250" width="64" height="36" fill="#e2402f"/><text x="46" y="274" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">VOL.1</text>`;
    }
  });

  add('comic', {
    nombre: 'Cómic', motivo: 'retrato', modo: 'outline', sw: 3.6, lc: '#121318',
    paleta: { piel: '#f6c39b', pielS: '#d98e64', pelo: '#2a2230', ropa: '#2f6fd1', ropaS: '#1f4c94', labio: '#d9473b', cielo: '#7ac8f0', cielo2: '#c8ecff' },
    fondo(S) {
      let rayos = '';
      for (let i = 0; i < 24; i++) {
        const a0 = i * 15 * Math.PI / 180, a1 = (i * 15 + 7) * Math.PI / 180;
        rayos += `<polygon points="200,130 ${r1(200 + Math.cos(a0) * 420)},${r1(130 + Math.sin(a0) * 420)} ${r1(200 + Math.cos(a1) * 420)},${r1(130 + Math.sin(a1) * 420)}" fill="#ffd23f"/>`;
      }
      const dots = pat(S, 'dotsC', 9, 9, '<circle cx="4.5" cy="4.5" r="2.2" fill="#e8463c"/>');
      return lienzo(S, '#ffe36b') + rayos + `<rect width="400" height="300" fill="${dots}" opacity=".35"/>`;
    },
    despues(S, M, fig) {
      const dots = pat(S, 'dotsF', 7, 7, '<circle cx="3.5" cy="3.5" r="1.6" fill="#000"/>');
      return enMotivo(S, fig, dots, 0.18) +
        `<path d="M24 22 H140 Q160 22 160 42 V68 Q160 86 140 86 H70 L48 106 L54 86 H44 Q24 86 24 68 V42 Q24 22 44 22 Z" fill="#fff" stroke="#121318" stroke-width="3.5"/><text x="92" y="64" text-anchor="middle" font-size="26" font-weight="900" fill="#121318" font-family="Impact, 'Arial Black', sans-serif">¡ZAS!</text>` +
        `<rect x="4" y="4" width="392" height="292" fill="none" stroke="#121318" stroke-width="8"/>`;
    }
  });

  /* ============================================================
     GRÁFICO Y POP
     ============================================================ */
  add('popart', {
    nombre: 'Pop art', motivo: 'retrato', fondo: sinFondo,
    envolver(S, svg) {
      const juegos = [['#1b1b3a', '#ff4f9a', '#ffe14d'], ['#0f2f2f', '#2ad1c9', '#ff8a3d'], ['#2a0f3a', '#ffde3b', '#5bc0ff'], ['#3a0f12', '#7cff6b', '#ff5ec4']];
      const fondos = ['#ffe14d', '#ff4f9a', '#3b82f6', '#ff8a3d'];
      let o = '';
      juegos.forEach((j, i) => {
        S.def('pop' + i, mapaDegradado('pop' + i, [j[0], j[0], j[1], j[2], j[2]]));
        const x = (i % 2) * 200, y = Math.floor(i / 2) * 150;
        o += `<svg x="${x}" y="${y}" width="200" height="150" viewBox="70 20 260 195"><rect x="0" width="400" height="300" fill="${fondos[i]}"/><g filter="url(#pop${i})">${svg}</g></svg>`;
      });
      return o + '<path d="M200 0 V300 M0 150 H400" stroke="#111" stroke-width="6"/>';
    }
  });

  add('estarcido', {
    nombre: 'Estarcido (stencil)', motivo: 'retrato',
    defs(S) {
      S.def('est', mapaDegradado('est', ['#141414', '#141414', '#141414', '#d9362b', '#efe9df', '#efe9df'], '<feComponentTransfer><feFuncR type="discrete" tableValues="0 .5 1"/><feFuncG type="discrete" tableValues="0 .5 1"/><feFuncB type="discrete" tableValues="0 .5 1"/></feComponentTransfer>'));
      S.def('estS', `<filter id="estS" ${FR}><feGaussianBlur stdDeviation="6"/></filter>`);
      S.def('mur', `<filter id="mur" ${FR}><feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0 0 0 0 .62 0 0 0 0 .6 0 0 0 0 .57 0 0 0 .5 .5"/></filter>`);
    },
    fondo: S => lienzo(S, '#a8a49c') + `<rect width="400" height="300" filter="url(#mur)"/>`,
    antes: (S, M, fig) => `<g filter="url(#estS)" opacity=".35"><g filter="url(#est)">${fig}</g></g>`,
    filtro: 'est',
    despues: S => [150, 190, 240].map((x, i) => `<path d="M${x} ${220 + i * 8} V${262 + i * 14}" stroke="#141414" stroke-width="3" stroke-linecap="round"/>`).join('')
  });

  add('cubismo', {
    nombre: 'Cubismo', motivo: 'retrato', fondo: sinFondo,
    paleta: { piel: '#d9a46a', pielS: '#a8703a', pelo: '#3a2a20', ropa: '#4a5a6a', ropaS: '#2f3a44', fondo: '#c9a46a', fondo2: '#8a6a4a' },
    envolver(S, svg) {
      const zonas = [
        ['0,0 230,0 170,160 0,200', 0, 0, '#b8854a'], ['230,0 400,0 400,140 170,160', 18, -8, '#6a7a8a'],
        ['0,200 170,160 210,300 0,300', -12, 6, '#8a6a4a'], ['170,160 400,140 400,300 210,300', 10, 10, '#c9a46a']
      ];
      let o = '';
      zonas.forEach(([p, dx, dy, col], i) => {
        S.def('cz' + i, `<clipPath id="cz${i}"><polygon points="${p}"/></clipPath>`);
        o += `<g clip-path="url(#cz${i})"><rect width="400" height="300" fill="${col}"/><g transform="translate(${dx} ${dy}) rotate(${i % 2 ? 3 : -3} 200 150)">${svg}</g></g>`;
      });
      return o + `<path d="M230 0 L170 160 L0 200 M170 160 L400 140 M170 160 L210 300" stroke="#2a1f18" stroke-width="3" fill="none"/>` + capaGrano(S, 0.15);
    }
  });

  add('vidriera', {
    nombre: 'Vidriera', motivo: 'retrato', modo: 'outline', sw: 6, lc: '#18191e',
    paleta: { piel: '#f2c8a0', pielS: '#d99a70', pelo: '#a8362e', ropa: '#2a5ab8', ropaS: '#1f428a', labio: '#c0392b', ojo: '#18191e' },
    fondo(S) {
      const r = rng(8), cols = ['#3a8ac0', '#2f6f9a', '#e8b83a', '#4a9a5a', '#5a7ac8', '#c8a03a'];
      let o = lienzo(S, '#18191e');
      for (let j = 0; j < 6; j++) for (let i = 0; i < 8; i++) {
        const x = i * 52 + (r() - 0.5) * 10, y = j * 54 + (r() - 0.5) * 10;
        o += `<polygon points="${pts([[x, y], [x + 52, y + (r() - 0.5) * 16], [x + 50, y + 54], [x - 2, y + 52]])}" fill="${cols[(i + j * 3) % 6]}" stroke="#18191e" stroke-width="5"/>`;
      }
      return o;
    },
    despues(S, M, fig) {
      const r = rng(5);
      let lineas = '';
      for (let i = 0; i < 9; i++) lineas += `<path d="M${r1(r() * 400)} ${r1(r() * 300)} L${r1(r() * 400)} ${r1(r() * 300)}" stroke="#18191e" stroke-width="4"/>`;
      S.def('vidL', `<mask id="vidL" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="300"><g filter="url(#blanco)">${fig}</g></mask>`);
      U.usar(S, 'blanco');
      return `<g mask="url(#vidL)">${lineas}</g><rect width="400" height="300" fill="${S.rg('vidLuz', [['#fff', 0, 0.35], ['#fff', 1, 0]], 0.4, 0.3, 0.6)}" style="mix-blend-mode:screen"/>` +
        `<path d="M0 0 H400 V300 H0 Z M40 300 V120 Q40 14 200 14 Q360 14 360 120 V300 Z" fill="#2a2420" fill-rule="evenodd"/>`;
    }
  });

  add('mosaico', {
    nombre: 'Mosaico', motivo: 'retrato',
    paleta: { fondo: '#d9c6a0', fondo2: '#d9c6a0' },
    defs(S) { S.def('mos', filtroPixel('mos', 10, 6)); },
    fondo: S => lienzo(S, '#2a5a7a'),
    capa: '',
    envolver(S, svg) {
      const g = pat(S, 'mosG', 10, 10, '<path d="M10 0 V10 H0" fill="none" stroke="#e8dcc4" stroke-width="2.4"/>');
      return `<g filter="url(#mos)">${svg}</g><rect width="400" height="300" fill="${g}"/>` + capaGrano(S, 0.15);
    }
  });

  add('tatuaje', {
    nombre: 'Tatuaje tradicional', motivo: 'aguila', modo: 'outline', sw: 4, lc: '#141414',
    fondo: S => lienzo(S, '#f1e6d0'),
    defs(S) { S.def('tat', mapaDegradado('tat', ['#141414', '#1f6a3a', '#c0392b', '#e8b83a', '#f6efe2'])); },
    filtro: 'tat',
    despues: S => `<path d="M60 250 Q200 290 340 250 L350 276 Q200 312 50 276 Z" fill="#c0392b" stroke="#141414" stroke-width="4"/><text x="200" y="284" text-anchor="middle" font-size="16" font-weight="900" fill="#f6efe2" font-family="Georgia, serif">LIBERTAD</text>` + capaGrano(S, 0.12, 'multiply', 'papelTex')
  });

  add('pegatina', {
    nombre: 'Pegatina troquelada', motivo: 'gato',
    defs(S) { S.def('peg', `<filter id="peg" ${FR}><feMorphology in="SourceAlpha" operator="dilate" radius="9" result="d"/><feFlood flood-color="#ffffff"/><feComposite in2="d" operator="in" result="borde"/><feDropShadow in="borde" dx="2" dy="5" stdDeviation="4" flood-opacity=".3" result="sh"/><feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`); },
    fondo: S => lienzo(S, '#d8e2ea') + `<rect width="400" height="300" fill="${pat(S, 'pegP', 24, 24, '<circle cx="12" cy="12" r="2" fill="#c3cfd9"/>')}"/>`,
    figura: (S, fig) => fig.replace(/<ellipse cx="205" cy="276"[^>]*\/>/, ''),
    filtro: 'peg'
  });

  add('papel', {
    nombre: 'Papel recortado', motivo: 'paisaje',
    paleta: { cielo: '#f6e6d0', cielo2: '#fbf2e6', sol: '#f2a65a', lejos: '#e6c4a0', medio: '#a8c49a', cerca: '#5a8a7a', agua: '#8ac0c4', nube: '#ffffff', hoja: '#6a9a6a', hojaS: '#4f7f5a' },
    defs(S) { S.def('pap', '<filter id="pap" x="-10%" y="-10%" width="125%" height="130%"><feDropShadow dx="0" dy="4" stdDeviation="3.5" flood-color="#3a2a1a" flood-opacity=".35"/></filter>'); },
    porForma: 'pap',
    despues: S => capaGrano(S, 0.12, 'multiply', 'papelTex')
  });

  add('lowpoly', {
    nombre: 'Low poly', motivo: 'zorro',
    defs(S) { S.def('lp', `<filter id="lp" ${FR}><feComponentTransfer><feFuncR type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncG type="discrete" tableValues="0 .25 .5 .75 1"/><feFuncB type="discrete" tableValues="0 .25 .5 .75 1"/></feComponentTransfer></filter>`); },
    filtro: 'lp',
    despues: (S, M, fig) => `<g mask="${mascara(S, 'lpM', fig)}">${malla(S, 4, 28)}</g>`
  });

  /* ============================================================
     DIGITAL Y RETRO
     ============================================================ */
  add('pixel', {
    nombre: 'Pixel art', motivo: 'retrato',
    defs(S) { S.def('px', filtroPixel('px', 12, 5)); },
    fondo: S => lienzo(S, '#59c3ee'),
    filtro: 'px'
  });

  add('lego', {
    nombre: 'Bloques de construcción', motivo: 'casa',
    defs(S) { S.def('lg', filtroPixel('lg', 20, 4)); },
    fondo: S => lienzo(S, '#3aa65a'),
    capa: '',
    envolver(S, svg) {
      const st = pat(S, 'stud', 20, 20, '<rect width="20" height="20" fill="none" stroke="#000" stroke-opacity=".18"/><circle cx="10" cy="10" r="6" fill="#000" opacity=".22"/><circle cx="9" cy="9" r="6" fill="#fff" opacity=".18"/><circle cx="10" cy="10" r="6" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>');
      return `<g filter="url(#lg)">${svg}</g><rect width="400" height="300" fill="${st}"/>`;
    }
  });

  add('ascii', {
    nombre: 'Arte ASCII', motivo: 'retrato', modo: 'line', sw: 0, lc: 'none', papel: '#0b0f0c',
    defs(S) {
      const t = (id, ch, op) => pat(S, id, 8, 12, `<rect width="8" height="12" fill="#0b0f0c"/><text x="0" y="11" font-size="13" font-family="'Courier New', monospace" font-weight="700" fill="#6dff8a" opacity="${op}">${ch}</text>`);
      S.tonos = [t('as0', '.', 0.6), t('as1', ':', 0.8), t('as2', '+', 0.9), t('as3', '#', 1)];
    },
    fondo: S => lienzo(S, '#0b0f0c')
  });

  add('glitch', {
    nombre: 'Glitch', motivo: 'retrato',
    envolver(S, svg) {
      S.def('soloR', `<filter id="soloR" color-interpolation-filters="sRGB" ${FR}><feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/></filter>`);
      S.def('soloGB', `<filter id="soloGB" color-interpolation-filters="sRGB" ${FR}><feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter>`);
      let o = `<rect width="400" height="300" fill="#000"/><g filter="url(#soloR)" transform="translate(-8 0)" style="mix-blend-mode:screen">${svg}</g><g filter="url(#soloGB)" transform="translate(8 0)" style="mix-blend-mode:screen">${svg}</g>`;
      [[70, 14, 30], [128, 8, -40], [176, 20, 22], [236, 6, -26]].forEach(([y, h, dx], i) => {
        S.def('cl' + i, `<clipPath id="cl${i}"><rect x="0" y="${y}" width="400" height="${h}"/></clipPath>`);
        o += `<g clip-path="url(#cl${i})"><g transform="translate(${dx} 0)">${svg}</g></g>`;
      });
      return o + `<rect width="400" height="300" fill="${pat(S, 'scan', 4, 4, '<rect width="4" height="2" fill="#000" opacity=".25"/>')}"/>`;
    }
  });

  add('vhs', {
    nombre: 'Vídeo VHS de los 90', motivo: 'retrato',
    paleta: { fondo: '#5ab0b0', fondo2: '#7a5aa8', ropa: '#7a3ab8', ropaS: '#5a2a8a' },
    envolver(S, svg) {
      S.def('vR', `<filter id="vR" color-interpolation-filters="sRGB" ${FR}><feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/><feGaussianBlur stdDeviation="1.2"/></filter>`);
      S.def('vGB', `<filter id="vGB" color-interpolation-filters="sRGB" ${FR}><feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/><feGaussianBlur stdDeviation=".6"/></filter>`);
      const lin = pat(S, 'vhsL', 3, 3, '<rect width="3" height="1" fill="#000" opacity=".22"/>');
      return `<rect width="400" height="300" fill="#000"/><g filter="url(#vR)" transform="translate(-3 0)" style="mix-blend-mode:screen">${svg}</g><g filter="url(#vGB)" transform="translate(2 0)" style="mix-blend-mode:screen">${svg}</g>` +
        `<rect width="400" height="300" fill="${lin}"/><rect y="236" width="400" height="10" fill="#fff" opacity=".18"/><rect y="240" width="400" height="2" fill="#fff" opacity=".5"/>` +
        `<text x="20" y="36" font-size="20" font-weight="700" fill="#fff" font-family="'Courier New', monospace" style="text-shadow:2px 0 #f0f">▶ PLAY</text><text x="20" y="284" font-size="16" font-weight="700" fill="#fff" font-family="'Courier New', monospace">12:04 AM  JUN.14 1996</text>` + capaGrano(S, 0.18, 'screen');
    }
  });

  add('y2k', {
    nombre: 'Y2K', motivo: 'retrato',
    paleta: { pelo: '#ff8ad0', peloS: '#e05ab0', ropa: '#b9c6d6', ropaS: '#8a9ab0', labio: '#ff6ab4', piel: '#f6d2c0' },
    fondo(S) {
      const cromo = S.lg('y2kC', ['#ffffff', '#9aa8b8', '#e8eef4', '#6a7888', '#ffffff'], 0, 0, 0.4, 1);
      return lienzo(S, '#9fd8ff') + `<rect width="400" height="300" fill="${S.lg('y2kF', ['#cfeaff', '#ffd6f0'])}"/>` +
        `<path d="M20 60 C20 20 90 10 100 50 C110 90 50 120 30 100 Z" fill="${cromo}"/><path d="M300 210 C290 160 380 150 390 200 C396 240 330 260 310 240 Z" fill="${cromo}"/><circle cx="330" cy="70" r="30" fill="none" stroke="${cromo}" stroke-width="10"/>`;
    },
    despues: S => U.capaGrano(S, 0) + [[60, 180, 14], [340, 130, 18], [120, 40, 10], [280, 260, 12]].map(([x, y, s]) => destello(x, y, s)).join('')
  });

  add('holograma', {
    nombre: 'Holograma', motivo: 'retrato',
    defs(S) { S.def('hol', mapaDegradado('hol', ['#00121e', '#0a5a7a', '#3ad6ff', '#c8ffff'], `<feComponentTransfer><feFuncA type="linear" slope=".8"/></feComponentTransfer><feGaussianBlur stdDeviation=".4" result="h"/><feGaussianBlur in="h" stdDeviation="5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="h"/></feMerge>`)); },
    fondo: S => lienzo(S, '#050b14') + `<path d="M120 300 L170 250 H230 L280 300 Z" fill="#1a2a3a"/><path d="M140 252 L60 0 H340 L260 252 Z" fill="#3ad6ff" opacity=".07"/>`,
    filtro: 'hol',
    despues: S => `<rect width="400" height="300" fill="${pat(S, 'holL', 4, 4, '<rect width="4" height="1.5" fill="#000" opacity=".45"/>')}"/><rect y="120" width="400" height="6" fill="#3ad6ff" opacity=".18"/><ellipse cx="200" cy="252" rx="60" ry="8" fill="#3ad6ff" opacity=".6"/>`
  });

  add('neon', {
    nombre: 'Neón', motivo: 'retrato', modo: 'neon', sw: 3.2,
    defs(S) { S.def('glow', `<filter id="glow" ${FR}><feGaussianBlur stdDeviation="3.5" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b2"/><feMerge><feMergeNode in="b2"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`); },
    fondo: S => `<rect width="400" height="300" fill="${pat(S, 'ladrillo', 40, 20, '<rect width="40" height="20" fill="#14121c"/><path d="M0 0.5 H40 M0 10.5 H40 M20 0 V10 M0 10 V20" stroke="#221e2e" stroke-width="1.5"/>')}"/>`,
    filtro: 'glow',
    despues: S => vineta(S, 0.6)
  });

  const lowpolyJuego = (id, nombre, pixel, blur, fondoCol, extraDesp = '') => add(id, {
    nombre, motivo: 'retrato',
    defs(S) {
      S.def(id + 'f', pixel ? filtroPixel(id + 'f', pixel, 5) : `<filter id="${id}f" ${FR}><feGaussianBlur stdDeviation="${blur}"/><feColorMatrix type="saturate" values="1.35"/></filter>`);
    },
    fondo: S => `<rect width="400" height="300" fill="${S.lg(id + 'bg', fondoCol)}"/>`,
    capa: '',
    envolver: (S, svg, ctx) => `<g filter="url(#${id}f)">${ctx.fondo}<g>${ctx.fig}</g><g mask="${mascara(S, id + 'm', ctx.fig)}">${malla(S, 7, pixel ? 40 : blur ? 34 : 22)}</g></g>${extraDesp}`
  });
  lowpolyJuego('ps1', 'Gráficos de PS1', 6, 0, ['#1a2a4a', '#4a6a9a']);
  lowpolyJuego('ps2', 'Gráficos de PS2', 0, 0.3, ['#3a5a8a', '#c8d8e8'], '');
  lowpolyJuego('n64', 'Gráficos de N64', 0, 1.6, ['#6ab0f0', '#f0f6d0']);

  add('ia', {
    nombre: 'Avatar de IA', motivo: 'retrato',
    defs(S) { S.def('iaF', mapaDegradado('iaF', ['#060a2a', '#2a2a8a', '#6a5aff', '#5ae0ff', '#e8fbff'])); },
    fondo(S) {
      let o = lienzo(S, '#060a1e');
      const r = rng(9);
      for (let i = 0; i < 18; i++) { const x = r1(r() * 400), y = r1(r() * 300); o += `<path d="M${x} ${y} h${r1(20 + r() * 40)} v${r1(20 + r() * 30)}" fill="none" stroke="#2a3aa8" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="2.5" fill="#5ae0ff"/>`; }
      return o;
    },
    filtro: 'iaF',
    despues: S => { const r = rng(4); return Array.from({ length: 40 }, () => `<circle cx="${r1(260 + r() * 140)}" cy="${r1(r() * 300)}" r="${r1(0.8 + r() * 2)}" fill="#5ae0ff" opacity="${r1(0.3 + r() * 0.7)}"/>`).join(''); }
  });

  add('digital', {
    nombre: 'Entorno digital', motivo: 'retrato:vr',
    fondo(S) {
      let o = `<rect width="400" height="300" fill="${S.lg('digF', ['#0a0626', '#3a1a7a'])}"/>`;
      for (let i = 0; i < 9; i++) o += `<path d="M0 ${190 + i * i * 1.6} H400" stroke="#ff3df2" stroke-width="1" opacity=".6"/>`;
      for (let i = 0; i < 15; i++) o += `<path d="M200 186 L${-500 + i * 64} 320" stroke="#ff3df2" stroke-width="1" opacity=".6"/>`;
      return o;
    }
  });

  /* ============================================================
     3D, ANIMACIÓN Y JUGUETES
     ============================================================ */
  add('anime', {
    nombre: 'Anime', motivo: 'retrato', modo: 'outline', sw: 1.6, lc: '#3a2a35',
    paleta: { piel: '#fbe0cf', pielS: '#eab7a0', pelo: '#3b4f8f', ropa: '#f2f2f6', ropaS: '#c9cbe0', labio: '#d07a7a', fondo: '#bfe3ff', fondo2: '#fbd9ec' },
    opciones: { ojos: 'anime', iris: '#4a8fd6' }
  });
  add('chibi', {
    nombre: 'Chibi', motivo: 'retrato', modo: 'outline', sw: 2.4, lc: '#4a2a3a',
    paleta: { piel: '#ffe2d0', pielS: '#f2b8a0', pelo: '#ff8ab0', ropa: '#ffd36e', ropaS: '#f2b84a', labio: '#e07a8a', fondo: '#fff0f6', fondo2: '#e0f0ff' },
    opciones: { ojos: 'anime', iris: '#8a5ad0', chibi: true }
  });
  add('animacion2d', {
    nombre: 'Animación clásica 2D', motivo: 'retrato', modo: 'wash', sw: 2.2,
    paleta: { piel: '#f6c8a4', pielS: '#e09a78', pelo: '#e0a03a', ropa: '#3a6ad0', ropaS: '#2a4ea0', labio: '#e0605a', fondo: '#a8d8f6', fondo2: '#fbe8c8' },
    opciones: { ojos: 'grande', iris: '#3a8ad0', mejillas: true }
  });
  add('3d', {
    nombre: 'Animación 3D', motivo: 'retrato',
    paleta: { piel: '#f2b993', pielS: '#d68f6b', pelo: '#6b3b22', ropa: '#e8564a', ropaS: '#b63f36', fondo: '#bfe0f5', fondo2: '#f6e4c8' },
    opciones: { ojos: 'grande', mejillas: true },
    defs(S) { S.def('inflar', inflar('inflar')); },
    porForma: 'inflar'
  });
  add('3d-picaro', {
    nombre: 'Animación 3D con gesto pícaro', motivo: 'retrato',
    paleta: { piel: '#e8b08a', pielS: '#c98a64', pelo: '#2a1a12', ropa: '#3a8a5a', ropaS: '#2a6a44', fondo: '#f6d8a8', fondo2: '#e89a6a' },
    opciones: { ojos: 'grande', ceja: 'picara', iris: '#3a7a3a' },
    defs(S) { S.def('inflar', inflar('inflar')); },
    porForma: 'inflar'
  });
  add('juego3d', {
    nombre: '3D cartoon de videojuego', motivo: 'retrato',
    paleta: { piel: '#f2b993', pielS: '#d68f6b', pelo: '#ff6a2a', ropa: '#3a5ad8', ropaS: '#2a3ea8', labio: '#c0605a' },
    opciones: { ojos: 'grande' },
    defs(S) { S.def('inflar', inflar('inflar', 7, 0.7, 30)); },
    fondo: S => `<rect width="400" height="300" fill="${S.lg('j3', ['#4a2aa8', '#c86af0'])}"/><path d="M0 220 Q100 190 200 214 T400 200 V300 H0Z" fill="#3aa65a"/><path d="M0 60 C60 30 120 70 180 40 C240 10 320 50 400 30" stroke="#8a4af0" stroke-width="30" fill="none" opacity=".6"/>`,
    porForma: 'inflar'
  });
  add('plastilina', {
    nombre: 'Plastilina', motivo: 'retrato',
    paleta: { piel: '#f0a878', pielS: '#d0805a', pelo: '#5a3a8a', ropa: '#e8c43a', ropaS: '#c8a42a', labio: '#c0392b', fondo: '#9ad0c0', fondo2: '#6ab0a0' },
    opciones: { ojos: 'grande', iris: '#2a2a2a' },
    defs(S) {
      S.def('clay', `<filter id="clay" x="-15%" y="-15%" width="130%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="6" result="d"/><feGaussianBlur in="d" stdDeviation="7" result="b0"/><feColorMatrix in="b0" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="b"/><feTurbulence type="fractalNoise" baseFrequency=".25" numOctaves="2" seed="7" result="fp"/><feComposite in="b" in2="fp" operator="arithmetic" k2="1" k3=".08" result="bb"/><feDiffuseLighting in="bb" surfaceScale="7" diffuseConstant="1.05" lighting-color="#fff" result="df"><feDistantLight azimuth="235" elevation="45"/></feDiffuseLighting><feSpecularLighting in="bb" surfaceScale="7" specularConstant=".35" specularExponent="12" lighting-color="#fff" result="sp"><fePointLight x="110" y="30" z="200"/></feSpecularLighting><feBlend in="d" in2="df" mode="multiply" result="sh"/><feComposite in="sp" in2="sh" operator="arithmetic" k2=".6" k3="1" result="o"/><feComposite in="o" in2="d" operator="in"/></filter>`);
    },
    porForma: 'clay'
  });
  add('plastico', {
    nombre: 'Juguete de plástico', motivo: 'robot',
    paleta: { metal: '#3a8ae0', metalS: '#2a6ab8', acento: '#ffd23f', acento2: '#e8432f', fondo: '#ffe8a8', fondo2: '#ffc86a' },
    defs(S) { S.def('pla', inflar('pla', 6, 1.1, 40, 4)); },
    porForma: 'pla'
  });
  add('figura', {
    nombre: 'Figura de vinilo coleccionable', motivo: 'retrato',
    paleta: { piel: '#f6d0b8', pielS: '#e0aa8a', ropa: '#2a2e34', ropaS: '#1a1d22', fondo: '#cfe2ee', fondo2: '#9fbfd6' },
    opciones: { ojos: 'punto', chibi: true },
    defs(S) { S.def('vin', inflar('vin', 8, 0.8, 30, 5)); },
    porForma: 'vin',
    despues: S => `<rect x="20" y="16" width="360" height="268" rx="10" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="3"/>`
  });

  /* ============================================================
     TEXTIL Y MANUALIDADES
     ============================================================ */
  add('fieltro', {
    nombre: 'Fieltro', motivo: 'gato', modo: 'outline', sw: 1.6, lc: '#fff8ee', dash: '4 4',
    paleta: { fondo: '#c9b8a0', fondo2: '#b8a68c' },
    defs(S) {
      S.def('fel', `<filter id="fel" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="3.5" result="d"/><feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity=".3"/></filter>`);
    },
    porForma: 'fel',
    fondo: S => lienzo(S, '#b8c9a8') + capaGrano(S, 0.3, 'multiply'),
    despues: S => capaGrano(S, 0.25, 'multiply')
  });
  const tejido = (id, nombre, motivo, celda, puntada, fondoCol) => add(id, {
    nombre, motivo,
    defs(S) { S.def(id + 'p', filtroPixel(id + 'p', celda, 5)); },
    fondo: S => lienzo(S, fondoCol),
    capa: '',
    envolver(S, svg) {
      return `<g filter="url(#${id}p)">${svg}</g><rect width="400" height="300" fill="${pat(S, id + 'x', celda, celda, puntada)}"/>` + capaGrano(S, 0.12);
    }
  });
  tejido('punto', 'Punto de lana', 'paisaje', 12, '<path d="M1 1 Q3 10 6 11 M11 1 Q9 10 6 11" fill="none" stroke="#000" stroke-opacity=".28" stroke-width="1.6"/><path d="M2 2 Q4 8 6 9 M10 2 Q8 8 6 9" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="1.2"/>', '#e8e0d0');
  tejido('ganchillo', 'Ganchillo', 'flor', 10, '<circle cx="5" cy="5" r="3.6" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1.4"/><circle cx="4.4" cy="4.4" r="2.4" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>', '#f2e6d8');

  add('bordado', {
    nombre: 'Bordado', motivo: 'flor', modo: 'outline', sw: 1.4, lc: '#3a2a20', dash: '3 2',
    fondo: S => lienzo(S, '#3a5a4a'),
    envolver(S, svg, ctx) {
      S.def('bordC', '<clipPath id="bordC"><circle cx="200" cy="150" r="128"/></clipPath>');
      const lino = pat(S, 'lino', 4, 4, '<rect width="4" height="4" fill="#efe6d4"/><path d="M0 2 H4 M2 0 V4" stroke="#d9cdb6" stroke-width=".8"/>');
      const satin = pat(S, 'satin', 4, 4, '<path d="M0 4 L4 0" stroke="#fff" stroke-opacity=".35" stroke-width="1"/>', ' patternTransform="rotate(20)"');
      return lienzo(S, '#3a5a4a') + `<g clip-path="url(#bordC)"><rect width="400" height="300" fill="${lino}"/><g transform="translate(200 150) scale(.82) translate(-200 -150)">${ctx.fig}${enMotivo(S, ctx.fig, satin, 1, 'normal', 'bm')}</g></g>` +
        `<circle cx="200" cy="150" r="132" fill="none" stroke="#c9945a" stroke-width="12"/><circle cx="200" cy="150" r="140" fill="none" stroke="#a8743a" stroke-width="5"/><rect x="190" y="6" width="20" height="14" rx="3" fill="#8a8f96"/>`;
    }
  });

  add('arena', {
    nombre: 'Escultura de arena', motivo: 'castillo', fondo: sinFondo,
    defs(S) {
      S.def('are', mapaDegradado('are', ['#8a6a3a', '#b88e56', '#dcb87e', '#f2dcaa']));
      S.def('areR', relieve('areR', '.6', 2, 3, 1.1));
    },
    envolver(S, svg) {
      return `<rect width="400" height="300" fill="${S.lg('arC', ['#7ec6ef', '#e8f6fb'])}"/><g filter="url(#areR)"><g filter="url(#are)">${svg.replace(/<rect width="400" height="300" fill="url\(#caC\)"\/>/, '')}</g></g><path d="M0 268 C100 256 300 262 400 270 V300 H0Z" fill="#e8cf9a"/>`;
    }
  });

  /* ============================================================
     MATERIALES (mapa de degradado + textura)
     ============================================================ */
  const fondoOscuro = S => lienzo(S, '#2a2c30') + `<ellipse cx="200" cy="140" rx="200" ry="160" fill="${S.rg('mfl', [['#5c6068', 0, 0.9], ['#2a2c30', 1, 0]])}"/>`;
  const fondoClaro = S => lienzo(S, '#e9e4dc') + `<ellipse cx="200" cy="130" rx="220" ry="170" fill="${S.rg('mfc', [['#ffffff', 0, 0.8], ['#ffffff', 1, 0]])}"/>`;
  const turb = (id, freq, mat, tipo = 'fractalNoise', semilla = 21) => `<filter id="${id}" ${FR}><feTurbulence type="${tipo}" baseFrequency="${freq}" numOctaves="4" seed="${semilla}"/><feColorMatrix type="matrix" values="${mat}"/></filter>`;
  const conTextura = (filtroId, op, blend = 'multiply') => (S, M, fig) => `<g mask="${mascara(S, 'mk' + filtroId, fig)}" opacity="${op}" style="mix-blend-mode:${blend}"><rect width="400" height="300" filter="url(#${filtroId})"/></g>`;

  material('marmol', 'Mármol', ['#6f6a66', '#b9b4ae', '#e9e6e1', '#fbfaf8'], {
    fondo: fondoOscuro,
    defs(S) { S.def('matmarmol', mapaDegradado('matmarmol', ['#6f6a66', '#b9b4ae', '#e9e6e1', '#fbfaf8'])); S.def('vetas', turb('vetas', '.012 .03', '0 0 0 0 .35 0 0 0 0 .35 0 0 0 0 .38 -2.6 0 0 0 1.05', 'turbulence')); },
    despues: conTextura('vetas', 0.7, 'normal')
  });
  material('bronce', 'Bronce', ['#1e1008', '#5a3416', '#a8702e', '#e8b46a', '#fff0c8'], {
    fondo: fondoOscuro,
    defs(S) { S.def('matbronce', mapaDegradado('matbronce', ['#1e1008', '#5a3416', '#a8702e', '#e8b46a', '#fff0c8'])); S.def('patina', turb('patina', '.03', '0 0 0 0 .25 0 0 0 0 .55 0 0 0 0 .45 2.2 0 0 0 -1.25')); },
    despues: conTextura('patina', 0.6, 'normal')
  });
  material('cobre', 'Cobre con verdín', ['#123a36', '#2f7a6a', '#6ab8a0', '#bfe6d6', '#eafaf2'], {
    fondo: S => lienzo(S, '#8aa6b8') + `<rect y="250" width="400" height="50" fill="#6a7f8c"/>`,
    defs(S) { S.def('matcobre', mapaDegradado('matcobre', ['#123a36', '#2f7a6a', '#6ab8a0', '#bfe6d6', '#eafaf2'])); S.def('cobT', turb('cobT', '.05', '0 0 0 0 .55 0 0 0 0 .3 0 0 0 0 .15 2.6 0 0 0 -1.7')); },
    despues: conTextura('cobT', 0.7, 'normal')
  });
  material('madera', 'Talla en madera', ['#3a1f0e', '#6a3e1e', '#a8703e', '#d6a56a', '#f0cf98'], {
    fondo: fondoClaro,
    defs(S) { S.def('matmadera', mapaDegradado('matmadera', ['#3a1f0e', '#6a3e1e', '#a8703e', '#d6a56a', '#f0cf98'])); S.def('veta', turb('veta', '.01 .18', '0 0 0 0 .25 0 0 0 0 .12 0 0 0 0 .05 -3 0 0 0 1.4', 'turbulence', 4)); },
    despues: conTextura('veta', 0.55, 'normal')
  });
  material('hielo', 'Escultura de hielo', ['#0e2a4a', '#3a7ab0', '#9fd6f2', '#e8f8ff', '#ffffff'], {
    fondo: S => lienzo(S, '#0b1a2e') + `<ellipse cx="200" cy="150" rx="180" ry="150" fill="${S.rg('hiF', [['#2a5a8a', 0, 0.8], ['#0b1a2e', 1, 0]])}"/>`,
    capa: ' opacity=".88"',
    defs(S) { S.def('mathielo', mapaDegradado('mathielo', ['#0e2a4a', '#3a7ab0', '#9fd6f2', '#e8f8ff', '#ffffff'])); S.def('grieta', turb('grieta', '.02', '0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -5 0 0 0 .9', 'turbulence', 8)); },
    despues: (S, M, fig) => conTextura('grieta', 0.6, 'screen')(S, M, fig) + destello(150, 70, 12) + destello(250, 200, 9) + destello(210, 110, 7)
  });
  material('ceramica', 'Cerámica esmaltada', ['#0c2a33', '#1f6a78', '#4ab0b0', '#bfe8e0', '#ffffff'], {
    motivo: 'jarron', fondo: fondoClaro,
    despues: S => `<path d="M156 100 C140 130 136 170 148 206" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".6"/>`
  });
  material('porcelana', 'Porcelana', ['#9aa6c0', '#d6dcea', '#f2f4f8', '#ffffff'], {
    motivo: 'jarron', fondo: S => lienzo(S, '#2a3a5a'),
    despues(S, M, fig) {
      const dib = pat(S, 'delft', 46, 46, '<path d="M8 30 C8 14 26 10 30 22 C34 32 20 36 18 28 M30 22 C36 12 44 16 42 24" fill="none" stroke="#2a4ab0" stroke-width="2.2"/><circle cx="36" cy="38" r="3" fill="#2a4ab0"/>');
      return enMotivo(S, fig, dib, 0.9, 'multiply', 'porM') + `<path d="M156 100 C140 130 136 170 148 206" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".8"/>`;
    }
  });
  material('vidrio', 'Vidrio soplado', ['#0a3a5a', '#2a8ac0', '#ff8a3a', '#ffd36e', '#ffffff'], {
    motivo: 'jarron', capa: ' opacity=".82"',
    fondo: S => lienzo(S, '#f2eee6') + `<rect y="250" width="400" height="50" fill="#e2dccf"/>`,
    despues: S => `<path d="M150 104 C134 130 130 170 142 206" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".75"/><ellipse cx="205" cy="276" rx="80" ry="8" fill="#ff8a3a" opacity=".25"/>`
  });
  material('cromo', 'Cromo', ['#0d1014', '#e9eef2', '#4a525a', '#ffffff', '#1d2328', '#cfd6dc', '#ffffff'], {
    motivo: 'esfera',
    fondo: S => `<rect width="400" height="200" fill="${S.lg('crC', ['#b8d4e8', '#eef4f8'])}"/><rect y="200" width="400" height="100" fill="${S.lg('crS', ['#8c8478', '#5d564c'])}"/>`
  });
  material('metal-liquido', 'Metal líquido', ['#0d1014', '#f2f6f8', '#3a424a', '#ffffff', '#5a646c', '#e0e6ea'], {
    motivo: 'gotas', fondo: S => `<rect width="400" height="300" fill="${S.lg('mlF', ['#d8dde2', '#9aa2aa'])}"/>`
  });
  material('oro-fundido', 'Oro fundido', ['#3a1a00', '#a8580a', '#f2a81a', '#ffe08a', '#ffffff'], {
    motivo: 'gotas', fondo: S => lienzo(S, '#140a04'),
    despues: S => S.halo(200, 200, 160, '#ff9a1a', 0.35)
  });
  material('panoro', 'Pan de oro', ['#4a2a08', '#a87a2a', '#f2cf6a', '#fff2c0'], {
    motivo: 'monograma', fondo: S => lienzo(S, '#1c2a24'),
    despues(S, M, fig) {
      const hojas = pat(S, 'hojaOro', 26, 26, '<rect width="26" height="26" fill="none" stroke="#6a4410" stroke-opacity=".5" stroke-width="1"/><path d="M0 9 L26 11" stroke="#fff6d0" stroke-opacity=".4"/>');
      return enMotivo(S, fig, hojas, 1, 'multiply', 'oroM');
    }
  });
  material('oxido', 'Metal oxidado', ['#1e0e06', '#5a2a12', '#a8521e', '#d68a4a', '#e8b07a'], {
    motivo: 'robot', fondo: S => lienzo(S, '#6a6e66') + `<rect y="250" width="400" height="50" fill="#4a4e48"/>`,
    defs(S) { S.def('matoxido', mapaDegradado('matoxido', ['#1e0e06', '#5a2a12', '#a8521e', '#d68a4a', '#e8b07a'])); S.def('oxT', turb('oxT', '.08', '0 0 0 0 .25 0 0 0 0 .12 0 0 0 0 .05 2.4 0 0 0 -1.1')); },
    despues: conTextura('oxT', 0.8, 'normal')
  });
  material('carbono', 'Fibra de carbono', ['#1a1d22', '#4a525c', '#9aa4b0', '#eef2f6'], {
    motivo: 'casco', fondo: fondoClaro,
    despues(S, M, fig) {
      const tej = pat(S, 'carb', 12, 12, '<rect width="6" height="6" fill="#2a2e34"/><rect x="6" y="6" width="6" height="6" fill="#2a2e34"/><rect x="6" width="6" height="6" fill="#141618"/><rect y="6" width="6" height="6" fill="#141618"/><path d="M0 0 L6 6 M6 6 L12 12" stroke="#fff" stroke-opacity=".12"/>', ' patternTransform="rotate(45)"');
      return enMotivo(S, fig, tej, 0.85, 'multiply', 'carM');
    }
  });
  material('holografico', 'Holográfico', ['#5a3ab0', '#ff8ad0', '#ffd36e', '#7cf0c8', '#7ab6ff', '#e0c8ff', '#ffffff'], {
    motivo: 'carta', fondo: S => lienzo(S, '#1f1a2e')
  });
  material('lujo', 'Negro y oro', ['#0a0a0a', '#5a400e', '#c9973a', '#f6dc96', '#fff6dc'], {
    motivo: 'perfume',
    fondo: S => lienzo(S, '#0d0d0f') + `<rect x="24" y="20" width="352" height="260" fill="none" stroke="#c9973a" stroke-width="1.5"/><rect x="34" y="30" width="332" height="240" fill="none" stroke="#c9973a" stroke-width=".8"/>` + [[24, 20], [376, 20], [24, 280], [376, 280]].map(([x, y]) => `<polygon points="${star(x, y, 10, 3, 4)}" fill="#c9973a"/>`).join('')
  });

  add('espejo', {
    nombre: 'Espejo', motivo: 'retrato',
    envolver(S, svg, ctx) {
      S.def('espC', '<clipPath id="espC"><ellipse cx="200" cy="150" rx="104" ry="132"/></clipPath>');
      S.def('espT', `<filter id="espT" ${FR}><feColorMatrix type="matrix" values=".85 0 0 0 .05 0 .9 0 0 .07 0 0 1 0 .1 0 0 0 1 0"/></filter>`);
      return lienzo(S, '#3a4a4a') + `<rect width="400" height="300" fill="${pat(S, 'papelP', 30, 30, '<rect width="30" height="30" fill="#3a4a4a"/><path d="M15 4 L19 15 L15 26 L11 15 Z" fill="#4a5a5a"/>')}"/>` +
        `<g clip-path="url(#espC)"><rect width="400" height="300" fill="#c8d4d8"/><g filter="url(#espT)" transform="matrix(-1 0 0 1 400 0)">${svg}</g><path d="M110 40 L170 40 L90 280 L60 280 Z" fill="#fff" opacity=".2"/></g>` +
        `<ellipse cx="200" cy="150" rx="110" ry="138" fill="none" stroke="${S.lg('espM', ['#f2d38a', '#8a5a1a', '#e6b84a'], 0, 0, 1, 1)}" stroke-width="14"/>`;
    }
  });

  /* ============================================================
     LUZ Y CLIMA (sobre el mismo paisaje)
     ============================================================ */
  const lluvia = (S, n, col = '#cfe0ff', op = 0.55, ang = -6, seed = 4) => {
    const r = rng(seed);
    return Array.from({ length: n }, () => { const x = r() * 420, y = r() * 300, l = 10 + r() * 14; return `<path d="M${r1(x)} ${r1(y)} l${ang} ${r1(l)}" stroke="${col}" stroke-width="1.3" opacity="${op}"/>`; }).join('');
  };
  const rayo = (x, y, s = 1, col = '#fff6c8') => `<path d="M${x} ${y} l${-14 * s} ${50 * s} l${16 * s} ${-4 * s} l${-20 * s} ${70 * s} l${40 * s} ${-84 * s} l${-18 * s} ${4 * s} l${14 * s} ${-36 * s} Z" fill="${col}"/>`;
  const luz = (id, nombre, paleta, opciones = {}, despues) => add(id, { nombre, motivo: 'paisaje', paleta, opciones, despues });

  luz('atardecer', 'Atardecer',
    { cielo: '#3d3b78', cielo2: '#f39a5b', sol: '#ffcf6b', nube: '#f2a38a', lejos: '#7a5a86', medio: '#5b4a6e', cerca: '#2d2640', agua: '#f0a070', muro: '#e0b38f', muroS: '#b88a6e', tejado: '#7a3a3a', hoja: '#3c4a54', hojaS: '#2c3640', tronco: '#2c2630' },
    { solY: 186, solR: 30, ventanas: true });
  luz('amanecer', 'Amanecer',
    { cielo: '#9fc0e8', cielo2: '#fbd6c0', sol: '#fff0c8', nube: '#ffe2d6', lejos: '#b8b0d0', medio: '#8aa894', cerca: '#4f7a6a', agua: '#e6c8c8' },
    { solY: 176, solX: 110, solR: 24 },
    S => `<rect y="150" width="400" height="80" fill="${S.lg('amB', [['#ffffff', 0], ['#ffffff', 1]])}" opacity=".25"/>`);
  luz('noche', 'Noche de luna',
    { cielo: '#0b1330', cielo2: '#2b3f6e', sol: '#f1efe2', nube: '#3b4a72', lejos: '#2c3a60', medio: '#1f2d4c', cerca: '#121b30', agua: '#3a5a8c', muro: '#8d96b0', muroS: '#6c7590', tejado: '#3a3f5e', hoja: '#1f3048', hojaS: '#172438', tronco: '#1a2234' },
    { solY: 70, solX: 300, solR: 22, luna: true, estrellas: true, ventanas: true });
  luz('nieve', 'Nieve',
    { cielo: '#b8c8d8', cielo2: '#eef2f6', sol: '#f6f4ec', nube: '#ffffff', lejos: '#c8d4e2', medio: '#f2f6fa', cerca: '#e2eaf2', agua: '#9ab8cc', hoja: '#3f6a5a', hojaS: '#2f5446', tejado: '#f6f8fb' },
    { nieve: true, solR: 20 },
    S => { const r = rng(6); return Array.from({ length: 90 }, () => `<circle cx="${r1(r() * 400)}" cy="${r1(r() * 300)}" r="${r1(1 + r() * 2.2)}" fill="#fff" opacity="${r1(0.6 + r() * 0.4)}"/>`).join(''); });
  luz('lluvia', 'Lluvia',
    { cielo: '#6a7a8a', cielo2: '#aab4bc', sol: '#c8ccd0', nube: '#7a8590', lejos: '#7f8c98', medio: '#4f6a60', cerca: '#2f4a44', agua: '#5a7080' },
    { sinSol: true, ventanas: true },
    S => `<rect width="400" height="300" fill="#2a3a4a" opacity=".2"/>` + lluvia(S, 140));
  luz('tormenta', 'Tormenta',
    { cielo: '#1e2430', cielo2: '#4a5260', nube: '#2a303a', lejos: '#3a4250', medio: '#283a34', cerca: '#141e1c', agua: '#2a3a48', muro: '#8a8a84', hoja: '#1f3028', hojaS: '#18241e' },
    { sinSol: true, ventanas: true },
    S => S.halo(240, 60, 140, '#c8d8ff', 0.35) + rayo(250, 20, 1.1) + lluvia(S, 160, '#b8c8e0', 0.5, -10, 8));
  luz('rayo', 'Rayo',
    { cielo: '#120f2a', cielo2: '#3a2f6a', nube: '#2a2450', lejos: '#2a2a4a', medio: '#1a2238', cerca: '#0e1220', agua: '#3a3a7a' },
    { sinSol: true, sinNubes: true, estrellas: true, ventanas: true },
    S => `<rect width="400" height="300" fill="#b8a8ff" opacity=".12"/>` + S.halo(200, 80, 180, '#d8ccff', 0.5) + rayo(210, 0, 1.7, '#ffffff') + rayo(120, 10, 0.8, '#e8dcff'));
  luz('niebla', 'Niebla',
    { cielo: '#c8ccce', cielo2: '#e6e8e8', sol: '#f2f2ee', lejos: '#c2c8cc', medio: '#9aa8a4', cerca: '#6a7a76', agua: '#b8c4c8', nube: '#e6e8e8' },
    { solR: 18 },
    S => `<rect y="140" width="400" height="80" fill="${S.lg('niG', [['#ffffff', 0], ['#ffffff', 1]], 0, 0, 0, 1)}" opacity=".55"/><rect y="200" width="400" height="100" fill="#ffffff" opacity=".45"/>`);
  luz('bruma', 'Bruma',
    { cielo: '#d6d0e6', cielo2: '#f6e6e0', sol: '#fff6e8', lejos: '#d0cae0', medio: '#b8c8c4', cerca: '#9ab0ac', agua: '#e8e0ea', nube: '#f8f2f4' },
    { solR: 30, solY: 110 },
    S => `<rect width="400" height="300" fill="#ffffff" opacity=".28"/>` + S.halo(292, 110, 150, '#ffffff', 0.5));
  luz('aurora', 'Aurora boreal',
    { cielo: '#061428', cielo2: '#123a4a', sol: '#f1efe2', nube: '#1a3040', lejos: '#183048', medio: '#0f2a2e', cerca: '#081a1c', agua: '#1f5a5a', muro: '#6a7a8a', tejado: '#2a3a4a', hoja: '#0f2a28', hojaS: '#0a201e' },
    { sinSol: true, sinNubes: true, estrellas: true, ventanas: true },
    S => {
      S.def('auB', `<filter id="auB" ${FR}><feGaussianBlur stdDeviation="9"/></filter>`);
      return `<g filter="url(#auB)" style="mix-blend-mode:screen"><path d="M-20 120 C60 40 140 140 220 60 S360 90 420 40" stroke="#3affb0" stroke-width="40" fill="none" opacity=".75"/><path d="M-20 90 C80 30 160 110 260 40 S380 60 420 20" stroke="#8a5aff" stroke-width="26" fill="none" opacity=".55"/></g>`;
    });
  luz('meteoros', 'Lluvia de meteoros',
    { cielo: '#0a0e26', cielo2: '#2a2f5a', nube: '#232850', lejos: '#22284a', medio: '#161e36', cerca: '#0c1222', agua: '#2a3a6a', muro: '#7a80a0', tejado: '#2a2f4a' },
    { sinSol: true, sinNubes: true, estrellas: true, ventanas: true },
    S => [[340, 20, 120], [270, 40, 90], [380, 80, 70], [200, 14, 60], [320, 110, 50]].map(([x, y, l]) => `<path d="M${x} ${y} l${-l} ${l * 0.6}" stroke="${S.lg('meG', [['#ffffff', 0], ['#7ab6ff', 1]], 0, 0, 1, 1)}" stroke-width="2.4" stroke-linecap="round" opacity=".9"/><circle cx="${x}" cy="${y}" r="2.6" fill="#fff"/>`).join(''));
  luz('bioluminiscente', 'Bioluminiscencia',
    { cielo: '#04101e', cielo2: '#0a2a3a', nube: '#0e2230', lejos: '#0a1e2c', medio: '#08202a', cerca: '#041218', agua: '#0a4a5a', muro: '#2a3a44', muroS: '#1f2c34', tejado: '#14222a', hoja: '#0a3a3a', hojaS: '#062a2a', tronco: '#0a1a1e' },
    { sinSol: true, sinNubes: true, estrellas: true },
    S => {
      const r = rng(11);
      let o = S.halo(250, 240, 120, '#3affd8', 0.35);
      for (let i = 0; i < 70; i++) { const x = r() * 400, y = 180 + r() * 120; o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1 + r() * 2.5)}" fill="${r() > 0.3 ? '#5affe0' : '#7ab6ff'}" opacity="${r1(0.5 + r() * 0.5)}"/>`; }
      return o + [[60, 270], [90, 262], [330, 266]].map(([x, y]) => `<path d="M${x} ${y} v-14" stroke="#5affe0" stroke-width="3"/><ellipse cx="${x}" cy="${y - 16}" rx="10" ry="6" fill="#5affe0"/>${S.halo(x, y - 16, 22, '#5affe0', 0.6)}`).join('');
    });

  add('horadorada', {
    nombre: 'Hora dorada', motivo: 'retrato',
    paleta: { piel: '#f2b884', pielS: '#c98450', pelo: '#5a3418', ropa: '#c98a4a', ropaS: '#a86a34', fondo: '#f6c27a', fondo2: '#e8864a' },
    fondo: S => `<rect width="400" height="300" fill="${S.lg('hdF', ['#ffd896', '#f08a4a'])}"/>` + S.halo(320, 70, 180, '#fff2c8', 0.9),
    despues: S => `<rect width="400" height="300" fill="${S.lg('hdL', [['#ffb24a', 0], ['#ff7a2a', 1]], 1, 0, 0, 1)}" opacity=".18" style="mix-blend-mode:screen"/><circle cx="300" cy="90" r="10" fill="#fff" opacity=".7"/><circle cx="260" cy="130" r="16" fill="#ffe2a8" opacity=".35"/><circle cx="220" cy="170" r="7" fill="#ffe2a8" opacity=".4"/>`
  });
  add('electrico', {
    nombre: 'Energía eléctrica', motivo: 'retrato',
    defs(S) { S.def('elF', mapaDegradado('elF', ['#04061a', '#1a2a6a', '#5a8aff', '#e8f4ff'])); S.def('elG', `<filter id="elG" ${FR}><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`); },
    fondo: S => lienzo(S, '#04061a'),
    filtro: 'elF',
    despues(S) {
      const r = rng(3);
      let o = '';
      for (let k = 0; k < 7; k++) {
        let x = 200 + (r() - 0.5) * 260, y = r() * 300, d = `M${r1(x)} ${r1(y)}`;
        for (let i = 0; i < 6; i++) { x += (r() - 0.5) * 50; y += (r() - 0.3) * 30; d += ` L${r1(x)} ${r1(y)}`; }
        o += `<path d="${d}" fill="none" stroke="#bfe0ff" stroke-width="2"/>`;
      }
      return `<g filter="url(#elG)">${o}</g>`;
    }
  });
  add('cyberpunk', {
    nombre: 'Cyberpunk', motivo: 'ciudad:noche',
    paleta: { luz: '#ff3df2', lejos: '#2a1a4a' },
    despues: S => `<rect width="400" height="300" fill="${S.lg('cpG', [['#ff3df2', 0], ['#00e5ff', 1]], 0, 0, 1, 1)}" opacity=".22" style="mix-blend-mode:screen"/>` +
      `<rect x="40" y="130" width="22" height="70" fill="#ff3df2"/><text x="51" y="146" font-size="12" font-weight="700" fill="#1a0a2a" text-anchor="middle" writing-mode="tb">NEO</text>` + S.halo(51, 165, 50, '#ff3df2', 0.55) +
      `<rect x="300" y="160" width="70" height="22" fill="#00e5ff"/><text x="335" y="176" font-size="13" font-weight="700" fill="#06121a" text-anchor="middle" font-family="'Courier New', monospace">24H</text>` + S.halo(335, 171, 50, '#00e5ff', 0.55) +
      lluvia(S, 120, '#c8b8ff', 0.4, -4, 9)
  });

  /* ============================================================
     CÁMARA Y FOTOGRAFÍA
     ============================================================ */
  add('estudio', {
    nombre: 'Foto de producto en estudio', motivo: 'perfume',
    fondo: S => `<rect width="400" height="300" fill="${S.lg('esF', ['#f4f1ec', '#d9d2c8'])}"/><ellipse cx="200" cy="150" rx="210" ry="160" fill="${S.rg('esL', [['#ffffff', 0, 0.9], ['#ffffff', 1, 0]])}"/>`,
    despues: (S, M, fig) => `<g transform="matrix(1 0 0 -.35 0 354)" opacity=".2">${fig}</g><rect x="60" y="0" width="34" height="300" fill="#fff" opacity=".18"/>`
  });
  add('macro', {
    nombre: 'Macro', motivo: 'flor',
    envolver(S, svg) {
      S.def('maB', `<filter id="maB" ${FR}><feGaussianBlur stdDeviation="6"/></filter>`);
      S.def('maM', `<mask id="maM" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="300"><rect width="400" height="300" fill="${S.rg('maMG', [['#fff', 0.35], ['#000', 0.75]], 0.5, 0.45, 0.6)}"/></mask>`);
      const z = `<g transform="translate(200 150) scale(2.6) translate(-200 -118)">${svg}</g>`;
      return lienzo(S, '#2f5a2a') + `<g filter="url(#maB)">${z}</g><g mask="url(#maM)">${z}</g>` +
        [[150, 100, 9], [262, 186, 12], [222, 76, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".35"/><circle cx="${x - r * 0.3}" cy="${y - r * 0.35}" r="${r * 0.3}" fill="#fff" opacity=".9"/>`).join('');
    }
  });
  add('bokeh', {
    nombre: 'Bokeh', motivo: 'retrato',
    fondo(S) {
      S.def('boB', `<filter id="boB" ${FR}><feGaussianBlur stdDeviation="3"/></filter>`);
      const r = rng(12);
      let o = lienzo(S, '#1a1e2a') + '<g filter="url(#boB)">';
      for (let i = 0; i < 30; i++) o += `<circle cx="${r1(r() * 400)}" cy="${r1(r() * 300)}" r="${r1(10 + r() * 26)}" fill="${['#ffcf6a', '#ff8a5a', '#7ab6ff', '#ffe8b0'][i % 4]}" opacity="${r1(0.25 + r() * 0.45)}"/>`;
      return o + '</g>';
    }
  });
  add('cine', {
    nombre: 'Encuadre cinematográfico', motivo: 'retrato',
    defs(S) { S.def('cineF', mapaDegradado('cineF', ['#06171c', '#1e4a50', '#5a7a74', '#d99a62', '#ffe0b4'])); },
    fondo: S => `<rect width="400" height="300" fill="${S.lg('ciF', ['#2a5a64', '#e0a06a'], 0, 0, 1, 0)}"/>`,
    envolver: (S, svg) => `<g filter="url(#cineF)">${svg}</g><rect width="400" height="46" fill="#000"/><rect y="254" width="400" height="46" fill="#000"/>` + capaGrano(S, 0.08)
  });
  add('panoramica', {
    nombre: 'Gran formato panorámico', motivo: 'paisaje',
    envolver: (S, svg) => `<rect width="400" height="300" fill="#000"/><svg x="0" y="70" width="400" height="160" viewBox="0 90 400 160" preserveAspectRatio="xMidYMid slice">${svg}<g transform="translate(200 236)"><circle cx="0" cy="-12" r="2.4" fill="#111"/><path d="M0 -10 V0" stroke="#111" stroke-width="2"/></g></svg>`
  });
  add('hdr', {
    nombre: 'HDR', motivo: 'paisaje',
    paleta: { cielo: '#2a6ab8', cielo2: '#ffd08a', nube: '#ffffff' },
    defs(S) { S.def('hdrF', `<filter id="hdrF" ${FR}><feColorMatrix type="saturate" values="1.7"/><feComponentTransfer><feFuncR type="linear" slope="1.2" intercept="-.08"/><feFuncG type="linear" slope="1.2" intercept="-.08"/><feFuncB type="linear" slope="1.2" intercept="-.08"/></feComponentTransfer><feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/></filter>`); },
    filtro: 'hdrF',
    despues: S => vineta(S, 0.3)
  });
  const visor = (S, txt) => `<g fill="none" stroke="#fff" stroke-width="2.5" opacity=".9"><path d="M20 50 V20 H50 M350 20 H380 V50 M380 250 V280 H350 M50 280 H20 V250"/><rect x="176" y="112" width="48" height="48" stroke-width="1.5"/></g><circle cx="34" cy="38" r="0" fill="#e2402f"/><text x="30" y="270" font-size="12" font-weight="700" fill="#fff" font-family="'Courier New', monospace">${txt}</text>`;
  add('foto', {
    nombre: 'Fotorrealista', motivo: 'retrato',
    paleta: { fondo: '#b8c4c8', fondo2: '#6a7a80' },
    defs(S) { S.def('fotoF', `<filter id="fotoF" ${FR}><feGaussianBlur stdDeviation=".35"/><feColorMatrix type="saturate" values=".9"/></filter>`); },
    filtro: 'fotoF',
    despues: S => vineta(S, 0.25) + capaGrano(S, 0.07) + visor(S, 'ISO 200  1/250  f/2.8  RAW')
  });
  add('hiperreal', {
    nombre: 'Hiperrealista', motivo: 'perfume',
    defs(S) { S.def('hiF', `<filter id="hiF" ${FR}><feColorMatrix type="saturate" values="1.3"/><feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"/></filter>`); },
    fondo: S => `<rect width="400" height="300" fill="${S.lg('hipF', ['#0f1a2a', '#2a4a6a'])}"/>` + S.halo(200, 150, 160, '#5ab0ff', 0.35),
    filtro: 'hiF',
    despues: S => [[150, 140, 4], [252, 120, 3], [190, 230, 3]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity=".9"/>`).join('') + destello(150, 130, 12) + visor(S, '8K  ·  RENDER')
  });
  add('tiltshift', {
    nombre: 'Miniatura (tilt-shift)', motivo: 'pueblo',
    defs(S) { S.def('tsSat', `<filter id="tsSat" ${FR}><feColorMatrix type="saturate" values="1.5"/></filter>`); },
    capa: '',
    envolver(S, svg) {
      S.def('tsB', `<filter id="tsB" ${FR}><feGaussianBlur stdDeviation="4.5"/></filter>`);
      S.def('tsM', `<mask id="tsM" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="300"><rect width="400" height="300" fill="${S.lg('tsG', [['#000', 0.15], ['#fff', 0.45], ['#fff', 0.62], ['#000', 0.9]])}"/></mask>`);
      return `<g filter="url(#tsSat)"><g filter="url(#tsB)">${svg}</g><g mask="url(#tsM)">${svg}</g></g>`;
    }
  });
  add('contraluz', {
    nombre: 'Silueta a contraluz', motivo: 'retrato',
    defs(S) { S.def('silF', mapaDegradado('silF', ['#120c14', '#1c1218'])); },
    fondo: S => `<rect width="400" height="300" fill="${S.lg('silC', ['#3a2a6a', '#ff8a4a', '#ffd88a'])}"/>` + S.halo(200, 210, 150, '#fff2c8', 0.8),
    filtro: 'silF'
  });
  add('doble-exposicion', {
    nombre: 'Doble exposición', motivo: 'retrato', fondo: sinFondo,
    envolver(S, svg, ctx) {
      U.usar(S, 'blanco');
      S.def('dxM', `<mask id="dxM" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="300"><g filter="url(#blanco)">${ctx.fig}</g></mask>`);
      const S2 = Object.assign({}, S);
      const pais = M.motivos.paisaje.dibujo(S, '', { sinSol: false });
      void S2;
      return lienzo(S, '#f4f2ee') + `<g mask="url(#dxM)"><g transform="translate(0 30)">${pais}</g><rect width="400" height="300" fill="#fff" opacity=".12"/></g><g opacity=".22" style="mix-blend-mode:multiply" filter="url(#dxG)">${ctx.fig}</g>` +
        (S.def('dxG', mapaDegradado('dxG', ['#2a3a44', '#f4f2ee'])), '');
    }
  });
  add('noir', {
    nombre: 'Cine negro', motivo: 'retrato:detective',
    defs(S) { S.def('noirF', mapaDegradado('noirF', ['#050505', '#1c1c1c', '#7a7a76', '#e6e4de', '#ffffff'])); },
    fondo: S => lienzo(S, '#6a6a66') + `<path d="M260 0 H400 V300 H200 Z" fill="#2a2a28"/>`,
    filtro: 'noirF',
    despues: S => `<g opacity=".55">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${-40 + i * 46} 0 L${120 + i * 46} 0 L${20 + i * 46} 300 L${-140 + i * 46} 300 Z" fill="#000" transform="skewX(-8)"/>`).join('')}</g>`.replace(/fill="#000"/g, 'fill="#000" opacity=".5"') + vineta(S, 0.6) + capaGrano(S, 0.18)
  });

  add('pelicula', {
    nombre: 'Grano de película', motivo: 'retrato',
    paleta: { fondo: '#c8b896', fondo2: '#8a7a5a' },
    defs(S) { S.def('pelF', `<filter id="pelF" ${FR}><feColorMatrix type="matrix" values=".9 .1 0 0 .06 .05 .85 .05 0 .05 0 .1 .75 0 .06 0 0 0 1 0"/></filter>`); },
    filtro: 'pelF',
    despues: S => capaGrano(S, 0.45, 'overlay') + capaGrano(S, 0.18) + `<rect width="400" height="300" fill="${S.rg('leak', [['#ff6a2a', 0, 0.55], ['#ff6a2a', 1, 0]], 1, 0.1, 0.6)}"/><path d="M120 0 V300 M300 0 V140" stroke="#fff" stroke-width=".8" opacity=".5"/>` + vineta(S, 0.4)
  });
  add('polaroid', {
    nombre: 'Polaroid', motivo: 'paisaje',
    defs(S) { S.def('polF', `<filter id="polF" ${FR}><feColorMatrix type="matrix" values=".85 .1 .05 0 .08 .05 .85 .1 0 .06 .05 .1 .7 0 .1 0 0 0 1 0"/></filter>`); },
    envolver(S, svg) {
      const madera = pat(S, 'mad', 400, 30, '<rect width="400" height="30" fill="#a8784a"/><path d="M0 15 C100 10 200 22 400 14" stroke="#8a5a32" stroke-width="2" fill="none"/>');
      return `<rect width="400" height="300" fill="${madera}"/><g transform="rotate(-5 200 150)"><rect x="96" y="14" width="214" height="262" fill="#000" opacity=".25" transform="translate(5 6)"/><rect x="96" y="14" width="214" height="262" fill="#fbfaf4"/><svg x="110" y="28" width="186" height="186" viewBox="60 20 280 280" preserveAspectRatio="xMidYMid slice"><g filter="url(#polF)">${svg}</g></svg><text x="203" y="250" text-anchor="middle" font-size="18" fill="#3a3a5a" font-family="'Segoe Print', 'Bradley Hand', cursive">verano ’98</text></g>`;
    }
  });
  add('cosmos', {
    nombre: 'Fondo espacial', motivo: 'retrato:astronauta',
    fondo(S) {
      const r = rng(7);
      return `<rect width="400" height="300" fill="${S.lg('cosF', ['#05070f', '#1a1440'])}"/>` + Array.from({ length: 80 }, () => `<circle cx="${r1(r() * 400)}" cy="${r1(r() * 300)}" r="${r1(0.5 + r() * 1.3)}" fill="#fff" opacity="${r1(0.4 + r() * 0.6)}"/>`).join('') + `<circle cx="340" cy="60" r="34" fill="#d9874a"/><circle cx="60" cy="240" r="60" fill="#2f6fa8"/>`;
    }
  });
  add('hud', {
    nombre: 'Interfaz HUD', motivo: 'ciudad',
    defs(S) { S.def('hudF', mapaDegradado('hudF', ['#02101a', '#0a3a4a', '#4a8a9a', '#c8f0f6'])); },
    filtro: 'hudF',
    despues: S => `<g fill="none" stroke="#5ae6ff" stroke-width="2"><circle cx="200" cy="150" r="46"/><circle cx="200" cy="150" r="4"/><path d="M200 90 V120 M200 180 V210 M140 150 H170 M230 150 H260"/><path d="M30 30 H110 M30 30 V70 M370 30 H290 M370 30 V70 M30 270 H110 M370 270 H290" stroke-width="3"/><rect x="260" y="200" width="110" height="56"/></g><text x="268" y="220" font-size="11" fill="#5ae6ff" font-family="'Courier New', monospace">ALT 1.240 m</text><text x="268" y="238" font-size="11" fill="#5ae6ff" font-family="'Courier New', monospace">VEL 86 km/h</text><text x="34" y="92" font-size="11" fill="#5ae6ff" font-family="'Courier New', monospace">OBJ ▸ 03</text>`
  });
  add('steampunk', {
    nombre: 'Steampunk', motivo: 'retrato:steampunk',
    paleta: { fondo: '#5a3a1e', fondo2: '#2a1a0e', piel: '#e6b48a', ropa: '#5a3a26', pelo: '#3a2416' },
    fondo(S) {
      let o = `<rect width="400" height="300" fill="${S.lg('stF', ['#6a4626', '#24150a'])}"/>`;
      [[50, 60, 50, 12], [340, 80, 60, 14], [360, 240, 40, 10], [40, 240, 34, 9], [110, 140, 26, 8]].forEach(([x, y, r, t]) => { o += `<polygon points="${U.gear(x, y, r, t)}" fill="#b8862e" opacity=".7"/><circle cx="${x}" cy="${y}" r="${r * 0.35}" fill="#3a2410"/>`; });
      return o + `<path d="M0 200 H120 Q140 200 140 180 V100" stroke="#8a5a2a" stroke-width="12" fill="none"/>`;
    },
    despues: S => capaGrano(S, 0.12)
  });

  /* ============================================================
     INTERFACES
     ============================================================ */
  add('oscuro', {
    nombre: 'Modo oscuro', motivo: 'dashboard',
    paleta: { uiFondo: '#0f1217', uiPanel: '#1a1f27', uiTexto: '#e6eaf0', uiSuave: '#323a46', uiAcento: '#7a8cff', uiAcento2: '#ffb454' }
  });
  add('cristal', {
    nombre: 'Interfaz de cristal', motivo: 'dashboard',
    paleta: { uiFondo: '#ffffff1a', uiPanel: '#ffffff40', uiTexto: '#ffffff', uiSuave: '#ffffff73', uiAcento: '#ffffff', uiAcento2: '#ffe08a' },
    antes: S => {
      S.def('crB', `<filter id="crB" ${FR}><feGaussianBlur stdDeviation="26"/></filter>`);
      return `<rect width="400" height="300" fill="#3a2a8a"/><g filter="url(#crB)"><circle cx="80" cy="60" r="110" fill="#ff6ad5"/><circle cx="340" cy="250" r="120" fill="#3ad6f0"/><circle cx="300" cy="40" r="70" fill="#ffd36e"/></g>`;
    }
  });
})();
