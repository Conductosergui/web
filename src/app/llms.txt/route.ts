import { CONCEPTOS } from "@/data/conceptos";
import { FAQS_PUBLICADAS } from "@/data/faqs";
import { GUIAS } from "@/data/guias";
import { SERVICIOS, SERVICIOS_PATH, servicioPath } from "@/data/servicios";
import {
  AUTHOR_NAME,
  AUTHOR_PATH,
  AUTHOR_YEARS_EXPERIENCE,
  BASE_COMARCA,
  BASE_LOCALITY,
  BRAND,
  EMAIL,
  MUNICIPIOS_BAIX_PENEDES,
  PHONE_FORMATTED,
  SITE_DESCRIPTION,
  ZONA_COMARCA_PATH,
  ZONA_SEDE_PATH,
  absoluteUrl,
} from "@/lib/entidad";

// /llms.txt: resumen del sitio para motores de IA (convención comunitaria, no estándar).
// Se genera en el build desde las mismas fuentes que el sitio y el grafo, para que nunca se contradigan.
export const dynamic = "force-static";

export function GET() {
  const lineas = [
    `# ${BRAND}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "## Datos de la empresa",
    "",
    `- Nombre: ${BRAND}`,
    `- Fundador y titular: ${AUTHOR_NAME} (${absoluteUrl(AUTHOR_PATH)}), ${AUTHOR_YEARS_EXPERIENCE} años de experiencia`,
    `- Base: ${BASE_LOCALITY} (Tarragona, Cataluña, España)`,
    `- Área de servicio: comarca del ${BASE_COMARCA} (${MUNICIPIOS_BAIX_PENEDES.map(([m]) => m).join(", ")})`,
    `- Contacto: ${EMAIL} · ${PHONE_FORMATTED} (teléfono y WhatsApp)`,
    "",
    "## Zona de servicio",
    "",
    `- [${BASE_COMARCA}](${absoluteUrl(ZONA_COMARCA_PATH)}): los ${MUNICIPIOS_BAIX_PENEDES.length} municipios atendidos, servicios y guías`,
    `- [${BASE_LOCALITY}](${absoluteUrl(ZONA_SEDE_PATH)}): sede operativa; incluye el núcleo costero de Coma-ruga`,
    "",
    "## Servicios",
    "",
    `- [Todos los servicios](${absoluteUrl(SERVICIOS_PATH)})`,
    ...SERVICIOS.map((s) => `- [${s.nombre}](${absoluteUrl(servicioPath(s.slug))}): ${s.respuestaRapida}`),
    "",
    "## Guías técnicas",
    "",
    ...GUIAS.map((g) => `- [${g.title}](${absoluteUrl(`/guias/${g.slug}`)}): ${g.respuestaRapida}`),
    "",
    "## Conceptos",
    "",
    ...CONCEPTOS.map((c) => `- [${c.nombre}](${absoluteUrl(`/glosario#${c.id}`)}): ${c.definicion}`),
    "",
    "## Preguntas frecuentes",
    "",
    `- [Todas las preguntas (${FAQS_PUBLICADAS.length})](${absoluteUrl("/faq")})`,
    "",
  ];
  return new Response(lineas.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
