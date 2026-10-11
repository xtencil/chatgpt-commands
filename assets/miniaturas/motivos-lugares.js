/*!
 * Prompt Atlas · Motivos de arquitectura, fantasía e interiores
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const { pts, star, r1, rng, shade } = M.util;
  const add = M.motivo;
  const cielo = (S, a, b, id) => S.fondo(a, b, id);
  const estrellas = (S, n, maxY, seed) => {
    const r = rng(seed);
    return Array.from({ length: n }, () => `<circle cx="${r1(r() * 400)}" cy="${r1(r() * maxY)}" r="${r1(0.5 + r() * 1.2)}" fill="#fff" opacity="${r1(0.4 + r() * 0.6)}"/>`).join('');
  };

  /* ============================================================
     EDIFICIOS
     ============================================================ */
  add('casa', {
    nombre: 'Casa (alzado)', grupo: 'Arquitectura',
    dibujo(S) {
      let o = S.sombra(200, 262, 150, 8);
      o += `<rect x="236" y="56" width="26" height="50" ${S.f('#8a4a3a')}/>`;
      o += `<polygon points="80,132 200,52 320,132" ${S.f('tejado')}/>`;
      o += `<rect x="96" y="128" width="208" height="132" ${S.f('muro')}/><rect x="250" y="128" width="54" height="132" ${S.f('muroS')}/>`;
      o += `<rect x="178" y="184" width="44" height="76" ${S.f('#6a4a34')}/><circle cx="214" cy="224" r="3" ${S.f('acento2')}/>`;
      o += [[118, 152], [244, 152]].map(([x, y]) => `<rect x="${x}" y="${y}" width="38" height="38" ${S.f('ventana')}/><path d="M${x + 19} ${y} V${y + 38} M${x} ${y + 19} H${x + 38}" ${S.k('#f6efe2', 3)}/>`).join('');
      o += `<circle cx="200" cy="104" r="12" ${S.f('ventana')}/><rect x="84" y="258" width="232" height="6" ${S.f('#8c867c')}/>`;
      return o;
    }
  });

  add('castillo', {
    nombre: 'Castillo', grupo: 'Fantasía', escena: true,
    variantes: { cuento: 'De cuento' },
    dibujo(S, v) {
      const cuento = v === 'cuento';
      let o = cielo(S, cuento ? '#c9b8f2' : 'cielo', cuento ? '#ffe2ef' : 'cielo2', cuento ? 'caCu' : 'caC');
      if (cuento) {
        const arco = ['#ff9ec7', '#ffd36e', '#8fe3c8', '#9ec5ff'];
        o += arco.map((c, i) => `<path d="M${30 + i * 10} 230 A${170 - i * 10} ${150 - i * 10} 0 0 1 ${370 - i * 10} 230" ${S.k(c, 10, ' opacity=".8"')}/>`).join('');
      } else o += `<circle cx="320" cy="60" r="20" ${S.f('sol')}/>`;
      const m = cuento ? '#f6e9f2' : '#b8b0a4', mS = cuento ? '#e4cfe0' : '#958d81', t = cuento ? '#8a6ad0' : '#5a6a8a';
      const torre = (x, w, top, conic) => `<rect x="${x}" y="${top}" width="${w}" height="${250 - top}" ${S.f(m)}/>` +
        (conic ? `<polygon points="${x - 6},${top} ${x + w / 2},${top - 50} ${x + w + 6},${top}" ${S.f(t)}/><path d="M${x + w / 2} ${top - 50} V${top - 66}" ${S.k('#5a4a3a', 2)}/><path d="M${x + w / 2} ${top - 66} l14 5 l-14 5" ${S.f(cuento ? '#ff8ab0' : '#c0392b')}/>`
          : Array.from({ length: Math.floor(w / 12) }, (_, i) => `<rect x="${x + i * 12}" y="${top - 10}" width="7" height="10" ${S.f(m)}/>`).join('')) +
        `<rect x="${x + w / 2 - 5}" y="${top + 20}" width="10" height="16" rx="5" ${S.f('#3a3a4a')}/>`;
      o += `<path d="M0 250 C100 220 300 220 400 250 V300 H0Z" ${S.f(cuento ? '#9fd6a0' : 'medio')}/>`;
      o += torre(96, 44, 110, true) + torre(260, 44, 110, true) + torre(170, 60, 70, true);
      o += `<rect x="120" y="150" width="160" height="100" ${S.f(m)}/>` + Array.from({ length: 13 }, (_, i) => `<rect x="${120 + i * 12.4}" y="140" width="7" height="10" ${S.f(m)}/>`).join('');
      o += `<rect x="240" y="150" width="40" height="100" ${S.f(mS)}/><path d="M180 250 V210 Q200 186 220 210 V250 Z" ${S.f('#4a3a2e')}/>`;
      o += `<path d="M0 270 C120 256 280 256 400 270 V300 H0Z" ${S.f(cuento ? '#7fc48a' : 'cerca')}/>`;
      return o;
    }
  });

  add('catedral', {
    nombre: 'Catedral gótica', grupo: 'Fantasía', escena: true,
    dibujo(S) {
      let o = cielo(S, '#1b1830', '#4a3a5e', 'gotC') + estrellas(S, 30, 120, 6);
      o += `<circle cx="70" cy="60" r="22" ${S.f('#ece6d6')}/>`;
      const p = '#2a2636', pL = '#3a3448';
      o += `<polygon points="100,300 100,110 130,40 160,110 160,300" ${S.f(p)}/><polygon points="240,300 240,110 270,40 300,110 300,300" ${S.f(p)}/>`;
      o += `<rect x="150" y="130" width="100" height="170" ${S.f(pL)}/><polygon points="150,130 200,70 250,130" ${S.f(pL)}/>`;
      o += `<circle cx="200" cy="140" r="28" ${S.f('#c9a34a')}/><circle cx="200" cy="140" r="28" ${S.k('#1b1830', 3)}/>` + Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M200 140 L${r1(200 + Math.cos(a) * 28)} ${r1(140 + Math.sin(a) * 28)}" ${S.k('#1b1830', 2.5)}/>`; }).join('');
      o += `<path d="M180 300 V230 Q200 196 220 230 V300 Z" ${S.f('#15121e')}/>`;
      o += [[116, 150], [256, 150], [116, 210], [256, 210]].map(([x, y]) => `<path d="M${x} ${y + 34} V${y + 8} Q${x + 14} ${y - 10} ${x + 28} ${y + 8} V${y + 34} Z" ${S.f('#c9a34a')}/>`).join('');
      o += `<path d="M30 100 l8 -6 l8 6 l-8 -2 Z M330 70 l10 -7 l10 7 l-10 -2 Z" ${S.f('#0d0b14')}/>`;
      return o;
    }
  });

  add('fantasia', {
    nombre: 'Mundo de fantasía', grupo: 'Fantasía', escena: true,
    dibujo(S) {
      let o = cielo(S, '#6a8fe0', '#f6d6f0', 'faC');
      const isla = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0 H60 C50 30 20 70 0 90 C-20 70 -50 30 -60 0 Z" ${S.f('#8a6a5a')}/><path d="M-62 0 C-40 -10 40 -10 62 0 C40 8 -40 8 -62 0 Z" ${S.f('#6fbf6a')}/></g>`;
      o += isla(90, 120, 0.6) + isla(320, 90, 0.5);
      o += isla(200, 170, 1.4);
      o += `<path d="M130 170 C140 220 130 260 126 300" ${S.k('#bfe6ff', 6, ' opacity=".8"')}/><path d="M268 170 C262 230 270 260 276 300" ${S.k('#bfe6ff', 5, ' opacity=".8"')}/>`;
      o += `<rect x="170" y="90" width="60" height="78" ${S.f('#f2ecf8')}/><polygon points="164,92 200,40 236,92" ${S.f('#7a5ad0')}/><rect x="150" y="120" width="20" height="48" ${S.f('#e6def0')}/><polygon points="146,122 160,94 174,122" ${S.f('#7a5ad0')}/><rect x="230" y="120" width="20" height="48" ${S.f('#e6def0')}/><polygon points="226,122 240,94 254,122" ${S.f('#7a5ad0')}/>`;
      o += `<path d="M192 168 V140 Q200 130 208 140 V168 Z" ${S.f('#4a3a6e')}/>`;
      o += `<path d="M300 60 C320 40 350 50 360 30 M40 70 C60 56 80 64 96 50" ${S.k('#ffffff', 2, ' opacity=".7"')}/>`;
      return o;
    }
  });

  add('templo', {
    nombre: 'Templo clásico', grupo: 'Fantasía', escena: true,
    dibujo(S) {
      let o = cielo(S, '#3a4a6e', '#c9c2d6', 'teC');
      o += `<path d="M40 70 C30 40 70 30 90 46 C110 20 160 30 160 60 C190 60 190 90 160 92 H50 C20 92 20 70 40 70 Z" ${S.f('#5a6280')}/><path d="M110 92 L96 130 L112 128 L98 170" ${S.k('#ffe58a', 5)}/>`;
      const c = '#efe8da', cS = '#cfc6b4';
      o += `<polygon points="90,150 200,100 310,150" ${S.f(c)}/><rect x="96" y="150" width="208" height="14" ${S.f(cS)}/>`;
      for (let i = 0; i < 6; i++) o += `<rect x="${106 + i * 36}" y="164" width="18" height="80" ${S.f(c)}/><path d="M${110 + i * 36} 168 V240 M${116 + i * 36} 168 V240" ${S.k(cS, 1.5)}/>`;
      o += `<rect x="86" y="244" width="228" height="12" ${S.f(cS)}/><rect x="76" y="256" width="248" height="12" ${S.f(c)}/>`;
      o += `<path d="M0 268 H400 V300 H0Z" ${S.f('#8a8f7a')}/>`;
      return o;
    }
  });

  add('coliseo', {
    nombre: 'Roma antigua', grupo: 'Fantasía', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f2c08a', '#fbe7cc', 'roC');
      o += `<circle cx="80" cy="70" r="26" ${S.f('#fff2d0')}/>`;
      const m = '#d9b083', mS = '#b88a5c';
      o += `<path d="M40 250 V110 Q200 80 360 110 V250 Z" ${S.f(m)}/>`;
      for (let f = 0; f < 3; f++) for (let i = 0; i < 9; i++) {
        const x = 52 + i * 34, y = 124 + f * 42;
        o += `<path d="M${x} ${y + 34} V${y + 12} Q${x + 12} ${y - 2} ${x + 24} ${y + 12} V${y + 34} Z" ${S.f(mS)}/>`;
      }
      o += `<path d="M40 110 Q200 80 360 110" ${S.k('#c79c6e', 6)}/><path d="M300 250 V140 L360 120 V250 Z" ${S.f('#c9a072')}/>`;
      o += `<path d="M0 250 H400 V300 H0Z" ${S.f('#a88a64')}/><path d="M130 300 L170 250 M230 250 L270 300" ${S.k('#c9ad84', 3)}/>`;
      o += `<rect x="20" y="186" width="14" height="64" ${S.f('#efe2c8')}/><rect x="14" y="180" width="26" height="8" ${S.f('#efe2c8')}/>`;
      return o;
    }
  });

  add('piramides', {
    nombre: 'Antiguo Egipto', grupo: 'Fantasía', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f2a65a', '#fde3b0', 'egC');
      o += `<circle cx="300" cy="80" r="30" ${S.f('#fff0c0')}/>`;
      const pir = (x, b, h, c, cS) => `<polygon points="${x - b},250 ${x},${250 - h} ${x + b},250" ${S.f(c)}/><polygon points="${x},${250 - h} ${x + b},250 ${x + b * 0.25},250" ${S.f(cS)}/>`;
      o += pir(110, 90, 130, '#e2b36a', '#c08a44') + pir(250, 120, 170, '#ebc07a', '#c9924a') + pir(350, 50, 70, '#e2b36a', '#c08a44');
      o += `<path d="M0 250 C100 240 300 240 400 250 V300 H0Z" ${S.f('#d9a85e')}/>`;
      o += `<g transform="translate(60 240)"><rect x="0" y="-16" width="44" height="16" ${S.f('#c9a064')}/><path d="M30 -16 V-34 Q30 -42 38 -42 H44 V-16" ${S.f('#c9a064')}/><path d="M40 -42 L44 -30 L48 -42" ${S.f('#3a6aa8')}/></g>`;
      return o;
    }
  });

  add('arquitectura', {
    nombre: 'Edificio moderno', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = cielo(S, '#a9cde3', '#eef3ef', 'arC');
      o += `<path d="M0 230 H400 V300 H0Z" ${S.f('#8fae74')}/><path d="M60 250 H340 V262 H60Z" ${S.f('#6fa8c2')}/>`;
      o += `<rect x="70" y="150" width="190" height="80" ${S.f('#f4f1ea')}/><rect x="90" y="166" width="150" height="54" ${S.f('#3a5262')}/>`;
      o += `<path d="M115 166 V220 M140 166 V220 M165 166 V220 M190 166 V220 M215 166 V220" ${S.k('#c7d9e4', 2)}/>`;
      o += `<rect x="150" y="96" width="210" height="58" ${S.f('#e9e3d8')}/><rect x="166" y="108" width="178" height="36" ${S.f('#486678')}/><rect x="140" y="92" width="230" height="8" ${S.f('#2e2e2e')}/>`;
      o += `<rect x="260" y="154" width="100" height="76" ${S.f('#b98a5a')}/><path d="M270 154 V230 M282 154 V230 M294 154 V230 M306 154 V230 M318 154 V230 M330 154 V230 M342 154 V230" ${S.k('#9a6e44', 2)}/>`;
      o += `<circle cx="40" cy="200" r="22" ${S.f('hoja')}/><rect x="37" y="210" width="6" height="22" ${S.f('tronco')}/>`;
      return o;
    }
  });

  add('rascacielos', {
    nombre: 'Rascacielos', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = cielo(S, '#5a8fc8', '#d8eaf4', 'rcC');
      o += `<path d="M120 300 L170 30 L230 30 L280 300 Z" ${S.f('#3a5a7a')}/><path d="M200 30 L230 30 L280 300 L200 300 Z" ${S.f('#2a4560')}/>`;
      for (let y = 40; y < 300; y += 14) o += `<path d="M${r1(170 - (y - 30) * 0.185)} ${y} H${r1(230 + (y - 30) * 0.185)}" ${S.k('#9fc4e6', 1.5, ' opacity=".7"')}/>`;
      o += `<path d="M200 30 V300" ${S.k('#1e3448', 2)}/><path d="M200 30 V6" ${S.k('#2a4560', 4)}/>`;
      o += `<path d="M150 120 L178 40 L186 40 L160 130 Z" fill="#fff" opacity=".25"/>`;
      return o;
    }
  });

  add('brutalista', {
    nombre: 'Brutalismo', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = cielo(S, '#c9ced2', '#e8eaeb', 'brC');
      const c = '#9a9a96', cD = '#6e6e6a', cL = '#b8b8b2';
      o += `<rect x="60" y="80" width="280" height="200" ${S.f(c)}/>`;
      for (let f = 0; f < 4; f++) for (let i = 0; i < 5; i++) {
        const x = 74 + i * 54, y = 92 + f * 46;
        o += `<rect x="${x}" y="${y}" width="44" height="36" ${S.f(cL)}/><rect x="${x + 8}" y="${y + 8}" width="28" height="28" ${S.f('#3a3d40')}/>`;
      }
      o += `<rect x="40" y="200" width="120" height="80" ${S.f(cD)}/><rect x="250" y="40" width="70" height="60" ${S.f(cD)}/><path d="M0 280 H400 V300 H0Z" ${S.f('#7e7e7a')}/>`;
      return o;
    }
  });

  add('isometrico', {
    nombre: 'Escena isométrica', grupo: 'Arquitectura',
    dibujo(S) {
      const iso = (x, y, w, d, h, top, l, r) => {
        const a = [x, y], b = [x + w * 0.866, y + w * 0.5], c = [x + w * 0.866 - d * 0.866, y + w * 0.5 + d * 0.5], dd = [x - d * 0.866, y + d * 0.5];
        const up = p => [p[0], p[1] - h];
        return `<polygon points="${pts([dd, c, [c[0], c[1]], up(c), up(dd)])}" ${S.f(l)}/><polygon points="${pts([c, b, up(b), up(c)])}" ${S.f(r)}/><polygon points="${pts([up(a), up(b), up(c), up(dd)])}" ${S.f(top)}/>`;
      };
      let o = iso(200, 150, 150, 150, 14, '#9fcf8a', '#6f9f5a', '#5a8a4a');
      o += iso(200, 160, 70, 60, 70, '#f2ece2', '#d9cfc0', '#bfb3a2') + iso(200, 92, 70, 60, 0, '#d9674a', '#d9674a', '#d9674a');
      o += iso(150, 196, 26, 26, 30, '#f2c14e', '#d9a636', '#b98a2a');
      o += `<polygon points="${pts([[236, 150], [256, 160], [256, 132], [236, 122]])}" ${S.f('#3a5262')}/>`;
      o += `<circle cx="290" cy="170" r="20" ${S.f('hoja')}/><rect x="287" y="180" width="6" height="20" ${S.f('tronco')}/>`;
      return o;
    }
  });

  add('puente', {
    nombre: 'Puente', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f2a77a', '#fbe0c4', 'puC');
      o += `<path d="M0 200 H400 V300 H0Z" ${S.f('#3f6f8f')}/>`;
      o += `<path d="M0 230 Q200 150 400 230" ${S.k('#2a2a2a', 0)}/>`;
      const torre = x => `<rect x="${x}" y="60" width="16" height="170" ${S.f('#c0392b')}/><rect x="${x + 22}" y="60" width="16" height="170" ${S.f('#c0392b')}/><rect x="${x}" y="80" width="38" height="8" ${S.f('#a5301f')}/><rect x="${x}" y="130" width="38" height="8" ${S.f('#a5301f')}/>`;
      o += `<path d="M0 120 Q60 200 100 64 Q200 200 300 64 Q340 200 400 120" ${S.k('#c0392b', 4)}/>`;
      for (let x = 10; x < 400; x += 14) o += `<path d="M${x} ${r1(x < 100 ? 120 + (x / 100) * 0 + 70 * Math.sin(x / 100 * Math.PI) * 0.6 : x < 300 ? 64 + 100 * Math.sin((x - 100) / 200 * Math.PI) * 0.9 : 120)} V210" ${S.k('#c0392b', 1.2)}/>`;
      o += torre(82) + torre(282);
      o += `<rect x="0" y="206" width="400" height="12" ${S.f('#8a2a1f')}/>`;
      o += `<path d="M0 240 C60 236 120 244 180 240 M220 252 C280 248 340 256 400 252" ${S.k('#ffffff', 2, ' opacity=".4"')}/>`;
      return o;
    }
  });

  add('faro', {
    nombre: 'Faro', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#2a3a62', '#d48a6a', 'faroC');
      o += `<path d="M216 74 L400 30 L400 120 Z" fill="#fff4c4" opacity=".35"/>`;
      o += `<path d="M0 230 C60 220 120 236 180 230 H400 V300 H0Z" ${S.f('#1f3a5a')}/>`;
      o += `<path d="M120 300 L150 210 C190 196 250 200 280 220 L320 300 Z" ${S.f('#3a3a3e')}/>`;
      o += `<path d="M180 210 L188 90 H220 L228 210 Z" ${S.f('#f4efe6')}/><path d="M184 170 H224 L222 150 H186 Z M186 130 H222 L221 112 H187 Z" ${S.f('#c0392b')}/>`;
      o += `<rect x="184" y="70" width="40" height="20" ${S.f('#fff2b0')}/><path d="M178 70 L204 48 L230 70 Z" ${S.f('#c0392b')}/>` + S.halo(204, 80, 50, '#fff2b0', 0.7);
      o += `<path d="M0 256 C80 246 160 262 240 252 C320 244 360 256 400 250" ${S.k('#ffffff', 2, ' opacity=".4"')}/>`;
      return o;
    }
  });

  add('puerto', {
    nombre: 'Puerto', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#9ccbe6', '#f2efe2', 'poC');
      o += `<path d="M0 150 H140 V130 H180 V150 H400 V170 H0Z" ${S.f('#8a9aa8')}/>`;
      o += [[20, 100, '#d9674a'], [60, 116, '#f2c14e'], [96, 90, '#4a8fc0']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="36" height="${150 - y}" ${S.f(c)}/>`).join('');
      o += `<path d="M300 150 V40 L240 40 M300 60 L360 60" ${S.k('#e2a23a', 5)}/><path d="M250 40 V80" ${S.k('#5a5a5a', 1.5)}/><rect x="244" y="80" width="14" height="10" ${S.f('#c0392b')}/>`;
      o += `<path d="M0 170 H400 V300 H0Z" ${S.f('#2f7aa8')}/>`;
      const barco = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-60 0 H60 L46 22 H-46 Z" ${S.f(c)}/><rect x="-40" y="-14" width="30" height="14" ${S.f('#f2c14e')}/><rect x="-8" y="-14" width="30" height="14" ${S.f('#4a8fc0')}/><rect x="26" y="-26" width="20" height="26" ${S.f('#f4efe6')}/></g>`;
      o += barco(250, 200, 1.4, '#2a3a4a') + barco(90, 240, 0.9, '#c0392b');
      o += `<path d="M0 270 C60 264 120 274 180 268 M220 280 C280 274 340 284 400 278" ${S.k('#ffffff', 2, ' opacity=".4"')}/>`;
      return o;
    }
  });

  add('barco', {
    nombre: 'Barco pirata', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f0a96a', '#fde8c8', 'baC');
      o += `<circle cx="80" cy="90" r="30" ${S.f('#fff0c8')}/>`;
      o += `<path d="M0 220 H400 V300 H0Z" ${S.f('#2f6f9a')}/>`;
      o += `<path d="M90 200 H320 L300 248 H120 Z" ${S.f('#5a3a24')}/><path d="M90 200 L70 180 L120 196 Z M320 200 L340 170 L300 196 Z" ${S.f('#6a4630')}/>`;
      o += `<path d="M150 210 h10 M190 214 h10 M230 214 h10 M270 210 h10" ${S.k('#1b1b1b', 6)}/>`;
      o += `<path d="M180 200 V40 M260 200 V70" ${S.k('#3a2618', 5)}/>`;
      o += `<path d="M130 60 Q180 50 230 60 Q220 110 230 150 Q180 140 130 150 Q140 110 130 60 Z" ${S.f('#efe6cf')}/><path d="M220 86 Q260 80 300 86 Q292 120 300 156 Q260 150 220 156 Q228 120 220 86 Z" ${S.f('#e6dcc2')}/>`;
      o += `<rect x="168" y="22" width="30" height="20" ${S.f('#1b1b1b')}/><circle cx="183" cy="30" r="4" fill="#fff"/><path d="M178 37 L188 37" stroke="#fff" stroke-width="2"/>`;
      o += `<path d="M0 240 C40 232 80 248 120 240 S200 232 240 240 S320 248 400 238 V300 H0Z" ${S.f('#245a80')}/>`;
      return o;
    }
  });

  add('cofre', {
    nombre: 'Cofre del tesoro', grupo: 'Lugares',
    dibujo(S) {
      let o = S.sombra(200, 262, 120, 10);
      o += S.halo(200, 140, 120, '#ffd76a', 0.55);
      o += `<path d="M110 70 Q200 30 290 70 L290 130 H110 Z" ${S.f('#7a4a2a')}/><path d="M110 70 Q200 30 290 70" ${S.k('#c99a2e', 8)}/>`;
      o += [[160, 140, 34], [200, 126, 30], [240, 140, 34], [180, 148, 22], [222, 148, 22]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.45}" ${S.f('#f2c14e')}/>`).join('');
      o += `<polygon points="${star(186, 124, 10, 4, 4)}" ${S.f('#ffffff')}/><circle cx="236" cy="132" r="8" ${S.f('#c0392b')}/>`;
      o += `<rect x="110" y="150" width="180" height="104" rx="4" ${S.f('#8a5530')}/><path d="M110 150 H290 M110 254 H290 M140 150 V254 M260 150 V254" ${S.k('#c99a2e', 8)}/>`;
      o += `<rect x="186" y="170" width="28" height="34" rx="4" ${S.f('#c99a2e')}/><circle cx="200" cy="184" r="5" ${S.f('#3a2418')}/>`;
      return o;
    }
  });

  add('pueblo', {
    nombre: 'Pueblo', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#a9d2e8', '#f4f1e2', 'puebC');
      o += `<path d="M0 150 C100 120 300 120 400 150 V300 H0Z" ${S.f('#8fbf6a')}/>`;
      const casita = (x, y, s, techo, muro) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-20" y="-24" width="40" height="30" ${S.f(muro)}/><polygon points="-26,-22 0,-46 26,-22" ${S.f(techo)}/><rect x="-6" y="-10" width="10" height="16" ${S.f('#5a3a24')}/><rect x="8" y="-18" width="8" height="8" ${S.f('ventana')}/></g>`;
      const r = rng(8), techos = ['#c0533c', '#d9874a', '#8a4a6a', '#5a7a9a'], muros = ['#f4ead8', '#efe0c4', '#f8f2e6'];
      const pos = [[70, 170, 0.9], [140, 162, 0.8], [210, 158, 0.85], [290, 166, 0.9], [340, 176, 0.8], [110, 214, 1.2], [200, 206, 1.25], [300, 220, 1.2], [40, 230, 1], [370, 240, 1.1]];
      pos.forEach(([x, y, s], i) => { o += casita(x, y, s, techos[i % 4], muros[i % 3]); });
      o += `<rect x="236" y="104" width="20" height="56" ${S.f('#f2ecdc')}/><polygon points="232,106 246,76 260,106" ${S.f('#5a7a9a')}/>`;
      o += `<path d="M0 270 C100 250 300 250 400 270 V300 H0Z" ${S.f('#6fa64a')}/>`;
      void r;
      return o;
    }
  });

  add('cottage', {
    nombre: 'Casa de campo acogedora', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f3e0c0', '#fbf3e4', 'coC2');
      o += `<path d="M0 220 C100 200 300 200 400 220 V300 H0Z" ${S.f('#a9c47a')}/>`;
      o += `<path d="M100 220 V140 H300 V220 Z" ${S.f('#f6ecd8')}/><path d="M80 150 L200 64 L320 150 Z" ${S.f('#c9a46a')}/><path d="M110 128 L200 70 L290 128" ${S.k('#a9844a', 3)}/><rect x="250" y="76" width="18" height="40" ${S.f('#a5523c')}/>`;
      o += `<path d="M184 220 V172 Q200 156 216 172 V220 Z" ${S.f('#6a8a5a')}/>`;
      o += [[126, 160], [244, 160]].map(([x, y]) => `<rect x="${x}" y="${y}" width="30" height="30" ${S.f('#ffe7a8')}/><path d="M${x + 15} ${y} V${y + 30} M${x} ${y + 15} H${x + 30}" ${S.k('#8a6a4a', 2)}/><rect x="${x - 4}" y="${y + 30}" width="38" height="8" ${S.f('#8a6a4a')}/>`).join('');
      const r = rng(23);
      for (let i = 0; i < 46; i++) o += `<circle cx="${r1(100 + r() * 200)}" cy="${r1(200 + r() * 24)}" r="${r1(3 + r() * 3)}" ${S.f(['#e88aa8', '#f6d36e', '#ffffff', '#b28ad8'][i % 4])}/>`;
      o += `<path d="M110 140 C100 160 104 190 112 210 M290 140 C300 160 296 190 288 210" ${S.k('#6a9a5a', 6)}/>`;
      return o;
    }
  });

  add('casa-arbol', {
    nombre: 'Casa del árbol', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#bfe2f0', '#eef6e6', 'caAC');
      o += `<path d="M0 260 H400 V300 H0Z" ${S.f('#7fae5c')}/>`;
      o += `<path d="M180 300 C186 240 176 200 186 150 H220 C228 200 216 240 226 300 Z" ${S.f('#7a5236')}/>`;
      o += [[200, 80, 90], [120, 120, 60], [290, 120, 60]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" ${S.f('#5f9a5c')}/>`).join('');
      o += `<rect x="150" y="130" width="100" height="10" ${S.f('#8a6a4a')}/><rect x="160" y="96" width="80" height="36" ${S.f('#c98a5a')}/><polygon points="150,98 200,62 250,98" ${S.f('#a5523c')}/><rect x="190" y="106" width="20" height="18" ${S.f('#ffe7a8')}/>`;
      o += `<path d="M168 140 L160 260 M184 140 L176 260" ${S.k('#a9844a', 3)}/>` + [160, 180, 200, 220, 240].map(y => `<path d="M${168 - (y - 140) / 15} ${y} H${184 - (y - 140) / 15}" ${S.k('#a9844a', 3)}/>`).join('');
      return o;
    }
  });

  add('isla-flotante', {
    nombre: 'Isla flotante', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#7fb6ea', '#e6f2fb', 'ifC');
      const nb = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-50 10 C-58 -6 -36 -16 -22 -8 C-18 -26 12 -28 18 -10 C32 -18 52 -6 46 10 Z" ${S.f('#ffffff')} opacity=".9"/></g>`;
      o += nb(70, 250, 1.4) + nb(330, 240, 1.2) + nb(320, 60, 0.8);
      o += `<path d="M90 150 H310 C290 200 240 250 200 280 C160 250 110 200 90 150 Z" ${S.f('#8a6a5a')}/><path d="M120 176 L280 176 M150 214 L250 214" ${S.k('#6a4a3a', 3)}/>`;
      o += `<path d="M86 150 C120 136 280 136 314 150 C280 160 120 160 86 150 Z" ${S.f('#6fbf6a')}/>`;
      o += `<circle cx="140" cy="118" r="24" ${S.f('#4f9a5c')}/><rect x="137" y="128" width="6" height="18" ${S.f('tronco')}/>`;
      o += `<rect x="210" y="110" width="50" height="34" ${S.f('#f4ead8')}/><polygon points="204,112 235,88 266,112" ${S.f('#c0533c')}/>`;
      o += `<path d="M300 150 C304 180 296 210 300 240" ${S.k('#bfe6ff', 4)}/>`;
      return o;
    }
  });

  /* ============================================================
     INTERIORES (perspectiva central)
     ============================================================ */
  const TEMAS_INT = {
    '': { pared: '#efe6d8', lado: '#e2d6c4', suelo: '#c9a27a', techo: '#f6f0e6' },
    scifi: { pared: '#d9e2ea', lado: '#b9c6d2', suelo: '#8a96a2', techo: '#eef3f6' },
    mazmorra: { pared: '#4a4642', lado: '#3a3632', suelo: '#2e2b28', techo: '#26231f' },
    trono: { pared: '#8a2a2a', lado: '#6e2020', suelo: '#c9a46a', techo: '#5a1a1a' },
    biblioteca: { pared: '#6a4a34', lado: '#5a3e2a', suelo: '#8a5a3a', techo: '#4a3424' },
    laboratorio: { pared: '#eef4f4', lado: '#dbe6e6', suelo: '#b9c6c6', techo: '#f6fafa' },
    almacen: { pared: '#c9c4ba', lado: '#b0aa9e', suelo: '#8f8a80', techo: '#d9d4ca' }
  };
  add('interior', {
    nombre: 'Interior', grupo: 'Arquitectura', escena: true,
    variantes: { scifi: 'Sala futurista', mazmorra: 'Mazmorra', trono: 'Salón del trono', biblioteca: 'Biblioteca', laboratorio: 'Laboratorio', almacen: 'Almacén' },
    dibujo(S, v) {
      const t = TEMAS_INT[v] || TEMAS_INT[''];
      let o = `<rect width="400" height="300" ${S.f(t.pared)}/>`;
      o += `<polygon points="0,0 100,60 100,210 0,300" ${S.f(t.lado)}/><polygon points="400,0 300,60 300,210 400,300" ${S.f(t.lado)}/>`;
      o += `<polygon points="0,0 400,0 300,60 100,60" ${S.f(t.techo)}/><polygon points="0,300 100,210 300,210 400,300" ${S.f(t.suelo)}/>`;
      o += `<rect x="100" y="60" width="200" height="150" ${S.f(t.pared)}/>`;
      switch (v) {
        case 'scifi':
          o += `<rect x="150" y="80" width="100" height="70" rx="10" ${S.f('#0f1a2a')}/><circle cx="200" cy="115" r="22" ${S.k('#53d5ff', 3)}/><path d="M178 115 H222 M200 93 V137" ${S.k('#53d5ff', 1.5)}/>`;
          o += `<path d="M100 170 H300 M100 190 H300" ${S.k('#53d5ff', 2, ' opacity=".7"')}/><path d="M30 60 L70 84 V200 L30 230 Z M370 60 L330 84 V200 L370 230 Z" ${S.f('#9fb2c2')}/><path d="M50 100 V190 M350 100 V190" ${S.k('#53d5ff', 3)}/>`;
          o += `<path d="M150 260 H250 L240 236 H160 Z" ${S.f('#eef3f6')}/>`;
          break;
        case 'mazmorra':
          o += `<path d="M150 210 V120 Q200 70 250 120 V210 Z" ${S.f('#151310')}/>` + [130, 160, 190].map(y => `<path d="M100 ${y} H300" ${S.k('#3a3632', 2)}/>`).join('');
          o += `<path d="M60 120 V150 M340 120 V150" ${S.k('#5a4a3a', 5)}/><path d="M60 108 C52 118 56 128 60 130 C64 128 68 118 60 108 Z M340 108 C332 118 336 128 340 130 C344 128 348 118 340 108 Z" ${S.f('#ffb02e')}/>` + S.halo(60, 120, 50, '#ff9a2a', 0.55) + S.halo(340, 120, 50, '#ff9a2a', 0.55);
          o += `<path d="M160 210 V140 M180 210 V128 M200 210 V124 M220 210 V128 M240 210 V140" ${S.k('#6a625a', 3)}/>`;
          break;
        case 'trono':
          o += `<polygon points="180,210 220,210 300,300 100,300" ${S.f('#b8282a')}/>`;
          o += `<path d="M170 196 V100 Q200 70 230 100 V196 Z" ${S.f('#d9a640')}/><rect x="180" y="150" width="40" height="46" ${S.f('#7a1f2a')}/><rect x="166" y="190" width="68" height="14" ${S.f('#d9a640')}/>`;
          o += `<polygon points="${star(200, 92, 9, 4, 5)}" ${S.f('#fff2b0')}/><path d="M120 70 V200 M280 70 V200" ${S.k('#d9a640', 8)}/>`;
          break;
        case 'biblioteca':
          for (let f = 0; f < 5; f++) for (let i = 0; i < 18; i++) o += `<rect x="${104 + i * 10.8}" y="${66 + f * 28}" width="8" height="24" ${S.f(['#a5523c', '#3a6a8a', '#c9a046', '#5a7a4a', '#7a4a6a'][(i + f * 2) % 5])}/>`;
          for (let f = 0; f < 6; f++) o += `<path d="M100 ${90 + f * 28} H300" ${S.k('#4a3424', 3)}/>`;
          o += `<path d="M10 40 L80 82 V220 L10 270 Z M390 40 L320 82 V220 L390 270 Z" ${S.f('#5a3e2a')}/>`;
          o += `<rect x="170" y="230" width="60" height="30" ${S.f('#7a4a2a')}/><path d="M180 230 L194 222 L208 230" ${S.f('#f6efe2')}/>` + S.halo(200, 210, 40, '#ffd77a', 0.5);
          break;
        case 'laboratorio':
          o += `<rect x="100" y="150" width="200" height="60" ${S.f('#d9e2e2')}/><rect x="100" y="146" width="200" height="6" ${S.f('#5a6a72')}/>`;
          o += `<path d="M140 146 V120 H150 V146 Z" ${S.f('#8fe3c8')}/><path d="M170 146 L178 110 H186 L194 146 Z" ${S.f('#ff8ab0')}/><circle cx="230" cy="132" r="14" ${S.f('#9ec5ff')}/><path d="M226 118 V108 H234 V118" ${S.k('#5a6a72', 2)}/><rect x="256" y="104" width="26" height="42" ${S.f('#2a3a4a')}/>`;
          o += `<rect x="120" y="76" width="70" height="40" ${S.f('#ffffff')}/><path d="M128 100 L144 90 L156 104 L168 86 L182 96" ${S.k('#3a8fc0', 2)}/>`;
          break;
        case 'almacen':
          for (let s = 0; s < 3; s++) {
            const x = 20 + s * 140, w = 90 - (s === 1 ? -30 : 0);
            void w;
          }
          o += [[30, 70, 60], [310, 70, 60]].map(([x]) => [0, 1, 2].map(f => `<rect x="${x}" y="${100 + f * 50}" width="60" height="8" ${S.f('#3a6aa8')}/>` + [0, 1].map(b => `<rect x="${x + 4 + b * 28}" y="${76 + f * 50}" width="24" height="24" ${S.f('#c99a5a')}/>`).join('')).join('') + `<path d="M${x} 60 V260 M${x + 60} 60 V260" ${S.k('#3a6aa8', 4)}/>`).join('');
          o += `<rect x="150" y="150" width="100" height="60" ${S.f('#b0aa9e')}/>` + [0, 1, 2].map(i => `<rect x="${158 + i * 30}" y="168" width="24" height="24" ${S.f('#c99a5a')}/>`).join('');
          o += `<path d="M190 300 L196 214 M210 300 L204 214" ${S.k('#f2c14e', 3, ' stroke-dasharray="8 6"')}/>`;
          break;
        default:
          o += `<rect x="130" y="80" width="140" height="80" ${S.f('#bfe0ef')}/><path d="M200 80 V160 M130 120 H270" ${S.k('#f6f0e6', 4)}/>`;
          o += `<path d="M110 236 H290 V210 Q290 196 276 196 H124 Q110 196 110 210 Z" ${S.f('#5a8a8a')}/><rect x="104" y="214" width="20" height="30" rx="6" ${S.f('#4a7a7a')}/><rect x="276" y="214" width="20" height="30" rx="6" ${S.f('#4a7a7a')}/>`;
          o += `<ellipse cx="200" cy="270" rx="70" ry="12" ${S.f('#e6d2b4')}/><path d="M60 170 V230 M44 160 Q60 130 76 160" ${S.k('#3a3a3a', 3)}/><path d="M44 160 H76 L68 140 H52 Z" ${S.f('#f2c14e')}/>`;
          o += `<rect x="330" y="200" width="24" height="30" ${S.f('#c9a27a')}/><path d="M342 200 C330 170 350 160 342 140 M342 196 C356 176 364 170 360 156" ${S.k('#4f8f4a', 4)}/>`;
      }
      return o;
    }
  });

  add('escritorio', {
    nombre: 'Espacio de trabajo', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#e8e2d8')}/><rect y="200" width="400" height="100" ${S.f('#c9a27a')}/><rect y="196" width="400" height="8" ${S.f('#a9845c')}/>`;
      o += `<rect x="40" y="30" width="110" height="70" ${S.f('#f6f2ea')}/><path d="M50 40 H140 V90 H50Z" ${S.f('#bcd8e6')}/>`;
      o += `<rect x="130" y="70" width="170" height="108" rx="6" ${S.f('#2a2e34')}/><rect x="138" y="78" width="154" height="92" ${S.f('#f4f6f8')}/><rect x="146" y="88" width="60" height="8" ${S.f('#3b82f6')}/><rect x="146" y="104" width="138" height="30" ${S.f('#dfe6ee')}/><rect x="146" y="142" width="64" height="20" ${S.f('#dfe6ee')}/><rect x="218" y="142" width="66" height="20" ${S.f('#f2c14e')}/>`;
      o += `<path d="M206 178 V196 M180 196 H240" ${S.k('#2a2e34', 6)}/><rect x="150" y="214" width="130" height="20" rx="4" ${S.f('#f4f4f4')}/><rect x="292" y="216" width="22" height="30" rx="10" ${S.f('#f4f4f4')}/>`;
      o += `<rect x="66" y="214" width="40" height="44" rx="4" ${S.f('#e07a4f')}/><path d="M106 224 Q120 228 106 244" ${S.k('#e07a4f', 4)}/>`;
      o += `<rect x="330" y="150" width="34" height="46" ${S.f('#d9cfc0')}/><path d="M346 150 C334 120 352 110 346 90 M346 146 C362 126 372 120 366 104" ${S.k('#4f8f4a', 5)}/>`;
      return o;
    }
  });

  add('fabrica', {
    nombre: 'Fábrica automatizada', grupo: 'Arquitectura', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#dfe3e6')}/><rect y="220" width="400" height="80" ${S.f('#9aa2a8')}/>`;
      o += `<rect x="0" y="190" width="400" height="24" ${S.f('#3a3f45')}/>` + Array.from({ length: 14 }, (_, i) => `<circle cx="${14 + i * 29}" cy="202" r="6" ${S.f('#6a7178')}/>`).join('');
      o += [40, 170, 300].map((x, i) => `<rect x="${x}" y="168" width="44" height="22" ${S.f(['#f2c14e', '#e07a4f', '#3b82f6'][i])}/>`).join('');
      const brazo = (x, flip) => `<rect x="${x - 20}" y="250" width="40" height="20" ${S.f('#f29a2a')}/><path d="M${x} 250 L${x + flip * 20} 150 L${x + flip * 70} 120 L${x + flip * 80} 150" ${S.k('#f29a2a', 14)}/><circle cx="${x + flip * 20}" cy="150" r="10" ${S.f('#3a3f45')}/><circle cx="${x + flip * 70}" cy="120" r="8" ${S.f('#3a3f45')}/>`;
      o += brazo(120, 1) + brazo(300, -1);
      o += `<path d="M0 40 H400" ${S.k('#9aa2a8', 6)}/>` + [60, 180, 300].map(x => `<rect x="${x}" y="40" width="60" height="10" ${S.f('#ffffff')}/>`).join('');
      return o;
    }
  });

  add('aeropuerto', {
    nombre: 'Aeropuerto', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = cielo(S, '#7fb6e6', '#e6f1f8', 'aeC');
      o += `<path d="M260 70 L300 64 C320 62 330 70 320 76 L250 92 L220 120 L206 120 L222 96 L170 106 L160 118 L150 118 L156 100 L140 96 L150 92 L170 94 L216 82 L200 60 L214 60 Z" ${S.f('#f4f6f8')}/>`;
      o += `<rect y="140" width="400" height="120" ${S.f('#2f3a46')}/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${8 + i * 44}" y="150" width="38" height="100" ${S.f('#5a86a8')}/>`).join('');
      o += `<rect y="130" width="400" height="12" ${S.f('#dfe3e6')}/><rect y="260" width="400" height="40" ${S.f('#c9c4bc')}/>`;
      o += `<rect x="290" y="200" width="70" height="40" rx="4" ${S.f('#1b2128')}/><path d="M298 212 H350 M298 224 H336" ${S.k('#f2c14e', 3)}/>`;
      o += `<path d="M60 296 V262 M60 262 a8 8 0 1 1 0.1 0 M100 296 V266" ${S.k('#3a3f45', 5)}/><rect x="110" y="270" width="20" height="24" rx="3" ${S.f('#e07a4f')}/>`;
      return o;
    }
  });

  add('estacion', {
    nombre: 'Estación de tren', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#e9e2d4')}/>`;
      o += `<path d="M0 60 Q200 -20 400 60 V80 H0Z" ${S.f('#5a6a5a')}/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 50} 80 V${30 - Math.abs(4 - i) * -4}" ${S.k('#4a5a4a', 4)}/>`).join('');
      o += `<rect y="80" width="400" height="10" ${S.f('#4a5a4a')}/>`;
      o += `<rect x="20" y="120" width="300" height="90" rx="10" ${S.f('#c0392b')}/><rect x="20" y="186" width="300" height="10" ${S.f('#f2c14e')}/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${36 + i * 46}" y="134" width="34" height="34" rx="4" ${S.f('#bfe0ef')}/>`).join('');
      o += `<rect y="210" width="400" height="90" ${S.f('#b9b2a6')}/><path d="M0 214 H400" ${S.k('#f2c14e', 4)}/>`;
      o += `<rect x="330" y="100" width="54" height="30" rx="3" ${S.f('#1b2128')}/><path d="M338 112 H376 M338 120 H362" ${S.k('#f2c14e', 2.4)}/><path d="M357 130 V210" ${S.k('#3a3f45', 4)}/>`;
      o += `<circle cx="200" cy="40" r="16" ${S.f('#ffffff')}/><path d="M200 40 V30 M200 40 L208 44" ${S.k('#1b1b1b', 2)}/>`;
      return o;
    }
  });

  add('metro', {
    nombre: 'Metro', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#2a2e33')}/>`;
      o += `<path d="M60 300 V140 Q200 20 340 140 V300 Z" ${S.f('#11141a')}/>`;
      o += `<rect x="130" y="140" width="140" height="130" rx="22" ${S.f('#d9dde2')}/><rect x="148" y="160" width="104" height="50" rx="8" ${S.f('#1b2a3a')}/><rect x="130" y="222" width="140" height="12" ${S.f('#3b82f6')}/>`;
      o += `<circle cx="156" cy="250" r="8" ${S.f('#fff2b0')}/><circle cx="244" cy="250" r="8" ${S.f('#fff2b0')}/>` + S.halo(156, 250, 30, '#fff2b0', 0.6) + S.halo(244, 250, 30, '#fff2b0', 0.6);
      o += `<rect x="0" y="270" width="400" height="30" ${S.f('#8a8f96')}/><path d="M0 274 H400" ${S.k('#f2c14e', 5)}/>`;
      o += `<rect x="12" y="40" width="40" height="16" rx="3" ${S.f('#3b82f6')}/><rect x="348" y="40" width="40" height="16" rx="3" ${S.f('#e07a4f')}/>`;
      return o;
    }
  });

  add('dron', {
    nombre: 'Vista cenital de dron', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#8fb36a')}/>`;
      o += `<path d="M0 140 H400 V176 H0Z M180 0 H216 V300 H180Z" ${S.f('#4a4f55')}/><path d="M0 158 H400 M198 0 V300" ${S.k('#f4f1ea', 2, ' stroke-dasharray="12 10"')}/>`;
      const tejado = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${S.f(c)}/><path d="M${x} ${y + h / 2} H${x + w}" ${S.k(shade(c, -0.2), 2)}/>`;
      o += tejado(30, 30, 60, 40, '#c0533c') + tejado(110, 40, 50, 60, '#d9874a') + tejado(240, 30, 70, 44, '#5a7a9a') + tejado(330, 50, 50, 50, '#c0533c') + tejado(30, 200, 60, 60, '#5a7a9a') + tejado(240, 200, 90, 50, '#8a4a6a');
      o += `<rect x="110" y="200" width="54" height="80" rx="4" ${S.f('#6fb6d6')}/>`;
      const r = rng(9);
      for (let i = 0; i < 26; i++) o += `<circle cx="${r1(r() * 400)}" cy="${r1(r() * 300)}" r="${r1(6 + r() * 6)}" ${S.f('#4f8a44')}/>`;
      o += `<rect x="40" y="148" width="22" height="12" rx="3" ${S.f('#e2574c')}/><rect x="300" y="160" width="22" height="12" rx="3" ${S.f('#f4f1ea')}/><rect x="186" y="60" width="12" height="22" rx="3" ${S.f('#f2c14e')}/>`;
      return o;
    }
  });

  add('ojopez', {
    nombre: 'Gran angular ojo de pez', grupo: 'Lugares', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#111')}/>`;
      S.def('ojoC', '<clipPath id="ojoC"><circle cx="200" cy="150" r="146"/></clipPath>');
      o += `<g clip-path="url(#ojoC)"><rect width="400" height="300" ${S.f('#8fc3ea')}/>`;
      const r = rng(3);
      for (let i = 0; i < 14; i++) {
        const a = -170 + i * 12, rad = 150, x0 = 200 + Math.cos(a * Math.PI / 180) * 30, y0 = 230 + Math.sin(a * Math.PI / 180) * 30;
        const x1 = 200 + Math.cos(a * Math.PI / 180) * rad * (0.8 + r() * 0.6), y1 = 230 + Math.sin(a * Math.PI / 180) * rad * (0.8 + r() * 0.6);
        const a2 = (a + 9) * Math.PI / 180, x2 = 200 + Math.cos(a2) * rad * (0.8 + r() * 0.6), y2 = 230 + Math.sin(a2) * rad * (0.8 + r() * 0.6);
        o += `<path d="M${r1(x0)} ${r1(y0)} Q${r1((x0 + x1) / 2 + 10)} ${r1((y0 + y1) / 2)} ${r1(x1)} ${r1(y1)} L${r1(x2)} ${r1(y2)} Q${r1((x0 + x2) / 2 + 10)} ${r1((y0 + y2) / 2)} ${r1(200 + Math.cos(a2) * 30)} ${r1(230 + Math.sin(a2) * 30)} Z" ${S.f(['#3a4a5a', '#5a6a7a', '#c9b8a0', '#e0dbd0'][i % 4])}/>`;
      }
      o += `<ellipse cx="200" cy="290" rx="230" ry="90" ${S.f('#4a4f55')}/><path d="M200 300 V210" ${S.k('#f4f1ea', 3, ' stroke-dasharray="10 8"')}/>`;
      o += `<g transform="translate(200 220)"><circle cx="0" cy="-34" r="10" ${S.f('#e9b896')}/><path d="M-10 -22 L-14 6 L14 6 L10 -22 Z" ${S.f('#e2574c')}/><path d="M-26 14 H26" ${S.k('#2a2a2a', 6)}/></g></g>`;
      o += `<circle cx="200" cy="150" r="146" ${S.k('#000', 6)}/>`;
      return o;
    }
  });
})();
