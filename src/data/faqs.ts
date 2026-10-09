// Preguntas frecuentes (AEO). Fuente única para /faq, las páginas de servicio y el JSON-LD FAQPage.
//
// Regla de publicación:
// - "publicada": toda la respuesta procede de una fuente del proyecto (guías, contenido/*.md, glosario,
//   datos de servicios) o de una confirmación del titular. La fuente queda registrada en cada entrada.
// - "pendiente": compromiso del negocio a validar manualmente (docs/validacion-compromisos.md) o
//   afirmación normativa sin fuente en el proyecto. No se publica ni entra en el grafo.

import type { ConceptoId } from "@/data/conceptos";
import type { ServicioSlug } from "@/data/servicios";

export type FaqCategoria = "conductos" | "climatizacion" | "pladur" | "aislamiento" | "ventilacion" | "general";

export type Faq = {
  id: string;
  categoria: FaqCategoria;
  pregunta: string;
  /** Respuesta directa, citable de forma aislada. */
  respuesta: string;
  /** Respuesta ampliada con el contexto técnico de la fuente. */
  ampliada?: string;
  conceptos: ConceptoId[];
  servicio?: ServicioSlug;
  fuente: string;
  estado: "publicada" | "pendiente";
  /** Motivo por el que no se publica (solo si estado = "pendiente"). */
  motivo?: string;
};

export const CATEGORIAS: { id: FaqCategoria; nombre: string }[] = [
  { id: "conductos", nombre: "Conductos" },
  { id: "climatizacion", nombre: "Climatización" },
  { id: "ventilacion", nombre: "Ventilación" },
  { id: "pladur", nombre: "Pladur" },
  { id: "aislamiento", nombre: "Aislamiento" },
  { id: "general", nombre: "Servicio y cobertura" },
];

const G = (slug: string) => `Guía /guias/${slug}`;

