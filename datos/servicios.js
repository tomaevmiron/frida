/* ============================================================
   FRIDA · La gama de servicios

   Cada capítulo tiene su color de fondo ("tinte") y su lista.
   En cada servicio:
     - precio: texto que se muestra como precio. null = "A consultar".
     - promo:  referencia a la última promoción publicada (opcional).
     - specs:  datos cortos tipo ficha técnica. El asterisco * remite
               a la nota de "valores orientativos" al pie del capítulo.
   ============================================================ */
window.FRIDA_GAMA = [
  {
    id: 'micropigmentacion',
    num: '01',
    titulo: 'Micropigmentación',
    lema: 'Se despierta contigo.',
    tinte: '#4d3e4f',
    flor: 'flores.png',
    intro: 'Cejas, labios y ojos dibujados con pigmento y a medida de tu cara, para dejar de empezar cada mañana delante del espejo con un lápiz en la mano.',
    nota: true,
    servicios: [
      {
        id: 'cejas', nombre: 'Cejas', sub: 'Diseño pelo a pelo',
        texto: 'Trazos finos que siguen la dirección del vello para rellenar huecos o redibujar la forma entera.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '1–2 años*']], precio: null,
        detalle: 'Primero se dibuja y se aprueba la forma sobre tu piel. Solo cuando te ves bien se empieza a pigmentar. Los primeros días el color se ve más intenso y luego se asienta; por eso el retoque forma parte del tratamiento.'
      },
      {
        id: 'labios', nombre: 'Labios', sub: 'Contorno y color',
        texto: 'Devuelve definición y un tono uniforme, del nude más discreto a un color con presencia.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '2–3 años*']], precio: null,
        detalle: 'Se elige el tono contigo, según tu color natural y lo que buscas. Durante unos días los labios se notan más secos y el color se suaviza al curar.'
      },
      {
        id: 'ojos', nombre: 'Ojos', sub: 'Eyeliner permanente',
        texto: 'Una línea que no se corre con el agua ni desaparece a media tarde, tan fina o marcada como quieras.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '2–3 años*']], precio: null,
        detalle: 'Puede ir desde un refuerzo apenas visible entre las pestañas hasta un eyeliner con rabillo. Es la técnica que más tiempo te ahorra por las mañanas.'
      },
      {
        id: 'paramedica', nombre: 'Paramédica y oncológica', sub: 'Areola y camuflaje',
        texto: 'Micropigmentación reparadora para recuperar lo que un tratamiento o una cirugía se llevó. Se habla en privado y sin prisa.',
        specs: [['Sesiones', 'Se valora'], ['Dura', 'Se valora']], precio: null,
        detalle: 'Cada caso es distinto y se valora antes de empezar. Si estás en tratamiento, consulta también con tu equipo médico para elegir el mejor momento.'
      }
    ]
  },
  {
    id: 'mirada',
    num: '02',
    titulo: 'Mirada',
    lema: 'Pestañas que parecen tuyas.',
    tinte: '#3d3a50',
    flor: 'hojas-lila.png',
    intro: 'Pelo a pelo o lifting, con un resultado que se nota sin que nadie sepa exactamente por qué. Las fotos de esta página son de aquí.',
    nota: true,
    servicios: [
      {
        id: 'pestanas', nombre: 'Pestañas pelo a pelo', sub: 'Efecto natural',
        texto: 'Extensiones colocadas una a una sobre tu propia pestaña, con la curva y la densidad que pidas.',
        specs: [['Mantenimiento', 'Cada 3–4 semanas*'], ['Resultado', 'Inmediato']], precio: null,
        promo: 'En oferta ahora, con masaje o peeling',
        detalle: 'Se pueden dejar muy naturales o con más volumen. Durante las primeras 24 horas conviene no mojarlas, y luego basta con cuidarlas sin aceites.'
      },
      {
        id: 'lifting', nombre: 'Lifting de pestañas', sub: 'Tu pestaña, más arriba',
        texto: 'Eleva y curva tu pestaña desde la raíz. Sin extensiones y sin mantenimiento diario.',
        specs: [['Mantenimiento', 'Cada 6–8 semanas*'], ['Resultado', 'Inmediato']], precio: null,
        promo: 'En oferta ahora, con masaje o peeling',
        detalle: 'Es la opción si quieres abrir la mirada sin llevar nada añadido. La pestaña crece y cae con su ciclo natural, así que el efecto desaparece poco a poco.'
      }
    ]
  },
  {
    id: 'laser',
    num: '03',
    titulo: 'Láser',
    lema: 'Todos cometemos errores.',
    tinte: '#44465c',
    flor: 'ramita-oro.png',
    intro: 'Un tatuaje del que te arrepientes, una mancha que no se va o el vello de siempre. El láser lo trabaja por sesiones, a tu ritmo y con precios claros.',
    nota: true,
    extra: 'tatuajes',
    servicios: [
      {
        id: 'tatuajes', nombre: 'Eliminación de tatuajes', sub: 'Por tamaño, de XS a XL',
        texto: 'El láser fragmenta la tinta y el cuerpo la elimina poco a poco, sesión a sesión.',
        specs: [['Sesiones', '6–10*'], ['Separación', '6–8 semanas*']], precio: 'Desde 39 €/sesión',
        detalle: 'El número de sesiones depende de los colores, la profundidad de la tinta y la zona. Se confirma en la primera valoración.'
      },
      {
        id: 'depilacion-laser', nombre: 'Depilación láser', sub: 'Diodo de alta potencia',
        texto: 'Reduce el vello zona a zona, para olvidarte de la cera y de la cuchilla.',
        specs: [['Sesiones', '6–8*'], ['Zonas', 'Todo el cuerpo']], precio: null,
        detalle: 'Las sesiones se espacian según la zona y el ciclo del vello. Antes de empezar se valora tu tipo de piel y de vello.'
      },
      {
        id: 'manchas', nombre: 'Manchas', sub: 'Despigmentante láser',
        texto: 'Actúa sobre el pigmento de las manchas para ir igualando el tono de la piel.',
        specs: [['Sesiones', '3–5*'], ['Zonas', 'Cara y cuerpo']], precio: null,
        detalle: 'Después del tratamiento, la protección solar es imprescindible. El resultado depende del tipo de mancha, por eso se mira antes de empezar.'
      },
      {
        id: 'carbon-peel', nombre: 'Carbon Peel', sub: 'Carbón activo y láser',
        texto: 'Limpia en profundidad, afina el poro y ayuda a controlar la piel grasa.',
        specs: [['Sesiones', '3–5*'], ['Vuelta a la rutina', 'El mismo día']], precio: null,
        detalle: 'Se aplica una capa de carbón sobre la piel y el láser la retira. Es un tratamiento específico para pieles con tendencia seborreica o sin luminosidad.'
      }
    ]
  },
  {
    id: 'unas',
    num: '04',
    titulo: 'Uñas',
    lema: 'Pequeños lienzos.',
    tinte: '#6b4d55',
    flor: 'hoja-amarilla.png',
    intro: 'Semipermanente, gel o acrílico, en manos y en pies. Elige tono y forma aquí mismo, y llega a la cita sabiendo lo que quieres.',
    extra: 'unas',
    servicios: [
      {
        id: 'semi-manos', nombre: 'Manicura semipermanente', sub: 'Con refuerzo',
        texto: 'Color que aguanta semanas y una base reforzada para que la uña natural no sufra.',
        specs: [['Zona', 'Manos']], precio: null,
        promo: 'En oferta ahora, con limpieza de cutis',
        detalle: 'Incluye preparación de la uña, refuerzo y esmaltado semipermanente.'
      },
      {
        id: 'semi-manos-pies', nombre: 'Semipermanente manos y pies', sub: 'Todo a la vez',
        texto: 'Manos y pies a juego en una sola visita.',
        specs: [['Zona', 'Manos y pies']], precio: null,
        promo: 'Última promo: 35 € en septiembre',
        detalle: 'Pide el mismo tono para las dos o combina colores: un clásico para las manos y otro más atrevido para los pies.'
      },
      {
        id: 'acrilico-gel', nombre: 'Uñas de acrílico o gel', sub: 'Largo y forma a tu gusto',
        texto: 'Para quien quiere más largo, otra forma o una base resistente para la decoración.',
        specs: [['Zona', 'Manos']], precio: '35 €',
        detalle: 'Almendra, cuadrada, con decoración o sin ella. Cuéntanos qué te gusta o lleva una foto.'
      },
      {
        id: 'pedicura', nombre: 'Pedicura completa', sub: 'Retirado, desmaltado y pedicura',
        texto: 'Pies bonitos, suaves y perfectos.',
        specs: [['Zona', 'Pies']], precio: null,
        promo: 'Última promo: 15 €',
        detalle: 'Incluye retirado de pies y desmaltado, además de la pedicura completa.'
      }
    ]
  },
  {
    id: 'faciales',
    num: '05',
    titulo: 'Faciales',
    lema: 'La piel, primero.',
    tinte: '#5b4a5e',
    flor: 'bayas.png',
    intro: 'Tratamientos para limpiar y devolver luz a la piel, sin agresividad y con una rutina que puedas mantener en casa.',
    servicios: [
      {
        id: 'limpieza-cutis', nombre: 'Limpieza de cutis profunda', sub: 'El básico que siempre funciona',
        texto: 'Limpia, extrae impurezas e hidrata. La piel sale respirando.',
        specs: [['Frecuencia', 'Cada 4–6 semanas*']], precio: null,
        promo: 'En oferta ahora, con manicura',
        detalle: 'Se adapta a tu tipo de piel. Recomendable como punto de partida antes de otros tratamientos.'
      },
      {
        id: 'higiene-facial', nombre: 'Higiene facial profunda', sub: 'Limpieza y mascarilla',
        texto: 'Una puesta a punto completa de la piel, para ese rostro cansado o apagado.',
        specs: [['Frecuencia', 'Cada 4–6 semanas*']], precio: null,
        promo: 'Última promo: 30 € en septiembre',
        detalle: 'Limpieza, tratamiento y mascarilla según lo que necesite tu piel ese día.'
      },
      {
        id: 'carbon-peel-facial', nombre: 'Carbon Peel y manchas', sub: 'Con láser',
        texto: 'Si buscas ir más allá de la limpieza, el láser trabaja el poro, la grasa y las manchas.',
        specs: [['Sesiones', '3–5*']], precio: null,
        enlace: '#laser',
        detalle: 'Los tienes explicados en el capítulo de láser. Te orientamos en la cita sobre cuál encaja mejor con tu piel.'
      }
    ],
    nota: true
  },
  {
    id: 'masajes',
    num: '06',
    titulo: 'Masajes',
    lema: 'Un rato sin teléfono.',
    tinte: '#5e4a4a',
    flor: 'flores.png',
    intro: 'Manos que saben lo que hacen y un rato en el que nadie te pide nada. Para soltar tensión, para las piernas cansadas o simplemente porque te apetece.',
    servicios: [
      {
        id: 'masaje', nombre: 'Masaje corporal', sub: '30 o 40 minutos',
        texto: 'Para descargar espalda, cuello y todo lo que se acumula durante la semana.',
        specs: [['Duración', '30 o 40 min']], precio: null,
        promo: 'En oferta ahora, con pestañas',
        detalle: 'Cuéntanos dónde lo necesitas y con qué intensidad te gusta.'
      },
      {
        id: 'drenante', nombre: 'Masaje drenante', sub: 'Piernas, flancos y barriga',
        texto: 'Maniobras suaves para aligerar la sensación de pesadez y de hinchazón.',
        specs: [['Zona', 'Piernas, flancos y barriga']], precio: null,
        promo: 'Última promo: 20 € con presoterapia',
        detalle: 'Combina muy bien con una sesión de presoterapia.'
      },
      {
        id: 'chocolaterapia', nombre: 'Chocolaterapia', sub: 'Masaje de 30 minutos',
        texto: 'Masaje con chocolate, que deja la piel suave y huele como debería oler una tarde libre.',
        specs: [['Duración', '30 min']], precio: null,
        promo: 'Última promo: 15 € en enero',
        detalle: 'Un capricho que también funciona muy bien como regalo.'
      }
    ]
  },
  {
    id: 'corporales',
    num: '07',
    titulo: 'Corporales',
    lema: 'Moldear sin prisa.',
    tinte: '#574c43',
    flor: 'ramita-oro.png',
    intro: 'Madera, presión y exfoliación. Tratamientos para trabajar el contorno, la textura de la piel y esa sensación de piernas ligeras.',
    servicios: [
      {
        id: 'maderoterapia', nombre: 'Maderoterapia', sub: 'Sesión de 40 minutos',
        texto: 'Masaje con útiles de madera para trabajar celulitis y contorno, con una relajación profunda de regalo.',
        specs: [['Duración', '40 min']], precio: null,
        promo: 'Última promo: 20 € en agosto',
        detalle: 'Suele trabajarse en varias sesiones. Te orientamos sobre cuántas según lo que busques.'
      },
      {
        id: 'presoterapia', nombre: 'Presoterapia', sub: 'Presión por aire',
        texto: 'Botas de presión que favorecen la circulación y dejan las piernas mucho más ligeras.',
        specs: [['Zona', 'Piernas y abdomen']], precio: null,
        promo: 'Última promo: 20 € con drenante',
        detalle: 'Te tumbas y el equipo hace el trabajo. Ideal después de días de mucho estar de pie.'
      },
      {
        id: 'peeling', nombre: 'Peeling corporal', sub: 'Con masaje e hidratación',
        texto: 'Exfolia, masajea e hidrata en profundidad. La piel sale como nueva.',
        specs: [['Incluye', 'Masaje e hidratación']], precio: null,
        promo: 'En oferta ahora, con pestañas',
        detalle: 'Perfecto antes del verano o después de las vacaciones, para alargar el bronceado.'
      },
      {
        id: 'depilacion', nombre: 'Depilación', sub: 'El método de siempre',
        texto: 'Para quien todavía no se pasa al láser, o para esa zona que prefieres seguir haciéndote así.',
        specs: [['Zonas', 'Todo el cuerpo']], precio: null,
        detalle: 'Pregúntanos por las zonas que necesitas.'
      }
    ]
  },
  {
    id: 'capilar',
    num: '08',
    titulo: 'Capilar',
    lema: 'Densidad, punto a punto.',
    tinte: '#49424c',
    flor: 'hojas-lila.png',
    intro: 'Dos caminos para el pelo que clarea: uno lo disimula con pigmento y otro trabaja el cuero cabelludo. Te ayudamos a elegir el tuyo.',
    nota: true,
    servicios: [
      {
        id: 'tricopigmentacion', nombre: 'Tricopigmentación', sub: 'Micropigmentación capilar',
        texto: 'Micropuntos de pigmento que simulan densidad en entradas, coronilla o raya, para disimular los efectos de la alopecia.',
        specs: [['Sesiones', 'Según la zona'], ['Dura', '2–4 años*']], precio: null,
        detalle: 'Se dibuja la línea y la densidad contigo antes de empezar. Funciona tanto en hombres como en mujeres.'
      },
      {
        id: 'mesoterapia-capilar', nombre: 'Mesoterapia capilar', sub: 'Cuero cabelludo',
        texto: 'Tratamiento que aporta nutrientes directamente al cuero cabelludo para mejorar el aspecto del cabello.',
        specs: [['Sesiones', 'Pauta a medida']], precio: null,
        detalle: 'La pauta se decide según tu caso. Mira el ejemplo en la sección de antes y después.'
      }
    ]
  }
];

