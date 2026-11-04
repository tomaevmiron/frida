/* ============================================================
   FRIDA · Comportamiento de la web (sin dependencias)
   ============================================================ */
(function () {
  'use strict';
  var C = window.FRIDA, OF = window.FRIDA_OFERTAS, GAMA = window.FRIDA_GAMA;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var tramo = function (p, a, b) { return clamp((p - a) / (b - a), 0, 1); };
  var suave = function (t) { return t * t * (3 - 2 * t); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var q = new URLSearchParams(location.search);

  function wa(texto) { return 'https://wa.me/' + C.whatsapp + (texto ? '?text=' + encodeURIComponent(texto) : ''); }

  /* ---------- Fecha y hora de Lloret ---------- */
  function ahoraMadrid() {
    var p = {};
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { fecha: p.year + '-' + p.month + '-' + p.day, dia: dias[p.weekday], min: (+p.hour % 24) * 60 + (+p.minute) };
  }
  var ahora = ahoraMadrid();
  // ?hoy=AAAA-MM-DD permite previsualizar la web en otra fecha
  var HOY = /^\d{4}-\d{2}-\d{2}$/.test(q.get('hoy') || '') ? q.get('hoy') : ahora.fecha;
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var DIAS_L = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var utc = function (s) { var a = s.split('-'); return Date.UTC(+a[0], +a[1] - 1, +a[2]); };
  var difDias = function (a, b) { return Math.round((utc(b) - utc(a)) / 864e5); };
  var bonita = function (s) { var a = s.split('-'); return (+a[2]) + ' de ' + MESES[+a[1] - 1]; };
  var plural = function (n, u, us) { return n + ' ' + (n === 1 ? u : us); };

  /* ---------- Estado de las ofertas ---------- */
  var activas = [], proximas = [], pasadas = [];
  OF.forEach(function (o) {
    if (HOY < o.desde) proximas.push(o);
    else if (HOY > o.hasta) pasadas.push(o);
    else activas.push(o);
  });
  activas.sort(function (a, b) { return a.hasta < b.hasta ? -1 : 1; });
  proximas.sort(function (a, b) { return a.desde < b.desde ? -1 : 1; });
  pasadas.sort(function (a, b) { return a.hasta > b.hasta ? -1 : 1; });

  function pintarBanda() {
    var b = $('#banda');
    if (activas.length) {
      var o = activas[0], d = difDias(HOY, o.hasta);
      var cuando = d === 0 ? 'último día' : 'hasta el ' + bonita(o.hasta);
      b.innerHTML = '<span class="punto vivo" aria-hidden="true"></span><span><b>' + plural(activas.length, 'oferta activa', 'ofertas activas') + '</b> · <span class="solo-ancho">' + esc(o.etiqueta) + ', </span>' + cuando + '</span>';
    } else if (proximas.length) {
      b.innerHTML = '<span class="punto" aria-hidden="true"></span><span>Hoy sin ofertas · <b>' + esc(proximas[0].etiqueta) + '</b> empieza el ' + bonita(proximas[0].desde) + '</span>';
    } else {
      b.innerHTML = '<span class="punto" aria-hidden="true"></span><span>Hoy no hay ofertas activas · Precios habituales</span>';
    }
  }

  function tarjetaOferta(o, estado) {
    var total = Math.max(1, difDias(o.desde, o.hasta));
    var quedan = difDias(HOY, o.hasta);
    var hecho = clamp(quedan / total, 0, 1) * 100;
    var msj = 'Hola, quiero la oferta "' + o.titulo + '" (' + o.precio + ' €). ¿Qué días tenéis libres?';
    var tiempo;
    if (estado === 'proxima') {
      var faltan = difDias(HOY, o.desde);
      tiempo = '<div class="of-tiempo-fila"><span>Empieza el ' + bonita(o.desde) + '</span><span>' + (faltan === 1 ? 'Mañana' : 'En ' + faltan + ' días') + '</span></div>';
      msj = 'Hola, me interesa la oferta "' + o.titulo + '" que empieza el ' + bonita(o.desde) + '.';
    } else {
      tiempo = '<div class="of-tiempo-fila"><span>Del ' + bonita(o.desde) + ' al ' + bonita(o.hasta) + '</span><span>' + (quedan === 0 ? 'Último día' : 'Quedan ' + plural(quedan, 'día', 'días')) + '</span></div><div class="of-barra"><i style="width:' + hecho + '%"></i></div>';
    }
    return '<article class="oferta aparece ' + estado + '">' +
      '<p class="of-eti">' + (estado === 'activa' ? '<span class="punto vivo" aria-hidden="true"></span>Activa · ' : 'Próxima · ') + esc(o.etiqueta) + '</p>' +
      '<p class="of-precio">' + o.precio + '<small>€</small></p>' +
      '<div><h3 class="of-tit">' + esc(o.titulo) + '</h3><p class="of-det">' + esc(o.detalle) + '</p></div>' +
      '<div class="of-tiempo">' + tiempo + '</div>' +
      '<div class="of-acciones"><a class="btn btn-sol" target="_blank" rel="noopener" href="' + wa(msj) + '">La quiero</a></div>' +
      '</article>';
  }

  function pintarOfertas() {
    var d = utc(HOY), f = new Date(d);
    $('#ofertasFecha').textContent = 'Hoy, ' + DIAS_L[f.getUTCDay()] + ' ' + f.getUTCDate() + ' de ' + MESES[f.getUTCMonth()];
    var tit = $('#ofertasTit'), ent = $('#ofertasEntrada'), lista = $('#ofertasLista'), sin = $('#ofertasSin');
    if (activas.length) {
      tit.textContent = activas.length === 1 ? 'Hoy hay oferta' : 'Hoy hay ofertas';
      ent.textContent = activas.length === 1 ? 'Esta es la única activa ahora mismo. Cuando termine, desaparecerá de aquí.' : 'Estas son todas las activas ahora mismo. Cuando terminen, desaparecerán de aquí.';
      lista.innerHTML = activas.map(function (o) { return tarjetaOferta(o, 'activa'); }).join('') + proximas.map(function (o) { return tarjetaOferta(o, 'proxima'); }).join('');
    } else {
      tit.textContent = 'Hoy no hay ofertas';
      ent.textContent = 'Y preferimos decírtelo claro. Hoy se aplican los precios habituales; cuando haya una promoción, la verás aquí mismo con su precio y su fecha.';
      lista.innerHTML = proximas.map(function (o) { return tarjetaOferta(o, 'proxima'); }).join('');
      var u = pasadas[0];
      sin.hidden = false;
      sin.innerHTML = '<p class="sin-ultima">' + (u ? 'La última fue <b>' + esc(u.titulo) + '</b> por ' + u.precio + ' €. Terminó el ' + bonita(u.hasta) + '.' : '') + '</p>' +
        '<div class="sin-acciones"><a class="btn btn-sol" target="_blank" rel="noopener" href="' + wa('Hola, me gustaría que me avisarais cuando tengáis una nueva oferta.') + '">Avisadme de la próxima</a>' +
        '<a class="btn btn-linea" target="_blank" rel="noopener" href="' + C.instagram + '">Ver Instagram</a></div>';
    }
    pintarCalendario();
  }

  function pintarCalendario() {
    var anio = +HOY.slice(0, 4);
    var ini = Date.UTC(anio, 0, 1), fin = Date.UTC(anio + 1, 0, 1), span = fin - ini;
    var pos = function (s) { return (utc(s) - ini) / span * 100; };
    var delAnio = OF.filter(function (o) { return utc(o.hasta) >= ini && utc(o.desde) < fin; })
      .sort(function (a, b) { return a.desde < b.desde ? -1 : 1; });
    $('#calTit').textContent = 'Las ofertas de ' + anio;
    var hechas = delAnio.length;
    $('#calPie').textContent = hechas ? plural(hechas, 'promoción', 'promociones') + ' este año. Pulsa una para verla.' : '';
    // carriles para que no se pisen
    var carriles = [], marco = $('#calMarco'), html = '';
    var minimo = 20 / Math.max(280, marco.clientWidth) * 100; // ancho mínimo tocable, en %
    delAnio.forEach(function (o) {
      var a = pos(o.desde), b = pos(o.hasta) + 100 / 365;
      var i = 0;
      while (carriles[i] && carriles[i].fin > a) i++;
      carriles[i] = carriles[i] || { fin: 0, items: [] };
      carriles[i].fin = Math.max(b, a + minimo) + .3;
      carriles[i].items.push({ o: o, a: a, b: b });
    });
    MESES.forEach(function (m, i) {
      var a = (Date.UTC(anio, i, 1) - ini) / span * 100, b = (Date.UTC(anio, i + 1, 1) - ini) / span * 100;
      html += '<span class="cal-mes" style="left:' + a + '%;width:' + (b - a) + '%">' + m.charAt(0).toUpperCase() + m.slice(1, 3) + '</span>';
    });
    html += '<div class="cal-carriles">';
    carriles.forEach(function (c) {
      html += '<div class="cal-carril">';
      c.items.forEach(function (it) {
        var est = HOY < it.o.desde ? 'proxima' : HOY > it.o.hasta ? 'pasada' : 'activa';
        html += '<button type="button" class="cal-bar ' + est + '" data-i="' + OF.indexOf(it.o) + '" style="left:' + it.a + '%;width:' + (it.b - it.a) + '%" aria-label="' + esc(it.o.titulo + ', ' + it.o.precio + ' euros, del ' + bonita(it.o.desde) + ' al ' + bonita(it.o.hasta)) + '"></button>';
      });
      html += '</div>';
    });
    html += '</div><span class="cal-hoy" style="left:' + pos(HOY) + '%"><span>Hoy</span></span>';
    marco.innerHTML = html;
    function verBar(el) {
      $$('.cal-bar', marco).forEach(function (x) { x.classList.toggle('sel', x === el); });
      var o = OF[+el.dataset.i], est = HOY < o.desde ? 'Empieza pronto' : HOY > o.hasta ? 'Terminada' : 'Activa ahora';
      var fechas = o.sinFin ? 'Publicada el ' + bonita(o.desde) + ', sin fecha de fin. Pregunta si sigue vigente.' : 'Del ' + bonita(o.desde) + ' al ' + bonita(o.hasta) + '. ' + est + '.';
      $('#calDetalle').innerHTML = '<b>' + esc(o.titulo) + ', ' + o.precio + ' €.</b> ' + esc(o.detalle) + ' ' + fechas;
    }
    $$('.cal-bar', marco).forEach(function (b) {
      b.addEventListener('click', function () { verBar(b); });
      b.addEventListener('mouseenter', function () { verBar(b); });
      b.addEventListener('focus', function () { verBar(b); });
    });
    var inicial = $('.cal-bar.activa', marco) || $$('.cal-bar', marco).slice(-1)[0];
    if (inicial) verBar(inicial);
  }

  /* ---------- ¿Abierto ahora? ---------- */
  function pintarEstado() {
    var n = ahoraMadrid(), h = C.horario[n.dia], el = $('#estadoLocal');
    var mins = function (s) { var a = s.split(':'); return +a[0] * 60 + (+a[1]); };
    var abierto = h && n.min >= mins(h[0]) && n.min < mins(h[1]);
    var txt;
    if (abierto) txt = 'Abierto · cierra a las ' + h[1];
    else {
      var i = 0, d = n.dia;
      if (h && n.min < mins(h[0])) txt = 'Cerrado · abre hoy a las ' + h[0];
      else {
        do { d = (d + 1) % 7; i++; } while (!C.horario[d] && i < 8);
        txt = 'Cerrado · abre ' + (i === 1 ? 'mañana' : 'el ' + DIAS_L[d]) + ' a las ' + C.horario[d][0];
      }
    }
    el.innerHTML = '<span class="punto' + (abierto ? ' abierto' : '') + '" aria-hidden="true"></span>' + txt;
    var lista = $('#horario'), orden = [1, 2, 3, 4, 5, 6, 0];
    lista.innerHTML = orden.map(function (k) {
      var v = C.horario[k], nom = DIAS_L[k].charAt(0).toUpperCase() + DIAS_L[k].slice(1);
      return '<li class="' + (k === n.dia ? 'hoy ' : '') + (v ? '' : 'cerrado') + '"><span>' + nom + '</span><span>' + (v ? v[0] + ' – ' + v[1] : 'Cerrado') + '</span></li>';
    }).join('');
  }

  /* ---------- Portada: logo, retrato y zoom a la mirada ---------- */
  function montarPortada() {
    var capas = '';
    for (var i = 11; i >= 1; i--) capas += '<use href="#logo" x="' + (i * 1.55) + '" y="' + (i * 1.8) + '" fill="' + (i === 11 ? '#5f484d' : '#7d6065') + '"/>';
    $('#logo3d').innerHTML = capas + '<use href="#logo" fill="url(#frente)"/>';

    var cont = $('#retratoPortada'), svg = $('svg', cont);
    var defs = document.querySelector('defs g#retrato');
    svg.setAttribute('fill', 'none'); svg.setAttribute('stroke', 'currentColor'); svg.setAttribute('stroke-width', '7');
    svg.setAttribute('stroke-linecap', 'round'); svg.setAttribute('stroke-linejoin', 'round');
    svg.innerHTML = defs.innerHTML;
    // dibujo inicial de los trazos, escalonado por grupos
    var retardo = { hair: 0.1, crown: 0.5, face: 0.25, rasgos: 0.9, joyas: 1.5 };
    $$('g', svg).forEach(function (g) {
      var base = retardo[g.dataset.g] || 0;
      $$('path', g).forEach(function (p, i) {
        p.style.setProperty('--d', (base + i * 0.06).toFixed(2) + 's');
        p.style.setProperty('--t', (g.dataset.g === 'face' ? 1.6 : 0.95) + 's');
      });
    });
    if (!quieto) cont.classList.add('dibuja');

    var portada = $('#portada'), escena = $('.escena'), marca = $('.marca'), flores = $$('.flor', escena);
    var datos = $('.portada-datos'), foto = $('.foto-ojo'), fotoImg = $('img', foto), frase = $('.frase-ojo'), baja = $('.baja');
    if (quieto) return;

    var base = null;
    function medir() {
      var t = cont.style.transform; cont.style.transform = 'none';
      var r = cont.getBoundingClientRect();
      base = { ex: r.left + r.width * .334, ey: r.top + r.height * .526, vw: innerWidth, vh: innerHeight };
      cont.style.transform = t;
    }
    function pintar() {
      var r = portada.getBoundingClientRect(), total = r.height - innerHeight;
      var p = total > 0 ? clamp(-r.top / total, 0, 1) : 0;
      if (!base) medir();
      var t = suave(tramo(p, .04, .62)), t2 = suave(tramo(p, .04, .4));
      var s = Math.pow(30, t);
      var dx = (base.vw / 2 - base.ex) * t2, dy = (base.vh / 2 - base.ey) * t2;
      cont.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + s.toFixed(3) + ')';
      cont.style.opacity = (1 - tramo(p, .5, .64)).toFixed(3);
      cont.style.visibility = p > .66 ? 'hidden' : 'visible';
      var a = tramo(p, .01, .16);
      marca.style.opacity = (1 - a).toFixed(3);
      marca.style.visibility = a >= 1 ? 'hidden' : 'visible';
      marca.dataset.y = (a * -60).toFixed(1);
      marca.style.marginTop = (a * -60).toFixed(1) + 'px';
      datos.style.opacity = baja.style.opacity = (1 - tramo(p, 0, .07)).toFixed(3);
      var fl = tramo(p, .02, .3);
      flores.forEach(function (f, i) {
        f.style.opacity = (1 - fl).toFixed(3);
        f.style.translate = (i === 0 ? -1 : 1) * fl * 90 + 'px ' + fl * 70 + 'px';
      });
      var fo = suave(tramo(p, .46, .66));
      foto.style.opacity = fo.toFixed(3);
      fotoImg.style.setProperty('--fz', (1.22 - .22 * suave(tramo(p, .46, 1))).toFixed(3));
      var fr = suave(tramo(p, .7, .84));
      frase.style.opacity = fr.toFixed(3);
      frase.style.transform = 'translateY(' + ((1 - fr) * 26).toFixed(1) + 'px)';
    }
    var pedido = false;
    function pedir() { if (!pedido) { pedido = true; requestAnimationFrame(function () { pedido = false; pintar(); }); } }
    addEventListener('scroll', pedir, { passive: true });
    addEventListener('resize', function () { base = null; pedir(); });
    pintar();

    // La luz se mueve con el cursor: la sombra del logo responde como en el letrero real
    if (matchMedia('(hover:hover)').matches) {
      escena.addEventListener('pointermove', function (e) {
        var x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
        escena.style.setProperty('--lx', (x * 60).toFixed(1) + 'vw');
        escena.style.setProperty('--ly', (y * 60).toFixed(1) + 'vh');
        marca.style.setProperty('--sx', (x * -26).toFixed(1) + 'px');
        marca.style.setProperty('--sy', (y * -26).toFixed(1) + 'px');
      }, { passive: true });
    }
  }

  /* ---------- Mi visita ---------- */
  var actualizarBarra = function () { };
  var visita = { items: [], dia: 'Cualquier día', hora: 'Cualquier hora', nota: '' };
  try { var g = JSON.parse(localStorage.getItem('frida.visita') || 'null'); if (g && g.items) visita = Object.assign(visita, g); } catch (e) { }
  function guardar() { try { localStorage.setItem('frida.visita', JSON.stringify(visita)); } catch (e) { } }

  function mensajeVisita() {
    var t = 'Hola, me gustaría pedir cita en Frida.';
    if (visita.items.length) t += '\n\nMe interesa:\n' + visita.items.map(function (i) { return '- ' + i.nombre + (i.extra ? ' (' + i.extra + ')' : ''); }).join('\n');
    t += '\n\nDía: ' + visita.dia + '\nHora: ' + visita.hora;
    if (visita.nota) t += '\n\n' + visita.nota;
    return t;
  }
  function pintarVisita() {
    var n = visita.items.length;
    $('#barraNum').textContent = n;
    $('#barraTxt').textContent = n === 1 ? 'servicio en mi visita' : n ? 'servicios en mi visita' : 'Mi visita';
    $('#pvLista').innerHTML = visita.items.map(function (i, k) {
      return '<li><span>' + esc(i.nombre) + (i.extra ? '<small>' + esc(i.extra) + '</small>' : '') + '</span><button type="button" class="pv-quitar" data-k="' + k + '" aria-label="Quitar ' + esc(i.nombre) + '">×</button></li>';
    }).join('');
    $('#pvVacia').hidden = n > 0;
    $('#pvPrevia').textContent = mensajeVisita();
    $('#pvEnviar').href = wa(mensajeVisita());
    $$('.sumar').forEach(function (b) {
      var si = visita.items.some(function (i) { return i.id === b.dataset.id; });
      b.setAttribute('aria-pressed', si ? 'true' : 'false');
      b.textContent = si ? '✓' : '+';
      b.setAttribute('aria-label', (si ? 'Quitar ' : 'Añadir ') + b.dataset.nombre + (si ? ' de mi visita' : ' a mi visita'));
    });
    $$('#pvDias .chip').forEach(function (c) { c.setAttribute('aria-pressed', c.textContent === visita.dia ? 'true' : 'false'); });
    $$('#pvHoras .chip').forEach(function (c) { c.setAttribute('aria-pressed', c.textContent === visita.hora ? 'true' : 'false'); });
    guardar();
    actualizarBarra();
  }
  function alternar(id, nombre, extra) {
    var k = -1;
    visita.items.forEach(function (i, n) { if (i.id === id) k = n; });
    if (k >= 0) visita.items.splice(k, 1); else visita.items.push({ id: id, nombre: nombre, extra: extra || '' });
    pintarVisita();
  }
  function montarVisita() {
    var chips = function (el, arr) { el.innerHTML = arr.map(function (t) { return '<button type="button" class="chip" aria-pressed="false">' + t + '</button>'; }).join(''); };
    chips($('#pvDias'), ['Cualquier día', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']);
    chips($('#pvHoras'), ['Cualquier hora', 'Por la mañana', 'Por la tarde']);
    $('#pvDias').addEventListener('click', function (e) { if (e.target.matches('.chip')) { visita.dia = e.target.textContent; pintarVisita(); } });
    $('#pvHoras').addEventListener('click', function (e) { if (e.target.matches('.chip')) { visita.hora = e.target.textContent; pintarVisita(); } });
    $('#pvNota').value = visita.nota;
    $('#pvNota').addEventListener('input', function (e) { visita.nota = e.target.value; pintarVisita(); });
    $('#pvLista').addEventListener('click', function (e) {
      var b = e.target.closest('.pv-quitar'); if (!b) return;
      visita.items.splice(+b.dataset.k, 1); pintarVisita();
    });
    var panel = $('#panelVisita');
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-abrir-visita]')) { pintarVisita(); panel.showModal(); }
      var c = e.target.closest('[data-cerrar]');
      if (c) { var d = c.closest('dialog'); if (d) d.close(); }
      var s = e.target.closest('.sumar');
      if (s) alternar(s.dataset.id, s.dataset.nombre);
    });
    $$('dialog').forEach(function (d) {
      d.addEventListener('click', function (e) { if (e.target === d && d.id !== 'menu') d.close(); });
    });
  }

  /* ---------- Capítulos ---------- */
  function trazo(vb) { return '<svg viewBox="' + vb + '" aria-hidden="true"><use href="#retrato"/></svg>'; }
  // Rasgos sueltos del retrato (solo las líneas indicadas), con grosor constante
  function rasgo(indices, vb, grupo) {
    var ps = $$('defs g#retrato g[data-g="' + (grupo || 'rasgos') + '"] path');
    return '<svg class="rasgo" viewBox="' + vb + '" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      indices.map(function (i) { return '<path vector-effect="non-scaling-stroke" d="' + ps[i].getAttribute('d') + '"/>'; }).join('') + '</svg>';
  }
  function filaHTML(s) {
    var specs = (s.specs || []).map(function (x) { return '<div class="spec"><dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('');
    return '<li class="fila aparece">' +
      '<div class="fila-info"><h4 class="fila-nombre" style="margin:0">' + esc(s.nombre) + '</h4><p class="fila-sub">' + esc(s.sub) + '</p><p class="fila-texto">' + esc(s.texto) + '</p>' +
      (s.detalle ? '<details><summary>Cómo es</summary><p>' + esc(s.detalle) + (s.enlace ? ' <a href="' + s.enlace + '">Ir al capítulo</a>.' : '') + '</p></details>' : '') + '</div>' +
      '<div class="fila-datos"><dl class="fila-specs" style="margin:0">' + specs + '</dl>' +
      '<dl class="fila-precio" style="margin:0"><dt>Precio</dt><dd class="' + (s.precio ? 'tiene' : '') + '">' + esc(s.precio || 'A consultar') + '</dd>' + (s.promo ? '<dd class="fila-promo">' + esc(s.promo) + '</dd>' : '') + '</dl></div>' +
      '<button type="button" class="sumar" data-id="' + s.id + '" data-nombre="' + esc(s.nombre) + '" aria-pressed="false">+</button>' +
      '</li>';
  }
  function fig(src, cap, ar, w, h) {
    return '<figure style="--ar:' + ar + '"><img src="img/' + src + '" alt="' + esc(cap) + '" width="' + w + '" height="' + h + '" loading="lazy" data-ver="img/' + src + '" data-pie="' + esc(cap) + '"><figcaption>' + esc(cap) + '</figcaption></figure>';
  }
  function extraMicro() {
    return '<div class="trazos aparece">' +
      '<div class="trazo">' + rasgo([0, 1, 2, 3], '205 775 475 118') + '<p>Cejas</p></div>' +
      '<div class="trazo">' + rasgo([16, 17, 18], '322 1200 228 152') + '<p>Labios</p></div>' +
      '<div class="trazo">' + rasgo([4, 5, 6, 7, 8], '216 840 192 126') + '<p>Ojos</p></div></div>' +
      '<div class="cap-media dos aparece">' + fig('cejas.jpg', 'Cejas, recién terminadas', '1/1', 1300, 1387) + fig('eyeliner.jpg', 'Eyeliner, recién terminado', '1.42', 1700, 944) + '</div>';
  }
  function extraMirada() {
    return '<div class="cap-media dos-b aparece">' + fig('pestanas-perfil.jpg', 'Pestañas pelo a pelo', '1.37', 1700, 1240) + fig('pestanas-natural.jpg', 'Efecto natural', '1/1', 1700, 1257) + '</div>';
  }
  var TALLAS = [
    { k: 'XS', area: 'Hasta 16 cm²', precio: 39, lado: 26 },
    { k: 'S', area: 'Hasta 50 cm²', precio: 49, lado: 40 },
    { k: 'M', area: 'De 50 a 100 cm²', precio: 59, lado: 54 },
    { k: 'L', area: 'De 100 a 250 cm²', precio: 72, lado: 72 },
    { k: 'XL', area: 'De 250 a 400 cm²', precio: 105, lado: 90 }
  ];
  // Rosa de línea, en el mismo trazo que el retrato: hace de "tatuaje" en la calculadora
  var ROSA = '<svg class="rasgo" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    ['M100 40C130 30 165 50 168 88 170 120 150 150 118 158 90 165 52 155 38 122 26 92 40 56 72 44 82 40 92 40 100 40Z',
      'M100 62C124 56 148 76 144 104 140 130 112 146 88 136 64 126 60 92 78 74 86 66 94 64 100 62',
      'M104 84C118 82 128 94 122 108 116 120 98 122 90 110 84 100 92 90 102 92 110 94 110 106 102 106',
      'M72 44C74 60 62 72 44 82', 'M168 88C150 84 140 70 130 52', 'M118 158C116 140 126 128 144 118', 'M38 122C54 118 66 126 74 140',
      'M150 152C170 154 186 170 190 192 168 192 150 176 150 152ZM150 152C160 166 172 178 190 192',
      'M48 150C30 156 16 172 12 192 34 190 50 174 48 150ZM48 150C38 166 26 178 12 192'
    ].map(function (d) { return '<path vector-effect="non-scaling-stroke" d="' + d + '"/>'; }).join('') + '</svg>';
  function extraTatuajes() {
    return '<div class="calc aparece"><div>' +
      '<p class="calc-tit">¿Cuánto mide tu tatuaje?</p>' +
      '<div class="calc-tallas" role="group" aria-label="Tamaño del tatuaje">' + TALLAS.map(function (t, i) { return '<button type="button" data-t="' + i + '" aria-pressed="false">' + t.k + '</button>'; }).join('') + '</div>' +
      '<p class="calc-area" id="calcArea"></p>' +
      '<p class="calc-precio"><span id="calcPrecio"></span> €<small>por sesión</small></p>' +
      '<p class="calc-est" id="calcEst"></p>' +
      '<button type="button" class="btn btn-linea" id="calcAdd" style="margin-top:1rem">Pedir valoración</button>' +
      '</div><div class="calc-vista"><div class="calc-marco" id="calcMarco">' + ROSA + '<span class="calc-cota" id="calcCota"></span></div></div></div>';
  }
  var TONOS = [['Rojo Frida', '#a3212e'], ['Rosa viejo', '#c58f92'], ['Nude', '#d9b9a3'], ['Ciruela', '#5b2a47'], ['Lila acuarela', '#9b83b3'], ['Oro hoja', '#c9a45e'], ['Negro', '#1e1a20']];
  var FORMAS = {
    Almendra: 'M15 64 C15 77 45 77 45 64 L46 42 C46 27 37 8 30 2 C23 8 14 27 14 42 Z',
    Redonda: 'M15 64 C15 77 45 77 45 64 L46 32 C46 18 39 9 30 9 C21 9 14 18 14 32 Z',
    Cuadrada: 'M15 64 C15 77 45 77 45 64 L46 13 C46 10 44 9 42 9 L18 9 C16 9 14 10 14 13 Z'
  };
  function extraUnas() {
    // Cuatro dedos y pulgar, dibujados con la misma línea que el retrato
    var alturas = [52, 12, 0, 16, 70];
    var unas = alturas.map(function (m) {
      return '<div class="una" style="margin-top:' + m + 'px"><svg viewBox="0 0 60 240" aria-hidden="true">' +
        '<path class="dedo" d="M7 240 V66 C7 48 11 34 18 26 M53 240 V66 C53 48 49 34 42 26 M15 142 C24 146 36 146 45 142 M17 151 C25 154 35 154 43 151"/>' +
        '<path class="una-f" fill="#a3212e" d="' + FORMAS.Almendra + '"/><path class="brillo" d="M21 60 C19 46 21 30 26 18 C24 34 24 48 25 62 Z"/></svg></div>';
    }).join('');
    return '<div class="lienzo aparece"><div class="unas-vista" id="unasVista">' + unas + '</div><div>' +
      '<p class="lienzo-tit">Pruébatelas aquí</p>' +
      '<p class="lienzo-et">Tono</p><div class="tonos" id="tonos" role="group" aria-label="Tono de uñas">' + TONOS.map(function (t, i) { return '<button type="button" class="tono" style="--c:' + t[1] + '" data-i="' + i + '" aria-label="' + t[0] + '" aria-pressed="' + (i === 0) + '"></button>'; }).join('') + '</div>' +
      '<p class="lienzo-et">Forma</p><div class="formas" id="formas" role="group" aria-label="Forma de uñas">' + Object.keys(FORMAS).map(function (f, i) { return '<button type="button" class="chip" data-f="' + f + '" aria-pressed="' + (i === 0) + '">' + f + '</button>'; }).join('') + '</div>' +
      '<p class="lienzo-sel" id="unasSel"></p><button type="button" class="btn btn-linea" id="unasAdd">Añadir a mi visita</button>' +
      '</div></div>';
  }
  function montarGama() {
    var cont = $('#capitulos');
    cont.innerHTML = GAMA.map(function (c) {
      var extra = c.id === 'micropigmentacion' ? extraMicro() : c.id === 'mirada' ? extraMirada() : c.extra === 'tatuajes' ? extraTatuajes() : c.extra === 'unas' ? extraUnas() : '';
      var ramo = c.flor === 'flores.png';
      return '<section class="cap" id="' + c.id + '" data-tinte="' + c.tinte + '" data-cap aria-labelledby="t-' + c.id + '">' +
        '<img class="cap-flor' + (ramo ? ' ramo' : '') + '" src="img/arte/' + c.flor + '" alt="" loading="lazy">' +
        '<div class="envuelve"><div class="cap-cab aparece">' +
        '<div class="cap-cabeza"><p class="cap-num">' + c.num + '</p><h3 class="cap-tit' + (c.titulo.length > 11 ? ' largo' : '') + '" id="t-' + c.id + '">' + esc(c.titulo) + '</h3></div>' +
        '<p class="cap-lema">' + esc(c.lema) + '</p><p class="cap-intro">' + esc(c.intro) + '</p></div>' +
        extra +
        '<ul class="lista">' + c.servicios.map(filaHTML).join('') + '</ul>' +
        (c.nota ? '<p class="cap-nota">* Valores orientativos. Dependen de cada piel y de cada caso, y se confirman en la valoración.</p>' : '') +
        '</div></section>';
    }).join('');

    $('#indice').innerHTML = GAMA.map(function (c) { return '<a href="#' + c.id + '" data-c="' + c.id + '"><small>' + c.num + '</small>' + esc(c.titulo) + '</a>'; }).join('');

    // Calculadora de tatuajes
    var sel = 2;
    function pintaTalla() {
      var t = TALLAS[sel];
      $$('.calc-tallas button').forEach(function (b, i) { b.setAttribute('aria-pressed', i === sel ? 'true' : 'false'); });
      $('#calcArea').textContent = t.area;
      $('#calcPrecio').textContent = t.precio;
      $('#calcEst').innerHTML = 'Con <b>6 a 10 sesiones</b> orientativas, el total estaría entre <b>' + (t.precio * 6) + ' y ' + (t.precio * 10) + ' €</b>. Se confirma al verlo.';
      $('#calcMarco').style.setProperty('--lado', t.lado + '%');
      $('#calcCota').textContent = t.area.toLowerCase();
    }
    $('.calc-tallas').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { sel = +b.dataset.t; pintaTalla(); } });
    $('#calcAdd').addEventListener('click', function () {
      var t = TALLAS[sel], ya = visita.items.some(function (i) { return i.id === 'tatuajes'; });
      if (ya) visita.items = visita.items.filter(function (i) { return i.id !== 'tatuajes'; });
      visita.items.push({ id: 'tatuajes', nombre: 'Eliminación de tatuajes', extra: 'Talla ' + t.k + ', ' + t.area.toLowerCase() });
      pintarVisita(); $('#panelVisita').showModal();
    });
    pintaTalla();

    // Uñas
    var tono = 0, forma = 'Almendra';
    function pintaUnas() {
      $$('#unasVista .una-f').forEach(function (p) { p.setAttribute('fill', TONOS[tono][1]); p.setAttribute('d', FORMAS[forma]); p.style.d = 'path("' + FORMAS[forma] + '")'; });
      $$('#tonos .tono').forEach(function (b, i) { b.setAttribute('aria-pressed', i === tono ? 'true' : 'false'); });
      $$('#formas .chip').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.f === forma ? 'true' : 'false'); });
      $('#unasSel').textContent = TONOS[tono][0] + ', forma ' + forma.toLowerCase();
    }
    $('#tonos').addEventListener('click', function (e) { var b = e.target.closest('.tono'); if (b) { tono = +b.dataset.i; pintaUnas(); } });
    $('#formas').addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) { forma = b.dataset.f; pintaUnas(); } });
    $('#unasAdd').addEventListener('click', function () {
      visita.items = visita.items.filter(function (i) { return i.id !== 'unas-eleccion'; });
      visita.items.push({ id: 'unas-eleccion', nombre: 'Uñas', extra: TONOS[tono][0] + ', forma ' + forma.toLowerCase() });
      pintarVisita(); $('#panelVisita').showModal();
    });
    pintaUnas();
  }

  /* ---------- Tinte de fondo e índice ---------- */
  function montarTintes() {
    var secciones = $$('[data-tinte]');
    var enlaces = $$('#indice a');
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.documentElement.style.setProperty('--tinte', e.target.dataset.tinte);
        document.body.style.setProperty('--tinte', e.target.dataset.tinte);
        var id = e.target.dataset.cap !== undefined ? e.target.id : null;
        enlaces.forEach(function (a) {
          var on = a.dataset.c === id;
          a.classList.toggle('activo', on);
          if (on) { var nav = $('#indice'); nav.scrollTo({ left: a.offsetLeft - nav.clientWidth / 2 + a.offsetWidth / 2, behavior: 'smooth' }); }
        });
      });
    }, { rootMargin: '-48% 0px -48% 0px' });
    secciones.forEach(function (s) { obs.observe(s); });

    var ap = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visto'); ap.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.aparece').forEach(function (a) { ap.observe(a); });
  }

  /* ---------- Cabecera y barra ---------- */
  function montarCabecera() {
    var cab = $('#cab'), barra = $('#barra'), port = $('#portada');
    function f() {
      var y = scrollY, r = port.getBoundingClientRect();
      cab.classList.toggle('solida', r.bottom < innerHeight * .5 || y > r.height - innerHeight);
      // En escritorio la barra solo aparece cuando ya hay algo elegido; en móvil, siempre tras la portada
      var movil = innerWidth <= 720;
      barra.classList.toggle('ver', r.bottom < innerHeight * .5 && (movil || visita.items.length > 0));
    }
    actualizarBarra = f;
    addEventListener('scroll', f, { passive: true }); addEventListener('resize', f); f();
    $('#barraWa').href = wa('Hola, me gustaría pedir cita en Frida.');
  }

  /* ---------- Menú ---------- */
  function montarMenu() {
    var items = [
      ['#ofertas', 'Ofertas de hoy', 'pestanas-azul.jpg'], ['#micropigmentacion', 'Micropigmentación', 'cejas.jpg'], ['#mirada', 'Mirada', 'pestanas-perfil.jpg'],
      ['#laser', 'Láser', 'pestanas-verde.jpg'], ['#unas', 'Uñas', 'pestanas-natural.jpg'], ['#faciales', 'Faciales', 'mirada-completa.jpg'], ['#masajes', 'Masajes', 'ojo-portada.jpg'],
      ['#corporales', 'Corporales', 'pestanas-densas.jpg'], ['#capilar', 'Capilar', 'eyeliner.jpg'], ['#resultados', 'Resultados', 'pestanas-azul.jpg'],
      ['#regalo', 'Tarjeta regalo', 'fachada.jpg'], ['#visita', 'Ven a vernos', 'fachada.jpg']
    ];
    var nav = $('#menuNav');
    nav.innerHTML = items.map(function (i) { return '<a href="' + i[0] + '" data-img="img/' + i[2] + '" data-cerrar>' + i[1] + '</a>'; }).join('') +
      '<div class="contacto"><a target="_blank" rel="noopener" href="' + wa('Hola, me gustaría pedir cita en Frida.') + '">WhatsApp</a><a target="_blank" rel="noopener" href="' + C.fresha + '">Fresha</a><a target="_blank" rel="noopener" href="' + C.instagram + '">Instagram</a></div>';
    var menu = $('#menu'), img = $('#menuImg');
    $('#btnMenu').addEventListener('click', function () { menu.showModal(); });
    $$('a[data-img]', nav).forEach(function (a) {
      var cambia = function () { if (innerWidth > 720) img.src = a.dataset.img; };
      a.addEventListener('mouseenter', cambia); a.addEventListener('focus', cambia);
    });
  }

  /* ---------- Galería ---------- */
  function montarGaleria() {
    var rail = $('#rail'), fotos = window.FRIDA_FOTOS;
    function pinta(f) {
      rail.innerHTML = fotos.filter(function (x) { return f === 'todos' || x.tipo === f; }).map(function (x) {
        return '<figure class="foto" style="--ar:' + (x.w / x.h).toFixed(3) + '"><button type="button" data-ver="img/' + x.src + '" data-pie="' + esc(x.t + ', ' + x.d) + '" aria-label="Ampliar: ' + esc(x.t + ', ' + x.d) + '"><img src="img/' + x.src + '" alt="' + esc(x.t + ', ' + x.d) + '" width="' + x.w + '" height="' + x.h + '" loading="lazy" draggable="false"></button><figcaption><span>' + esc(x.t) + '</span><em>' + esc(x.d) + '</em></figcaption></figure>';
      }).join('');
      rail.scrollLeft = 0;
    }
    pinta('todos');
    $('#filtros').addEventListener('click', function (e) {
      var b = e.target.closest('.filtro'); if (!b) return;
      $$('.filtro').forEach(function (x) { var on = x === b; x.classList.toggle('activo', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
      pinta(b.dataset.f);
    });
    var paso = function () { return Math.max(280, rail.clientWidth * .6); };
    $('#railAtras').addEventListener('click', function () { rail.scrollBy({ left: -paso(), behavior: 'smooth' }); });
    $('#railDelante').addEventListener('click', function () { rail.scrollBy({ left: paso(), behavior: 'smooth' }); });
    // Arrastrar con ratón
    var dn = false, sx = 0, sl = 0, movio = false;
    rail.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; dn = true; movio = false; sx = e.clientX; sl = rail.scrollLeft; });
    addEventListener('pointermove', function (e) { if (!dn) return; var d = e.clientX - sx; if (Math.abs(d) > 5) { movio = true; rail.classList.add('arrastrando'); } rail.scrollLeft = sl - d; });
    addEventListener('pointerup', function () { if (dn) { dn = false; setTimeout(function () { rail.classList.remove('arrastrando'); movio = false; }, 0); } });
    rail.addEventListener('click', function (e) { if (movio) { e.preventDefault(); e.stopPropagation(); } }, true);
    // Visor
    var visor = $('#visor');
    document.addEventListener('click', function (e) {
      var v = e.target.closest('[data-ver]'); if (!v) return;
      $('#visorImg').src = v.dataset.ver; $('#visorImg').alt = v.dataset.pie; $('#visorPie').textContent = v.dataset.pie; visor.showModal();
    });
    $('#destacadas').innerHTML = window.FRIDA_DESTACADAS.map(function (d) {
      return '<a class="dest" target="_blank" rel="noopener" href="' + C.instagram + '"><img src="img/destacadas/' + d.img + '" alt="" width="150" height="150" loading="lazy">' + esc(d.t) + '</a>';
    }).join('');
  }

  /* ---------- Antes y después ---------- */
  function montarAntesDespues() {
    var lista = window.FRIDA_ANTES_DESPUES, comp = $('#adComparador'), A = $('#adAntes'), D = $('#adDespues'), R = $('#adRango');
    function recorte(el, item, rc) {
      var W = item.ancho, H = item.alto;
      el.style.backgroundImage = 'url(img/' + item.imagen + ')';
      el.style.backgroundSize = (W / rc.w * 100) + '% ' + (H / rc.h * 100) + '%';
      el.style.backgroundPosition = (rc.x / (W - rc.w) * 100) + '% ' + (rc.y / (H - rc.h) * 100) + '%';
    }
    function ver(i) {
      var it = lista[i];
      if (it.imagen) {
        recorte(A, it, it.recorteAntes); recorte(D, it, it.recorteDespues);
        comp.style.setProperty('--ar', it.recorteAntes.w + '/' + it.recorteAntes.h);
      } else {
        A.style.cssText = 'background:url(img/' + it.antes + ') center/cover';
        D.style.cssText = 'background:url(img/' + it.despues + ') center/cover';
        comp.style.setProperty('--ar', it.ar || '4/5');
      }
      $('#adTexto').innerHTML = '<b style="font-weight:400">' + esc(it.titulo) + '.</b> ' + esc(it.texto);
      $$('#adBotones .chip').forEach(function (b, k) { b.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    }
    if (lista.length > 1) {
      $('#adBotones').innerHTML = lista.map(function (it, i) { return '<button type="button" class="chip" data-i="' + i + '">' + esc(it.titulo) + '</button>'; }).join('');
      $('#adBotones').addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) ver(+b.dataset.i); });
    }
    R.addEventListener('input', function () { comp.style.setProperty('--pos', R.value + '%'); });
    ver(0);
  }

  /* ---------- Tarjeta regalo ---------- */
  function montarRegalo() {
    var sel = $('#fQue'), opts = ['Lo que elija', 'Masaje corporal', 'Chocolaterapia', 'Limpieza de cutis profunda', 'Manicura semipermanente', 'Pedicura completa', 'Pestañas pelo a pelo', 'Lifting de pestañas', 'Micropigmentación de cejas', 'Maderoterapia', 'Peeling corporal'];
    sel.innerHTML = opts.map(function (o) { return '<option' + (o === 'Masaje corporal' ? ' selected' : '') + '>' + o + '</option>'; }).join('');
    function pinta() {
      $('#tjPara').textContent = $('#fPara').value.trim() || 'Alguien especial';
      $('#tjDe').textContent = $('#fDe').value.trim() || 'Ti';
      $('#tjQue').textContent = sel.value;
    }
    ['#fPara', '#fDe', '#fQue'].forEach(function (s) { $(s).addEventListener('input', pinta); });
    $('#formRegalo').addEventListener('submit', function (e) {
      e.preventDefault();
      var para = $('#fPara').value.trim(), de = $('#fDe').value.trim();
      var t = 'Hola, me gustaría una tarjeta regalo de Frida.\n\nRegalo: ' + sel.value + (para ? '\nPara: ' + para : '') + (de ? '\nDe parte de: ' + de : '');
      window.open(wa(t), '_blank', 'noopener');
    });
    var tj = $('#tarjeta');
    if (!quieto && matchMedia('(hover:hover)').matches) {
      tj.addEventListener('pointermove', function (e) {
        var r = tj.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        tj.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); tj.style.setProperty('--rx', (y * -7).toFixed(2) + 'deg');
      });
      tj.addEventListener('pointerleave', function () { tj.style.setProperty('--ry', '0deg'); tj.style.setProperty('--rx', '0deg'); });
    }
  }

  /* ---------- Opiniones ---------- */
  function montarOpiniones() {
    var l = window.FRIDA_RESENAS, i = 0;
    $('#notaGrande').textContent = C.nota;
    $('#opiSub').textContent = C.resenas + ' reseñas en Google';
    $('#opiLink').href = C.google;
    function ver() {
      $('#citaTexto').textContent = '«' + l[i].q + '»';
      $('#citaAutor').textContent = l[i].a;
      $('#citaPos').textContent = (i + 1) + ' de ' + l.length;
    }
    $('#citaAtras').addEventListener('click', function () { i = (i - 1 + l.length) % l.length; ver(); });
    $('#citaDelante').addEventListener('click', function () { i = (i + 1) % l.length; ver(); });
    ver();
  }

  /* ---------- Enlaces de contacto ---------- */
  function montarEnlaces() {
    $('#datoNota').textContent = C.nota;
    $('#visDir').textContent = C.direccion;
    $('#visCiudad').textContent = C.ciudad;
    $('#visComoLlegar').href = C.google;
    $('#canalWa').href = wa('Hola, me gustaría pedir cita en Frida.');
    $('#canalWaTel').textContent = C.telefonoVisible;
    $('#canalFresha').href = C.fresha;
    $('#canalIg').href = C.instagram;
    $('#pvFresha').href = C.fresha;
    $$('[data-fresha]').forEach(function (a) { a.href = C.fresha; });
    $$('[data-ig]').forEach(function (a) { a.href = C.instagram; });
    $$('[data-tel]').forEach(function (a) { a.href = wa(''); a.target = '_blank'; a.rel = 'noopener'; a.textContent = C.telefonoVisible; });
    var mapa = $('#mapa');
    var obs = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { mapa.src = C.mapaEmbed; obs.disconnect(); } }, { rootMargin: '400px' });
    obs.observe(mapa);
  }

  /* ---------- Arranque ---------- */
  pintarBanda();
  pintarOfertas();
  pintarEstado();
  montarPortada();
  montarGama();
  montarVisita();
  pintarVisita();
  montarMenu();
  montarGaleria();
  montarAntesDespues();
  montarRegalo();
  montarOpiniones();
  montarEnlaces();
  montarTintes();
  montarCabecera();
  setInterval(pintarEstado, 60000);
})();
