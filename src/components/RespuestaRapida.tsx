import { Zap } from "lucide-react";

/**
 * Respuesta directa (AEO): pregunta principal de la página + respuesta autocontenida y citable.
 * Debe construirse solo con contenido ya documentado en el proyecto.
 */
export function RespuestaRapida({ pregunta, respuesta, className = "" }: { pregunta: string; respuesta: string; className?: string }) {
  return (
    <section
      aria-label="Respuesta rápida"
      className={`rounded-[24px] border border-[#c7f35b]/30 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-6 md:p-8 ${className}`}
    >
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#c7f35b]">
        <Zap size={14} aria-hidden="true" /> Respuesta rápida
      </p>
      <h2 className="mt-4 text-[clamp(1.25rem,2.2vw,1.6rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white">{pregunta}</h2>
      <p className="mt-3 max-w-3xl text-[16px] leading-[1.75] text-white/75">{respuesta}</p>
    </section>
  );
}
