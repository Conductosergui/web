import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, Layers, Mail, MessageCircle, Phone, Wind } from "lucide-react";
import { getConcepto } from "@/data/conceptos";
import { servicioPath, serviciosDe, type Departamento } from "@/data/servicios";
import { EMAIL, PHONE, PHONE_FORMATTED, WHATSAPP_URL } from "@/lib/entidad";

// Bloques compartidos por las páginas de zona de servicio (/baix-penedes, /el-vendrell).

export function ZonaHero({
  crumb,
  eyebrow,
  titulo,
  acento,
  intro,
  children,
}: {
  crumb: string;
  eyebrow: string;
  titulo: string;
  acento: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#05111f] pt-16 pb-12 md:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(20,93,160,0.4), transparent 65%)" }}
      />
      <div className="shell relative">
        <nav aria-label="Migas de pan" className="flex flex-wrap items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-white/50">
          <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
          <ChevronRight size={13} className="text-white/25" />
          <span className="text-[#c7f35b]">{crumb}</span>
        </nav>
        <span className="eyebrow mt-8 block text-[#c7f35b]">{eyebrow}</span>
        <h1 className="display mt-5 max-w-4xl text-white">
          {titulo}
          <br />
          <span className="serif-it text-white/50">{acento}</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[17px] leading-[1.8] text-white/60">{intro}</p>
        {children}
      </div>
    </section>
  );
}

const GRUPOS: { dep: Departamento; titulo: string; Icon: typeof Wind }[] = [
  { dep: "climatizacion", titulo: "Climatización, conductos y ventilación", Icon: Wind },
  { dep: "pladur", titulo: "Pladur y aislamiento", Icon: Layers },
];

export function ZonaServicios({ id, titulo }: { id: string; titulo: string }) {
  return (
    <section aria-labelledby={id} className="bg-[#05111f] pb-16 md:pb-24">
      <div className="shell">
        <h2 id={id} className="mb-10 text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
          {titulo}
        </h2>
        {GRUPOS.map(({ dep, titulo: t, Icon }) => (
          <div key={dep} className="mb-10 last:mb-0">
            <div className="mb-6 flex items-center gap-4 border-b border-white/10 pb-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#c7f35b] text-[#05111f]">
                <Icon size={17} strokeWidth={2.2} aria-hidden="true" />
              </span>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50">{t}</h3>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {serviciosDe(dep).map((s) => (
                <Link
                  key={s.slug}
                  href={servicioPath(s.slug)}
                  className="group flex flex-col justify-between gap-6 rounded-[24px] border border-white/10 bg-[#07182d] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#c7f35b]/45 hover:bg-[#0b2748]"
                >
                  <div>
                    <span className="rounded-full border border-[#c7f35b]/30 bg-[#c7f35b]/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#c7f35b]">
                      {getConcepto(s.conceptos[0]).nombre}
                    </span>
                    <h4 className="mt-5 text-[clamp(1.2rem,1.8vw,1.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white transition-colors group-hover:text-[#c7f35b]">
                      {s.nombre}
                    </h4>
                    <p className="mt-3 text-[14px] leading-[1.7] text-white/60">{s.resumen}</p>
                  </div>
                  <span className="flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors group-hover:text-[#c7f35b]">
                    Ver servicio <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ZonaContacto({ titulo }: { titulo: string }) {
  const enlace = "ce-link inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white";
  return (
    <section aria-labelledby="zona-contacto" className="bg-[#05111f] pb-24 md:pb-32">
      <div className="shell">
        <div className="flex flex-col gap-8 rounded-[28px] border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] to-[#07182d] p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <h2 id="zona-contacto" className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {titulo}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-[1.7] text-white/65">
              Se describe el espacio y se recibe una propuesta con alcance, materiales y plazos antes de cualquier intervención.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={enlace}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={`tel:${PHONE}`} className={enlace}>
                <Phone size={16} /> {PHONE_FORMATTED}
              </a>
              <a href={`mailto:${EMAIL}`} className={enlace}>
                <Mail size={16} /> {EMAIL}
              </a>
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
  );
}
