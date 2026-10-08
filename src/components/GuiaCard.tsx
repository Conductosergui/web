import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Guia } from "@/data/guias";
import { formatDate } from "@/data/guias";

export function GuiaCard({ guia }: { guia: Guia }) {
  return (
    <Link
      href={`/guias/${guia.slug}`}
      className="group flex flex-col justify-between rounded-[24px] border border-white/10 bg-[#07182d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
    >
      <div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#c7f35b]/30 bg-[#c7f35b]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">
            {guia.cluster}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">{guia.readingMinutes} min</span>
        </div>
        <h3 className="mt-5 text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white transition-colors group-hover:text-[#c7f35b]">
          {guia.title}
        </h3>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-white/55">{guia.excerpt}</p>
      </div>
      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
        <time className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/40" dateTime={guia.datePublished}>
          {formatDate(guia.datePublished)}
        </time>
        <span className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors group-hover:text-[#c7f35b]">
          Leer guía <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
