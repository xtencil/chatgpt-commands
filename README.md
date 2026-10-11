# Prompt Atlas

Biblioteca local de 300 comandos visuales para IA (estilos, luz, cámara, materiales, motivos, formatos y UI), con una imagen de referencia por comando, prompt listo para copiar y consejos de uso para diseño.

Sin servidor, sin cuentas, sin dependencias y sin nada que subir.

## Abrirlo

- **En local:** doble clic en `index.html`. Funciona sin conexión.
- **En GitHub Pages:** *Settings › Pages › Deploy from a branch › `main` / root*. Se publica tal cual.

## Editar los comandos

Todo el contenido está en **`data/comandos.js`**. Cada comando es una línea:

```js
{ comando: '/watercolor', tipo: 'Estilo', miniatura: 'paisaje + acuarela',
  descripcion: 'Aplica una acuarela suave con bordes difuminados…',
  prompt: 'una acuarela suave con bordes difuminados' },
```

| Campo | Para qué sirve |
| --- | --- |
| `comando` | Nombre con barra, en minúsculas. |
| `tipo` | `Estilo`, `Luz`, `Cámara`, `Material`, `Motivo`, `Formato` o `UI`. Decide el filtro, el consejo y en qué apartado del prompt entra. |
| `miniatura` | Receta de la imagen de referencia: `motivo + técnica`. Ver `miniaturas.html`. |
| `descripcion` | Texto de la ficha. |
| `prompt` | Fragmento que se inserta en el prompt generado. |
| `etiquetas` *(opcional)* | Sinónimos para la búsqueda: `['riso', 'impresión']`. |
| `imagen` *(opcional)* | Imagen propia: `'img/mi-prueba.jpg'`. |
| `favorito` *(opcional)* | `true` = favorito fijo en todos tus equipos. |

- **En local:** ábrelo con cualquier editor, guarda y recarga el navegador.
- **En GitHub:** abre el archivo y pulsa ✎. Desde cada ficha hay un enlace «Editar en GitHub».
- Si te equivocas con una coma o una comilla, la app muestra un aviso con la línea del error.

Los consejos de la guía están en **`data/consejos.js`** y se editan igual.

## Miniaturas

Las imágenes no son archivos: se dibujan en SVG al vuelo combinando un **motivo** (qué aparece) y una **técnica** (cómo se ve). Por eso los estilos se entienden de un vistazo: el mismo retrato o paisaje, cambiando solo la técnica, la luz o el material. En la ficha puedes comparar *antes / después* y descargar la referencia en SVG para tu moodboard.

- `miniaturas.html` muestra los 205 motivos y las 109 técnicas, con un probador de recetas.
- El motor está en `assets/miniaturas/` (`motor.js`, `motivos-*.js`, `tecnicas.js`).

## Dónde se guarda cada cosa

| Qué | Dónde |
| --- | --- |
| Comandos, textos y recetas | `data/comandos.js` (archivo del repositorio) |
| Consejos | `data/consejos.js` |
| Favoritos, mezcla y preferencias | `localStorage` del navegador, automático. No genera archivos ni JSON. |
| Favoritos permanentes | `favorito: true` en `data/comandos.js` |
| Imágenes propias (opcional) | Carpeta `img/` + campo `imagen` |

> Si vienes de la versión anterior, tus favoritos se migran solos la primera vez. Las imágenes que subiste dentro del navegador (IndexedDB) no se usan en esta versión.

## Accesibilidad

Objetivo WCAG 2.2 AA: navegación completa con teclado, foco visible, foco devuelto al cerrar diálogos, tamaños táctiles ≥ 24 px, contraste AA en claro y oscuro, `prefers-reduced-motion` y `forced-colors`. Revisado con axe-core.

## Estructura

```
index.html              la aplicación
miniaturas.html         catálogo de motivos y técnicas
data/comandos.js        ← editas aquí
data/consejos.js        ← y aquí
assets/app.css, app.js  interfaz
assets/miniaturas/      motor de miniaturas SVG
img/                    imágenes propias (opcional)
```

Los nombres con barra son descriptores visuales, no comandos oficiales de ChatGPT.
