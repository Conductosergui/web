// Registro territorial canónico (ADR-001, docs/adr/).
// Única fuente del territorio: sede, área servida, territorios prioritarios y secundarios.
// Módulo de datos puros: no importa nada de entidad.ts (que deriva de aquí sus constantes y @id).
//
// Capas (ADR-001 y su propuesta de implementación, decisiones D1–D8 del 10/10/2026):
// - SEDE: ubicación física del negocio. Hay exactamente una.
// - AREA_SERVIDA: radio operativo de 50 km desde las coordenadas de la sede (GeoCircle). No enumera municipios.
// - PRIORITARIO: territorio con página indexable y estrategia de autoridad (Baix Penedès y El Vendrell).
// - SECUNDARIO: municipio de un territorio prioritario sin página propia (los 13 del Baix Penedès).
// - Cobertura operativa (dentro del radio y fuera del Baix Penedès): sin registro, solo referencia genérica al radio.

export type TipoTerritorio = "pais" | "comunidad" | "provincia" | "comarca" | "municipio" | "nucleo";
export type Categoria = "PRIORITARIO" | "SECUNDARIO" | "CONTEXTO";

export type Territorio = {
  /** Clave estable del registro. */
  clave: string;
  nombre: string;
  tipo: TipoTerritorio;
  categoria: Categoria;
  /** Territorio que lo contiene (containedInPlace). */
  contenidoEn?: string;
  /**
   * Ruta y fragmento que forman su @id: `${SITE_URL}${idPath}`. Los @id existentes se conservan
   * tal cual (ADR-001 §4); los municipios secundarios aún no se publican en el grafo (fase F2).
   */
  idPath: string;
  /** Página propia indexable (solo territorios prioritarios). */
  ruta?: string;
  /** Distancia en línea recta entre centroides municipales desde El Vendrell, en km. */
  distanciaKm?: number;
  /** Identificadores externos verificados. */
  sameAs?: string;
};

export const TERRITORIOS: readonly Territorio[] = [
  // Contexto administrativo (sin página propia)
  { clave: "cataluna", nombre: "Cataluña", tipo: "comunidad", categoria: "CONTEXTO", idPath: "/#cataluna" },
  {
    clave: "provincia-de-tarragona",
    nombre: "Tarragona",
    tipo: "provincia",
    categoria: "CONTEXTO",
    contenidoEn: "cataluna",
    idPath: "/#provincia-de-tarragona",
  },

  // Territorios prioritarios (D1, D2)
  {
    clave: "baix-penedes",
    nombre: "Baix Penedès",
    tipo: "comarca",
    categoria: "PRIORITARIO",
    contenidoEn: "provincia-de-tarragona",
    idPath: "/#baix-penedes",
    ruta: "/baix-penedes",
    sameAs: "https://es.wikipedia.org/wiki/Bajo_Panad%C3%A9s",
  },
  {
    clave: "el-vendrell",
    nombre: "El Vendrell",
    tipo: "municipio",
    categoria: "PRIORITARIO",
    contenidoEn: "baix-penedes",
    idPath: "/#el-vendrell",
    ruta: "/el-vendrell",
    distanciaKm: 0,
    sameAs: "https://es.wikipedia.org/wiki/El_Vendrell",
  },

  // Núcleo dependiente de El Vendrell (D4): sección de /el-vendrell, sin página propia.
  // Hereda la categoría de su municipio (D2: Coma-ruga pertenece a El Vendrell).
  {
    clave: "coma-ruga",
    nombre: "Coma-ruga",
    tipo: "nucleo",
    categoria: "PRIORITARIO",
    contenidoEn: "el-vendrell",
    idPath: "/el-vendrell#coma-ruga",
  },

  // Territorios secundarios: municipios del Baix Penedès sin página propia, ordenados por distancia
  { clave: "calafell", nombre: "Calafell", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#calafell", distanciaKm: 3.5 },
  { clave: "santa-oliva", nombre: "Santa Oliva", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#santa-oliva", distanciaKm: 3.9 },
  { clave: "bellvei", nombre: "Bellvei", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#bellvei", distanciaKm: 4.2 },
  { clave: "albinyana", nombre: "Albinyana", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#albinyana", distanciaKm: 5.0 },
  { clave: "llorenc-del-penedes", nombre: "Llorenç del Penedès", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#llorenc-del-penedes", distanciaKm: 7.2 },
  { clave: "banyeres-del-penedes", nombre: "Banyeres del Penedès", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#banyeres-del-penedes", distanciaKm: 7.6 },
  { clave: "la-bisbal-del-penedes", nombre: "La Bisbal del Penedès", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#la-bisbal-del-penedes", distanciaKm: 7.8 },
  { clave: "l-arboc", nombre: "L'Arboç", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#l-arboc", distanciaKm: 7.9 },
  { clave: "bonastre", nombre: "Bonastre", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#bonastre", distanciaKm: 7.9 },
  { clave: "cunit", nombre: "Cunit", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#cunit", distanciaKm: 8.7 },
  { clave: "sant-jaume-dels-domenys", nombre: "Sant Jaume dels Domenys", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#sant-jaume-dels-domenys", distanciaKm: 9.1 },
  { clave: "masllorenc", nombre: "Masllorenç", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#masllorenc", distanciaKm: 11.4 },
  { clave: "el-montmell", nombre: "El Montmell", tipo: "municipio", categoria: "SECUNDARIO", contenidoEn: "baix-penedes", idPath: "/baix-penedes#el-montmell", distanciaKm: 12.5 },
];

/** Sede: ubicación física del negocio (dirección y coordenadas facilitadas por el titular). */
export const SEDE = {
  municipio: "el-vendrell",
  comarca: "baix-penedes",
  provincia: "provincia-de-tarragona",
  direccion: { streetAddress: "Carrer Romaní 11", postalCode: "43700", addressCountry: "ES" },
  geo: { latitude: 41.220202, longitude: 1.534805 },
} as const;

/** Área servida (D3, D5): radio operativo desde las coordenadas de la sede. Sin enumeración de municipios. */
export const AREA_SERVIDA = {
  radioKm: 50,
  /** Territorios prioritarios que se declaran junto al GeoCircle en areaServed (D5, opción A). */
  prioritariosEnAreaServed: ["baix-penedes"],
} as const;

export function territorio(clave: string): Territorio {
  const t = TERRITORIOS.find((x) => x.clave === clave);
  if (!t) throw new Error(`Territorio desconocido: ${clave}`);
  return t;
}

/** Municipios de un territorio (los municipios cuyo contenidoEn es esa clave), ordenados por distancia. */
export function municipiosDe(clave: string): Territorio[] {
  return TERRITORIOS.filter((t) => t.tipo === "municipio" && t.contenidoEn === clave).sort(
    (a, b) => (a.distanciaKm ?? 0) - (b.distanciaKm ?? 0),
  );
}
