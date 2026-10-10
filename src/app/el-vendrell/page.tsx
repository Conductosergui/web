import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaRapida } from "@/components/RespuestaRapida";
import { ZonaContacto, ZonaHero, ZonaServicios } from "@/components/Zona";
import { SERVICIOS, servicioPath } from "@/data/servicios";
import {
  ADDRESS_TEXT,
  AUTHOR_NAME,
  AUTHOR_PATH,
  AUTHOR_YEARS_EXPERIENCE,
  BASE_COMARCA,
  BASE_LOCALITY,
  BASE_PROVINCE,
  BRAND,
  EMAIL,
  GBP_URL,
  ID,
  MUNICIPIOS_BAIX_PENEDES,
  PHONE_FORMATTED,
  RADIO_OPERATIVO,
  ZONA_COMARCA_PATH,
  ZONA_SEDE_PATH,
} from "@/lib/entidad";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const PATH = ZONA_SEDE_PATH;
const TITLE = `Climatización, conductos y pladur en ${BASE_LOCALITY}`;
const DESCRIPTION = `Sede operativa de ${BRAND} en ${BASE_LOCALITY} (${BASE_PROVINCE}), capital del ${BASE_COMARCA}: climatización por conductos, ventilación, pladur y aislamiento en todo el municipio, incluido Coma-ruga.`;

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

// Municipios más cercanos a la sede (la lista de entidad.ts está ordenada por distancia).
const CERCANOS = MUNICIPIOS_BAIX_PENEDES.filter(([m]) => m !== BASE_LOCALITY).slice(0, 4);

const graph = [
  pageNode({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    about: [ref(ID.vendrell), ref(ID.comaRuga)],
    mainEntity: ref(ID.negocio),
  }),
  {
    "@type": "Place",
    "@id": ID.comaRuga,
    name: "Coma-ruga",
    containedInPlace: ref(ID.vendrell),
  },
  breadcrumbNode(PATH, [
    { name: BASE_COMARCA, path: ZONA_COMARCA_PATH },
    { name: BASE_LOCALITY, path: PATH },
  ]),
];

const FICHA: [string, string, string?][] = [
  ["Empresa", BRAND],
  ["Fundador y titular", AUTHOR_NAME, AUTHOR_PATH],
  ["Experiencia", `${AUTHOR_YEARS_EXPERIENCE} años`],
  ["Dirección", ADDRESS_TEXT, GBP_URL],
  ["Área de servicio", `${RADIO_OPERATIVO.charAt(0).toUpperCase() + RADIO_OPERATIVO.slice(1)} · zona principal: ${BASE_COMARCA}`, ZONA_COMARCA_PATH],
  ["Teléfono y WhatsApp", PHONE_FORMATTED],
  ["Correo", EMAIL],
];

export default function ElVendrellPage() {
  return (
    <>
      <JsonLd graph={graph} />

      <ZonaHero
        crumb={BASE_LOCALITY}
        eyebrow={`Sede operativa · ${BASE_COMARCA}`}
        titulo={`${BASE_LOCALITY},`}
        acento="sede operativa."
        intro={DESCRIPTION}
      >
        <RespuestaRapida
          className="mt-10 max-w-4xl"
          pregunta={`¿Dónde tiene su base ${BRAND}?`}
          respuesta={`En ${BASE_LOCALITY} (${BASE_PROVINCE}), capital de la comarca del ${BASE_COMARCA}. Desde aquí se atienden todo el municipio, incluido el núcleo costero de Coma-ruga, el resto de la comarca y su ${RADIO_OPERATIVO}. Su titular es su fundador, ${AUTHOR_NAME}, con ${AUTHOR_YEARS_EXPERIENCE} años de experiencia.`}
        />
      </ZonaHero>

      <section aria-labelledby="ficha-sede" className="bg-[#05111f] pb-16 md:pb-24">
        <div className="shell">
          <div className="max-w-3xl rounded-[24px] border border-white/10 bg-[#07182d] p-6 md:p-8">
            <h2 id="ficha-sede" className="eyebrow text-[#c7f35b]">
              Ficha de la sede
            </h2>
            <dl className="mt-5 grid gap-4 text-[14.5px]">
              {FICHA.map(([k, v, href]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-b border-white/10 pb-3 last:border-0 last:pb-0 sm:grid-cols-[180px_1fr] sm:gap-4">
                  <dt className="font-bold text-white/55">{k}</dt>
                  <dd className="min-w-0 break-words text-white">
                    {href?.startsWith("http") ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="ce-link">
                        {v}
                      </a>
                    ) : href ? (
                      <Link href={href} className="ce-link">
                        {v}
                      </Link>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <ZonaServicios id="servicios-sede" titulo={`Servicios en ${BASE_LOCALITY}`} />

      <section id="coma-ruga" aria-labelledby="coma-ruga-titulo" className="scroll-mt-24 bg-[#05111f] pb-16 md:pb-24">
        <div className="shell">
          <div className="grid gap-8 rounded-[28px] border border-white/10 bg-[#0b2748] p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
            <div>
              <span className="eyebrow text-[#c7f35b]">Término municipal de {BASE_LOCALITY}</span>
              <h2 id="coma-ruga-titulo" className="mt-4 text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white">
                Coma-ruga
              </h2>
            </div>
            <div>
              <p className="text-[16px] leading-[1.75] text-white/70">
                Coma-ruga es un núcleo costero del municipio de {BASE_LOCALITY}. Se atiende desde la misma sede, con los
                mismos servicios y la misma forma de contacto que el resto del municipio.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {SERVICIOS.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={servicioPath(s.slug)}
                      className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12.5px] font-bold text-white/75 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]"
                    >
                      {s.nombre}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="cercanos" className="bg-[#05111f] pb-16 md:pb-24">
        <div className="shell">
          <h2 id="cercanos" className="text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Municipios cercanos
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-[1.7] text-white/60">
            Desde {BASE_LOCALITY} se atienden los municipios del {BASE_COMARCA} y el resto del {RADIO_OPERATIVO}. Los más próximos a la sede:
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {CERCANOS.map(([m]) => (
              <li
                key={m}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12.5px] font-bold text-white/75"
              >
                <MapPin size={13} aria-hidden="true" /> {m}
              </li>
            ))}
          </ul>
          <Link href={ZONA_COMARCA_PATH} className="ce-link mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#c7f35b]">
            Zona principal: {BASE_COMARCA} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <ZonaContacto titulo={`¿Un proyecto en ${BASE_LOCALITY} o Coma-ruga?`} />
    </>
  );
}
