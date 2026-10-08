import { AUTHOR_NAME, BRAND, SITE_URL } from "@/lib/entidad";

export type Cluster = "Conductos" | "Pladur" | "HVAC" | "Mantenimiento" | "Aislamiento";

export const CLUSTERS: Cluster[] = ["Conductos", "Pladur", "HVAC", "Mantenimiento", "Aislamiento"];

export const AUTHOR = AUTHOR_NAME;
export const AUTHOR_ROLE = "Especialista en climatización y construcción en seco";
export const AUTHOR_SLUG = "aitor-ergui";
export const PUBLISHER = BRAND;
export const BASE_URL = SITE_URL;

export type Fabricante = { name: string; url: string; note: string };
export type FAQ = { q: string; a: string };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "quote"; text: string; cite: string };

export type Guia = {
  slug: string;
  title: string;
  cluster: Cluster;
  excerpt: string;
  heroAccent: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  articleSection: string;
  blocks: Block[];
  fabricantes: Fabricante[];
  normativa: Fabricante[];
  faq: FAQ[];
  related: string[];
  service: { label: string; href: string };
};

export const GUIAS: Guia[] = [
  {
    slug: "dimensionado-de-conductos",
    title: "Dimensionado de conductos: caudal, velocidad y ruido",
    cluster: "Conductos",
    excerpt: "Cómo se decide la sección de un conducto para equilibrar caudal, pérdida de carga y confort acústico.",
    heroAccent: "para que el aire no se pele con el espacio.",
    datePublished: "2025-02-12",
    dateModified: "2025-09-03",
    readingMinutes: 6,
    articleSection: "Conductos",
    blocks: [
      { kind: "h2", text: "Por qué importa la sección" },
      { kind: "p", text: "Un conducto sobredimensionado encarece la instalación y ocupa espacio; uno infradimensionado aumenta la velocidad del aire, el ruido y el consumo del ventilador. El dimensionado busca un punto de equilibrio entre caudal necesario, velocidad recomendada y pérdida de carga admisible." },
      { kind: "h2", text: "Velocidad orientativa por uso" },
      { kind: "ul", items: ["Viviendas: 2–3 m/s en ramales y hasta 4 m/s en troncales.", "Locales y oficinas: 3–5 m/s según el nivel acústico exigido.", "Tramos próximos a rejillas: velocidades bajas para limitar el ruido audible."] },
      { kind: "h2", text: "Pérdida de carga y trazado" },
      { kind: "p", text: "Cada codo, derivación y cambio de sección suma pérdida de carga. Un trazado con radios amplios y derivaciones bien resueltas reduce la presión estática que debe vencer el equipo y, con ello, el consumo energético." },
      { kind: "quote", text: "Los fabricantes de ventilación y difusión publican tablas y ábacos de pérdida de carga por tramo y por accesorio que permiten ajustar la sección antes de la instalación.", cite: "Soler & Palau · Trox · Aldes" },
      { kind: "p", text: "Cuando el espacio disponible limita la sección circular, se recurre a conducto rectangular u ovalado manteniendo una sección equivalente y cuidando la relación de lados para no penalizar el rozamiento." },
    ],
    fabricantes: [
      { name: "Soler & Palau (S&P)", url: "https://www.solerpalau.com/es-es/", note: "Ábacos y tablas de pérdida de carga en ventilación." },
      { name: "Trox", url: "https://www.trox.es/", note: "Difusión y regulación: selección de rejillas y compuertas por caudal y nivel sonoro." },
      { name: "Aldes", url: "https://www.aldes.es/", note: "Documentación técnica de conductos y ventilación." },
    ],
    normativa: [
      { name: "RITE / IDAE", url: "https://www.idae.es/", note: "Exigencias de diseño y eficiencia de las instalaciones térmicas y de ventilación." },
      { name: "UNE-EN 16798 (AENOR)", url: "https://www.aenor.com/", note: "Criterios de ventilación y calidad del aire interior en edificios." },
    ],
    faq: [
      { q: "¿Qué velocidad de aire se considera confortable en una vivienda?", a: "Como referencia, entre 2 y 3 m/s en ramales, limitando la velocidad cerca de las rejillas para controlar el ruido audible." },
      { q: "¿Conducto circular o rectangular?", a: "El circular ofrece mejor comportamiento aerodinámico; el rectangular se usa cuando el espacio disponible lo impone, manteniendo una sección equivalente y una relación de lados razonable." },
    ],
    related: ["limpieza-de-conductos-y-calidad-del-aire", "aislamiento-termico-y-acustico-con-pladur", "frecuencia-de-revision-de-conductos"],
    service: { label: "Ver servicio de conductos de aire", href: "/#climatizacion" },
  },
  {
    slug: "limpieza-de-conductos-y-calidad-del-aire",
    title: "Limpieza de conductos y calidad del aire interior",
    cluster: "Conductos",
    excerpt: "Cuándo conviene limpiar la red de conductos y cómo repercute en la calidad del aire y en el rendimiento del equipo.",
    heroAccent: "porque el aire que no se ve también se cuida.",
    datePublished: "2025-03-20",
    dateModified: "2025-09-03",
    readingMinutes: 5,
    articleSection: "Conductos",
    blocks: [
      { kind: "h2", text: "Qué se acumula en la red" },
      { kind: "p", text: "Polvo, fibra, grasa y, en ambientes húmedos, colonias biológicas pueden depositarse en el interior de los conductos. Con el tiempo, ese depósito reduce la sección útil y empeora la calidad del aire impulsado." },
      { kind: "h2", text: "Señales que aconsejan una revisión" },
      { kind: "ul", items: ["Aumento de ruido o de consumo sin cambio de uso.", "Olores persistentes al arrancar el sistema.", "Polvo visible en rejillas o en el entorno inmediato.", "Antecedentes de obra reciente que haya generado partículas."] },
      { kind: "h2", text: "Cómo se aborda" },
      { kind: "p", text: "La limpieza mecánica con cepillado y aspiración de alta eficiencia permite desprender y extraer el depósito sin dispersarlo en el ambiente. Tras la intervención se verifica el estado de juntas y aislamientos interiores." },
      { kind: "quote", text: "Los sistemas de ventilación de doble flujo con filtración reducen la carga de partículas que entra en la red y alargan los intervalos entre limpiezas.", cite: "Aldes · Zehnder" },
    ],
    fabricantes: [
      { name: "Aldes", url: "https://www.aldes.es/", note: "Ventilación de doble flujo y filtración." },
      { name: "Zehnder", url: "https://www.zehnder.es/", note: "Ventilación de confort con recuperación de calor." },
      { name: "Daikin", url: "https://www.daikin.es/", note: "Filtración y calidad del aire en climatización." },
    ],
    normativa: [
      { name: "RITE / IDAE", url: "https://www.idae.es/", note: "Obligaciones de mantenimiento e higiene de las instalaciones." },
      { name: "ATECYR", url: "https://www.atecyr.org/", note: "Recomendaciones técnicas de mantenimiento y calidad del aire interior." },
    ],
    faq: [
      { q: "¿Cada cuánto conviene revisar los conductos?", a: "Depende del uso; como pauta orientativa, una revisión visual anual y limpieza cuando aparecen los indicadores de suciedad o de calidad del aire." },
      { q: "¿La limpieza mejora el consumo?", a: "Sí, al recuperar la sección útil y reducir la pérdida de carga, el ventilador trabaja con menor presión estática." },
    ],
    related: ["dimensionado-de-conductos", "frecuencia-de-revision-de-conductos", "eficiencia-en-climatizacion-residencial"],
    service: { label: "Solicitar limpieza de conductos", href: "/presupuestador" },
  },
  {
    slug: "pladur-en-zonas-humedas",
    title: "Pladur en zonas húmedas: baños y cocinas",
    cluster: "Pladur",
    excerpt: "Qué placas y tratamientos se emplean cuando el tabique o el techo van a convivir con vapor y salpicaduras.",
    heroAccent: "donde el vapor manda, el sistema responde.",
    datePublished: "2025-04-08",
    dateModified: "2025-09-03",
    readingMinutes: 5,
    articleSection: "Pladur",
    blocks: [
      { kind: "h2", text: "Placas resistentes a la humedad" },
      { kind: "p", text: "En baños, cocinas y tendederos se emplean placas con alma y cartón tratados frente a la humedad, identificadas habitualmente por su color verde. No son impermeables por sí solas: su función es retardar la absorción de agua mientras el acabado protege la superficie." },
      { kind: "h2", text: "El acabado es parte del sistema" },
      { kind: "p", text: "Una placa hidrófuga sin un acabado continuo y sellado en juntas y encuentros pierde gran parte de su eficacia. Masillas, imprimaciones y pinturas o alicatados con barrera de vapor correctamente ejecutados cierran el sistema." },
      { kind: "ul", items: ["Ventilación suficiente para evacuar el vapor generado.", "Sellado perimetral en encuentros con suelo y sanitarios.", "Alicatado o pintura de alta resistencia al agua en zonas de salpicadura directa."] },
      { kind: "quote", text: "Los sistemas de placa de yeso laminado para ambientes húmedos especifican el conjunto placa, masilla y acabado como una solución ensayada, no como piezas sueltas.", cite: "Knauf · Siniat" },
    ],
    fabricantes: [
      { name: "Knauf", url: "https://www.knauf.es/", note: "Sistemas de placa de yeso para ambientes húmedos." },
      { name: "Siniat", url: "https://www.siniat.com/es-es/", note: "Placas y soluciones técnicas resistentes a la humedad." },
      { name: "Pladur", url: "https://www.pladur.com/", note: "Catálogo de placas y sistemas por tipo de estancia." },
    ],
    normativa: [
      { name: "CTE DB-HS", url: "https://www.codigotecnico.org/", note: "Exigencias de protección frente a la humedad en paramentos." },
    ],
    faq: [
      { q: "¿Una placa hidrófuga basta en una ducha?", a: "No por sí sola: requiere un acabado impermeable continuo (alicatado o sistema de barrera) y sellado en encuentros." },
      { q: "¿Qué papel juega la ventilación?", a: "Evacuar el vapor reduce la carga de humedad sobre el sistema y prolonga su vida útil." },
    ],
    related: ["aislamiento-termico-y-acustico-con-pladur", "dimensionado-de-conductos"],
    service: { label: "Ver soluciones de pladur", href: "/#pladur" },
  },
  {
    slug: "eficiencia-en-climatizacion-residencial",
    title: "Eficiencia en climatización residencial",
    cluster: "HVAC",
    excerpt: "Claves para que una instalación de aire acondicionado consuma menos y dure más: tamaño correcto, control y mantenimiento.",
    heroAccent: "menos vatios, más confort.",
    datePublished: "2025-05-15",
    dateModified: "2025-09-03",
    readingMinutes: 6,
    articleSection: "HVAC",
    blocks: [
      { kind: "h2", text: "Sobredimensionar también penaliza" },
      { kind: "p", text: "Un equipo demasiado potente para la estancia arranca y para con frecuencia, trabaja en regímenes poco eficientes y aporta peor sensación de confort. El cálculo de carga térmica orienta la potencia adecuada." },
      { kind: "h2", text: "Control y distribución" },
      { kind: "p", text: "Un control por zonas y una distribución de aire bien equilibrada permiten servir solo lo necesario. Las bombas de calor con compresor inverter ajustan la entrega de energía a la demanda real y reducen el consumo frente a sistemas todo o nada." },
      { kind: "ul", items: ["Ajuste de consignas razonables y estables.", "Filtración adecuada y limpieza periódica del retorno.", "Revisión de la estanqueidad de la red de conductos y de la difusión del aire."] },
      { kind: "quote", text: "La etiqueta energética y los datos de rendimiento estacional (SEER y SCOP) permiten comparar equipos en condiciones más cercanas al uso real que la potencia nominal.", cite: "Daikin · Mitsubishi Electric · Trox" },
    ],
    fabricantes: [
      { name: "Daikin", url: "https://www.daikin.es/", note: "Bombas de calor inverter y rendimiento estacional." },
      { name: "Mitsubishi Electric", url: "https://es.mitsubishielectric.com/es/", note: "Climatización residencial y control por zonas." },
      { name: "Trox", url: "https://www.trox.es/", note: "Difusión de aire y regulación para equilibrar la distribución." },
    ],
    normativa: [
      { name: "RITE / IDAE", url: "https://www.idae.es/", note: "Exigencias de eficiencia y rendimiento de las instalaciones." },
      { name: "CTE DB-HE", url: "https://www.codigotecnico.org/", note: "Limitación de la demanda y del consumo energético." },
    ],
    faq: [
      { q: "¿Qué indican SEER y SCOP?", a: "Son índices de rendimiento estacional en refrigeración y calefacción; cuanto mayores, más eficiente es el equipo en condiciones reales." },
      { q: "¿Conviene un equipo más grande para ir sobrado?", a: "No: el sobredimensionado provoca ciclos cortos, peor confort y menor eficiencia." },
    ],
    related: ["dimensionado-de-conductos", "frecuencia-de-revision-de-conductos", "aislamiento-termico-y-acustico-con-pladur"],
    service: { label: "Solicitar valoración de eficiencia", href: "/presupuestador" },
  },
  {
    slug: "frecuencia-de-revision-de-conductos",
    title: "Con qué frecuencia revisar los conductos",
    cluster: "Mantenimiento",
    excerpt: "Una pauta sensata de revisión y mantenimiento preventivo para viviendas y locales, y qué se comprueba en cada visita.",
    heroAccent: "lo que se revisa, no se rompe sin avisar.",
    datePublished: "2025-06-22",
    dateModified: "2025-09-03",
    readingMinutes: 4,
    articleSection: "Mantenimiento",
    blocks: [
      { kind: "h2", text: "Prevención frente a corrección" },
      { kind: "p", text: "El mantenimiento preventivo detecta fugas, suciedad y desajustes antes de que se traduzcan en ruido, consumo extra o averías. Una revisión programada suele ser más económica que una reparación urgente." },
      { kind: "h2", text: "Pautas orientativas" },
      { kind: "ul", items: ["Filtros: inspección cada 2–3 meses y sustitución según carga de uso.", "Red de conductos: revisión visual anual y limpieza cuando los indicadores lo aconsejen.", "Unidades interiores y exteriores: limpieza y comprobación anual."] },
      { kind: "h2", text: "Qué se documenta" },
      { kind: "p", text: "Un buen servicio deja registro del estado encontrado, las acciones realizadas y las recomendaciones pendientes, de modo que el histórico de la instalación sea trazable a lo largo del tiempo." },
      { kind: "quote", text: "Los planes de mantenimiento de los fabricantes distinguen entre operaciones que puede hacer el usuario, como los filtros, y las que requieren personal cualificado, como el circuito frigorífico y la estanqueidad.", cite: "Soler & Palau · Daikin" },
    ],
    fabricantes: [
      { name: "Soler & Palau (S&P)", url: "https://www.solerpalau.com/es-es/", note: "Recomendaciones de mantenimiento en ventilación." },
      { name: "Aldes", url: "https://www.aldes.es/", note: "Mantenimiento de sistemas de ventilación." },
      { name: "Daikin", url: "https://www.daikin.es/", note: "Planes de mantenimiento de equipos de climatización." },
    ],
    normativa: [
      { name: "RITE / IDAE", url: "https://www.idae.es/", note: "Obligaciones de mantenimiento preventivo según potencia y uso." },
      { name: "ATECYR", url: "https://www.atecyr.org/", note: "Guías de mantenimiento de instalaciones de climatización." },
    ],
    faq: [
      { q: "¿El mantenimiento es obligatorio?", a: "El RITE establece operaciones de mantenimiento según el tipo y la potencia de la instalación; en viviendas se aplican pautas preventivas recomendadas." },
      { q: "¿Qué puedo hacer yo mismo?", a: "La inspección y limpieza o sustitución de filtros; el circuito frigorífico y la estanqueidad requieren personal cualificado." },
    ],
    related: ["limpieza-de-conductos-y-calidad-del-aire", "dimensionado-de-conductos", "eficiencia-en-climatizacion-residencial"],
    service: { label: "Solicitar plan de mantenimiento", href: "/presupuestador" },
  },
  {
    slug: "aislamiento-termico-y-acustico-con-pladur",
    title: "Aislamiento térmico y acústico con trasdosados de pladur",
    cluster: "Aislamiento",
    excerpt: "Cómo un trasdosado o tabique de placa de yeso con lana mineral mejora el confort térmico y reduce el ruido entre estancias.",
    heroAccent: "el silencio también se construye por capas.",
    datePublished: "2025-07-30",
    dateModified: "2025-09-03",
    readingMinutes: 6,
    articleSection: "Aislamiento",
    blocks: [
      { kind: "h2", text: "Masa, muelle y estanqueidad" },
      { kind: "p", text: "El aislamiento acústico de un tabique de placa de yeso se apoya en tres principios: la masa de las placas, el efecto muelle de la lana mineral en el interior y la estanqueidad al paso del aire por juntas y cajas. Fallar en uno degrada el conjunto." },
      { kind: "h2", text: "Aislamiento térmico en trasdosados" },
      { kind: "p", text: "Un trasdosado sobre un muro frío con lana mineral y, cuando procede, una barrera de vapor bien ubicada reduce la transmitancia y el riesgo de condensaciones superficiales. El espesor de cámara y el tipo de lana se eligen según el objetivo." },
      { kind: "ul", items: ["Lanas de diferente densidad según el objetivo térmico o acústico.", "Cintas y masillas acústicas en perfiles y encuentros.", "Tratamiento de cajas de instalación y pasos."] },
      { kind: "quote", text: "Las lanas minerales de alta densidad mejoran el aislamiento acústico de los tabiques de placa de yeso sin aumentar el espesor del sistema.", cite: "ISOVER · Rockwool" },
    ],
    fabricantes: [
      { name: "ISOVER", url: "https://www.isover.es/", note: "Lanas minerales para aislamiento térmico y acústico." },
      { name: "Rockwool", url: "https://www.rockwool.com/es/", note: "Aislamiento acústico en tabiques de placa de yeso." },
      { name: "Knauf", url: "https://www.knauf.es/", note: "Sistemas de trasdosado con lana mineral." },
    ],
    normativa: [
      { name: "CTE DB-HE / DB-HR", url: "https://www.codigotecnico.org/", note: "Exigencias de ahorro de energía y de protección frente al ruido." },
      { name: "UNE-EN (AENOR)", url: "https://www.aenor.com/", note: "Normas de ensayo de aislamiento acústico y térmico." },
    ],
    faq: [
      { q: "¿Qué pesa más en el aislamiento acústico?", a: "El conjunto masa-muelle-masa y, sobre todo, la estanqueidad al aire de juntas y cajas." },
      { q: "¿Aumenta el espesor del tabique?", a: "No necesariamente: lanas de mayor densidad mejoran el comportamiento acústico manteniendo el espesor del sistema." },
    ],
    related: ["pladur-en-zonas-humedas", "dimensionado-de-conductos"],
    service: { label: "Ver soluciones de pladur y aislamiento", href: "/#pladur" },
  },
];

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}

