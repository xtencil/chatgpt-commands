/*!
 * Prompt Atlas · Motivos de animales, naturaleza y espacio
 */
(function () {
  'use strict';
  const M = window.Miniaturas;
  const { pts, star, r1, rng, shade } = M.util;
  const add = M.motivo;

  const cielo = (S, a, b, id) => S.fondo(a, b, id);
  const estrellas = (S, n = 60, maxY = 300, seed = 3) => {
    const r = rng(seed);
    return Array.from({ length: n }, () => `<circle cx="${r1(r() * 400)}" cy="${r1(r() * maxY)}" r="${r1(0.5 + r() * 1.3)}" fill="#fff" opacity="${r1(0.35 + r() * 0.65)}"/>`).join('');
  };

  /* ============================================================
     ANIMALES
     ============================================================ */
  add('gato', {
    nombre: 'Gato', grupo: 'Animales',
    dibujo(S) {
      const n = '#e8944a', nS = '#c46f2c', bl = '#fbf3e6';
      let o = S.sombra(205, 276, 92, 10);
      o += `<path d="M240 262 C292 274 326 238 304 196 C300 186 288 188 290 198 C306 232 282 252 244 246 Z" ${S.f(n)}/>`;
      o += `<path d="M146 272 C134 226 154 176 200 168 C246 176 266 226 254 272 Z" ${S.f(n)}/>`;
      o += `<path d="M180 272 C176 236 186 204 200 200 C214 204 224 236 220 272 Z" ${S.f(bl)}/>`;
      o += `<ellipse cx="180" cy="270" rx="16" ry="9" ${S.f(bl)}/><ellipse cx="220" cy="270" rx="16" ry="9" ${S.f(bl)}/>`;
      o += `<path d="M150 112 L158 54 L196 88 Z M250 112 L242 54 L204 88 Z" ${S.f(n)}/><path d="M160 98 L163 70 L184 88 Z M240 98 L237 70 L216 88 Z" ${S.f('#f2a7a0')}/>`;
      o += `<ellipse cx="200" cy="126" rx="56" ry="48" ${S.f(n)}/>`;
      o += `<path d="M186 82 L190 98 M200 80 V98 M214 82 L210 98 M146 124 H160 M240 124 H254" ${S.k(nS, 4)}/>`;
      o += `<ellipse cx="190" cy="152" rx="15" ry="11" ${S.f(bl)}/><ellipse cx="210" cy="152" rx="15" ry="11" ${S.f(bl)}/>`;
      o += `<ellipse cx="178" cy="122" rx="10" ry="12" ${S.f('#a6cf5d')}/><ellipse cx="222" cy="122" rx="10" ry="12" ${S.f('#a6cf5d')}/><ellipse cx="178" cy="122" rx="3" ry="10" ${S.f('#1b1f22')}/><ellipse cx="222" cy="122" rx="3" ry="10" ${S.f('#1b1f22')}/>`;
      o += `<path d="M193 142 H207 L200 150 Z" ${S.f('#e57f8a')}/><path d="M200 150 Q196 158 189 156 M200 150 Q204 158 211 156" ${S.k('#5b3a2a', 2)}/>`;
      o += `<path d="M168 150 L132 144 M168 156 L134 160 M232 150 L268 144 M232 156 L266 160" ${S.k('#8c6a52', 1.5)}/>`;
      return o;
    }
  });

  add('perro', {
    nombre: 'Perro', grupo: 'Animales',
    dibujo(S) {
      const n = '#c98d55', nS = '#7a4f2e', bl = '#f6ecdf';
      let o = S.sombra(200, 276, 96, 10);
      o += `<path d="M142 272 C130 222 152 178 200 172 C248 178 270 222 258 272 Z" ${S.f(n)}/><path d="M178 272 C176 232 186 206 200 204 C214 206 224 232 222 272 Z" ${S.f(bl)}/>`;
      o += `<ellipse cx="176" cy="270" rx="17" ry="9" ${S.f(bl)}/><ellipse cx="224" cy="270" rx="17" ry="9" ${S.f(bl)}/>`;
      o += `<path d="M150 112 C132 106 120 140 128 176 C134 196 152 192 158 172 Z M250 112 C268 106 280 140 272 176 C266 196 248 192 242 172 Z" ${S.f(nS)}/>`;
      o += `<path d="M152 120 C152 80 174 64 200 64 C226 64 248 80 248 120 C248 150 232 176 200 176 C168 176 152 150 152 120 Z" ${S.f(n)}/>`;
      o += `<path d="M200 70 C192 90 192 116 200 130 C208 116 208 90 200 70 Z" ${S.f(bl)}/>`;
      o += `<ellipse cx="200" cy="152" rx="30" ry="24" ${S.f(bl)}/>`;
      o += `<circle cx="180" cy="118" r="7" ${S.f('#2a1d14')}/><circle cx="220" cy="118" r="7" ${S.f('#2a1d14')}/><circle cx="182" cy="116" r="2" fill="#fff"/><circle cx="222" cy="116" r="2" fill="#fff"/>`;
      o += `<ellipse cx="200" cy="140" rx="11" ry="8" ${S.f('#2a1d14')}/><path d="M200 148 V156 M200 156 Q192 164 184 158 M200 156 Q208 164 216 158" ${S.k('#2a1d14', 2.2)}/>`;
      o += `<path d="M193 162 Q200 184 207 162 Z" ${S.f('#e2727a')}/>`;
      return o;
    }
  });

  add('lobo', {
    nombre: 'Lobo', grupo: 'Animales', escena: true,
    dibujo(S) {
      let o = cielo(S, '#1b2440', '#4a5a82', 'loboC') + estrellas(S, 40, 200, 9);
      o += S.halo(270, 110, 110, '#f4f1e0', 0.35) + `<circle cx="270" cy="110" r="70" ${S.f('#efeadb')}/>`;
      o += `<path d="M0 250 L60 210 L110 236 L170 196 L240 240 L300 214 L400 244 V300 H0 Z" ${S.f('#141b30')}/>`;
      const g = '#8b939c', gL = '#cfd5da', gD = '#5b636c';
      o += `<path d="M200 274 L150 214 L120 150 L128 70 L170 112 L200 104 L230 112 L272 70 L280 150 L250 214 Z" ${S.f(g)}/>`;
      o += `<path d="M138 84 L148 128 L166 114 Z M262 84 L252 128 L234 114 Z" ${S.f('#3e434a')}/>`;
      o += `<path d="M120 150 L150 214 L200 274 L170 200 L150 160 Z M280 150 L250 214 L200 274 L230 200 L250 160 Z" ${S.f(gD)}/>`;
      o += `<path d="M200 274 L176 208 L172 160 L200 148 L228 160 L224 208 Z" ${S.f(gL)}/>`;
      o += `<path d="M160 146 L188 152 L178 162 Z M240 146 L212 152 L222 162 Z" ${S.f('#f2c14e')}/><path d="M176 150 L182 156 M224 150 L218 156" ${S.k('#1a1a1a', 3)}/>`;
      o += `<path d="M188 246 H212 L200 260 Z" ${S.f('#1d1f22')}/>`;
      return o;
    }
  });

  add('zorro', {
    nombre: 'Zorro', grupo: 'Animales',
    dibujo(S) {
      const n = '#e2763a', nS = '#b9562a', bl = '#fbf3ea';
      let o = S.sombra(200, 280, 100, 9);
      o += `<path d="M232 272 C300 280 344 236 330 184 C322 160 300 170 306 192 C316 230 290 252 240 250 Z" ${S.f(n)}/><path d="M316 198 C330 176 336 168 330 184 C338 212 328 236 312 248 C320 230 322 214 316 198 Z" ${S.f(bl)}/>`;
      o += `<path d="M158 276 C150 236 166 196 200 190 C234 196 250 236 242 276 Z" ${S.f(n)}/><path d="M182 276 C182 244 190 214 200 210 C210 214 218 244 218 276 Z" ${S.f(bl)}/>`;
      o += `<path d="M140 118 L148 40 L192 92 Z M260 118 L252 40 L208 92 Z" ${S.f(n)}/><path d="M146 66 L148 40 L166 62 Z M254 66 L252 40 L234 62 Z" ${S.f('#2a1d18')}/>`;
      o += `<path d="M132 120 C136 88 166 76 200 76 C234 76 264 88 268 120 C262 150 230 176 200 200 C170 176 138 150 132 120 Z" ${S.f(n)}/>`;
      o += `<path d="M132 120 C150 128 176 140 200 200 C170 176 138 150 132 120 Z M268 120 C250 128 224 140 200 200 C230 176 262 150 268 120 Z" ${S.f(bl)}/>`;
      o += `<path d="M166 116 Q178 108 190 118 Q178 122 166 116 Z M234 116 Q222 108 210 118 Q222 122 234 116 Z" ${S.f('#2a1d18')}/>`;
      o += `<ellipse cx="200" cy="194" rx="9" ry="7" ${S.f('#2a1d18')}/>`;
      return o;
    }
  });

  add('leon', {
    nombre: 'León', grupo: 'Animales',
    dibujo(S) {
      let o = `<polygon points="${star(200, 140, 118, 92, 22)}" ${S.f('#a8562a')}/><polygon points="${star(200, 140, 100, 78, 18, -80)}" ${S.f('#c9762f')}/>`;
      o += `<circle cx="146" cy="88" r="16" ${S.f('#d9a25f')}/><circle cx="254" cy="88" r="16" ${S.f('#d9a25f')}/><circle cx="146" cy="88" r="8" ${S.f('#b37a3f')}/><circle cx="254" cy="88" r="8" ${S.f('#b37a3f')}/>`;
      o += `<path d="M152 118 C152 82 176 70 200 70 C224 70 248 82 248 118 C248 160 232 196 200 204 C168 196 152 160 152 118 Z" ${S.f('#e2b46d')}/>`;
      o += `<path d="M176 160 C176 140 224 140 224 160 C224 188 212 200 200 200 C188 200 176 188 176 160 Z" ${S.f('#f4e2c3')}/>`;
      o += `<ellipse cx="178" cy="122" rx="7" ry="6" ${S.f('#3a2a18')}/><ellipse cx="222" cy="122" rx="7" ry="6" ${S.f('#3a2a18')}/><path d="M168 110 L188 114 M232 110 L212 114" ${S.k('#9a6a35', 3)}/>`;
      o += `<path d="M188 150 H212 L200 162 Z" ${S.f('#5a3824')}/><path d="M200 162 V172 M200 172 Q192 180 184 174 M200 172 Q208 180 216 174" ${S.k('#5a3824', 2.4)}/>`;
      return o;
    }
  });

  add('buho', {
    nombre: 'Búho', grupo: 'Animales',
    dibujo(S) {
      const n = '#8a6244', nD = '#6a4630';
      let o = `<path d="M60 262 Q200 248 340 262" ${S.k('#5a3b26', 12)}/>`;
      o += `<path d="M134 168 C132 104 160 62 200 62 C240 62 268 104 266 168 C264 226 236 262 200 262 C164 262 136 226 134 168 Z" ${S.f(n)}/>`;
      o += `<path d="M150 80 L140 40 L176 70 Z M250 80 L260 40 L224 70 Z" ${S.f(nD)}/>`;
      o += `<path d="M134 168 C126 210 146 248 176 258 C158 230 150 200 152 166 Z M266 168 C274 210 254 248 224 258 C242 230 250 200 248 166 Z" ${S.f(nD)}/>`;
      o += `<path d="M168 168 C168 150 232 150 232 168 C236 210 220 246 200 250 C180 246 164 210 168 168 Z" ${S.f('#e9d3b4')}/>`;
      o += [[188, 184], [212, 184], [200, 200], [186, 216], [214, 216], [200, 232]].map(([x, y]) => `<path d="M${x - 6} ${y} L${x} ${y + 6} L${x + 6} ${y}" ${S.k('#a07a58', 2)}/>`).join('');
      o += `<circle cx="172" cy="122" r="30" ${S.f('#f2e6d0')}/><circle cx="228" cy="122" r="30" ${S.f('#f2e6d0')}/>`;
      o += `<circle cx="172" cy="122" r="17" ${S.f('#f2a531')}/><circle cx="228" cy="122" r="17" ${S.f('#f2a531')}/><circle cx="172" cy="122" r="9" ${S.f('#1b1410')}/><circle cx="228" cy="122" r="9" ${S.f('#1b1410')}/><circle cx="168" cy="118" r="3" fill="#fff"/><circle cx="224" cy="118" r="3" fill="#fff"/>`;
      o += `<path d="M192 140 L208 140 L200 160 Z" ${S.f('#e0a03a')}/>`;
      o += `<path d="M178 258 v10 M188 258 v10 M212 258 v10 M222 258 v10" ${S.k('#d39a3a', 4)}/>`;
      return o;
    }
  });

  function ave(S, c, fuego) {
    let o = '';
    const ala = (sx) => {
      let w = `<path d="M${200 + sx * 22} 130 C${200 + sx * 70} 92 ${200 + sx * 130} 60 ${200 + sx * 186} 52 L${200 + sx * 176} 78 L${200 + sx * 190} 84 L${200 + sx * 172} 104 L${200 + sx * 184} 112 L${200 + sx * 160} 132 L${200 + sx * 168} 142 L${200 + sx * 138} 158 L${200 + sx * 140} 168 L${200 + sx * 104} 174 C${200 + sx * 70} 176 ${200 + sx * 40} 170 ${200 + sx * 22} 160 Z" ${S.f(c.ala)}/>`;
      w += `<path d="M${200 + sx * 22} 130 C${200 + sx * 70} 92 ${200 + sx * 130} 60 ${200 + sx * 186} 52 L${200 + sx * 176} 78 C${200 + sx * 120} 92 ${200 + sx * 70} 116 ${200 + sx * 26} 146 Z" ${S.f(c.alaL)}/>`;
      return w;
    };
    if (fuego) o += S.halo(200, 150, 170, '#ff8a2a', 0.6);
    o += ala(-1) + ala(1);
    o += `<path d="M180 220 L170 272 L190 258 L200 280 L210 258 L230 272 L220 220 Z" ${S.f(c.cola)}/>`;
    o += `<path d="M176 132 C170 170 178 210 200 228 C222 210 230 170 224 132 Z" ${S.f(c.cuerpo)}/>`;
    o += `<path d="M178 132 C176 104 188 86 204 86 C220 88 228 104 222 132 C214 142 186 142 178 132 Z" ${S.f(c.cabeza)}/>`;
    o += `<path d="M206 108 C226 106 236 116 232 132 C226 126 218 124 208 126 Z" ${S.f(c.pico)}/><circle cx="206" cy="104" r="3.6" ${S.f('#1b1410')}/>`;
    if (!fuego) o += `<path d="M184 226 l-6 12 M192 228 l-2 12 M208 228 l2 12 M216 226 l6 12" ${S.k(c.pico, 4)}/>`;
    return o;
  }
  add('aguila', {
    nombre: 'Águila', grupo: 'Animales',
    dibujo(S) { return ave(S, { ala: '#5a3a24', alaL: '#7a5236', cuerpo: '#4a2f1d', cabeza: '#f6f2ea', pico: '#f0b429', cola: '#f1ece2' }); }
  });
  add('fenix', {
    nombre: 'Fénix', grupo: 'Animales', escena: true,
    dibujo(S) {
      return cielo(S, '#2a0f1f', '#5a1a1f', 'fenC') + ave(S, { ala: '#e8431f', alaL: '#ffb02e', cuerpo: '#c9321a', cabeza: '#ffcf4a', pico: '#ffe9a6', cola: '#ff7a1a' }, true) +
        [[120, 250], [280, 246], [200, 290]].map(([x, y], i) => `<path d="M${x} ${y} C${x - 20} ${y - 30} ${x + 10} ${y - 40} ${x} ${y - 70} C${x + 26} ${y - 40} ${x + 22} ${y - 18} ${x} ${y} Z" ${S.f(i % 2 ? '#ff7a1a' : '#ffb02e')} opacity=".85"/>`).join('');
    }
  });

  function caballo(S, uni) {
    const n = uni ? '#f7f4f8' : '#8a5634', crin = uni ? null : '#3a2418';
    let o = '';
    o += `<path d="M300 300 C292 236 270 196 240 168 L236 104 C232 76 214 56 188 54 L182 34 L170 56 C140 66 112 102 96 140 C90 154 96 168 110 170 C130 172 150 162 168 156 C184 164 196 190 196 222 L188 300 Z" ${S.f(n)}/>`;
    o += `<path d="M96 140 C90 154 96 168 110 170 C122 172 132 168 140 164 C130 150 112 140 96 140 Z" ${S.f(uni ? '#e8dfe9' : '#6e4329')}/>`;
    if (uni) {
      const cols = ['#ff9ec7', '#ffd36e', '#8fe3c8', '#9ec5ff', '#c9a7ff'];
      o += cols.map((c, i) => `<path d="M${196 + i * 12} ${54 + i * 6} C${236 + i * 10} ${80 + i * 14} ${252 + i * 8} ${150 + i * 20} ${290 + i * 4} ${300} L${276 + i * 6} 300 C${240 + i * 6} ${190 + i * 10} ${220 + i * 8} ${110 + i * 10} ${190 + i * 10} ${62 + i * 6} Z" ${S.f(c)}/>`).join('');
      o += `<path d="M168 60 L150 2 L180 56 Z" ${S.f('#f2c14e')}/><path d="M158 34 L172 38 M154 22 L168 26" ${S.k('#c99a2e', 2)}/>`;
    } else {
      o += `<path d="M190 54 C232 72 252 140 286 300 L262 300 C244 210 220 120 182 64 Z" ${S.f(crin)}/>`;
    }
    o += `<circle cx="168" cy="96" r="6" ${S.f('#1b1410')}/><circle cx="110" cy="150" r="4" ${S.f('#2a1a12')}/>`;
    return o;
  }
  add('caballo', {
    nombre: 'Caballo', grupo: 'Animales', variantes: { unicornio: 'Unicornio' },
    dibujo(S, v) { return caballo(S, v === 'unicornio'); }
  });

  add('mariposa', {
    nombre: 'Mariposa', grupo: 'Animales',
    dibujo(S) {
      let o = '';
      for (const sx of [-1, 1]) {
        o += `<path d="M200 140 C${200 + sx * 40} 60 ${200 + sx * 150} 30 ${200 + sx * 168} 70 C${200 + sx * 184} 110 ${200 + sx * 120} 150 200 150 Z" ${S.f('#f08a24')}/>`;
        o += `<path d="M200 150 C${200 + sx * 110} 150 ${200 + sx * 150} 196 ${200 + sx * 126} 236 C${200 + sx * 100} 270 ${200 + sx * 40} 230 200 160 Z" ${S.f('#e46a1c')}/>`;
        o += `<path d="M${200 + sx * 168} 70 C${200 + sx * 184} 110 ${200 + sx * 120} 150 200 150 C${200 + sx * 110} 130 ${200 + sx * 150} 100 ${200 + sx * 160} 66 Z" ${S.f('#2a1f1a')}/>`;
        o += `<circle cx="${200 + sx * 140}" cy="78" r="7" ${S.f('#fff6e8')}/><circle cx="${200 + sx * 118}" cy="104" r="6" ${S.f('#fff6e8')}/><circle cx="${200 + sx * 110}" cy="214" r="9" ${S.f('#fff6e8')}/><circle cx="${200 + sx * 70}" cy="96" r="12" ${S.f('#ffc35a')}/>`;
      }
      o += `<ellipse cx="200" cy="160" rx="8" ry="58" ${S.f('#2a1f1a')}/><path d="M196 104 C188 76 176 62 166 58 M204 104 C212 76 224 62 234 58" ${S.k('#2a1f1a', 2.5)}/>`;
      return o;
    }
  });

  add('grifo', {
    nombre: 'Grifo', grupo: 'Animales',
    dibujo(S) {
      let o = S.sombra(210, 284, 120, 9);
      o += `<path d="M150 150 C110 110 120 50 160 30 C180 70 210 92 250 110 C230 140 190 158 150 150 Z" ${S.f('#8a6a48')}/><path d="M160 30 C180 70 210 92 250 110 L240 124 C204 110 176 84 160 30 Z" ${S.f('#b08a5c')}/>`;
      o += `<path d="M300 170 C340 160 356 120 340 96 C336 130 320 146 296 150 Z" ${S.f('#d6a25a')}/><circle cx="342" cy="94" r="10" ${S.f('#7a4f2e')}/>`;
      o += `<path d="M130 196 C130 160 170 140 220 142 C270 144 304 160 300 200 C298 226 284 240 270 242 L270 280 H254 L250 244 L184 246 L180 280 H164 L162 240 C140 232 130 218 130 196 Z" ${S.f('#d6a25a')}/>`;
      o += `<path d="M110 120 C110 92 128 78 148 80 C170 84 176 112 168 152 L136 196 C120 180 108 150 110 120 Z" ${S.f('#f4eee2')}/>`;
      o += `<path d="M112 108 C92 108 82 118 84 134 C94 126 104 124 114 126 Z" ${S.f('#f0b429')}/><circle cx="128" cy="102" r="4" ${S.f('#1b1410')}/>`;
      o += `<path d="M136 196 L128 262 L146 262 M150 200 L150 266 L166 266" ${S.k('#f0b429', 6)}/>`;
      return o;
    }
  });

  add('kraken', {
    nombre: 'Kraken', grupo: 'Animales', escena: true,
    dibujo(S) {
      let o = cielo(S, '#2a3a52', '#6e8299', 'krC');
      o += `<path d="M150 150 L170 120 L230 120 L246 150 Z" ${S.f('#5a3a24')}/><path d="M196 120 V60 M196 66 L230 84 L196 100" ${S.k('#3a2618', 4)}/><path d="M198 66 L228 82 L198 96 Z" ${S.f('#e9e1cc')}/>`;
      const t = (d, w) => `<path d="${d}" ${S.f('#8e3b5a')}/>`;
      o += t('M60 300 C40 220 90 160 70 110 C64 94 84 92 88 108 C102 170 70 220 96 300 Z');
      o += t('M330 300 C360 220 300 170 330 120 C340 104 356 112 350 128 C330 180 372 230 352 300 Z');
      o += t('M250 300 C250 240 300 210 290 170 C288 158 302 156 304 170 C312 220 276 250 282 300 Z');
      o += t('M120 300 C130 250 100 220 118 186 C124 176 136 182 132 194 C122 226 154 256 150 300 Z');
      o += [[78, 140], [84, 170], [336, 150], [344, 190], [292, 200], [124, 210]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" ${S.f('#e8a3b6')}/>`).join('');
      o += `<path d="M0 230 C40 216 80 244 120 230 C160 216 200 244 240 230 C280 216 320 244 360 230 C380 224 400 228 400 228 V300 H0 Z" ${S.f('#1f3a5a')}/><path d="M0 254 C50 240 100 266 150 252 C200 240 250 266 300 252 C340 242 370 252 400 248 V300 H0 Z" ${S.f('#172c45')}/>`;
      return o;
    }
  });

  add('dragon', {
    nombre: 'Dragón', grupo: 'Animales', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f29b5b', '#fde3b4', 'drC');
      o += `<path d="M0 230 L70 170 L120 210 L190 140 L260 214 L320 180 L400 222 V300 H0 Z" ${S.f('#8a5a6a')}/><path d="M0 262 L90 226 L170 260 L260 232 L400 266 V300 H0 Z" ${S.f('#5a3a4e')}/>`;
      const d = '#3f7a52', dD = '#2c5a3c', ala = '#5a9a6a';
      o += `<path d="M190 150 C150 80 110 50 60 40 C80 60 84 80 70 90 C90 96 96 110 86 124 C110 122 120 136 112 150 C140 140 160 150 170 166 Z" ${S.f(ala)}/>`;
      o += `<path d="M190 150 C150 80 110 50 60 40 M190 150 L70 90 M180 156 L86 124 M176 164 L112 150" ${S.k(dD, 2.5)}/>`;
      o += `<path d="M150 176 C180 150 250 146 280 166 C300 180 296 200 270 204 C240 210 200 206 170 200 C140 212 100 214 70 196 C100 200 126 192 150 176 Z" ${S.f(d)}/>`;
      o += `<path d="M60 194 L44 188 L52 204 Z" ${S.f(dD)}/>`;
      o += `<path d="M270 172 C290 150 300 120 312 100 C318 90 334 86 348 92 L372 104 L350 110 L348 118 C334 116 326 124 320 136 C310 156 300 176 284 190 Z" ${S.f(d)}/>`;
      o += `<path d="M326 92 L318 70 L336 88 M338 90 L340 68 L348 92" ${S.k('#e8dcc0', 3)}/><circle cx="338" cy="100" r="3" ${S.f('#ffcf4a')}/>`;
      o += `<path d="M214 202 L208 230 L222 230 M252 202 L256 230 L268 228" ${S.k(dD, 6)}/>`;
      o += `<path d="M240 160 C230 100 214 60 200 30 C228 50 244 70 248 90 C262 82 276 84 286 92 C276 104 270 118 272 136 C262 140 254 150 250 162 Z" ${S.f(ala)}/>`;
      o += `<path d="M372 104 C384 100 392 96 398 90" ${S.k('#ff9a3a', 4)}/>`;
      return o;
    }
  });

  /* ============================================================
     ESPACIO
     ============================================================ */
  const negro = (S, id, a = '#05070f', b = '#141a35') => cielo(S, a, b, id);

  add('espacio', {
    nombre: 'Espacio profundo', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'espC') + estrellas(S, 90, 300, 4);
      o += S.halo(120, 110, 150, '#6a3aa8', 0.35);
      o += `<circle cx="300" cy="80" r="26" ${S.f('#d9a37a')}/><path d="M276 78 C290 70 310 72 324 82" ${S.k('#b8805a', 3)}/>`;
      o += `<path d="M-40 300 C-40 214 80 180 200 180 C320 180 440 214 440 300 Z" ${S.f('#2f6fa8')}/><path d="M40 222 C80 206 120 214 150 230 C130 244 90 246 60 240 Z M220 206 C260 198 300 206 330 220 C300 230 260 228 230 222 Z" ${S.f('#5aa36a')}/>`;
      o += `<path d="M-40 300 C-40 214 80 180 200 180 C320 180 440 214 440 300" ${S.k('#8fd0ff', 4, ' opacity=".6"')}/>`;
      return o;
    }
  });

  add('galaxia', {
    nombre: 'Galaxia', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'galC', '#04050c', '#0d1030') + estrellas(S, 70, 300, 7);
      o += S.halo(200, 150, 170, '#5b3fb0', 0.45);
      const r = rng(5);
      for (let i = 0; i < 520; i++) {
        const arm = i % 3, t = r() * 4.2, ang = t * 1.2 + arm * 2.094, rad = 10 + t * 38;
        const x = 200 + Math.cos(ang) * rad * 1.35 + (r() - 0.5) * 16, y = 150 + Math.sin(ang) * rad * 0.62 + (r() - 0.5) * 10;
        const col = t < 1.2 ? '#fff1c9' : r() > 0.5 ? '#9fc4ff' : '#e0a8ff';
        o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(0.6 + r() * 1.6)}" fill="${S.modo === 'fill' ? col : S.lc}" opacity="${r1(0.4 + r() * 0.6)}"/>`;
      }
      o += S.halo(200, 150, 50, '#fff3d0', 0.9);
      return o;
    }
  });

  add('planeta', {
    nombre: 'Planeta con anillos', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'plC', '#070914', '#1a1430') + estrellas(S, 60, 300, 12);
      const g = S.lg('plG', ['#f2c48a', '#d4864a', '#8a4a2a'], 0, 0, 1, 1);
      o += `<path d="M70 190 A140 34 -14 0 1 336 120" ${S.k('#e8d2a8', 14, ' opacity=".9"')}/>`;
      o += `<circle cx="200" cy="150" r="88" ${S.f(g)}/>`;
      o += `<path d="M118 120 C160 110 230 110 280 128 M114 160 C170 150 236 154 286 170 M126 196 C170 190 220 194 264 206" ${S.k('#f6dcb4', 6, ' opacity=".55"')}/>`;
      o += `<path d="M336 120 A140 34 -14 0 1 70 190" ${S.k('#f3e3c4', 14)}/><path d="M60 196 A150 38 -14 0 0 346 116" ${S.k('#c9a878', 3, ' opacity=".8"')}/>`;
      return o;
    }
  });

  add('nebulosa', {
    nombre: 'Nebulosa', grupo: 'Espacio', escena: true,
    dibujo(S) {
      S.def('nebF', `<filter id="nebF" ${M.util.FR}><feTurbulence type="fractalNoise" baseFrequency=".008 .012" numOctaves="5" seed="31"/><feColorMatrix type="matrix" values="1.6 0 0 0 -.55  0 .5 0 0 -.15  0 0 1.9 0 -.45  2.2 0 0 0 -1"/></filter>`);
      S.def('nebF2', `<filter id="nebF2" ${M.util.FR}><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="4" seed="8"/><feColorMatrix type="matrix" values="0 0 0 0 .1  0 1.8 0 0 -.4  0 0 2.2 0 -.3  1.4 0 0 0 -.62"/></filter>`);
      let o = negro(S, 'nebC', '#04040a', '#0a0a1e');
      if (S.modo === 'fill') o += `<rect width="400" height="300" filter="url(#nebF)" opacity=".85" style="mix-blend-mode:screen"/><rect width="400" height="300" filter="url(#nebF2)" style="mix-blend-mode:screen"/>`;
      else o += S.halo(200, 150, 150, '#ff6ad5', 0.5);
      return o + estrellas(S, 80, 300, 21) + S.halo(250, 120, 18, '#ffffff', 0.9);
    }
  });

  add('agujeronegro', {
    nombre: 'Agujero negro', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'anC', '#020205', '#0b0b18') + estrellas(S, 70, 300, 15);
      const disco = S.lg('anD', ['#ff7a1a', '#ffe0a0', '#ffffff', '#ffe0a0', '#ff5a1a'], 0, 0, 1, 0);
      o += S.halo(200, 150, 160, '#ff8a2a', 0.35);
      o += `<path d="M118 150 C118 96 282 96 282 150" ${S.k('#ffcf8a', 12, ' opacity=".9"')}/>`;
      o += `<ellipse cx="200" cy="150" rx="170" ry="30" fill="none" stroke="${disco}" stroke-width="16"/>`;
      o += `<circle cx="200" cy="150" r="62" ${S.f('#000000')}/>`;
      o += `<path d="M30 150 C30 168 370 168 370 150" ${S.k('#ffe7b8', 12)}/><circle cx="200" cy="150" r="64" ${S.k('#ffd59a', 2.5, ' opacity=".9"')}/>`;
      return o;
    }
  });

  add('eclipse', {
    nombre: 'Eclipse solar', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'ecC', '#05060f', '#1b2148') + estrellas(S, 40, 300, 2);
      o += S.halo(200, 140, 150, '#fff2c4', 0.75);
      for (let i = 0; i < 36; i++) {
        const a = i * 10 * Math.PI / 180, l = 80 + (i % 3) * 18;
        o += `<path d="M${r1(200 + Math.cos(a) * 64)} ${r1(140 + Math.sin(a) * 64)} L${r1(200 + Math.cos(a) * l)} ${r1(140 + Math.sin(a) * l)}" ${S.k('#fff6dc', 1.6, ' opacity=".55"')}/>`;
      }
      o += `<circle cx="200" cy="140" r="62" ${S.f('#000000')}/><circle cx="200" cy="140" r="63" ${S.k('#ffffff', 2)}/><circle cx="252" cy="110" r="5" fill="#fff"/>`;
      o += `<path d="M0 270 C80 250 160 266 240 258 C320 250 360 262 400 256 V300 H0Z" ${S.f('#0b0e1c')}/>`;
      return o;
    }
  });

  add('cometa', {
    nombre: 'Cometa', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = negro(S, 'coC', '#05081a', '#1a2a50') + estrellas(S, 80, 300, 33);
      const cola = S.lg('coT', [['#9fd8ff', 0], ['#9fd8ff', 1]], 0, 0, 1, 0);
      void cola;
      o += `<path d="M300 80 L40 250 L60 270 Z" fill="${S.lg('coG', [['#bfe6ff', 0], ['#5a8fd0', 1]], 1, 0, 0, 1)}" opacity=".7"/>`;
      o += `<path d="M300 80 L90 240" ${S.k('#ffffff', 3, ' opacity=".6"')}/>`;
      o += S.halo(300, 80, 50, '#d8f1ff', 0.9) + `<circle cx="300" cy="80" r="10" ${S.f('#ffffff')}/>`;
      o += `<path d="M0 262 C90 244 180 264 260 252 C330 242 370 256 400 250 V300 H0Z" ${S.f('#0c1226')}/>`;
      return o;
    }
  });

  add('marte', {
    nombre: 'Marte', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = cielo(S, '#e8b08c', '#f6d6b8', 'maC');
      o += `<circle cx="320" cy="64" r="12" ${S.f('#f4ece0')}/><circle cx="84" cy="90" r="6" ${S.f('#efe2d0')}/>`;
      o += `<path d="M0 170 L80 140 L130 160 L200 120 L260 156 L330 136 L400 162 V300 H0Z" ${S.f('#c4673e')}/>`;
      o += `<path d="M0 214 C80 196 160 222 240 206 C310 194 360 212 400 204 V300 H0Z" ${S.f('#a9502c')}/>`;
      o += `<ellipse cx="90" cy="256" rx="26" ry="10" ${S.f('#8a3e22')}/><ellipse cx="330" cy="236" rx="18" ry="7" ${S.f('#8a3e22')}/>`;
      o += `<g transform="translate(220 222)"><rect x="0" y="0" width="64" height="20" rx="3" ${S.f('#e9e4dc')}/><rect x="8" y="-14" width="22" height="14" ${S.f('#c9c2b6')}/><path d="M40 0 V-26 M34 -26 H52" ${S.k('#9a948a', 3)}/><circle cx="10" cy="26" r="8" ${S.f('#3a3a3a')}/><circle cx="32" cy="26" r="8" ${S.f('#3a3a3a')}/><circle cx="54" cy="26" r="8" ${S.f('#3a3a3a')}/></g>`;
      return o;
    }
  });

  add('alienigena', {
    nombre: 'Mundo alienígena', grupo: 'Espacio', escena: true,
    dibujo(S) {
      let o = cielo(S, '#3a1f6e', '#d06aa0', 'alC') + estrellas(S, 30, 140, 8);
      o += `<circle cx="300" cy="80" r="40" ${S.f('#f6c2e2')}/><circle cx="230" cy="54" r="16" ${S.f('#9ef0d8')}/>`;
      o += `<path d="M0 200 C60 170 130 190 200 176 C270 162 340 186 400 172 V300 H0Z" ${S.f('#2a8f8a')}/>`;
      const planta = (x, y, h, c) => `<path d="M${x} ${y} C${x - 4} ${y - h * 0.5} ${x + 6} ${y - h * 0.8} ${x} ${y - h}" ${S.k('#1e5a5a', 6)}/><ellipse cx="${x}" cy="${y - h}" rx="24" ry="12" ${S.f(c)}/><circle cx="${x - 8}" cy="${y - h - 2}" r="3" fill="#fff" opacity=".7"/>`;
      o += planta(90, 230, 90, '#ff8ad0') + planta(320, 236, 110, '#ffd36e') + planta(250, 250, 60, '#9ef0d8');
      o += `<path d="M0 250 C80 232 160 256 240 240 C310 228 360 246 400 240 V300 H0Z" ${S.f('#1c5f6a')}/>`;
      return o;
    }
  });

  /* ============================================================
     NATURALEZA Y CLIMA
     ============================================================ */
  add('oceano', {
    nombre: 'Océano', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#8cc6e6', '#e6f3f6', 'ocC');
      o += `<circle cx="300" cy="80" r="24" ${S.f('#ffe39a')}/>` + `<path d="M0 150 H400 V300 H0Z" ${S.f('#2f7fb0')}/>`;
      o += [170, 196, 226, 260].map((y, i) => `<path d="M0 ${y} C40 ${y - 10} 60 ${y - 10} 100 ${y} S160 ${y + 10} 200 ${y} S260 ${y - 10} 300 ${y} S360 ${y + 10} 400 ${y} V300 H0Z" ${S.f(['#3a8fc0', '#2f7aaa', '#246593', '#1b4f78'][i])}/>`).join('');
      o += `<path d="M120 196 C140 186 160 186 180 196 M250 226 C270 216 290 216 310 226 M40 262 C60 252 80 252 100 262" ${S.k('#ffffff', 3, ' opacity=".6"')}/>`;
      o += `<path d="M250 150 L262 128 L274 150 Z" ${S.f('#ffffff')}/><path d="M244 150 H282 L276 158 H250 Z" ${S.f('#b9533c')}/>`;
      return o;
    }
  });

  add('submarino', {
    nombre: 'Fondo marino', grupo: 'Naturaleza', escena: true, variantes: { naufragio: 'Naufragio' },
    dibujo(S, v) {
      let o = cielo(S, '#2fa0c4', '#0b3a5c', 'subC');
      o += [60, 150, 250, 330].map((x, i) => `<path d="M${x} 0 L${x + 40} 0 L${x + 90 + i * 10} 300 L${x + 20} 300 Z" fill="#ffffff" opacity=".07"/>`).join('');
      o += `<path d="M0 250 C80 236 160 256 240 244 C320 232 360 248 400 242 V300 H0Z" ${S.f('#d9c08a')}/>`;
      if (v === 'naufragio') {
        o += `<path d="M110 250 L140 180 L300 196 L320 252 Z" ${S.f('#5a3e2a')}/><path d="M140 180 L300 196 L296 206 L144 192 Z" ${S.f('#7a5536')}/><path d="M210 186 L180 90 M180 100 L240 120" ${S.k('#4a3220', 6)}/>`;
        o += `<circle cx="180" cy="220" r="8" ${S.f('#1c2a30')}/><circle cx="220" cy="224" r="8" ${S.f('#1c2a30')}/><circle cx="260" cy="228" r="8" ${S.f('#1c2a30')}/>`;
      } else {
        o += `<path d="M70 250 C60 210 80 190 70 160 M70 210 C90 200 96 186 94 170 M70 200 C52 192 48 178 50 164" ${S.k('#ff7f6a', 7)}/>`;
        o += `<path d="M320 250 C320 220 340 200 336 176 M332 214 C350 206 356 194 354 182" ${S.k('#f2c14e', 7)}/>`;
      }
      const pez = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C10 -12 34 -12 44 0 C34 12 10 12 0 0 Z" ${S.f(c)}/><path d="M44 0 L58 -10 L58 10 Z" ${S.f(c)}/><circle cx="10" cy="-2" r="2.4" fill="#1b1b1b"/></g>`;
      o += pez(150, 110, 1.2, '#ffb02e') + pez(230, 150, 0.9, '#ff7f6a') + pez(260, 90, 0.7, '#9ef0d8') + pez(110, 170, 0.6, '#f6e27a');
      o += [[200, 60], [206, 40], [196, 24], [300, 120], [304, 104]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${3 + (i % 2) * 2}" ${S.k('#d6f3ff', 1.5, ' opacity=".8"')}/>`).join('');
      return o;
    }
  });

  add('selva', {
    nombre: 'Selva', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#d9efc0', '#9fcf8a', 'seC');
      o += S.halo(220, 90, 120, '#fff6c8', 0.6);
      const hoja = (x, y, rot, s, c) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C20 -40 60 -50 90 -30 C70 -10 40 10 0 0 Z" ${S.f(c)}/><path d="M0 0 C30 -20 60 -28 90 -30" ${S.k(shade(c, -0.25), 2)}/></g>`;
      const cols = ['#2f7a3f', '#3f8f4a', '#1f5a32', '#5aa65a', '#24683a'];
      const r = rng(4);
      for (let i = 0; i < 26; i++) {
        const left = i % 2 === 0;
        o += hoja(left ? -10 + r() * 120 : 290 + r() * 120, 40 + r() * 260, left ? -20 + r() * 50 : 160 + r() * 50, 0.8 + r() * 0.8, cols[i % 5]);
      }
      o += `<path d="M150 0 C140 60 170 120 150 190 M250 0 C262 50 240 100 256 160" ${S.k('#3a5a2a', 4)}/>`;
      o += `<path d="M0 260 C100 236 300 236 400 260 V300 H0Z" ${S.f('#1f4a2a')}/>`;
      o += `<g transform="translate(200 150)"><path d="M0 0 C-6 -20 10 -34 24 -26 C34 -18 30 4 20 14 L12 46 L2 46 Z" ${S.f('#e2402f')}/><path d="M18 -20 L34 -18 L22 -12 Z" ${S.f('#f2c14e')}/><circle cx="16" cy="-20" r="2.5" fill="#1b1b1b"/><path d="M2 10 L-16 40 L6 30 Z" ${S.f('#2f6fd1')}/></g>`;
      return o;
    }
  });

  add('desierto', {
    nombre: 'Desierto', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#f4c27a', '#fbe7c4', 'deC');
      o += S.halo(290, 110, 100, '#fff2c8', 0.7) + `<circle cx="290" cy="110" r="34" ${S.f('#fff4d6')}/>`;
      o += `<path d="M0 190 C80 160 150 200 220 180 C290 160 350 186 400 176 V300 H0Z" ${S.f('#e6a85e')}/>`;
      o += `<path d="M0 226 C70 200 150 240 230 214 C300 192 360 222 400 214 V300 H0Z" ${S.f('#d18a44')}/>`;
      o += `<path d="M0 262 C90 236 180 276 270 252 C330 236 370 256 400 250 V300 H0Z" ${S.f('#b9702f')}/>`;
      o += `<path d="M150 180 C190 170 230 190 220 214" ${S.k('#f2c48a', 2.5, ' opacity=".8"')}/>`;
      o += `<g transform="translate(110 196)"><path d="M0 0 C6 -10 18 -10 24 -2 L30 -12 C34 -18 42 -16 40 -8 L34 6 L34 14 L30 14 L30 6 L6 6 L6 14 L2 14 Z" ${S.f('#6a4626')}/></g>`;
      return o;
    }
  });

  add('volcan', {
    nombre: 'Volcán', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#2a1a24', '#a2402a', 'voC');
      o += `<path d="M150 90 C120 60 140 20 180 26 C200 0 250 10 250 40 C290 40 296 80 260 92 Z" ${S.f('#4a3a3e')} opacity=".9"/>`;
      o += S.halo(200, 110, 120, '#ff6a1a', 0.55);
      o += `<path d="M40 300 L170 104 H230 L360 300 Z" ${S.f('#3a2a2a')}/>`;
      o += `<path d="M178 104 L170 150 L186 140 L182 200 L200 160 L214 230 L222 150 L232 166 L222 104 Z" ${S.f('#ff7a1a')}/><path d="M190 104 L194 140 L204 124 L210 104 Z" ${S.f('#ffd36e')}/>`;
      o += `<path d="M0 260 C80 246 160 266 240 254 C320 244 360 258 400 252 V300 H0Z" ${S.f('#1e1416')}/>`;
      return o;
    }
  });

  add('nubes', {
    nombre: 'Nubes', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#5a8fd0', '#f6d9c4', 'nuC');
      const nb = (x, y, s, c, sh) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-80 30 C-96 6 -70 -16 -48 -8 C-46 -40 -6 -50 10 -26 C22 -54 70 -50 72 -16 C98 -18 108 14 90 30 Z" ${S.f(c)}/><path d="M-80 30 C-60 20 40 22 90 30 Z" ${S.f(sh)}/></g>`;
      o += nb(110, 100, 1.1, '#fbf3ee', '#d9c2c8') + nb(300, 70, 0.8, '#fdf6f0', '#e0c8cc') + nb(240, 200, 1.4, '#f8eae6', '#cbb0bc') + nb(70, 230, 0.9, '#f4e2e0', '#c9aab8');
      return o;
    }
  });

  add('humo', {
    nombre: 'Humo', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      S.def('humoF', `<filter id="humoF" ${M.util.FR}><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="6"/><feDisplacementMap in="SourceGraphic" scale="60" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="7"/></filter>`);
      let o = cielo(S, '#0c0d10', '#22252b', 'huC');
      o += `<g filter="url(#humoF)" opacity=".85">` +
        `<path d="M200 300 C170 240 240 200 200 150 C160 100 230 70 210 10" ${S.k('#d8dde3', 40, ' opacity=".6"')}/>` +
        `<path d="M220 300 C260 250 200 200 250 150 C290 110 240 70 270 20" ${S.k('#aab3bd', 30, ' opacity=".55"')}/>` +
        `<path d="M180 300 C140 260 170 210 130 170 C100 140 130 100 110 60" ${S.k('#c9d0d8', 24, ' opacity=".5"')}/></g>`;
      return o;
    }
  });

  add('fuego', {
    nombre: 'Fuego', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#0d0a14', '#2a1420', 'fuC') + estrellas(S, 30, 140, 41);
      o += S.halo(200, 200, 170, '#ff7a1a', 0.55);
      o += `<path d="M200 250 C130 230 130 160 170 110 C170 150 190 160 196 150 C180 110 200 60 230 40 C226 90 270 120 266 170 C264 214 240 244 200 250 Z" ${S.f('#e8431f')}/>`;
      o += `<path d="M200 250 C160 236 160 190 184 160 C186 186 200 190 204 180 C200 156 214 130 230 118 C232 156 250 176 246 206 C242 232 226 248 200 250 Z" ${S.f('#ff9a2a')}/>`;
      o += `<path d="M200 250 C182 242 180 220 192 204 C194 214 202 216 206 210 C206 198 214 186 222 180 C226 200 232 212 228 228 C224 244 214 250 200 250 Z" ${S.f('#ffe08a')}/>`;
      o += `<path d="M120 262 L280 236 M120 236 L280 262" ${S.k('#5a3420', 18)}/>`;
      o += [[150, 120], [260, 100], [230, 70], [170, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" ${S.f('#ffcf6a')}/>`).join('');
      return o;
    }
  });

  add('campo-flores', {
    nombre: 'Campo de flores', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#9ccbe6', '#f3f0dc', 'cfC');
      o += `<path d="M0 160 C100 140 300 140 400 160 V300 H0Z" ${S.f('#9cc46a')}/><path d="M0 180 C100 170 300 170 400 180 V300 H0Z" ${S.f('#86b45a')}/>`;
      const r = rng(19), cols = ['#e2574c', '#f2c14e', '#ffffff', '#c06ad0', '#ff8ab0'];
      for (let i = 0; i < 140; i++) {
        const y = 170 + Math.pow(r(), 0.7) * 130, s = 0.6 + (y - 170) / 60, x = r() * 400;
        o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(1.6 * s)}" ${S.f(cols[i % 5])}/>`;
      }
      return o;
    }
  });

  add('bonsai', {
    nombre: 'Bonsái', grupo: 'Naturaleza',
    dibujo(S) {
      let o = S.sombra(200, 270, 110, 8);
      o += `<path d="M120 238 H280 L266 270 H134 Z" ${S.f('#3a5a7a')}/><rect x="112" y="228" width="176" height="12" rx="3" ${S.f('#4a6f94')}/>`;
      o += `<path d="M196 232 C188 200 214 186 206 160 C200 140 172 140 160 118 M206 170 C228 158 250 150 268 124 M200 150 C214 130 210 110 220 92" ${S.k('#6a4a34', 10)}/>`;
      o += [[150, 108, 34], [276, 116, 30], [222, 82, 32], [190, 96, 22]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r * 1.4}" ry="${r * 0.75}" ${S.f('#4f8f4a')}/><ellipse cx="${x - 6}" cy="${y - 6}" rx="${r}" ry="${r * 0.45}" ${S.f('#6fae5a')}/>`).join('');
      return o;
    }
  });

  add('jardin', {
    nombre: 'Jardín', grupo: 'Naturaleza', escena: true,
    dibujo(S) {
      let o = cielo(S, '#bfe0ef', '#f2f1e2', 'jaC');
      o += `<path d="M0 150 H400 V300 H0Z" ${S.f('#7fae5c')}/>`;
      o += `<path d="M160 300 C180 240 190 200 200 150 C210 200 220 240 240 300 Z" ${S.f('#e6d6b6')}/>`;
      const seto = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="26" rx="12" ${S.f('#3f7a44')}/>`;
      o += seto(10, 140, 150) + seto(240, 140, 150) + `<circle cx="80" cy="128" r="30" ${S.f('#4f8f4a')}/><circle cx="320" cy="128" r="30" ${S.f('#4f8f4a')}/>`;
      const r = rng(12);
      for (let i = 0; i < 60; i++) {
        const left = i % 2, x = left ? 20 + r() * 120 : 260 + r() * 120, y = 190 + r() * 100;
        o += `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(3 + r() * 3)}" ${S.f(['#e2574c', '#f2c14e', '#ff8ab0', '#ffffff'][i % 4])}/>`;
      }
      o += `<rect x="186" y="120" width="28" height="30" ${S.f('#b9b2a6')}/><path d="M176 120 H224" ${S.k('#9a948a', 5)}/><circle cx="200" cy="110" r="10" ${S.f('#8fc3e0')}/>`;
      return o;
    }
  });
})();
