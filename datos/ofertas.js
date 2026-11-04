/* ============================================================
   FRIDA · Ofertas

   Este es el único archivo que hay que tocar para publicar una oferta.
   La web compara las fechas con el día de hoy (hora de Lloret) y decide sola:

     - Si hoy está entre "desde" y "hasta": la oferta sale como ACTIVA.
     - Si "desde" aún no ha llegado: sale como PRÓXIMA.
     - Si "hasta" ya pasó: desaparece y queda en el calendario del año.
     - Si no hay ninguna activa: la web dice claramente que hoy no hay ofertas.

   Para añadir una nueva, copia un bloque y cambia los datos.
   Fechas siempre en formato AAAA-MM-DD.
   ============================================================ */
window.FRIDA_OFERTAS = [
  {
    etiqueta: 'Black Friday',
    titulo: 'Manicura + limpieza de cutis',
    detalle: 'Manicura semipermanente con refuerzo y limpieza de cutis profunda.',
    precio: 48,
    desde: '2026-10-30',
    hasta: '2026-11-30'
  },
  {
    etiqueta: 'Black Friday',
    titulo: 'Pestañas + masaje o peeling',
    detalle: 'Pestaña pelo a pelo efecto natural o lifting de pestañas, más masaje de 40 minutos o peeling corporal.',
    precio: 40,
    desde: '2026-10-30',
    hasta: '2026-11-30'
  },

  /* ---- Ofertas ya terminadas: alimentan el calendario del año ---- */
  {
    etiqueta: 'Pies',
    titulo: 'Pedicura completa',
    detalle: 'Retirado de pies, desmaltado y pedicura completa.',
    precio: 15,
    desde: '2026-09-27',
    hasta: '2026-09-27',
    sinFin: true          // la publicación no indicaba fecha de fin
  },
  {
    etiqueta: 'Septiembre',
    titulo: 'Higiene facial profunda',
    detalle: 'Higiene facial profunda a precio de promoción.',
    precio: 30,
    desde: '2026-09-06',
    hasta: '2026-09-15'
  },
  {
    etiqueta: 'Septiembre',
    titulo: 'Semipermanente en manos y pies',
    detalle: 'Citas limitadas durante todo el mes.',
    precio: 35,
    desde: '2026-09-01',
    hasta: '2026-09-30'
  },
  {
    etiqueta: 'Solo una semana',
    titulo: 'Maderoterapia',
    detalle: 'Sesión de 40 minutos.',
    precio: 20,
    desde: '2026-08-17',
    hasta: '2026-08-23'
  },
  {
    etiqueta: 'Hasta el viernes',
    titulo: 'Peeling corporal',
    detalle: 'Con masaje e hidratación profunda.',
    precio: 25,
    desde: '2026-04-20',
    hasta: '2026-04-24'
  },
  {
    etiqueta: 'Marzo',
    titulo: 'Masaje drenante + presoterapia',
    detalle: 'Piernas, flancos y barriga, más una sesión de presoterapia.',
    precio: 20,
    desde: '2026-03-01',
    hasta: '2026-03-31'
  },
  {
    etiqueta: 'Enero',
    titulo: 'Masaje con chocolaterapia',
    detalle: 'Masaje de 30 minutos con chocolaterapia.',
    precio: 15,
    desde: '2026-01-26',
    hasta: '2026-01-31'
  }
];