export function getRelacionadas(guia: Guia): Guia[] {
  return guia.related.map(getGuia).filter((g): g is Guia => g !== undefined);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" });
}

export function clusterSlug(c: Cluster): string {
  return c.toLowerCase();
}

export function getClusterBySlug(slug: string): Cluster | undefined {
  return CLUSTERS.find((c) => clusterSlug(c) === slug);
}

export function getGuiasPorCluster(c: Cluster): Guia[] {
  return GUIAS.filter((g) => g.cluster === c);
}

export const CLUSTER_RELATED: Record<Cluster, Cluster[]> = {
  Conductos: ["HVAC", "Mantenimiento", "Aislamiento"],
  Pladur: ["Aislamiento", "Conductos"],
  HVAC: ["Conductos", "Mantenimiento", "Aislamiento"],
  Mantenimiento: ["Conductos", "HVAC"],
  Aislamiento: ["Pladur", "HVAC"],
};

export type ClusterPillar = {
  accent: string;
  intro: string;
  points: string[];
  serviceHref: string;
  serviceLabel: string;
};

export const CLUSTER_PILLAR: Record<Cluster, ClusterPillar> = {
  Conductos: {
    accent: "el camino que recorre el aire.",
    intro:
      "El cluster de conductos reúne el dimensionado, el trazado, la difusión y la limpieza de la red de distribución de aire. Se trata de equilibrar caudal, velocidad, pérdida de carga y confort acústico desde el primer replanteo.",
    points: [
      "Sección y velocidad orientadas al uso y al nivel acústico exigido.",
      "Trazado con radios amplios y derivaciones bien resueltas para reducir la pérdida de carga.",
      "Difusión y regulación seleccionadas por caudal y nivel sonoro.",
      "Limpieza y revisión que mantienen la sección útil y la calidad del aire.",
    ],
    serviceHref: "/#climatizacion",
    serviceLabel: "Ver servicio de conductos de aire",
  },
  Pladur: {
    accent: "superficies que ordenan el espacio.",
    intro:
      "El cluster de pladur abarca tabiques, trasdosados, falsos techos y cajones técnicos con placa de yeso laminado. El enfoque correcto entiende el sistema como un conjunto: placa, estructura, aislamiento y acabado.",
    points: [
      "Selección de placa según humedad, fuego y exigencia acústica.",
      "Replanteo preciso y tratamiento continuo de juntas y encuentros.",
      "Integración de instalaciones y registros accesibles.",
      "Acabado listo para pintura o revestimiento.",
    ],
    serviceHref: "/#pladur",
    serviceLabel: "Ver soluciones de pladur",
  },
  HVAC: {
    accent: "confort medido, no improvisado.",
    intro:
      "El cluster de HVAC trata la climatización como un sistema: carga térmica, selección de equipo, control por zonas y distribución del aire. La eficiencia se consigue con el tamaño correcto y una regulación ajustada a la demanda real.",
    points: [
      "Cálculo de carga térmica para evitar sobredimensionar.",
      "Bombas de calor inverter y rendimiento estacional (SEER/SCOP).",
      "Control por zonas y difusión equilibrada del aire.",
      "Filtración y estanqueidad de la red como parte del rendimiento.",
    ],
    serviceHref: "/presupuestador",
    serviceLabel: "Solicitar valoración de eficiencia",
  },
  Mantenimiento: {
    accent: "lo cuidado dura y rinde.",
    intro:
      "El cluster de mantenimiento define pautas preventivas para filtros, red de conductos y unidades, con documentación trazable de cada intervención. El objetivo es detectar desajustes antes de que se traduzcan en ruido, consumo extra o averías.",
    points: [
      "Inspección y sustitución de filtros según carga de uso.",
      "Revisión visual anual de la red y limpieza cuando procede.",
      "Comprobación anual de unidades interiores y exteriores.",
      "Registro del estado, acciones y recomendaciones pendientes.",
    ],
    serviceHref: "/presupuestador",
    serviceLabel: "Solicitar plan de mantenimiento",
  },
  Aislamiento: {
    accent: "el confort se construye por capas.",
    intro:
      "El cluster de aislamiento aborda el comportamiento térmico y acústico de tabiques y trasdosados de placa de yeso con lana mineral. Se apoya en tres principios: masa, efecto muelle y estanqueidad al aire.",
    points: [
      "Lanas de densidad adecuada al objetivo térmico o acústico.",
      "Cintas y masillas acústicas en perfiles y encuentros.",
      "Tratamiento de cajas de instalación y pasos.",
      "Barrera de vapor bien ubicada frente a condensaciones.",
    ],
    serviceHref: "/#pladur",
    serviceLabel: "Ver soluciones de pladur y aislamiento",
  },
};

