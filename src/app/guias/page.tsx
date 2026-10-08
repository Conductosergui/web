import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GuiasExplorer } from "@/components/GuiasExplorer";
import { JsonLd } from "@/components/JsonLd";
import { BASE_URL, CLUSTERS, clusterSlug, GUIAS } from "@/data/guias";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Notas y recomendaciones sobre conductos, pladur, HVAC, mantenimiento y aislamiento, con fuentes de fabricantes y marco normativo.";

export const metadata: Metadata = buildMetadata({ title: "Guías técnicas", description: DESCRIPTION, path: "/guias" });

const listId = `${BASE_URL}/guias#lista`;
const graph = [
  pageNode({ path: "/guias", name: "Guías técnicas", description: DESCRIPTION, type: "CollectionPage", mainEntity: ref(listId) }),
  {
    "@type": "ItemList",
    "@id": listId,
    itemListElement: GUIAS.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${BASE_URL}/guias/${g.slug}` })),
  },
  breadcrumbNode("/guias", [{ name: "Guías", path: "/guias" }]),
];

export default function GuiasPage() {
  return (
    <>
      <JsonLd graph={graph} />

      <section className="relative overflow-hidden bg-[#05111f] pt-20 pb-12 md:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }} />
        <div className="shell relative">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#c7f35b]" />
            <span className="eyebrow text-[#c7f35b]">Guías y recomendaciones</span>
          </div>
          <h1 className="display mt-6 max-w-4xl text-white">
            Notas de oficio,
            <br />
            <span className="serif-it text-white/40">para decidir mejor.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-white/60">
            Se publican aquí guías prácticas sobre conductos, pladur, climatización, mantenimiento y aislamiento. Cada nota incluye criterios técnicos, fuentes de fabricantes y marco normativo, y enlaza con los servicios, con otras guías y con su tema.
          </p>
          <div className="mt-8">
            <Link href="/presupuestador" className="ce-link inline-flex items-center gap-3 text-sm font-bold text-[#c7f35b]">
              ¿Tiene un proyecto concreto? Solicitar valoración <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#05111f] pb-12">
        <div className="shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">Explora por temática</h2>
            <Link href="/glosario" className="ce-link inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/60 hover:text-[#c7f35b]">
              <BookOpen size={14} /> Glosario técnico
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {CLUSTERS.map((c) => (
              <Link
                key={c}
                href={`/temas/${clusterSlug(c)}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#07182d] p-5 transition hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
              >
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">Tema</span>
                <span className="mt-6 flex items-center justify-between text-[16px] font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#c7f35b]">
                  {c} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">Filtrar por temática</h2>
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{GUIAS.length} guías</span>
          </div>
          <GuiasExplorer />
        </div>
      </section>
    </>
  );
}
