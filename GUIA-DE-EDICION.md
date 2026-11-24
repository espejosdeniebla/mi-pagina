# Guía de edición — ESPEJOS DE NIEBLA

Esta versión conserva los videos, imágenes y recursos originales. Los archivos nuevos de configuración están organizados para que puedas cambiar rutas sin buscar por todo el código.

## 1. Archivo principal de configuración

Abre `js/config.js`. Allí están centralizados:

- Videos de fondo por sección.
- Video del documental.
- Ruta del audio ambiental.
- Enlaces de Instagram, TikTok, YouTube y documental.
- Enlace futuro de la galería.
- Texto principal de Inicio.

Modifica únicamente el valor entre comillas, conservando las comas y la estructura del objeto.

## 2. Cambiar videos de fondo

En `js/config.js`, busca `backgroundVideos`:

- `inicio`: fondo de Inicio.
- `documental`: fondo de Documental.
- `galeria`: fondo de Galería.
- `siembra`: fondo de Siembra.
- `nosotros`: fondo de la página Nosotros.

Los cuatro videos originales siguen en `img/` y no fueron movidos ni reemplazados. Puedes conservarlos o cambiar una ruta por otra.

Para agregar un video de fondo a Nosotros, copia tu archivo a `assets/videos/backgrounds/` y nómbralo `nosotros.mp4`. La página ya tiene preparada esa ruta. Si el archivo todavía no existe, se conserva el fondo oscuro de respaldo.

Para cambiar cualquier fondo, actualiza la ruta correspondiente en `js/config.js`.

## 3. Cambiar los videos del documental

El video visible del reproductor está configurado en:

`documentary.main`

Actualmente apunta a `img/Trailer_temporal.mp4`, que se conserva intacto.

Si más adelante tienes un archivo vertical independiente:
1. Colócalo en `assets/videos/documental/`.
2. Escribe su ruta en `documentary.vertical`.
3. El reproductor usará `main` en orientación horizontal y `vertical` en orientación vertical.

**Importante:** el ZIP original solo contiene `Trailer_temporal.mp4` como video del reproductor (1280 × 720). No se recibió un archivo vertical independiente, por eso la versión vertical queda preparada pero utiliza el video original mientras no agregues otro. El fondo `Video_documental.mp4` también se conserva.

## 4. Reemplazar el audio ambiental

Copia tu audio a:

`assets/audio/ambiente.mp3`

El botón de la esquina inferior izquierda activa y desactiva este audio. Si el archivo no existe, el control no interrumpe el funcionamiento de la página y se deshabilita cuando el navegador detecta el error.

Los videos de fondo permanecen silenciados para respetar las políticas de reproducción automática.

## 5. Cambiar imágenes

Las imágenes originales siguen en `img/`. Reemplaza el archivo manteniendo el mismo nombre y formato, o cambia la ruta directamente en el HTML correspondiente.

- Logo y redes: `index.html`.
- Fotografías del equipo: `nosotros.html`, carpeta `img/img_nosotros/`.
- Imágenes de galería: `galeria.html`.
- Datos visuales de árboles: `arboles-data.js` y los archivos indicados allí.

## 6. Cambiar enlaces

En `js/config.js`, sección `links`:

- `instagram`
- `tiktok`
- `youtube`
- `documentaryYoutube`
- `gallery`

El enlace de la galería está intencionalmente vacío. Cuando tengas la nueva dirección, pégala en `gallery`. El espacio visual se conserva y se convertirá automáticamente en enlace activo.

El enlace del proceso de siembra también puede estar definido en `arboles-data.js` mediante `INSTAGRAM_REEL_URL`; si existe, ese valor específico tiene prioridad.

## 7. Cambiar textos

El texto principal de Inicio se modifica en `js/config.js`, dentro de `texts.homeDescription`.

Otros textos permanecen en sus archivos HTML para facilitar la edición directa. Busca comentarios `REEMPLAZAR` o el texto visible que quieras cambiar.

## 8. Estructura de carpetas nuevas

- `js/config.js`: configuración central.
- `assets/audio/`: audio ambiental futuro.
- `assets/videos/backgrounds/`: fondos nuevos, incluido Nosotros.
- `assets/videos/documental/`: posible video vertical del documental.

Los videos e imágenes originales de `img/` se mantienen en su ubicación original.

## 9. Nota sobre navegación y compatibilidad

La navegación horizontal original se conserva. Se mantienen las páginas existentes y sus recursos. Prueba la página abriendo `index.html` desde un servidor local (por ejemplo, Live Server en Visual Studio Code), especialmente para comprobar videos, audio y rutas relativas.


## 10. Últimos ajustes visuales

- **Icono de Siembra:** el acceso a donaciones ahora utiliza un árbol blanco de copa redondeada y frondosa. El enlace a `donaciones.html` se mantiene.
- **Textos en escritorio:** en pantallas anchas (900 px o más) la composición aprovecha mejor el ancho disponible. En Siembra, el texto introductorio y los pasos se distribuyen en dos columnas para evitar que el contenido quede recortado. Las reglas nuevas están limitadas a escritorio; no modifican los estilos de celular.
- **Botón central del menú:** se suavizó la transición de escala, giro y halo exterior para que el acceso se sienta más fluido sin cambiar su apariencia circular ni la navegación horizontal.

Si deseas ajustar estos elementos, busca en `estilos.css` el bloque `AJUSTES DE ESCRITORIO` y las reglas `.icono-arbol-siembra` / `.boton-menu`.
