/* ============================================================
   FRIDA · La gama de servicios

   Cada capítulo tiene su color de fondo ("tinte") y su lista.
   En cada servicio:
     - id:     identificador. Las ofertas de ofertas.js lo usan en "servicios"
               para mostrar solas "En oferta ahora" o "Última promo".
     - precio: texto que se muestra como precio. null = "A consultar".
     - specs:  datos cortos tipo ficha técnica. El asterisco * remite a la
               nota del pie del capítulo (nota: true).
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
        id: 'cejas', nombre: 'Cejas', sub: 'Microblading o Magic Shading',
        texto: 'Pelo a pelo para un acabado natural, o sombreado para una ceja más definida. Sirve incluso para reconstruir una ceja desde cero.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '1–2 años*']], precio: null,
        detalle: 'Primero se dibuja y se aprueba la forma sobre tu piel. Solo cuando te ves bien se empieza a pigmentar. Los primeros días el color se ve más intenso y luego se asienta; por eso el retoque forma parte del tratamiento.'
      },
      {
        id: 'labios', nombre: 'Labios', sub: 'Aquarelle lips y perfilado',
        texto: 'Color y contorno, con acabado brillante o satinado. También corrige perfiles desdibujados y labios poco simétricos.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '2–3 años*']], precio: null,
        detalle: 'Se elige el tono contigo, según tu color natural y lo que buscas. Durante unos días los labios se notan más secos y el color se suaviza al curar.'
      },
      {
        id: 'ojos', nombre: 'Ojos', sub: 'Eyeliner y Soft Liner',
        texto: 'Una línea que no se corre con el agua ni desaparece a media tarde, tan fina o marcada como quieras.',
        specs: [['Sesiones', '1 + retoque'], ['Dura', '2–3 años*']], precio: null,
        detalle: 'Puede ir desde un refuerzo apenas visible entre las pestañas hasta un eyeliner con rabillo. Es la técnica que más tiempo te ahorra por las mañanas.'
      },
      {
        id: 'paramedica', nombre: 'Paramédica y oncológica', sub: 'Areola, cicatrices y camuflaje',
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
    lema: 'Las pestañas son el marco.',
    tinte: '#3d3a50',
    flor: 'hojas-lila.png',
    intro: 'Pelo a pelo en distintos volúmenes y formas, o en tu propia pestaña con un lifting. Las fotos de esta página son de aquí.',
    nota: true,
    servicios: [
      {
        id: 'pestanas', nombre: 'Pestañas pelo a pelo', sub: 'Natural, 2D, 3D o volumen ruso',
        texto: 'Extensiones colocadas una a una sobre tu propia pestaña, con la curva y la densidad que pidas.',
        specs: [['Acabados', 'Babydoll o Eyecat'], ['Relleno', 'Cada 3 semanas']], precio: 'Volumen ruso, 60 €*',
        detalle: 'Se pueden dejar muy naturales o con más volumen. Durante las primeras 24 horas conviene no mojarlas, y luego basta con cuidarlas sin aceites.'
      },
      {
        id: 'lifting', nombre: 'Lifting de pestañas', sub: 'Tu pestaña, más arriba',
        texto: 'Eleva y curva tu pestaña desde la raíz. Sin extensiones y sin mantenimiento diario.',
        specs: [['Repetir', 'Cada 6–8 semanas*'], ['Resultado', 'Inmediato']], precio: '40 €*',
        detalle: 'Es la opción si quieres abrir la mirada sin llevar nada añadido. La pestaña crece y cae con su ciclo natural, así que el efecto desaparece poco a poco.'
      },
      {
        id: 'cejas-diseno', nombre: 'Diseño y laminado de cejas', sub: 'Sin pigmento',
        texto: 'Depilación, forma y laminado para ordenar la ceja y darle presencia.',
        specs: [['Asesoramiento', 'Sin compromiso']], precio: null,
        detalle: 'Si dudas entre laminar o micropigmentar, te orientan según tu ceja y lo que buscas.'
      },
      {
        id: 'presoterapia-ocular', nombre: 'Presoterapia ocular', sub: 'Contorno de ojos',
        texto: 'Hidrata y tonifica toda la zona periocular para mejorar el aspecto de la mirada.',
        specs: [['Zona', 'Contorno de ojos']], precio: null,
        detalle: 'Un tratamiento suave y cómodo, pensado para una mirada descansada.'
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
        specs: [['Valoración', 'Gratuita'], ['Sesiones', '6–10*']], precio: 'Desde 39 €/sesión*',
        detalle: 'El número de sesiones depende de los colores, la profundidad de la tinta y la zona. Se confirma en la cita informativa, que es gratuita. Entre sesiones suelen pasar de 6 a 8 semanas.'
      },
      {
        id: 'retirar-micro', nombre: 'Retirar una micropigmentación', sub: 'Cejas antiguas o que han virado',
        texto: 'Si tu antiguo tatuaje de cejas se ha quedado oscuro o ha cambiado de color, se puede aclarar o eliminar.',
        specs: [['Valoración', 'Gratuita'], ['Sesiones', 'Según el pigmento']], precio: null,
        detalle: 'Las sesiones dependen del color, del pigmento y de las capas que tenga. Una vez aclarada, se puede hacer un diseño nuevo.'
      },
      {
        id: 'depilacion-laser', nombre: 'Depilación láser', sub: 'Diodo de alta potencia',
        texto: 'Reduce el vello zona a zona, para olvidarte de la cera y de la cuchilla.',
        specs: [['Sesiones', '6–8*'], ['Packs', 'De zonas, a tu medida']], precio: null,
        detalle: 'Las sesiones se espacian según la zona y el ciclo del vello. Antes de empezar se valora tu tipo de piel y de vello.'
      },
      {
        id: 'manchas', nombre: 'Manchas', sub: 'Despigmentante láser Nd:Yag',
        texto: 'Actúa sobre el pigmento de las manchas para ir igualando el tono de la piel.',
        specs: [['Valoración', 'Gratuita'], ['Sesiones', '3–5*']], precio: null,
        detalle: 'Después del tratamiento, la protección solar es imprescindible. El resultado depende del tipo de mancha, por eso se mira antes de empezar.'
      },
      {
        id: 'carbon-peel', nombre: 'Carbon Peel', sub: 'Peeling Hollywood con carbón activo',
        texto: 'Limpia en profundidad, cierra el poro y aporta luminosidad. Muy usado en pieles con acné o con tendencia grasa.',
        specs: [['Sesiones', '3–5*'], ['Vuelta a la rutina', 'El mismo día']], precio: null,
        detalle: 'Se aplica una capa de carbón sobre la piel y el láser la retira. Es un tratamiento específico para pieles con tendencia seborreica o sin luminosidad.'
      },
      {
        id: 'fotorrejuvenecimiento', nombre: 'Fotorrejuvenecimiento', sub: 'Láser facial',
        texto: 'Sesiones de láser para mejorar el aspecto y la textura de la piel del rostro.',
        specs: [['Zona', 'Rostro']], precio: null,
        detalle: 'Te orientan sobre cuántas sesiones tiene sentido hacer según tu piel.'
      },
      {
        id: 'hongos', nombre: 'Hongos en las uñas', sub: 'Onicomicosis con láser Nd:Yag',
        texto: 'Un tratamiento láser rápido e indoloro para los hongos que no se van con otros remedios.',
        specs: [['Consulta', 'Gratuita'], ['Seguimiento', 'Por meses']], precio: null,
        detalle: 'La uña tarda en crecer, así que el resultado se ve con el paso de los meses. En la sección de antes y después hay un caso a los dos meses.'
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
    nota: true,
    intro: 'Semipermanente, gel, acrílico o soft gel, en manos y en pies. Elige tono y forma aquí mismo, y llega a la cita sabiendo lo que quieres.',
    extra: 'unas',
    servicios: [
      {
        id: 'semi-manos', nombre: 'Manicura semipermanente', sub: 'Con refuerzo y cutículas',
        texto: 'Color que aguanta semanas y una base reforzada para que la uña natural no sufra.',
        specs: [['Zona', 'Manos'], ['Productos', 'Homologados CE']], precio: null,
        detalle: 'Incluye preparación de la uña, tratamiento de cutículas y esmaltado semipermanente. También hay esmaltes térmicos, que cambian de color con el frío o el calor.'
      },
      {
        id: 'semi-manos-pies', nombre: 'Semipermanente manos y pies', sub: 'Todo a la vez',
        texto: 'Manos y pies a juego en una sola visita.',
        specs: [['Zona', 'Manos y pies']], precio: null,
        detalle: 'Pide el mismo tono para las dos o combina colores: un clásico para las manos y otro más atrevido para los pies.'
      },
      {
        id: 'acrilico-gel', nombre: 'Acrílico, gel o soft gel', sub: 'Largo y forma a tu gusto',
        texto: 'Para quien quiere más largo, otra forma o una base resistente para la decoración.',
        specs: [['Zona', 'Manos'], ['Relleno', '25 €*']], precio: '35 €*',
        detalle: 'Almendra, cuadrada, con decoración o sin ella. Cuéntales qué te gusta o lleva una foto.'
      },
      {
        id: 'reconstruccion', nombre: 'Reconstrucción de uñas mordidas', sub: 'En acrílico',
        texto: 'Devuelve forma y largo a las uñas mordidas. Mira el caso real en la sección de antes y después.',
        specs: [['Zona', 'Manos']], precio: null,
        detalle: 'Se valora el estado de la uña y se reconstruye con acrílico hasta conseguir una forma natural.'
      },
      {
        id: 'pedicura', nombre: 'Pedicura completa', sub: 'Retirado, desmaltado y pedicura',
        texto: 'Pies bonitos, suaves y perfectos. También en versión spa, para mimarlos en invierno.',
        specs: [['Zona', 'Pies']], precio: null,
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
        specs: [['Frecuencia', 'Mínimo 2 veces al año']], precio: null,
        detalle: 'Una antes del verano, para preparar la piel para el sol, y otra al terminarlo. Se adapta a tu tipo de piel.'
      },
      {
        id: 'higiene-facial', nombre: 'Higiene facial profunda', sub: 'Limpieza y mascarilla',
        texto: 'Una puesta a punto completa de la piel, para ese rostro cansado o apagado.',
        specs: [['Frecuencia', 'Mínimo 2 veces al año']], precio: null,
        detalle: 'Limpieza, tratamiento y mascarilla según lo que necesite tu piel ese día.'
      },
      {
        id: 'oroterapia', nombre: 'Oroterapia facial', sub: 'Con láminas de oro',
        texto: 'Limpieza de cutis profunda con peeling ultrasónico y una mascarilla de láminas de oro.',
        specs: [['Incluye', 'Peeling ultrasónico']], precio: null,
        detalle: 'El facial más especial de la carta, para una ocasión o simplemente para darte un capricho.'
      },
      {
        id: 'carbon-peel-facial', nombre: 'Carbon Peel y manchas', sub: 'Con láser',
        texto: 'Si buscas ir más allá de la limpieza, el láser trabaja el poro, la grasa y las manchas.',
        specs: [['Valoración', 'Gratuita']], precio: null,
        enlace: '#laser',
        detalle: 'Los tienes explicados en el capítulo de láser. Te orientan en la cita sobre cuál encaja mejor con tu piel.'
      }
    ]
  },
  {
    id: 'masajes',
    num: '06',
    titulo: 'Masajes',
    lema: 'Un rato sin teléfono.',
    tinte: '#5e4a4a',
    flor: 'flores.png',
    nota: true,
    intro: 'Manos que saben lo que hacen y un rato en el que nadie te pide nada. Para soltar tensión, para las piernas cansadas o simplemente porque te apetece.',
    servicios: [
      {
        id: 'masaje', nombre: 'Masaje relajante', sub: 'De 30 minutos a 1 hora',
        texto: 'Para desconectar de todo y reconectar contigo.',
        specs: [['Duración', '30, 40 o 60 min']], precio: 'Desde 20 €*',
        detalle: 'Cuéntales dónde lo necesitas y con qué intensidad te gusta.'
      },
      {
        id: 'descontracturante', nombre: 'Masaje descontracturante', sub: 'Espalda y cuello',
        texto: 'Más profundo, para esa tensión que se ha quedado a vivir en la espalda.',
        specs: [['Zona', 'Según necesidad']], precio: null,
        detalle: 'Se adapta la presión a lo que aguantas y a lo que necesitas.'
      },
      {
        id: 'drenante', nombre: 'Masaje drenante', sub: 'Piernas, flancos y barriga',
        texto: 'Maniobras suaves para aligerar la sensación de pesadez y de hinchazón.',
        specs: [['Zona', 'Piernas, flancos y barriga']], precio: null,
        detalle: 'Combina muy bien con una sesión de presoterapia.'
      },
      {
        id: 'remodelante', nombre: 'Masaje remodelante', sub: 'Acompaña a tu dieta',
        texto: 'Un empujón extra si estás cuidando tu alimentación y quieres trabajar el contorno.',
        specs: [['Combina con', 'Electroestimulación']], precio: null,
        detalle: 'Suele trabajarse en varias sesiones, junto con otros tratamientos corporales.'
      },
      {
        id: 'chocolaterapia', nombre: 'Chocolaterapia', sub: 'Masaje de 30 minutos',
        texto: 'Masaje con chocolate, que deja la piel suave y huele como debería oler una tarde libre.',
        specs: [['Duración', '30 min']], precio: null,
        detalle: 'Un capricho que también funciona muy bien como regalo.'
      },
      {
        id: 'ritual', nombre: 'Ritual de belleza con masaje', sub: 'Para regalar o regalarte',
        texto: 'Facial y masaje en una misma visita, pensado para salir como nueva.',
        specs: [['Incluye', 'Masaje']], precio: null,
        detalle: 'Pregunta qué incluye ahora mismo y si se puede preparar como tarjeta regalo.'
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
    intro: 'Radiofrecuencia, madera, presión y exfoliación. Tratamientos para trabajar el contorno, la textura de la piel y esa sensación de piernas ligeras.',
    servicios: [
      {
        id: 'indiba', nombre: 'INDIBA', sub: 'Estética y fisioterapia',
        texto: 'En estética se usa para mejorar flacidez, arrugas y celulitis. También se aplica en fisioterapia.',
        specs: [['Zona', 'Rostro y cuerpo']], precio: null,
        detalle: 'Pregunta por sus aplicaciones y te explicarán si encaja con lo que buscas.'
      },
      {
        id: 'maderoterapia', nombre: 'Maderoterapia', sub: 'Sesión de 40 minutos',
        texto: 'Masaje con útiles de madera para trabajar celulitis y contorno, con una relajación profunda de regalo.',
        specs: [['Duración', '40 min']], precio: null,
        detalle: 'Suele trabajarse en varias sesiones. Te orientan sobre cuántas según lo que busques.'
      },
      {
        id: 'presoterapia', nombre: 'Presoterapia', sub: 'Presión por aire',
        texto: 'Botas de presión que favorecen la circulación y dejan las piernas mucho más ligeras.',
        specs: [['Zona', 'Piernas y abdomen']], precio: null,
        detalle: 'Te tumbas y el equipo hace el trabajo. Ideal después de días de mucho estar de pie.'
      },
      {
        id: 'electroestimulacion', nombre: 'Electroestimulación', sub: 'Impulsos eléctricos',
        texto: 'Tratamiento no invasivo que hace trabajar a tus músculos. Un buen complemento si estás cuidando tu forma física.',
        specs: [['Combina con', 'Masaje remodelante']], precio: null,
        detalle: 'Se suele plantear por packs de sesiones. Pregunta por el que tengan disponible.'
      },
      {
        id: 'peeling', nombre: 'Peeling corporal', sub: 'Con masaje e hidratación',
        texto: 'Exfolia, masajea e hidrata en profundidad. La piel sale como nueva.',
        specs: [['Incluye', 'Masaje e hidratación']], precio: null,
        detalle: 'Perfecto antes del verano o después de las vacaciones, para alargar el bronceado.'
      },
      {
        id: 'depilacion', nombre: 'Depilación con cera', sub: 'El método de siempre',
        texto: '¿Más de láser o de cera? Aquí tienes las dos.',
        specs: [['Zonas', 'Todo el cuerpo']], precio: null,
        detalle: 'Pregunta por las zonas que necesitas.'
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
    intro: 'Dos caminos para el pelo que clarea: uno lo disimula con pigmento y otro trabaja el cuero cabelludo. Sin quirófano y haciendo vida normal desde el primer minuto.',
    nota: true,
    extra: 'capilar',
    servicios: [
      {
        id: 'tricopigmentacion', nombre: 'Tricopigmentación', sub: 'Micropigmentación capilar',
        texto: 'Micropuntos de pigmento que simulan densidad en entradas, coronilla o raya. También como apoyo a un trasplante.',
        specs: [['Sesiones', 'Según la zona'], ['Dura', '2–4 años*']], precio: null,
        detalle: 'Se dibuja la línea y la densidad contigo antes de empezar. Funciona tanto en hombres como en mujeres. Pregunta si puedes hacer una prueba antes de decidirte.'
      },
      {
        id: 'mesoterapia-capilar', nombre: 'Mesoterapia capilar', sub: 'Cuero cabelludo',
        texto: 'Tratamiento para la caída abundante, las entradas y la coronilla, que actúa directamente sobre el cuero cabelludo.',
        specs: [['Sesiones', 'Pauta a medida']], precio: null,
        detalle: 'La pauta se decide según tu caso, después de valorarlo.'
      }
    ]
  }
];

/* Galería de resultados: fotos reales publicadas por el salón. */
window.FRIDA_FOTOS = [
  { src: 'labios-rosa.jpg', w: 1045, h: 480, tipo: 'labios', t: 'Labios', d: 'Kamila Guseynova para Frida' },
  { src: 'pestanas-perfil.jpg', w: 1700, h: 1240, tipo: 'pestanas', t: 'Pestañas', d: 'Pelo a pelo, con volumen' },
  { src: 'cejas-magic.jpg', w: 810, h: 739, tipo: 'cejas', t: 'Cejas Magic Shading', d: 'Kamila Guseynova para Frida' },
  { src: 'unas-francesa.jpg', w: 1044, h: 1044, tipo: 'unas', t: 'Uñas', d: 'Reconstrucción en acrílico' },
  { src: 'labios-aquarelle.jpg', w: 1080, h: 570, tipo: 'labios', t: 'Aquarelle lips', d: 'Kamila Guseynova para Frida' },
  { src: 'eyeliner-soft.jpg', w: 1080, h: 510, tipo: 'ojos', t: 'Eyeliner Soft Liner', d: 'Kamila Guseynova para Frida' },
  { src: 'unas-rojas.jpg', w: 1080, h: 985, tipo: 'unas', t: 'Uñas', d: 'Semipermanente con decoración' },
  { src: 'pestanas-verde.jpg', w: 1700, h: 869, tipo: 'pestanas', t: 'Pestañas', d: 'Curva abierta hacia el rabillo' },
  { src: 'unas-negras.jpg', w: 1080, h: 725, tipo: 'unas', t: 'Uñas', d: 'Diseño a mano' },
  { src: 'labios-rojo.jpg', w: 1000, h: 570, tipo: 'labios', t: 'Labios', d: 'Recién terminados. Kamila Guseynova para Frida' },
  { src: 'pestanas-azul.jpg', w: 1700, h: 907, tipo: 'pestanas', t: 'Pestañas', d: 'Macro sobre ojo azul' },
  { src: 'unas-oro.jpg', w: 1000, h: 870, tipo: 'unas', t: 'Uñas', d: 'Con decoración en oro' },
  { src: 'pestanas-natural.jpg', w: 1700, h: 1257, tipo: 'pestanas', t: 'Pestañas', d: 'Efecto natural' },
  { src: 'pestanas-densas.jpg', w: 1700, h: 1058, tipo: 'pestanas', t: 'Pestañas', d: 'Efecto denso' },
  { src: 'mirada-completa.jpg', w: 1700, h: 850, tipo: 'pestanas', t: 'Mirada completa', d: 'Resultado natural' }
];

