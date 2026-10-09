// Service Graph: una entidad Service por servicio, con URL propia (/servicios/{slug}).
// Fuente del contenido: contenido/*.md, README original y la home del proyecto base.
// Regla: no se añade alcance, material ni afirmación que no figure en esas fuentes.

import type { ConceptoId } from "@/data/conceptos";
import type { Cluster } from "@/data/guias";

export type ServicioSlug =
  | "climatizacion"
  | "conductos"
  | "ventilacion"
  | "pladur"
  | "aislamiento-termico"
  | "aislamiento-acustico";

export type Departamento = "climatizacion" | "pladur";

/** Procedencia de cada afirmación de alcance (trazabilidad: nada sin fuente). */
export const FUENTES = {
  titular: "Confirmación del titular (Bryan Ergui), 09/10/2026",
  conductosMd: "contenido/conductos-aire.md",
  pladurMd: "contenido/instalacion-pladur.md",
  sitgesMd: "Borrador del proyecto base (aislamiento acústico), archivado en docs/archivo/",
  readme: "README del proyecto base",
  homeBase: "Home del proyecto base (ZIP)",
  glosario: "Glosario del sitio (src/data/guias.ts)",
} as const;

export type Fuente = keyof typeof FUENTES;
export type Alcance = { texto: string; fuente: Fuente };

