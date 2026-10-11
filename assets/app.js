/*!
 * Prompt Atlas · aplicación
 * Lee los datos de data/comandos.js y data/consejos.js.
 * Solo guarda en el navegador (localStorage): favoritos, mezcla y preferencias.
 */
(function () {
  'use strict';

  /* ---------- Constantes ---------- */
  const TIPOS = ['Estilo', 'Luz', 'Cámara', 'Material', 'Motivo', 'Formato', 'UI'];
  const COLOR_TIPO = { Estilo: '#e07a4f', Luz: '#e8a317', 'Cámara': '#3b82f6', Material: '#9a7ad8', Motivo: '#3aa65a', Formato: '#e05a8a', UI: '#20a4a4' };
  const APARTADO = { Estilo: 'Estilo visual', Luz: 'Iluminación y atmósfera', 'Cámara': 'Cámara y encuadre', Material: 'Material y acabado', Motivo: 'Motivo / escena', Formato: 'Formato de la pieza', UI: 'Interfaz' };
  const COMPARABLES = new Set(['Estilo', 'Luz', 'Cámara', 'Material']);
  const FORMATOS = [['', 'Libre'], ['1:1', '1:1 · cuadrado'], ['4:5', '4:5 · Instagram'], ['9:16', '9:16 · story / reel'], ['16:9', '16:9 · web / vídeo'], ['3:2', '3:2 · foto'], ['2:3', '2:3 · póster / A4']];
  const MAX_MEZCLA = 6;
  const CLAVE = { fav: 'atlas:favoritos', mezcla: 'atlas:mezcla', prefs: 'atlas:prefs' };

  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  const leer = (k, def) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? def; } catch (e) { return def; } };
  const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* modo privado: la app sigue funcionando */ } };

  const ICON = {
    corazon: '<svg class="corazon" aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    mas: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    copiar: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
    cerrar: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    descargar: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    editar: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>'
  };

  /* ---------- Datos ---------- */
  const DATOS = window.ATLAS || {};
  const CONSEJOS = DATOS.consejos || { porTipo: {}, rapidos: [], guia: [] };
  const problemas = [];
  const items = [];
  (DATOS.categorias || []).forEach(cat => {
    (cat.comandos || []).forEach(c => {
      if (!c || typeof c.comando !== 'string' || !c.comando.startsWith('/')) { problemas.push(`Un comando de «${cat.categoria}» no tiene un nombre válido (debe empezar por /).`); return; }
      if (items.some(x => x.id === c.comando.toLowerCase())) { problemas.push(`${c.comando} está repetido.`); return; }
      const tipo = TIPOS.includes(c.tipo) ? c.tipo : 'Estilo';
      if (c.tipo && !TIPOS.includes(c.tipo)) problemas.push(`${c.comando}: tipo «${c.tipo}» desconocido (usa ${TIPOS.join(', ')}).`);
      const receta = c.miniatura || c.comando.slice(1);
      if (c.miniatura && window.Miniaturas && !Miniaturas.valida(c.miniatura)) problemas.push(`${c.comando}: la miniatura «${c.miniatura}» no existe (mira miniaturas.html).`);
      items.push({
        id: c.comando.toLowerCase(), comando: c.comando, categoria: cat.categoria || 'Sin categoría', tipo,
        descripcion: String(c.descripcion || ''), prompt: String(c.prompt || c.descripcion || '').trim(),
        etiquetas: Array.isArray(c.etiquetas) ? c.etiquetas.map(String) : [],
        receta, imagen: c.imagen ? String(c.imagen) : '', favoritoFijo: c.favorito === true, orden: items.length
      });
    });
  });
  const categorias = [...new Set(items.map(x => x.categoria))];

  /* ---------- Estado ---------- */
  let favoritos = leer(CLAVE.fav, null);
  if (!favoritos) {
    // Migración desde la versión anterior (guardaba la colección entera en el navegador).
    favoritos = {};
    const viejo = leer('prompt-atlas-items-v1', null);
    if (viejo && Array.isArray(viejo.items)) viejo.items.forEach(x => { if (x && x.fav && typeof x.command === 'string') favoritos[x.command.toLowerCase()] = true; });
    guardar(CLAVE.fav, favoritos);
  }
  let mezcla = leer(CLAVE.mezcla, []).filter(id => items.some(x => x.id === id)).slice(0, MAX_MEZCLA);
  const prefs = Object.assign({ vista: 'rejilla', orden: 'origen', tema: 'sistema', sujeto: '', formato: '', modo: 'crear' }, leer(CLAVE.prefs, {}));
  const estado = { q: '', vista: 'todos', tipo: '', categoria: '', abierto: null, lista: [], consejo: Math.floor(Math.random() * Math.max(1, (CONSEJOS.rapidos || []).length)), ultimoFoco: null };

  const esFav = it => (it.id in favoritos ? favoritos[it.id] : it.favoritoFijo);
  const enMezcla = it => mezcla.includes(it.id);
  const guardarPrefs = () => guardar(CLAVE.prefs, prefs);

  /* ---------- Búsqueda ---------- */
  function terminos(q) { return (q.match(/-?"[^"]+"|-?\S+/g) || []).map(t => norm(t.replace(/^(-?)"(.*)"$/, '$1$2'))); }
  function casiIgual(a, b) {
    if (Math.abs(a.length - b.length) > 1) return false;
    let i = 0, j = 0, e = 0;
    while (i < a.length && j < b.length) { if (a[i] === b[j]) { i++; j++; continue; } if (++e > 1) return false; if (a.length > b.length) i++; else if (b.length > a.length) j++; else { i++; j++; } }
    return e + (i < a.length || j < b.length ? 1 : 0) <= 1;
  }
  function coincide(it, q) {
    const ts = terminos(q);
    if (!ts.length) return true;
    const pajar = norm([it.comando, it.descripcion, it.prompt, it.categoria, it.tipo, ...it.etiquetas].join(' '));
    return ts.every(t => {
      const neg = t.startsWith('-') && t.length > 1;
      let tok = neg ? t.slice(1) : t, campo = pajar;
      const op = tok.match(/^(tipo|cat|categoria|tag|etiqueta):(.+)$/);
      if (op) { tok = op[2]; campo = norm(op[1] === 'tipo' ? it.tipo : op[1].startsWith('cat') ? it.categoria : it.etiquetas.join(' ')); }
      else if (tok.startsWith('#')) { tok = tok.slice(1); campo = norm(it.etiquetas.join(' ')); }
      let ok = campo.includes(tok);
      if (!ok && !op && tok.length >= 4) ok = [it.comando.slice(1), ...it.etiquetas].some(w => casiIgual(norm(w), tok));
      return neg ? !ok : ok;
    });
  }
  function relevancia(it, q) {
    let p = 0;
    for (const t of terminos(q)) {
      const c = norm(it.comando.slice(1));
      if (c === t) p += 100; else if (c.startsWith(t)) p += 30; else if (c.includes(t)) p += 12;
      else if (norm(it.etiquetas.join(' ')).includes(t)) p += 6; else if (norm(it.prompt).includes(t)) p += 3;
    }
    return p;
  }
  function filtrar() {
    let r = items.filter(it =>
      (estado.vista !== 'favoritos' || esFav(it)) &&
      (!estado.tipo || it.tipo === estado.tipo) &&
      (!estado.categoria || it.categoria === estado.categoria) &&
      coincide(it, estado.q));
    if (prefs.orden === 'az') r.sort((a, b) => a.comando.localeCompare(b.comando, 'es'));
    else if (prefs.orden === 'tipo') r.sort((a, b) => TIPOS.indexOf(a.tipo) - TIPOS.indexOf(b.tipo) || a.orden - b.orden);
    else if (estado.q.trim()) r.sort((a, b) => relevancia(b, estado.q) - relevancia(a, estado.q) || a.orden - b.orden);
    return r;
  }

  /* ---------- Miniaturas ---------- */
  function srcDe(it, base = false) {
    if (it.imagen && !base) return it.imagen;
    try { return Miniaturas.uri(it.receta, { base }); } catch (e) { console.warn(it.comando, e); return ''; }
  }
  function altDe(it) { return it.imagen ? `Imagen propia de ${it.comando}` : `Referencia: ${Miniaturas.describe(it.receta)}`; }
  function comparable(it) { return !it.imagen && COMPARABLES.has(it.tipo) && Miniaturas.comparable(it.receta); }
  const observador = 'IntersectionObserver' in window ? new IntersectionObserver(entradas => {
    for (const e of entradas) if (e.isIntersecting) { cargarImg(e.target); observador.unobserve(e.target); }
  }, { rootMargin: '400px 0px' }) : null;
  function cargarImg(img) {
    const it = items.find(x => x.id === img.dataset.id);
    if (it && !img.getAttribute('src')) img.src = srcDe(it);
  }

  /* ---------- Render ---------- */
  function botonNav(etiqueta, contador, pulsado, datos, punto = '') {
    return `<li><button type="button" class="nav-item" aria-pressed="${pulsado}" ${datos}>${punto}<span class="etiqueta">${esc(etiqueta)}</span><span class="contador">${contador}</span></button></li>`;
  }
  function renderLateral() {
    const base = items.filter(it => (estado.vista !== 'favoritos' || esFav(it)) && coincide(it, estado.q));
    const nFav = items.filter(esFav).length;
    $('#navVistas').innerHTML =
      botonNav('Todos los comandos', items.length, estado.vista === 'todos', 'data-vista="todos"') +
      botonNav('Favoritos', nFav, estado.vista === 'favoritos', 'data-vista="favoritos"');
    $('#navTipos').innerHTML = TIPOS.map(t => botonNav(t, base.filter(x => x.tipo === t && (!estado.categoria || x.categoria === estado.categoria)).length, estado.tipo === t, `data-tipo="${esc(t)}"`, `<span class="punto-tipo" style="background:${COLOR_TIPO[t]}" aria-hidden="true"></span>`)).join('');
    $('#navCategorias').innerHTML = categorias.map(c => botonNav(c, base.filter(x => x.categoria === c && (!estado.tipo || x.tipo === estado.tipo)).length, estado.categoria === c, `data-categoria="${esc(c)}"`)).join('');
    const activos = (estado.tipo ? 1 : 0) + (estado.categoria ? 1 : 0) + (estado.vista === 'favoritos' ? 1 : 0);
    $('#filtrosActivos').textContent = activos ? `${activos} activo${activos > 1 ? 's' : ''}` : '';
  }
  function tarjetaHTML(it) {
    const fav = esFav(it), mz = enMezcla(it);
    return `<li class="tarjeta">
      <div class="miniatura"><img data-id="${esc(it.id)}" alt="${esc(altDe(it))}" width="400" height="300" decoding="async">${it.imagen ? '<span class="marca-propia">Imagen propia</span>' : ''}</div>
      <div class="tarjeta-cuerpo">
        <h3 class="tarjeta-titulo"><button type="button" class="tarjeta-abrir" data-abrir="${esc(it.id)}" aria-haspopup="dialog">${esc(it.comando)}</button></h3>
        <p class="tarjeta-meta"><span class="chip-tipo"><span class="punto-tipo" style="background:${COLOR_TIPO[it.tipo]}" aria-hidden="true"></span>${esc(it.tipo)}</span><span>${esc(it.categoria)}</span></p>
        <p class="tarjeta-desc">${esc(it.descripcion)}</p>
        <div class="tarjeta-acciones">
          <button type="button" class="accion" data-fav="${esc(it.id)}" aria-pressed="${fav}" aria-label="Favorito ${esc(it.comando)}" title="Favorito">${ICON.corazon}</button>
          <button type="button" class="accion" data-mezcla="${esc(it.id)}" aria-pressed="${mz}" aria-label="Añadir ${esc(it.comando)} a la mezcla" title="Añadir a la mezcla">${ICON.mas}</button>
          <button type="button" class="accion" data-copiar="${esc(it.id)}" aria-label="Copiar prompt de ${esc(it.comando)}" title="Copiar prompt">${ICON.copiar}</button>
        </div>
      </div>
    </li>`;
  }
  function render() {
    const r = filtrar();
    estado.lista = r;
    renderLateral();
    const ul = $('#tarjetas');
    ul.classList.toggle('lista', prefs.vista === 'lista');
    $('#vistaRejilla').setAttribute('aria-pressed', prefs.vista === 'rejilla');
    $('#vistaLista').setAttribute('aria-pressed', prefs.vista === 'lista');
    $('#orden').value = prefs.orden;
    ul.innerHTML = r.map(tarjetaHTML).join('');
    ul.querySelectorAll('img[data-id]').forEach(img => observador ? observador.observe(img) : cargarImg(img));
    $('#vacio').hidden = r.length > 0;
    const filtros = [estado.vista === 'favoritos' && 'favoritos', estado.tipo, estado.categoria].filter(Boolean);
    $('#resultados').innerHTML = `<strong>${r.length}</strong> de ${items.length} comandos${filtros.length ? ` · ${esc(filtros.join(' · '))}` : ''}${estado.q ? ` · «${esc(estado.q)}»` : ''}`;
    $('#limpiar').hidden = !(filtros.length || estado.q);
    renderMezcla();
  }
  function renderConsejo() {
    const lista = CONSEJOS.rapidos || [];
    $('#consejoTexto').textContent = lista.length ? lista[estado.consejo % lista.length] : '';
  }

  /* ---------- Prompt ---------- */
  function construirPrompt(lista, { sujeto, formato, modo }) {
    const grupos = {};
    lista.forEach(it => { (grupos[it.tipo] = grupos[it.tipo] || []).push(it.prompt); });
    const motivo = grupos.Motivo ? grupos.Motivo.join(' y ') : '';
    const suj = (sujeto || '').trim();
    const L = [];
    if (modo === 'editar') {
      L.push('Usa la imagen adjunta como base. Mantén la composición, el encuadre y los rasgos reconocibles del sujeto.');
      if (suj) L.push(`Sujeto: ${suj}.`);
      if (motivo) L.push(`Motivo / escena: ${motivo}.`);
    } else if (suj && motivo) {
      L.push(`Crea una imagen de ${suj}.`);
      L.push(`Motivo / escena: ${motivo}.`);
    } else {
      L.push(`Crea una imagen de ${suj || motivo || '[describe aquí tu sujeto]'}.`);
    }
    TIPOS.filter(t => t !== 'Motivo' && grupos[t]).forEach(t => L.push(`${APARTADO[t]}: ${grupos[t].join('; ')}.`));
    if (formato) L.push(`Proporción ${formato}.`);
    const conTexto = lista.some(it => it.tipo === 'Formato' || it.tipo === 'UI');
    L.push(conTexto ? 'Composición clara y ordenada; textos de relleno breves y legibles solo donde la pieza lo pida; sin marcas de agua.' : 'Composición clara, detalles coherentes, sin texto añadido ni marcas de agua.');
    return L.join('\n');
  }
  function constructorHTML(prefijo, lista) {
    const soloMotivo = lista.every(it => it.tipo === 'Motivo');
    return `<section class="constructor" aria-labelledby="${prefijo}Titulo">
      <h3 class="constructor-titulo" id="${prefijo}Titulo">Prompt listo para copiar</h3>
      <div class="campos">
        <div class="campo-grupo ancho">
          <label for="${prefijo}Sujeto">${soloMotivo ? 'Detalles (opcional)' : 'Sujeto'}</label>
          <input class="campo" id="${prefijo}Sujeto" data-campo="sujeto" value="${esc(prefs.sujeto)}" placeholder="${soloMotivo ? 'ej. al amanecer, con niebla' : 'ej. una taza de cerámica sobre una mesa de madera'}" autocomplete="off">
        </div>
        <div class="campo-grupo">
          <label for="${prefijo}Formato">Proporción</label>
          <select class="selector" id="${prefijo}Formato" data-campo="formato">${FORMATOS.map(([v, t]) => `<option value="${v}"${prefs.formato === v ? ' selected' : ''}>${t}</option>`).join('')}</select>
        </div>
        <fieldset class="campo-grupo">
          <legend>Modo</legend>
          <div class="radios">
            <label><input type="radio" name="${prefijo}Modo" value="crear" data-campo="modo"${prefs.modo !== 'editar' ? ' checked' : ''}>Crear</label>
            <label><input type="radio" name="${prefijo}Modo" value="editar" data-campo="modo"${prefs.modo === 'editar' ? ' checked' : ''}>Editar imagen</label>
          </div>
        </fieldset>
        <div class="campo-grupo ancho">
          <label for="${prefijo}Texto">Prompt (puedes retocarlo antes de copiar)</label>
          <textarea class="campo" id="${prefijo}Texto" rows="7" spellcheck="false">${esc(construirPrompt(lista, prefs))}</textarea>
        </div>
      </div>
      <div class="acciones">
        <button type="button" class="boton boton-primario" data-copiar-texto="${prefijo}Texto">${ICON.copiar}Copiar prompt</button>
      </div>
    </section>`;
  }
  function actualizarConstructor(raiz, lista) {
    const ta = raiz.querySelector('textarea');
    if (ta) ta.value = construirPrompt(lista, prefs);
  }

  /* ---------- Ficha ---------- */
  function abrirFicha(id, desde) {
    const it = items.find(x => x.id === id);
    if (!it) return;
    estado.abierto = id;
    if (desde) estado.ultimoFoco = desde;
    renderFicha();
    const d = $('#ficha');
    if (!d.open) d.showModal();
  }
  function renderFicha() {
    const it = items.find(x => x.id === estado.abierto);
    if (!it) return;
    $('#fichaTitulo').textContent = it.comando;
    $('#fichaMeta').textContent = `${it.tipo} · ${it.categoria}`;
    const lista = estado.lista.length ? estado.lista : items;
    const pos = lista.findIndex(x => x.id === it.id);
    $('#fichaAnterior').disabled = pos <= 0;
    $('#fichaSiguiente').disabled = pos < 0 || pos >= lista.length - 1;
    const comp = comparable(it);
    const visor = comp
      ? `<div class="visor" id="visor" style="--corte:50%"><img src="${srcDe(it)}" alt="Después: ${esc(altDe(it))}"><img class="antes" src="${srcDe(it, true)}" alt="Antes: el mismo motivo en ilustración plana"><span class="visor-linea" aria-hidden="true"></span><span class="visor-etiqueta izq" aria-hidden="true">Antes</span><span class="visor-etiqueta der" aria-hidden="true">Después</span></div>
         <div class="comparador"><span aria-hidden="true">Antes</span><input type="range" id="corte" min="0" max="100" value="50" aria-label="Comparar antes y después" aria-valuetext="50 % antes"><span aria-hidden="true">Después</span></div>`
      : `<div class="visor"><img src="${srcDe(it)}" alt="${esc(altDe(it))}"></div>`;
    const consejo = (CONSEJOS.porTipo || {})[it.tipo];
    const repo = (DATOS.repositorio || '').replace(/\/$/, '');
    $('#fichaCuerpo').innerHTML = `
      <div class="ficha-visual">
        ${visor}
        <div class="visual-pie"><span>${it.imagen ? 'Imagen propia' : 'Ilustración de referencia (no generada por IA)'}</span>
        ${it.imagen ? '' : `<button type="button" class="boton boton-pequeno" id="descargarSvg">${ICON.descargar}Descargar SVG</button>`}</div>
      </div>
      <div class="ficha-info">
        <p class="ficha-desc">${esc(it.descripcion)}</p>
        ${consejo ? `<p class="consejo-tipo"><strong>Consejo · ${esc(it.tipo)}.</strong> ${esc(consejo)}</p>` : ''}
        ${constructorHTML('ficha', [it])}
        <div class="acciones">
          <button type="button" class="boton" data-fav="${esc(it.id)}" aria-pressed="${esFav(it)}">${ICON.corazon}${esFav(it) ? 'En favoritos' : 'Favorito'}</button>
          <button type="button" class="boton" data-mezcla="${esc(it.id)}" aria-pressed="${enMezcla(it)}">${ICON.mas}${enMezcla(it) ? 'En la mezcla' : 'Añadir a la mezcla'}</button>
          <button type="button" class="boton boton-fantasma" data-copiar-comando="${esc(it.id)}">${ICON.copiar}Copiar ${esc(it.comando)}</button>
          ${repo ? `<a class="boton boton-fantasma" href="${esc(repo)}/edit/main/data/comandos.js" target="_blank" rel="noopener">${ICON.editar}Editar en GitHub<span class="sr"> (se abre en otra pestaña)</span></a>` : ''}
        </div>
        <p class="nota">Receta de la miniatura: <code>${esc(it.receta)}</code></p>
      </div>`;
  }
  function moverFicha(delta) {
    const lista = estado.lista.length ? estado.lista : items;
    const pos = lista.findIndex(x => x.id === estado.abierto);
    const sig = lista[pos + delta];
    if (sig) { estado.abierto = sig.id; renderFicha(); }
  }

  /* ---------- Mezcla ---------- */
  function renderMezcla() {
    const panel = $('#mezcla');
    panel.hidden = mezcla.length === 0;
    $('#mezclaCuenta').textContent = `${mezcla.length}/${MAX_MEZCLA}`;
    $('#mezclaFichas').innerHTML = mezcla.map(id => {
      const it = items.find(x => x.id === id);
      return `<li class="ficha-mezcla">${esc(it.comando)}<button type="button" data-quitar="${esc(id)}" aria-label="Quitar ${esc(it.comando)} de la mezcla">${ICON.cerrar}</button></li>`;
    }).join('');
    document.body.style.paddingBottom = mezcla.length ? '84px' : '';
  }
  function alternarMezcla(id) {
    const it = items.find(x => x.id === id);
    if (!it) return;
    if (enMezcla(it)) mezcla = mezcla.filter(x => x !== id);
    else if (mezcla.length >= MAX_MEZCLA) { avisar(`La mezcla admite ${MAX_MEZCLA} comandos como máximo`); return; }
    else mezcla.push(id);
    guardar(CLAVE.mezcla, mezcla);
    avisar(enMezcla(it) ? `${it.comando} añadido a la mezcla` : `${it.comando} quitado de la mezcla`);
    actualizarBotones();
    renderMezcla();
    if ($('#dialogoMezcla').open) renderDialogoMezcla();
  }
  function renderDialogoMezcla() {
    const lista = mezcla.map(id => items.find(x => x.id === id));
    if (!lista.length) { $('#dialogoMezcla').close(); return; }
    const tipos = new Set(lista.map(x => x.tipo));
    const avisoMezcla = lista.filter(x => x.tipo === 'Estilo').length > 1 ? '<p class="consejo-tipo"><strong>Ojo:</strong> hay más de un estilo. Dos estilos fuertes suelen anularse; prueba a quedarte con uno.</p>' : '';
    $('#mezclaCuerpo').innerHTML = `
      <ul class="mezcla-lista">${lista.map(it => `<li><img src="${srcDe(it)}" alt="${esc(altDe(it))}"><p>${esc(it.comando)} <span>${esc(it.tipo)}</span></p></li>`).join('')}</ul>
      ${avisoMezcla}
      ${!tipos.has('Luz') || !tipos.has('Cámara') ? `<p class="nota">Sugerencia: una buena mezcla suele tener 1 estilo + 1 luz + 1 cámara.${!tipos.has('Luz') ? ' Falta luz.' : ''}${!tipos.has('Cámara') ? ' Falta cámara.' : ''}</p>` : ''}
      ${constructorHTML('mezcla', lista)}`;
  }

  /* ---------- Guía ---------- */
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`(.+?)`/g, '<code>$1</code>'); }
  function renderGuia() {
    const g = CONSEJOS.guia || [];
    const slug = (s, i) => 'g' + i + '-' + norm(s).replace(/[^a-z0-9]+/g, '-');
    $('#guiaCuerpo').innerHTML = `<ul class="guia-indice" aria-label="Secciones">${g.map((s, i) => `<li><a href="#${slug(s.titulo, i)}">${esc(s.titulo)}</a></li>`).join('')}</ul>` +
      g.map((s, i) => `<section aria-labelledby="${slug(s.titulo, i)}"${s.id ? ` data-seccion="${esc(s.id)}"` : ''}><h3 id="${slug(s.titulo, i)}" tabindex="-1">${esc(s.titulo)}</h3>` +
        (s.tabla ? `<table><thead><tr><th scope="col">Soporte</th><th scope="col">Proporción</th><th scope="col">Píxeles</th></tr></thead><tbody>${s.tabla.map(f => `<tr>${f.map((c, j) => j ? `<td>${esc(c)}</td>` : `<th scope="row">${esc(c)}</th>`).join('')}</tr>`).join('')}</tbody></table>` : '') +
        (s.puntos ? `<ul>${s.puntos.map(p => `<li>${md(p)}</li>`).join('')}</ul>` : '') + '</section>').join('');
  }
  function abrirGuia(seccion, desde) {
    renderGuia();
    estado.ultimoFoco = desde || document.activeElement;
    $('#guia').showModal();
    if (seccion) { const h = $(`#guiaCuerpo [data-seccion="${seccion}"] h3`); if (h) { h.scrollIntoView(); h.focus(); } }
  }

  /* ---------- Acciones ---------- */
  let temporizador;
  function avisar(msg) {
    const el = $('#aviso');
    el.textContent = msg;
    el.classList.add('visible');
    clearTimeout(temporizador);
    temporizador = setTimeout(() => el.classList.remove('visible'), 2400);
  }
  async function copiar(texto, msg = 'Copiado') {
    try { await navigator.clipboard.writeText(texto); avisar(msg); }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = texto; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); avisar(msg); } catch (err) { avisar('No se pudo copiar: selecciona el texto y usa Ctrl+C'); }
      ta.remove();
    }
  }
  function alternarFav(id) {
    const it = items.find(x => x.id === id);
    if (!it) return;
    favoritos[id] = !esFav(it);
    guardar(CLAVE.fav, favoritos);
    avisar(esFav(it) ? `${it.comando} en favoritos` : `${it.comando} quitado de favoritos`);
    if (estado.vista === 'favoritos') render(); else { actualizarBotones(); renderLateral(); }
  }
  /* Actualiza el estado de los botones sin redibujar (mantiene el foco). */
  function actualizarBotones() {
    document.querySelectorAll('[data-fav]').forEach(b => {
      const it = items.find(x => x.id === b.dataset.fav); const v = esFav(it);
      b.setAttribute('aria-pressed', v);
      if (b.classList.contains('boton')) b.innerHTML = ICON.corazon + (v ? 'En favoritos' : 'Favorito');
    });
    document.querySelectorAll('[data-mezcla]').forEach(b => {
      const it = items.find(x => x.id === b.dataset.mezcla); const v = enMezcla(it);
      b.setAttribute('aria-pressed', v);
      if (b.classList.contains('boton')) b.innerHTML = ICON.mas + (v ? 'En la mezcla' : 'Añadir a la mezcla');
    });
  }
  function descargarSvg(it) {
    const blob = new Blob([Miniaturas.render(it.receta)], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `referencia-${it.comando.slice(1)}.svg`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    avisar('SVG descargado');
  }
  function limpiarFiltros() { Object.assign(estado, { q: '', vista: 'todos', tipo: '', categoria: '' }); $('#buscar').value = ''; render(); }
  function aplicarTema() {
    const r = document.documentElement;
    if (prefs.tema === 'claro') r.dataset.theme = 'light'; else if (prefs.tema === 'oscuro') r.dataset.theme = 'dark'; else delete r.dataset.theme;
    const nombre = { sistema: 'según el sistema', claro: 'claro', oscuro: 'oscuro' }[prefs.tema];
    $('#tema').setAttribute('aria-label', `Tema: ${nombre}. Cambiar tema`);
    $('#tema').title = `Tema: ${nombre}`;
  }

  /* ---------- Eventos ---------- */
  function eventos() {
    let espera;
    $('#buscar').addEventListener('input', e => { clearTimeout(espera); espera = setTimeout(() => { estado.q = e.target.value; render(); }, 120); });
    $('#buscar').addEventListener('keydown', e => {
      if (e.key === 'Enter') { clearTimeout(espera); estado.q = e.target.value; render(); if (estado.lista[0]) abrirFicha(estado.lista[0].id, e.target); }
      if (e.key === 'Escape' && e.target.value) { e.preventDefault(); e.target.value = ''; estado.q = ''; render(); }
    });
    $('#panelFiltros').addEventListener('click', e => {
      const b = e.target.closest('.nav-item');
      if (!b) return;
      if (b.dataset.vista) estado.vista = b.dataset.vista;
      if (b.dataset.tipo != null) estado.tipo = estado.tipo === b.dataset.tipo ? '' : b.dataset.tipo;
      if (b.dataset.categoria != null) estado.categoria = estado.categoria === b.dataset.categoria ? '' : b.dataset.categoria;
      render();
      const igual = [...document.querySelectorAll('.nav-item')].find(x => x.dataset.vista === b.dataset.vista && x.dataset.tipo === b.dataset.tipo && x.dataset.categoria === b.dataset.categoria);
      if (igual) igual.focus();
    });
    $('#dondeDatos').addEventListener('click', e => abrirGuia('datos', e.currentTarget));
    $('#verFiltros').addEventListener('click', e => {
      const abierto = $('#panelFiltros').classList.toggle('abierto');
      e.currentTarget.setAttribute('aria-expanded', abierto);
    });
    $('#orden').addEventListener('change', e => { prefs.orden = e.target.value; guardarPrefs(); render(); });
    $('#vistaRejilla').addEventListener('click', () => { prefs.vista = 'rejilla'; guardarPrefs(); render(); });
    $('#vistaLista').addEventListener('click', () => { prefs.vista = 'lista'; guardarPrefs(); render(); });
    $('#limpiar').addEventListener('click', limpiarFiltros);
    $('#vacioLimpiar').addEventListener('click', limpiarFiltros);
    $('#otroConsejo').addEventListener('click', () => { estado.consejo++; renderConsejo(); });
    $('#abrirGuia').addEventListener('click', e => abrirGuia(null, e.currentTarget));
    $('#tema').addEventListener('click', () => { prefs.tema = { sistema: 'claro', claro: 'oscuro', oscuro: 'sistema' }[prefs.tema] || 'sistema'; guardarPrefs(); aplicarTema(); avisar('Tema: ' + { sistema: 'según el sistema', claro: 'claro', oscuro: 'oscuro' }[prefs.tema]); });

    // Acciones delegadas (tarjetas, ficha y mezcla)
    document.addEventListener('click', e => {
      const t = e.target.closest('[data-abrir],[data-fav],[data-mezcla],[data-copiar],[data-copiar-comando],[data-copiar-texto],[data-quitar],[data-cerrar],#descargarSvg');
      if (!t) return;
      if (t.dataset.abrir) abrirFicha(t.dataset.abrir, t);
      else if (t.dataset.fav) alternarFav(t.dataset.fav);
      else if (t.dataset.mezcla) alternarMezcla(t.dataset.mezcla);
      else if (t.dataset.copiar) { const it = items.find(x => x.id === t.dataset.copiar); copiar(construirPrompt([it], prefs), `Prompt de ${it.comando} copiado`); }
      else if (t.dataset.copiarComando) copiar(items.find(x => x.id === t.dataset.copiarComando).comando, 'Comando copiado');
      else if (t.dataset.copiarTexto) copiar($('#' + t.dataset.copiarTexto).value, 'Prompt copiado');
      else if (t.dataset.quitar) alternarMezcla(t.dataset.quitar);
      else if (t.hasAttribute('data-cerrar')) t.closest('dialog').close();
      else if (t.id === 'descargarSvg') descargarSvg(items.find(x => x.id === estado.abierto));
    });
    // Campos del constructor de prompt
    const alCambiar = e => {
      const c = e.target.dataset.campo;
      if (!c) return;
      prefs[c] = e.target.value;
      guardarPrefs();
      const enFicha = e.target.closest('#ficha');
      actualizarConstructor(e.target.closest('.constructor'), enFicha ? [items.find(x => x.id === estado.abierto)] : mezcla.map(id => items.find(x => x.id === id)));
    };
    document.addEventListener('input', e => {
      alCambiar(e);
      if (e.target.id === 'corte') { $('#visor').style.setProperty('--corte', e.target.value + '%'); e.target.setAttribute('aria-valuetext', `${e.target.value} % antes`); }
    });
    document.addEventListener('change', alCambiar);
    $('#fichaAnterior').addEventListener('click', () => moverFicha(-1));
    $('#fichaSiguiente').addEventListener('click', () => moverFicha(1));
    $('#mezclaAbrir').addEventListener('click', e => { estado.ultimoFoco = e.currentTarget; renderDialogoMezcla(); $('#dialogoMezcla').showModal(); });
    $('#mezclaVaciar').addEventListener('click', () => { mezcla = []; guardar(CLAVE.mezcla, mezcla); renderMezcla(); actualizarBotones(); avisar('Mezcla vaciada'); $('#buscar').focus(); });
    // Devolver el foco al cerrar un diálogo
    document.querySelectorAll('dialog').forEach(d => {
      d.addEventListener('close', () => {
        if (d.id === 'ficha') { estado.abierto = null; actualizarBotones(); }
        const f = estado.ultimoFoco;
        if (f && document.contains(f)) f.focus();
      });
      d.addEventListener('click', e => { if (e.target === d) d.close(); });
    });
    // Teclado
    document.addEventListener('keydown', e => {
      const enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
      const algunDialogo = document.querySelector('dialog[open]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (!algunDialogo) $('#buscar').focus(); return; }
      if (enCampo || e.metaKey || e.ctrlKey || e.altKey) return;
      if (!algunDialogo && e.key === '/') { e.preventDefault(); $('#buscar').focus(); return; }
      if ($('#ficha').open) {
        const it = items.find(x => x.id === estado.abierto);
        if (e.key === 'ArrowLeft') { e.preventDefault(); moverFicha(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); moverFicha(1); }
        else if (e.key.toLowerCase() === 'f') alternarFav(it.id);
        else if (e.key.toLowerCase() === 'm') alternarMezcla(it.id);
        else if (e.key.toLowerCase() === 'c') copiar($('#fichaTexto').value, 'Prompt copiado');
      }
    });
  }

  /* ---------- Avisos de datos ---------- */
  function avisosDatos() {
    const errores = (window.ATLAS_ERRORES || []).map(e => `Error en ${e.archivo}, línea ${e.linea}: ${e.mensaje}. Revisa comas, comillas y llaves cerca de esa línea.`);
    if (!items.length && !errores.length) errores.push('No se han podido leer los comandos. Suele ser una coma, comilla o llave de más o de menos en data/comandos.js (o que el archivo no está junto a index.html). Abre la consola del navegador (F12) para ver la línea exacta.');
    const todos = [...errores, ...problemas];
    if (!todos.length) return;
    const el = $('#avisoDatos');
    el.hidden = false;
    el.innerHTML = `<strong>Revisa los datos:</strong><ul>${todos.slice(0, 8).map(p => `<li>${esc(p)}</li>`).join('')}</ul>`;
  }

  /* ---------- Inicio ---------- */
  aplicarTema();
  eventos();
  avisosDatos();
  renderConsejo();
  render();
})();