/* Antes y después. Cada par son dos fotos del mismo tamaño. ar = [ancho, alto] */
window.FRIDA_ANTES_DESPUES = [
  { titulo: 'Uñas mordidas', texto: 'Reconstrucción en acrílico sobre uñas mordidas.', antes: 'ad/unas-antes.jpg', despues: 'ad/unas-despues.jpg', ar: [1000, 1000] },
  { titulo: 'Labios', texto: 'Micropigmentación de labios con reconstrucción del perfil.', antes: 'ad/labios-antes.jpg', despues: 'ad/labios-despues.jpg', ar: [1000, 443] },
  { titulo: 'Cejas', texto: 'Microblading: relleno de ceja pelo a pelo.', antes: 'ad/cejas-antes.jpg', despues: 'ad/cejas-despues.jpg', ar: [1000, 415] },
  { titulo: 'Capilar', texto: 'Micropigmentación capilar. Dos sesiones para este cambio de imagen.', antes: 'ad/capilar-antes.jpg', despues: 'ad/capilar-despues.jpg', ar: [860, 984] },
  { titulo: 'Lifting', texto: 'Lifting de pestañas, sobre la pestaña natural.', antes: 'ad/lifting-antes.jpg', despues: 'ad/lifting-despues.jpg', ar: [900, 317] },
  { titulo: 'Retirar cejas', texto: 'Eliminación con láser de una micropigmentación de cejas antigua.', antes: 'ad/retirar-antes.jpg', despues: 'ad/retirar-despues.jpg', ar: [1000, 341] },
  { titulo: 'Manchas', texto: 'Tres semanas después de una sola sesión con láser Nd:Yag Q-switched.', antes: 'ad/manchas-antes.jpg', despues: 'ad/manchas-despues.jpg', ar: [800, 756] },
  { titulo: 'Hongos en uñas', texto: 'Dos meses después del tratamiento con láser Nd:Yag.', antes: 'ad/hongos-antes.jpg', despues: 'ad/hongos-despues.jpg', ar: [800, 958] }
];