/* Galería de resultados: fotos reales del salón. */
window.FRIDA_FOTOS = [
  { src: 'pestanas-perfil.jpg', w: 1700, h: 1240, tipo: 'pestanas', t: 'Pestañas', d: 'Pelo a pelo, con volumen' },
  { src: 'cejas.jpg', w: 1300, h: 1387, tipo: 'cejas', t: 'Cejas', d: 'Micropigmentación, recién terminada' },
  { src: 'pestanas-verde.jpg', w: 1700, h: 869, tipo: 'pestanas', t: 'Pestañas', d: 'Curva abierta hacia el rabillo' },
  { src: 'eyeliner.jpg', w: 1700, h: 944, tipo: 'ojos', t: 'Eyeliner', d: 'Micropigmentación, recién terminada' },
  { src: 'pestanas-azul.jpg', w: 1700, h: 907, tipo: 'pestanas', t: 'Pestañas', d: 'Macro sobre ojo azul' },
  { src: 'pestanas-densas.jpg', w: 1700, h: 1058, tipo: 'pestanas', t: 'Pestañas', d: 'Efecto denso' },
  { src: 'pestanas-natural.jpg', w: 1700, h: 1257, tipo: 'pestanas', t: 'Pestañas', d: 'Efecto natural' },
  { src: 'mirada-completa.jpg', w: 1700, h: 850, tipo: 'pestanas', t: 'Mirada completa', d: 'Resultado natural' }
];

