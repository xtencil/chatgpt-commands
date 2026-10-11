/*!
 * Prompt Atlas · Motivos (qué aparece en la miniatura)
 * Cada motivo es una función que recibe el estilo S y devuelve SVG.
 *   S.f(color)      → relleno de forma (respeta la técnica: plano, línea, neón…)
 *   S.k(color, w)   → trazo de detalle
 *   S.fondo(a, b)   → fondo a sangre
 * Los colores pueden ser roles de la paleta ('piel', 'cielo'…) o #hex.
 * `escena: true` = el motivo dibuja su propio fondo.
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const { pts, star, gear, shade, mix, arc, r1 } = M.util;
  const add = M.motivo;

  /* ============================================================
     PERSONAS
     ============================================================ */
  function cabeza(S, v, op) {
    const ojosTipo = op.ojos || (v === 'estatua' ? 'vacio' : 'normal');
    const c = S.c;
    let o = '';
    // pelo trasero
    if (!['astronauta', 'ninja', 'androide', 'samurai', 'caballero'].includes(v))
      o += `<path d="M144 120 C138 62 170 40 202 40 C236 40 264 64 258 120 L262 186 C246 194 232 188 228 178 L172 178 C168 188 154 194 140 186 Z" ${S.f(v === 'elfo' ? '#e7cf8a' : 'pelo')}/>`;
    // orejas
    if (v === 'elfo') {
      o += `<path d="M157 120 L118 84 L152 138 Z" ${S.f('piel')}/><path d="M243 120 L282 84 L248 138 Z" ${S.f('piel')}/>`;
    } else if (!['astronauta', 'ninja'].includes(v)) {
      o += `<ellipse cx="154" cy="126" rx="8" ry="13" ${S.f('piel')}/><ellipse cx="246" cy="126" rx="8" ry="13" ${S.f('piel')}/>`;
    }
    // cara
    const piel = v === 'androide' ? '#e9e4de' : 'piel';
    o += `<path d="M155 112 C155 74 176 58 200 58 C224 58 245 74 245 112 C245 150 226 178 200 178 C174 178 155 150 155 112 Z" ${S.f(piel)}/>`;
    if (S.modo === 'fill' || S.modo === 'wash') o += `<path d="M232 84 C244 104 244 140 226 164 C214 176 204 178 200 178 C222 166 236 132 232 84 Z" fill="${S.col('pielS')}" opacity=".35"/>`;
    // mejillas
    if (op.mejillas || ojosTipo === 'anime' || ojosTipo === 'grande') o += `<ellipse cx="176" cy="146" rx="9" ry="5" fill="${S.col('labio')}" opacity=".28"/><ellipse cx="224" cy="146" rx="9" ry="5" fill="${S.col('labio')}" opacity=".28"/>`;
    // flequillo
    if (v === 'estatua') {
      o += [[166, 72], [182, 62], [200, 58], [218, 62], [234, 72], [158, 90], [242, 90]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" ${S.f('pelo')}/>`).join('');
    } else if (ojosTipo === 'anime') {
      o += `<path d="M148 120 C142 62 176 42 206 44 C240 46 262 74 254 120 L242 92 L232 112 L222 84 L208 108 L196 80 L182 106 L172 84 L162 112 Z" ${S.f('pelo')}/>`;
    } else if (!['astronauta', 'ninja', 'androide', 'samurai', 'mago', 'vikingo'].includes(v)) {
      o += `<path d="M150 118 C146 66 176 46 204 46 C238 46 258 70 252 114 C238 102 226 86 218 74 C204 94 178 106 150 118 Z" ${S.f(v === 'elfo' ? '#e7cf8a' : 'pelo')}/>`;
    } else if (v === 'androide') {
      o += `<path d="M160 96 C168 64 232 64 240 96" ${S.k('#b9b3ad', 2)}/><path d="M200 60 V100" ${S.k('#b9b3ad', 1.6)}/>`;
    }
    // cejas
    const ceja = v === 'mago' ? '#eeeeee' : 'pelo';
    if (ojosTipo !== 'vacio') {
      if (op.ceja === 'picara') o += `<path d="M170 102 Q181 96 192 104" ${S.k(ceja, 4)}/><path d="M208 96 Q220 86 232 94" ${S.k(ceja, 4)}/>`;
      else if (ojosTipo === 'anime') o += `<path d="M172 98 Q182 94 192 98" ${S.k(ceja, 2.4)}/><path d="M208 98 Q218 94 228 98" ${S.k(ceja, 2.4)}/>`;
      else o += `<path d="M172 106 Q182 100 192 105" ${S.k(ceja, 3.4)}/><path d="M208 105 Q218 100 228 106" ${S.k(ceja, 3.4)}/>`;
    }
    // ojos
    if (ojosTipo === 'anime') {
      o += [182, 218].map(x => `<ellipse cx="${x}" cy="122" rx="10" ry="13" ${S.f('blanco')}/><ellipse cx="${x}" cy="124" rx="8" ry="11" ${S.f(op.iris || '#3d7fb8')}/><ellipse cx="${x}" cy="125" rx="4.5" ry="6.5" ${S.f('ojo')}/><circle cx="${x - 3}" cy="118" r="3" fill="#fff"/><path d="M${x - 11} 112 Q${x} 105 ${x + 11} 112" ${S.k('ojo', 3)}/>`).join('');
    } else if (ojosTipo === 'grande') {
      o += [181, 219].map(x => `<ellipse cx="${x}" cy="122" rx="12" ry="13" ${S.f('blanco')}/><circle cx="${x + 1}" cy="124" r="8" ${S.f(op.iris || '#6b4a2f')}/><circle cx="${x + 1}" cy="124" r="4.2" ${S.f('ojo')}/><circle cx="${x - 2}" cy="120" r="2.6" fill="#fff"/>`).join('');
    } else if (ojosTipo === 'punto') {
      o += `<circle cx="180" cy="124" r="9" ${S.f('ojo')}/><circle cx="220" cy="124" r="9" ${S.f('ojo')}/>`;
    } else if (ojosTipo === 'cerrados') {
      o += `<path d="M175 122 Q183 128 191 122 M209 122 Q217 128 225 122" ${S.k('ojo', 2.6)}/>`;
    } else if (ojosTipo === 'vacio') {
      o += `<path d="M174 120 Q183 114 192 120 M208 120 Q217 114 226 120" ${S.k('pielS', 2.4)}/>`;
    } else {
      o += `<ellipse cx="183" cy="121" rx="4.6" ry="5.6" ${S.f('ojo')}/><ellipse cx="217" cy="121" rx="4.6" ry="5.6" ${S.f('ojo')}/>`;
      if (S.modo === 'fill') o += `<circle cx="184.6" cy="119" r="1.4" fill="#fff"/><circle cx="218.6" cy="119" r="1.4" fill="#fff"/>`;
    }
    // nariz y boca
    if (ojosTipo !== 'punto') {
      o += `<path d="M200 126 Q195 141 203 144" ${S.k('pielS', 2.4)}/>`;
      if (op.ceja === 'picara') o += `<path d="M186 158 Q204 166 218 152" ${S.k('labio', 3.2)}/>`;
      else if (ojosTipo === 'anime') o += `<path d="M194 158 Q200 162 206 158" ${S.k('labio', 2.4)}/>`;
      else o += `<path d="M188 157 Q200 165 212 157" ${S.k('labio', 3)}/>`;
    }
    return o;
  }

  function accesorios(S, v) {
    switch (v) {
      case 'mago': return `<path d="M168 166 C164 214 186 244 200 262 C214 244 236 214 232 166 C220 176 180 176 168 166 Z" ${S.f('#eeeeee')}/><path d="M186 158 Q200 152 214 158" ${S.k('#d6d6d6', 3)}/>` +
        `<path d="M132 92 C168 82 236 82 268 92 C246 70 230 58 222 30 C214 8 196 -6 176 6 C196 12 196 34 190 58 C184 72 160 84 132 92 Z" ${S.f('#2e3a78')}/><path d="M152 88 C180 80 222 80 250 88" ${S.k('#f2c14e', 5)}/>` +
        `<polygon points="${star(206, 48, 7, 3, 5)}" ${S.f('#f2c14e')}/><polygon points="${star(186, 68, 4, 2, 5)}" ${S.f('#f2c14e')}/>`;
      case 'samurai': return `<path d="M140 120 C136 58 170 34 200 34 C230 34 264 58 260 120 L278 132 L250 134 L246 104 C230 96 170 96 154 104 L150 134 L122 132 Z" ${S.f('#2b2622')}/><path d="M150 104 C176 94 224 94 250 104" ${S.k('#b8402f', 5)}/>` +
        `<path d="M200 40 C184 18 160 12 146 18 C166 22 180 34 194 52 Z M200 40 C216 18 240 12 254 18 C234 22 220 34 206 52 Z" ${S.f('#d9a640')}/><circle cx="200" cy="52" r="7" ${S.f('#d9a640')}/>`;
      case 'ninja': return `<path d="M146 118 C140 58 172 38 200 38 C228 38 260 58 254 118 C256 150 240 182 200 184 C160 182 144 150 146 118 Z" ${S.f('#23262d')}/><path d="M162 108 C176 104 224 104 238 108 L236 132 C222 136 178 136 164 132 Z" ${S.f('piel')}/>` +
        `<path d="M176 120 L192 116 M208 116 L224 120" ${S.k('ojo', 3)}/><ellipse cx="185" cy="122" rx="4" ry="3.5" ${S.f('ojo')}/><ellipse cx="215" cy="122" rx="4" ry="3.5" ${S.f('ojo')}/><path d="M246 110 C268 112 280 126 286 142" ${S.k('#b8402f', 5)}/>`;
      case 'vikingo': return `<path d="M160 140 C150 186 170 226 200 236 C230 226 250 186 240 140 C226 160 214 158 200 156 C186 158 174 160 160 140 Z" ${S.f('#b9692e')}/><path d="M184 154 Q200 146 216 154" ${S.k('#9a5320', 4)}/>` +
        `<path d="M148 102 C150 52 250 52 252 102 Z" ${S.f('#8d959b')}/><path d="M146 100 H254" ${S.k('#5d656b', 7)}/><path d="M200 54 V100" ${S.k('#5d656b', 6)}/>` +
        `<path d="M150 86 C128 80 116 62 118 40 C130 56 140 62 156 66 Z M250 86 C272 80 284 62 282 40 C270 56 260 62 244 66 Z" ${S.f('#efe6cf')}/>`;
      case 'astronauta': return `<circle cx="200" cy="120" r="78" ${S.f('#f2f2f0')}/><path d="M138 112 C138 72 166 58 200 58 C234 58 262 72 262 112 C262 146 240 162 200 162 C160 162 138 146 138 112 Z" ${S.f('#1e2b4a')}/>` +
        `<path d="M150 104 C154 80 172 70 192 68" ${S.k('#ffffff', 5, ' opacity=".7"')}/><path d="M236 140 Q246 132 250 120" ${S.k('#7fd1ff', 3, ' opacity=".7"')}/><rect x="186" y="198" width="28" height="18" rx="3" ${S.f('#e07a4f')}/>`;
      case 'cyborg': return `<path d="M200 58 C224 58 245 74 245 112 C245 150 226 178 200 178 Z" ${S.f('#8e9aa3')}/><path d="M200 58 V178 M200 100 H240 M200 140 H236" ${S.k('#5c6870', 2)}/>` +
        `<circle cx="217" cy="121" r="9" ${S.f('#2a3138')}/><circle cx="217" cy="121" r="5" fill="#ff4d4d"/>${S.halo(217, 121, 22, '#ff4d4d', 0.6)}<circle cx="230" cy="86" r="3" ${S.f('#ffcf5c')}/><circle cx="236" cy="156" r="3" ${S.f('#ffcf5c')}/>`;
      case 'androide': return `<path d="M168 150 Q176 160 176 172 M232 150 Q224 160 224 172 M200 146 V150" ${S.k('#bdb6af', 1.6)}/><circle cx="244" cy="112" r="6" fill="#53d5ff"/>${S.halo(244, 112, 18, '#53d5ff', 0.7)}`;
      case 'vr': return `<rect x="150" y="100" width="100" height="44" rx="16" ${S.f('#2a2f3a')}/><rect x="158" y="108" width="84" height="28" rx="11" ${S.f('#5ad0ff')}/><path d="M146 116 H136 M254 116 H264" ${S.k('#2a2f3a', 8)}/>`;
      case 'detective': return `<path d="M120 90 C150 80 250 80 280 90 C270 100 130 100 120 90 Z" ${S.f('#2a2826')}/><path d="M150 88 C150 48 172 34 200 34 C228 34 250 48 250 88 Z" ${S.f('#3a3632')}/><path d="M150 80 H250" ${S.k('#1c1a18', 7)}/>` +
        `<path d="M104 300 L150 214 L200 258 L250 214 L296 300 Z" ${S.f('#5a4d3f')}/>`;
      case 'steampunk': return `<path d="M120 92 C150 84 250 84 280 92 C270 102 130 102 120 92 Z" ${S.f('#3a2a20')}/><rect x="152" y="30" width="96" height="62" rx="6" ${S.f('#4a3426')}/><rect x="152" y="70" width="96" height="10" ${S.f('#b8862e')}/>` +
        `<circle cx="183" cy="76" r="15" ${S.f('#b8862e')}/><circle cx="217" cy="76" r="15" ${S.f('#b8862e')}/><circle cx="183" cy="76" r="9" ${S.f('#7fd0c4')}/><circle cx="217" cy="76" r="9" ${S.f('#7fd0c4')}/><path d="M198 76 H202" ${S.k('#b8862e', 4)}/>`;
      case 'caballero': return `<path d="M146 120 C140 56 172 36 200 36 C228 36 260 56 254 120 L254 168 C240 182 220 186 200 186 C180 186 160 182 146 168 Z" ${S.f('#a9b1b8')}/><path d="M150 112 H250 V124 H150 Z" ${S.f('#2a2e34')}/><path d="M200 40 V186" ${S.k('#7a838b', 4)}/>` +
        Array.from({ length: 6 }, (_, i) => `<circle cx="${172 + (i % 3) * 8}" cy="${142 + Math.floor(i / 3) * 10}" r="2" ${S.f('#2a2e34')}/><circle cx="${212 + (i % 3) * 8}" cy="${142 + Math.floor(i / 3) * 10}" r="2" ${S.f('#2a2e34')}/>`).join('') + `<path d="M200 36 C190 10 214 0 226 16 C214 14 206 24 204 36" ${S.f('#c0392b')}/>`;
      case 'elfo': return `<path d="M152 84 C176 72 224 72 248 84" ${S.k('#5f9a5c', 4)}/>` + [168, 186, 214, 232].map((x, i) => `<ellipse cx="${x}" cy="${79 - (i % 3)}" rx="6" ry="3.5" transform="rotate(${i % 2 ? 30 : -30} ${x} 79)" ${S.f('#77b36a')}/>`).join('');
      default: return '';
    }
  }

  function cuerpo(S, v) {
    const ropa = { caballero: '#8a949c', steampunk: '#5a3a26', mago: '#3a3f8f', samurai: '#7a2b25', ninja: '#23262d', vikingo: '#6b4b33', astronauta: '#ecebe6', cyborg: '#3d4750', androide: '#d9dde2', elfo: '#4f7d4a' }[v] || 'ropa';
    let o = `<path d="M86 300 C90 244 138 218 200 216 C262 218 310 244 314 300 Z" ${S.f(ropa)}/>`;
    if (v === 'samurai') o += `<path d="M96 268 C100 238 132 222 164 220 L170 262 Z M304 268 C300 238 268 222 236 220 L230 262 Z" ${S.f('#2b2622')}/>` + [236, 248, 260].map(y => `<path d="M104 ${y} L166 ${y - 6} M296 ${y} L234 ${y - 6}" ${S.k('#d9a640', 2)}/>`).join('');
    if (v === 'astronauta') o += `<rect x="128" y="244" width="40" height="26" rx="4" ${S.f('#2f5d7c')}/><circle cx="262" cy="252" r="11" ${S.f('#e05a4a')}/>`;
    if (v !== 'astronauta') o += `<path d="M178 166 L178 220 Q200 236 222 220 L222 166 Z" ${S.f(v === 'androide' ? '#d9d3cc' : 'pielS')}/>`;
    if (v === 'androide') o += `<path d="M184 196 H216 M184 206 H216" ${S.k('#a9a39c', 1.5)}/>`;
    if (!['astronauta', 'vikingo', 'mago', 'detective'].includes(v)) o += `<path d="M168 222 Q200 244 232 222" ${S.k(v === 'samurai' ? '#2b2622' : 'ropaS', 5)}/>`;
    return o;
  }

  add('retrato', {
    nombre: 'Retrato', grupo: 'Personas',
    variantes: { caballero: 'Caballero', steampunk: 'Steampunk', mago: 'Mago', elfo: 'Elfo', samurai: 'Samurái', ninja: 'Ninja', vikingo: 'Vikingo', astronauta: 'Astronauta', cyborg: 'Cíborg', androide: 'Androide', vr: 'Con visor VR', detective: 'Detective', estatua: 'Estatua' },
    dibujo(S, v, op) {
      if (op.chibi) {
        return `<g transform="translate(200 300) scale(.78) translate(-200 -300)">${cuerpo(S, v)}</g>` +
          `<g transform="translate(200 128) scale(1.32) translate(-200 -128)">${cabeza(S, v, op)}${accesorios(S, v)}</g>`;
      }
      return cuerpo(S, v) + cabeza(S, v, op) + accesorios(S, v);
    }
  });

  add('busto', {
    nombre: 'Busto escultórico', grupo: 'Personas',
    dibujo(S) {
      const g = S.lg('bustoG', ['#f2efe9', '#d8d3ca', '#a7a097'], 0, 0, 1, 0);
      const pS = Object.assign({}, S);
      let o = S.sombra(200, 292, 120, 8, 0.2);
      o += `<rect x="140" y="248" width="120" height="46" rx="4" ${S.f('#cfc9bf')}/><rect x="128" y="240" width="144" height="14" rx="3" ${S.f('#e2ddd4')}/>`;
      o += `<path d="M118 240 C120 206 152 190 200 188 C248 190 280 206 282 240 Z" ${S.f(g)}/>`;
      o += `<path d="M178 156 L178 196 Q200 208 222 196 L222 156 Z" ${S.f('#b9b2a8')}/>`;
      o += `<path d="M144 116 C138 62 170 40 202 40 C236 40 264 64 258 116 L250 150 L150 150 Z" ${S.f('#b8b1a7')}/>`;
      o += `<ellipse cx="154" cy="122" rx="8" ry="13" ${S.f('#d7d1c8')}/><ellipse cx="246" cy="122" rx="8" ry="13" ${S.f('#c4beb4')}/>`;
      o += `<path d="M155 110 C155 72 176 56 200 56 C224 56 245 72 245 110 C245 148 226 172 200 172 C174 172 155 148 155 110 Z" ${S.f(g)}/>`;
      o += [[166, 70], [182, 60], [200, 56], [218, 60], [234, 70], [157, 88], [243, 88], [174, 76], [226, 76]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${12 - (i > 6 ? 3 : 0)}" ${S.f(i % 2 ? '#c9c3b9' : '#e3dfd8')}/>`).join('');
      o += `<path d="M172 108 Q182 102 192 108 M208 108 Q218 102 228 108" ${S.k('#9d968c', 2.4)}/><path d="M176 120 Q183 116 190 120 M210 120 Q217 116 224 120" ${S.k('#8f887e', 2)}/>`;
      o += `<path d="M200 122 Q194 140 204 142" ${S.k('#9d968c', 2.4)}/><path d="M190 154 Q200 158 210 154" ${S.k('#9d968c', 2.4)}/>`;
      void pS;
      return o;
    }
  });

  add('silueta', {
    nombre: 'Silueta de persona', grupo: 'Personas',
    dibujo(S) {
      const k = S.f('#16181d');
      return `<path d="M86 300 C90 244 138 218 200 216 C262 218 310 244 314 300 Z" ${k}/><rect x="178" y="160" width="44" height="64" ${k}/><path d="M144 120 C138 62 170 40 202 40 C236 40 264 64 258 120 L254 150 C246 172 226 182 200 182 C174 182 154 172 146 150 Z" ${k}/>`;
    }
  });

  /* ============================================================
     PAISAJES Y LUGARES ABIERTOS
     ============================================================ */
  function nube(S, x, y, s = 1, col = 'nube', op = 0.95) {
    return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><path d="M-40 10 C-46 -6 -28 -16 -16 -8 C-12 -24 12 -26 18 -10 C30 -16 46 -6 40 10 Z" ${S.f(col)}/></g>`;
  }
  function arbol(S, x, y, s = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-6" width="8" height="40" ${S.f('tronco')}/><circle cx="0" cy="-16" r="24" ${S.f('hoja')}/><circle cx="-14" cy="-2" r="15" ${S.f('hojaS')}/><circle cx="14" cy="-2" r="15" ${S.f('hoja')}/></g>`;
  }
  function pino(S, x, y, s = 1, col = 'cerca') {
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-3" y="0" width="6" height="12" ${S.f('tronco')}/><polygon points="0,-46 -18,-14 -10,-14 -22,4 22,4 10,-14 18,-14" ${S.f(col)}/></g>`;
  }
  function casa(S, x, y, s = 1, luz = false) {
    return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-22" y="0" width="44" height="32" ${S.f('muro')}/><rect x="6" y="0" width="16" height="32" ${S.f('muroS')}/><rect x="10" y="-26" width="7" height="16" ${S.f('tejado')}/><polygon points="-28,2 0,-24 28,2" ${S.f('tejado')}/>` +
      `<rect x="-14" y="12" width="10" height="20" ${S.f('oscuro')}/><rect x="4" y="8" width="10" height="10" ${S.f(luz ? 'luz' : 'ventana')}/></g>` + (luz ? S.halo(x + 9 * s, y + 13 * s, 26 * s, S.col('luz'), 0.5) : '');
  }

  add('paisaje', {
    nombre: 'Paisaje', grupo: 'Lugares', escena: true,
    dibujo(S, v, op) {
      const sy = op.solY == null ? 82 : op.solY, sx = op.solX == null ? 292 : op.solX;
      let o = S.fondo('cielo', 'cielo2', 'cieloP');
      if (op.estrellas) o += Array.from({ length: 40 }, () => `<circle cx="${r1(S.r() * 400)}" cy="${r1(S.r() * 150)}" r="${r1(0.6 + S.r() * 1.2)}" fill="#fff" opacity="${r1(0.4 + S.r() * 0.6)}"/>`).join('');
      if (!op.sinSol) {
        o += S.halo(sx, sy, op.luna ? 70 : 90, S.col('sol'), op.luna ? 0.35 : 0.5);
        o += `<circle cx="${sx}" cy="${sy}" r="${op.solR || 26}" ${S.f('sol')}/>`;
        if (op.luna) o += `<circle cx="${sx - 9}" cy="${sy - 5}" r="5" fill="#000" opacity=".06"/><circle cx="${sx + 7}" cy="${sy + 8}" r="3.5" fill="#000" opacity=".06"/>`;
      }
      if (op.nubesGrandes) o += nube(S, 90, 96, 2.6) + nube(S, 250, 70, 2.1) + nube(S, 360, 110, 1.6);
      else if (!op.sinNubes) o += nube(S, 96, 70, 1.1) + nube(S, 214, 46, 0.8, 'nube', 0.8);
      o += `<path d="M0 178 L52 128 L92 156 L150 92 L208 150 L262 112 L318 156 L362 122 L400 146 V300 H0Z" ${S.f('lejos')}/>`;
      o += `<path d="M150 92 L133 112 L143 108 L151 116 L160 106 L169 112 Z M262 112 L250 125 L258 122 L264 128 L272 122 L276 125 Z" ${S.f(op.nieve ? '#ffffff' : 'nube')} opacity="${op.nieve ? 1 : 0.85}"/>`;
      o += `<path d="M0 206 C60 176 120 190 170 202 C230 178 300 176 400 198 V300 H0Z" ${S.f('medio')}/>`;
      o += `<path d="M138 240 C178 226 300 224 356 236 C326 252 186 254 138 240Z" ${S.f('agua')}/>`;
      if (S.modo === 'fill') o += `<path d="M180 238 H230 M250 242 H310 M200 246 H260" stroke="#fff" stroke-width="2" opacity=".4" stroke-linecap="round"/>`;
      o += casa(S, 268, 186, 1, op.ventanas);
      o += arbol(S, 106, 206, 1.05) + pino(S, 330, 228, 0.9) + pino(S, 352, 236, 0.7);
      o += `<path d="M0 252 C80 234 150 248 210 254 C280 260 340 240 400 246 V300 H0Z" ${S.f('cerca')}/>`;
      o += `<path d="M30 268 l4 -10 l4 10 M60 280 l4 -10 l4 10 M300 274 l4 -10 l4 10 M350 284 l4 -10 l4 10" ${S.k('medio', 2)}/>`;
      return o;
    }
  });

  function edificios(S, op) {
    const rand = M.util.rng(42);
    let o = '';
    const capas = [
      { y: 150, h: [40, 110], w: [26, 46], col: 'lejos', win: false },
      { y: 210, h: [60, 150], w: [34, 60], col: op.noche ? '#1c2233' : '#4f6575', win: true }
    ];
    for (const L of capas) {
      let x = -10;
      while (x < 410) {
        const w = L.w[0] + rand() * (L.w[1] - L.w[0]), h = L.h[0] + rand() * (L.h[1] - L.h[0]);
        const top = L.y + 70 - h;
        o += `<rect x="${r1(x)}" y="${r1(top)}" width="${r1(w)}" height="${r1(300 - top)}" ${S.f(L.col)}/>`;
        if (rand() > 0.7) o += `<rect x="${r1(x + w / 2 - 2)}" y="${r1(top - 14)}" width="4" height="14" ${S.f(L.col)}/>`;
        if (L.win) {
          for (let wy = top + 10; wy < 270; wy += 14) for (let wx = x + 6; wx < x + w - 8; wx += 11) {
            const lit = op.noche ? rand() > 0.45 : rand() > 0.85;
            o += `<rect x="${r1(wx)}" y="${r1(wy)}" width="6" height="7" ${S.f(lit ? (op.noche ? 'luz' : '#cfe3ee') : (op.noche ? '#283049' : '#3d5261'))}/>`;
          }
        }
        x += w + 3;
      }
    }
    return o;
  }
  add('ciudad', {
    nombre: 'Ciudad', grupo: 'Lugares', escena: true,
    variantes: { noche: 'De noche' },
    dibujo(S, v, op) {
      const noche = v === 'noche' || op.noche;
      let o = S.fondo(noche ? '#141a33' : 'cielo', noche ? '#3a2f5c' : 'cielo2', noche ? 'cieloN' : 'cieloC');
      if (noche) o += S.halo(320, 70, 60, '#f3efe0', 0.35) + `<circle cx="320" cy="70" r="18" ${S.f('#f3efe0')}/>`;
      else o += `<circle cx="320" cy="70" r="24" ${S.f('sol')}/>` + nube(S, 120, 60, 1);
      o += edificios(S, { noche });
      o += `<rect x="0" y="270" width="400" height="30" ${S.f(noche ? '#10131f' : '#3b4650')}/><path d="M0 285 H400" ${S.k(noche ? '#ffd77a' : '#e8e2d0', 2.4, ' stroke-dasharray="16 12"')}/>`;
      return o;
    }
  });

  /* ============================================================
     OBJETOS
     ============================================================ */
  add('jarron', {
    nombre: 'Jarrón', grupo: 'Objetos',
    dibujo(S) {
      const g = S.lg('jarG', [['#f4d2bd', 0], ['#e08a62', 0.35], ['#b5583a', 0.8], ['#7d3a26', 1]], 0, 0, 1, 0);
      let o = S.sombra(205, 268, 110, 12, 0.22);
      o += `<path d="M168 48 L232 48 L228 74 C276 98 296 146 286 196 C278 238 250 268 200 270 C150 268 122 238 114 196 C104 146 124 98 172 74 Z" ${S.f(g)}/>`;
      o += `<ellipse cx="200" cy="48" rx="34" ry="8" ${S.f('#8f442c')}/><ellipse cx="200" cy="48" rx="25" ry="5" ${S.f('#4a2216')}/>`;
      o += `<path d="M126 150 C170 166 232 166 276 150" ${S.k('#f6e2c4', 5)}/><path d="M118 186 C170 204 232 204 284 186" ${S.k('#f6e2c4', 3)}/>`;
      if (S.modo === 'fill') o += `<path d="M150 104 C134 130 130 170 142 206" stroke="#fff" stroke-width="9" stroke-linecap="round" fill="none" opacity=".35"/>`;
      return o;
    }
  });

  add('esfera', {
    nombre: 'Esfera', grupo: 'Objetos',
    dibujo(S) {
      const g = S.rg('esfG', [['#ffffff', 0], ['#c8ccd0', 0.35], ['#7c848b', 0.75], ['#2e3338', 1]], 0.36, 0.32, 0.72);
      return S.sombra(206, 262, 104, 14, 0.25) + `<circle cx="200" cy="160" r="98" ${S.f(g)}/>`;
    }
  });

  add('perfume', {
    nombre: 'Frasco de producto', grupo: 'Objetos',
    dibujo(S) {
      const vidrio = S.lg('perG', [['#f6e7d5', 0], ['#e9c6a0', 0.3], ['#c98d5a', 0.75], ['#9a6136', 1]], 0, 0, 1, 0);
      let o = S.sombra(200, 262, 90, 10, 0.25);
      o += `<rect x="180" y="62" width="40" height="40" rx="4" ${S.f('#2d2a28')}/><rect x="186" y="96" width="28" height="18" ${S.f('#c9a14a')}/>`;
      o += `<path d="M134 128 Q134 112 152 112 H248 Q266 112 266 128 V246 Q266 262 248 262 H152 Q134 262 134 246 Z" ${S.f(vidrio)}/>`;
      o += `<rect x="160" y="166" width="80" height="48" rx="2" ${S.f('#f7f2ea')}/><path d="M176 184 H224 M184 196 H216" ${S.k('#2d2a28', 2.4)}/>`;
      if (S.modo === 'fill') o += `<rect x="146" y="124" width="10" height="122" rx="5" fill="#fff" opacity=".45"/>`;
      return o;
    }
  });

  function flor(S, cx, cy, s, girasol) {
    let o = `<g transform="translate(${cx} ${cy}) scale(${s})">`;
    const n = girasol ? 16 : 6;
    for (let i = 0; i < n; i++) {
      const a = i * 360 / n;
      o += girasol
        ? `<ellipse cx="0" cy="-40" rx="9" ry="26" transform="rotate(${a})" ${S.f(i % 2 ? '#f2b631' : '#f7c948')}/>`
        : `<ellipse cx="0" cy="-34" rx="20" ry="32" transform="rotate(${a})" ${S.f(i % 2 ? '#e2574c' : '#ec6a5b')}/>`;
    }
    o += `<circle r="${girasol ? 26 : 18}" ${S.f(girasol ? '#6b4423' : '#3b2430')}/>`;
    if (!girasol) o += `<circle r="8" ${S.f('#f2c14e')}/>`;
    else o += Array.from({ length: 12 }, (_, i) => `<circle cx="${r1(Math.cos(i) * 14)}" cy="${r1(Math.sin(i) * 14)}" r="2.5" ${S.f('#4a2e17')}/>`).join('');
    return o + '</g>';
  }
  add('flor', {
    nombre: 'Flor', grupo: 'Naturaleza',
    variantes: { girasol: 'Girasol' },
    dibujo(S, v) {
      let o = `<path d="M200 300 C198 240 204 190 200 140" ${S.k('hojaS', 8)}/>`;
      o += `<path d="M200 236 C168 228 146 204 140 178 C170 182 192 202 200 236 Z" ${S.f('hoja')}/><path d="M202 214 C232 206 252 182 256 156 C226 162 208 182 202 214 Z" ${S.f('hojaS')}/>`;
      return o + flor(S, 200, 118, 1, v === 'girasol');
    }
  });
})();