/* Destacadas de Instagram: abren cada colección en su perfil. */
window.FRIDA_DESTACADAS = [
  { img: 'hl3.jpg', t: 'Láser tattoo', id: '17944413088880014' },
  { img: 'hl4.jpg', t: 'Manchas', id: '17929678523140574' },
  { img: 'hl7.jpg', t: 'Tricopigmentación', id: '17920781494993358' },
  { img: 'hl6.jpg', t: 'Uñas', id: '17922510653245460' },
  { img: 'hl5.jpg', t: 'Pestañas', id: '17899379729492896' },
  { img: 'hl1.jpg', t: 'Carbon Peel', id: '17882746466581965' },
  { img: 'hl2.jpg', t: 'Depilación láser', id: '17934314420015507' }
];

/* Reseñas reales de Google */
window.FRIDA_RESENAS = [
  { q: 'Tanto Silvana como Eva son personas excepcionales. Lugar muy cercano y profesional. Recomendado 100%.', a: 'Jessica Z.' },
  { q: 'Llevo 6 meses haciendo distintos tratamientos: masajes, depilación, depilación láser, tratamientos de belleza facial y uñas. Estoy muy contenta con el trato y la atención recibida.', a: 'Yolanda P.' },
  { q: 'Un encanto de chicas, te hacen sentir súper cómoda y hacen un trabajo genial.', a: 'Reseña en Google' },
  { q: 'He salido encantada con mis uñas. Silvana, mil gracias por haberme hecho sentir tan bien y a gusto. Profesionales como la copa de un pino.', a: 'Vanessa L.' },
  { q: 'He regalado en Navidades tratamientos a familiares y amigos, y han salido encantados. Muy recomendable.', a: 'Yolanda P.' }
];
