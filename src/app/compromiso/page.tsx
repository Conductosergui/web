import Link from "next/link";
import { ArrowRight, Check, Eye, Handshake, ShieldCheck, Sparkles } from "lucide-react";

const principles = [
  [Eye, "Claridad desde el inicio", "Se explican el alcance, los materiales previstos y las limitaciones antes de aceptar el trabajo."],
  [ShieldCheck, "Soluciones con criterio", "Se priorizan la seguridad, la durabilidad y la adecuación al espacio por encima de los atajos."],
  [Sparkles, "Respeto por el espacio", "Se protegen las superficies y las zonas de paso; al terminar, se retiran los residuos propios de la intervención."],
  [Handshake, "Trato directo", "Se trata con un equipo que conoce el proyecto, sin cadenas de intermediarios ni respuestas automáticas."],
] as const;

const expectations = [
  "Una valoración comprensible y sin conceptos ambiguos.",
  "Comunicación ante cualquier cambio durante el trabajo.",
  "Uso responsable de materiales adecuados al sistema.",
  "Comprobación visual del resultado y recogida final.",
  "Atención posterior ante dudas sobre la intervención.",
];

export default function CompromisoPage() {
  return (
    <>
      <section className="bg-ink py-24 text-white md:py-32">
        <div className="shell">
          <p className="eyebrow text-accent">Compromiso</p>
          <h1 className="display mt-7 max-w-5xl">
            La confianza no se promete.
            <br />
            <span className="text-white/35">Se demuestra.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-8 text-white/60">
            Una instalación de conductos de aire acondicionado o un tabique de pladur quedan ocultos con frecuencia. El modo de trabajo, en cambio, no: documentación clara, comunicación directa y cuidado en cada fase.
          </p>
        </div>
      </section>

      <section className="shell py-24 md:py-32">
        <div className="grid gap-5 md:grid-cols-2">
          {principles.map(([Icon, t, d], i) => {
            const Cmp = Icon as typeof Check;
            return (
              <article key={t} className="rounded-[28px] border border-line bg-white p-8 md:p-10">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-sky text-blue">
                  <Cmp />
                </span>
                <small className="eyebrow mt-12 block text-lead">Principio 0{i + 1}</small>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em]">{t}</h2>
                <p className="mt-5 max-w-md leading-7 text-lead">{d}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-sky py-24">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <h2 className="heading">Qué cabe esperar.</h2>
          <div className="grid gap-4">
            {expectations.map((x) => (
              <p key={x} className="flex gap-4 border-b border-navy/15 pb-4 text-sm leading-6">
                <Check className="shrink-0 text-blue" size={19} />
                {x}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-24">
        <div className="rounded-[28px] bg-blue p-8 text-white md:p-14">
          <p className="eyebrow text-accent">Un proyecto, una conversación técnica</p>
          <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-medium tracking-[-0.05em] md:text-6xl">
              Cada proyecto comienza con una conversación técnica clara.
            </h2>
            <Link href="/presupuestador" className="flex items-center gap-6 rounded-full bg-white px-6 py-4 text-sm font-bold text-ink">
              Solicitar valoración <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