export type Servicio = {
  slug: ServicioSlug;
  nombre: string;
  /** Segunda línea del H1 (serif itálica), igual que el resto de páginas. */
  acento: string;
  serviceType: string;
  departamento: Departamento;
  /** El primero es el concepto principal. */
  conceptos: ConceptoId[];
  resumen: string;
  /** Pregunta principal que responde la página (encabezado de la respuesta rápida). */
  pregunta: string;
  /** Respuesta directa (AEO), 40–60 palabras, construida solo con el alcance documentado. */
  respuestaRapida: string;
  alcance: Alcance[];
  materiales: string[];
  temas: Cluster[];
  /**
   * Profundidad editorial del contenido de apoyo (guías y temas).
   * "limitada": entidad publicada con menos contenido que el resto; candidata prioritaria
   * a ampliación editorial (ver docs/backlog.md). No se muestra al usuario.
   */
  profundidad: "completa" | "limitada";
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "climatizacion",
    nombre: "Climatización",
    acento: "por conductos, en todo el Baix Penedès.",
    serviceType: "Instalación y mantenimiento de climatización por conductos",
    departamento: "climatizacion",
    conceptos: ["climatizacion", "eficiencia-energetica", "mantenimiento-de-instalaciones-termicas"],
    resumen:
      "Instalación y mantenimiento de sistemas de climatización por conductos en El Vendrell y el Baix Penedès, con mejoras de eficiencia y equilibrado de caudales en instalaciones existentes.",
    pregunta: "¿Qué incluye el servicio de climatización por conductos?",
    respuestaRapida:
      "Conductos Ergui instala y mantiene sistemas de climatización por conductos en El Vendrell y el Baix Penedès. El servicio abarca el sistema completo: instalación, mantenimiento y reparación, mejoras de eficiencia y equilibrado de caudales, con rejillas y difusores integrados en techos técnicos. La red de conductos tiene su propio servicio.",
    alcance: [
      { texto: "Instalación de sistemas de climatización por conductos.", fuente: "titular" },
      { texto: "Climatización centralizada en viviendas, locales comerciales y naves.", fuente: "conductosMd" },
      { texto: "Mantenimiento y reparación de sistemas de aire acondicionado.", fuente: "readme" },
      { texto: "Mejoras de eficiencia en sistemas existentes y equilibrado de caudales.", fuente: "homeBase" },
      { texto: "Integración de rejillas de impulsión y retorno y difusores lineales en techos técnicos.", fuente: "conductosMd" },
      { texto: "Trabajo conforme al Reglamento de Instalaciones Térmicas en los Edificios (RITE).", fuente: "conductosMd" },
    ],
    materiales: ["Rejillas de impulsión y retorno", "Difusores lineales", "Compuertas de regulación"],
    temas: ["HVAC", "Mantenimiento"],
    profundidad: "completa",
  },
  {
    slug: "conductos",
    nombre: "Conductos de aire",
    acento: "diseño, montaje y mantenimiento de la red.",
    serviceType: "Instalación y mantenimiento de conductos de aire",
    departamento: "climatizacion",
    conceptos: ["conducto-de-aire", "mantenimiento-de-instalaciones-termicas"],
    resumen:
      "Diseño, montaje, reparación y limpieza de redes de conductos de aire acondicionado y ventilación en El Vendrell y el Baix Penedès, en panel de fibra de vidrio preaislado y en acero galvanizado.",
    pregunta: "¿Qué diferencia el servicio de conductos del de climatización?",
    respuestaRapida:
      "El servicio de conductos se centra en la red que distribuye el aire: diseño y dimensionado, montaje en panel de fibra de vidrio o acero galvanizado, reparación y sustitución de tramos, equilibrado, limpieza y aislamiento exterior frente a condensaciones. La climatización abarca el sistema completo; los conductos, su red de distribución.",
    alcance: [
      { texto: "Diseño y dimensionado de la red de impulsión y retorno.", fuente: "conductosMd" },
      { texto: "Montaje de conductos de panel de fibra de vidrio para climatización residencial y comercial.", fuente: "conductosMd" },
      {
        texto: "Conductos de acero galvanizado, helicoidales o rectangulares, para ventilación industrial, parkings y extracción.",
        fuente: "conductosMd",
      },
      { texto: "Adaptación, reparación y sustitución de tramos deteriorados; equilibrado de caudales.", fuente: "homeBase" },
      { texto: "Limpieza de conductos y aislamiento elastomérico exterior frente a condensaciones.", fuente: "conductosMd" },
      { texto: "Montaje de compuertas de regulación, rejillas y difusores.", fuente: "conductosMd" },
    ],
    materiales: [
      "Panel de fibra de vidrio preaislado (Climaver)",
      "Chapa de acero galvanizado helicoidal y rectangular",
      "Aislamiento elastomérico exterior",
    ],
    temas: ["Conductos", "Mantenimiento"],
    profundidad: "completa",
  },
  {
    slug: "ventilacion",
    nombre: "Ventilación",
    acento: "renovación de aire y extracción.",
    serviceType: "Instalación de redes de ventilación y extracción",
    departamento: "climatizacion",
    conceptos: ["ventilacion", "extraccion-de-humos"],
    resumen:
      "Diseño e instalación de redes de ventilación, renovación de aire y extracción en El Vendrell y el Baix Penedès, para viviendas, locales, cocinas industriales y naves.",
    pregunta: "¿Qué incluye el servicio de ventilación?",
    respuestaRapida:
      "Diseño e instalación de redes de ventilación forzada y de renovación de aire, extracción de humos en cocinas industriales y ventilación de naves y parkings, con conductos de acero galvanizado, en El Vendrell y la comarca del Baix Penedès.",
    alcance: [
      { texto: "Diseño e instalación de redes de ventilación.", fuente: "readme" },
      { texto: "Ventilación forzada y sistemas de renovación de aire.", fuente: "conductosMd" },
      { texto: "Extracción de humos en cocinas industriales.", fuente: "conductosMd" },
      { texto: "Redes de ventilación para naves industriales y parkings.", fuente: "conductosMd" },
    ],
    materiales: ["Chapa de acero galvanizado helicoidal y rectangular"],
    temas: [],
    // Sin guía ni tema propios: candidata prioritaria a ampliación editorial.
    profundidad: "limitada",
  },
  {
    slug: "pladur",
    nombre: "Pladur",
    acento: "tabiquería y techos que integran la instalación.",
    serviceType: "Tabiquería y falsos techos de placa de yeso laminado",
    departamento: "pladur",
    conceptos: ["placa-de-yeso-laminado"],
    resumen:
      "Tabiquería, trasdosados y falsos techos de placa de yeso laminado en El Vendrell y el Baix Penedès, diseñados para integrar las instalaciones de climatización.",
    pregunta: "¿Qué trabajos de pladur realiza Conductos Ergui?",
    respuestaRapida:
      "Tabiques y trasdosados de placa de yeso laminado, falsos techos continuos y registrables, cajones técnicos para ocultar conductos e instalaciones, y placa hidrófuga o ignífuga según la estancia. Se diseñan para integrar la climatización y ejecutar pladur y conductos de forma coordinada en una misma obra.",
    alcance: [
      { texto: "Tabiques y trasdosados de placa de yeso laminado.", fuente: "readme" },
      {
        texto: "Falsos techos continuos y registrables, con accesos para el mantenimiento de equipos y conductos.",
        fuente: "pladurMd",
      },
      { texto: "Cajones técnicos para ocultar conductos e instalaciones.", fuente: "homeBase" },
      { texto: "Placa hidrófuga en baños, cocinas y zonas húmedas.", fuente: "pladurMd" },
      { texto: "Placa ignífuga en salas técnicas y sectores de incendio, según el Código Técnico de la Edificación.", fuente: "pladurMd" },
      { texto: "Replanteo preciso y acabados listos para pintura o revestimiento.", fuente: "homeBase" },
    ],
    materiales: ["Placa de yeso laminado", "Placa hidrófuga", "Placa ignífuga", "Perfilería metálica"],
    temas: ["Pladur"],
    profundidad: "completa",
  },
  {
    slug: "aislamiento-termico",
    nombre: "Aislamiento térmico",
    acento: "menos demanda, mejor rendimiento.",
    serviceType: "Aislamiento térmico en construcción en seco",
    departamento: "pladur",
    conceptos: ["aislamiento-termico", "eficiencia-energetica"],
    resumen:
      "Aislamiento térmico con lana mineral en trasdosados y falsos techos de pladur en El Vendrell y el Baix Penedès, para reducir la demanda energética y mejorar el rendimiento de la climatización.",
    pregunta: "¿Cómo se mejora el aislamiento térmico con pladur?",
    respuestaRapida:
      "Se colocan paneles de lana de roca o de fibra de vidrio en trasdosados y en el plenum de los falsos techos. Así se reduce la transmisión de calor a través de los cerramientos, baja la demanda energética, mejora el rendimiento de la climatización y disminuye el riesgo de condensaciones. Su objetivo es el calor, no el ruido.",
    alcance: [
      { texto: "Paneles de lana de roca y de fibra de vidrio en trasdosados.", fuente: "pladurMd" },
      { texto: "Aislamiento en el plenum de los falsos techos.", fuente: "pladurMd" },
      { texto: "Trasdosados sobre muros existentes para mejorar su comportamiento térmico.", fuente: "glosario" },
      { texto: "Aislamiento elastomérico exterior en conductos para evitar condensaciones.", fuente: "conductosMd" },
    ],
    materiales: ["Lana de roca", "Lana de vidrio", "Aislamiento elastomérico"],
    temas: ["Aislamiento"],
    profundidad: "completa",
  },
  {
    slug: "aislamiento-acustico",
    nombre: "Aislamiento acústico",
    acento: "menos ruido entre estancias.",
    serviceType: "Aislamiento acústico en construcción en seco",
    departamento: "pladur",
    conceptos: ["aislamiento-acustico"],
    resumen:
      "Aislamiento acústico con sistemas multicapa de placa de yeso laminado y lana mineral en El Vendrell y el Baix Penedès, para reducir la transmisión de ruido entre estancias.",
    pregunta: "¿Cómo se reduce el ruido entre estancias con pladur?",
    respuestaRapida:
      "Con sistemas multicapa de placa de yeso laminado y lana de roca de alta densidad: la masa de las placas, el efecto muelle de la lana y la estanqueidad de juntas y cajas reducen la transmisión del sonido. A diferencia del aislamiento térmico, el objetivo es el ruido, no el calor.",
    alcance: [
      { texto: "Sistemas multicapa de placa de yeso laminado con lana de roca de alta densidad.", fuente: "sitgesMd" },
      { texto: "Trasdosados acústicos sobre muros existentes.", fuente: "sitgesMd" },
      { texto: "Tabiques autoportantes con material absorbente en la cámara.", fuente: "glosario" },
      { texto: "Absorción de la reverberación en el plenum de los falsos techos.", fuente: "pladurMd" },
    ],
    materiales: ["Placa de yeso laminado", "Lana de roca de alta densidad"],
    temas: ["Aislamiento"],
    profundidad: "completa",
  },
];

