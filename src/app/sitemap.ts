import type { MetadataRoute } from "next";
import { CLUSTERS, GUIAS, clusterSlug } from "@/data/guias";
import { SITE_URL } from "@/lib/entidad";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ["", "/presupuestador", "/guias", "/glosario", "/faq", "/compromiso", "/autor/aitor-ergui"];
  return [
    ...estaticas.map((p) => ({ url: `${SITE_URL}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...CLUSTERS.map((c) => ({ url: `${SITE_URL}/temas/${clusterSlug(c)}`, priority: 0.6 })),
    ...GUIAS.map((g) => ({ url: `${SITE_URL}/guias/${g.slug}`, lastModified: g.dateModified, priority: 0.6 })),
  ];
}
