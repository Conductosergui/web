import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { CATEGORIAS, FAQS_PUBLICADAS, faqsDeCategoria } from "@/data/faqs";
import { servicioPath } from "@/data/servicios";
import { absoluteUrl } from "@/lib/entidad";
import { faqQuestions, pageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Respuestas sobre conductos, climatización, ventilación, pladur y aislamiento en El Vendrell y el Baix Penedès, basadas en las guías técnicas del sitio.";

export const metadata: Metadata = buildMetadata({ title: "Preguntas frecuentes", description: DESCRIPTION, path: "/faq" });

// Solo preguntas publicadas (src/data/faqs.ts); las pendientes de validación no se muestran ni entran en el grafo.
const graph = [
  pageNode({
    path: "/faq",
    name: "Preguntas frecuentes",
    description: DESCRIPTION,
    type: "FAQPage",
    withBreadcrumb: false,
    mainEntity: faqQuestions(FAQS_PUBLICADAS, absoluteUrl("/faq")),
  }),
];

export default function FAQPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <section className="bg-sky py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow text-blue">Antes de comenzar</p>
          <h1 className="heading mt-6">
            Preguntas claras.
            <br />
            Respuestas también.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-lead">
            {FAQS_PUBLICADAS.length} respuestas sobre conductos, climatización, ventilación, pladur y aislamiento, basadas en las guías técnicas del sitio.
          </p>
        </div>
      </section>
      <section className="shell py-20">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Categorías" className="mb-12 flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-bold text-ink transition hover:border-blue hover:text-blue">
                {c.nombre} <span className="text-lead">({faqsDeCategoria(c.id).length})</span>
              </a>
            ))}
          </nav>
          {CATEGORIAS.map((c) => (
            <section key={c.id} id={c.id} aria-labelledby={`cat-${c.id}`} className="scroll-mt-28 pb-12">
              <h2 id={`cat-${c.id}`} className="eyebrow text-blue">
                {c.nombre}
              </h2>
              {faqsDeCategoria(c.id).map((f, i) => (
                <details key={f.id} id={f.id} className="group scroll-mt-28 border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold tracking-[-0.02em] md:text-xl">
                    <span>
                      <small className="mr-5 text-xs text-blue">{String(i + 1).padStart(2, "0")}</small>
                      {f.pregunta}
                    </span>
                    <Plus className="shrink-0 transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <div className="max-w-3xl pb-8 pl-0 leading-7 text-lead md:pl-11">
                    <p className="text-ink">{f.respuesta}</p>
                    {f.ampliada && <p className="mt-2">{f.ampliada}</p>}
                    {f.servicio && (
                      <Link href={servicioPath(f.servicio)} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue underline-offset-4 hover:underline">
                        Ver el servicio <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </section>
          ))}
        </div>
        <div className="mx-auto mt-16 flex max-w-4xl flex-col justify-between gap-6 rounded-2xl bg-ink p-7 text-white md:flex-row md:items-center">
          <div>
            <p className="font-bold">¿No figura la respuesta?</p>
            <p className="mt-1 text-sm text-white/55">Puede enviarse una consulta y se ofrecerá orientación.</p>
          </div>
          <Link href="/presupuestador" className="flex items-center gap-5 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink">
            Enviar consulta <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
