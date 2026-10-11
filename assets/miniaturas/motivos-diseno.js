/*!
 * Prompt Atlas · Motivos de diseño gráfico, impresión y marca
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const { pts, star, gear, r1, rng, shade, arc } = M.util;
  const add = M.motivo;
  const SERIF = `font-family="Georgia, 'Times New Roman', serif"`;
  const SANS = `font-family="Helvetica, Arial, sans-serif"`;
  const BLACK = `font-family="Impact, 'Arial Black', Helvetica, sans-serif"`;

  /* Retrato en miniatura, recortado dentro de un rectángulo. */
  function mini(S, x, y, w, h, fondo = '#d9cfc0', vb = '90 30 220 220', v = '') {
    const ret = M.motivos.retrato.dibujo(S, v, {});
    return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice"><rect x="-50" y="-50" width="500" height="400" ${S.f(fondo)}/>${ret}</svg>`;
  }
  M.util.mini = mini;
  const lineas = (S, x, y, w, n, gap, col, grosor = 3) => Array.from({ length: n }, (_, i) => `<path d="M${x} ${y + i * gap} H${x + (i === n - 1 ? w * 0.6 : w)}" ${S.k(col, grosor)}/>`).join('');

  /* ============================================================
     ESTÉTICAS (composiciones completas)
     ============================================================ */
  add('vaporwave', {
    nombre: 'Vaporwave', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#ff9ad5', '#7ad8f0', 'vwC');
      o += `<circle cx="200" cy="120" r="70" fill="${S.lg('vwS', ['#ffe08a', '#ff5ec4'])}"/>`;
      o += `<rect y="190" width="400" height="110" ${S.f('#2a1f5a')}/>` + Array.from({ length: 8 }, (_, i) => `<path d="M0 ${196 + i * i * 2.2} H400" ${S.k('#ff5ec4', 1.5)}/>`).join('') + Array.from({ length: 13 }, (_, i) => `<path d="M200 190 L${-400 + i * 100} 300" ${S.k('#ff5ec4', 1.5)}/>`).join('');
      // busto clásico
      o += `<g transform="translate(118 64) scale(.82)"><path d="M118 240 C120 206 152 190 200 188 C248 190 280 206 282 240 Z" ${S.f('#f1eef6')}/><path d="M178 156 L178 196 L222 196 L222 156 Z" ${S.f('#d9d4e2')}/><path d="M155 110 C155 72 176 56 200 56 C224 56 245 72 245 110 C245 148 226 172 200 172 C174 172 155 148 155 110 Z" ${S.f('#f6f3fa')}/>` +
        [[166, 70], [182, 60], [200, 56], [218, 60], [234, 70], [157, 88], [243, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" ${S.f('#e2dcec')}/>`).join('') + `<path d="M176 120 Q183 116 190 120 M210 120 Q217 116 224 120" ${S.k('#a9a2b8', 2)}/></g>`;
      o += `<path d="M40 190 C44 150 36 120 50 96 M50 96 C30 90 20 100 14 110 M50 96 C60 80 76 78 86 84 M50 96 C70 96 80 104 86 116 M50 96 C40 80 26 74 16 78" ${S.k('#1fa58a', 5)}/>`;
      o += `<rect x="270" y="30" width="110" height="70" ${S.f('#c9c9d6')}/><rect x="270" y="30" width="110" height="14" ${S.f('#3a2a9a')}/><rect x="364" y="33" width="10" height="8" ${S.f('#c9c9d6')}/><path d="M282 60 H360 M282 72 H340" ${S.k('#3a2a9a', 3)}/>`;
      return o;
    }
  });

  add('synthwave', {
    nombre: 'Synthwave', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#120a2a', '#4a1a5e', 'swC');
      o += Array.from({ length: 30 }, (_, i) => `<circle cx="${(i * 97) % 400}" cy="${(i * 53) % 120}" r="1" fill="#fff" opacity=".7"/>`).join('');
      o += `<circle cx="200" cy="140" r="80" fill="${S.lg('swS', ['#ffe08a', '#ff3d9a'])}"/>` + [120, 140, 158, 174, 188].map((y, i) => `<rect x="110" y="${y}" width="180" height="${3 + i}" fill="#120a2a"/>`).join('');
      o += `<path d="M0 200 L60 160 L110 190 L150 168 L200 200 L250 170 L300 192 L350 158 L400 200 Z" ${S.f('#1c1240')}/><path d="M0 200 L60 160 L110 190 L150 168 L200 200 L250 170 L300 192 L350 158 L400 200" ${S.k('#ff3df2', 2)}/>`;
      o += `<rect y="200" width="400" height="100" ${S.f('#140a30')}/>` + Array.from({ length: 7 }, (_, i) => `<path d="M0 ${204 + i * i * 2.6} H400" ${S.k('#ff3df2', 1.6)}/>`).join('') + Array.from({ length: 15 }, (_, i) => `<path d="M200 200 L${-500 + i * 64} 300" ${S.k('#ff3df2', 1.6)}/>`).join('');
      return o;
    }
  });

  add('outrun', {
    nombre: 'Outrun', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#1a0b3a', '#ff6a5a', 'orC');
      o += `<circle cx="200" cy="150" r="74" fill="${S.lg('orS', ['#ffea7a', '#ff4d6d'])}"/>` + [150, 166, 180, 192].map((y, i) => `<rect x="120" y="${y}" width="160" height="${3 + i}" fill="#ff6a5a" opacity=".9"/>`).join('');
      o += `<rect y="180" width="400" height="120" ${S.f('#1a0b2e')}/><polygon points="170,180 230,180 360,300 40,300" ${S.f('#2a1440')}/>`;
      o += `<path d="M200 186 V196 M200 206 V222 M200 236 V262 M200 278 V300" ${S.k('#ffe08a', 4)}/><path d="M170 180 L40 300 M230 180 L360 300" ${S.k('#ff3df2', 3)}/>`;
      const palma = (x, s) => `<g transform="translate(${x} 180) scale(${s})"><path d="M0 0 C-4 -40 4 -80 0 -120" ${S.k('#0d0620', 6)}/><path d="M0 -120 C-30 -130 -50 -120 -60 -100 M0 -120 C30 -132 52 -120 60 -102 M0 -120 C-20 -150 -40 -150 -54 -140 M0 -120 C20 -150 42 -152 54 -140 M0 -120 C0 -140 4 -152 10 -160" ${S.k('#0d0620', 6)}/></g>`;
      o += palma(40, 0.9) + palma(360, 1.1);
      o += `<g transform="translate(150 236)"><path d="M0 30 L6 14 Q12 4 30 4 H70 Q86 4 94 14 L100 30 Z" ${S.f('#ff2d75')}/><rect x="-4" y="26" width="108" height="16" rx="4" ${S.f('#c9184a')}/><rect x="0" y="30" width="16" height="6" ${S.f('#ffd36e')}/><rect x="84" y="30" width="16" height="6" ${S.f('#ffd36e')}/><path d="M24 8 H76 L82 22 H18 Z" ${S.f('#3a1a5a')}/></g>`;
      return o;
    }
  });

  add('glassmorphism', {
    nombre: 'Glassmorphism', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      S.def('gmB', `<filter id="gmB" ${M.util.FR}><feGaussianBlur stdDeviation="20"/></filter>`);
      const blobs = `<circle cx="110" cy="90" r="70" fill="#ff6ad5"/><circle cx="300" cy="210" r="80" fill="#5ab0ff"/><circle cx="290" cy="70" r="44" fill="#ffd36e"/><circle cx="120" cy="240" r="50" fill="#7cf0c8"/>`;
      let o = S.fondo('#20163f', '#3a2a7a', 'gmC') + blobs;
      S.def('gmClip', '<clipPath id="gmClip"><rect x="90" y="60" width="220" height="180" rx="22"/></clipPath>');
      o += `<g clip-path="url(#gmClip)"><g filter="url(#gmB)">${blobs}</g><rect width="400" height="300" fill="#ffffff" opacity=".18"/></g>`;
      o += `<rect x="90" y="60" width="220" height="180" rx="22" fill="none" stroke="#ffffff" stroke-opacity=".6" stroke-width="1.5"/>`;
      o += `<circle cx="126" cy="96" r="16" fill="#fff" opacity=".7"/><rect x="152" y="86" width="90" height="8" rx="4" fill="#fff" opacity=".85"/><rect x="152" y="100" width="60" height="6" rx="3" fill="#fff" opacity=".55"/>`;
      o += `<rect x="110" y="134" width="180" height="50" rx="12" fill="#fff" opacity=".22"/><path d="M122 170 L150 152 L178 164 L206 146 L234 158 L278 142" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
      o += `<rect x="110" y="198" width="84" height="26" rx="13" fill="#fff" opacity=".85"/><rect x="206" y="198" width="84" height="26" rx="13" fill="#fff" opacity=".25"/>`;
      return o;
    }
  });

  add('minimal', {
    nombre: 'Composición minimalista', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#f1ede6', '#e9e3d9', 'miC');
      o += `<rect y="210" width="400" height="90" ${S.f('#e2dbcf')}/>`;
      o += `<path d="M262 210 L380 236 L330 210 Z" fill="#000" opacity=".08"/>`;
      o += `<circle cx="262" cy="186" r="24" ${S.f('#d9674a')}/>`;
      return o;
    }
  });

  add('garabatos', {
    nombre: 'Garabatos (doodle)', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#fffdf6"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M0 ${30 + i * 24} H400" stroke="#bcd6ee" stroke-width="1"/>`).join('') + `<path d="M48 0 V300" stroke="#f2a2a2" stroke-width="1.5"/>`;
      const k = (c, w = 3) => `fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
      o += `<polygon points="${star(110, 80, 30, 13, 5)}" ${k('#2b59c3')}/><path d="M260 70 C280 40 320 50 310 80 C300 104 260 96 270 76 C278 62 296 68 292 78" ${k('#e2574c')}/>`;
      o += `<circle cx="190" cy="160" r="40" ${k('#1d1d1d')}/><circle cx="176" cy="150" r="4" fill="#1d1d1d"/><circle cx="204" cy="150" r="4" fill="#1d1d1d"/><path d="M172 172 Q190 188 208 172" ${k('#1d1d1d')}/>`;
      o += `<path d="M80 200 Q100 170 120 200 T160 200 T200 200" ${k('#3aa65a')}/><path d="M280 150 L340 150 M330 140 L340 150 L330 160" ${k('#1d1d1d')}/>`;
      o += `<path d="M300 220 C300 200 330 196 330 214 C330 196 360 200 360 220 C360 240 330 254 330 260 C330 254 300 240 300 220 Z" ${k('#e2574c')}/><path d="M80 260 L100 240 L120 260 L140 240 L160 260" ${k('#f2a531')}/>`;
      o += `<path d="M230 260 l6 -16 l6 16 l-16 -10 h20 Z" ${k('#2b59c3', 2.4)}/><path d="M360 100 l4 4 m0 -4 l-4 4 M70 140 l4 4 m0 -4 l-4 4" ${k('#1d1d1d', 2)}/>`;
      return o;
    }
  });

  add('grafiti', {
    nombre: 'Grafiti', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      const lad = `<pattern id="lad" width="48" height="24" patternUnits="userSpaceOnUse"><rect width="48" height="24" fill="#9a5a46"/><path d="M0 .5 H48 M0 12.5 H48 M24 0 V12 M0 12 V24 M48 12 V24" stroke="#7a4434" stroke-width="2"/></pattern>`;
      S.def('lad', lad);
      let o = `<rect width="400" height="300" fill="url(#lad)"/>`;
      o += `<path d="M40 230 C30 160 90 70 200 70 C320 70 380 160 360 230 Z" fill="#2b2b44" opacity=".2"/>`;
      const letra = (x, l, c) => `<text x="${x}" y="196" font-size="104" ${BLACK} font-weight="900" fill="${c}" stroke="#141414" stroke-width="7" paint-order="stroke" transform="rotate(-6 ${x} 196)">${l}</text>`;
      o += letra(60, 'W', '#ff4fa3') + letra(170, 'O', '#ffd23f') + letra(250, 'W', '#3ad6f0');
      o += [[90, 196, 40], [200, 192, 30], [300, 198, 50], [140, 198, 26]].map(([x, y, h]) => `<path d="M${x} ${y} V${y + h}" stroke="${['#ff4fa3', '#ffd23f', '#3ad6f0', '#ff4fa3'][x % 4]}" stroke-width="5" stroke-linecap="round"/><circle cx="${x}" cy="${y + h + 3}" r="4.5" fill="${['#ff4fa3', '#ffd23f', '#3ad6f0', '#ff4fa3'][x % 4]}"/>`).join('');
      o += `<polygon points="${star(340, 70, 26, 10, 5)}" fill="#ffd23f" stroke="#141414" stroke-width="4"/>`;
      return o;
    }
  });

  add('surrealista', {
    nombre: 'Escena surrealista', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#7fb2e0', '#f6e2c4', 'suC');
      o += `<path d="M0 210 H400 V300 H0Z" ${S.f('#d9b07a')}/><path d="M0 210 H400" ${S.k('#c09060', 2)}/>`;
      o += `<rect x="70" y="120" width="56" height="94" ${S.f('#3a6aa8')}/><rect x="74" y="124" width="48" height="86" ${S.f('#9fd0f0')}/>` + `<path d="M74 210 L40 270 L110 270 L122 210 Z" fill="#000" opacity=".12"/>`;
      o += `<circle cx="300" cy="80" r="34" ${S.f('#e2402f')}/><path d="M300 46 C304 36 312 32 318 34" ${S.k('#5a3a24', 3)}/><ellipse cx="318" cy="36" rx="9" ry="4" transform="rotate(-20 318 36)" ${S.f('#4f9a4a')}/><ellipse cx="300" cy="226" rx="30" ry="6" fill="#000" opacity=".15"/>`;
      o += `<path d="M190 160 H260 V172 C260 196 248 210 236 230 C230 240 236 256 230 270 C226 258 220 246 222 232 C212 214 196 200 190 172 Z" ${S.f('#f2d36e')}/><circle cx="224" cy="168" r="18" ${S.f('#fff8e6')}/><path d="M224 168 V156 M224 168 L232 172" ${S.k('#3a2a1a', 2)}/>`;
      o += `<path d="M180 120 C200 110 220 110 240 120" ${S.k('#ffffff', 3)}/><g transform="translate(150 100)"><ellipse cx="0" cy="0" rx="14" ry="5" ${S.f('#ffffff')}/></g>`;
      return o;
    }
  });

  add('abstracto', {
    nombre: 'Composición abstracta', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#f2ece0', '#efe6d6', 'abC');
      o += `<circle cx="140" cy="140" r="90" ${S.f('#e2574c')}/><rect x="190" y="60" width="150" height="150" ${S.f('#1f3a6e')} transform="rotate(12 265 135)"/>`;
      o += `<path d="M40 250 C120 180 220 300 360 220" ${S.k('#f2c14e', 18)}/><circle cx="290" cy="90" r="34" ${S.f('#f2c14e')}/>`;
      o += `<path d="M60 60 L120 30 M70 80 L140 46" ${S.k('#1d1d1d', 4)}/><polygon points="230,230 300,290 200,290" ${S.f('#3aa68a')}/>`;
      return o;
    }
  });

  add('grulla', {
    nombre: 'Origami', grupo: 'Estéticas',
    dibujo(S) {
      const a = '#e2574c', b = '#c9443a', c = '#f07a64', d = '#a8362e';
      let o = S.sombra(210, 262, 110, 8);
      o += `<polygon points="200,240 120,170 200,150" ${S.f(b)}/><polygon points="200,240 280,168 200,150" ${S.f(d)}/>`;
      o += `<polygon points="200,150 130,40 176,160" ${S.f(c)}/><polygon points="200,150 300,52 222,160" ${S.f(a)}/>`;
      o += `<polygon points="120,170 60,120 92,170" ${S.f(a)}/><polygon points="60,120 46,140 78,132" ${S.f(d)}/>`;
      o += `<polygon points="280,168 352,96 310,170" ${S.f(c)}/>`;
      o += `<polygon points="176,160 200,240 222,160 200,150" ${S.f(a)}/>`;
      return o;
    }
  });

  add('mandala', {
    nombre: 'Mandala', grupo: 'Estéticas',
    dibujo(S) {
      let o = '';
      const cols = ['#2a4a7a', '#e07a4f', '#f2c14e', '#3aa68a', '#c0395a'];
      for (let ring = 5; ring >= 1; ring--) {
        const n = ring * 4 + 4, r = ring * 24;
        for (let i = 0; i < n; i++) {
          const a = i * 360 / n;
          o += `<ellipse cx="200" cy="${150 - r + 8}" rx="${4 + ring * 1.6}" ry="${10 + ring * 2}" transform="rotate(${a} 200 150)" ${S.f(cols[ring % 5])}/>`;
        }
        o += `<circle cx="200" cy="150" r="${r - 12}" ${S.f(ring % 2 ? '#f8f1e4' : '#efe2cc')}/>`;
      }
      o += `<polygon points="${star(200, 150, 14, 6, 8)}" ${S.f('#c0395a')}/>`;
      return o;
    }
  });

  add('zentangle', {
    nombre: 'Zentangle', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      const k = 'stroke="#1b1b1b" stroke-width="2"', kn = 'fill="none" ' + k;
      let o = `<rect width="400" height="300" fill="#fbf8f0"/>`;
      S.def('zz1', '<pattern id="zz1" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="2" fill="#1b1b1b"/></pattern>');
      S.def('zz2', '<pattern id="zz2" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 6 Q3 0 6 6 T12 6" fill="none" stroke="#1b1b1b" stroke-width="1.5"/></pattern>');
      S.def('zz3', '<pattern id="zz3" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0 V8" stroke="#1b1b1b" stroke-width="2"/></pattern>');
      S.def('zz4', '<pattern id="zz4" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="#1b1b1b"/><rect x="8" y="8" width="8" height="8" fill="#1b1b1b"/></pattern>');
      o += `<path d="M40 40 C140 20 180 120 120 160 C80 190 30 120 40 40 Z" fill="url(#zz1)" ${k}/>`;
      o += `<path d="M150 30 H360 C370 100 300 120 240 110 C190 100 170 70 150 30 Z" fill="url(#zz2)" ${k}/>`;
      o += `<path d="M130 170 C200 120 300 130 360 160 C350 220 280 270 200 270 C150 270 120 220 130 170 Z" fill="url(#zz3)" ${k}/>`;
      o += `<circle cx="80" cy="240" r="40" fill="url(#zz4)" ${k}/>`;
      o += `<circle cx="250" cy="200" r="34" fill="#fbf8f0" ${k}/>` + [10, 18, 26].map(r => `<circle cx="250" cy="200" r="${r}" ${kn}/>`).join('');
      o += `<rect x="20" y="20" width="360" height="260" rx="8" ${kn}/>`;
      return o;
    }
  });

  add('tribal', {
    nombre: 'Tribal', grupo: 'Estéticas',
    dibujo(S) {
      const lado = sx => `<path d="M200 60 C${200 + sx * 30} 100 ${200 + sx * 40} 140 ${200 + sx * 120} 120 C${200 + sx * 90} 140 ${200 + sx * 70} 150 ${200 + sx * 150} 180 C${200 + sx * 90} 180 ${200 + sx * 60} 170 ${200 + sx * 40} 200 C${200 + sx * 70} 220 ${200 + sx * 90} 240 ${200 + sx * 100} 270 C${200 + sx * 60} 250 ${200 + sx * 30} 230 200 250 Z" ${S.f('#141414')}/>`;
      return lado(-1) + lado(1) + `<path d="M200 20 L214 70 L200 100 L186 70 Z" ${S.f('#141414')}/>`;
    }
  });

  add('boho', {
    nombre: 'Boho', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#f4e6d4', '#ecd8c0', 'boC');
      const cols = ['#c9643c', '#e0a46a', '#d9b98a', '#8a9a6a'];
      cols.forEach((c, i) => { const r = 120 - i * 26; o += `<path d="M${200 - r} 240 A${r} ${r} 0 0 1 ${200 + r} 240" ${S.k(c, 22)}/>`; });
      o += `<circle cx="200" cy="240" r="20" ${S.f('#c9643c')}/>`;
      o += `<path d="M60 250 C50 200 70 150 60 110" ${S.k('#a8845a', 3)}/>` + Array.from({ length: 9 }, (_, i) => `<ellipse cx="${66 - (i % 2) * 12}" cy="${120 + i * 14}" rx="12" ry="4" transform="rotate(${i % 2 ? -30 : 30} ${66 - (i % 2) * 12} ${120 + i * 14})" ${S.f('#e6d2b0')}/>`).join('');
      o += `<path d="M0 250 H400 V300 H0Z" ${S.f('#d9bf9e')}/>` + [40, 120, 200, 280, 360].map(x => `<polygon points="${x - 14},270 ${x},258 ${x + 14},270 ${x},282" ${S.f('#c9643c')}/>`).join('');
      return o;
    }
  });

  add('artdeco', {
    nombre: 'Art déco', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = S.fondo('#11161c', '#1a222c', 'adC');
      const oro = S.lg('adG', ['#f6dc9a', '#c99a3e', '#8a6420']);
      for (let i = 0; i < 13; i++) {
        const a = 180 + i * 15;
        o += `<path d="M200 250 L${r1(200 + Math.cos(a * Math.PI / 180) * 210)} ${r1(250 + Math.sin(a * Math.PI / 180) * 210)}" stroke="${oro}" stroke-width="${i % 2 ? 1.5 : 4}"/>`;
      }
      o += [60, 90, 120].map(r => `<path d="M${200 - r} 250 A${r} ${r} 0 0 1 ${200 + r} 250" fill="none" stroke="${oro}" stroke-width="3"/>`).join('');
      o += `<path d="M150 250 V150 L200 100 L250 150 V250" fill="#11161c" stroke="${oro}" stroke-width="4"/><path d="M175 250 V160 L200 135 L225 160 V250" fill="none" stroke="${oro}" stroke-width="2"/>`;
      o += `<rect x="20" y="20" width="360" height="260" fill="none" stroke="${oro}" stroke-width="3"/><rect x="30" y="30" width="340" height="240" fill="none" stroke="${oro}" stroke-width="1"/>`;
      o += `<path d="M0 250 H400" stroke="${oro}" stroke-width="4"/>`;
      return o;
    }
  });

  add('bauhaus', {
    nombre: 'Bauhaus', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#f1e9d8')}/>`;
      o += `<rect x="30" y="30" width="160" height="160" ${S.f('#1d4ea1')}/><circle cx="110" cy="110" r="64" ${S.f('#f2c230')}/>`;
      o += `<path d="M210 30 H370 V190 A160 160 0 0 1 210 30 Z" ${S.f('#d9362b')}/>`;
      o += `<polygon points="210,270 290,200 370,270" ${S.f('#1b1b1b')}/><rect x="30" y="210" width="160" height="20" ${S.f('#1b1b1b')}/><rect x="30" y="246" width="100" height="20" ${S.f('#d9362b')}/>`;
      o += `<circle cx="330" cy="70" r="18" ${S.f('#f1e9d8')}/>`;
      return o;
    }
  });

  add('memphis', {
    nombre: 'Memphis', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#fff4e8')}/>`;
      S.def('mpD', '<pattern id="mpD" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="2.2" fill="#1b1b1b"/></pattern>');
      o += `<rect x="40" y="40" width="120" height="90" fill="url(#mpD)"/><circle cx="270" cy="100" r="60" ${S.f('#ff8ab0')}/><polygon points="100,270 160,170 220,270" ${S.f('#3ad6c0')}/>`;
      o += `<path d="M230 220 Q250 190 270 220 T310 220 T350 220" ${S.k('#1b1b1b', 7)}/><path d="M40 170 L90 200" ${S.k('#ffd23f', 12)}/>`;
      o += `<rect x="300" y="150" width="60" height="60" ${S.f('#ffd23f')}/><path d="M300 150 L360 210 M330 150 L360 180" ${S.k('#1b1b1b', 4)}/>`;
      o += `<path d="M180 40 L200 60 M200 40 L180 60 M340 260 l12 12 m0 -12 l-12 12" ${S.k('#5a6ae8', 5)}/><circle cx="220" cy="140" r="12" ${S.k('#1b1b1b', 4)}/>`;
      return o;
    }
  });

  add('degradado', {
    nombre: 'Degradado fluido', grupo: 'Estéticas', escena: true,
    dibujo(S) {
      S.def('dgB', `<filter id="dgB" ${M.util.FR}><feGaussianBlur stdDeviation="40"/></filter>`);
      return `<rect width="400" height="300" fill="#6a5af9"/><g filter="url(#dgB)"><circle cx="80" cy="60" r="140" fill="#ff7ac6"/><circle cx="360" cy="80" r="120" fill="#ffd36e"/><circle cx="300" cy="280" r="140" fill="#3ad6f0"/><circle cx="60" cy="280" r="100" fill="#7a4af0"/></g>`;
    }
  });

  add('quilling', {
    nombre: 'Quilling', grupo: 'Artesanía',
    dibujo(S) {
      const espiral = (cx, cy, r, c) => {
        let d = `M${cx} ${cy}`;
        for (let t = 0; t < 22; t += 0.4) d += ` L${r1(cx + Math.cos(t) * r * t / 22)} ${r1(cy + Math.sin(t) * r * t / 22)}`;
        return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}" opacity=".25"/><path d="${d}" fill="none" stroke="${c}" stroke-width="3"/>`;
      };
      let o = '';
      const cols = ['#e2574c', '#f2a531', '#c0395a', '#e07a9a', '#f2c14e', '#d9674a'];
      for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; o += espiral(r1(200 + Math.cos(a) * 52), r1(130 + Math.sin(a) * 52), 30, cols[i]); }
      o += espiral(200, 130, 24, '#5a3a6a');
      o += `<path d="M200 186 C196 220 204 250 200 290" ${S.k('#4f9a4a', 4)}/>` + espiral(160, 240, 20, '#4f9a4a') + espiral(240, 226, 20, '#3f8a44');
      return o;
    }
  });

  add('libro-popup', {
    nombre: 'Libro pop-up', grupo: 'Artesanía',
    dibujo(S) {
      let o = S.sombra(200, 270, 170, 10);
      o += `<path d="M30 250 L200 230 L370 250 L370 262 L200 244 L30 262 Z" ${S.f('#8a4a3a')}/><path d="M40 246 L200 228 L360 246 L200 236 Z" ${S.f('#f6efe2')}/>`;
      o += `<path d="M70 236 C90 180 140 180 160 234 Z" ${S.f('#7fbf6a')}/><path d="M230 234 C250 170 310 170 330 236 Z" ${S.f('#5fa65a')}/>`;
      o += `<rect x="160" y="140" width="80" height="92" ${S.f('#f4e6d0')}/><polygon points="150,144 200,96 250,144" ${S.f('#c0533c')}/><rect x="188" y="196" width="24" height="36" ${S.f('#6a4a34')}/><rect x="170" y="160" width="18" height="18" ${S.f('#ffe7a8')}/><rect x="212" y="160" width="18" height="18" ${S.f('#ffe7a8')}/>`;
      o += `<circle cx="300" cy="90" r="22" ${S.f('#f2c14e')}/><path d="M300 112 V228" ${S.k('#c9b8a0', 1.5)}/><path d="M90 70 C100 56 130 56 136 70 C146 66 156 76 150 84 H86 C78 80 82 70 90 70 Z" ${S.f('#ffffff')}/><path d="M118 84 V228" ${S.k('#c9b8a0', 1.5)}/>`;
      return o;
    }
  });

  add('marioneta', {
    nombre: 'Marioneta', grupo: 'Artesanía',
    dibujo(S) {
      let o = `<rect x="120" y="20" width="160" height="12" rx="4" ${S.f('#8a5a3a')}/><rect x="194" y="10" width="12" height="40" rx="4" ${S.f('#8a5a3a')}/>`;
      o += `<path d="M130 32 L150 150 M270 32 L250 150 M200 46 L200 70 M160 32 L172 258 M240 32 L228 258" ${S.k('#9a948a', 1.2)}/>`;
      o += `<circle cx="200" cy="96" r="28" ${S.f('#e2b07a')}/><circle cx="190" cy="92" r="3.5" ${S.f('#2a1a10')}/><circle cx="210" cy="92" r="3.5" ${S.f('#2a1a10')}/><circle cx="200" cy="104" r="4" ${S.f('#c0533c')}/><path d="M176 74 Q200 54 224 74 L222 66 Q200 48 178 66 Z" ${S.f('#c0533c')}/>`;
      o += `<rect x="176" y="128" width="48" height="70" rx="8" ${S.f('#3a6aa8')}/><path d="M176 140 L150 150 L146 186 M224 140 L250 150 L254 186" ${S.k('#e2b07a', 9)}/>`;
      o += `<path d="M188 198 L176 258 M212 198 L228 258" ${S.k('#c9a46a', 10)}/><circle cx="176" cy="258" r="7" ${S.f('#5a3a24')}/><circle cx="228" cy="258" r="7" ${S.f('#5a3a24')}/>`;
      o += [[150, 150], [250, 150], [200, 128], [188, 198], [212, 198]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" ${S.f('#5a3a24')}/>`).join('');
      return o;
    }
  });

  /* ============================================================
     IMPRESIÓN Y FORMATOS
     ============================================================ */
  add('revista', {
    nombre: 'Portada de revista', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#e9e4dc')}/>`;
      o += `<g transform="rotate(-3 200 150)"><rect x="112" y="24" width="184" height="264" fill="#000" opacity=".12"/>` + mini(S, 108, 18, 184, 264, '#e8b7a0', '70 10 260 290') + `<rect x="108" y="18" width="184" height="264" fill="none" stroke="#000" stroke-opacity=".1"/>`;
      o += `<text x="200" y="66" text-anchor="middle" font-size="44" ${SERIF} font-weight="700" letter-spacing="2" fill="#c0392b">MODA</text>`;
      o += `<rect x="118" y="196" width="60" height="6" fill="#fff"/><rect x="118" y="208" width="44" height="5" fill="#fff"/><rect x="236" y="104" width="46" height="6" fill="#fff"/><rect x="246" y="116" width="36" height="5" fill="#fff"/>`;
      o += `<rect x="252" y="246" width="30" height="24" fill="#fff"/>` + Array.from({ length: 10 }, (_, i) => `<rect x="${255 + i * 2.6}" y="249" width="${i % 3 ? 1 : 1.8}" height="18" fill="#111"/>`).join('') + '</g>';
      return o;
    }
  });

  add('periodico', {
    nombre: 'Periódico', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#3a3632')}/>`;
      o += `<g transform="rotate(2 200 150)"><rect x="60" y="14" width="280" height="272" ${S.f('#f2ede2')}/>`;
      o += `<text x="200" y="50" text-anchor="middle" font-size="30" ${SERIF} font-weight="700" fill="#1b1b1b">El Diario</text><path d="M74 58 H326 M74 62 H326" ${S.k('#1b1b1b', 1.4)}/>`;
      o += `<rect x="74" y="72" width="252" height="16" ${S.f('#1b1b1b')}/><path d="M80 80 H310" ${S.k('#f2ede2', 6)}/>`;
      S.def('ht', '<pattern id="ht" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#1b1b1b"/></pattern>');
      o += mini(S, 74, 96, 120, 100, '#b9b2a6', '80 20 240 240') + `<rect x="74" y="96" width="120" height="100" fill="url(#ht)" opacity=".35"/>`;
      o += lineas(S, 204, 100, 122, 9, 10.5, '#5a5650', 3) + lineas(S, 74, 208, 74, 7, 10.5, '#5a5650', 3) + lineas(S, 162, 208, 74, 7, 10.5, '#5a5650', 3) + lineas(S, 250, 208, 76, 7, 10.5, '#5a5650', 3) + '</g>';
      return o;
    }
  });

  add('pasaporte', {
    nombre: 'Foto de pasaporte', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#ffffff')}/>`;
      for (let i = 0; i < 4; i++) {
        const x = 40 + (i % 2) * 168, y = 18 + Math.floor(i / 2) * 140;
        o += mini(S, x, y, 152, 128, '#eef1f4', '70 20 260 240');
        o += `<rect x="${x}" y="${y}" width="152" height="128" fill="none" stroke="#d0d4d8" stroke-width="1"/>`;
      }
      o += `<path d="M30 150 H370 M200 10 V290" ${S.k('#8a9aa8', 1, ' stroke-dasharray="4 4"')}/>`;
      return o;
    }
  });

  add('credencial', {
    nombre: 'Tarjeta identificativa', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#dfe6ec')}/>`;
      o += `<rect x="186" y="0" width="28" height="60" ${S.f('#2b59c3')}/><rect x="180" y="52" width="40" height="20" rx="4" ${S.f('#9aa6ad')}/>`;
      o += `<rect x="60" y="66" width="280" height="190" rx="14" ${S.f('#ffffff')}/><rect x="60" y="66" width="280" height="44" rx="14" ${S.f('#2b59c3')}/><rect x="60" y="94" width="280" height="16" ${S.f('#2b59c3')}/>`;
      o += `<circle cx="88" cy="88" r="10" ${S.f('#ffffff')}/><rect x="106" y="82" width="90" height="10" rx="3" ${S.f('#ffffff')}/>`;
      o += mini(S, 78, 124, 92, 112, '#e7eef6', '80 30 240 250') + lineas(S, 186, 136, 130, 3, 18, '#2a2e34', 7) + lineas(S, 186, 190, 120, 2, 12, '#9aa6ad', 4);
      o += Array.from({ length: 22 }, (_, i) => `<rect x="${186 + i * 5.6}" y="222" width="${i % 3 ? 2 : 3.4}" height="22" fill="#1b1b1b"/>`).join('');
      return o;
    }
  });

  add('carta', {
    nombre: 'Carta coleccionable', grupo: 'Impresión',
    dibujo(S) {
      const marco = S.lg('crG', ['#f2c14e', '#e07a4f', '#c0395a']);
      let o = S.sombra(204, 286, 90, 8);
      o += `<rect x="120" y="14" width="160" height="268" rx="12" fill="${marco}"/><rect x="130" y="24" width="140" height="248" rx="6" ${S.f('#fff6e0')}/>`;
      o += `<rect x="138" y="32" width="124" height="20" rx="4" ${S.f('#2a2e34')}/><text x="146" y="47" font-size="12" font-weight="700" fill="#fff6e0" ${SANS}>HÉROE</text><text x="254" y="47" text-anchor="end" font-size="12" font-weight="700" fill="#f2c14e" ${SANS}>★ 98</text>`;
      o += mini(S, 138, 58, 124, 108, '#9fd0f0', '80 20 240 220');
      o += [['ATQ', 0.8, '#e2574c'], ['DEF', 0.6, '#3b82f6'], ['VEL', 0.9, '#3aa65a']].map(([t, v, c], i) => `<text x="140" y="${190 + i * 22}" font-size="10" font-weight="700" fill="#2a2e34" ${SANS}>${t}</text><rect x="168" y="${182 + i * 22}" width="86" height="9" rx="4" ${S.f('#e6dccb')}/><rect x="168" y="${182 + i * 22}" width="${86 * v}" height="9" rx="4" ${S.f(c)}/>`).join('');
      return o;
    }
  });

  add('poster', {
    nombre: 'Póster de cine', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#1b1b1b')}/>`;
      o += `<rect x="110" y="8" width="180" height="284" ${S.f('#0e1a2a')}/>`;
      o += `<svg x="110" y="8" width="180" height="200" viewBox="60 10 280 290" preserveAspectRatio="xMidYMid slice"><rect x="-50" width="500" height="400" fill="${S.lg('poG', ['#ff8a3a', '#2a1a4a'])}"/>${M.motivos.retrato.dibujo(S, '', {})}</svg>`;
      o += `<rect x="110" y="180" width="180" height="40" fill="${S.lg('poF', [['#0e1a2a', 0], ['#0e1a2a', 1]])}" opacity=".9"/>`;
      o += `<text x="200" y="232" text-anchor="middle" font-size="30" ${BLACK} fill="#f2c14e" letter-spacing="1">ECLIPSE</text>`;
      o += `<rect x="130" y="244" width="140" height="3" fill="#c9c2b6"/><rect x="140" y="252" width="120" height="3" fill="#c9c2b6"/><rect x="150" y="260" width="100" height="3" fill="#c9c2b6"/><text x="200" y="282" text-anchor="middle" font-size="9" fill="#c9c2b6" ${SANS} letter-spacing="2">PRÓXIMAMENTE</text>`;
      return o;
    }
  });

  add('valla', {
    nombre: 'Valla publicitaria', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = S.fondo('#8cc1e6', '#eef3ea', 'vaC');
      o += `<path d="M0 230 H400 V300 H0Z" ${S.f('#8fae74')}/><path d="M0 250 H400 V270 H0Z" ${S.f('#4a4f55')}/>`;
      o += `<path d="M150 236 V170 M250 236 V170" ${S.k('#5a6068', 8)}/><rect x="60" y="40" width="280" height="140" ${S.f('#2a2e34')}/>`;
      o += `<rect x="68" y="48" width="264" height="124" ${S.f('#f2c14e')}/>` + mini(S, 220, 48, 112, 124, '#e07a4f', '90 30 220 260');
      o += `<text x="80" y="104" font-size="34" ${BLACK} fill="#1b1b1b">VERANO</text><rect x="80" y="118" width="110" height="8" ${S.f('#1b1b1b')}/><rect x="80" y="134" width="80" height="8" ${S.f('#1b1b1b')}/>`;
      o += `<path d="M80 186 H320" ${S.k('#5a6068', 4)}/>`;
      return o;
    }
  });

  add('album', {
    nombre: 'Portada de álbum', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#e6e0d6')}/>`;
      o += `<circle cx="250" cy="150" r="120" ${S.f('#151515')}/>` + [100, 80, 60].map(r => `<circle cx="250" cy="150" r="${r}" ${S.k('#2a2a2a', 1.5)}/>`).join('') + `<circle cx="250" cy="150" r="34" ${S.f('#e07a4f')}/><circle cx="250" cy="150" r="4" ${S.f('#e6e0d6')}/>`;
      o += `<rect x="40" y="30" width="240" height="240" ${S.f('#2b59c3')}/>`;
      o += `<circle cx="160" cy="150" r="80" ${S.f('#f2c14e')}/><path d="M40 210 L280 130 V270 H40Z" ${S.f('#e2574c')}/><text x="56" y="62" font-size="20" ${BLACK} fill="#fff" letter-spacing="2">ONDAS</text>`;
      return o;
    }
  });

  add('vinilo', {
    nombre: 'Disco de vinilo', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#2a2622')}/>`;
      o += `<rect x="30" y="40" width="220" height="220" ${S.f('#d9c8a8')}/><text x="50" y="90" font-size="30" ${SERIF} font-style="italic" fill="#7a2a1f">Jazz</text><text x="50" y="118" font-size="14" ${SERIF} fill="#7a2a1f">Sesiones</text><circle cx="180" cy="200" r="40" ${S.f('#7a2a1f')}/><circle cx="180" cy="200" r="20" ${S.f('#d9c8a8')}/>`;
      o += `<circle cx="270" cy="150" r="110" ${S.f('#111')}/>` + [96, 84, 72, 60, 50].map(r => `<circle cx="270" cy="150" r="${r}" ${S.k('#262626', 1.4)}/>`).join('') + `<path d="M200 80 A100 100 0 0 1 340 100" ${S.k('#5a5a5a', 3, ' opacity=".6"')}/>`;
      o += `<circle cx="270" cy="150" r="34" ${S.f('#c0533c')}/><circle cx="270" cy="150" r="4" ${S.f('#2a2622')}/>`;
      o += `<rect x="30" y="40" width="160" height="220" ${S.f('#d9c8a8')}/><text x="50" y="90" font-size="30" ${SERIF} font-style="italic" fill="#7a2a1f">Jazz</text><text x="50" y="118" font-size="14" ${SERIF} fill="#7a2a1f">Sesiones</text><circle cx="120" cy="196" r="40" ${S.f('#7a2a1f')}/><circle cx="120" cy="196" r="20" ${S.f('#d9c8a8')}/>`;
      return o;
    }
  });

  function libro(S, titulo, col, deco) {
    let o = S.sombra(210, 270, 110, 9);
    o += `<path d="M132 24 H284 Q292 24 292 32 V262 Q292 270 284 270 H132 Z" ${S.f(shade(col, -0.35))}/>`;
    o += `<rect x="112" y="20" width="172" height="246" rx="4" ${S.f(col)}/><rect x="112" y="20" width="14" height="246" ${S.f(shade(col, -0.25))}/>`;
    return o + deco + `<text x="205" y="${titulo.y || 80}" text-anchor="middle" font-size="${titulo.s || 26}" ${titulo.f || SERIF} font-weight="700" fill="${titulo.c || '#f6efe2'}">${titulo.t}</text>`;
  }
  add('libro', {
    nombre: 'Cubierta de libro', grupo: 'Impresión', variantes: { infantil: 'Cuento infantil' },
    dibujo(S, v) {
      if (v === 'infantil') {
        const deco = `<rect x="136" y="100" width="138" height="140" rx="10" ${S.f('#bfe6f2')}/><circle cx="244" cy="128" r="16" ${S.f('#ffd36e')}/><path d="M136 200 C170 180 220 186 274 200 V240 H136Z" ${S.f('#8fd07a')}/><g transform="translate(176 172)"><circle r="20" ${S.f('#f6a04a')}/><path d="M-16 -12 L-12 -30 L-2 -18 Z M16 -12 L12 -30 L2 -18 Z" ${S.f('#f6a04a')}/><circle cx="-7" cy="-2" r="3" fill="#2a1a10"/><circle cx="7" cy="-2" r="3" fill="#2a1a10"/></g>`;
        return libro(S, { t: 'El zorro', s: 28, f: `font-family="'Comic Sans MS', 'Trebuchet MS', sans-serif"`, c: '#fff' }, '#ff7a6a', deco);
      }
      const deco = `<circle cx="205" cy="160" r="50" ${S.f('#f2c14e')}/><path d="M150 236 H260" ${S.k('#f6efe2', 2)}/><text x="205" y="254" text-anchor="middle" font-size="11" ${SANS} letter-spacing="3" fill="#f6efe2">NOVELA</text>`;
      return libro(S, { t: 'El faro', s: 32 }, '#1f3a5a', deco);
    }
  });

  add('grimorio', {
    nombre: 'Libro de hechizos', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = S.fondo('#120c22', '#2a1a40', 'grC');
      o += S.halo(200, 130, 140, '#9a6aff', 0.55);
      o += `<path d="M40 230 L200 250 L360 230 L360 244 L200 264 L40 244 Z" ${S.f('#4a2a1a')}/><path d="M50 226 Q120 196 196 230 L196 246 Q120 214 50 240 Z M350 226 Q280 196 204 230 L204 246 Q280 214 350 240 Z" ${S.f('#f2e2bf')}/>`;
      o += `<path d="M80 222 Q120 206 170 224 M84 232 Q120 218 166 234 M230 224 Q280 206 320 222 M234 234 Q280 218 316 232" ${S.k('#8a6a4a', 1.6)}/>`;
      o += `<polygon points="${star(200, 140, 30, 12, 5)}" ${S.k('#d6c2ff', 2.5)}/><circle cx="200" cy="140" r="40" ${S.k('#d6c2ff', 2)}/>`;
      const r = rng(6);
      for (let i = 0; i < 24; i++) o += `<circle cx="${r1(120 + r() * 160)}" cy="${r1(60 + r() * 150)}" r="${r1(1 + r() * 2.4)}" fill="#f6e8ff" opacity="${r1(0.4 + r() * 0.6)}"/>`;
      return o;
    }
  });

  add('pergamino', {
    nombre: 'Pergamino', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#5a3e2a')}/>`;
      o += `<rect x="90" y="50" width="220" height="200" ${S.f('#ead7ae')}/>`;
      o += `<rect x="78" y="34" width="244" height="26" rx="13" ${S.f('#d9c08a')}/><rect x="78" y="240" width="244" height="26" rx="13" ${S.f('#d9c08a')}/><circle cx="78" cy="47" r="13" ${S.f('#b89a5a')}/><circle cx="322" cy="47" r="13" ${S.f('#b89a5a')}/><circle cx="78" cy="253" r="13" ${S.f('#b89a5a')}/><circle cx="322" cy="253" r="13" ${S.f('#b89a5a')}/>`;
      o += `<text x="200" y="98" text-anchor="middle" font-size="22" ${SERIF} font-style="italic" fill="#5a3a24">Edicto real</text>` + lineas(S, 116, 120, 168, 7, 15, '#8a6a4a', 2.4);
      o += `<circle cx="270" cy="220" r="14" ${S.f('#a5302a')}/>`;
      return o;
    }
  });

  add('mapa', {
    nombre: 'Mapa ilustrado', grupo: 'Impresión', escena: true, variantes: { tesoro: 'Mapa del tesoro' },
    dibujo(S, v) {
      const tesoro = v === 'tesoro';
      let o = `<rect width="400" height="300" ${S.f(tesoro ? '#3a2a1e' : '#9cc8e0')}/>`;
      if (tesoro) {
        o += `<path d="M30 30 L90 20 L150 34 L230 18 L300 30 L372 22 L380 90 L370 160 L384 230 L366 282 L290 272 L210 286 L130 274 L60 284 L24 250 L34 170 L20 100 Z" ${S.f('#e6cc94')}/>`;
        o += `<path d="M30 30 L90 20 L150 34 L230 18 L300 30 L372 22 L380 90 L370 160 L384 230 L366 282 L290 272 L210 286 L130 274 L60 284 L24 250 L34 170 L20 100 Z" ${S.k('#8a5a2a', 4)}/>`;
      }
      o += `<path d="M70 90 C100 50 180 60 220 80 C270 60 330 90 320 140 C340 190 290 240 220 230 C170 250 100 240 90 190 C50 170 50 120 70 90 Z" ${S.f(tesoro ? '#d9b878' : '#e8dcb0')}/>`;
      o += `<path d="M120 110 L136 90 L152 110 Z M150 120 L166 98 L182 120 Z" ${S.f(tesoro ? '#8a6a4a' : '#9a8a6a')}/>` + [[240, 120], [260, 150], [220, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" ${S.f(tesoro ? '#6a8a4a' : '#7fae5c')}/>`).join('');
      if (tesoro) o += `<path d="M110 200 C140 210 160 180 190 190 S240 210 260 180" ${S.k('#a5302a', 3, ' stroke-dasharray="8 6"')}/><path d="M252 168 L272 188 M272 168 L252 188" ${S.k('#a5302a', 5)}/>`;
      else o += `<path d="M120 170 C160 160 200 190 250 170" ${S.k('#5a9ac4', 3)}/><circle cx="250" cy="200" r="6" ${S.f('#c0533c')}/><circle cx="140" cy="150" r="5" ${S.f('#c0533c')}/>`;
      o += `<g transform="translate(340 240)"><circle r="26" ${S.f(tesoro ? '#e6cc94' : '#f6f0de')}/><polygon points="0,-24 6,0 0,24 -6,0" ${S.f(tesoro ? '#8a5a2a' : '#c0533c')}/><polygon points="-24,0 0,-5 24,0 0,5" ${S.f('#5a4a3a')}/></g>`;
      return o;
    }
  });

  add('naipe', {
    nombre: 'Naipe', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#1e5a3a')}/>`;
      o += `<g transform="rotate(-8 160 150)"><rect x="90" y="40" width="150" height="220" rx="12" ${S.f('#fbf8f2')}/><text x="104" y="74" font-size="26" ${SERIF} font-weight="700" fill="#1b1b1b">A</text><text x="226" y="244" font-size="26" ${SERIF} font-weight="700" fill="#1b1b1b" text-anchor="end" transform="rotate(180 218 236)">A</text>`;
      o += `<path d="M165 110 C140 140 120 156 128 180 C134 198 156 200 162 186 L156 214 H174 L168 186 C174 200 196 198 202 180 C210 156 190 140 165 110 Z" ${S.f('#1b1b1b')}/></g>`;
      o += `<g transform="rotate(8 250 150)"><rect x="180" y="44" width="150" height="220" rx="12" ${S.f('#fbf8f2')}/><text x="194" y="78" font-size="26" ${SERIF} font-weight="700" fill="#c0392b">K</text>`;
      o += `<path d="M255 120 C240 100 210 108 218 132 C224 150 255 168 255 168 C255 168 286 150 292 132 C300 108 270 100 255 120 Z" ${S.f('#c0392b')}/><polygon points="230,200 240,184 250,198 260,180 270,198 280,184 290,200 286,216 234,216" ${S.f('#f2c14e')}/></g>`;
      return o;
    }
  });

  add('tarot', {
    nombre: 'Carta de tarot', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#2a1f3a')}/>`;
      o += `<rect x="120" y="14" width="160" height="272" rx="8" ${S.f('#f2e6c8')}/><rect x="130" y="24" width="140" height="252" rx="4" fill="none" stroke="#b8862e" stroke-width="3"/>`;
      o += `<text x="200" y="52" text-anchor="middle" font-size="18" ${SERIF} fill="#5a3a24">XIX</text><text x="200" y="266" text-anchor="middle" font-size="15" ${SERIF} letter-spacing="2" fill="#5a3a24">EL SOL</text>`;
      o += `<rect x="140" y="62" width="120" height="180" ${S.f('#1f2a5a')}/>`;
      for (let i = 0; i < 16; i++) { const a = i * 22.5 * Math.PI / 180; o += `<path d="M200 140 L${r1(200 + Math.cos(a) * 56)} ${r1(140 + Math.sin(a) * 56)}" ${S.k('#f2c14e', i % 2 ? 2 : 4)}/>`; }
      o += `<circle cx="200" cy="140" r="30" ${S.f('#f2c14e')}/><circle cx="191" cy="136" r="3" ${S.f('#8a5a2a')}/><circle cx="209" cy="136" r="3" ${S.f('#8a5a2a')}/><path d="M190 150 Q200 156 210 150" ${S.k('#8a5a2a', 2)}/>`;
      o += `<path d="M140 222 C170 206 230 206 260 222 V242 H140Z" ${S.f('#6a8a4a')}/>`;
      return o;
    }
  });

  add('sello', {
    nombre: 'Sello postal', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#e9dfcc')}/>`;
      let d = '';
      const x0 = 110, y0 = 30, w = 180, h = 240, r = 7;
      for (let x = x0; x <= x0 + w; x += 18) d += `<circle cx="${x}" cy="${y0}" r="${r}" fill="#e9dfcc"/><circle cx="${x}" cy="${y0 + h}" r="${r}" fill="#e9dfcc"/>`;
      for (let y = y0; y <= y0 + h; y += 20) d += `<circle cx="${x0}" cy="${y}" r="${r}" fill="#e9dfcc"/><circle cx="${x0 + w}" cy="${y}" r="${r}" fill="#e9dfcc"/>`;
      o += `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" ${S.f('#fbf6ea')}/>` + d;
      o += `<rect x="128" y="48" width="144" height="170" ${S.f('#c96a4a')}/>`;
      o += `<circle cx="200" cy="110" r="30" ${S.f('#f2c14e')}/><path d="M128 190 L170 140 L200 170 L230 130 L272 190 V218 H128Z" ${S.f('#7a3a2a')}/>`;
      o += `<text x="140" y="248" font-size="14" ${SERIF} font-weight="700" fill="#7a3a2a">CORREOS</text><text x="262" y="248" font-size="16" text-anchor="end" ${SERIF} font-weight="700" fill="#7a3a2a">2,50</text>`;
      o += `<path d="M250 30 C300 60 330 120 320 200" ${S.k('#3a3a3a', 2.4, ' opacity=".55"')}/><path d="M262 40 C310 70 340 130 332 200" ${S.k('#3a3a3a', 2.4, ' opacity=".55"')}/>`;
      return o;
    }
  });

  add('moneda', {
    nombre: 'Moneda', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#1f2328')}/>`;
      const oro = S.rg('moG', [['#fff1b8', 0], ['#e6b84a', 0.5], ['#9a6a1e', 1]], 0.35, 0.3, 0.8);
      o += S.sombra(214, 270, 120, 12, 0.4) + `<circle cx="200" cy="150" r="118" fill="${oro}"/><circle cx="200" cy="150" r="104" fill="none" stroke="#9a6a1e" stroke-width="3"/>`;
      o += Array.from({ length: 60 }, (_, i) => { const a = i * 6 * Math.PI / 180; return `<path d="M${r1(200 + Math.cos(a) * 112)} ${r1(150 + Math.sin(a) * 112)} L${r1(200 + Math.cos(a) * 118)} ${r1(150 + Math.sin(a) * 118)}" stroke="#9a6a1e" stroke-width="2"/>`; }).join('');
      o += `<g transform="translate(200 158) scale(.62) translate(-200 -150)" fill="#c99a3a"><path d="M150 112 C150 72 176 52 206 52 C236 54 250 80 248 104 L262 132 L248 136 C250 160 236 182 212 186 L206 230 L150 230 C160 200 156 170 150 150 Z" fill="#b8862e"/><path d="M150 112 C150 72 176 52 206 52 C236 54 250 80 248 104" fill="none" stroke="#fff1b8" stroke-width="5" opacity=".6"/></g>`;
      o += `<path id="moT" d="M120 150 A80 80 0 0 1 280 150" fill="none"/><text font-size="16" ${SERIF} font-weight="700" fill="#7a5214" letter-spacing="4"><textPath href="#moT" startOffset="50%" text-anchor="middle">MMXXVI</textPath></text>`;
      return o;
    }
  });

  add('billete', {
    nombre: 'Billete', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#2a2e2a')}/>`;
      o += `<g transform="rotate(-4 200 150)"><rect x="30" y="70" width="340" height="164" rx="6" ${S.f('#cfe2c4')}/><rect x="40" y="80" width="320" height="144" rx="4" fill="none" stroke="#3a6a4a" stroke-width="3"/>`;
      o += Array.from({ length: 12 }, (_, i) => `<path d="M40 ${100 + i * 10} C120 ${80 + i * 10} 200 ${130 + i * 10} 360 ${96 + i * 10}" fill="none" stroke="#7aa88a" stroke-width=".8" opacity=".7"/>`).join('');
      o += `<ellipse cx="270" cy="152" rx="56" ry="62" ${S.f('#e6f0de')}/>` + `<svg x="220" y="96" width="100" height="112" viewBox="100 30 200 230">${M.motivos.retrato.dibujo(Object.assign({}, S, { f: (c, e = '') => `fill="#3a6a4a" opacity=".85"${e}`, k: (c, w) => `fill="none" stroke="#cfe2c4" stroke-width="${w}"` }), '', {})}</svg>`;
      o += `<text x="60" y="120" font-size="40" ${SERIF} font-weight="700" fill="#2a5a3a">50</text><text x="60" y="214" font-size="13" ${SERIF} letter-spacing="2" fill="#2a5a3a">BANCO CENTRAL</text><circle cx="160" cy="160" r="18" fill="none" stroke="#2a5a3a" stroke-width="2"/></g>`;
      return o;
    }
  });

  add('lacre', {
    nombre: 'Sello de lacre', grupo: 'Impresión', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#efe6d2')}/><path d="M0 0 L200 150 L400 0" ${S.k('#d6c8ac', 3)}/><path d="M0 300 L170 130 M400 300 L230 130" ${S.k('#d6c8ac', 2)}/>`;
      const g = S.rg('laG', [['#e0574c', 0], ['#a5231e', 0.7], ['#6a1410', 1]], 0.4, 0.35, 0.7);
      o += S.sombra(206, 162, 76, 70, 0.2) + `<path d="M200 76 C236 70 268 92 274 120 C292 140 286 176 266 194 C252 222 214 232 190 222 C158 224 130 200 126 172 C112 146 124 110 150 98 C164 82 182 76 200 76 Z" fill="${g}"/>`;
      o += `<circle cx="200" cy="150" r="48" fill="none" stroke="#7a1612" stroke-width="3"/><text x="200" y="168" text-anchor="middle" font-size="50" ${SERIF} font-style="italic" font-weight="700" fill="#7a1612">A</text>`;
      return o;
    }
  });

  function escudo(S, cuerpo, fondo = '#1f3a6e') {
    return `<path d="M120 50 H280 V150 C280 210 240 248 200 266 C160 248 120 210 120 150 Z" ${S.f(fondo)}/><path d="M120 50 H280 V150 C280 210 240 248 200 266 C160 248 120 210 120 150 Z" ${S.k('#d9a640', 7)}/>` + cuerpo;
  }
  add('escudo', {
    nombre: 'Escudo familiar', grupo: 'Marca',
    dibujo(S) {
      return S.sombra(200, 276, 80, 8) + escudo(S, `<path d="M120 50 L280 210 M280 50 L160 170" ${S.k('#f6efe2', 0)}/><path d="M200 50 V266 M120 140 H280" ${S.k('#d9a640', 6)}/><polygon points="${star(160, 96, 20, 8, 5)}" ${S.f('#f6efe2')}/><circle cx="240" cy="96" r="18" ${S.f('#c0392b')}/><path d="M160 180 L176 210 L144 210 Z" ${S.f('#f6efe2')}/><rect x="226" y="176" width="28" height="34" ${S.f('#c0392b')}/>`);
    }
  });
  add('blason', {
    nombre: 'Escudo de armas', grupo: 'Marca',
    dibujo(S) {
      let o = `<path d="M60 230 C40 180 70 120 100 100 C96 140 110 170 126 180 Z M340 230 C360 180 330 120 300 100 C304 140 290 170 274 180 Z" ${S.f('#d9a640')}/>`;
      o += `<polygon points="160,40 170,14 185,32 200,8 215,32 230,14 240,40" ${S.f('#f2c14e')}/><rect x="158" y="38" width="84" height="10" ${S.f('#d9a640')}/>`;
      o += escudo(S, `<path d="M160 110 C170 90 190 90 196 108 C204 90 226 90 236 110 C240 140 224 170 200 186 C176 170 160 140 160 110 Z" ${S.f('#c0392b')}/>`, '#f6efe2');
      o += `<path d="M80 250 Q200 290 320 250 L330 270 Q200 306 70 270 Z" ${S.f('#c0392b')}/>`;
      return o;
    }
  });
  add('emblema', {
    nombre: 'Emblema', grupo: 'Marca',
    dibujo(S) {
      let o = S.sombra(200, 268, 90, 8);
      o += `<circle cx="200" cy="150" r="108" ${S.f('#1f2a3a')}/><circle cx="200" cy="150" r="96" ${S.k('#d9a640', 4)}/><circle cx="200" cy="150" r="62" ${S.f('#d9a640')}/>`;
      o += `<polygon points="${star(200, 150, 42, 18, 5)}" ${S.f('#1f2a3a')}/>`;
      o += Array.from({ length: 7 }, (_, i) => `<ellipse cx="${r1(200 + Math.cos((150 + i * 12) * Math.PI / 180) * 80)}" cy="${r1(150 + Math.sin((150 + i * 12) * Math.PI / 180) * 80)}" rx="8" ry="4" transform="rotate(${60 + i * 12} ${r1(200 + Math.cos((150 + i * 12) * Math.PI / 180) * 80)} ${r1(150 + Math.sin((150 + i * 12) * Math.PI / 180) * 80)})" ${S.f('#d9a640')}/>`).join('');
      o += Array.from({ length: 7 }, (_, i) => `<ellipse cx="${r1(200 + Math.cos((30 - i * 12) * Math.PI / 180) * 80)}" cy="${r1(150 + Math.sin((30 - i * 12) * Math.PI / 180) * 80)}" rx="8" ry="4" transform="rotate(${-60 - i * 12} ${r1(200 + Math.cos((30 - i * 12) * Math.PI / 180) * 80)} ${r1(150 + Math.sin((30 - i * 12) * Math.PI / 180) * 80)})" ${S.f('#d9a640')}/>`).join('');
      return o;
    }
  });
  add('insignia', {
    nombre: 'Insignia de logro', grupo: 'Marca',
    dibujo(S) {
      let o = `<path d="M160 180 L130 280 L160 266 L176 290 L196 200 Z M240 180 L270 280 L240 266 L224 290 L204 200 Z" ${S.f('#c0392b')}/>`;
      o += `<polygon points="${star(200, 130, 100, 86, 16)}" ${S.f('#f2c14e')}/><circle cx="200" cy="130" r="72" ${S.f('#3b82f6')}/><circle cx="200" cy="130" r="72" ${S.k('#ffffff', 4)}/>`;
      o += `<polygon points="${star(200, 130, 40, 17, 5)}" ${S.f('#ffffff')}/>`;
      return o;
    }
  });
  add('logo', {
    nombre: 'Logotipo', grupo: 'Marca', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#f6f4ef')}/>`;
      o += Array.from({ length: 9 }, (_, i) => `<path d="M${40 + i * 40} 30 V270" ${S.k('#e2ddd2', 1)}/>`).join('') + Array.from({ length: 7 }, (_, i) => `<path d="M40 ${30 + i * 40} H360" ${S.k('#e2ddd2', 1)}/>`).join('');
      o += `<circle cx="160" cy="130" r="46" ${S.f('#2b59c3')}/><path d="M206 84 A46 46 0 0 1 206 176 Z" ${S.f('#f2a531')}/><circle cx="160" cy="130" r="16" ${S.f('#f6f4ef')}/>`;
      o += `<text x="200" y="232" text-anchor="middle" font-size="34" ${SANS} font-weight="700" letter-spacing="-1" fill="#1b1b1b">nodo</text>`;
      return o;
    }
  });
  add('monograma', {
    nombre: 'Monograma', grupo: 'Marca',
    dibujo(S) {
      let o = `<circle cx="200" cy="150" r="110" ${S.f('#1f2a3a')}/><circle cx="200" cy="150" r="98" ${S.k('#d9a640', 2)}/>`;
      o += `<text x="176" y="196" text-anchor="middle" font-size="140" ${SERIF} font-style="italic" fill="#d9a640">A</text><text x="232" y="196" text-anchor="middle" font-size="140" ${SERIF} font-style="italic" fill="#f2dfa8" opacity=".9">M</text>`;
      return o;
    }
  });
  add('emoji', {
    nombre: 'Emoji 3D', grupo: 'Marca',
    dibujo(S) {
      const g = S.rg('emG', [['#fff2a0', 0], ['#ffcf3a', 0.55], ['#f29a1a', 1]], 0.38, 0.3, 0.75);
      let o = S.sombra(204, 270, 90, 10, 0.25) + `<circle cx="200" cy="146" r="110" fill="${g}"/>`;
      o += `<ellipse cx="164" cy="124" rx="12" ry="20" ${S.f('#5a3412')}/><ellipse cx="236" cy="124" rx="12" ry="20" ${S.f('#5a3412')}/>`;
      o += `<path d="M140 168 Q200 230 260 168 Q200 196 140 168 Z" ${S.f('#5a3412')}/><path d="M162 186 Q200 214 238 186 Q200 200 162 186 Z" ${S.f('#ff6a6a')}/>`;
      o += `<ellipse cx="160" cy="82" rx="34" ry="16" fill="#fff" opacity=".45" transform="rotate(-20 160 82)"/>`;
      return o;
    }
  });
  add('icono', {
    nombre: 'Icono de app', grupo: 'Marca', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#eef0f3')}/>`;
      o += S.sombra(200, 252, 90, 10, 0.18) + `<rect x="110" y="60" width="180" height="180" rx="44" fill="${S.lg('icG', ['#7a5af8', '#3b82f6'], 0, 0, 1, 1)}"/>`;
      o += `<path d="M170 110 L250 150 L170 190 Z" fill="#fff" stroke="#fff" stroke-width="10" stroke-linejoin="round"/>`;
      o += [[40, 30], [330, 30], [40, 230], [330, 230]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="40" height="40" rx="10" ${S.f(['#f2a531', '#3aa68a', '#e2574c', '#1b1b1b'][i])} opacity=".35"/>`).join('');
      return o;
    }
  });

  /* ============================================================
     MATERIALES Y OBJETOS BRILLANTES
     ============================================================ */
  add('cristales', {
    nombre: 'Cristales', grupo: 'Objetos',
    dibujo(S) {
      const crist = (x, y, w, h, rot, a, b, c) => `<g transform="rotate(${rot} ${x} ${y})"><polygon points="${x - w},${y} ${x - w},${y - h} ${x},${y - h - w} ${x},${y}" ${S.f(a)}/><polygon points="${x},${y} ${x},${y - h - w} ${x + w},${y - h} ${x + w},${y}" ${S.f(b)}/><polygon points="${x - w * 0.3},${y - h * 0.9} ${x},${y - h - w} ${x + w * 0.2},${y - h * 0.6}" ${S.f(c)}/></g>`;
      let o = S.sombra(200, 258, 120, 10);
      o += `<path d="M90 258 C100 236 150 224 200 226 C250 224 300 236 310 258 Z" ${S.f('#5a5260')}/>`;
      o += crist(150, 250, 22, 90, -18, '#9a7ad8', '#6a4ab0', '#e6d8ff') + crist(250, 250, 20, 80, 16, '#9a7ad8', '#6a4ab0', '#e6d8ff') + crist(200, 246, 30, 130, 0, '#b89af0', '#7a58c8', '#f2eaff');
      return o;
    }
  });
  add('diamante', {
    nombre: 'Diamante', grupo: 'Objetos', escena: true,
    dibujo(S) {
      let o = S.fondo('#141826', '#1f2a40', 'diC') + S.halo(200, 140, 130, '#9fd8ff', 0.35);
      const P = { t1: [140, 100], t2: [260, 100], l: [100, 140], r: [300, 140], b: [200, 260], m1: [170, 140], m2: [230, 140], c: [200, 100] };
      const f = (arr, c) => `<polygon points="${pts(arr.map(k => P[k]))}" ${S.f(c)}/>`;
      o += f(['t1', 'c', 'm1'], '#e8f6ff') + f(['c', 't2', 'm2'], '#cfeeff') + f(['c', 'm1', 'm2'], '#ffffff') + f(['t1', 'l', 'm1'], '#a8dcf6') + f(['t2', 'r', 'm2'], '#8ccbf0');
      o += f(['l', 'm1', 'b'], '#7fbfe6') + f(['m1', 'm2', 'b'], '#b8e4fb') + f(['m2', 'r', 'b'], '#5fa6d6');
      o += `<polygon points="${star(250, 96, 14, 2, 4)}" fill="#fff"/><polygon points="${star(130, 150, 9, 1.5, 4)}" fill="#fff"/>`;
      return o;
    }
  });
  add('casco', {
    nombre: 'Casco', grupo: 'Objetos',
    dibujo(S) {
      const g = S.lg('caG', ['#6a7480', '#3a424c', '#1c2126'], 0, 0, 1, 1);
      let o = S.sombra(204, 270, 120, 10, 0.25);
      o += `<path d="M90 190 C80 110 140 50 210 50 C290 50 330 120 320 200 C318 240 290 262 240 262 H130 C100 262 92 230 90 190 Z" fill="${g}"/>`;
      o += `<path d="M150 120 C180 96 260 96 300 124 C312 150 306 176 290 186 H170 C150 176 144 146 150 120 Z" ${S.f('#151a20')}/><path d="M170 120 C200 108 250 108 280 122" ${S.k('#9fb4c8', 4, ' opacity=".6"')}/>`;
      o += `<path d="M110 120 C130 80 180 60 220 60" ${S.k('#ffffff', 6, ' opacity=".25"')}/>`;
      return o;
    }
  });
  add('gotas', {
    nombre: 'Metal líquido', grupo: 'Objetos',
    dibujo(S) {
      const g = S.lg('goG', ['#ffffff', '#9aa4ac', '#3a424a', '#d8dee2', '#5a646c'], 0, 0, 0.6, 1);
      let o = S.sombra(200, 270, 140, 10);
      o += `<path d="M80 270 C70 240 100 230 120 236 C130 200 170 196 190 212 C200 170 240 160 262 190 C290 180 320 200 312 236 C340 236 350 262 330 270 Z" fill="${g}"/>`;
      o += `<path d="M190 40 C210 80 214 110 214 140 C214 160 200 170 190 170 C178 170 166 160 166 140 C166 110 172 80 190 40 Z" fill="${g}"/><ellipse cx="300" cy="120" rx="26" ry="24" fill="${g}"/><ellipse cx="110" cy="150" rx="16" ry="15" fill="${g}"/>`;
      o += `<path d="M178 80 C176 100 176 120 180 136" ${S.k('#ffffff', 5, ' opacity=".7"')}/>`;
      return o;
    }
  });
  add('burbuja', {
    nombre: 'Pompas iridiscentes', grupo: 'Objetos', escena: true,
    dibujo(S) {
      let o = S.fondo('#2a2f45', '#545a7a', 'buC');
      const pompa = (x, y, r, id) => {
        const g = S.lg(id, ['#ff8ad0', '#ffd36e', '#7cf0c8', '#7ab6ff', '#c79aff'], 0, 0, 1, 1);
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="${g}" opacity=".35"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${g}" stroke-width="${r / 10}"/><ellipse cx="${x - r * 0.4}" cy="${y - r * 0.45}" rx="${r * 0.28}" ry="${r * 0.14}" transform="rotate(-35 ${x - r * 0.4} ${y - r * 0.45})" fill="#fff" opacity=".85"/>`;
      };
      return o + pompa(170, 150, 100, 'bu1') + pompa(310, 90, 46, 'bu2') + pompa(320, 220, 30, 'bu3') + pompa(60, 70, 24, 'bu4');
    }
  });
  add('perlas', {
    nombre: 'Perlas', grupo: 'Objetos', escena: true,
    dibujo(S) {
      let o = S.fondo('#2a1f2a', '#3e2e3c', 'peC');
      const g = S.rg('peG', [['#ffffff', 0], ['#f6e6ee', 0.35], ['#d6cce6', 0.7], ['#a89ab4', 1]], 0.35, 0.3, 0.7);
      for (let i = 0; i < 15; i++) {
        const a = Math.PI * (0.1 + i * 0.058), x = 200 + Math.cos(a) * 150, y = 30 + Math.sin(a) * 200;
        o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="16" fill="${g}"/><circle cx="${r1(x - 5)}" cy="${r1(y - 6)}" r="4" fill="#fff" opacity=".9"/>`;
      }
      o += `<circle cx="200" cy="200" r="40" fill="${g}"/><ellipse cx="186" cy="184" rx="12" ry="7" transform="rotate(-30 186 184)" fill="#fff" opacity=".85"/><path d="M168 220 C186 236 214 236 232 220" ${S.k('#ffd6ec', 4, ' opacity=".7"')}/>`;
      return o;
    }
  });
})();