/* Antes y después.
   Puede ser un par de archivos { antes:'x.jpg', despues:'y.jpg' }
   o dos recortes de una misma imagen, como este. */
window.FRIDA_ANTES_DESPUES = [
  {
    titulo: 'Mesoterapia capilar',
    texto: 'Publicado por Frida en su Instagram, en mayo de 2026.',
    imagen: 'mesoterapia-capilar.webp', ancho: 1080, alto: 1080,
    recorteAntes: { x: 27, y: 705, w: 300, h: 350 },
    recorteDespues: { x: 744, y: 705, w: 300, h: 350 }
  }
];

/* Destacadas de Instagram (enlazan a su perfil) */
window.FRIDA_DESTACADAS = [
  { img: 'hl3.jpg', t: 'Láser tattoo' },
  { img: 'hl4.jpg', t: 'Manchas' },
  { img: 'hl7.jpg', t: 'Tricopigmentación' },
  { img: 'hl6.jpg', t: 'Uñas' },
  { img: 'hl5.jpg', t: 'Pestañas' },
  { img: 'hl1.jpg', t: 'Carbon Peel' },
  { img: 'hl2.jpg', t: 'Depilación láser' }
];

/* Reseñas reales de Google */
window.FRIDA_RESENAS = [
  { q: 'Tanto Silvana como Eva son personas excepcionales. Lugar muy cercano y profesional. Recomendado 100%.', a: 'Jessica Z.' },
  { q: 'Llevo 6 meses haciendo distintos tratamientos: masajes, depilación, depilación láser, tratamientos de belleza facial y uñas. Estoy muy contenta con el trato y la atención recibida.', a: 'Yolanda P.' },
  { q: 'Un encanto de chicas, te hacen sentir súper cómoda y hacen un trabajo genial.', a: 'Reseña en Google' },
  { q: 'He salido encantada con mis uñas. Silvana, mil gracias por haberme hecho sentir tan bien y a gusto. Profesionales como la copa de un pino.', a: 'Vanessa L.' },
  { q: 'He regalado en Navidades tratamientos a familiares y amigos, y han salido encantados. Muy recomendable.', a: 'Yolanda P.' }
];
