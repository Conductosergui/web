import type { MetadataRoute } from "next";
import { CLUSTERS, GUIAS, clusterSlug, temaIndexable } from "@/data/guias";
import { SERVICIOS, SERVICIOS_PATH, servicioPath } from "@/data/servicios";
import { AUTHOR_PATH, ZONA_COMARCA_PATH, ZONA_SEDE_PATH, absoluteUrl } from "@/lib/entidad";

// Solo rutas indexables que existen y devuelven 200. No incluye anclas (#), rutas técnicas
// (opengraph-image, icon) ni páginas inexistentes como /temas.
const ESTATICAS = [
  "/",
  SERVICIOS_PATH,
  ZONA_COMARCA_PATH,
  ZONA_SEDE_PATH,
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
    // Temas con menos de MIN_GUIAS_TEMA_INDEXABLE guías: noindex, fuera del sitemap.
    ...CLUSTERS.filter(temaIndexable).map((c) => ({ url: absoluteUrl(`/temas/${clusterSlug(c)}`) })),
    // Fechas editoriales fijadas por el titular: ya son fiables para lastmod.
    ...GUIAS.map((g) => ({ url: absoluteUrl(`/guias/${g.slug}`), lastModified: g.dateModified })),
  ];
}