export type GlosarioEntry = { term: string; def: string; guia?: string; cluster?: Cluster };

export const GLOSARIO: GlosarioEntry[] = [
  { term: "Caudal", def: "Volumen de aire que circula por un conducto o rejilla por unidad de tiempo, habitualmente en m³/h.", guia: "dimensionado-de-conductos" },
  { term: "Velocidad del aire", def: "Rapidez con la que el aire se desplaza por el conducto; condiciona el ruido y la pérdida de carga.", guia: "dimensionado-de-conductos" },
  { term: "Pérdida de carga", def: "Caída de presión que sufre el aire al rozar con el conducto y al pasar por accesorios como codos y derivaciones.", guia: "dimensionado-de-conductos" },
  { term: "Plenum", def: "Cámara o cajón que distribuye el aire entre el equipo y los conductos o rejillas.", cluster: "Conductos" },
  { term: "Difusor / rejilla", def: "Elemento terminal que impulsa o extrae el aire del local controlando dirección y velocidad.", cluster: "Conductos" },
  { term: "Compuerta", def: "Dispositivo que regula o cierra el paso de aire en un tramo de la red.", cluster: "Conductos" },
  { term: "Placa de yeso laminado (PYL)", def: "Placa de núcleo de yeso revestida con láminas de cartón, base de los sistemas de tabiquería y techos en seco.", cluster: "Pladur" },
  { term: "Trasdosado", def: "Revestimiento de placa de yeso aplicado sobre un muro existente para mejorar aislamiento o planeidad.", guia: "aislamiento-termico-y-acustico-con-pladur" },
  { term: "Tabique autoportante", def: "Tabique de placa de yeso sobre estructura metálica, independiente del forjado, con aislamiento en su interior.", cluster: "Pladur" },
  { term: "Lana mineral", def: "Material aislante de origen mineral que aporta comportamiento térmico y acústico en cámaras y trasdosados.", guia: "aislamiento-termico-y-acustico-con-pladur" },
  { term: "Barrera de vapor", def: "Capa que limita el paso de vapor de agua para evitar condensaciones en el interior del sistema.", guia: "pladur-en-zonas-humedas" },
  { term: "SEER / SCOP", def: "Índices de rendimiento estacional en refrigeración y calefacción; cuanto mayores, más eficiente es el equipo.", guia: "eficiencia-en-climatizacion-residencial" },
  { term: "Bomba de calor inverter", def: "Equipo que modula la potencia del compresor según la demanda, mejorando eficiencia y confort.", guia: "eficiencia-en-climatizacion-residencial" },
  { term: "Ventilación de doble flujo", def: "Sistema que impulsa y extrae aire de forma mecánica, habitualmente con recuperación de calor.", guia: "limpieza-de-conductos-y-calidad-del-aire" },
  { term: "RITE", def: "Reglamento de Instalaciones Térmicas en los Edificios; fija exigencias de diseño, eficiencia y mantenimiento.", guia: "frecuencia-de-revision-de-conductos" },
];

export function getGlosarioOrdenado(): GlosarioEntry[] {
  return [...GLOSARIO].sort((a, b) => a.term.localeCompare(b.term, "es"));
}
