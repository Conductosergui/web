import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { GuiaCard } from "@/components/GuiaCard";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbNode, pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import {
  BASE_URL,
  CLUSTER_PILLAR,
  CLUSTER_RELATED,
  CLUSTERS,
  clusterSlug,
  getClusterBySlug,
  getGuiasPorCluster,
  type Cluster,
} from "@/data/guias";

export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: clusterSlug(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ cluster: string }> }): Promise<Metadata> {
  const { cluster: slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) return { title: "Tema no encontrado" };
  const pillar = CLUSTER_PILLAR[cluster];
  return buildMetadata({ title: `${cluster} | Temas`, description: pillar.intro, path: `/temas/${slug}` });
}

export default async function TemaPage({ params }: { params: Promise<{ cluster: string }> }) {
  const { cluster: slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) notFound();

  const pillar = CLUSTER_PILLAR[cluster];
  const notas = getGuiasPorCluster(cluster);
  const relacionados = CLUSTER_RELATED[cluster];
  const url = `${BASE_URL}/temas/${slug}`;

  const path = `/temas/${slug}`;
  const listId = `${url}#guias`;

  // Migas: Inicio › Guías › {tema}, igual que la navegación visible.
  // Cuando exista /temas como índice, basta con insertar { name: "Temas", path: "/temas" } aquí.
  const graph = [
    pageNode({
      path,
      name: `${cluster} — Conductos Ergui`,
      description: pillar.intro,
      type: "CollectionPage",
      about: { "@type": "Thing", name: cluster },
      mainEntity: ref(listId),
    }),
    {
      "@type": "ItemList",
      "@id": listId,
      name: `Guías sobre ${cluster}`,
      itemListElement: notas.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.title,
        url: `${BASE_URL}/guias/${g.slug}`,
      })),
    },
    breadcrumbNode(path, [
      { name: "Guías", path: "/guias" },
      { name: cluster, path },
    ]),
  ];

  return (
    <>
      <JsonLd graph={graph} />

      <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }} />
        <div className="shell relative">
          <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
            <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
            <ChevronRight size={13} className="text-white/25" />
            <Link href="/guias" className="transition-colors hover:text-white">Guías</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#c7f35b]">Tema</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <span className="eyebrow text-[#c7f35b]">Tema · contenido pilar</span>
            <h1 className="display mt-5 text-white">
              {cluster}
              <span className="mt-2 block text-[clamp(1.3rem,3vw,2.2rem)]">
                <span className="serif-it text-white/50">{pillar.accent}</span>
              </span>
            </h1>
            <p className="mt-7 text-[17px] leading-[1.8] text-white/65">{pillar.intro}</p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {pillar.points.map((p) => (
              <div key={p} className="flex gap-3 rounded-2xl border border-white/10 bg-[#07182d] p-5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7f35b]" />
                <p className="text-[14.5px] leading-[1.7] text-white/70">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05111f] pb-12">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">Notas del tema</h2>
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{notas.length} guías</span>
          </div>
          {notas.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {notas.map((g) => (
                <GuiaCard key={g.slug} guia={g} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-white/50">Aún no hay notas publicadas para este tema.</p>
          )}
        </div>
      </section>

      <section className="bg-[#05111f] pb-12">
        <div className="shell">
          <p className="eyebrow text-white/50">Temas relacionados</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {relacionados.map((r: Cluster) => (
              <Link key={r} href={`/temas/${clusterSlug(r)}`} className="ce-link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]">
                {r} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-7 md:flex-row md:items-center md:p-9">
            <div>
              <p className="eyebrow text-[#c7f35b]">Aplicar este tema</p>
              <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-white/65">Se traslada lo descrito a un espacio concreto con una valoración técnica clara y sin compromiso.</p>
            </div>
            <Link href={pillar.serviceHref} className="inline-flex shrink-0 items-center justify-between gap-8 rounded-full bg-[#c7f35b] px-6 py-4 text-sm font-bold text-[#05111f] transition hover:scale-[1.03]">
              {pillar.serviceLabel} <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
