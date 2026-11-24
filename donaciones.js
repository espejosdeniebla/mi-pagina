/* =====================================================================
   SIEMBRA VIDA · BOSQUE INTERACTIVO DE 50 ÁRBOLES
   ---------------------------------------------------------------------
   Los DATOS de cada árbol (nombre, mensaje, foto) y el enlace de
   Instagram se editan en  arboles-data.js  — NO aquí.

   Este archivo solo contiene la LÓGICA:
     1. Dibuja los árboles en el SVG usando los datos.
     2. Muestra la tarjeta (foto + nombre + mensaje) con hover, foco
        de teclado o toque (táctil).
     3. Buscador con resultados en vivo.
     4. Conecta el botón "Ver proceso de siembra" con la URL de Instagram.
   ===================================================================== */
(() => {
  'use strict';

  /* ---------------------------------------------------------------
     0. DATOS (vienen de arboles-data.js)
     --------------------------------------------------------------- */
  const arboles = typeof ARBOLES !== 'undefined' ? ARBOLES : [];
  if (!arboles.length) {
    console.error('No se encontraron datos de árboles. ¿Está cargado arboles-data.js antes de donaciones.js?');
  }

  /* ---------------------------------------------------------------
     1. POSICIONES DE LOS ÁRBOLES DENTRO DEL ÁREA IRREGULAR
        (coordenadas dentro del viewBox 0 0 600 520 del SVG).
        La posición N corresponde al árbol N de ARBOLES.
     --------------------------------------------------------------- */
  const posiciones = [
    { x: 204.6, y: 296.5 }, { x: 117.6, y: 204.2 }, { x: 464.8, y: 293.6 },
    { x: 325.5, y: 346.5 }, { x: 279.2, y: 351.4 }, { x: 232.9, y: 110.4 },
    { x: 461.5, y: 334.6 }, { x: 353.4, y: 416.7 }, { x: 390.3, y: 233.3 },
    { x: 296.9, y: 237.2 }, { x: 378.2, y: 143.6 }, { x: 507.2, y: 296.0 },
    { x: 414.9, y: 280.4 }, { x: 484.7, y: 203.6 }, { x: 271.0, y: 164.1 },
    { x: 538.9, y: 261.7 }, { x: 436.1, y: 212.7 }, { x: 109.1, y: 165.7 },
    { x: 308.6, y: 394.8 }, { x: 278.2, y: 307.9 }, { x: 376.2, y: 360.4 },
    { x: 204.7, y: 142.1 }, { x: 142.9, y: 257.7 }, { x: 187.5, y: 344.4 },
    { x: 188.7, y: 224.1 }, { x: 406.8, y: 185.0 }, { x: 427.7, y: 354.3 },
    { x: 145.4, y: 135.6 }, { x: 398.8, y: 328.9 }, { x: 331.5, y: 297.0 },
    { x: 366.1, y: 284.5 }, { x: 360.2, y: 203.7 }, { x: 243.7, y: 366.7 },
    { x: 303.5, y: 187.5 }, { x: 147.8, y: 340.7 }, { x: 236.0, y: 194.7 },
    { x: 487.0, y: 241.3 }, { x: 170.7, y: 88.4 },  { x: 335.4, y: 164.2 },
    { x: 105.5, y: 121.2 }, { x: 209.0, y: 258.8 }, { x: 162.6, y: 177.9 },
    { x: 249.7, y: 285.3 }, { x: 270.3, y: 395.2 }, { x: 250.7, y: 233.7 },
    { x: 325.2, y: 259.8 }, { x: 225.8, y: 327.8 }, { x: 433.5, y: 312.0 },
    { x: 273.4, y: 126.2 }, { x: 199.0, y: 187.2 }
  ];

  if (arboles.length !== posiciones.length) {
    console.warn(`Hay ${arboles.length} árboles en arboles-data.js y ${posiciones.length} posiciones en donaciones.js. Deberían coincidir.`);
  }
  const TOTAL = Math.min(arboles.length, posiciones.length);

  /* ---------------------------------------------------------------
     2. REFERENCIAS AL DOM
     --------------------------------------------------------------- */
  const NS = 'http://www.w3.org/2000/svg';
  const capa = document.getElementById('capaArboles');
  const lienzo = document.getElementById('lienzoBosque');
  const zonaBosque = document.querySelector('.zona-bosque');

  const tarjeta = document.getElementById('tarjetaArbol');
  const tarjetaFoto = document.getElementById('tarjetaFoto');
  const tarjetaId = document.getElementById('tarjetaId');
  const tarjetaNombre = document.getElementById('tarjetaNombre');
  const tarjetaFrase = document.getElementById('tarjetaFrase');

  const buscador = document.querySelector('.buscador');
  const inputBusqueda = document.getElementById('busquedaArbol');
  const botonLimpiar = document.getElementById('limpiarBusqueda');
  const listaResultados = document.getElementById('resultadosBusqueda');
  const mensajeVacio = document.getElementById('busquedaVacia');
  const estadoBusqueda = document.getElementById('busquedaEstado');

  const contador = document.getElementById('contadorNumero');
  if (contador) contador.textContent = TOTAL;

  /* ---------------------------------------------------------------
     3. UTILIDADES
     --------------------------------------------------------------- */
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // En pantallas angostas la tarjeta se muestra como panel inferior fijo.
  const esMovil = () => window.matchMedia('(max-width: 700px)').matches;

  // Quita tildes y mayúsculas: "Árbol" y "arbol" se consideran iguales.
  const normalizar = (texto) =>
    String(texto).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const numeroCorto = (arbol) => String(arbol.id).padStart(2, '0');

  // Pequeña variación de escala y rotación por árbol para una sensación orgánica.
  function semilla(i) {
    const x = Math.sin(i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }

  /* ---------------------------------------------------------------
     4. FOTOGRAFÍAS
        - Si el árbol tiene "foto" se usa esa ruta.
        - Si está vacía (o el archivo no existe) se genera una imagen
          de ejemplo, distinta para cada árbol.
     --------------------------------------------------------------- */
  const cachePlaceholder = {};

  function fotoDeEjemplo(i) {
    if (cachePlaceholder[i]) return cachePlaceholder[i];
    const matiz = 90 + ((i * 23) % 60);               // tonos verdes y musgo
    const escala = (2.5 + (i % 5) * 0.18).toFixed(2); // el "árbol" cambia de tamaño
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">` +
      `<stop offset="0" stop-color="hsl(${matiz} 26% 30%)"/>` +
      `<stop offset="1" stop-color="hsl(${matiz + 15} 30% 12%)"/></linearGradient></defs>` +
      `<rect width="320" height="240" fill="url(#g)"/>` +
      `<ellipse cx="${60 + (i % 7) * 25}" cy="190" rx="150" ry="28" fill="rgba(255,255,255,.07)"/>` +
      `<ellipse cx="250" cy="214" rx="130" ry="22" fill="rgba(255,255,255,.05)"/>` +
      `<g transform="translate(160 104) scale(${escala})" fill="hsl(${matiz} 30% 78%)">` +
      `<path d="M0,-19 C6,-19 11,-14.5 10.5,-9 C13.5,-8 15,-4.5 13,-1.5 C15.5,0 15,4 11.5,5 C12,8.5 8,10.5 4,9.5 L-4,9.5 C-8,10.5 -12,8.5 -11.5,5 C-15,4 -15.5,0 -13,-1.5 C-15,-4.5 -13.5,-8 -10.5,-9 C-11,-14.5 -6,-19 0,-19 Z"/>` +
      `<rect x="-1.6" y="9" width="3.2" height="7" rx="1.2"/></g>` +
      `<text x="160" y="226" text-anchor="middle" font-family="sans-serif" font-size="11" letter-spacing="2" fill="rgba(255,255,255,.55)">FOTO PRÓXIMAMENTE · N.º ${numeroCorto(arboles[i])}</text>` +
      `</svg>`;
    cachePlaceholder[i] = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    return cachePlaceholder[i];
  }

  // Asigna la foto del árbol i a un <img>, con respaldo si la ruta falla.
  function asignarFoto(img, i) {
    const arbol = arboles[i];
    const ruta = (arbol.foto || '').trim();
    img.onerror = () => { img.onerror = null; img.src = fotoDeEjemplo(i); };
    img.src = ruta || fotoDeEjemplo(i);
    img.alt = arbol.alt && arbol.alt.trim() ? arbol.alt : `Fotografía de ${arbol.nombre}`;
  }

  /* ---------------------------------------------------------------
     5. ESTADO Y TARJETA FLOTANTE
        activo     -> árbol cuya tarjeta se está mostrando
        seleccion  -> árbol "fijado" por el buscador o por un clic
        destacado  -> árbol resaltado con el aro amarillo (búsqueda)
     --------------------------------------------------------------- */
  const nodos = [];            // nodos[i] = <g> SVG del árbol i
  let activo = null;
  let seleccion = null;
  let destacado = null;
  let temporizadorOcultar = null;

  function rellenarTarjeta(i) {
    const arbol = arboles[i];
    tarjetaId.textContent = `N.º ${numeroCorto(arbol)}`;
    tarjetaNombre.textContent = arbol.nombre;
    tarjetaFrase.textContent = arbol.mensaje;
    asignarFoto(tarjetaFoto, i);
  }

  function posicionarTarjeta(i) {
    // En móvil la tarjeta es un panel fijo abajo: el CSS se encarga.
    if (esMovil()) {
      tarjeta.style.left = '';
      tarjeta.style.top = '';
      tarjeta.classList.remove('abajo');
      return;
    }
    // Convierte coordenadas del SVG a coordenadas de pantalla.
    const ctm = lienzo.getScreenCTM();
    if (!ctm) return;
    const punto = lienzo.createSVGPoint();
    punto.x = posiciones[i].x;
    punto.y = posiciones[i].y;
    const p = punto.matrixTransform(ctm);

    const mitad = tarjeta.offsetWidth / 2;
    const alto = tarjeta.offsetHeight;
    const margen = 12;
    const cabeArriba = p.y - alto - 56 > 76;     // 76px = alto del encabezado fijo

    tarjeta.classList.toggle('abajo', !cabeArriba);
    tarjeta.style.left = `${clamp(p.x, mitad + margen, window.innerWidth - mitad - margen)}px`;
    tarjeta.style.top = `${p.y}px`;
  }

  function mostrarArbol(i) {
    clearTimeout(temporizadorOcultar);
    if (activo !== null && activo !== i) nodos[activo].classList.remove('activo');
    activo = i;
    nodos[i].classList.add('activo');
    rellenarTarjeta(i);
    posicionarTarjeta(i);
    tarjeta.classList.add('visible');
  }

  function ocultarTarjeta() {
    if (activo !== null) nodos[activo].classList.remove('activo');
    activo = null;
    tarjeta.classList.remove('visible');
  }

  function ocultarConRetraso() {
    // Pequeño retraso para que mover el cursor entre árboles cercanos no
    // haga parpadear la tarjeta. Si hay un árbol fijado, se vuelve a él.
    clearTimeout(temporizadorOcultar);
    temporizadorOcultar = setTimeout(() => {
      ocultarTarjeta();
      if (seleccion !== null) mostrarArbol(seleccion);
    }, 90);
  }

  function alternarSeleccion(i) {
    if (seleccion === i) {
      seleccion = null;
      ocultarTarjeta();
    } else {
      seleccion = i;
      mostrarArbol(i);
    }
  }

  function quitarDestacado() {
    if (destacado !== null) nodos[destacado].classList.remove('destacado');
    destacado = null;
  }

  /* ---------------------------------------------------------------
     6. DIBUJAR LOS ÁRBOLES (uno por cada elemento de ARBOLES)
     --------------------------------------------------------------- */
  for (let i = 0; i < TOTAL; i++) {
    const pos = posiciones[i];
    const arbol = arboles[i];
    const escala = 0.82 + semilla(i) * 0.5;
    const rotacion = (semilla(i + 50) - 0.5) * 10;

    // Grupo exterior: SOLO posiciona (translate/rotate/scale por atributo).
    // Nunca se le anima "transform" por CSS para no pisar esta posición.
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'arbol');
    g.setAttribute('tabindex', '0');
    g.setAttribute('role', 'button');
    g.setAttribute('aria-label', `${arbol.nombre}, número ${numeroCorto(arbol)}. Ver foto y mensaje`);
    g.setAttribute('transform', `translate(${pos.x} ${pos.y}) rotate(${rotacion.toFixed(1)}) scale(${escala.toFixed(2)})`);

    // Zona de toque invisible, más grande que el dibujo, para dedos en móvil.
    // Grupo interior ".arbol-icono": recibe la animación de hover/foco.
    g.innerHTML = `
      <circle class="zona-toque" r="16" cy="-2"/>
      <g class="arbol-icono">
        <circle class="aro" r="22" cy="-3"/>
        <path class="copa" d="M0,-19 C6,-19 11,-14.5 10.5,-9 C13.5,-8 15,-4.5 13,-1.5 C15.5,0 15,4 11.5,5 C12,8.5 8,10.5 4,9.5 C4,9.5 -4,9.5 -4,9.5 C-8,10.5 -12,8.5 -11.5,5 C-15,4 -15.5,0 -13,-1.5 C-15,-4.5 -13.5,-8 -10.5,-9 C-11,-14.5 -6,-19 0,-19 Z"/>
        <rect class="tronco" x="-1.6" y="9" width="3.2" height="7" rx="1.2"/>
      </g>`;
    capa.appendChild(g);
    nodos.push(g);

    // Pointer Events: un solo modelo para mouse, lápiz y táctil.
    g.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;      // el táctil se maneja con pointerdown
      mostrarArbol(i);
    });
    g.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      ocultarConRetraso();
    });
    g.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return;
      e.preventDefault();
      if (activo === i) {
        seleccion = null;
        ocultarTarjeta();
      } else {
        mostrarArbol(i);
      }
    });
    // Clic con mouse o Enter/Espacio con teclado: fija o suelta la tarjeta.
    g.addEventListener('click', (e) => {
      if (e.pointerType === 'touch') return;
      alternarSeleccion(i);
    });
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        alternarSeleccion(i);
      } else if (e.key === 'Escape') {
        seleccion = null;
        ocultarTarjeta();
      }
    });
    g.addEventListener('focus', () => mostrarArbol(i));
    g.addEventListener('blur', () => ocultarConRetraso());
  }

  // Cierra la tarjeta al tocar fuera de cualquier árbol (dispositivos táctiles).
  document.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' && !e.target.closest('.arbol')) {
      seleccion = null;
      ocultarTarjeta();
    }
  });

  // Reposiciona la tarjeta si la ventana cambia de tamaño o se hace scroll.
  const reposicionar = () => { if (activo !== null) posicionarTarjeta(activo); };
  window.addEventListener('resize', reposicionar);
  window.addEventListener('scroll', reposicionar, { passive: true });

  /* ---------------------------------------------------------------
     7. BUSCADOR
     --------------------------------------------------------------- */
  let resultados = [];        // índices de los árboles encontrados
  let opcionActiva = -1;      // posición resaltada con las flechas del teclado

  // Devuelve el HTML-seguro del nombre con la coincidencia resaltada.
  function nombreConResalte(nombre, consulta) {
    const frag = document.createDocumentFragment();
    const base = normalizar(nombre);
    const pos = consulta ? base.indexOf(consulta) : -1;
    if (pos < 0 || base.length !== nombre.length) {
      frag.append(nombre);
      return frag;
    }
    const marca = document.createElement('mark');
    marca.textContent = nombre.slice(pos, pos + consulta.length);
    frag.append(nombre.slice(0, pos), marca, nombre.slice(pos + consulta.length));
    return frag;
  }

  function filtrar(consultaCruda) {
    const q = normalizar(consultaCruda);
    if (!q) return [];
    const coincidencias = [];
    arboles.slice(0, TOTAL).forEach((arbol, i) => {
      const nombre = normalizar(arbol.nombre);
      // "arbol 04" también responde a "arbol 4" (se ignoran ceros a la izquierda).
      const nombreSinCeros = nombre.replace(/\b0+(\d)/g, '$1');
      const numero = numeroCorto(arbol);
      const porNombre = nombre.includes(q) || nombreSinCeros.includes(q);
      const porNumero = numero.includes(q) || String(arbol.id) === q;
      if (porNombre || porNumero) {
        // Prioridad: empieza por la consulta (0) y luego el resto (1).
        coincidencias.push({ i, prioridad: nombre.startsWith(q) || nombreSinCeros.startsWith(q) || numero === q ? 0 : 1 });
      }
    });
    return coincidencias.sort((a, b) => a.prioridad - b.prioridad || a.i - b.i).map(c => c.i);
  }

  function abrirLista(abierta) {
    listaResultados.hidden = !abierta;
    inputBusqueda.setAttribute('aria-expanded', String(abierta));
    if (!abierta) {
      opcionActiva = -1;
      inputBusqueda.removeAttribute('aria-activedescendant');
    }
  }

  function marcarOpcion(pos) {
    const opciones = listaResultados.children;
    [...opciones].forEach((li, n) => li.setAttribute('aria-selected', String(n === pos)));
    opcionActiva = pos;
    if (pos >= 0 && opciones[pos]) {
      inputBusqueda.setAttribute('aria-activedescendant', opciones[pos].id);
      opciones[pos].scrollIntoView({ block: 'nearest' });
    } else {
      inputBusqueda.removeAttribute('aria-activedescendant');
    }
  }

  function dibujarResultados(consultaCruda) {
    const q = normalizar(consultaCruda);
    listaResultados.replaceChildren();

    resultados.forEach((i, n) => {
      const arbol = arboles[i];
      const li = document.createElement('li');
      li.className = 'resultado';
      li.id = `resultado-${arbol.id}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');

      const miniatura = document.createElement('img');
      miniatura.className = 'resultado-foto';
      miniatura.loading = 'lazy';
      miniatura.width = 40;
      miniatura.height = 40;
      asignarFoto(miniatura, i);
      miniatura.alt = '';                      // decorativa: el nombre ya está en el texto

      const nombre = document.createElement('span');
      nombre.className = 'resultado-nombre';
      nombre.append(nombreConResalte(arbol.nombre, q));

      const numero = document.createElement('span');
      numero.className = 'resultado-numero';
      numero.textContent = `N.º ${numeroCorto(arbol)}`;

      li.append(miniatura, nombre, numero);
      li.addEventListener('pointerenter', () => marcarOpcion(n));
      li.addEventListener('click', () => elegirResultado(i));
      listaResultados.appendChild(li);
    });
  }

  function actualizarBusqueda() {
    const texto = inputBusqueda.value;
    botonLimpiar.hidden = texto.length === 0;
    quitarDestacado();                 // al escribir de nuevo se quita el aro anterior

    if (!normalizar(texto)) {
      resultados = [];
      listaResultados.replaceChildren();
      abrirLista(false);
      mensajeVacio.hidden = true;
      estadoBusqueda.textContent = '';
      return;
    }

    resultados = filtrar(texto);
    mensajeVacio.hidden = resultados.length > 0;

    if (resultados.length) {
      dibujarResultados(texto);
      abrirLista(true);
      marcarOpcion(-1);
      estadoBusqueda.textContent = `${resultados.length} ${resultados.length === 1 ? 'árbol encontrado' : 'árboles encontrados'}.`;
    } else {
      listaResultados.replaceChildren();
      abrirLista(false);
      estadoBusqueda.textContent = 'No se encontraron árboles con ese nombre.';
    }
  }

  // Resalta el árbol elegido en el bosque y muestra su tarjeta.
  function elegirResultado(i) {
    inputBusqueda.value = arboles[i].nombre;
    botonLimpiar.hidden = false;
    abrirLista(false);
    mensajeVacio.hidden = true;
    estadoBusqueda.textContent = `${arboles[i].nombre} seleccionado en el bosque.`;

    quitarDestacado();
    destacado = i;
    nodos[i].classList.add('destacado');

    seleccion = i;
    if (esMovil()) {
      inputBusqueda.blur();                          // cierra el teclado
      zonaBosque.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    mostrarArbol(i);
  }

  function limpiarBusqueda() {
    inputBusqueda.value = '';
    actualizarBusqueda();
    seleccion = null;
    ocultarTarjeta();
    inputBusqueda.focus();
  }

  inputBusqueda.addEventListener('input', actualizarBusqueda);
  inputBusqueda.addEventListener('focus', () => {
    if (resultados.length && listaResultados.children.length) abrirLista(true);
  });
  inputBusqueda.addEventListener('keydown', (e) => {
    const total = listaResultados.children.length;
    if (e.key === 'ArrowDown' && total) {
      e.preventDefault();
      abrirLista(true);
      marcarOpcion((opcionActiva + 1) % total);
    } else if (e.key === 'ArrowUp' && total) {
      e.preventDefault();
      abrirLista(true);
      marcarOpcion(opcionActiva <= 0 ? total - 1 : opcionActiva - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (!resultados.length) return;
      elegirResultado(resultados[opcionActiva >= 0 ? opcionActiva : 0]);
    } else if (e.key === 'Escape') {
      if (!listaResultados.hidden) abrirLista(false);
      else if (inputBusqueda.value) limpiarBusqueda();
    }
  });
  botonLimpiar.addEventListener('click', limpiarBusqueda);

  // Evita que el campo pierda el foco al pulsar sobre la lista de resultados.
  listaResultados.addEventListener('pointerdown', (e) => e.preventDefault());

  // Cierra la lista al tocar fuera del buscador.
  document.addEventListener('pointerdown', (e) => {
    if (!buscador.contains(e.target)) abrirLista(false);
  });

  /* ---------------------------------------------------------------
     8. ENLACE DE INSTAGRAM
        Toma la URL de INSTAGRAM_REEL_URL (arboles-data.js) y se la
        asigna a todos los enlaces marcados con data-enlace-instagram.
     --------------------------------------------------------------- */
  if (typeof INSTAGRAM_REEL_URL === 'string' && INSTAGRAM_REEL_URL.trim()) {
    document.querySelectorAll('[data-enlace-instagram]').forEach((a) => {
      a.href = INSTAGRAM_REEL_URL.trim();
    });
  }
})();
