/*
 * ============================================================
 *  PROMPT ATLAS · CONSEJOS  (editable)
 * ============================================================
 *  porTipo  → consejo que aparece en cada ficha según su tipo
 *  rapidos  → consejos cortos que rotan encima de la biblioteca
 *  guia     → secciones de la guía (botón «Guía y consejos»)
 *             Cada punto admite **negrita** y `código`.
 */
var ATLAS = window.ATLAS = window.ATLAS || {};

ATLAS.consejos = {
  porTipo: {
    'Estilo': 'Fija sujeto, encuadre y proporción, y cambia solo el estilo: así comparas de verdad. Evita mezclar dos estilos fuertes en el mismo prompt.',
    'Luz': 'Define dirección (lateral, contraluz, cenital), temperatura (cálida o fría) y momento del día. La luz cambia el tono emocional más que el estilo.',
    'Cámara': 'Especifica plano (general, medio, primer plano), altura de cámara y profundidad de campo. Si luego va texto encima, pide espacio libre en un lado.',
    'Material': 'Describe acabado (mate, satinado, brillo), escala de la textura y una luz de estudio sencilla para que el material se lea bien.',
    'Motivo': 'Esto define QUÉ aparece. Combínalo con un estilo, una luz y un plano para controlar CÓMO aparece.',
    'Formato': 'Úsalo como referencia de composición. Tipografía, logotipo y textos reales, mejor componerlos después en InDesign o Figma.',
    'UI': 'Sirve para explorar dirección visual, no para componentes finales. Reconstruye en Figma con tu sistema y verifica contraste AA.'
  },

  rapidos: [
    'Cambia una sola variable por prueba (estilo, luz o cámara). Si cambias tres a la vez no sabrás qué ha funcionado.',
    'Combina como máximo 1 estilo + 1 luz + 1 cámara. Usa «＋ Mezcla» en las tarjetas para montarlo en un solo prompt.',
    'Pide «sin texto» y compón la tipografía después: la IA aún falla con las letras y los kernings.',
    'Para mantener coherencia en una serie, adjunta la imagen anterior y pide «mismo encuadre, solo cambia la luz».',
    'Fija la proporción desde el principio (4:5, 9:16, 16:9): recortar después rompe la composición.',
    'Un logo generado es un boceto: redibújalo en vector sobre retícula antes de entregarlo.',
    'Si va texto encima de la imagen, pide «zona tranquila a la izquierda» y comprueba contraste 4,5:1.',
    'Para imprenta, escala la imagen y conviértela a CMYK con el perfil de tu imprenta antes de maquetar.',
    'Presenta 3 direcciones distintas al cliente con el mismo brief: decide antes, itera menos.',
    'Describe rasgos visuales en lugar de nombrar estudios o marcas cuando el trabajo es comercial.',
    'Arrastra la miniatura SVG de la ficha («Descargar SVG») a tu moodboard de Figma para anotar referencias.',
    'Marca con ♡ los comandos que te funcionan: tu propia biblioteca rápida, sin configurar nada.'
  ],

  guia: [
    {
      titulo: 'La fórmula de un buen prompt',
      puntos: [
        '**Sujeto** (qué) + **estilo** (cómo) + **luz** + **cámara/encuadre** + **material** + **formato** + **restricciones**.',
        'Lo primero pesa más: empieza por lo que no puede fallar.',
        'Una idea por frase. Frases cortas y concretas funcionan mejor que listas de adjetivos.',
        'Las restricciones también cuentan: «sin texto», «fondo liso», «sin marcas de agua», «espacio libre arriba».'
      ]
    },
    {
      titulo: 'Combinar comandos sin que se peleen',
      puntos: [
        'Máximo **1 estilo + 1 luz + 1 cámara** (y 1 material si hace falta).',
        'Dos estilos fuertes (p. ej. `/pixelart` + `/oilpainting`) se anulan: elige uno.',
        'Usa **＋ Mezcla** en las tarjetas: el prompt combinado agrupa cada comando en su apartado (estilo, luz, cámara…).',
        'Los **Motivos** dicen qué aparece; combínalos con un estilo para decidir cómo aparece.'
      ]
    },
    {
      titulo: 'Iterar como en un estudio',
      puntos: [
        'Cambia **una variable cada vez** y anota qué cambió.',
        'Pide variaciones dirigidas: «mismo encuadre y sujeto, solo cambia la luz a contraluz».',
        'Para series coherentes, adjunta la imagen anterior como referencia y usa el modo **Editar imagen**.',
        'Guarda en ♡ los comandos que te funcionan para tu tipo de encargos.'
      ]
    },
    {
      titulo: 'Proporciones por soporte',
      tabla: [
        ['Instagram publicación', '4:5', '1080 × 1350'],
        ['Story / Reel / TikTok', '9:16', '1080 × 1920'],
        ['Miniatura de YouTube', '16:9', '1280 × 720'],
        ['Cabecera web', '16:9 o 21:9', '1920 × 1080 / 2560 × 1080'],
        ['LinkedIn / Open Graph', '1,91:1', '1200 × 628'],
        ['Presentación', '16:9', '1920 × 1080'],
        ['Póster / A4 / A3', '≈ 1:1,414', 'pide 2:3 y recorta'],
        ['Cuadrado (catálogo, avatar)', '1:1', '2048 × 2048']
      ]
    },
    {
      titulo: 'Del resultado al arte final',
      puntos: [
        '**Logos:** úsalos como boceto. Redibuja en Illustrator o Figma con retícula, geometría y vector limpio.',
        '**Texto:** pide la imagen sin texto y compón la tipografía en InDesign o Figma.',
        '**Resolución:** genera, escala (Photoshop › Superresolución u otro escalador) y comprueba **300 ppp a tamaño final** para impresión.',
        '**Color:** las imágenes salen en sRGB. Convierte a CMYK con el perfil de la imprenta (p. ej. FOGRA39 / ISO Coated v2) y revisa la gama.',
        '**Retoque:** amplía lienzo o corrige manos y detalles con relleno generativo; no regeneres toda la imagen por un detalle.'
      ]
    },
    {
      titulo: 'Accesibilidad (WCAG 2.2 AA)',
      puntos: [
        '**Texto sobre imagen:** contraste mínimo 4,5:1 (3:1 en texto grande, ≥ 24 px o 18,66 px en negrita). Añade velo o degradado si hace falta.',
        '**Texto alternativo:** describe la función de la imagen, no la técnica. Si es decorativa, `alt=""`.',
        'No transmitas información **solo con color**; acompaña con forma, icono o texto.',
        'Animaciones y fondos en movimiento: respeta `prefers-reduced-motion`.',
        'En UI generada, rehaz los componentes y verifica foco visible, tamaños táctiles (≥ 24 × 24 px) y contraste de estados.'
      ]
    },
    {
      titulo: 'Moodboards y clientes',
      puntos: [
        'Genera **3 direcciones** distintas con el mismo brief (p. ej. `/minimal`, `/bauhaus`, `/watercolor`) y presenta las tres.',
        'En cada ficha puedes **descargar la referencia en SVG** y arrastrarla a Figma para anotar el moodboard.',
        'Etiqueta las imágenes generadas como **referencia**, no como arte final.'
      ]
    },
    {
      titulo: 'Derechos y uso responsable',
      puntos: [
        'En encargos comerciales evita nombres de artistas vivos, estudios y marcas (Ghibli, Disney, Pixar, LEGO, Minecraft…). Describe los rasgos visuales: «animación pintada a mano, colores suaves, nubes grandes».',
        'Revisa los términos de uso comercial de la herramienta que uses.',
        'No uses rostros de personas reales sin consentimiento.'
      ]
    },
    {
      titulo: 'Atajos de teclado',
      puntos: [
        '`/` o `Ctrl/⌘ + K` → buscar · `Esc` → cerrar · `Intro` en el buscador → abrir el primer resultado.',
        'En la ficha: `←` `→` anterior / siguiente · `F` favorito · `C` copiar prompt · `M` añadir a la mezcla.',
        'Búsqueda: `tipo:luz` · `cat:arte` · `#etiqueta` · `-neon` excluye · `"frase exacta"`.'
      ]
    },
    {
      id: 'datos',
      titulo: 'Dónde se guarda cada cosa',
      puntos: [
        '**Comandos, descripciones y miniaturas:** en `data/comandos.js`. Edítalo en local o en GitHub (✎) y recarga la página.',
        '**Favoritos, mezcla y preferencias:** en el `localStorage` de este navegador. Se guardan solos, sin archivos ni JSON. Si borras los datos del navegador, se pierden.',
        '**Favorito permanente** (en todos tus equipos): añade `favorito: true` al comando en `data/comandos.js`.',
        '**Imágenes propias (opcional):** copia el archivo en `img/` y añade `imagen: \'img/archivo.jpg\'` al comando. No hay que subir nada si no quieres.',
        'Estos consejos están en `data/consejos.js`: cámbialos a tu gusto.'
      ]
    }
  ]
};
