// Fuente única de verdad de la entidad Conductos Ergui.
// La consumen el grafo JSON-LD (src/lib/schema.ts), los metadatos (src/lib/seo.ts), la home,
// el formulario de contacto, robots y sitemap.
// Regla del proyecto: ningún dato de negocio se inventa. Lo que no consta queda fuera del grafo.
// El territorio (sede, área servida, prioritarios y secundarios) se define en territorio.ts (ADR-001);
// aquí solo se derivan de él las constantes que consumen el resto de módulos.

import { SEDE, municipiosDe, territorio } from "@/lib/territorio";

export const SITE_URL = "https://conductosergui.es";
export const BRAND = "Conductos Ergui";
export const EMAIL = "conductosergui@gmail.com";
// Teléfono corporativo (facilitado por el titular). Fuente única para JSON-LD, enlaces tel: y WhatsApp.
export const PHONE = "+34622368999";
export const PHONE_FORMATTED = "+34 622 36 89 99";

// Mensajes prerrellenados de WhatsApp.
export const WHATSAPP_MSG_PRESUPUESTO =
  "Hola, me gustaría solicitar información o un presupuesto para un proyecto en el Baix Penedès.";
export const WHATSAPP_MSG_URGENCIA =
  "Hola, necesito asistencia técnica o consulta urgente sobre una instalación en la zona del Baix Penedès.";

/** Enlace directo a WhatsApp con un mensaje prerrellenado. */
export function whatsappUrl(text: string = WHATSAPP_MSG_PRESUPUESTO): string {
  return `https://wa.me/${PHONE.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
export const WHATSAPP_URL = whatsappUrl(WHATSAPP_MSG_PRESUPUESTO);
export const WHATSAPP_URGENCIA_URL = whatsappUrl(WHATSAPP_MSG_URGENCIA);

export const BASE_LOCALITY = territorio(SEDE.municipio).nombre;
export const BASE_COMARCA = territorio(SEDE.comarca).nombre;
export const BASE_PROVINCE = territorio(SEDE.provincia).nombre;

// Dirección física del negocio (facilitada por el titular; coincide con la ficha de Google Business Profile).
export const ADDRESS = {
  streetAddress: SEDE.direccion.streetAddress,
  addressLocality: BASE_LOCALITY,
  postalCode: SEDE.direccion.postalCode,
  addressRegion: BASE_PROVINCE,
  addressCountry: SEDE.direccion.addressCountry,
} as const;
export const ADDRESS_TEXT = `${ADDRESS.streetAddress}, ${ADDRESS.postalCode} ${ADDRESS.addressLocality} (${ADDRESS.addressRegion})`;

// Ficha de Google Business Profile (enlace compartido de Google Maps facilitado por el titular).
export const GBP_URL = "https://share.google/vw7GEPfgwZeaARWBb";
// Perfiles oficiales de la entidad (sameAs). Añadir aquí Instagram y otros cuando consten.
export const SAME_AS: readonly string[] = [GBP_URL];

// Coordenadas exactas del local (Carrer Romaní 11), facilitadas por el titular.
export const GEO = SEDE.geo;

// Municipios del Baix Penedès (prioritario + secundarios). Distancia en línea recta entre centroides desde El Vendrell.
export const MUNICIPIOS_BAIX_PENEDES: readonly (readonly [string, number])[] = municipiosDe(SEDE.comarca).map(
  (t) => [t.nombre, t.distanciaKm ?? 0] as const,
);

// Páginas de los territorios prioritarios (ADR-001, D1–D2).
export const ZONA_COMARCA_PATH = territorio(SEDE.comarca).ruta as string;
export const ZONA_SEDE_PATH = territorio(SEDE.municipio).ruta as string;

export const SITE_TITLE = "Conductos Ergui | Climatización, Conductos y Pladur en El Vendrell";
export const SITE_DESCRIPTION =
  "Instalación y mantenimiento de climatización por conductos, tabiquería de pladur y aislamiento térmico y acústico en El Vendrell y la comarca del Baix Penedès (Tarragona).";

// Fundador y persona física titular del negocio (dato facilitado por el titular).
// Sustituye al autor del proyecto base ("Aitor Ergui"); /autor/aitor-ergui redirige aquí (next.config.ts).
export const AUTHOR_NAME = "Bryan Ergui";
export const AUTHOR_PATH = "/autor/bryan-ergui";
export const AUTHOR_JOB_TITLE = "Fundador";
export const AUTHOR_YEARS_EXPERIENCE = 10;
export const AUTHOR_DESCRIPTION = `Fundador y titular de Conductos Ergui, con ${AUTHOR_YEARS_EXPERIENCE} años de experiencia profesional.`;

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

/** @id de un territorio del registro canónico (territorio.ts). */
export function territorioId(clave: string): string {
  return `${SITE_URL}${territorio(clave).idPath}`;
}

// Identificadores estables del grafo. Toda referencia a la empresa, el sitio o el autor usa estos @id.
export const ID = {
  website: `${SITE_URL}/#website`,
  webpage: pageId("/"),
  negocio: `${SITE_URL}/#negocio`,
  persona: `${SITE_URL}${AUTHOR_PATH}#persona`,
  // Departamentos (silos de la home)
  climatizacion: `${SITE_URL}/#climatizacion`,
  pladur: `${SITE_URL}/#pladur`,
  // Catálogos de servicios: raíz → departamentos → Service
  catalogo: `${SITE_URL}/servicios#catalogo`,
  catalogoClimatizacion: `${SITE_URL}/servicios#catalogo-climatizacion`,
  catalogoPladur: `${SITE_URL}/servicios#catalogo-pladur`,
  // Capa de conceptos
  glosario: `${SITE_URL}/glosario#terminos`,
  // Territorio (idPath en territorio.ts)
  vendrell: territorioId(SEDE.municipio),
  comarca: territorioId(SEDE.comarca),
  provincia: territorioId(SEDE.provincia),
  cataluna: territorioId("cataluna"),
  // Núcleo costero del municipio de El Vendrell (sección propia en /el-vendrell)
  comaRuga: territorioId("coma-ruga"),
  logo: `${SITE_URL}/#logo`,
} as const;

/** @id de un concepto del glosario (DefinedTerm). */
export const conceptoId = (id: string) => `${SITE_URL}/glosario#${id}`;

/** @id de un servicio (Service) en su página propia. */
export const servicioId = (slug: string) => `${SITE_URL}/servicios/${slug}#servicio`;
