/* =====================================================================
   ESPEJOS DE NIEBLA · DATOS DE LA SIEMBRA
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para cambiar el contenido
   de la sección Siembra. No hay que tocar HTML, CSS ni el otro JavaScript.

   1) ENLACE DE INSTAGRAM  -> cambia INSTAGRAM_REEL_URL (más abajo).
   2) CADA ÁRBOL           -> edita su bloque dentro de ARBOLES.

   Cada árbol tiene sus propios datos y NO depende de los demás:

     id      Número del árbol (se muestra como "N.º 07" y también se puede
             buscar escribiéndolo). Debe ser distinto en cada árbol.
     nombre  Nombre que aparece en la tarjeta y en el buscador.
     mensaje Frase o descripción personalizada del árbol.
     foto    Ruta de la fotografía. Ejemplo: "img/arboles/arbol-07.jpg"
             Si la dejas vacía ("") se muestra una imagen de ejemplo
             generada automáticamente (distinta para cada árbol).
     alt     (Opcional) Texto alternativo de la foto, para accesibilidad.
             Si no lo escribes se usa "Fotografía de <nombre>".

   IMPORTANTE: el árbol N de esta lista se dibuja en la posición N del
   bosque (las posiciones están en donaciones.js, en el arreglo
   "posiciones"). Por eso conviene mantener siempre 50 bloques.
   ===================================================================== */

/* ---------------------------------------------------------------------
   ENLACE AL VIDEO / REEL DE INSTAGRAM
   Reemplaza esta URL por el enlace definitivo del Reel, por ejemplo:
   "https://www.instagram.com/reel/XXXXXXXXXXX/"
   Mientras tanto apunta al perfil del proyecto, así el botón ya funciona.
   --------------------------------------------------------------------- */
const INSTAGRAM_REEL_URL = "https://www.instagram.com/espejosdeniebla/";

/* ---------------------------------------------------------------------
   LOS 50 ÁRBOLES
   --------------------------------------------------------------------- */
const ARBOLES = [
  {
    id: 1,
    nombre: "Árbol 01",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-01.jpg"
    alt: ""
  },
  {
    id: 2,
    nombre: "Árbol 02",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-02.jpg"
    alt: ""
  },
  {
    id: 3,
    nombre: "Árbol 03",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-03.jpg"
    alt: ""
  },
  {
    id: 4,
    nombre: "Árbol 04",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-04.jpg"
    alt: ""
  },
  {
    id: 5,
    nombre: "Árbol 05",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-05.jpg"
    alt: ""
  },
  {
    id: 6,
    nombre: "Árbol 06",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-06.jpg"
    alt: ""
  },
  {
    id: 7,
    nombre: "Árbol 07",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-07.jpg"
    alt: ""
  },
  {
    id: 8,
    nombre: "Árbol 08",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-08.jpg"
    alt: ""
  },
  {
    id: 9,
    nombre: "Árbol 09",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-09.jpg"
    alt: ""
  },
  {
    id: 10,
    nombre: "Árbol 10",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-10.jpg"
    alt: ""
  },
  {
    id: 11,
    nombre: "Árbol 11",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-11.jpg"
    alt: ""
  },
  {
    id: 12,
    nombre: "Árbol 12",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-12.jpg"
    alt: ""
  },
  {
    id: 13,
    nombre: "Árbol 13",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-13.jpg"
    alt: ""
  },
  {
    id: 14,
    nombre: "Árbol 14",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-14.jpg"
    alt: ""
  },
  {
    id: 15,
    nombre: "Árbol 15",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-15.jpg"
    alt: ""
  },
  {
    id: 16,
    nombre: "Árbol 16",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-16.jpg"
    alt: ""
  },
  {
    id: 17,
    nombre: "Árbol 17",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-17.jpg"
    alt: ""
  },
  {
    id: 18,
    nombre: "Árbol 18",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-18.jpg"
    alt: ""
  },
  {
    id: 19,
    nombre: "Árbol 19",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-19.jpg"
    alt: ""
  },
  {
    id: 20,
    nombre: "Árbol 20",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-20.jpg"
    alt: ""
  },
  {
    id: 21,
    nombre: "Árbol 21",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-21.jpg"
    alt: ""
  },
  {
    id: 22,
    nombre: "Árbol 22",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-22.jpg"
    alt: ""
  },
  {
    id: 23,
    nombre: "Árbol 23",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-23.jpg"
    alt: ""
  },
  {
    id: 24,
    nombre: "Árbol 24",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-24.jpg"
    alt: ""
  },
  {
    id: 25,
    nombre: "Árbol 25",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-25.jpg"
    alt: ""
  },
  {
    id: 26,
    nombre: "Árbol 26",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-26.jpg"
    alt: ""
  },
  {
    id: 27,
    nombre: "Árbol 27",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-27.jpg"
    alt: ""
  },
  {
    id: 28,
    nombre: "Árbol 28",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-28.jpg"
    alt: ""
  },
  {
    id: 29,
    nombre: "Árbol 29",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-29.jpg"
    alt: ""
  },
  {
    id: 30,
    nombre: "Árbol 30",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-30.jpg"
    alt: ""
  },
  {
    id: 31,
    nombre: "Árbol 31",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-31.jpg"
    alt: ""
  },
  {
    id: 32,
    nombre: "Árbol 32",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-32.jpg"
    alt: ""
  },
  {
    id: 33,
    nombre: "Árbol 33",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-33.jpg"
    alt: ""
  },
  {
    id: 34,
    nombre: "Árbol 34",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-34.jpg"
    alt: ""
  },
  {
    id: 35,
    nombre: "Árbol 35",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-35.jpg"
    alt: ""
  },
  {
    id: 36,
    nombre: "Árbol 36",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-36.jpg"
    alt: ""
  },
  {
    id: 37,
    nombre: "Árbol 37",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-37.jpg"
    alt: ""
  },
  {
    id: 38,
    nombre: "Árbol 38",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-38.jpg"
    alt: ""
  },
  {
    id: 39,
    nombre: "Árbol 39",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-39.jpg"
    alt: ""
  },
  {
    id: 40,
    nombre: "Árbol 40",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-40.jpg"
    alt: ""
  },
  {
    id: 41,
    nombre: "Árbol 41",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-41.jpg"
    alt: ""
  },
  {
    id: 42,
    nombre: "Árbol 42",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-42.jpg"
    alt: ""
  },
  {
    id: 43,
    nombre: "Árbol 43",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-43.jpg"
    alt: ""
  },
  {
    id: 44,
    nombre: "Árbol 44",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-44.jpg"
    alt: ""
  },
  {
    id: 45,
    nombre: "Árbol 45",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-45.jpg"
    alt: ""
  },
  {
    id: 46,
    nombre: "Árbol 46",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-46.jpg"
    alt: ""
  },
  {
    id: 47,
    nombre: "Árbol 47",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-47.jpg"
    alt: ""
  },
  {
    id: 48,
    nombre: "Árbol 48",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-48.jpg"
    alt: ""
  },
  {
    id: 49,
    nombre: "Árbol 49",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-49.jpg"
    alt: ""
  },
  {
    id: 50,
    nombre: "Árbol 50",
    mensaje: "Cada semilla guarda la posibilidad de un bosque.",
    foto: "",          // ej.: "img/arboles/arbol-50.jpg"
    alt: ""
  }
];
