// Constructores del grafo JSON-LD.
// Regla: la empresa, el sitio y el autor se declaran una sola vez con @id estable;
// el resto de nodos los referencian con { "@id": ... }. Así buscadores e IA ven una única entidad.

import {
  AUTHOR_NAME,
  AUTHOR_PATH,
  BASE_COMARCA,
  BASE_LOCALITY,
  BASE_PROVINCE,
  BRAND,
  EMAIL,
  GEO,
  ID,
  SITE_DESCRIPTION,
  SITE_URL,
  TELEPHONE,
  absoluteUrl,
  breadcrumbId,
  pageId,
} from "@/lib/entidad";

type Node = Record<string, unknown>;

export const ref = (id: string) => ({ "@id": id });

const address = {
  "@type": "PostalAddress",
  addressLocality: BASE_LOCALITY,
  addressRegion: BASE_PROVINCE,
  addressCountry: "ES",
};

const geo = { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude };
const areaServed = [ref(ID.vendrell), ref(ID.comarca)];

/** Nodos comunes a todo el sitio. Se inyectan una vez en el <head> desde el layout raíz. */
export function siteGraph(): Node[] {
  return [
    {
      "@type": "WebSite",
      "@id": ID.website,
      url: SITE_URL,
      name: BRAND,
      inLanguage: "es-ES",
      publisher: ref(ID.negocio),
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
      telephone: TELEPHONE,
      logo: { "@type": "ImageObject", "@id": ID.logo, url: `${SITE_URL}/logo.svg`, contentUrl: `${SITE_URL}/logo.svg` },
      image: ref(ID.logo),
      address,
      geo,
      areaServed,
      knowsAbout: [
        "Climatización por conductos",
        "Conductos de fibra de vidrio",
        "Conductos de acero galvanizado",
        "Ventilación y extracción",
        "Placa de yeso laminado",
        "Tabiquería seca",
        "Aislamiento térmico",
        "Aislamiento acústico",
      ],
      department: [ref(ID.climatizacion), ref(ID.pladur)],
      makesOffer: [
        { "@type": "Offer", itemOffered: ref(ID.servicioClimatizacion) },
        { "@type": "Offer", itemOffered: ref(ID.servicioPladur) },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: EMAIL,
        telephone: TELEPHONE,
        areaServed,
        availableLanguage: "es",
      },
    },
    {
      "@type": "HVACBusiness",
      "@id": ID.climatizacion,
      name: `${BRAND} · Climatización y Conductos`,
      url: `${SITE_URL}/#climatizacion`,
      parentOrganization: ref(ID.negocio),
      email: EMAIL,
      telephone: TELEPHONE,
      address,
      geo,
      areaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Climatización, instalación y mantenimiento de conductos",
        itemListElement: [
          "Instalación de conductos de climatización",
          "Mantenimiento y reparación de sistemas de aire acondicionado",
          "Diseño e instalación de redes de ventilación",
          "Limpieza de conductos",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
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
      telephone: TELEPHONE,
      address,
      geo,
      areaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Pladur, tabiquería y aislamiento",
        itemListElement: [
          "Tabiquería y trasdosados de pladur",
          "Falsos techos continuos y registrables",
          "Aislamiento térmico y acústico con lana de roca",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "Service",
      "@id": ID.servicioClimatizacion,
      name: "Climatización, instalación y mantenimiento de conductos",
      serviceType: "Climatización por conductos",
      provider: ref(ID.climatizacion),
      areaServed,
    },
    {
      "@type": "Service",
      "@id": ID.servicioPladur,
      name: "Pladur, tabiquería y aislamiento",
      serviceType: "Construcción en seco y aislamiento",
      provider: ref(ID.pladur),
      areaServed,
    },
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
      containedInPlace: { "@type": "AdministrativeArea", name: `Provincia de ${BASE_PROVINCE}` },
    },
  ];
}

/** Nodo Person del autor, con @id estable y vínculo a la empresa. */
export function personNode(extra: Node = {}): Node {
  return {
    "@type": "Person",
    "@id": ID.persona,
    name: AUTHOR_NAME,
    url: absoluteUrl(AUTHOR_PATH),
    worksFor: ref(ID.negocio),
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
