import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { AUTHOR, PUBLISHER, formatDate, GUIAS } from "@/data/guias";
import { AUTHOR_DESCRIPTION, AUTHOR_JOB_TITLE, AUTHOR_PATH, AUTHOR_YEARS_EXPERIENCE, ID, pageId } from "@/lib/entidad";
import { breadcrumbNode, pageNode, personNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const DESCRIPTION = `${AUTHOR}, ${AUTHOR_JOB_TITLE.toLowerCase()} y titular de ${PUBLISHER}, con ${AUTHOR_YEARS_EXPERIENCE} años de experiencia. Notas técnicas sobre climatización y construcción en seco.`;

export const metadata: Metadata = buildMetadata({
  title: `${AUTHOR} | Autor`,
  description: DESCRIPTION,
  path: AUTHOR_PATH,
  type: "profile",
});

// ProfilePage cuyo sujeto es el nodo Person único del autor, vinculado a la empresa por @id.
const graph = [
  pageNode({ path: AUTHOR_PATH, name: `${AUTHOR} — Autor`, description: DESCRIPTION, type: "ProfilePage", mainEntity: ref(ID.persona) }),
  personNode({ mainEntityOfPage: ref(pageId(AUTHOR_PATH)) }),
  breadcrumbNode(AUTHOR_PATH, [
    { name: "Guías", path: "/guias" },
    { name: AUTHOR, path: AUTHOR_PATH },
  ]),
];

export default function AutorPage() {
  const notas = [...GUIAS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

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
            <Link href="/guias" className="transition-colors hover:text-white">Guías</Link>
            <ChevronRight size={13} className="text-white/25" />
            <span className="text-[#c7f35b]">Autor</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-[#c7f35b] text-[32px] font-extrabold text-[#05111f]">
              {AUTHOR.split(" ").map((p) => p[0]).join("")}
            </div>
            <div>
              <p className="eyebrow text-[#c7f35b]">{AUTHOR_JOB_TITLE} · Autor</p>
              <h1 className="display mt-4 text-white">{AUTHOR}</h1>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.8] text-white/60">
                {AUTHOR_DESCRIPTION} Las notas publicadas aquí recogen criterios aplicados en el día a día del oficio, con fuentes de fabricantes y del marco normativo vigente.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/guias" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-[#c7f35b]">
                  Ver todas las guías <ArrowRight size={16} />
                </Link>
                <Link href="/presupuestador" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white">
                  Solicitar valoración <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#05111f] pb-24 md:pb-32">
        <div className="shell">
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">Notas publicadas</h2>
            <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-white/50">{notas.length} guías</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {notas.map((g) => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="group flex flex-col gap-2 rounded-[20px] border border-white/10 bg-[#07182d] p-6 transition hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]">
                <div className="flex items-center gap-3">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">{g.cluster}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/50">{formatDate(g.datePublished)}</span>
                </div>
                <p className="text-[16px] font-bold leading-[1.25] tracking-[-0.02em] text-white transition-colors group-hover:text-[#c7f35b]">{g.title}</p>
                <p className="text-[13.5px] leading-[1.65] text-white/50">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
