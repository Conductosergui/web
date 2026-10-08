import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, ChevronRight, Clock, ExternalLink, HelpCircle, Scale, Tag, User } from "lucide-react";
import { ArticleBody, type RenderBlock } from "@/components/ArticleBody";
import {
  AUTHOR,
  AUTHOR_ROLE,
  AUTHOR_SLUG,
  BASE_URL,
  PUBLISHER,
  formatDate,
  getGuia,
  getRelacionadas,
  GUIAS,
} from "@/data/guias";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) return { title: "Guía no encontrada | Conductos Ergui" };
  return {
    title: `${guia.title} | Guías | Conductos Ergui`,
    description: guia.excerpt,
    openGraph: {
      title: guia.title,
      description: guia.excerpt,
      locale: "es_ES",
      type: "article",
      publishedTime: guia.datePublished,
      modifiedTime: guia.dateModified,
      section: guia.articleSection,
      authors: [AUTHOR],
    },
  };
}

export default async function GuiaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = getGuia(slug);
  if (!guia) notFound();

  const relacionadas = getRelacionadas(guia);
  const url = `${BASE_URL}/guias/${guia.slug}`;
  const authorUrl = `${BASE_URL}/autor/${AUTHOR_SLUG}`;

  const body: RenderBlock[] = [...guia.blocks];
  if (guia.related[0]) body.splice(3, 0, { kind: "internallink", slug: guia.related[0] });
  body.splice(Math.min(body.length, 6), 0, { kind: "topiclink", cluster: guia.cluster });

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: guia.title,
    description: guia.excerpt,
    inLanguage: "es",
    articleSection: guia.articleSection,
    datePublished: guia.datePublished,
    dateModified: guia.dateModified,
    author: { "@type": "Person", name: AUTHOR, jobTitle: AUTHOR_ROLE, url: authorUrl },
    publisher: { "@type": "Organization", name: PUBLISHER, logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.svg` } },
    about: { "@type": "Thing", name: guia.cluster },
    mentions: [
      ...guia.fabricantes.map((f) => ({ "@type": "Brand", name: f.name, url: f.url })),
      ...guia.normativa.map((n) => ({ "@type": "Organization", name: n.name, url: n.url })),
    ],
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${BASE_URL}/guias` },
      { "@type": "ListItem", position: 3, name: guia.title, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guia.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="relative overflow-hidden bg-[#05111f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }}
        />

        <div className="shell relative pt-12 md:pt-16">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/45">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <Link href="/guias" className="transition-colors hover:text-white">Guías</Link>
            <ChevronRight size={13} className="text-white/25" />
            <Link href={`/temas/${guia.cluster.toLowerCase()}`} className="transition-colors hover:text-white">{guia.cluster}</Link>
          </nav>

          <header className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-[#c7f35b]/30 bg-[#c7f35b]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">{guia.cluster}</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">{guia.articleSection}</span>
            </div>
            <h1 className="display mt-6 text-white">
              {guia.title}
              <span className="mt-3 block text-[clamp(1.4rem,3vw,2.4rem)]">
                <span className="serif-it text-white/40">{guia.heroAccent}</span>
              </span>
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] font-medium text-white/50">
              <Link href={authorUrl} className="flex items-center gap-2 transition-colors hover:text-white"><User size={14} className="text-[#c7f35b]" /> {AUTHOR}</Link>
              <span className="flex items-center gap-2"><Calendar size={14} className="text-[#c7f35b]" /> {formatDate(guia.datePublished)}</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-[#c7f35b]" /> {guia.readingMinutes} min de lectura</span>
              <span className="flex items-center gap-2"><Tag size={14} className="text-[#c7f35b]" /> {guia.articleSection}</span>
            </div>
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.14em] text-white/35">Revisado el {formatDate(guia.dateModified)}</p>
            <p className="mt-6 text-[17px] leading-[1.8] text-white/65">{guia.excerpt}</p>
          </header>
        </div>

        <div className="shell relative py-12 md:py-16">
          <ArticleBody blocks={body} />

          <section className="mx-auto mt-14 max-w-3xl rounded-[24px] border border-white/10 bg-[#07182d] p-7 md:p-9">
            <p className="eyebrow text-[#c7f35b]">Fuentes y fabricantes</p>
            <p className="mt-3 text-[14px] leading-[1.7] text-white/55">Referencias técnicas de fabricantes empleadas en esta guía.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {guia.fabricantes.map((f) => (
                <li key={f.name}>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-1 rounded-2xl border border-white/10 bg-[#05111f] p-4 transition hover:border-[#c7f35b]/45">
                    <span className="flex items-center justify-between gap-2 text-[14px] font-bold text-white">{f.name}<ExternalLink size={14} className="text-white/40 transition-colors group-hover:text-[#c7f35b]" /></span>
                    <span className="text-[12.5px] leading-[1.6] text-white/50">{f.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {guia.normativa.length > 0 && (
            <section className="mx-auto mt-6 max-w-3xl rounded-[24px] border border-white/10 bg-[#07182d] p-7 md:p-9">
              <p className="eyebrow text-[#c7f35b] flex items-center gap-2"><Scale size={14} /> Marco normativo y estándares</p>
              <p className="mt-3 text-[14px] leading-[1.7] text-white/55">Criterios regulatorios y normas técnicas que enmarcan lo descrito.</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {guia.normativa.map((n) => (
                  <li key={n.name}>
                    <a href={n.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col gap-1 rounded-2xl border border-white/10 bg-[#05111f] p-4 transition hover:border-[#c7f35b]/45">
                      <span className="flex items-center justify-between gap-2 text-[14px] font-bold text-white">{n.name}<ExternalLink size={14} className="text-white/40 transition-colors group-hover:text-[#c7f35b]" /></span>
                      <span className="text-[12.5px] leading-[1.6] text-white/50">{n.note}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {guia.faq.length > 0 && (
            <section className="mx-auto mt-10 max-w-3xl">
              <p className="eyebrow text-white/45 flex items-center gap-2"><HelpCircle size={14} /> Preguntas frecuentes</p>
              <div className="mt-5 divide-y divide-white/10 rounded-[24px] border border-white/10 bg-[#07182d]">
                {guia.faq.map((f, i) => (
                  <details key={i} className="group p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15.5px] font-bold tracking-[-0.01em] text-white marker:hidden [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 text-[#c7f35b] transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-[14.5px] leading-[1.75] text-white/60">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {relacionadas.length > 0 && (
            <section className="mx-auto mt-10 max-w-3xl">
              <p className="eyebrow text-white/45">Seguir leyendo</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {relacionadas.map((r) => (
                  <Link key={r.slug} href={`/guias/${r.slug}`} className="group rounded-2xl border border-white/10 bg-[#07182d] p-5 transition hover:border-[#c7f35b]/45 hover:bg-[#0b2748]">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">{r.cluster}</span>
                    <p className="mt-2 text-[15px] font-bold leading-[1.25] tracking-[-0.02em] text-white transition-colors group-hover:text-[#c7f35b]">{r.title}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mx-auto mt-10 max-w-3xl">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-7 md:flex-row md:items-center md:p-9">
              <div>
                <p className="eyebrow text-[#c7f35b]">Siguiente paso</p>
                <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-white/65">Se aplica lo descrito a un espacio concreto con una valoración técnica clara y sin compromiso.</p>
              </div>
              <Link href={guia.service.href} className="inline-flex shrink-0 items-center justify-between gap-8 rounded-full bg-[#c7f35b] px-6 py-4 text-sm font-bold text-[#05111f] transition hover:scale-[1.03]">
                {guia.service.label} <ArrowRight size={17} />
              </Link>
            </div>
          </section>

          <div className="mx-auto mt-12 max-w-3xl">
            <Link href="/guias" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">← Todas las guías</Link>
          </div>
        </div>
      </article>
    </>
  );
}
