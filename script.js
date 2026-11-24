(() => {
  const contenedor = document.getElementById('sitioHorizontal');
  const botonMenu = document.getElementById('botonMenu');
  const navegacion = document.getElementById('navegacionPrincipal');
  const enlaces = [...document.querySelectorAll('[data-seccion]')];
  const secciones = [...document.querySelectorAll('.seccion')];
  const botonSonido = document.getElementById('botonSonido');

  const irA = (id, actualizarURL = true) => {
    const destino = document.getElementById(id);
    if (!destino) return;
    contenedor.scrollTo({ left: destino.offsetLeft, behavior: 'smooth' });
    if (actualizarURL) history.replaceState(null, '', `#${id}`);
    navegacion.classList.remove('menu-abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
  };

  // El menú central controla el desplazamiento horizontal.
  botonMenu.addEventListener('click', () => {
    const abierto = navegacion.classList.toggle('menu-abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
    botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  enlaces.forEach(enlace => {
    enlace.addEventListener('click', event => {
      event.preventDefault();
      irA(enlace.dataset.seccion);
    });
  });

  // Rueda del mouse/trackpad: convierte el desplazamiento vertical en horizontal.
  let bloqueandoRueda = false;
  contenedor.addEventListener('wheel', event => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    if (bloqueandoRueda) return;

    const direccion = Math.sign(event.deltaY);
    const ancho = window.innerWidth;
    const actual = Math.round(contenedor.scrollLeft / ancho);
    const siguiente = Math.max(0, Math.min(secciones.length - 1, actual + direccion));

    if (siguiente !== actual) {
      bloqueandoRueda = true;
      irA(secciones[siguiente].id);
      window.setTimeout(() => { bloqueandoRueda = false; }, 700);
    }
  }, { passive: false });

  // Teclado: flechas y Home/End.
  window.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      cambiarSeccion(1);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      cambiarSeccion(-1);
    }
    if (event.key === 'Home') { event.preventDefault(); irA('inicio'); }
    if (event.key === 'End') { event.preventDefault(); irA('siembra'); }
    if (event.key === 'Escape') {
      navegacion.classList.remove('menu-abierto');
      botonMenu.setAttribute('aria-expanded', 'false');
    }
  });

  function cambiarSeccion(direccion) {
    const actual = Math.round(contenedor.scrollLeft / window.innerWidth);
    const siguiente = Math.max(0, Math.min(secciones.length - 1, actual + direccion));
    irA(secciones[siguiente].id);
  }

  // Swipe táctil: el navegador maneja el desplazamiento; aquí solo actualizamos el hash.
  let inicioTouch = 0;
  contenedor.addEventListener('touchstart', e => { inicioTouch = e.touches[0].clientX; }, { passive: true });
  contenedor.addEventListener('touchend', e => {
    const finalTouch = e.changedTouches[0].clientX;
    if (Math.abs(finalTouch - inicioTouch) > 45) {
      window.setTimeout(() => sincronizarEstado(), 120);
    }
  }, { passive: true });

  const observador = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      enlaces.forEach(enlace => enlace.classList.toggle('activo', enlace.dataset.seccion === id));
      history.replaceState(null, '', `#${id}`);
    });
  }, { root: contenedor, threshold: 0.65 });
  secciones.forEach(seccion => observador.observe(seccion));

  const config = window.ESPEJOS_CONFIG || {};

  // AUDIO AMBIENTAL: se controla aparte del audio de los videos.
  // Si assets/audio/ambiente.mp3 no existe, el control se desactiva sin romper la página.
  const audioAmbiente = document.getElementById('audioAmbiente');
  if (audioAmbiente && config.audio) audioAmbiente.src = config.audio;
  const actualizarIconoSonido = (activo) => {
    if (!botonSonido) return;
    botonSonido.classList.toggle('sonido-activo', activo);
    botonSonido.setAttribute('aria-pressed', String(activo));
    botonSonido.setAttribute('aria-label', activo ? 'Desactivar sonido' : 'Activar sonido');
    botonSonido.title = activo ? 'Desactivar sonido' : 'Activar sonido';
  };

  if (botonSonido && audioAmbiente) {
    audioAmbiente.addEventListener('error', () => {
      botonSonido.disabled = true;
      botonSonido.classList.add('sonido-no-disponible');
      botonSonido.setAttribute('aria-label', 'Audio no disponible');
      botonSonido.title = 'Agrega assets/audio/ambiente.mp3 para activar el sonido';
      actualizarIconoSonido(false);
    });

    botonSonido.addEventListener('click', async () => {
      if (audioAmbiente.paused) {
        try {
          await audioAmbiente.play();
          actualizarIconoSonido(true);
        } catch (error) {
          actualizarIconoSonido(false);
          console.info('No se pudo reproducir el audio ambiental. Comprueba el archivo configurado.', error);
        }
      } else {
        audioAmbiente.pause();
        actualizarIconoSonido(false);
      }
    });
  }

  // CONFIGURACIÓN CENTRALIZADA: rutas de fondos, redes y enlaces.
  const fondos = config.backgroundVideos || {};
  document.querySelectorAll('[data-bg-video]').forEach(video => {
    const ruta = fondos[video.dataset.bgVideo];
    if (!ruta) return;
    const source = video.querySelector('source');
    if (source && source.getAttribute('src') !== ruta) {
      source.src = ruta;
      video.load();
    }
    video.addEventListener('error', () => video.classList.add('video-fondo-no-disponible'), { once: true });
  });

  const documental = config.documentary || {};
  const videoDocumental = document.querySelector('[data-documentary-video]');
  if (videoDocumental && documental.main) {
    const source = videoDocumental.querySelector('source');
    const actualizarVideoDocumental = () => {
      if (!source) return;
      const esVertical = window.matchMedia('(orientation: portrait)').matches;
      const ruta = esVertical && documental.vertical ? documental.vertical : documental.main;
      if (source.getAttribute('src') !== ruta) {
        source.src = ruta;
        videoDocumental.load();
      }
    };
    actualizarVideoDocumental();
    const consultaOrientacion = window.matchMedia('(orientation: portrait)');
    if (consultaOrientacion.addEventListener) {
      consultaOrientacion.addEventListener('change', actualizarVideoDocumental);
    } else {
      consultaOrientacion.addListener(actualizarVideoDocumental);
    }
  }

  const textos = config.texts || {};
  document.querySelectorAll('[data-config-text]').forEach(element => {
    const valor = textos[element.dataset.configText];
    if (typeof valor === 'string') element.textContent = valor;
  });

  const links = config.links || {};
  document.querySelectorAll('[data-social]').forEach(link => {
    const url = links[link.dataset.social];
    if (url) link.href = url;
  });
  const enlaceDocumental = document.querySelector('[data-documentary-link]');
  if (enlaceDocumental && links.documentaryYoutube) enlaceDocumental.href = links.documentaryYoutube;

  const enlaceGaleria = document.querySelector('[data-gallery-link]');
  if (enlaceGaleria) {
    if (links.gallery && links.gallery.trim()) {
      enlaceGaleria.href = links.gallery.trim();
      enlaceGaleria.target = '_blank';
      enlaceGaleria.rel = 'noopener noreferrer';
      enlaceGaleria.removeAttribute('aria-disabled');
      enlaceGaleria.removeAttribute('tabindex');
      enlaceGaleria.classList.remove('enlace-galeria-pendiente');
      enlaceGaleria.innerHTML = 'Explorar la galería <img src="img/Icono_Galeria.png" alt="">';
    } else {
      enlaceGaleria.removeAttribute('href');
      enlaceGaleria.setAttribute('aria-disabled', 'true');
      enlaceGaleria.setAttribute('tabindex', '-1');
    }
  }

  // Enlace al proceso de siembra: conserva la configuración específica de arboles-data.js.
  if (typeof INSTAGRAM_REEL_URL === 'string' && INSTAGRAM_REEL_URL.trim()) {
    document.querySelectorAll('[data-enlace-instagram]').forEach(a => { a.href = INSTAGRAM_REEL_URL.trim(); });
  } else if (links.instagram) {
    document.querySelectorAll('[data-enlace-instagram]').forEach(a => { a.href = links.instagram; });
  }

  function sincronizarEstado() {
    const actual = Math.max(0, Math.min(secciones.length - 1, Math.round(contenedor.scrollLeft / window.innerWidth)));
    const id = secciones[actual].id;
    history.replaceState(null, '', `#${id}`);
  }


  // Permite entrar directamente con index.html#documental, #galeria, etc.
  const hash = window.location.hash.replace('#', '');
  if (secciones.some(seccion => seccion.id === hash)) {
    requestAnimationFrame(() => irA(hash, false));
  }
})();
