/*!
 * Prompt Atlas · Motivos de interfaz, ciencia, videojuegos y objetos
 * Las interfaces usan roles uiFondo, uiPanel, uiTexto, uiSuave, uiAcento, uiAcento2:
 * así las técnicas (modo oscuro, cristal, neón…) pueden recolorearlas.
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const { pts, star, gear, r1, rng, shade } = M.util;
  const add = M.motivo;
  const MONO = `font-family="'Courier New', Menlo, monospace"`;
  const negro = (S, id, a = '#05070f', b = '#141a35') => S.fondo(a, b, id);

  /* ============================================================
     INTERFACES
     ============================================================ */
  const barra = (S, x, y, w, col = 'uiSuave', h = 7) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" ${S.f(col)}/>`;
  const grafica = (S, x, y, w, h) => {
    const p = [0.7, 0.5, 0.62, 0.3, 0.42, 0.18, 0.26].map((v, i) => [x + i * w / 6, y + v * h]);
    return `<path d="M${pts(p).replace(/ /g, ' L')} L${x + w} ${y + h} L${x} ${y + h} Z" fill="${S.col('uiAcento')}" opacity=".15"/><path d="M${pts(p).replace(/ /g, ' L')}" ${S.k('uiAcento', 3)}/>`;
  };

  add('movil', {
    nombre: 'App móvil', grupo: 'Interfaz',
    dibujo(S) {
      let o = S.sombra(200, 290, 80, 6);
      o += `<rect x="128" y="10" width="144" height="284" rx="26" ${S.f('#16191d')}/><rect x="136" y="18" width="128" height="268" rx="20" ${S.f('uiFondo')}/>`;
      o += `<rect x="180" y="24" width="40" height="9" rx="4.5" ${S.f('#16191d')}/>`;
      o += barra(S, 148, 46, 70, 'uiTexto', 9) + `<circle cx="248" cy="50" r="9" ${S.f('uiAcento2')}/>`;
      o += `<rect x="146" y="68" width="108" height="76" rx="12" ${S.f('uiAcento')}/>` + barra(S, 156, 82, 50, 'uiPanel', 7) + `<text x="156" y="122" font-size="22" font-weight="700" fill="${S.modo === 'neon' ? '#7df9ff' : S.col('uiPanel')}">1.284</text>`;
      for (let i = 0; i < 3; i++) o += `<rect x="146" y="${154 + i * 36}" width="108" height="30" rx="8" ${S.f('uiPanel')}/><circle cx="162" cy="${169 + i * 36}" r="8" ${S.f(['uiAcento2', 'uiAcento', '#3aa68a'][i])}/>` + barra(S, 176, 162 + i * 36, 50, 'uiTexto', 5) + barra(S, 176, 172 + i * 36, 34, 'uiSuave', 5);
      o += `<rect x="136" y="262" width="128" height="24" ${S.f('uiPanel')}/>` + [160, 186, 212, 238].map((x, i) => `<circle cx="${x}" cy="273" r="5" ${S.f(i === 0 ? 'uiAcento' : 'uiSuave')}/>`).join('');
      return o;
    }
  });

  add('dashboard', {
    nombre: 'Panel de analítica', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('uiFondo')}/><rect width="70" height="300" ${S.f('uiPanel')}/>`;
      o += `<rect x="18" y="18" width="34" height="34" rx="10" ${S.f('uiAcento')}/>` + [80, 110, 140, 170].map((y, i) => barra(S, 18, y, 34, i === 0 ? 'uiAcento' : 'uiSuave', 8)).join('');
      o += barra(S, 88, 22, 110, 'uiTexto', 12) + `<circle cx="372" cy="28" r="12" ${S.f('uiAcento2')}/>`;
      [['uiAcento', '24k'], ['uiAcento2', '8,2%'], ['#3aa68a', '312']].forEach(([c, t], i) => {
        const x = 88 + i * 102;
        o += `<rect x="${x}" y="50" width="92" height="58" rx="10" ${S.f('uiPanel')}/>` + barra(S, x + 12, 62, 40, 'uiSuave', 6) + `<text x="${x + 12}" y="96" font-size="20" font-weight="700" fill="${S.modo === 'neon' ? '#ffffff' : S.col(c)}">${t}</text>`;
      });
      o += `<rect x="88" y="120" width="194" height="164" rx="10" ${S.f('uiPanel')}/>` + barra(S, 100, 132, 70, 'uiTexto', 7) + grafica(S, 102, 160, 166, 100);
      o += `<rect x="292" y="120" width="92" height="164" rx="10" ${S.f('uiPanel')}/>`;
      o += `<circle cx="338" cy="178" r="30" ${S.k('uiSuave', 12)}/><path d="M338 148 A30 30 0 1 1 309 186" ${S.k('uiAcento', 12)}/>`;
      o += [0, 1, 2].map(i => barra(S, 304, 228 + i * 16, 68 - i * 14, ['uiAcento', 'uiAcento2', 'uiSuave'][i], 7)).join('');
      return o;
    }
  });

  add('web', {
    nombre: 'Página web', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#c9cfd6')}/>`;
      o += `<rect x="20" y="16" width="360" height="268" rx="10" ${S.f('uiFondo')}/><rect x="20" y="16" width="360" height="26" rx="10" ${S.f('uiSuave')}/><rect x="20" y="32" width="360" height="10" ${S.f('uiSuave')}/>`;
      o += [36, 50, 64].map((x, i) => `<circle cx="${x}" cy="29" r="5" ${S.f(['#e2574c', '#f2c14e', '#3aa68a'][i])}/>`).join('') + `<rect x="90" y="22" width="220" height="14" rx="7" ${S.f('uiPanel')}/>`;
      o += barra(S, 40, 56, 50, 'uiTexto', 10) + [250, 290, 330].map(x => barra(S, x, 58, 30, 'uiSuave', 6)).join('');
      o += `<rect x="40" y="82" width="320" height="100" rx="8" ${S.f('uiPanel')}/>` + barra(S, 56, 104, 140, 'uiTexto', 12) + barra(S, 56, 124, 120, 'uiSuave', 7) + barra(S, 56, 136, 100, 'uiSuave', 7) + `<rect x="56" y="152" width="70" height="18" rx="9" ${S.f('uiAcento')}/>`;
      o += `<rect x="232" y="92" width="118" height="80" rx="6" ${S.f('uiAcento2')}/><circle cx="270" cy="122" r="14" ${S.f('uiPanel')}/><path d="M232 172 L280 132 L310 156 L350 124 V172 Z" ${S.f('uiAcento')} opacity=".7"/>`;
      for (let i = 0; i < 3; i++) o += `<rect x="${40 + i * 110}" y="196" width="100" height="72" rx="8" ${S.f('uiPanel')}/><rect x="${52 + i * 110}" y="208" width="24" height="24" rx="6" ${S.f(['uiAcento', 'uiAcento2', '#3aa68a'][i])}/>` + barra(S, 52 + i * 110, 242, 70, 'uiTexto', 6) + barra(S, 52 + i * 110, 254, 50, 'uiSuave', 5);
      return o;
    }
  });

  add('wireframe-ui', {
    nombre: 'Wireframe de interfaz', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      const k = 'fill="#ffffff" stroke="#8a9199" stroke-width="2"';
      const caja = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${k}/><path d="M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}" stroke="#c4c9cf" stroke-width="1.5"/>`;
      let o = `<rect width="400" height="300" fill="#f2f3f5"/>`;
      S.def('wfG', '<pattern id="wfG" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0 V20 H0" fill="none" stroke="#e1e4e8"/></pattern>');
      o += `<rect width="400" height="300" fill="url(#wfG)"/>`;
      o += `<rect x="30" y="20" width="340" height="30" fill="#ffffff" stroke="#8a9199" stroke-width="2"/><rect x="40" y="30" width="60" height="10" fill="#c4c9cf"/>` + [250, 290, 330].map(x => `<rect x="${x}" y="31" width="28" height="8" fill="#c4c9cf"/>`).join('');
      o += caja(30, 64, 200, 110) + `<rect x="246" y="70" width="120" height="12" fill="#c4c9cf"/><rect x="246" y="92" width="110" height="7" fill="#dfe2e6"/><rect x="246" y="106" width="96" height="7" fill="#dfe2e6"/><rect x="246" y="140" width="80" height="26" rx="4" fill="#ffffff" stroke="#8a9199" stroke-width="2"/>`;
      o += caja(30, 190, 104, 80) + caja(148, 190, 104, 80) + caja(266, 190, 104, 80);
      o += `<circle cx="340" cy="152" r="12" fill="none" stroke="#3b6cf6" stroke-width="2"/><text x="335" y="157" font-size="12" font-weight="700" fill="#3b6cf6">1</text>`;
      return o;
    }
  });

  add('terminal', {
    nombre: 'Terminal', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#2a2e34')}/><rect x="24" y="20" width="352" height="260" rx="10" ${S.f('#0d1117')}/><rect x="24" y="20" width="352" height="24" rx="10" ${S.f('#21262d')}/>`;
      o += [40, 54, 68].map((x, i) => `<circle cx="${x}" cy="32" r="5" fill="${['#ff5f56', '#ffbd2e', '#27c93f'][i]}"/>`).join('');
      const L = [['$ ', 'npm run build', '#7ee787'], ['', '✓ 312 módulos compilados', '#8b949e'], ['$ ', 'git status', '#7ee787'], ['', 'En la rama main', '#8b949e'], ['', 'nada para confirmar', '#8b949e'], ['$ ', 'ls ./diseños', '#7ee787'], ['', 'logo.svg  marca.fig  ui.html', '#79c0ff'], ['$ ', '▌', '#7ee787']];
      L.forEach(([p, t, c], i) => { o += `<text x="40" y="${70 + i * 26}" font-size="14" ${MONO} fill="${c}"><tspan fill="#d2a8ff">${p}</tspan>${t}</text>`; });
      return o;
    }
  });

  add('panel-control', {
    nombre: 'Consola de control', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#1a1f26')}/>`;
      o += `<path d="M0 200 L60 150 H340 L400 200 V300 H0 Z" ${S.f('#2e3640')}/>`;
      [[40, 30, '#53d5ff'], [150, 20, '#7cf0a0'], [260, 30, '#ffb02e']].forEach(([x, y, c], i) => {
        o += `<rect x="${x}" y="${y}" width="100" height="100" rx="8" ${S.f('#0b1016')}/><rect x="${x}" y="${y}" width="100" height="100" rx="8" ${S.k(c, 2)}/>`;
        if (i === 0) o += `<circle cx="${x + 50}" cy="${y + 50}" r="34" ${S.k(c, 2)}/><circle cx="${x + 50}" cy="${y + 50}" r="18" ${S.k(c, 1.5)}/><path d="M${x + 50} ${y + 50} L${x + 76} ${y + 30}" ${S.k(c, 2.5)}/>`;
        if (i === 1) o += `<path d="M${x + 10} ${y + 60} L${x + 30} ${y + 40} L${x + 50} ${y + 66} L${x + 70} ${y + 30} L${x + 90} ${y + 50}" ${S.k(c, 2.5)}/>`;
        if (i === 2) o += [0, 1, 2, 3, 4].map(j => `<rect x="${x + 14 + j * 16}" y="${y + 80 - j * 12}" width="10" height="${12 + j * 12}" ${S.f(c)}/>`).join('');
      });
      const r = rng(5);
      for (let i = 0; i < 16; i++) o += `<rect x="${70 + (i % 8) * 34}" y="${180 + Math.floor(i / 8) * 34}" width="24" height="20" rx="4" ${S.f(['#e2574c', '#f2c14e', '#3aa68a', '#53d5ff'][Math.floor(r() * 4)])}/>`;
      o += `<circle cx="40" cy="250" r="16" ${S.f('#e2574c')}/><circle cx="360" cy="250" r="16" ${S.f('#5a6672')}/><path d="M360 250 L368 240" ${S.k('#ffffff', 3)}/>`;
      return o;
    }
  });

  add('monitores', {
    nombre: 'Puesto con varios monitores', grupo: 'Interfaz', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#0a0d12')}/>` + S.halo(200, 120, 220, '#1f6f4a', 0.4);
      const mon = (x, y, w, h, contenido) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" ${S.f('#1b1f26')}/><rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" ${S.f('#03140c')}/>${contenido}`;
      const codigo = (x, y, n, w) => Array.from({ length: n }, (_, i) => `<rect x="${x + (i % 3) * 8}" y="${y + i * 10}" width="${r1(w * (0.4 + ((i * 37) % 50) / 100))}" height="4" fill="${i % 4 ? '#3ddc84' : '#9cffc8'}" opacity=".85"/>`).join('');
      o += mon(20, 50, 120, 90, codigo(32, 64, 7, 80)) + mon(140, 30, 120, 110, codigo(152, 44, 9, 90)) + mon(260, 50, 120, 90, `<circle cx="320" cy="95" r="28" fill="none" stroke="#3ddc84" stroke-width="2"/><path d="M320 95 L340 80" stroke="#3ddc84" stroke-width="2"/>`);
      o += mon(80, 150, 110, 70, codigo(92, 162, 5, 70)) + mon(210, 150, 110, 70, `<path d="M222 200 L240 180 L258 192 L276 168 L298 186 L310 176" fill="none" stroke="#3ddc84" stroke-width="2"/>`);
      o += `<rect x="0" y="236" width="400" height="64" ${S.f('#151a20')}/><rect x="130" y="250" width="140" height="20" rx="4" ${S.f('#232a33')}/>`;
      o += `<path d="M120 300 C120 250 160 236 200 236 C240 236 280 250 280 300 Z" ${S.f('#05070a')}/><circle cx="200" cy="214" r="26" ${S.f('#05070a')}/>`;
      return o;
    }
  });

  add('servidores', {
    nombre: 'Sala de servidores', grupo: 'Tecnología', escena: true, variantes: { datacenter: 'Centro de datos' },
    dibujo(S, v) {
      let o = `<rect width="400" height="300" ${S.f('#11161d')}/><polygon points="0,300 160,170 240,170 400,300" ${S.f('#1c232c')}/><polygon points="0,0 160,120 240,120 400,0" ${S.f('#0b0f14')}/>`;
      const filas = v === 'datacenter' ? 3 : 1;
      for (let f = 0; f < filas; f++) {
        for (const side of [-1, 1]) {
          for (let i = 0; i < 6; i++) {
            const t = i / 6, t2 = (i + 0.85) / 6;
            const x1 = 200 + side * (200 - 160 * t) - side * f * 20, x2 = 200 + side * (200 - 160 * t2) - side * f * 20;
            const y1 = 0 + 120 * t, y2 = 120 * t2, b1 = 300 - 130 * t, b2 = 300 - 130 * t2;
            o += `<polygon points="${pts([[x1, y1 + 20], [x2, y2 + 20], [x2, b2], [x1, b1]])}" ${S.f('#262e38')}/>`;
            for (let j = 0; j < 8; j++) {
              const yy = y1 + 30 + j * (b1 - y1 - 40) / 8;
              o += `<circle cx="${r1(x1 - side * 8)}" cy="${r1(yy)}" r="${r1(2.4 - t)}" fill="${['#3ddc84', '#53d5ff', '#3ddc84', '#ffb02e'][(i + j) % 4]}"/>`;
            }
          }
        }
      }
      o += S.halo(200, 150, 70, '#53d5ff', 0.35);
      return o;
    }
  });

  /* ============================================================
     CIENCIA
     ============================================================ */
  add('adn', {
    nombre: 'Doble hélice de ADN', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'adnC', '#0a1830', '#123a5a');
      let a = '', b = '';
      for (let i = 0; i <= 40; i++) {
        const x = 30 + i * 8.5, y1 = 150 + Math.sin(i * 0.38) * 70, y2 = 150 - Math.sin(i * 0.38) * 70;
        if (i % 2 === 0) o += `<path d="M${r1(x)} ${r1(y1)} V${r1(y2)}" ${S.k(i % 4 ? '#ff8ad0' : '#ffd36e', 3)}/>`;
        a += (i ? ' L' : 'M') + r1(x) + ' ' + r1(y1); b += (i ? ' L' : 'M') + r1(x) + ' ' + r1(y2);
      }
      return o + `<path d="${a}" ${S.k('#53d5ff', 7)}/><path d="${b}" ${S.k('#7cf0c8', 7)}/>`;
    }
  });
  add('celula', {
    nombre: 'Célula', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = S.fondo('#e8f2ec', '#cfe4d8', 'ceC');
      o += `<path d="M80 150 C70 70 170 40 230 56 C320 70 350 130 330 190 C310 260 200 270 140 250 C90 230 84 200 80 150 Z" ${S.f('#9fd9b4')}/><path d="M80 150 C70 70 170 40 230 56 C320 70 350 130 330 190 C310 260 200 270 140 250 C90 230 84 200 80 150 Z" ${S.k('#3a9a6a', 6)}/>`;
      o += `<circle cx="200" cy="150" r="44" ${S.f('#8a5ab0')}/><circle cx="210" cy="140" r="14" ${S.f('#5a2a80')}/>`;
      o += `<ellipse cx="280" cy="130" rx="24" ry="12" transform="rotate(30 280 130)" ${S.f('#ff8a6a')}/><path d="M262 124 Q270 136 278 124 Q286 136 296 128" ${S.k('#c9543a', 2)}/><ellipse cx="140" cy="210" rx="22" ry="11" transform="rotate(-20 140 210)" ${S.f('#ff8a6a')}/>`;
      o += [[130, 110], [270, 210], [240, 90], [120, 170], [290, 170]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" ${S.f('#3a9a6a')}/>`).join('');
      o += `<path d="M160 230 C190 220 220 240 250 226" ${S.k('#5ab0d0', 5)}/>`;
      return o;
    }
  });
  add('molecula', {
    nombre: 'Molécula', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = S.fondo('#f2f4f7', '#dde3ea', 'moC2');
      const at = [[200, 150, 34, '#e2574c'], [110, 100, 24, '#f4f6f8'], [290, 96, 24, '#f4f6f8'], [130, 230, 28, '#3b6cf6'], [290, 222, 28, '#3a3f45'], [350, 160, 18, '#f4f6f8']];
      const en = [[0, 1], [0, 2], [0, 3], [0, 4], [4, 5]];
      en.forEach(([a, b]) => { o += `<path d="M${at[a][0]} ${at[a][1]} L${at[b][0]} ${at[b][1]}" ${S.k('#9aa4ae', 10)}/>`; });
      at.forEach(([x, y, r, c], i) => { const g = S.rg('mg' + i, [[shade(c, 0.6), 0], [c, 0.55], [shade(c, -0.35), 1]], 0.35, 0.3, 0.75); o += `<circle cx="${x}" cy="${y}" r="${r}" fill="${S.modo === 'fill' ? g : 'none'}" ${S.modo === 'fill' ? '' : S.f(c)}/>`; });
      return o;
    }
  });
  add('atomo', {
    nombre: 'Átomo', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'atC', '#0b1026', '#1b2350');
      [0, 60, 120].forEach(a => { o += `<ellipse cx="200" cy="150" rx="140" ry="44" transform="rotate(${a} 200 150)" ${S.k('#53d5ff', 3)}/>`; });
      o += S.halo(200, 150, 60, '#ff8a3a', 0.6) + `<circle cx="190" cy="144" r="14" ${S.f('#ff6a3a')}/><circle cx="210" cy="146" r="14" ${S.f('#ffd36e')}/><circle cx="200" cy="160" r="14" ${S.f('#ff6a3a')}/>`;
      o += [[340, 150], [130, 29], [130, 271]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" ${S.f('#a8f0ff')}/>`).join('');
      return o;
    }
  });
  add('cerebro', {
    nombre: 'Cerebro', grupo: 'Ciencia',
    dibujo(S) {
      let o = `<path d="M120 170 C80 160 80 100 120 90 C120 50 170 40 196 64 C220 40 276 46 280 86 C320 90 330 150 296 168 C300 200 260 220 236 206 C220 230 170 230 160 206 C130 214 110 196 120 170 Z" ${S.f('#f2a7b6')}/>`;
      o += `<path d="M200 66 C196 110 206 150 200 210 M140 110 C160 100 170 120 160 140 C150 156 170 170 180 160 M256 100 C240 110 236 130 250 140 C266 150 256 176 236 172 M120 150 C140 150 150 170 140 186 M290 150 C270 152 268 172 280 180" ${S.k('#c9637a', 4)}/>`;
      o += `<path d="M196 208 C196 240 210 260 230 270" ${S.k('#e08aa0', 16)}/>`;
      return o;
    }
  });
  add('red-neuronal', {
    nombre: 'Red neuronal', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'rnC', '#070b1a', '#13183a');
      const capas = [3, 5, 5, 2], xs = [60, 160, 260, 350];
      const nodos = capas.map((n, c) => Array.from({ length: n }, (_, i) => [xs[c], 150 + (i - (n - 1) / 2) * 48]));
      for (let c = 0; c < 3; c++) for (const a of nodos[c]) for (const b of nodos[c + 1]) o += `<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" ${S.k('#5a8fff', 1.2, ' opacity=".55"')}/>`;
      nodos.flat().forEach(([x, y], i) => { o += S.halo(x, y, 22, '#7cf0ff', 0.4) + `<circle cx="${x}" cy="${y}" r="11" ${S.f(i % 3 ? '#7cf0ff' : '#ff8ad0')}/>`; });
      return o;
    }
  });
  add('fractal', {
    nombre: 'Fractal', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'frC', '#0a1020', '#1c1438');
      const ramas = [];
      const rama = (x, y, l, a, d) => {
        if (d === 0) return;
        const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l;
        ramas.push(`<path d="M${r1(x)} ${r1(y)} L${r1(x2)} ${r1(y2)}" ${S.k(M.util.hslHex(180 + d * 18, 0.8, 0.45 + (9 - d) * 0.04), d * 0.9)}/>`);
        rama(x2, y2, l * 0.72, a - 0.45, d - 1); rama(x2, y2, l * 0.72, a + 0.45, d - 1);
      };
      rama(200, 290, 70, -Math.PI / 2, 10);
      return o + ramas.join('');
    }
  });
  add('caleidoscopio', {
    nombre: 'Caleidoscopio', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'kaC', '#12082a', '#12082a');
      const cuña = `<polygon points="200,150 200,0 287,0" ${S.f('#ff5ec4')}/><polygon points="200,150 230,40 280,60" ${S.f('#ffd36e')}/><circle cx="240" cy="90" r="16" ${S.f('#3ad6f0')}/><polygon points="200,150 214,110 250,120" ${S.f('#7cf05a')}/><circle cx="222" cy="40" r="8" ${S.f('#ffffff')}/>`;
      for (let i = 0; i < 12; i++) o += `<g transform="rotate(${i * 30} 200 150)${i % 2 ? ' translate(400 0) scale(-1 1)' : ''}">${cuña}</g>`.replace(/translate\(400 0\) scale\(-1 1\)/, 'matrix(-1 0 0 1 400 0)');
      return o + `<circle cx="200" cy="150" r="148" fill="none" stroke="#000" stroke-width="2"/>`;
    }
  });
  add('geometria', {
    nombre: 'Estudio geométrico', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = S.fondo('#f2efe8', '#e6e0d4', 'geC');
      o += `<circle cx="140" cy="150" r="80" ${S.k('#1b1b1b', 2)}/><rect x="170" y="70" width="160" height="160" ${S.k('#1b1b1b', 2)}/><polygon points="250,40 350,230 150,230" ${S.k('#e2574c', 2.5)}/>`;
      o += `<path d="M60 150 H340 M200 30 V270" ${S.k('#9a948a', 1, ' stroke-dasharray="4 4"')}/><circle cx="250" cy="150" r="4" ${S.f('#1b1b1b')}/><circle cx="140" cy="150" r="4" ${S.f('#1b1b1b')}/>`;
      return o;
    }
  });
  add('geometria-sagrada', {
    nombre: 'Geometría sagrada', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = negro(S, 'gsC', '#120d24', '#24183e');
      const r = 40, cs = [[0, 0]];
      for (let i = 0; i < 6; i++) cs.push([Math.cos(i * Math.PI / 3) * r, Math.sin(i * Math.PI / 3) * r]);
      for (let i = 0; i < 6; i++) cs.push([Math.cos(i * Math.PI / 3) * r * 2, Math.sin(i * Math.PI / 3) * r * 2], [Math.cos((i + 0.5) * Math.PI / 3) * r * 1.732, Math.sin((i + 0.5) * Math.PI / 3) * r * 1.732]);
      cs.forEach(([x, y]) => { o += `<circle cx="${r1(200 + x)}" cy="${r1(150 + y)}" r="${r}" ${S.k('#e8c46a', 1.6)}/>`; });
      return o + `<circle cx="200" cy="150" r="${r * 3}" ${S.k('#e8c46a', 2.5)}/>`;
    }
  });
  add('infinito', {
    nombre: 'Infinito', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      const g = S.lg('inG', ['#ff5ec4', '#ffd36e', '#3ad6f0'], 0, 0, 1, 0);
      return S.fondo('#14102a', '#24184a', 'inC') + `<path d="M200 150 C240 80 330 80 330 150 C330 220 240 220 200 150 C160 80 70 80 70 150 C70 220 160 220 200 150 Z" fill="none" stroke="${g}" stroke-width="26" stroke-linecap="round"/>`;
    }
  });
  add('espiral', {
    nombre: 'Espiral áurea', grupo: 'Ciencia', escena: true,
    dibujo(S) {
      let o = S.fondo('#f4efe4', '#ebe3d4', 'esC');
      const fib = [[60, 40, 233, 233], [233 + 60 - 233, 40, 0, 0]];
      void fib;
      const cuad = [[64, 34, 186], [250, 34, 115], [293, 149, 72], [250, 177, 43]];
      cuad.forEach(([x, y, s], i) => { o += `<rect x="${x}" y="${y}" width="${s}" height="${s}" ${S.f(['#f2c14e', '#e07a4f', '#3b6cf6', '#3aa68a'][i])} opacity=".35"/>`; });
      let d = '', a = Math.PI, rr = 6;
      for (let i = 0; i < 120; i++) { const x = 250 + Math.cos(a) * rr, y = 160 + Math.sin(a) * rr; d += (i ? ' L' : 'M') + r1(x) + ' ' + r1(y); a += 0.12; rr *= 1.025; }
      return o + `<path d="${d}" ${S.k('#1b1b1b', 3)}/>`;
    }
  });
  add('onda', {
    nombre: 'Forma de onda de audio', grupo: 'Música', escena: true, variantes: { suave: 'Ondas sonoras' },
    dibujo(S, v) {
      let o = negro(S, 'onC', '#0d0f1a', '#1a1e30');
      if (v === 'suave') {
        ['#ff5ec4', '#ffd36e', '#3ad6f0', '#7cf05a'].forEach((c, j) => {
          let d = '';
          for (let x = 0; x <= 400; x += 5) d += (x ? ' L' : 'M') + x + ' ' + r1(150 + Math.sin(x / (30 + j * 8) + j) * (60 - j * 10) * Math.sin(x / 400 * Math.PI));
          o += `<path d="${d}" ${S.k(c, 3, ' opacity=".85"')}/>`;
        });
        return o;
      }
      const r = rng(4);
      for (let x = 20; x < 380; x += 6) { const h = (8 + r() * 90) * Math.sin((x - 20) / 360 * Math.PI) + 4; o += `<rect x="${x}" y="${r1(150 - h)}" width="3.5" height="${r1(h * 2)}" rx="1.5" ${S.f(x < 200 ? '#53d5ff' : '#5a6a8a')}/>`; }
      return o + `<path d="M200 40 V260" ${S.k('#ff5ec4', 2)}/>`;
    }
  });
  add('visualizador', {
    nombre: 'Visualizador musical', grupo: 'Música', escena: true,
    dibujo(S) {
      let o = negro(S, 'viC', '#0b0718', '#1c0f30');
      const r = rng(7);
      for (let i = 0; i < 64; i++) {
        const a = i / 64 * Math.PI * 2, l = 20 + r() * 60;
        o += `<path d="M${r1(200 + Math.cos(a) * 70)} ${r1(150 + Math.sin(a) * 70)} L${r1(200 + Math.cos(a) * (70 + l))} ${r1(150 + Math.sin(a) * (70 + l))}" ${S.k(M.util.hslHex(280 + i * 2.5, 0.9, 0.62), 4)}/>`;
      }
      return o + S.halo(200, 150, 70, '#ff5ec4', 0.45) + `<circle cx="200" cy="150" r="56" ${S.f('#1c0f30')}/><circle cx="200" cy="150" r="56" ${S.k('#ff5ec4', 3)}/>`;
    }
  });
  add('ecualizador', {
    nombre: 'Ecualizador', grupo: 'Música', escena: true,
    dibujo(S) {
      let o = negro(S, 'ecC2', '#0d0f14', '#181c24');
      const alt = [5, 8, 11, 9, 13, 10, 7, 12, 9, 6, 4, 7, 10, 8];
      alt.forEach((h, i) => { for (let j = 0; j < h; j++) o += `<rect x="${32 + i * 25}" y="${266 - j * 17}" width="19" height="13" rx="2" ${S.f(j > 10 ? '#ff4d4d' : j > 7 ? '#ffd36e' : '#3ddc84')}/>`; });
      return o;
    }
  });

  /* ============================================================
     CIENCIA FICCIÓN
     ============================================================ */
  add('robot', {
    nombre: 'Robot', grupo: 'Ciencia ficción',
    dibujo(S) {
      let o = S.sombra(200, 284, 90, 8);
      o += `<path d="M200 54 V30" ${S.k('metalS', 5)}/><circle cx="200" cy="26" r="9" ${S.f('acento')}/>`;
      o += `<rect x="140" y="54" width="120" height="96" rx="24" ${S.f('metal')}/><rect x="158" y="80" width="84" height="44" rx="14" ${S.f('#1f2a33')}/>`;
      o += `<circle cx="182" cy="102" r="10" fill="#53d5ff"/><circle cx="218" cy="102" r="10" fill="#53d5ff"/>${S.halo(200, 102, 40, '#53d5ff', 0.35)}`;
      o += `<rect x="128" y="88" width="14" height="30" rx="5" ${S.f('metalS')}/><rect x="258" y="88" width="14" height="30" rx="5" ${S.f('metalS')}/>`;
      o += `<rect x="186" y="150" width="28" height="12" ${S.f('metalS')}/><rect x="146" y="160" width="108" height="92" rx="18" ${S.f('metal')}/><rect x="172" y="180" width="56" height="34" rx="6" ${S.f('#dfe6ea')}/><circle cx="186" cy="197" r="6" ${S.f('acento')}/><circle cx="214" cy="197" r="6" ${S.f('acento2')}/>`;
      o += `<path d="M146 176 C118 186 112 214 116 238 M254 176 C282 186 288 214 284 238" ${S.k('metalS', 16)}/><circle cx="116" cy="244" r="12" ${S.f('metalS')}/><circle cx="284" cy="244" r="12" ${S.f('metalS')}/>`;
      o += `<rect x="164" y="252" width="26" height="30" rx="6" ${S.f('metalS')}/><rect x="210" y="252" width="26" height="30" rx="6" ${S.f('metalS')}/>`;
      return o;
    }
  });
  add('mecha', {
    nombre: 'Mecha', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = S.fondo('#9ab4cc', '#e4ecf2', 'meC') + `<path d="M0 260 H400 V300 H0Z" ${S.f('#6a7a6a')}/>`;
      o += `<path d="M30 260 V180 H70 V260 M330 260 V150 H372 V260" ${S.f('#7a8ea2')}/>`;
      const a = '#e9ecef', b = '#3a62c4', c = '#d9362b', d = '#2a2f36';
      o += `<polygon points="170,150 230,150 244,250 218,250 206,190 194,190 182,250 156,250" ${S.f(a)}/><rect x="148" y="246" width="40" height="16" ${S.f(d)}/><rect x="212" y="246" width="40" height="16" ${S.f(d)}/>`;
      o += `<polygon points="150,70 250,70 262,150 138,150" ${S.f(b)}/><polygon points="176,96 224,96 216,138 184,138" ${S.f(c)}/>`;
      o += `<polygon points="110,66 150,60 150,110 120,118" ${S.f(a)}/><polygon points="290,66 250,60 250,110 280,118" ${S.f(a)}/><rect x="104" y="114" width="30" height="70" ${S.f(d)}/><rect x="266" y="114" width="30" height="70" ${S.f(d)}/><rect x="98" y="180" width="42" height="24" ${S.f(a)}/><rect x="260" y="180" width="42" height="24" ${S.f(a)}/>`;
      o += `<polygon points="182,36 218,36 224,70 176,70" ${S.f(a)}/><path d="M184 54 H216" ${S.k('#ffd36e', 5)}/><polygon points="200,36 170,14 196,30 204,30 230,14" ${S.f('#f2c14e')}/>`;
      return o;
    }
  });
  add('nave', {
    nombre: 'Nave espacial', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = negro(S, 'naC', '#050713', '#151a3a');
      const r = rng(2);
      for (let i = 0; i < 60; i++) o += `<circle cx="${r1(r() * 400)}" cy="${r1(r() * 300)}" r="${r1(0.5 + r())}" fill="#fff" opacity=".7"/>`;
      o += `<circle cx="340" cy="250" r="90" ${S.f('#3a5a9a')}/>`;
      o += `<path d="M60 170 L120 150 L80 130 Z M60 130 L120 150" ${S.f('#ff8a3a')}/>` + S.halo(110, 150, 40, '#ff8a3a', 0.6);
      o += `<path d="M110 136 H250 C300 136 340 144 350 150 C340 156 300 164 250 164 H110 Z" ${S.f('#dfe4ea')}/><path d="M150 136 L210 80 H240 L220 136 Z M150 164 L210 220 H240 L220 164 Z" ${S.f('#a9b3be')}/>`;
      o += `<path d="M260 140 C290 140 316 144 326 150 C316 152 290 154 260 154 Z" ${S.f('#53d5ff')}/><path d="M140 150 H240" ${S.k('#d9362b', 4)}/>`;
      return o;
    }
  });
  add('metaverso', {
    nombre: 'Metaverso', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = S.fondo('#1a0f40', '#5a2a9a', 'mvC');
      o += Array.from({ length: 10 }, (_, i) => `<path d="M0 ${200 + i * i * 1.2} H400" ${S.k('#9a7aff', 1, ' opacity=".6"')}/>`).join('') + Array.from({ length: 13 }, (_, i) => `<path d="M200 190 L${-400 + i * 100} 320" ${S.k('#9a7aff', 1, ' opacity=".6"')}/>`).join('');
      const plat = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="50" ry="14" ${S.f(c)}/><ellipse cx="0" cy="6" rx="50" ry="14" fill="#000" opacity=".25"/></g>`;
      o += plat(90, 120, 0.9, '#3ad6f0') + plat(300, 90, 0.7, '#ff5ec4') + plat(210, 210, 1.3, '#7cf05a');
      const av = (x, y, c) => `<circle cx="${x}" cy="${y - 34}" r="9" ${S.f('#ffd9b8')}/><rect x="${x - 9}" y="${y - 24}" width="18" height="24" rx="6" ${S.f(c)}/>`;
      o += av(90, 120, '#ffd36e') + av(300, 92, '#3ad6f0') + av(196, 210, '#ff5ec4') + av(226, 210, '#ffd36e');
      o += `<rect x="270" y="150" width="70" height="44" rx="6" fill="#ffffff" opacity=".18"/><rect x="278" y="158" width="40" height="6" rx="3" fill="#fff" opacity=".7"/>`;
      return o;
    }
  });
  add('matrix', {
    nombre: 'Lluvia de código', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#020804"/>`;
      const r = rng(13), ch = 'アイウエオカキクケコ01ﾊﾋﾌﾍﾎ{}*+=';
      for (let c = 0; c < 22; c++) {
        const x = 8 + c * 18, len = 6 + Math.floor(r() * 14), y0 = Math.floor(r() * 10) * 16;
        for (let i = 0; i < len; i++) {
          const op = (i + 1) / len;
          o += `<text x="${x}" y="${y0 + i * 18}" font-size="15" ${MONO} fill="${i === len - 1 ? '#d8ffe0' : '#3ddc84'}" opacity="${r1(op)}">${ch[Math.floor(r() * ch.length)]}</text>`;
        }
      }
      return o;
    }
  });
  add('datos', {
    nombre: 'Flujo de datos', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = negro(S, 'daC', '#03081a', '#0c1838');
      const r = rng(17);
      for (let i = 0; i < 26; i++) {
        const y = 20 + i * 10.5, c = ['#53d5ff', '#7cf0c8', '#5a8fff', '#ff5ec4'][i % 4];
        let d = `M-10 ${y}`;
        for (let x = 0; x <= 410; x += 40) d += ` Q${x + 20} ${r1(y + (r() - 0.5) * 40)} ${x + 40} ${r1(150 + (y - 150) * (0.4 + Math.abs(x - 200) / 330))}`;
        o += `<path d="${d}" ${S.k(c, 1.2, ' opacity=".7"')}/>`;
        o += `<circle cx="${r1(r() * 400)}" cy="${r1(y)}" r="2.2" fill="#fff"/>`;
      }
      return o;
    }
  });
  add('terreno', {
    nombre: 'Malla de alambre', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#05080f"/>`;
      const P = (i, j) => { const z = j / 12, x = 200 + (i - 10) * 30 * (0.35 + z * 0.9), y = 150 + z * z * 150 - Math.sin(i * 0.7) * Math.cos(j * 0.6) * 18 * (0.4 + z); return [x, y]; };
      for (let j = 0; j <= 12; j++) { let d = ''; for (let i = 0; i <= 20; i++) { const [x, y] = P(i, j); d += (i ? ' L' : 'M') + r1(x) + ' ' + r1(y); } o += `<path d="${d}" fill="none" stroke="#3ddc84" stroke-width="1.2"/>`; }
      for (let i = 0; i <= 20; i++) { let d = ''; for (let j = 0; j <= 12; j++) { const [x, y] = P(i, j); d += (j ? ' L' : 'M') + r1(x) + ' ' + r1(y); } o += `<path d="${d}" fill="none" stroke="#3ddc84" stroke-width="1.2"/>`; }
      o += `<circle cx="300" cy="80" r="44" fill="none" stroke="#3ddc84" stroke-width="1.2"/>` + [-30, 0, 30].map(a => `<ellipse cx="300" cy="80" rx="${44 * Math.cos(a * Math.PI / 180)}" ry="44" fill="none" stroke="#3ddc84" stroke-width="1"/>`).join('') + [-22, 0, 22].map(y => `<ellipse cx="300" cy="${80 + y}" rx="${r1(Math.sqrt(44 * 44 - y * y))}" ry="8" fill="none" stroke="#3ddc84" stroke-width="1"/>`).join('');
      return o;
    }
  });
  add('maquina-tiempo', {
    nombre: 'Máquina del tiempo', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = negro(S, 'mtC', '#120a26', '#2a1a4a');
      for (let i = 8; i > 0; i--) o += `<circle cx="200" cy="140" r="${i * 15}" ${S.k(M.util.hslHex(260 + i * 14, 0.85, 0.6), 3, ' opacity=".8"')}/>`;
      o += `<circle cx="200" cy="140" r="40" ${S.f('#f6efe2')}/>` + Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; return `<path d="M${r1(200 + Math.cos(a) * 32)} ${r1(140 + Math.sin(a) * 32)} L${r1(200 + Math.cos(a) * 37)} ${r1(140 + Math.sin(a) * 37)}" ${S.k('#2a1a4a', 2)}/>`; }).join('');
      o += `<path d="M200 140 V114 M200 140 L218 150" ${S.k('#2a1a4a', 3.5)}/>`;
      o += `<polygon points="${gear(80, 240, 40, 10)}" ${S.f('#c99a4a')}/><circle cx="80" cy="240" r="14" ${S.f('#2a1a4a')}/><polygon points="${gear(330, 230, 30, 8)}" ${S.f('#b8862e')}/><circle cx="330" cy="230" r="10" ${S.f('#2a1a4a')}/>`;
      return o;
    }
  });
  add('onirico', {
    nombre: 'Paisaje onírico', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = S.fondo('#b9a8f0', '#ffd6e6', 'onC2');
      o += `<path d="M0 220 C80 200 160 240 240 214 C300 196 360 220 400 210 V300 H0Z" ${S.f('#8ad0c4')}/>`;
      o += `<circle cx="300" cy="80" r="40" ${S.f('#fff1c8')}/><path d="M0 120 Q100 100 200 130 T400 110" ${S.k('#ffffff', 10, ' opacity=".5"')}/>`;
      o += `<path d="M90 220 V170 Q90 150 110 150 H130 V220 Z" ${S.f('#ff8ab0')}/><rect x="98" y="160" width="24" height="40" ${S.f('#7ab6ff')}/>`;
      o += `<g transform="translate(220 120) rotate(-15)"><rect x="-20" y="-30" width="40" height="60" rx="6" ${S.f('#ffd36e')}/><circle cx="0" cy="-36" r="8" ${S.f('#ff8ab0')}/></g>`;
      o += `<path d="M300 230 C300 200 330 190 340 160" ${S.k('#5a8a6a', 4)}/><circle cx="340" cy="150" r="16" ${S.f('#c79aff')}/><ellipse cx="160" cy="70" rx="30" ry="10" ${S.f('#ffffff')}/><path d="M150 90 C160 110 150 130 160 150" ${S.k('#ffffff', 2, ' stroke-dasharray="4 6"')}/>`;
      return o;
    }
  });
  add('universo-paralelo', {
    nombre: 'Universo paralelo', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      const a = M.motivos.paisaje.dibujo(S, '', { sinNubes: true });
      S.def('upL', '<clipPath id="upL"><rect width="200" height="300"/></clipPath>');
      S.def('upR', '<clipPath id="upR"><rect x="200" width="200" height="300"/></clipPath>');
      S.def('upInv', `<filter id="upInv" ${M.util.FR}><feColorMatrix type="hueRotate" values="180"/></filter>`);
      return `<g clip-path="url(#upL)">${a}</g><g clip-path="url(#upR)"><g filter="url(#upInv)" transform="matrix(1 0 0 -1 0 300)">${a}</g></g><path d="M200 0 V300" stroke="#fff" stroke-width="4"/><path d="M200 0 V300" stroke="#c79aff" stroke-width="12" opacity=".35"/>`;
    }
  });
  add('multiverso', {
    nombre: 'Multiverso', grupo: 'Ciencia ficción', escena: true,
    dibujo(S) {
      let o = negro(S, 'muC', '#08061a', '#1a1040');
      const mundos = [[110, 110, 70, ['#ffb27a', '#5a3a8a']], [270, 90, 56, ['#7cd6ff', '#1a5a8a']], [220, 220, 60, ['#9ef07a', '#2a6a4a']], [70, 230, 36, ['#ff8ad0', '#6a2a5a']], [350, 210, 30, ['#ffe08a', '#8a6a1a']]];
      mundos.forEach(([x, y, r, [c1, c2]], i) => {
        S.def('mu' + i, `<clipPath id="mu${i}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath>`);
        o += S.halo(x, y, r * 1.5, c1, 0.4) + `<g clip-path="url(#mu${i})"><rect x="${x - r}" y="${y - r}" width="${r * 2}" height="${r * 2}" fill="${S.lg('muG' + i, [c1, c2])}"/><path d="M${x - r} ${y + r * 0.3} L${x - r * 0.4} ${y - r * 0.2} L${x} ${y + r * 0.2} L${x + r * 0.5} ${y - r * 0.4} L${x + r} ${y + r * 0.2} V${y + r} H${x - r} Z" fill="${c2}"/></g><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>`;
      });
      return o;
    }
  });
  add('cuantico', {
    nombre: 'Ordenador cuántico', grupo: 'Tecnología', escena: true,
    dibujo(S) {
      let o = negro(S, 'cuC', '#0a0d16', '#1a2030');
      const oro = S.lg('cuG', ['#ffe8a8', '#d9a640', '#8a5a1a'], 0, 0, 1, 0);
      [[120, 280, 40], [140, 260, 90], [160, 240, 140], [180, 220, 190]].forEach(([x1, x2, y]) => { o += `<rect x="${x1}" y="${y}" width="${x2 - x1}" height="10" rx="3" fill="${oro}"/>`; });
      o += `<path d="M200 0 V40" stroke="${oro}" stroke-width="8"/>`;
      for (let i = 0; i < 9; i++) { const x = 130 + i * 17.5; o += `<path d="M${x} 50 C${x - 4} 120 ${x + 6} 170 ${x} 230" fill="none" stroke="${oro}" stroke-width="2.4"/>`; }
      o += `<rect x="186" y="230" width="28" height="40" fill="${oro}"/><rect x="176" y="270" width="48" height="10" rx="3" ${S.f('#3a3f48')}/>` + S.halo(200, 270, 40, '#53d5ff', 0.5);
      return o;
    }
  });
  add('nanotech', {
    nombre: 'Nanotecnología', grupo: 'Tecnología', escena: true,
    dibujo(S) {
      let o = negro(S, 'nnC', '#071420', '#0e2a3a');
      for (let i = 0; i < 9; i++) for (let j = 0; j < 7; j++) { const x = 30 + i * 44 + (j % 2) * 22, y = 30 + j * 40; o += `<polygon points="${pts(Array.from({ length: 6 }, (_, k) => [x + Math.cos(k * Math.PI / 3) * 20, y + Math.sin(k * Math.PI / 3) * 20]))}" ${S.k('#1f5a7a', 1.2)}/>`; }
      const bot = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><circle r="16" ${S.f('#c9d6e0')}/><circle r="7" ${S.f('#53d5ff')}/>${[0, 60, 120, 180, 240, 300].map(a => `<path d="M${r1(Math.cos(a * Math.PI / 180) * 16)} ${r1(Math.sin(a * Math.PI / 180) * 16)} L${r1(Math.cos(a * Math.PI / 180) * 30)} ${r1(Math.sin(a * Math.PI / 180) * 30)}" ${S.k('#c9d6e0', 3)}/>`).join('')}</g>`;
      return o + bot(150, 140, 1.6) + bot(280, 90, 0.9) + bot(270, 220, 1.1) + S.halo(150, 140, 50, '#53d5ff', 0.4);
    }
  });

  /* ============================================================
     VIDEOJUEGOS
     ============================================================ */
  function cubo(S, x, y, s, top, l, r) {
    const h = s * 0.5;
    return `<polygon points="${pts([[x, y], [x + s, y + h], [x, y + 2 * h], [x - s, y + h]])}" ${S.f(top)}/><polygon points="${pts([[x - s, y + h], [x, y + 2 * h], [x, y + 2 * h + s], [x - s, y + h + s]])}" ${S.f(l)}/><polygon points="${pts([[x, y + 2 * h], [x + s, y + h], [x + s, y + h + s], [x, y + 2 * h + s]])}" ${S.f(r)}/>`;
  }
  M.util.cubo = cubo;
  const CUBOS = { hierba: ['#7fc45a', '#5a8a3a', '#4a7430'], tierra: ['#a8774a', '#7a5232', '#664428'], hoja: ['#4fa65a', '#3a7a42', '#2f6636'], tronco: ['#9a6a42', '#6a4628', '#5a3a20'], agua: ['#5ab6e6', '#3a8ac0', '#2f74a6'], piedra: ['#b0b0aa', '#8a8a84', '#74746e'], tejado: ['#d9674a', '#a8462e', '#8f3a24'], muro: ['#f2e6d0', '#d6c6aa', '#c4b292'] };
  function voxeles(S, mapa, ox, oy, s) {
    let o = '';
    const lista = [];
    for (const [x, y, z, t] of mapa) lista.push([x, y, z, t]);
    lista.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]) || a[2] - b[2]);
    for (const [x, y, z, t] of lista) {
      const px = ox + (x - y) * s, py = oy + (x + y) * s * 0.5 - z * s;
      o += cubo(S, px, py, s, ...CUBOS[t]);
    }
    return o;
  }
  add('voxel', {
    nombre: 'Vóxeles', grupo: 'Videojuegos',
    dibujo(S) {
      const m = [];
      for (let x = 0; x < 6; x++) for (let y = 0; y < 6; y++) m.push([x, y, 0, (x === 4 && y < 5) || (y === 4 && x > 3) ? 'agua' : 'hierba']);
      [[1, 1], [1, 2], [2, 1], [2, 2]].forEach(([x, y]) => { m.push([x, y, 1, 'muro'], [x, y, 2, 'muro']); });
      m.push([1, 1, 3, 'tejado'], [2, 1, 3, 'tejado'], [1, 2, 3, 'tejado'], [2, 2, 3, 'tejado']);
      m.push([0, 4, 1, 'tronco'], [0, 4, 2, 'tronco'], [0, 4, 3, 'hoja'], [0, 3, 3, 'hoja'], [1, 4, 3, 'hoja'], [0, 4, 4, 'hoja'], [5, 0, 1, 'piedra']);
      return voxeles(S, m, 200, 70, 22);
    }
  });
  add('isla-bloques', {
    nombre: 'Isla de bloques', grupo: 'Videojuegos', escena: true,
    dibujo(S) {
      let o = S.fondo('#8fd0f0', '#e6f6fb', 'ibC');
      const m = [];
      const forma = [[0, 1, 1, 1, 0, 0], [1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1], [0, 0, 1, 1, 1, 0]];
      forma.forEach((row, y) => row.forEach((v, x) => { if (v) { m.push([x, y, 0, 'tierra'], [x, y, 1, 'hierba']); if ((x + y) % 3 === 0) m.push([x, y, -1, 'piedra']); } }));
      m.push([2, 2, 2, 'tronco'], [2, 2, 3, 'tronco'], [2, 2, 4, 'hoja'], [1, 2, 4, 'hoja'], [2, 1, 4, 'hoja'], [3, 2, 4, 'hoja'], [2, 3, 4, 'hoja'], [2, 2, 5, 'hoja'], [4, 3, 2, 'piedra']);
      return o + voxeles(S, m, 190, 80, 20);
    }
  });
  add('bloques', {
    nombre: 'Mundo de bloques', grupo: 'Videojuegos', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#7ec0ee"/><rect x="300" y="30" width="40" height="40" fill="#fff6a8"/>`;
      o += `<rect x="40" y="50" width="80" height="20" fill="#fff"/><rect x="60" y="40" width="40" height="10" fill="#fff"/>`;
      const s = 25, alt = [6, 6, 7, 7, 7, 6, 5, 5, 6, 6, 6, 7, 7, 6, 6, 6];
      const r = rng(3);
      alt.forEach((h, i) => {
        for (let j = 0; j < h; j++) {
          const y = 300 - (j + 1) * s, top = j === h - 1, x = i * s;
          const c = top ? '#5fa83a' : j > h - 3 ? '#8a5a32' : '#7a7a76';
          o += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${c}"/>`;
          for (let k = 0; k < 3; k++) o += `<rect x="${x + Math.floor(r() * 4) * 6}" y="${y + Math.floor(r() * 4) * 6}" width="6" height="6" fill="${shade(c, r() > 0.5 ? 0.15 : -0.15)}"/>`;
          if (top) o += `<rect x="${x}" y="${y + 18}" width="${s}" height="7" fill="#8a5a32"/>`;
        }
      });
      o += [0, 1, 2].map(j => `<rect x="${3 * s}" y="${300 - (8 + j) * s}" width="${s}" height="${s}" fill="#6a4a2a"/>`).join('') + `<rect x="${1 * s}" y="${300 - 13 * s}" width="${5 * s}" height="${3 * s}" fill="#3f8a2a"/><rect x="${2 * s}" y="${300 - 14 * s}" width="${3 * s}" height="${s}" fill="#3f8a2a"/>`;
      return o;
    }
  });
  add('avatar-bloques', {
    nombre: 'Avatar de bloques', grupo: 'Videojuegos',
    dibujo(S) {
      let o = S.sombra(200, 286, 80, 8);
      o += `<rect x="150" y="196" width="46" height="88" ${S.f('#2b59c3')}/><rect x="204" y="196" width="46" height="88" ${S.f('#2b59c3')}/>`;
      o += `<rect x="146" y="110" width="108" height="92" ${S.f('#3aa65a')}/><rect x="104" y="110" width="40" height="92" ${S.f('#f2c14e')}/><rect x="256" y="110" width="40" height="92" ${S.f('#f2c14e')}/>`;
      o += `<rect x="160" y="34" width="80" height="74" rx="14" ${S.f('#f2c14e')}/><rect x="182" y="58" width="9" height="16" ${S.f('#1b1b1b')}/><rect x="209" y="58" width="9" height="16" ${S.f('#1b1b1b')}/><path d="M184 86 Q200 98 216 86" ${S.k('#1b1b1b', 4)}/>`;
      return o;
    }
  });
  add('arcade', {
    nombre: 'Máquina arcade', grupo: 'Videojuegos',
    dibujo(S) {
      let o = S.sombra(200, 286, 90, 8);
      o += `<path d="M130 20 H270 L280 60 L264 150 L280 180 V286 H120 V180 L136 150 L120 60 Z" ${S.f('#2a1f5a')}/><rect x="136" y="26" width="128" height="30" ${S.f('#ff5ec4')}/><text x="200" y="48" text-anchor="middle" font-size="17" font-weight="900" fill="#2a1f5a" ${MONO}>ARCADE</text>`;
      o += `<rect x="140" y="66" width="120" height="84" rx="6" ${S.f('#05060f')}/>` + [[160, 90], [184, 90], [208, 90], [232, 90], [172, 108], [196, 108], [220, 108]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="14" height="10" fill="${['#7cf05a', '#ffd36e', '#3ad6f0'][i % 3]}"/>`).join('') + `<rect x="194" y="134" width="14" height="8" fill="#ff5ec4"/>`;
      o += `<rect x="120" y="160" width="160" height="26" ${S.f('#3a2f7a')}/><circle cx="160" cy="166" r="9" ${S.f('#e2574c')}/><path d="M160 174 V182" ${S.k('#1b1b1b', 4)}/><circle cx="220" cy="172" r="7" ${S.f('#ffd36e')}/><circle cx="244" cy="172" r="7" ${S.f('#3ad6f0')}/>`;
      o += `<rect x="180" y="210" width="40" height="30" rx="3" ${S.f('#1a1240')}/><rect x="194" y="218" width="12" height="14" ${S.f('#ffd36e')}/>`;
      return o;
    }
  });
  add('portatil', {
    nombre: 'Consola portátil retro', grupo: 'Videojuegos',
    dibujo(S) {
      let o = S.sombra(200, 290, 80, 6);
      o += `<path d="M120 10 H280 V250 Q280 290 240 290 H120 Z" ${S.f('#c9c6bc')}/><rect x="136" y="26" width="128" height="104" rx="6" ${S.f('#5a5a6a')}/>`;
      o += `<rect x="152" y="38" width="96" height="80" ${S.f('#9bbc0f')}/>`;
      const px = ['....DD....', '...DDDD...', '..DLDDLD..', '..DDDDDD..', '...DDDD...', '..LDDDDL..', '..D....D..'];
      px.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== '.') o += `<rect x="${160 + x * 8}" y="${46 + y * 8}" width="8" height="8" fill="${ch === 'D' ? '#0f380f' : '#306230'}"/>`; }));
      o += `<rect x="152" y="104" width="96" height="14" fill="#8bac0f"/>`;
      o += `<path d="M150 186 h36 M168 168 v36" ${S.k('#2a2a2e', 12)}/><circle cx="236" cy="192" r="11" ${S.f('#a5234a')}/><circle cx="260" cy="176" r="11" ${S.f('#a5234a')}/>`;
      o += `<rect x="176" y="226" width="20" height="6" rx="3" transform="rotate(-25 186 229)" ${S.f('#8a8a92')}/><rect x="206" y="226" width="20" height="6" rx="3" transform="rotate(-25 216 229)" ${S.f('#8a8a92')}/>`;
      return o;
    }
  });
  add('sala-arcade', {
    nombre: 'Sala arcade', grupo: 'Videojuegos', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#0c0618"/>`;
      S.def('saSuelo', '<pattern id="saSuelo" width="40" height="40" patternUnits="userSpaceOnUse"><rect width="40" height="40" fill="#1a0f2e"/><rect width="20" height="20" fill="#24143e"/><rect x="20" y="20" width="20" height="20" fill="#24143e"/></pattern>');
      o += `<rect y="220" width="400" height="80" fill="url(#saSuelo)"/>`;
      const cab = (x, s, c) => `<g transform="translate(${x} 220) scale(${s})"><path d="M-40 0 V-150 L-34 -170 H34 L40 -150 V0 Z" fill="#1f1440"/><rect x="-32" y="-164" width="64" height="16" fill="${c}"/><rect x="-30" y="-140" width="60" height="50" fill="${c}" opacity=".35"/><rect x="-30" y="-140" width="60" height="50" fill="none" stroke="${c}" stroke-width="2"/><rect x="-40" y="-84" width="80" height="14" fill="#2a1f5a"/></g>` + S.halo(x, 220 - 115 * s, 50 * s, c, 0.45);
      o += cab(60, 0.9, '#ff5ec4') + cab(150, 1, '#3ad6f0') + cab(250, 1, '#ffd36e') + cab(340, 0.9, '#7cf05a');
      o += `<text x="200" y="40" text-anchor="middle" font-size="28" font-weight="900" fill="#ff5ec4" ${MONO} style="filter:drop-shadow(0 0 6px #ff5ec4)">GAME ON</text>`;
      return o;
    }
  });
  add('sprites', {
    nombre: 'Hoja de sprites', grupo: 'Videojuegos', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" fill="#2a2f3a"/>`;
      S.def('spG', '<pattern id="spG" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#e8e8e8"/><rect width="8" height="8" fill="#d0d0d0"/><rect x="8" y="8" width="8" height="8" fill="#d0d0d0"/></pattern>');
      const base = ['..HHHH..', '.HHHHHH.', '.SSEESS.', '.SSSSSS.', '..BBBB..', '.BBBBBB.', 'S.BBBB.S', '..PPPP..'];
      const piernas = [['..P..P..', '..P..P..'], ['.P....P.', 'P......P'], ['..P..P..', '..P..P..'], ['...PP...', '..P..P..']];
      const col = { H: '#7a3a1a', S: '#f2c19a', E: '#1b1b1b', B: '#2b59c3', P: '#3a3f48' };
      for (let f = 0; f < 4; f++) {
        const x0 = 20 + (f % 2) * 190, y0 = 14 + Math.floor(f / 2) * 142;
        o += `<rect x="${x0}" y="${y0}" width="170" height="130" fill="url(#spG)"/><text x="${x0 + 6}" y="${y0 + 14}" font-size="10" ${MONO} fill="#666">${f + 1}</text>`;
        [...base, ...piernas[f]].forEach((row, y) => [...row].forEach((ch, x) => { if (col[ch]) o += `<rect x="${x0 + 49 + x * 9}" y="${y0 + 12 + y * 9 + (f % 2 ? -3 : 0)}" width="9" height="9" fill="${col[ch]}"/>`; }));
      }
      return o;
    }
  });
  add('jefe', {
    nombre: 'Combate contra jefe final', grupo: 'Videojuegos', escena: true,
    dibujo(S) {
      let o = S.fondo('#2a0f1a', '#5a1a2a', 'jeC') + `<path d="M0 240 H400 V300 H0Z" ${S.f('#1a0a10')}/>`;
      o += S.halo(250, 130, 130, '#ff3a3a', 0.4);
      o += `<path d="M180 240 C170 160 200 80 260 70 C320 80 350 160 340 240 Z" ${S.f('#5a2a6a')}/><path d="M200 90 L180 30 L220 76 Z M320 90 L340 30 L300 76 Z" ${S.f('#e8dcc0')}/>`;
      o += `<path d="M226 120 L246 128 L226 134 Z M294 120 L274 128 L294 134 Z" ${S.f('#ffd23f')}/><path d="M230 170 L240 186 L250 170 L260 186 L270 170 L280 186 L290 170" ${S.f('#e8dcc0')}/>`;
      o += `<g transform="translate(80 220)"><rect x="-8" y="-30" width="16" height="30" ${S.f('#2b59c3')}/><circle cx="0" cy="-38" r="9" ${S.f('#f2c19a')}/><path d="M8 -26 L30 -48" ${S.k('#dfe6ea', 4)}/></g>`;
      o += `<rect x="20" y="16" width="360" height="16" rx="3" ${S.f('#1b1b1b')}/><rect x="22" y="18" width="250" height="12" rx="2" ${S.f('#e2402f')}/><text x="24" y="50" font-size="13" font-weight="900" fill="#ffd23f" ${MONO}>JEFE FINAL</text>`;
      return o;
    }
  });
  add('blister', {
    nombre: 'Figura de acción en blíster', grupo: 'Juguetes', escena: true,
    dibujo(S) {
      let o = `<rect width="400" height="300" ${S.f('#dfe3e8')}/>`;
      o += `<rect x="90" y="10" width="220" height="284" rx="10" ${S.f('#e2402f')}/><rect x="176" y="18" width="48" height="12" rx="6" ${S.f('#dfe3e8')}/><text x="200" y="58" text-anchor="middle" font-size="26" font-weight="900" fill="#ffd23f" font-family="Impact, 'Arial Black', sans-serif">HÉROE</text>`;
      o += `<rect x="108" y="70" width="184" height="206" rx="18" fill="#ffffff" opacity=".35"/><rect x="108" y="70" width="184" height="206" rx="18" fill="none" stroke="#fff" stroke-width="2"/>`;
      o += `<svg x="110" y="74" width="120" height="200" viewBox="80 20 240 300">${M.motivos.retrato.dibujo(S, '', {})}</svg>`;
      o += `<rect x="240" y="90" width="40" height="60" rx="6" fill="#ffffff" opacity=".5"/><path d="M252 104 L268 136 M260 100 V140" ${S.k('#3a3f48', 4)}/><rect x="240" y="166" width="40" height="40" rx="6" fill="#ffffff" opacity=".5"/><circle cx="260" cy="186" r="12" ${S.f('#f2c14e')}/>`;
      o += `<path d="M118 82 L150 82" stroke="#fff" stroke-width="5" opacity=".8" stroke-linecap="round"/>`;
      return o;
    }
  });

  /* ============================================================
     OBJETOS DE MÚSICA, FOTO Y ESCRITURA
     ============================================================ */
  add('tocadiscos', {
    nombre: 'Tocadiscos', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(200, 262, 160, 10);
      o += `<rect x="40" y="70" width="320" height="180" rx="12" ${S.f('#a8744a')}/><rect x="52" y="82" width="296" height="156" rx="8" ${S.f('#2a2622')}/>`;
      o += `<circle cx="170" cy="160" r="70" ${S.f('#111')}/>` + [60, 50, 40].map(r => `<circle cx="170" cy="160" r="${r}" ${S.k('#2a2a2a', 1.4)}/>`).join('') + `<circle cx="170" cy="160" r="22" ${S.f('#e2574c')}/><circle cx="170" cy="160" r="3" ${S.f('#ddd')}/>`;
      o += `<circle cx="300" cy="110" r="12" ${S.f('#9aa4ac')}/><path d="M300 110 L290 196 L230 196" ${S.k('#c9ced2', 5)}/><rect x="222" y="190" width="14" height="10" ${S.f('#5a5f66')}/>`;
      o += `<circle cx="310" cy="220" r="7" ${S.f('#c9ced2')}/><circle cx="286" cy="220" r="7" ${S.f('#c9ced2')}/>`;
      return o;
    }
  });
  add('casete', {
    nombre: 'Casete', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(204, 262, 150, 10);
      o += `<rect x="50" y="56" width="300" height="196" rx="14" ${S.f('#2a2a30')}/><rect x="72" y="74" width="256" height="110" rx="6" ${S.f('#f2c14e')}/><rect x="72" y="74" width="256" height="26" rx="6" ${S.f('#e2574c')}/>`;
      o += `<text x="88" y="94" font-size="14" font-weight="700" fill="#fff" ${MONO}>MIXTAPE 86</text>`;
      o += `<rect x="114" y="116" width="172" height="54" rx="27" ${S.f('#2a2a30')}/><circle cx="148" cy="143" r="20" ${S.f('#f6f0e2')}/><circle cx="252" cy="143" r="20" ${S.f('#f6f0e2')}/>` + [148, 252].map(x => `<circle cx="${x}" cy="143" r="9" ${S.f('#2a2a30')}/>`).join('') + `<rect x="176" y="134" width="48" height="18" ${S.f('#5a3a2a')}/>`;
      o += `<path d="M110 252 L126 204 H274 L290 252" ${S.f('#3a3a42')}/>` + [150, 180, 220, 250].map(x => `<circle cx="${x}" cy="230" r="5" ${S.f('#1b1b1f')}/>`).join('');
      return o;
    }
  });
  add('radiocasete', {
    nombre: 'Radiocasete', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(200, 268, 170, 10);
      o += `<path d="M120 60 Q200 20 280 60" ${S.k('#3a3a42', 10)}/><rect x="30" y="60" width="340" height="200" rx="16" ${S.f('#c9ced2')}/>`;
      o += [100, 300].map(x => `<circle cx="${x}" cy="176" r="60" ${S.f('#2a2a30')}/><circle cx="${x}" cy="176" r="40" ${S.k('#4a4a52', 3)}/><circle cx="${x}" cy="176" r="16" ${S.f('#5a5a62')}/>`).join('');
      o += `<rect x="166" y="120" width="68" height="44" rx="4" ${S.f('#2a2a30')}/><circle cx="185" cy="142" r="9" ${S.f('#c9ced2')}/><circle cx="215" cy="142" r="9" ${S.f('#c9ced2')}/>`;
      o += `<rect x="50" y="76" width="300" height="28" rx="4" ${S.f('#2a2a30')}/><rect x="60" y="84" width="140" height="12" ${S.f('#ff8a3a')}/>` + [220, 246, 272, 298, 324].map(x => `<rect x="${x}" y="82" width="18" height="16" rx="2" ${S.f('#8a8f96')}/>`).join('');
      o += [180, 200, 220].map(x => `<rect x="${x - 6}" y="180" width="12" height="60" rx="3" ${S.f('#5a5a62')}/>`).join('');
      return o;
    }
  });
  add('auriculares', {
    nombre: 'Auriculares', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(200, 274, 120, 10, 0.22);
      o += `<path d="M96 190 C80 70 320 70 304 190" ${S.k('#2a2e34', 18)}/><path d="M104 160 C100 96 300 96 296 160" ${S.k('#5a6068', 6)}/>`;
      o += [[90, 1], [310, -1]].map(([x, s]) => `<rect x="${x - 34}" y="160" width="68" height="100" rx="30" ${S.f('#2a2e34')}/><rect x="${x - 26 + s * 6}" y="170" width="52" height="80" rx="24" ${S.f('#e9e4dc')}/><rect x="${x - 34}" y="160" width="20" height="100" rx="10" ${S.f('#3a3f46')}/>`).join('');
      return o;
    }
  });
  add('camara', {
    nombre: 'Cámara de fotos', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(200, 264, 150, 10, 0.22);
      o += `<rect x="70" y="88" width="80" height="24" rx="6" ${S.f('#2a2e34')}/><rect x="250" y="94" width="40" height="18" rx="4" ${S.f('#2a2e34')}/>`;
      o += `<rect x="50" y="106" width="300" height="150" rx="18" ${S.f('#1f2328')}/><rect x="50" y="140" width="300" height="82" ${S.f('#8a6a4a')}/>`;
      o += `<circle cx="200" cy="180" r="70" ${S.f('#2a2e34')}/><circle cx="200" cy="180" r="54" ${S.f('#11141a')}/><circle cx="200" cy="180" r="38" fill="${S.rg('caL', [['#5a8aff', 0], ['#1a2a5a', 0.6], ['#05070f', 1]], 0.4, 0.35, 0.7)}"/><circle cx="186" cy="166" r="9" fill="#fff" opacity=".6"/>`;
      o += `<circle cx="310" cy="124" r="8" ${S.f('#e2574c')}/><rect x="74" y="122" width="34" height="12" rx="2" ${S.f('#dfe6ea')}/>`;
      return o;
    }
  });
  add('objetivo', {
    nombre: 'Objetivo de cine', grupo: 'Objetos', escena: true,
    dibujo(S) {
      let o = negro(S, 'obC', '#0d0f12', '#1d2026');
      o += `<circle cx="200" cy="150" r="136" ${S.f('#1b1d22')}/>` + Array.from({ length: 48 }, (_, i) => { const a = i * 7.5 * Math.PI / 180; return `<path d="M${r1(200 + Math.cos(a) * 126)} ${r1(150 + Math.sin(a) * 126)} L${r1(200 + Math.cos(a) * 136)} ${r1(150 + Math.sin(a) * 136)}" ${S.k('#3a3d44', 3)}/>`; }).join('');
      o += `<circle cx="200" cy="150" r="112" ${S.f('#2a2d34')}/><text x="200" y="66" text-anchor="middle" font-size="11" fill="#f2c14e" ${MONO}>50mm  T1.5</text>`;
      o += `<circle cx="200" cy="150" r="86" fill="${S.rg('obL', [['#7a5aff', 0], ['#2a6a9a', 0.4], ['#0a1020', 0.85], ['#000', 1]], 0.4, 0.4, 0.6)}"/>`;
      o += `<ellipse cx="170" cy="120" rx="26" ry="14" transform="rotate(-30 170 120)" fill="#fff" opacity=".35"/><circle cx="234" cy="184" r="8" fill="#ffd36e" opacity=".5"/><circle cx="200" cy="150" r="86" ${S.k('#4a4d54', 3)}/>`;
      return o;
    }
  });
  add('maquina-escribir', {
    nombre: 'Máquina de escribir', grupo: 'Objetos',
    dibujo(S) {
      let o = S.sombra(200, 272, 160, 10);
      o += `<rect x="130" y="30" width="140" height="100" ${S.f('#fbf8f0')}/>` + [50, 64, 78, 92].map(y => `<path d="M146 ${y} H${240 - (y % 3) * 10}" ${S.k('#3a3a3a', 2.4)}/>`).join('');
      o += `<rect x="70" y="110" width="260" height="24" rx="10" ${S.f('#2a2e34')}/><circle cx="70" cy="122" r="14" ${S.f('#3a3f46')}/><circle cx="330" cy="122" r="14" ${S.f('#3a3f46')}/>`;
      o += `<path d="M80 134 H320 L350 266 H50 Z" ${S.f('#2f5a4a')}/><path d="M120 140 Q200 120 280 140 L270 170 H130 Z" ${S.f('#1f3a30')}/>`;
      for (let f = 0; f < 3; f++) for (let i = 0; i < 9 - f; i++) o += `<circle cx="${r1(112 + f * 12 + i * 22)}" cy="${190 + f * 22}" r="8" ${S.f('#f4efe4')}/><circle cx="${r1(112 + f * 12 + i * 22)}" cy="${190 + f * 22}" r="8" ${S.k('#1b1b1b', 2)}/>`;
      o += `<rect x="150" y="246" width="100" height="10" rx="5" ${S.f('#f4efe4')}/>`;
      return o;
    }
  });
})();
