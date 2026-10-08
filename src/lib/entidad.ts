// Fuente única de verdad de la entidad Conductos Ergui.
// La consumen el grafo JSON-LD (src/lib/schema.ts), los metadatos (src/lib/seo.ts), la home,
// el formulario de contacto, robots y sitemap.
// Regla del proyecto: ningún dato de negocio se inventa. Lo que no consta queda fuera del grafo.

export const SITE_URL = "https://conductosergui.es";
export const BRAND = "Conductos Ergui";
export const EMAIL = "conductosergui@gmail.com";
// Teléfono tomado del enlace de WhatsApp del proyecto base (Header.tsx).
export const TELEPHONE = "+34652551861";

export const BASE_LOCALITY = "El Vendrell";
export const BASE_COMARCA = "Baix Penedès";
export const BASE_PROVINCE = "Tarragona";

// Centroide del municipio de El Vendrell, no la dirección del negocio (no consta).
// Sustituir por las coordenadas reales del local cuando se disponga de la dirección.
export const GEO = { latitude: 41.22043, longitude: 1.53501 } as const;

// Municipios del Baix Penedès. Distancia en línea recta entre centroides desde El Vendrell.
export const MUNICIPIOS_BAIX_PENEDES: readonly (readonly [string, number])[] = [
  ["El Vendrell", 0],
  ["Calafell", 3.5],
  ["Santa Oliva", 3.9],
  ["Bellvei", 4.2],
  ["Albinyana", 5.0],
  ["Llorenç del Penedès", 7.2],
  ["Banyeres del Penedès", 7.6],
  ["La Bisbal del Penedès", 7.8],
  ["L'Arboç", 7.9],
  ["Bonastre", 7.9],
  ["Cunit", 8.7],
  ["Sant Jaume dels Domenys", 9.1],
  ["Masllorenç", 11.4],
  ["El Montmell", 12.5],
];

export const SITE_TITLE = "Conductos Ergui | Climatización, Conductos y Pladur en El Vendrell";
export const SITE_DESCRIPTION =
  "Instalación y mantenimiento de climatización por conductos, tabiquería de pladur y aislamiento térmico y acústico en El Vendrell y la comarca del Baix Penedès (Tarragona).";

// Autor de las guías (dato del proyecto base, src/data/guias.ts).
export const AUTHOR_NAME = "Aitor Ergui";
export const AUTHOR_PATH = "/autor/aitor-ergui";

/** URL absoluta canónica de una ruta interna ("/" → dominio sin barra final, igual que la canónica de Next). */
export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/** @id del nodo WebPage (o subtipo) de una ruta. */
export function pageId(path: string): string {
  return path === "/" ? `${SITE_URL}/#webpage` : `${SITE_URL}${path}#webpage`;
}

/** @id del BreadcrumbList de una ruta. */
export function breadcrumbId(path: string): string {
  return path === "/" ? `${SITE_URL}/#breadcrumb` : `${SITE_URL}${path}#breadcrumb`;
}

// Identificadores estables del grafo. Toda referencia a la empresa, el sitio o el autor usa estos @id.
export const ID = {
  website: `${SITE_URL}/#website`,
  webpage: pageId("/"),
  negocio: `${SITE_URL}/#negocio`,
  persona: `${SITE_URL}${AUTHOR_PATH}#persona`,
  climatizacion: `${SITE_URL}/#climatizacion`,
  pladur: `${SITE_URL}/#pladur`,
  servicioClimatizacion: `${SITE_URL}/#servicio-climatizacion`,
  servicioPladur: `${SITE_URL}/#servicio-pladur`,
  vendrell: `${SITE_URL}/#el-vendrell`,
  comarca: `${SITE_URL}/#baix-penedes`,
  logo: `${SITE_URL}/#logo`,
} as const;
