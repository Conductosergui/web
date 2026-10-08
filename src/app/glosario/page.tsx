import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BASE_URL, clusterSlug, getGlosarioOrdenado } from "@/data/guias";

export const metadata: Metadata = {
  title: "Glosario técnico | Conductos Ergui",
  description: "Términos clave sobre conductos, pladur, HVAC, mantenimiento y aislamiento, con enlaces a las guías y temas relacionados.",
  openGraph: { title: "Glosario técnico — Conductos Ergui", description: "Definiciones técnicas enlazadas con las guías y los temas.", locale: "es_ES", type: "website" },
};

export default function GlosarioPage() {
  const entries = getGlosarioOrdenado();

  const definedTermSetLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Glosario técnico de Conductos Ergui",
    description: "Términos técnicos sobre climatización y construcción en seco.",
    hasPart: entries.map((e) => ({
      "@type": "DefinedTerm",
      name: e.term,
      description: e.def,
      url: e.guia ? `${BASE_URL}/guias/${e.guia}` : e.cluster ? `${BASE_URL}/temas/${clusterSlug(e.cluster)}` : undefined,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Glosario", item: `${BASE_URL}/glosario` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }} />
        <div className="shell relative">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/45">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#d6dde3]">Glosario</span>
          </nav>
          <span className="eyebrow mt-8 block text-[#d6dde3]">Cobertura semántica</span>
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

      <section className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((e) => {
              const href = e.guia ? `/guias/${e.guia}` : e.cluster ? `/temas/${clusterSlug(e.cluster)}` : null;
              const label = e.guia ? "Ver guía" : e.cluster ? `Ver tema · ${e.cluster}` : null;
              return (
                <div key={e.term} className="rounded-[20px] border border-white/10 bg-[#07182d] p-6 transition hover:border-[#d6dde3]/35">
                  <h2 className="text-[18px] font-bold tracking-[-0.02em] text-white">{e.term}</h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-white/60">{e.def}</p>
                  {href && label && (
                    <Link href={href} className="ce-link mt-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#d6dde3]">
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
