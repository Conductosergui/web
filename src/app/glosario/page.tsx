import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CONCEPTOS } from "@/data/conceptos";
import { BASE_URL, clusterSlug, getGlosarioOrdenado } from "@/data/guias";
import { serviciosPorConceptos, servicioPath } from "@/data/servicios";
import { ID, conceptoId } from "@/lib/entidad";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Términos clave sobre conductos, pladur, HVAC, mantenimiento y aislamiento, con enlaces a las guías y temas relacionados.";

export const metadata: Metadata = buildMetadata({ title: "Glosario técnico", description: DESCRIPTION, path: "/glosario" });

export default function GlosarioPage() {
  const entries = getGlosarioOrdenado();

  // El DefinedTermSet y los 9 conceptos se declaran en el grafo común (layout); aquí se completa
  // el conjunto con todos sus términos. Los conceptos tienen @id propio (/glosario#{id}).
  const graph = [
    pageNode({ path: "/glosario", name: "Glosario técnico", description: DESCRIPTION, mainEntity: ref(ID.glosario) }),
    {
      "@type": "DefinedTermSet",
      "@id": ID.glosario,
      description: "Términos técnicos sobre climatización y construcción en seco.",
      hasDefinedTerm: [
        ...CONCEPTOS.map((c) => ref(conceptoId(c.id))),
        ...entries.map((e) => ({
          "@type": "DefinedTerm",
          name: e.term,
          description: e.def,
          inDefinedTermSet: ref(ID.glosario),
          url: e.guia ? `${BASE_URL}/guias/${e.guia}` : e.cluster ? `${BASE_URL}/temas/${clusterSlug(e.cluster)}` : undefined,
        })),
      ],
    },
    breadcrumbNode("/glosario", [{ name: "Glosario", path: "/glosario" }]),
  ];

  return (
    <>
      <JsonLd graph={graph} />

      <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }} />
        <div className="shell relative">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#c7f35b]">Glosario</span>
          </nav>
          <span className="eyebrow mt-8 block text-[#c7f35b]">Cobertura semántica</span>
          <h1 className="display mt-5 max-w-4xl text-white">
            Glosario técnico,
            <br />
            <span className="serif-it text-white/40">término a término.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-white/60">
            Definiciones prácticas de los conceptos que aparecen en las guías. Cada término enlaza con la nota o el tema donde se desarrolla, para cerrar el grafo de entidades del sitio.
          </p>
        </div>
      </section>

      <section aria-labelledby="conceptos-titulo" className="bg-[#05111f] pb-16">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h2 id="conceptos-titulo" className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
              Conceptos clave
            </h2>
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{CONCEPTOS.length} conceptos</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {CONCEPTOS.map((c) => {
              const servicios = serviciosPorConceptos([c.id]);
              return (
                <div
                  key={c.id}
                  id={c.id}
                  className="scroll-mt-24 rounded-[20px] border border-[#c7f35b]/25 bg-[#07182d] p-6 transition hover:border-[#c7f35b]/50"
                >
                  <h3 className="text-[18px] font-bold tracking-[-0.02em] text-white">{c.nombre}</h3>
                  {c.alternateName && (
                    <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
                      También: {c.alternateName.join(" · ")}
                    </p>
                  )}
                  <p className="mt-2 text-[14px] leading-[1.7] text-white/60">{c.definicion}</p>
                  {servicios.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {servicios.map((s) => (
                        <Link
                          key={s.slug}
                          href={servicioPath(s.slug)}
                          className="ce-link inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#c7f35b]"
                        >
                          Servicio · {s.nombre} <ArrowRight size={14} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section aria-labelledby="terminos-titulo" className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="mb-8 border-b border-white/10 pb-6">
            <h2 id="terminos-titulo" className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
              Términos técnicos
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((e) => {
              const href = e.guia ? `/guias/${e.guia}` : e.cluster ? `/temas/${clusterSlug(e.cluster)}` : null;
              const label = e.guia ? "Ver guía" : e.cluster ? `Ver tema · ${e.cluster}` : null;
              return (
                <div key={e.term} className="rounded-[20px] border border-white/10 bg-[#07182d] p-6 transition hover:border-[#c7f35b]/35">
                  <h3 className="text-[18px] font-bold tracking-[-0.02em] text-white">{e.term}</h3>
                  <p className="mt-2 text-[14px] leading-[1.7] text-white/60">{e.def}</p>
                  {href && label && (
                    <Link href={href} className="ce-link mt-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#c7f35b]">
                      {label} <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
