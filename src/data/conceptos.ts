// Capa de conceptos del Knowledge Graph.
// Cada concepto es un DefinedTerm con @id estable dentro del glosario (/glosario#{id}) y definición visible.
// Es el nodo compartido al que apuntan la empresa (knowsAbout), los servicios (category),
// los temas y las guías (about/mentions).
//
// sameAs: vacío a propósito. Los identificadores de Wikidata no se han podido verificar desde
// el entorno de desarrollo (bloqueador B6). Añadir solo URIs verificadas.

export type ConceptoId =
  | "climatizacion"
  | "conducto-de-aire"
  | "ventilacion"
  | "extraccion-de-humos"
  | "placa-de-yeso-laminado"
  | "aislamiento-termico"
  | "aislamiento-acustico"
  | "eficiencia-energetica"
  | "mantenimiento-de-instalaciones-termicas";

export type Concepto = {
  id: ConceptoId;
  nombre: string;
  alternateName?: string[];
  definicion: string;
  sameAs: string[];
};

export const CONCEPTOS: Concepto[] = [
  {
    id: "climatizacion",
    nombre: "Climatización",
    alternateName: ["HVAC", "Aire acondicionado"],
    definicion:
      "Conjunto de técnicas e instalaciones que controlan la temperatura, la humedad y la calidad del aire de un espacio para mantener condiciones de confort.",
    sameAs: [],
  },
  {
    id: "conducto-de-aire",
    nombre: "Conducto de aire",
    alternateName: ["Conductos de climatización", "Red de conductos"],
    definicion:
      "Canalización que transporta el aire tratado desde el equipo hasta las rejillas y difusores, y lo devuelve por el retorno. Se fabrica habitualmente en panel de lana de vidrio o en chapa de acero galvanizado.",
    sameAs: [],
  },
  {
    id: "ventilacion",
    nombre: "Ventilación",
    alternateName: ["Renovación de aire", "Ventilación forzada"],
    definicion:
      "Renovación del aire interior de un espacio mediante su intercambio con aire exterior, de forma natural o mecánica, para mantener la calidad del aire.",
    sameAs: [],
  },
  {
    id: "extraccion-de-humos",
    nombre: "Extracción de humos",
    definicion:
      "Evacuación mecánica al exterior de los humos, vapores y grasas generados en cocinas u otros procesos, mediante campana, conducto y ventilador.",
    sameAs: [],
  },
  {
    id: "placa-de-yeso-laminado",
    nombre: "Placa de yeso laminado",
    alternateName: ["PYL", "Pladur"],
    definicion:
      "Placa de núcleo de yeso revestida con láminas de cartón, base de los sistemas de tabiquería, trasdosados y techos en seco. «Pladur» es el nombre comercial con el que se conoce de forma habitual.",
    sameAs: [],
  },
  {
    id: "aislamiento-termico",
    nombre: "Aislamiento térmico",
    definicion:
      "Capacidad de un material o sistema constructivo para reducir la transmisión de calor entre dos ambientes; en la edificación limita las pérdidas en invierno y las ganancias en verano.",
    sameAs: [],
  },
  {
    id: "aislamiento-acustico",
    nombre: "Aislamiento acústico",
    definicion:
      "Conjunto de soluciones que reducen la transmisión del sonido entre recintos o desde el exterior; en construcción en seco combina placas, cámaras de aire y material absorbente.",
    sameAs: [],
  },
  {
    id: "eficiencia-energetica",
    nombre: "Eficiencia energética",
    definicion:
      "Relación entre el servicio obtenido, como el confort térmico, y la energía consumida para obtenerlo; mejora al reducir la demanda del edificio y al emplear equipos de mayor rendimiento.",
    sameAs: [],
  },
  {
    id: "mantenimiento-de-instalaciones-termicas",
    nombre: "Mantenimiento de instalaciones térmicas",
    definicion:
      "Operaciones periódicas de revisión, limpieza y comprobación que exige el RITE para conservar la seguridad, el rendimiento y la salubridad de las instalaciones de climatización y ventilación.",
    sameAs: [],
  },
];

export function getConcepto(id: ConceptoId): Concepto {
  const c = CONCEPTOS.find((x) => x.id === id);
  if (!c) throw new Error(`Concepto desconocido: ${id}`);
  return c;
}

/** Conceptos que trata cada tema editorial (/temas/*). */
export const CONCEPTOS_POR_TEMA = {
  Conductos: ["conducto-de-aire"],
  HVAC: ["climatizacion", "eficiencia-energetica"],
  Mantenimiento: ["mantenimiento-de-instalaciones-termicas"],
  Pladur: ["placa-de-yeso-laminado"],
  Aislamiento: ["aislamiento-termico", "aislamiento-acustico"],
} as const satisfies Record<string, readonly ConceptoId[]>;
