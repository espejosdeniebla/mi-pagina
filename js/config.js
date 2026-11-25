/* =========================================================
   ESPEJOS DE NIEBLA — CONFIGURACIÓN EDITABLE
   Modifica aquí las rutas, enlaces y textos principales.
   No es necesario buscar estas rutas en varios archivos.
   ========================================================= */

window.ESPEJOS_CONFIG = {
  /* VIDEOS DE FONDO
     Los videos originales se conservan en img/.
     Para cambiar uno, reemplaza el valor por la ruta del nuevo archivo.
     Nosotros queda preparado para recibir assets/videos/backgrounds/nosotros.mp4.
  */
  backgroundVideos: {
    inicio: "assets/videos/backgrounds/inicio.mp4",
    documental: "assets/videos/backgrounds/documental.mp4",
    galeria: "assets/videos/backgrounds/galeria.mp4",
    siembra: "assets/videos/backgrounds/siembra.mp4",
    nosotros: "assets/videos/backgrounds/nosotros.mp4",
    donaciones: "assets/videos/backgrounds/donaciones.mp4"
    
  },

  /* VIDEOS DEL DOCUMENTAL */
  documentary: {
    main: "assets/videos/backgrounds/Trailer_temporal.mp4",
    // No se recibió un archivo vertical independiente. Se mantiene el video original.
    vertical: ""
  },

  /* AUDIO AMBIENTAL: agrega tu archivo en assets/audio/ambiente.mp3 */
  audio: "assets/audio/ambiente.mp3",

  /* ENLACES */
  links: {
    instagram: "https://www.instagram.com/espejosdeniebla/",
    tiktok: "https://www.tiktok.com/@espejos.de.niebla",
    youtube: "https://www.youtube.com/@espejosdeniebla",
    documentaryYoutube: "https://www.youtube.com/watch?v=Fiu0cU79A0c&list=RDFiu0cU79A0c&start_radio=1",
    gallery: "" // REEMPLAZAR: pega aquí la nueva URL cuando esté disponible.
  },

  /* TEXTOS EDITABLES */
  texts: {
    homeDescription: "Espejos de Niebla es una estrategia transmedia diseñada para sensibilizar sobre la fragilidad y belleza de los páramos. Alineado con el ODS 15 (Vida de ecosistemas terrestres), el proyecto explora la tensión entre la biodiversidad nativa y las amenazas crecientes de la deforestación y las especies invasoras."
  }
};
