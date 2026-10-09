import type { MetadataRoute } from "next";
import { CLUSTERS, GUIAS, clusterSlug } from "@/data/guias";
import { SERVICIOS, SERVICIOS_PATH, servicioPath } from "@/data/servicios";
import { AUTHOR_PATH, absoluteUrl } from "@/lib/entidad";

// Solo rutas indexables que existen y devuelven 200. No incluye anclas (#), rutas técnicas
// (opengraph-image, icon) ni páginas inexistentes como /temas.
// lastModified se omite a propósito: las fechas de las guías están pendientes de verificación
// y Google ignora lastmod cuando no es fiable.
const ESTATICAS = [
  "/",
  SERVICIOS_PATH,
  "/guias",
  "/glosario",
  "/faq",
  "/presupuestador",
  "/compromiso",
  AUTHOR_PATH,
  "/legal/terminos",
  "/legal/privacidad",
  "/legal/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...ESTATICAS.map((p) => ({ url: absoluteUrl(p) })),
    ...SERVICIOS.map((s) => ({ url: absoluteUrl(servicioPath(s.slug)) })),
    ...CLUSTERS.map((c) => ({ url: absoluteUrl(`/temas/${clusterSlug(c)}`) })),
    ...GUIAS.map((g) => ({ url: absoluteUrl(`/guias/${g.slug}`) })),
  ];
}
