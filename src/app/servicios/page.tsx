import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, Wind } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { getConcepto } from "@/data/conceptos";
import { SERVICIOS, SERVICIOS_PATH, servicioPath, serviciosDe, type Departamento } from "@/data/servicios";
import { BASE_COMARCA, BASE_LOCALITY, ID, absoluteUrl } from "@/lib/entidad";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const DESCRIPTION = `Servicios de climatización, conductos, ventilación, pladur y aislamiento térmico y acústico en ${BASE_LOCALITY} y la comarca del ${BASE_COMARCA}.`;

export const metadata: Metadata = buildMetadata({ title: "Servicios", description: DESCRIPTION, path: SERVICIOS_PATH });

const listId = `${absoluteUrl(SERVICIOS_PATH)}#lista`;

const graph = [
  pageNode({
    path: SERVICIOS_PATH,
    name: `Servicios de Conductos Ergui en ${BASE_LOCALITY} y ${BASE_COMARCA}`,
    description: DESCRIPTION,
    type: "CollectionPage",
    mainEntity: ref(listId),
    about: ref(ID.catalogo),
  }),
  {
    "@type": "ItemList",
    "@id": listId,
    numberOfItems: SERVICIOS.length,
    itemListElement: SERVICIOS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.nombre,
      url: absoluteUrl(servicioPath(s.slug)),
    })),
  },
  breadcrumbNode(SERVICIOS_PATH, [{ name: "Servicios", path: SERVICIOS_PATH }]),
];

const GRUPOS: { dep: Departamento; titulo: string; Icon: typeof Wind }[] = [
  { dep: "climatizacion", titulo: "Climatización, conductos y ventilación", Icon: Wind },
  { dep: "pladur", titulo: "Pladur y aislamiento", Icon: Layers },
];

export default function ServiciosPage() {
  return (
    <>
      <JsonLd graph={graph} />

      <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }}
        />
        <div className="shell relative">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#c7f35b]">Servicios</span>
          </nav>
          <span className="eyebrow mt-8 block text-[#c7f35b]">
            {BASE_LOCALITY} · {BASE_COMARCA}
          </span>
          <h1 className="display mt-5 max-w-4xl text-white">
            Servicios,
            <br />
            <span className="serif-it text-white/50">un mismo equipo.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-white/60">{DESCRIPTION}</p>
        </div>
      </section>

      {GRUPOS.map(({ dep, titulo, Icon }) => (
        <section key={dep} aria-labelledby={`grupo-${dep}`} className="bg-[#05111f] pb-12 last:pb-24 md:last:pb-32">
          <div className="shell">
            <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#c7f35b] text-[#05111f]">
                <Icon size={18} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h2 id={`grupo-${dep}`} className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
                {titulo}
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {serviciosDe(dep).map((s) => (
                <Link
                  key={s.slug}
                  href={servicioPath(s.slug)}
                  className="group flex flex-col justify-between gap-6 rounded-[24px] border border-white/10 bg-[#07182d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
                >
                  <div>
                    <span className="rounded-full border border-[#c7f35b]/30 bg-[#c7f35b]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">
                      {getConcepto(s.conceptos[0]).nombre}
                    </span>
                    <h3 className="mt-5 text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white transition-colors group-hover:text-[#c7f35b]">
                      {s.nombre}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/60">{s.resumen}</p>
                  </div>
                  <span className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors group-hover:text-[#c7f35b]">
                    Ver servicio <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
