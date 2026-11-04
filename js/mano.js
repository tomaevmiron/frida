/* ============================================================
   FRIDA · Mano para el probador de uñas
   Mano en pose relajada, con los dedos juntos y ligeramente curvos.
   Cada dedo se construye sobre un eje curvo con grosor variable; las
   uñas son trazados propios, así cambian de forma y color sin redibujar.
   ============================================================ */
(function () {
  'use strict';

  var FORMAS = {
    Almendra: 'M15 64C15 77 45 77 45 64L46 30C46 12 38-5 30-11 22-5 14 12 14 30Z',
    Redonda: 'M15 64C15 77 45 77 45 64L46 28C46 12 39 3 30 3 21 3 14 12 14 28Z',
    Cuadrada: 'M15 64C15 77 45 77 45 64L46 8C46 5 44 3 42 3L18 3C16 3 14 5 14 8Z'
  };

  // x, y: centro de la base. a: inclinación. L: largo. wb/wt: grosor en base y yema. c: curva.
  var DEDOS = [
    { x: 120, y: 300, a: -9, L: 118, wb: 30, wt: 20, c: 7 },
    { x: 150.5, y: 268, a: -4, L: 160, wb: 32, wt: 22, c: 5 },
    { x: 184, y: 255, a: .5, L: 178, wb: 33, wt: 23, c: 0 },
    { x: 218, y: 268, a: 5, L: 160, wb: 33, wt: 23, c: -5 }
  ];
  var PULGAR = { x: 268, y: 372, a: 31, L: 116, wb: 42, wt: 27, c: -11, pulgar: true };

  function n(v) { return Math.round(v * 10) / 10; }
  function aGlobal(d, x, y) {
    var r = d.a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r);
    return [d.x + x * c - y * s, d.y + x * s + y * c];
  }
  // Punto en el dedo: t a lo largo del eje (0 base, 1 yema), u desplazamiento lateral
  function puntoDedo(d, t, u) { return aGlobal(d, u + d.c * t * t, -d.L * t); }
  function grosor(d, t) {
    var g = function (c, a) { return Math.exp(-Math.pow((t - c) / a, 2)); };
    var articula = d.pulgar ? 1.6 * g(.5, .1) : 1.3 * g(.36, .07) + 1 * g(.66, .06);
    return d.wb + (d.wt - d.wb) * Math.pow(t, .85) + articula;
  }

  // Catmull-Rom: une los puntos con curvas suaves, sin esquinas
  function curvas(ps) {
    var s = '';
    for (var i = 0; i < ps.length - 1; i++) {
      var p0 = ps[Math.max(0, i - 1)], p1 = ps[i], p2 = ps[i + 1], p3 = ps[Math.min(ps.length - 1, i + 2)];
      s += 'C' + n(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + n(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
        n(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + n(p2[1] - (p3[1] - p1[1]) / 6) + ' ' + n(p2[0]) + ' ' + n(p2[1]);
    }
    return s;
  }

  function perfilDedo(d) {
    var t0 = 1 - d.wt * .58 / d.L, ps = [], i;
    [0, .12, .24, .36, .5, .66, .82, t0].forEach(function (t) { if (t <= t0) ps.push(puntoDedo(d, t, -grosor(d, t) / 2)); });
    for (i = 1; i < 6; i++) {
      var th = Math.PI - i * Math.PI / 6;
      ps.push(puntoDedo(d, t0 + (1 - t0) * Math.sin(th), grosor(d, t0) / 2 * Math.cos(th)));
    }
    [t0, .82, .66, .5, .36, .24, .12, 0].forEach(function (t) { if (t <= t0) ps.push(puntoDedo(d, t, grosor(d, t) / 2)); });
    return ps;
  }

  function silueta() {
    // Antebrazo, muñeca y canto de la mano, en una sola curva con el meñique
    var lado = [[112, 800], [120, 640], [127, 540], [128, 486], [117, 446], [101, 396], [98, 345]].concat(perfilDedo(DEDOS[0]));
    var d = 'M' + lado[0].join(' ') + curvas(lado);
    [1, 2].forEach(function (k) {
      var previo = perfilDedo(DEDOS[k - 1]), ps = perfilDedo(DEDOS[k]), a = previo[previo.length - 1], b = ps[0];
      d += 'Q' + n((a[0] + b[0]) / 2) + ' ' + n(Math.max(a[1], b[1]) + 7) + ' ' + n(b[0]) + ' ' + n(b[1]) + curvas(ps);
    });
    // Índice y costado de la mano hasta la membrana del pulgar
    var previo = perfilDedo(DEDOS[2]), ind = perfilDedo(DEDOS[3]), a = previo[previo.length - 1], pul = perfilDedo(PULGAR);
    d += 'Q' + n((a[0] + ind[0][0]) / 2) + ' ' + n(Math.max(a[1], ind[0][1]) + 7) + ' ' + n(ind[0][0]) + ' ' + n(ind[0][1]);
    d += curvas(ind.concat([[238, 300], [243, 330], pul[0]]));
    // Pulgar, su base y lado derecho de la muñeca, sin esquinas
    d += curvas(pul.concat([[278, 412], [267, 442], [253, 470], [244, 502], [242, 540], [246, 640], [254, 800]]));
    return d;
  }

  function pliegues(d) {
    var h = '';
    [[.36, .46], [.66, .4]].forEach(function (o) {
      var u = grosor(d, o[0]) * o[1] / 2, a = puntoDedo(d, o[0], -u), b = puntoDedo(d, o[0], u), m = puntoDedo(d, o[0] - .012, 0);
      h += '<path class="pliegue" d="M' + n(a[0]) + ' ' + n(a[1]) + 'Q' + n(m[0]) + ' ' + n(m[1]) + ' ' + n(b[0]) + ' ' + n(b[1]) + '"/>';
    });
    return h;
  }

  function una(d, forma, tono) {
    var s = d.wt * .9 / 32;
    var inclina = Math.atan(2 * d.c / d.L) * 180 / Math.PI;
    var t = 'translate(' + d.x + ' ' + d.y + ') rotate(' + d.a + ') translate(' + d.c + ' ' + n(-d.L - .5) + ') rotate(' + n(inclina) + ') scale(' + s.toFixed(3) + ') translate(-30 -3)';
    return '<g transform="' + t + '"><path class="una-f" fill="' + tono + '" d="' + FORMAS[forma] + '"/>' +
      '<path class="brillo" d="M21 60C18 44 20 28 25 14 23 32 24 46 25 62Z"/></g>';
  }

  window.FRIDA_MANO = function (forma, tono) {
    forma = forma || 'Almendra'; tono = tono || '#a3212e';
    var ani = DEDOS[1], u = grosor(ani, .2) / 2 - .4, a = puntoDedo(ani, .2, -u), b = puntoDedo(ani, .2, u), m = puntoDedo(ani, .165, 0);
    var anillo = '<path class="joya" d="M' + n(a[0]) + ' ' + n(a[1]) + 'Q' + n(m[0]) + ' ' + n(m[1]) + ' ' + n(b[0]) + ' ' + n(b[1]) + '"/>';
    var pulsera = '<path class="joya" d="M128 512Q186 536 244 512"/><path class="joya" d="M127 522Q186 546 244 522"/>';
    return '<svg class="mano" viewBox="36 54 362 568" role="img" aria-label="Mano con las uñas pintadas">' +
      '<g transform="rotate(14 186 486)"><path class="silueta" d="' + silueta() + '"/>' +
      DEDOS.map(pliegues).join('') + anillo + pulsera +
      DEDOS.concat([PULGAR]).map(function (d) { return una(d, forma, tono); }).join('') + '</g></svg>';
  };
  window.FRIDA_MANO.FORMAS = FORMAS;
})();
