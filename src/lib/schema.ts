// Constructores del grafo JSON-LD.
// Regla: la empresa, el sitio, el fundador, los servicios y los conceptos se declaran una sola vez con @id estable;
// el resto de nodos los referencian con { "@id": ... }. Así buscadores e IA ven una única entidad.

import { CONCEPTOS, type Concepto } from "@/data/conceptos";
import {
  SERVICIOS,
  SERVICIOS_PATH,
  getRelacionados,
  servicioPath,
  serviciosDe,
  type Departamento,
  type Servicio,
} from "@/data/servicios";
import {
  ADDRESS,
  AUTHOR_DESCRIPTION,
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  AUTHOR_PATH,
  BASE_COMARCA,
  BASE_LOCALITY,
  BASE_PROVINCE,
  BRAND,
  EMAIL,
  GBP_URL,
  GEO,
  ID,
  SITE_DESCRIPTION,
  SITE_URL,
  PHONE,
  SAME_AS,
  absoluteUrl,
  breadcrumbId,
  conceptoId,
  pageId,
  servicioId,
} from "@/lib/entidad";

type Node = Record<string, unknown>;

export const ref = (id: string) => ({ "@id": id });

const address = { "@type": "PostalAddress", ...ADDRESS };

const geo = { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude };
const areaServed = [ref(ID.vendrell), ref(ID.comarca)];

const DEPARTAMENTO_ID = { climatizacion: ID.climatizacion, pladur: ID.pladur } as const;
const CATALOGO_ID = { climatizacion: ID.catalogoClimatizacion, pladur: ID.catalogoPladur } as const;

/** Nodo DefinedTerm de un concepto: definición visible en /glosario#{id}. */
function conceptoNode(c: Concepto): Node {
  return {
    "@type": "DefinedTerm",
    "@id": conceptoId(c.id),
    name: c.nombre,
    ...(c.alternateName ? { alternateName: c.alternateName } : {}),
    description: c.definicion,
    url: absoluteUrl(`/glosario#${c.id}`),
    inDefinedTermSet: ref(ID.glosario),
    ...(c.sameAs.length ? { sameAs: c.sameAs } : {}),
  };
}

/** Nodo Service con URL propia, enlazado a su departamento, conceptos y servicios relacionados. */
function servicioNode(s: Servicio): Node {
  const path = servicioPath(s.slug);
  return {
    "@type": "Service",
    "@id": servicioId(s.slug),
    name: s.nombre,
    url: absoluteUrl(path),
    description: s.resumen,
    serviceType: s.serviceType,
    category: s.conceptos.map((c) => ref(conceptoId(c))),
    provider: ref(DEPARTAMENTO_ID[s.departamento]),
    brand: ref(ID.negocio),
    areaServed,
    isRelatedTo: getRelacionados(s.slug).map((r) => ref(servicioId(r.servicio.slug))),
    // mainEntityOfPage se declara en la propia página del servicio, donde existe su nodo WebPage.
  };
}

function catalogoNode(dep: Departamento, name: string): Node {
  return {
    "@type": "OfferCatalog",
    "@id": CATALOGO_ID[dep],
    name,
    itemListElement: serviciosDe(dep).map((s) => ({ "@type": "Offer", itemOffered: ref(servicioId(s.slug)) })),
  };
}

/**
 * Nodos comunes a todo el sitio, inyectados en el <head> desde el layout raíz.
 * Capas: identidad (empresa, sitio, fundador), servicios, conceptos y territorio.
 * Todo nodo referenciado por la entidad raíz se define aquí para que cada página sea autosuficiente.
 */
