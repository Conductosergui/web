import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Block, Cluster } from "@/data/guias";
import { clusterSlug, getGuia } from "@/data/guias";

export type RenderBlock =
  | Block
  | { kind: "internallink"; slug: string }
  | { kind: "topiclink"; cluster: Cluster }
  | { kind: "callout"; text: string };

export function ArticleBody({ blocks }: { blocks: RenderBlock[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h2 key={i} className="mt-12 mb-4 text-[clamp(1.4rem,2.6vw,2rem)] font-bold tracking-[-0.03em] text-white">
              {b.text}
            </h2>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul key={i} className="my-6 grid gap-3">
              {b.items.map((it, j) => (
                <li key={j} className="flex gap-3 text-[15.5px] leading-[1.75] text-white/70">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7f35b]" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.kind === "quote") {
          return (
            <figure key={i} className="my-8 border-l-2 border-[#c7f35b] pl-5">
              <blockquote className="text-[17px] leading-[1.7] text-white/85">{b.text}</blockquote>
              <figcaption className="mt-3 text-[12px] font-bold uppercase tracking-[0.16em] text-white/50">Fuente · {b.cite}</figcaption>
            </figure>
          );
        }
        if (b.kind === "callout") {
          return (
            <div key={i} className="my-7 rounded-2xl border border-white/10 bg-[#07182d] p-5">
              <span className="eyebrow text-[#c7f35b]">Regla práctica</span>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-white/75">{b.text}</p>
            </div>
          );
        }
        if (b.kind === "topiclink") {
          return (
            <div key={i} className="my-7">
              <Link
                href={`/temas/${clusterSlug(b.cluster)}`}
                className="group flex items-center gap-4 rounded-2xl border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-4 transition hover:border-[#c7f35b]/55"
              >
                <div className="flex-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">Tema</span>
                  <p className="mt-1 text-[15px] font-bold tracking-[-0.01em] text-white transition-colors group-hover:text-[#c7f35b]">{b.cluster}</p>
                  <p className="mt-0.5 text-[12.5px] leading-[1.5] text-white/50">Contenido pilar y todas las notas del tema.</p>
                </div>
                <ArrowRight size={17} className="text-[#c7f35b] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          );
        }
        if (b.kind === "internallink") {
          const g = getGuia(b.slug);
          if (!g) return null;
          return (
            <div key={i} className="my-7">
              <Link
                href={`/guias/${g.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 border-l-2 border-l-[#c7f35b] bg-[#07182d] p-4 transition hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
              >
                <div className="flex-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">Sigue con · {g.cluster}</span>
                  <p className="mt-1 text-[15px] font-bold tracking-[-0.02em] text-white transition-colors group-hover:text-[#c7f35b]">{g.title}</p>
                </div>
                <ArrowRight size={17} className="text-[#c7f35b] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          );
        }
        return (
          <p key={i} className="my-5 text-[16px] leading-[1.8] text-white/70">
            {b.kind === "p" ? b.text : null}
          </p>
        );
      })}
    </div>
  );
}
