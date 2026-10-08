"use client";

import { useMemo, useState } from "react";
import { CLUSTERS, GUIAS, type Cluster } from "@/data/guias";
import { GuiaCard } from "@/components/GuiaCard";

type Filtro = "Todos" | Cluster;
const FILTROS: Filtro[] = ["Todos", ...CLUSTERS];

export function GuiasExplorer() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");

  const visibles = useMemo(
    () => (filtro === "Todos" ? GUIAS : GUIAS.filter((g) => g.cluster === filtro)),
    [filtro]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filtrar guías por temática">
        {FILTROS.map((f) => {
          const activo = f === filtro;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={activo}
              onClick={() => setFiltro(f)}
              className={`rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition ${
                activo
                  ? "bg-[#c7f35b] text-[#05111f]"
                  : "border border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visibles.map((g) => (
          <GuiaCard key={g.slug} guia={g} />
        ))}
      </div>

      {visibles.length === 0 && (
        <p className="mt-10 text-sm text-white/50">No hay guías publicadas para esta temática todavía.</p>
      )}
    </div>
  );
}
