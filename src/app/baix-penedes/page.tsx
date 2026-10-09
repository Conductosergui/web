import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { GuiaCard } from "@/components/GuiaCard";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaRapida } from "@/components/RespuestaRapida";
import { ZonaContacto, ZonaHero, ZonaServicios } from "@/components/Zona";
import { GUIAS } from "@/data/guias";
import {
  BASE_COMARCA,
  BASE_LOCALITY,
  BRAND,
  ID,
  MUNICIPIOS_BAIX_PENEDES,
  ZONA_COMARCA_PATH,
  ZONA_SEDE_PATH,
  absoluteUrl,
} from "@/lib/entidad";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = ZONA_COMARCA_PATH;
const MUNICIPIOS = MUNICIPIOS_BAIX_PENEDES.map(([m]) => m);
const TITLE = `Climatización, conductos y pladur en el ${BASE_COMARCA}`;
const DESCRIPTION = `${BRAND} atiende los ${MUNICIPIOS.length} municipios de la comarca del ${BASE_COMARCA} desde su base en ${BASE_LOCALITY}: climatización por conductos, ventilación, pladur y aislamiento térmico y acústico.`;

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

const listId = `${absoluteUrl(PATH)}#municipios`;

const graph = [
  pageNode({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    about: [ref(ID.comarca), ref(ID.negocio)],
    mainEntity: ref(listId),
  }),
  {
    "@type": "ItemList",
    "@id": listId,
    name: `Municipios del ${BASE_COMARCA} atendidos por ${BRAND}`,
    numberOfItems: MUNICIPIOS.length,
    itemListElement: MUNICIPIOS.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item:
        m === BASE_LOCALITY
          ? ref(ID.vendrell)
          : { "@type": "City", name: m, containedInPlace: ref(ID.comarca) },
    })),
  },
  breadcrumbNode(PATH, [{ name: BASE_COMARCA, path: PATH }]),
];

const formatKm = (km: number) => km.toLocaleString("es-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export default function BaixPenedesPage() {
  return (
    <>
      <JsonLd graph={graph} />

      <ZonaHero
        crumb={BASE_COMARCA}
        eyebrow="Zona de servicio"
        titulo={`${BASE_COMARCA},`}
        acento="toda la comarca."
        intro={DESCRIPTION}
      >
        <RespuestaRapida
          className="mt-10 max-w-4xl"
          pregunta={`¿En qué municipios del ${BASE_COMARCA} trabaja ${BRAND}?`}
          respuesta={`En los ${MUNICIPIOS.length} municipios de la comarca: ${MUNICIPIOS.join(", ")}. La base está en ${BASE_LOCALITY}, capital del ${BASE_COMARCA}, y en todos ellos se prestan los mismos seis servicios de climatización, conductos, ventilación, pladur y aislamiento.`}
        />
      </ZonaHero>

      <section aria-labelledby="municipios" className="bg-[#05111f] pb-16 md:pb-24">
        <div className="shell">
          <h2 id="municipios" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            {MUNICIPIOS.length} municipios atendidos
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-white/60">
            Distancia aproximada desde {BASE_LOCALITY}, medida en línea recta entre los centros de cada municipio.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MUNICIPIOS_BAIX_PENEDES.map(([m, km]) => {
              const esSede = m === BASE_LOCALITY;
              const contenido = (
                <>
                  <span className="flex items-center gap-3 font-bold text-white">
                    <MapPin size={16} className={esSede ? "text-[#c7f35b]" : "text-white/40"} aria-hidden="true" />
                    {m}
                  </span>
                  <span className="text-[13px] text-white/55">{esSede ? "Sede" : `≈ ${formatKm(km)} km`}</span>
                </>
              );
              const clase =
                "flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition " +
                (esSede ? "border-[#c7f35b]/40 bg-[#0b2748] hover:border-[#c7f35b]" : "border-white/10 bg-[#07182d]");
              return (
                <li key={m}>
                  {esSede ? (
                    <Link href={ZONA_SEDE_PATH} className={clase}>
                      {contenido}
                    </Link>
                  ) : (
                    <div className={clase}>{contenido}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <Link
            href={ZONA_SEDE_PATH}
            className="ce-link mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c7f35b]"
          >
            Sede en {BASE_LOCALITY} (incluye Coma-ruga) <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <ZonaServicios id="servicios-comarca" titulo={`Servicios en el ${BASE_COMARCA}`} />

      <section aria-labelledby="guias-comarca" className="bg-[#05111f] pb-16 md:pb-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="guias-comarca" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              Guías técnicas
            </h2>
            <Link href="/guias" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-[#c7f35b]">
              Todas las guías <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {GUIAS.map((g) => (
              <GuiaCard key={g.slug} guia={g} />
            ))}
          </div>
        </div>
      </section>

      <ZonaContacto titulo={`¿Un proyecto en el ${BASE_COMARCA}?`} />
    </>
  );
}
