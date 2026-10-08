import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Google_Sans_Flex, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieNotice } from "@/components/CookieNotice";
import {
  BASE_COMARCA,
  BASE_LOCALITY,
  BASE_PROVINCE,
  BRAND,
  EMAIL,
  GEO,
  ID,
  SITE_URL,
  TELEPHONE,
} from "@/lib/entidad";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-sans-app",
  display: "swap",
  adjustFontFallback: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const TITLE = "Conductos Ergui | Climatización, Conductos y Pladur en El Vendrell";
const DESCRIPTION =
  "Instalación y mantenimiento de climatización por conductos, tabiquería de pladur y aislamiento térmico y acústico en El Vendrell y la comarca del Baix Penedès (Tarragona).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | Conductos Ergui" },
  description: DESCRIPTION,
  applicationName: BRAND,
  keywords: [
    "climatización El Vendrell",
    "conductos de aire acondicionado El Vendrell",
    "mantenimiento de conductos Baix Penedès",
    "pladur El Vendrell",
    "tabiquería de pladur Baix Penedès",
    "aislamiento térmico y acústico El Vendrell",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND,
    locale: "es_ES",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  other: {
    "geo.region": "ES-T",
    "geo.placename": `${BASE_LOCALITY}, ${BASE_COMARCA}, ${BASE_PROVINCE}`,
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
};

export const viewport: Viewport = { themeColor: "#0b2748" };

const vendrell = {
  "@type": "City",
  "@id": ID.vendrell,
  name: BASE_LOCALITY,
  sameAs: "https://es.wikipedia.org/wiki/El_Vendrell",
  containedInPlace: { "@id": ID.comarca },
};

const comarca = {
  "@type": "AdministrativeArea",
  "@id": ID.comarca,
  name: BASE_COMARCA,
  sameAs: "https://es.wikipedia.org/wiki/Bajo_Panad%C3%A9s",
  containedInPlace: { "@type": "AdministrativeArea", name: `Provincia de ${BASE_PROVINCE}` },
};

const address = {
  "@type": "PostalAddress",
  addressLocality: BASE_LOCALITY,
  addressRegion: BASE_PROVINCE,
  addressCountry: "ES",
};

const geo = { "@type": "GeoCoordinates", latitude: GEO.latitude, longitude: GEO.longitude };
const areaServed = [{ "@id": ID.vendrell }, { "@id": ID.comarca }];

// Grafo unificado: LocalBusiness paraguas con dos departamentos (silos) y sus servicios.
// schema.org no define "PlasteringContractor": el silo de pladur se tipa como GeneralContractor
// y se desambigua con additionalType.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": ID.website,
      url: SITE_URL,
      name: BRAND,
      inLanguage: "es-ES",
      publisher: { "@id": ID.negocio },
    },
    {
      "@type": "WebPage",
      "@id": ID.webpage,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "es-ES",
      isPartOf: { "@id": ID.website },
      about: { "@id": ID.negocio },
      mainEntity: { "@id": ID.negocio },
    },
    {
      "@type": "LocalBusiness",
      "@id": ID.negocio,
      name: BRAND,
      url: SITE_URL,
      description: DESCRIPTION,
      email: EMAIL,
      telephone: TELEPHONE,
      logo: { "@type": "ImageObject", "@id": ID.logo, url: `${SITE_URL}/logo.svg` },
      image: { "@id": ID.logo },
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
      department: [{ "@id": ID.climatizacion }, { "@id": ID.pladur }],
      makesOffer: [
        { "@type": "Offer", itemOffered: { "@id": ID.servicioClimatizacion } },
        { "@type": "Offer", itemOffered: { "@id": ID.servicioPladur } },
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
      parentOrganization: { "@id": ID.negocio },
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
      "@type": "GeneralContractor",
      "@id": ID.pladur,
      additionalType: "http://www.productontology.org/id/Drywall",
      name: `${BRAND} · Pladur y Aislamiento`,
      url: `${SITE_URL}/#pladur`,
      parentOrganization: { "@id": ID.negocio },
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
      provider: { "@id": ID.climatizacion },
      areaServed,
    },
    {
      "@type": "Service",
      "@id": ID.servicioPladur,
      name: "Pladur, tabiquería y aislamiento",
      serviceType: "Construcción en seco y aislamiento",
      provider: { "@id": ID.pladur },
      areaServed,
    },
    vendrell,
    comarca,
  ],
};

// Escapa "<" para que ninguna cadena del grafo pueda cerrar la etiqueta <script>.
const jsonLd = JSON.stringify(graph).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-ES">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className={`min-h-screen ${googleSans.variable} ${instrumentSerif.variable}`}>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <WhatsAppButton />
        <CookieNotice />
      </body>
    </html>
  );
}
