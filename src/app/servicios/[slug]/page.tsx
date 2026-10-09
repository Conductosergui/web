import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Mail, Plus } from "lucide-react";
import { GuiaCard } from "@/components/GuiaCard";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaRapida } from "@/components/RespuestaRapida";
import { faqsDeServicio } from "@/data/faqs";
import { getConcepto } from "@/data/conceptos";
import { clusterSlug, GUIAS } from "@/data/guias";
import { SERVICIOS, SERVICIOS_PATH, getRelacionados, getServicio, servicioPath } from "@/data/servicios";
import { BASE_COMARCA, BASE_LOCALITY, EMAIL, absoluteUrl, conceptoId, pageId, servicioId } from "@/lib/entidad";
import { breadcrumbNode, faqQuestions, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return { title: "Servicio no encontrado" };
  return buildMetadata({
    title: `${servicio.nombre} en ${BASE_LOCALITY} y ${BASE_COMARCA} | Servicios`,
    description: servicio.resumen,
    path: servicioPath(servicio.slug),
  });
}

const DEPARTAMENTO = {
  climatizacion: { nombre: "Climatización y conductos", href: "/#climatizacion" },
  pladur: { nombre: "Pladur y aislamiento", href: "/#pladur" },
} as const;

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const path = servicioPath(servicio.slug);
  const conceptos = servicio.conceptos.map(getConcepto);
  const relacionados = getRelacionados(servicio.slug);
  // Solo guías cuyo tema principal (about) es un concepto del servicio. Las menciones secundarias
  // quedan en el grafo (mentions) pero no se presentan como contenido de apoyo del servicio.
  const guias = GUIAS.filter((g) => g.conceptos.some((c) => servicio.conceptos.includes(c)));
  const departamento = DEPARTAMENTO[servicio.departamento];
  const faqs = faqsDeServicio(servicio.slug);
  const faqId = `${absoluteUrl(path)}#faq`;

  // El nodo Service se declara en el grafo común; esta página es su mainEntityOfPage.
  const graph = [
    pageNode({
      path,
      name: `${servicio.nombre} en ${BASE_LOCALITY} y ${BASE_COMARCA}`,
      description: servicio.resumen,
      mainEntity: ref(servicioId(servicio.slug)),
      about: servicio.conceptos.map((c) => ref(conceptoId(c))),
      ...(guias.length ? { relatedLink: guias.map((g) => absoluteUrl(`/guias/${g.slug}`)) } : {}),
      ...(faqs.length ? { hasPart: ref(faqId) } : {}),
    }),
    // Preguntas frecuentes del servicio: FAQPage como parte de la página (el Service sigue siendo mainEntity).
    ...(faqs.length
      ? [{ "@type": "FAQPage", "@id": faqId, isPartOf: ref(pageId(path)), mainEntity: faqQuestions(faqs) }]
      : []),
    { "@id": servicioId(servicio.slug), mainEntityOfPage: ref(pageId(path)) },
    breadcrumbNode(path, [
      { name: "Servicios", path: SERVICIOS_PATH },
      { name: servicio.nombre, path },
    ]),
  ];

  return (
    <>
      <JsonLd graph={graph} />

      <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }}
        />
        <div className="shell relative">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <Link href={SERVICIOS_PATH} className="transition-colors hover:text-white">Servicios</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#c7f35b]">{servicio.nombre}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <Link href={departamento.href} className="eyebrow text-[#c7f35b] hover:underline">
              Servicio · {departamento.nombre}
            </Link>
            <h1 className="display mt-5 text-white">
              {servicio.nombre} en {BASE_LOCALITY}
              <span className="mt-2 block text-[clamp(1.3rem,3vw,2.2rem)]">
                <span className="serif-it text-white/50">{servicio.acento}</span>
              </span>
            </h1>
            <p className="mt-7 text-[17px] leading-[1.8] text-white/65">{servicio.resumen}</p>
          </div>
          <RespuestaRapida className="mt-10 max-w-4xl" pregunta={servicio.pregunta} respuesta={servicio.respuestaRapida} />
        </div>
      </section>

      <section aria-labelledby="alcance-titulo" className="bg-[#05111f] pb-12">
        <div className="shell grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 id="alcance-titulo" className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
              ¿Qué incluye el servicio de {servicio.nombre.toLowerCase()}?
            </h2>
            <ul className="grid gap-3">
              {servicio.alcance.map((a) => (
                <li key={a.texto} className="flex gap-3 rounded-2xl border border-white/10 bg-[#07182d] p-5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7f35b]" />
                  <p className="text-[14.5px] leading-[1.7] text-white/70">{a.texto}</p>
                </li>
              ))}
            </ul>
          </div>
          {servicio.materiales.length > 0 && (
            <div>
              <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">¿Con qué materiales se trabaja?</h2>
              <ul className="flex flex-wrap gap-2">
                {servicio.materiales.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section aria-labelledby="conceptos-titulo" className="bg-[#05111f] pb-12">
        <div className="shell">
          <h2 id="conceptos-titulo" className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
            ¿Qué conceptos conviene conocer?
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {conceptos.map((c) => (
              <div key={c.id} className="rounded-[20px] border border-white/10 bg-[#07182d] p-6">
                <h3 className="text-[18px] font-bold tracking-[-0.02em] text-white">{c.nombre}</h3>
                <p className="mt-2 text-[14px] leading-[1.7] text-white/60">{c.definicion}</p>
                <Link
                  href={`/glosario#${c.id}`}
                  className="ce-link mt-4 inline-flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-[#c7f35b]"
                >
                  Ver en el glosario <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section aria-labelledby="relacionados-titulo" className="bg-[#05111f] pb-12">
          <div className="shell">
            <h2 id="relacionados-titulo" className="mb-6 text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
              ¿Con qué otros servicios se combina?
            </h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relacionados.map(({ servicio: r, motivo }) => (
                <Link
                  key={r.slug}
                  href={servicioPath(r.slug)}
                  className="group flex flex-col justify-between gap-4 rounded-[20px] border border-white/10 bg-[#07182d] p-6 transition hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
                >
                  <div>
                    <p className="text-[16px] font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#c7f35b]">{r.nombre}</p>
                    <p className="mt-2 text-[13.5px] leading-[1.65] text-white/60">{motivo}</p>
                  </div>
                  <ArrowRight size={17} className="text-[#c7f35b] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {guias.length > 0 && (
        <section aria-labelledby="guias-titulo" className="bg-[#05111f] pb-12">
          <div className="shell">
            <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <h2 id="guias-titulo" className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
                Guías relacionadas
              </h2>
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{guias.length} guías</span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {guias.map((g) => (
                <GuiaCard key={g.slug} guia={g} />
              ))}
            </div>
            {servicio.temas.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {servicio.temas.map((t) => (
                  <Link
                    key={t}
                    href={`/temas/${clusterSlug(t)}`}
                    className="ce-link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]"
                  >
                    Tema: {t} <ArrowRight size={14} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section aria-labelledby="faq-titulo" className="bg-[#05111f] pb-12">
          <div className="shell">
            <div className="mb-4 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
              <h2 id="faq-titulo" className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">
                Preguntas frecuentes sobre {servicio.nombre.toLowerCase()}
              </h2>
              <Link href="/faq" className="ce-link shrink-0 text-[12px] font-bold uppercase tracking-[0.14em] text-[#c7f35b]">
                Todas las preguntas
              </Link>
            </div>
            <div className="max-w-4xl">
              {faqs.map((f) => (
                <details key={f.id} className="group border-b border-white/10">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-bold tracking-[-0.01em] text-white">
                    {f.pregunta}
                    <Plus size={18} className="shrink-0 text-[#c7f35b] transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <div className="pb-6 text-[14.5px] leading-[1.75] text-white/70">
                    <p>{f.respuesta}</p>
                    {f.ampliada && <p className="mt-2 text-white/60">{f.ampliada}</p>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="eyebrow text-[#c7f35b]">
                {servicio.nombre} en {BASE_LOCALITY} y {BASE_COMARCA}
              </p>
              <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-white/65">
                Se describe el espacio y se recibe una propuesta con alcance, materiales y plazos antes de cualquier intervención.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <a href={`mailto:${EMAIL}`} className="ce-link inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white">
                  <Mail size={16} /> {EMAIL}
                </a>
                <Link href="/compromiso" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white">
                  Compromiso de trabajo <ArrowRight size={14} />
                </Link>
              </div>
            </div>
            <Link
              href="/presupuestador"
              className="inline-flex shrink-0 items-center justify-between gap-8 rounded-full bg-[#c7f35b] px-6 py-4 text-sm font-bold text-[#05111f] transition hover:scale-[1.03]"
            >
              Solicitar presupuesto <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