export function siteGraph(): Node[] {
  return [
    // ── Identidad ──────────────────────────────────────────────
    {
      "@type": "WebSite",
      "@id": ID.website,
      url: SITE_URL,
      name: BRAND,
      inLanguage: "es-ES",
      publisher: ref(ID.negocio),
      about: ref(ID.negocio),
    },
    {
      // Entidad raíz. HomeAndConstructionBusiness hereda de LocalBusiness y Organization;
      // se declaran explícitamente para los analizadores que no infieren la jerarquía.
      "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": ID.negocio,
      name: BRAND,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      email: EMAIL,
      telephone: PHONE,
      logo: { "@type": "ImageObject", "@id": ID.logo, url: `${SITE_URL}/logo.svg`, contentUrl: `${SITE_URL}/logo.svg` },
      image: ref(ID.logo),
      address,
      geo,
      hasMap: GBP_URL,
      sameAs: SAME_AS,
      areaServed,
      founder: ref(ID.persona),
      knowsAbout: CONCEPTOS.map((c) => ref(conceptoId(c.id))),
      department: [ref(ID.climatizacion), ref(ID.pladur)],
      hasOfferCatalog: ref(ID.catalogo),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: EMAIL,
        telephone: PHONE,
        areaServed,
        availableLanguage: "es",
      },
      // Pendiente de datos reales (docs/backlog.md): otros perfiles sameAs (Instagram…), legalName,
      // taxID, vatID, coordenadas exactas del local, horario y credenciales.
    },
    personNode(),
    {
      "@type": "HVACBusiness",
      "@id": ID.climatizacion,
      name: `${BRAND} · Climatización y Conductos`,
      url: `${SITE_URL}/#climatizacion`,
      parentOrganization: ref(ID.negocio),
      email: EMAIL,
      telephone: PHONE,
      address,
      geo,
      areaServed,
      knowsAbout: ["climatizacion", "conducto-de-aire", "ventilacion", "extraccion-de-humos", "mantenimiento-de-instalaciones-termicas"].map(
        (c) => ref(conceptoId(c)),
      ),
      hasOfferCatalog: ref(ID.catalogoClimatizacion),
    },
    {
      // schema.org no define un tipo para pladur: GeneralContractor + additionalType.
      "@type": "GeneralContractor",
      "@id": ID.pladur,
      additionalType: "http://www.productontology.org/id/Drywall",
      name: `${BRAND} · Pladur y Aislamiento`,
      url: `${SITE_URL}/#pladur`,
      parentOrganization: ref(ID.negocio),
      email: EMAIL,
      telephone: PHONE,
      address,
      geo,
      areaServed,
      knowsAbout: ["placa-de-yeso-laminado", "aislamiento-termico", "aislamiento-acustico"].map((c) => ref(conceptoId(c))),
      hasOfferCatalog: ref(ID.catalogoPladur),
    },

    // ── Servicios ──────────────────────────────────────────────
    {
      "@type": "OfferCatalog",
      "@id": ID.catalogo,
      name: `Servicios de ${BRAND}`,
      url: absoluteUrl(SERVICIOS_PATH),
      itemListElement: [ref(ID.catalogoClimatizacion), ref(ID.catalogoPladur)],
    },
    catalogoNode("climatizacion", "Climatización, conductos y ventilación"),
    catalogoNode("pladur", "Pladur y aislamiento"),
    ...SERVICIOS.map(servicioNode),

    // ── Conceptos ──────────────────────────────────────────────
    {
      "@type": "DefinedTermSet",
      "@id": ID.glosario,
      name: `Glosario técnico de ${BRAND}`,
      url: absoluteUrl("/glosario"),
      inLanguage: "es-ES",
      publisher: ref(ID.negocio),
    },
    ...CONCEPTOS.map(conceptoNode),

    // ── Territorio ─────────────────────────────────────────────
    {
      "@type": "City",
      "@id": ID.vendrell,
      name: BASE_LOCALITY,
      sameAs: "https://es.wikipedia.org/wiki/El_Vendrell",
      containedInPlace: ref(ID.comarca),
    },
    {
      "@type": "AdministrativeArea",
      "@id": ID.comarca,
      name: BASE_COMARCA,
      sameAs: "https://es.wikipedia.org/wiki/Bajo_Panad%C3%A9s",
      containedInPlace: ref(ID.provincia),
    },
    { "@type": "AdministrativeArea", "@id": ID.provincia, name: `Provincia de ${BASE_PROVINCE}`, containedInPlace: ref(ID.cataluna) },
    { "@type": "AdministrativeArea", "@id": ID.cataluna, name: "Cataluña", containedInPlace: { "@type": "Country", name: "España" } },
  ];
}

/** Nodo Person del fundador y autor de las guías, con @id estable y vínculo a la empresa. */
export function personNode(extra: Node = {}): Node {
  return {
    "@type": "Person",
    "@id": ID.persona,
    name: AUTHOR_NAME,
    jobTitle: AUTHOR_JOB_TITLE,
    description: AUTHOR_DESCRIPTION,
    url: absoluteUrl(AUTHOR_PATH),
    worksFor: ref(ID.negocio),
    knowsAbout: CONCEPTOS.map((c) => ref(conceptoId(c.id))),
    // Pendiente (docs/backlog.md): sameAs (Instagram y otros perfiles) y credenciales.
    ...extra,
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList con @id por ruta. El primer elemento siempre es Inicio. */
export function breadcrumbNode(path: string, crumbs: Crumb[]): Node {
  const all: Crumb[] = [{ name: "Inicio", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Nodo de página (WebPage o subtipo) enlazado al sitio y, si procede, a su breadcrumb. */
export function pageNode({
  path,
  name,
  description,
  type = "WebPage",
  withBreadcrumb = true,
  ...extra
}: {
  path: string;
  name: string;
  description?: string;
  type?: string | string[];
  withBreadcrumb?: boolean;
} & Node): Node {
  return {
    "@type": type,
    "@id": pageId(path),
    url: absoluteUrl(path),
    name,
    ...(description ? { description } : {}),
    inLanguage: "es-ES",
    isPartOf: ref(ID.website),
    publisher: ref(ID.negocio),
    ...(withBreadcrumb ? { breadcrumb: ref(breadcrumbId(path)) } : {}),
    ...extra,
  };
}

/** Documento JSON-LD con @graph, escapado para incrustarlo en <script>. */
export function serializeGraph(nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}

/** Nodos Question/Answer para FAQPage. Solo recibe preguntas publicadas (src/data/faqs.ts). */
export function faqQuestions(faqs: { id: string; pregunta: string; respuesta: string; ampliada?: string }[], idBase?: string): Node[] {
  return faqs.map((f) => ({
    "@type": "Question",
    ...(idBase ? { "@id": `${idBase}#${f.id}` } : {}),
    name: f.pregunta,
    acceptedAnswer: { "@type": "Answer", text: f.ampliada ? `${f.respuesta} ${f.ampliada}` : f.respuesta },
  }));
}