export const FAQS: Faq[] = [
  // ───────────────────────── Conductos ─────────────────────────
  {
    id: "trabajos-en-conductos",
    categoria: "conductos",
    pregunta: "¿Qué trabajos se realizan en conductos de aire acondicionado?",
    respuesta:
      "Diseño y dimensionado de la red, montaje, adaptación y reparación de tramos, equilibrado de caudales, limpieza y aislamiento exterior frente a condensaciones.",
    ampliada:
      "La red se monta en panel de fibra de vidrio preaislado para climatización residencial y comercial, o en acero galvanizado para ventilación industrial, parkings y extracción. Incluye el montaje de compuertas de regulación, rejillas y difusores.",
    conceptos: ["conducto-de-aire"],
    servicio: "conductos",
    fuente: "contenido/conductos-aire.md; src/data/servicios.ts",
    estado: "publicada",
  },
  {
    id: "materiales-de-conductos",
    categoria: "conductos",
    pregunta: "¿De qué material son los conductos de aire acondicionado?",
    respuesta:
      "Habitualmente de panel de fibra de vidrio preaislado, para climatización residencial y comercial, o de chapa de acero galvanizado, helicoidal o rectangular, para ventilación industrial, parkings y extracción.",
    ampliada:
      "El panel de fibra de vidrio con revestimiento de aluminio aporta aislamiento térmico y absorción acústica interna. El acero galvanizado ofrece alta resistencia mecánica para redes de ventilación y extracción de humos.",
    conceptos: ["conducto-de-aire"],
    servicio: "conductos",
    fuente: "contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "circular-o-rectangular",
    categoria: "conductos",
    pregunta: "¿Es mejor un conducto circular o rectangular?",
    respuesta:
      "El circular ofrece mejor comportamiento aerodinámico; el rectangular se usa cuando el espacio disponible lo impone, manteniendo una sección equivalente y una relación de lados razonable.",
    ampliada:
      "Cuando la altura disponible limita la sección circular, se recurre a conducto rectangular u ovalado cuidando la relación de lados para no penalizar el rozamiento.",
    conceptos: ["conducto-de-aire"],
    servicio: "conductos",
    fuente: G("dimensionado-de-conductos"),
    estado: "publicada",
  },
  {
    id: "velocidad-confortable",
    categoria: "conductos",
    pregunta: "¿Qué velocidad de aire se considera confortable en una vivienda?",
    respuesta: "Como referencia, entre 2 y 3 m/s en ramales y hasta 4 m/s en troncales, con velocidades bajas cerca de las rejillas para limitar el ruido.",
    ampliada: "En locales y oficinas se trabaja con 3–5 m/s según el nivel acústico exigido.",
    conceptos: ["conducto-de-aire"],
    servicio: "conductos",
    fuente: G("dimensionado-de-conductos"),
    estado: "publicada",
  },
  {
    id: "importancia-de-la-seccion",
    categoria: "conductos",
    pregunta: "¿Por qué importa el tamaño de un conducto?",
    respuesta:
      "Un conducto sobredimensionado encarece la instalación y ocupa espacio; uno infradimensionado aumenta la velocidad del aire, el ruido y el consumo del ventilador.",
    ampliada: "El dimensionado busca el equilibrio entre el caudal necesario, la velocidad recomendada y la pérdida de carga admisible.",
    conceptos: ["conducto-de-aire", "eficiencia-energetica"],
    servicio: "conductos",
    fuente: G("dimensionado-de-conductos"),
    estado: "publicada",
  },
  {
    id: "trazado-y-consumo",
    categoria: "conductos",
    pregunta: "¿Cómo influye el trazado de los conductos en el consumo?",
    respuesta:
      "Cada codo, derivación y cambio de sección suma pérdida de carga. Un trazado con radios amplios y derivaciones bien resueltas reduce la presión que debe vencer el equipo y, con ello, el consumo.",
    conceptos: ["conducto-de-aire", "eficiencia-energetica"],
    servicio: "conductos",
    fuente: G("dimensionado-de-conductos"),
    estado: "publicada",
  },
  {
    id: "que-se-acumula",
    categoria: "conductos",
    pregunta: "¿Qué se acumula dentro de los conductos?",
    respuesta:
      "Polvo, fibra, grasa y, en ambientes húmedos, colonias biológicas. Con el tiempo, ese depósito reduce la sección útil y empeora la calidad del aire impulsado.",
    conceptos: ["conducto-de-aire", "mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: G("limpieza-de-conductos-y-calidad-del-aire"),
    estado: "publicada",
  },
  {
    id: "senales-de-limpieza",
    categoria: "conductos",
    pregunta: "¿Qué señales indican que hay que limpiar los conductos?",
    respuesta:
      "Aumento de ruido o de consumo sin cambio de uso, olores persistentes al arrancar el sistema, polvo visible en las rejillas o una obra reciente que haya generado partículas.",
    conceptos: ["conducto-de-aire", "mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: G("limpieza-de-conductos-y-calidad-del-aire"),
    estado: "publicada",
  },
  {
    id: "como-se-limpian",
    categoria: "conductos",
    pregunta: "¿Cómo se limpian los conductos de aire?",
    respuesta:
      "Con limpieza mecánica mediante cepillado y aspiración de alta eficiencia, que desprende y extrae el depósito sin dispersarlo en el ambiente.",
    ampliada: "Tras la intervención se verifica el estado de las juntas y de los aislamientos interiores.",
    conceptos: ["conducto-de-aire", "mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: G("limpieza-de-conductos-y-calidad-del-aire"),
    estado: "publicada",
  },
  {
    id: "limpieza-y-consumo",
    categoria: "conductos",
    pregunta: "¿Limpiar los conductos reduce el consumo?",
    respuesta: "Sí: al recuperar la sección útil y reducir la pérdida de carga, el ventilador trabaja con menor presión estática.",
    conceptos: ["conducto-de-aire", "eficiencia-energetica"],
    servicio: "conductos",
    fuente: G("limpieza-de-conductos-y-calidad-del-aire"),
    estado: "publicada",
  },
  {
    id: "mantenimiento-vs-reparacion",
    categoria: "conductos",
    pregunta: "¿Qué diferencia hay entre mantenimiento y reparación de conductos?",
    respuesta:
      "El mantenimiento es preventivo y periódico: limpieza y revisión para evitar fallos. La reparación es correctiva: se actúa cuando algún elemento deja de funcionar correctamente.",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: "FAQ del proyecto base",
    estado: "publicada",
  },
  {
    id: "frecuencia-revision-conductos",
    categoria: "conductos",
    pregunta: "¿Con qué frecuencia conviene revisar los conductos?",
    respuesta:
      "Como pauta orientativa, una revisión visual anual de la red y limpieza cuando aparecen indicadores de suciedad o de pérdida de calidad del aire.",
    ampliada:
      "El RITE establece las operaciones de mantenimiento según el tipo y la potencia de la instalación; en viviendas se aplican pautas preventivas recomendadas.",
    conceptos: ["mantenimiento-de-instalaciones-termicas", "conducto-de-aire"],
    servicio: "conductos",
    fuente: G("frecuencia-de-revision-de-conductos"),
    estado: "publicada",
  },
  {
    id: "frecuencia-locales-seis-meses",
    categoria: "conductos",
    pregunta: "¿Cada cuánto se revisan los conductos en locales con mucho uso?",
    respuesta: "La FAQ del proyecto base indicaba «cada seis meses en locales con alto tránsito».",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Periodicidad sin fuente normativa en el proyecto; verificar frente al RITE antes de publicar.",
  },
  {
    id: "condensaciones-en-conductos",
    categoria: "conductos",
    pregunta: "¿Cómo se evitan las condensaciones en los conductos?",
    respuesta: "Con aislamiento elastomérico exterior en los conductos, especialmente en ambientes de alta humedad como el litoral.",
    conceptos: ["conducto-de-aire", "aislamiento-termico"],
    servicio: "conductos",
    fuente: "contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "registro-de-mantenimiento",
    categoria: "conductos",
    pregunta: "¿Qué debería documentarse tras una revisión?",
    respuesta: "El estado encontrado, las acciones realizadas y las recomendaciones pendientes, para que el histórico de la instalación sea trazable.",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "conductos",
    fuente: G("frecuencia-de-revision-de-conductos"),
    estado: "publicada",
  },

  // ───────────────────────── Climatización ─────────────────────────
  {
    id: "que-incluye-climatizacion",
    categoria: "climatizacion",
    pregunta: "¿Qué incluye el servicio de climatización por conductos?",
    respuesta:
      "La instalación de sistemas de climatización por conductos, su mantenimiento y reparación, las mejoras de eficiencia y el equilibrado de caudales en instalaciones existentes.",
    ampliada: "Las rejillas de impulsión y retorno y los difusores lineales se integran en techos técnicos.",
    conceptos: ["climatizacion"],
    servicio: "climatizacion",
    fuente: "Confirmación del titular (09/10/2026); src/data/servicios.ts",
    estado: "publicada",
  },
  {
    id: "instalan-climatizacion",
    categoria: "climatizacion",
    pregunta: "¿Conductos Ergui instala sistemas de climatización?",
    respuesta: "Sí. Conductos Ergui instala sistemas de climatización por conductos en El Vendrell y la comarca del Baix Penedès.",
    conceptos: ["climatizacion"],
    servicio: "climatizacion",
    fuente: "Confirmación del titular (09/10/2026)",
    estado: "publicada",
  },
  {
    id: "otros-sistemas",
    categoria: "climatizacion",
    pregunta: "¿Se instalan equipos split, cassette o aerotermia?",
    respuesta: "—",
    conceptos: ["climatizacion"],
    servicio: "climatizacion",
    fuente: "Decisión del titular (09/10/2026)",
    estado: "pendiente",
    motivo: "Alcance confirmado solo para sistemas por conductos; no asumir otros sistemas.",
  },
  {
    id: "climatizacion-vs-conductos",
    categoria: "climatizacion",
    pregunta: "¿Qué diferencia hay entre el servicio de climatización y el de conductos?",
    respuesta:
      "La climatización abarca el sistema completo: instalación, mantenimiento, eficiencia y equilibrado. El servicio de conductos se centra en la red que distribuye el aire: diseño, montaje, reparación, limpieza y aislamiento.",
    conceptos: ["climatizacion", "conducto-de-aire"],
    servicio: "climatizacion",
    fuente: "src/data/servicios.ts",
    estado: "publicada",
  },
  {
    id: "equipo-sobredimensionado",
    categoria: "climatizacion",
    pregunta: "¿Conviene instalar un equipo más potente para ir sobrado?",
    respuesta: "No: un equipo sobredimensionado provoca ciclos cortos de arranque y parada, peor confort y menor eficiencia.",
    ampliada: "El cálculo de la carga térmica orienta la potencia adecuada para cada estancia.",
    conceptos: ["climatizacion", "eficiencia-energetica"],
    servicio: "climatizacion",
    fuente: G("eficiencia-en-climatizacion-residencial"),
    estado: "publicada",
  },
  {
    id: "seer-scop",
    categoria: "climatizacion",
    pregunta: "¿Qué indican los valores SEER y SCOP?",
    respuesta:
      "Son índices de rendimiento estacional en refrigeración (SEER) y calefacción (SCOP); cuanto mayores, más eficiente es el equipo en condiciones reales de uso.",
    ampliada: "Permiten comparar equipos en condiciones más cercanas al uso real que la potencia nominal.",
    conceptos: ["climatizacion", "eficiencia-energetica"],
    servicio: "climatizacion",
    fuente: G("eficiencia-en-climatizacion-residencial"),
    estado: "publicada",
  },
  {
    id: "reducir-consumo",
    categoria: "climatizacion",
    pregunta: "¿Cómo se reduce el consumo de una instalación de aire acondicionado?",
    respuesta:
      "Ajustando la potencia a la carga térmica, con control por zonas, una distribución equilibrada, consignas razonables y estables, filtración y limpieza del retorno, y una red de conductos estanca.",
    ampliada: "Las bombas de calor con compresor inverter ajustan la energía entregada a la demanda real frente a los sistemas todo o nada.",
    conceptos: ["eficiencia-energetica", "climatizacion"],
    servicio: "climatizacion",
    fuente: G("eficiencia-en-climatizacion-residencial"),
    estado: "publicada",
  },
  {
    id: "mantenimiento-obligatorio",
    categoria: "climatizacion",
    pregunta: "¿Es obligatorio el mantenimiento del aire acondicionado?",
    respuesta:
      "El RITE establece operaciones de mantenimiento según el tipo y la potencia de la instalación; en viviendas se aplican pautas preventivas recomendadas.",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "climatizacion",
    fuente: G("frecuencia-de-revision-de-conductos"),
    estado: "publicada",
  },
  {
    id: "mantenimiento-usuario",
    categoria: "climatizacion",
    pregunta: "¿Qué parte del mantenimiento puede hacer el usuario?",
    respuesta: "La inspección y la limpieza o sustitución de filtros. El circuito frigorífico y la estanqueidad requieren personal cualificado.",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "climatizacion",
    fuente: G("frecuencia-de-revision-de-conductos"),
    estado: "publicada",
  },
  {
    id: "frecuencia-filtros",
    categoria: "climatizacion",
    pregunta: "¿Cada cuánto se revisan los filtros?",
    respuesta: "Como pauta orientativa, inspección cada 2–3 meses y sustitución según la carga de uso.",
    ampliada: "Las unidades interiores y exteriores se limpian y comprueban una vez al año.",
    conceptos: ["mantenimiento-de-instalaciones-termicas"],
    servicio: "climatizacion",
    fuente: G("frecuencia-de-revision-de-conductos"),
    estado: "publicada",
  },
  {
    id: "que-es-rite",
    categoria: "climatizacion",
    pregunta: "¿Qué es el RITE?",
    respuesta:
      "El Reglamento de Instalaciones Térmicas en los Edificios: fija las exigencias de diseño, eficiencia y mantenimiento de las instalaciones de climatización y ventilación.",
    conceptos: ["mantenimiento-de-instalaciones-termicas", "climatizacion"],
    servicio: "climatizacion",
    fuente: "Glosario del sitio",
    estado: "publicada",
  },
  {
    id: "habilitacion-instaladora",
    categoria: "climatizacion",
    pregunta: "¿Conductos Ergui está habilitada como empresa instaladora de instalaciones térmicas?",
    respuesta: "—",
    conceptos: ["climatizacion"],
    servicio: "climatizacion",
    fuente: "—",
    estado: "pendiente",
    motivo: "Bloqueador B7: sin documentación de registro (RASIC/RITE) ni de certificaciones.",
  },

  // ───────────────────────── Ventilación ─────────────────────────
  {
    id: "que-incluye-ventilacion",
    categoria: "ventilacion",
    pregunta: "¿Qué incluye el servicio de ventilación?",
    respuesta:
      "Diseño e instalación de redes de ventilación forzada y de renovación de aire, extracción de humos en cocinas industriales y ventilación de naves y parkings.",
    ampliada: "Las redes se ejecutan habitualmente con conductos de acero galvanizado, helicoidales o rectangulares.",
    conceptos: ["ventilacion", "extraccion-de-humos"],
    servicio: "ventilacion",
    fuente: "README del proyecto base; contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "que-es-doble-flujo",
    categoria: "ventilacion",
    pregunta: "¿Qué es la ventilación de doble flujo?",
    respuesta: "Un sistema que impulsa y extrae aire de forma mecánica, habitualmente con recuperación de calor.",
    ampliada: "Con filtración, reduce la carga de partículas que entra en la red de conductos y alarga los intervalos entre limpiezas.",
    conceptos: ["ventilacion"],
    servicio: "ventilacion",
    fuente: `Glosario del sitio; ${G("limpieza-de-conductos-y-calidad-del-aire")}`,
    estado: "publicada",
  },
  {
    id: "extraccion-cocinas",
    categoria: "ventilacion",
    pregunta: "¿Se instalan sistemas de extracción de humos en cocinas?",
    respuesta: "Sí, en cocinas industriales, con redes de conductos de acero galvanizado.",
    conceptos: ["extraccion-de-humos"],
    servicio: "ventilacion",
    fuente: "contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "normativa-extraccion",
    categoria: "ventilacion",
    pregunta: "¿Qué normativa se aplica a la extracción de humos en cocinas?",
    respuesta: "—",
    conceptos: ["extraccion-de-humos"],
    servicio: "ventilacion",
    fuente: "—",
    estado: "pendiente",
    motivo: "Sin fuente normativa en el proyecto; requiere redacción y verificación.",
  },
  {
    id: "caudal-vivienda",
    categoria: "ventilacion",
    pregunta: "¿Qué caudal de ventilación necesita una vivienda?",
    respuesta: "—",
    conceptos: ["ventilacion"],
    servicio: "ventilacion",
    fuente: "—",
    estado: "pendiente",
    motivo: "Depende del CTE DB-HS; sin fuente en el proyecto. Requiere verificación normativa.",
  },
  {
    id: "ventilacion-zonas-humedas",
    categoria: "ventilacion",
    pregunta: "¿Por qué es importante ventilar baños y cocinas?",
    respuesta: "Evacuar el vapor reduce la carga de humedad sobre tabiques y techos y prolonga su vida útil.",
    conceptos: ["ventilacion", "placa-de-yeso-laminado"],
    servicio: "ventilacion",
    fuente: G("pladur-en-zonas-humedas"),
    estado: "publicada",
  },

  // ───────────────────────── Pladur ─────────────────────────
  {
    id: "soluciones-pladur",
    categoria: "pladur",
    pregunta: "¿Qué soluciones de pladur se ofrecen?",
    respuesta:
      "Tabiques y trasdosados, falsos techos continuos y registrables, cajones técnicos para ocultar instalaciones, y placa hidrófuga o ignífuga según la estancia.",
    ampliada: "Se valoran la humedad, el soporte, el uso del espacio y las necesidades acústicas antes de recomendar el sistema.",
    conceptos: ["placa-de-yeso-laminado"],
    servicio: "pladur",
    fuente: "FAQ del proyecto base; src/data/servicios.ts",
    estado: "publicada",
  },
  {
    id: "pladur-humedad",
    categoria: "pladur",
    pregunta: "¿El pladur resiste la humedad?",
    respuesta:
      "La placa hidrófuga retarda la absorción de agua, pero no es impermeable por sí sola: necesita un acabado continuo y el sellado de juntas y encuentros.",
    ampliada: "En zonas húmedas se trabaja con placas de yeso laminado y masas de fibra de yeso especializadas, siempre que el soporte lo permita.",
    conceptos: ["placa-de-yeso-laminado"],
    servicio: "pladur",
    fuente: `${G("pladur-en-zonas-humedas")}; FAQ del proyecto base`,
    estado: "publicada",
  },
  {
    id: "hidrofuga-ducha",
    categoria: "pladur",
    pregunta: "¿Basta una placa hidrófuga en una ducha?",
    respuesta: "No por sí sola: requiere un acabado impermeable continuo, como alicatado o un sistema de barrera, y sellado en los encuentros.",
    conceptos: ["placa-de-yeso-laminado"],
    servicio: "pladur",
    fuente: G("pladur-en-zonas-humedas"),
    estado: "publicada",
  },
  {
    id: "placa-verde",
    categoria: "pladur",
    pregunta: "¿Qué es la placa verde de pladur?",
    respuesta:
      "Es la placa de yeso laminado hidrófuga, con alma y cartón tratados frente a la humedad, que se identifica habitualmente por su color verde. Se usa en baños, cocinas y tendederos.",
    conceptos: ["placa-de-yeso-laminado"],
    servicio: "pladur",
    fuente: G("pladur-en-zonas-humedas"),
    estado: "publicada",
  },
  {
    id: "placa-ignifuga",
    categoria: "pladur",
    pregunta: "¿Cuándo se usa placa ignífuga?",
    respuesta:
      "En salas técnicas de maquinaria, conductos de extracción y sectores de incendio, según los requisitos del Código Técnico de la Edificación.",
    conceptos: ["placa-de-yeso-laminado"],
    servicio: "pladur",
    fuente: "contenido/instalacion-pladur.md",
    estado: "publicada",
  },
  {
    id: "techo-registrable",
    categoria: "pladur",
    pregunta: "¿Para qué sirve un falso techo registrable?",
    respuesta: "Permite acceder a equipos de climatización, fancoils y compuertas de regulación para su mantenimiento sin desmontar el techo.",
    conceptos: ["placa-de-yeso-laminado", "mantenimiento-de-instalaciones-termicas"],
    servicio: "pladur",
    fuente: "contenido/instalacion-pladur.md",
    estado: "publicada",
  },
  {
    id: "ocultar-instalacion",
    categoria: "pladur",
    pregunta: "¿Se puede ocultar la instalación de aire acondicionado con pladur?",
    respuesta:
      "Sí, mediante falsos techos técnicos y cajones de placa de yeso laminado, con difusores lineales y rejillas integrados en el techo.",
    conceptos: ["placa-de-yeso-laminado", "conducto-de-aire"],
    servicio: "pladur",
    fuente: "contenido/instalacion-pladur.md; contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "pladur-y-conductos-misma-obra",
    categoria: "pladur",
    pregunta: "¿Qué ventaja tiene hacer el pladur y los conductos en la misma obra?",
    respuesta:
      "El techo y los cajones se diseñan pensando en la red de conductos y en sus registros de mantenimiento, y ambos trabajos se coordinan en una sola fase de obra.",
    conceptos: ["placa-de-yeso-laminado", "conducto-de-aire"],
    servicio: "pladur",
    fuente: "contenido/instalacion-pladur.md",
    estado: "publicada",
  },

  // ───────────────────────── Aislamiento ─────────────────────────
  {
    id: "aislamiento-acustico-pladur",
    categoria: "aislamiento",
    pregunta: "¿Cómo aísla del ruido un tabique de pladur?",
    respuesta:
      "Por la masa de las placas, el efecto muelle de la lana mineral en el interior y la estanqueidad al aire de juntas y cajas. Fallar en uno de los tres degrada el conjunto.",
    conceptos: ["aislamiento-acustico", "placa-de-yeso-laminado"],
    servicio: "aislamiento-acustico",
    fuente: G("aislamiento-termico-y-acustico-con-pladur"),
    estado: "publicada",
  },
  {
    id: "espesor-acustico",
    categoria: "aislamiento",
    pregunta: "¿Hay que aumentar el grosor del tabique para aislar mejor del ruido?",
    respuesta: "No necesariamente: lanas minerales de mayor densidad mejoran el comportamiento acústico manteniendo el espesor del sistema.",
    conceptos: ["aislamiento-acustico"],
    servicio: "aislamiento-acustico",
    fuente: G("aislamiento-termico-y-acustico-con-pladur"),
    estado: "publicada",
  },
  {
    id: "termico-vs-acustico",
    categoria: "aislamiento",
    pregunta: "¿Qué diferencia hay entre aislamiento térmico y acústico?",
    respuesta:
      "El térmico reduce la transmisión de calor entre ambientes; el acústico reduce la transmisión del sonido entre recintos o desde el exterior. En construcción en seco, la lana mineral aporta ambos comportamientos.",
    conceptos: ["aislamiento-termico", "aislamiento-acustico"],
    servicio: "aislamiento-termico",
    fuente: "Glosario del sitio",
    estado: "publicada",
  },
  {
    id: "materiales-aislamiento",
    categoria: "aislamiento",
    pregunta: "¿Qué materiales se usan para aislar con pladur?",
    respuesta: "Paneles de lana de roca y de fibra de vidrio en trasdosados y en el plenum de los falsos techos.",
    conceptos: ["aislamiento-termico", "aislamiento-acustico"],
    servicio: "aislamiento-termico",
    fuente: "contenido/instalacion-pladur.md",
    estado: "publicada",
  },
  {
    id: "que-es-trasdosado",
    categoria: "aislamiento",
    pregunta: "¿Qué es un trasdosado?",
    respuesta: "Un revestimiento de placa de yeso aplicado sobre un muro existente para mejorar su aislamiento o su planeidad.",
    conceptos: ["placa-de-yeso-laminado", "aislamiento-termico"],
    servicio: "aislamiento-termico",
    fuente: "Glosario del sitio",
    estado: "publicada",
  },
  {
    id: "aislamiento-y-climatizacion",
    categoria: "aislamiento",
    pregunta: "¿El aislamiento térmico mejora el rendimiento del aire acondicionado?",
    respuesta: "Sí: al reducir la demanda térmica de los cerramientos, el equipo de climatización necesita aportar menos energía para mantener el confort.",
    conceptos: ["aislamiento-termico", "eficiencia-energetica"],
    servicio: "aislamiento-termico",
    fuente: "contenido/instalacion-pladur.md",
    estado: "publicada",
  },
  {
    id: "barrera-de-vapor",
    categoria: "aislamiento",
    pregunta: "¿Hace falta barrera de vapor en un trasdosado?",
    respuesta: "Cuando procede, una barrera de vapor bien ubicada en un trasdosado sobre muro frío reduce el riesgo de condensaciones superficiales.",
    conceptos: ["aislamiento-termico"],
    servicio: "aislamiento-termico",
    fuente: G("aislamiento-termico-y-acustico-con-pladur"),
    estado: "publicada",
  },
  {
    id: "cte-db-hr",
    categoria: "aislamiento",
    pregunta: "¿Qué exige el Código Técnico en aislamiento acústico (DB-HR)?",
    respuesta: "—",
    conceptos: ["aislamiento-acustico"],
    servicio: "aislamiento-acustico",
    fuente: "—",
    estado: "pendiente",
    motivo: "Sin fuente normativa en el proyecto; requiere redacción y verificación.",
  },

  // ───────────────────────── Servicio y cobertura ─────────────────────────
  {
    id: "localidades",
    categoria: "general",
    pregunta: "¿En qué localidades presta servicio Conductos Ergui?",
    respuesta:
      "En El Vendrell, donde tiene su base, y en la comarca del Baix Penedès: Calafell, Cunit, Santa Oliva, Bellvei, Albinyana, L'Arboç, Banyeres del Penedès, La Bisbal del Penedès, Llorenç del Penedès, Bonastre, Sant Jaume dels Domenys, Masllorenç y El Montmell.",
    conceptos: [],
    fuente: "src/lib/entidad.ts",
    estado: "publicada",
  },
  {
    id: "quien-esta-detras",
    categoria: "general",
    pregunta: "¿Quién está detrás de Conductos Ergui?",
    respuesta: "Bryan Ergui, fundador y titular del negocio, con 10 años de experiencia profesional.",
    conceptos: [],
    fuente: "Confirmación del titular (09/10/2026)",
    estado: "publicada",
  },
  {
    id: "tipos-de-cliente",
    categoria: "general",
    pregunta: "¿Se trabaja en viviendas y en locales?",
    respuesta: "Sí: proyectos residenciales, locales comerciales y naves industriales.",
    conceptos: [],
    fuente: "contenido/conductos-aire.md",
    estado: "publicada",
  },
  {
    id: "coste-valoracion",
    categoria: "general",
    pregunta: "¿La valoración tiene coste?",
    respuesta: "FAQ base: «La primera revisión de la solicitud y la orientación inicial se ofrecen sin compromiso…»",
    conceptos: [],
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Compromiso comercial: validación manual (docs/validacion-compromisos.md).",
  },
  {
    id: "duracion-intervencion",
    categoria: "general",
    pregunta: "¿Cuánto tarda una intervención?",
    respuesta: "FAQ base: «Una intervención reducida puede resolverse en una jornada…»",
    conceptos: [],
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Compromiso de plazo: validación manual (docs/validacion-compromisos.md).",
  },
  {
    id: "retirada-residuos",
    categoria: "general",
    pregunta: "¿Se retiran los residuos al terminar?",
    respuesta: "FAQ base: «Se retiran los residuos generados directamente por el trabajo…»",
    conceptos: [],
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Compromiso de servicio: validación manual (docs/validacion-compromisos.md).",
  },
  {
    id: "envio-fotos",
    categoria: "general",
    pregunta: "¿Se pueden enviar fotografías o planos?",
    respuesta: "FAQ base: «Tras recibir el formulario se indica el modo de envío…»",
    conceptos: [],
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Procedimiento comercial: validación manual (docs/validacion-compromisos.md).",
  },
  {
    id: "comunidades",
    categoria: "general",
    pregunta: "¿Se coordina el trabajo con la comunidad de vecinos?",
    respuesta: "FAQ base: «Se trabaja con administraciones y comunidades; se presenta la documentación requerida…»",
    conceptos: [],
    fuente: "FAQ del proyecto base",
    estado: "pendiente",
    motivo: "Compromiso de servicio: validación manual (docs/validacion-compromisos.md).",
  },
];

export const FAQS_PUBLICADAS = FAQS.filter((f) => f.estado === "publicada");
export const FAQS_PENDIENTES = FAQS.filter((f) => f.estado === "pendiente");

export const faqsDeServicio = (slug: ServicioSlug) => FAQS_PUBLICADAS.filter((f) => f.servicio === slug);
export const faqsDeCategoria = (c: FaqCategoria) => FAQS_PUBLICADAS.filter((f) => f.categoria === c);
