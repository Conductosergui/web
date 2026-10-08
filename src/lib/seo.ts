import type { Metadata } from "next";
import { BASE_COMARCA, BASE_LOCALITY, BRAND } from "@/lib/entidad";

// Metadatos homogéneos por ruta: canónica, Open Graph y Twitter.
// Next sustituye (no fusiona) el objeto openGraph del layout cuando una página define el suyo,
// por eso cada página los genera completos con esta función.

// Imagen social generada en src/app/opengraph-image.tsx y twitter-image.tsx.
// Se declara explícitamente porque las páginas con openGraph propio no heredan la del layout.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${BRAND} · Climatización y Pladur en ${BASE_LOCALITY} y ${BASE_COMARCA}`;
const OG_IMAGE = { url: "/opengraph-image", ...OG_SIZE, alt: OG_ALT, type: "image/png" };
const TWITTER_IMAGE = { url: "/twitter-image", ...OG_SIZE, alt: OG_ALT };

type Options = {
  /** Título sin la marca: el layout añade " | Conductos Ergui" mediante la plantilla. */
  title: string;
  description: string;
  /** Ruta canónica interna, p. ej. "/guias". */
  path: string;
  /** Título completo sin plantilla (solo la home). */
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  openGraph?: Record<string, unknown>;
  robots?: Metadata["robots"];
};

export function buildMetadata({ title, description, path, absoluteTitle, type = "website", openGraph, robots }: Options): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${BRAND}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: BRAND,
      locale: "es_ES",
      url: path,
      title: fullTitle,
      description,
      images: [OG_IMAGE],
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [TWITTER_IMAGE] },
    ...(robots ? { robots } : {}),
  };
}