/** Relaciones entre servicios (simétricas), con el motivo visible en cada página. */
export const RELACIONES: { a: ServicioSlug; b: ServicioSlug; motivo: string }[] = [
  { a: "conductos", b: "climatizacion", motivo: "La red de conductos distribuye el aire tratado por el equipo de climatización." },
  { a: "conductos", b: "ventilacion", motivo: "Las redes de ventilación y extracción se ejecutan con conductos, habitualmente de acero galvanizado." },
  {
    a: "pladur",
    b: "conductos",
    motivo: "Los falsos techos y cajones de pladur alojan y ocultan la red de conductos; ambos trabajos se coordinan en la misma obra.",
  },
  { a: "pladur", b: "aislamiento-termico", motivo: "El aislamiento se coloca en la cámara de los trasdosados y en el plenum de los falsos techos." },
  { a: "pladur", b: "aislamiento-acustico", motivo: "El aislamiento acústico en seco se basa en sistemas de placa de yeso laminado y lana mineral." },
  { a: "aislamiento-termico", b: "climatizacion", motivo: "Reducir la demanda térmica del edificio mejora el rendimiento de la climatización." },
  { a: "aislamiento-termico", b: "aislamiento-acustico", motivo: "La lana mineral de los trasdosados aporta comportamiento térmico y acústico." },
];

export const SERVICIOS_PATH = "/servicios";
export const servicioPath = (slug: ServicioSlug) => `${SERVICIOS_PATH}/${slug}`;

export function getServicio(slug: string): Servicio | undefined {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function getRelacionados(slug: ServicioSlug): { servicio: Servicio; motivo: string }[] {
  return RELACIONES.filter((r) => r.a === slug || r.b === slug).map((r) => ({
    servicio: getServicio(r.a === slug ? r.b : r.a) as Servicio,
    motivo: r.motivo,
  }));
}

export function serviciosDe(departamento: Departamento): Servicio[] {
  return SERVICIOS.filter((s) => s.departamento === departamento);
}

/** Servicios cuyo concepto principal o secundario coincide con alguno de los dados. */
export function serviciosPorConceptos(ids: readonly ConceptoId[]): Servicio[] {
  return SERVICIOS.filter((s) => s.conceptos.some((c) => ids.includes(c)));
}
