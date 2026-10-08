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
  GEO,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/entidad";
import { serializeGraph, siteGraph } from "@/lib/schema";

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

const TITLE = SITE_TITLE;
const DESCRIPTION = SITE_DESCRIPTION;

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

// Nodos comunes a todas las rutas (sitio, entidad raíz, departamentos, servicios y lugares).
// Cada página añade su propio nodo de página y lo enlaza a estos por @id.
const jsonLd = serializeGraph(siteGraph());

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-ES">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className={`min-h-screen ${googleSans.variable} ${instrumentSerif.variable}`}>
        <a
          href="#contenido"
          className="sr-only z-[70] rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <CookieNotice />
      </body>
    </html>
  );
}
