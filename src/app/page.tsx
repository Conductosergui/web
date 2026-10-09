import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Fan,
  Mail,
  MapPin,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { ContactoMailto } from "@/components/ContactoMailto";
import { GuiasExplorer } from "@/components/GuiasExplorer";
import { SERVICIOS, servicioPath } from "@/data/servicios";
import { JsonLd } from "@/components/JsonLd";
import {
  BASE_COMARCA,
  BASE_LOCALITY,
  EMAIL,
  ID,
  MUNICIPIOS_BAIX_PENEDES,
  SITE_DESCRIPTION,
  SITE_TITLE,
} from "@/lib/entidad";
import { pageNode, ref } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

// La home es la página cuyo sujeto principal es la entidad raíz.
const graph = [
  pageNode({
    path: "/",
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    withBreadcrumb: false,
    about: ref(ID.negocio),
    mainEntity: ref(ID.negocio),
  }),
];

const AREAS = MUNICIPIOS_BAIX_PENEDES.map(([m]) => m);

const STEPS = [
  ["01", "Recepción", "Recepción de la solicitud con el alcance, la ubicación y los antecedentes técnicos del espacio."],
  ["02", "Evaluación", "Revisión técnica, definición de la solución y entrega de una propuesta con alcance detallado."],
  ["03", "Ejecución", "Intervención con protección del entorno, verificación del resultado y entrega documentada."],
];

// Esquema orientativo (no cartográfico): posición aproximada respecto a El Vendrell, costa al sur.
const PINS = [
  ["El Vendrell", 50, 50, true],
  ["Calafell", 64, 60, false],
  ["Cunit", 80, 58, false],
  ["Santa Oliva", 54, 36, false],
  ["L'Arboç", 69, 31, false],
  ["La Bisbal", 44, 24, false],
  ["Albinyana", 32, 38, false],
  ["Bonastre", 22, 54, false],
] as const;

const GUARANTEES = [
  [ShieldCheck, "Presupuesto claro", "Alcance, materiales, plazos y condiciones económicas definidos antes del inicio de cualquier intervención."],
  [Clock3, "Cumplimiento de plazos", "Planificación comunicada y respeto por los tiempos acordados. Cualquier variación se informa con antelación."],
  [Sparkles, "Cuidado del entorno", "Protección de superficies y zonas de paso. Retiro de los residuos generados durante la intervención."],
  [Fan, "Criterio técnico", "Recomendación basada en la necesidad real del proyecto, con explicación de las opciones disponibles."],
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd graph={graph} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
.ce-root { font-family: var(--font-sans-app), "Google Sans Flex", Arial, sans-serif; color: #e9eef3; background: #05111f; -webkit-font-smoothing: antialiased; }
.ce-root * { box-sizing: border-box; }
.ce-root ::selection { background: #c7f35b; color: #05111f; }
.ce-display { font-family: var(--font-sans-app), "Google Sans Flex", Arial, sans-serif; font-weight: 700; letter-spacing: -0.05em; line-height: 0.9; }
.ce-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; }
.ce-grain { position: absolute; inset: 0; pointer-events: none; opacity: 0.32; mix-blend-mode: overlay; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
.ce-grid { background-image: linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px); background-size: 56px 56px; }
.ce-marquee { overflow: hidden; white-space: nowrap; }
.ce-marquee > div { display: inline-flex; animation: ce-mq 64s linear infinite; }
@keyframes ce-mq { to { transform: translateX(-50%); } }
.ce-pulse { position: relative; }
.ce-pulse::before { content: ""; position: absolute; inset: -6px; border-radius: 999px; background: #c7f35b; opacity: 0.5; animation: ce-ping 2.4s cubic-bezier(0,0,0.2,1) infinite; }
@keyframes ce-ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
.ce-scan { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, #c7f35b, transparent); animation: ce-scan 6s ease-in-out infinite; }
@keyframes ce-scan { 0% { top: 8%; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { top: 92%; opacity: 0; } }
.ce-reveal { animation: ce-reveal 0.9s cubic-bezier(0.2,0.8,0.2,1) both; }
.ce-reveal-2 { animation: ce-reveal 0.9s 0.1s cubic-bezier(0.2,0.8,0.2,1) both; }
.ce-reveal-3 { animation: ce-reveal 0.9s 0.2s cubic-bezier(0.2,0.8,0.2,1) both; }
@keyframes ce-reveal { from { opacity: 0; transform: translateY(22px); } }
.ce-card { transition: transform 0.5s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s; }
.ce-card:hover { transform: translateY(-6px); border-color: rgba(199,243,91,0.45); }
.ce-card:hover .ce-card-img { transform: scale(1.06); }
.ce-card-img { transition: transform 1.2s cubic-bezier(0.2,0.8,0.2,1); }
.ce-link { position: relative; }
.ce-link::after { content: ""; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform 0.4s cubic-bezier(0.2,0.8,0.2,1); }
.ce-link:hover::after { transform: scaleX(1); transform-origin: left; }
.ce-outline { color: transparent; -webkit-text-stroke: 1px rgba(233,238,243,0.14); }
.ce-ring { animation: ce-rotate 40s linear infinite; }
@keyframes ce-rotate { to { transform: rotate(360deg); } }
.ce-ring-pulse { animation: ce-ringpulse 3.2s ease-in-out infinite; }
@keyframes ce-ringpulse { 0%,100% { opacity: 0.35; } 50% { opacity: 0.85; } }
.ce-float { animation: ce-float 6s ease-in-out infinite; }
@keyframes ce-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .ce-marquee > div, .ce-pulse::before, .ce-scan, .ce-ring, .ce-ring-pulse, .ce-float, .ce-reveal, .ce-reveal-2, .ce-reveal-3 { animation: none !important; } }
@media (max-width: 767px) { .ce-display { letter-spacing: -0.04em; } }
          `,
        }}
      />

      <div className="ce-root min-h-screen w-full overflow-x-hidden">
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-[#05111f]">
          <div className="ce-grid absolute inset-0 opacity-60" />
          <div className="ce-grain" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(20,93,160,0.35), transparent 65%)" }}
          />
          <div className="relative mx-auto grid w-[min(1240px,calc(100%-40px))] items-stretch gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="flex flex-col justify-between">
              <div className="ce-reveal flex items-center gap-4">
                <span className="h-px w-12 bg-[#c7f35b]" />
                <span className="ce-eyebrow text-[#c7f35b]">Servicio técnico local · {BASE_LOCALITY} · {BASE_COMARCA}</span>
              </div>

              <div className="ce-reveal-2 my-12 lg:my-16">
                <h1 className="ce-display text-[clamp(3rem,8vw,7.5rem)] text-white">
                  Climatización y Pladur
                  <br />
                  <span className="serif-it text-white/35">en El Vendrell y Baix Penedès</span>
                </h1>
                <p className="mt-8 max-w-xl text-[17px] font-medium leading-[1.7] text-white/60 md:text-lg">
                  Se realizan instalación, mantenimiento y reparación de conductos de aire acondicionado y soluciones de pladur, con estándares técnicos rigurosos, atención al detalle y comunicación transparente en cada fase del proyecto.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/presupuestador"
                    className="group inline-flex items-center justify-between gap-8 rounded-full bg-[#c7f35b] px-7 py-4 text-sm font-bold text-[#05111f] transition hover:scale-[1.02]"
                  >
                    Solicitar presupuesto
                    <ArrowUpRight size={18} className="transition group-hover:rotate-45" />
                  </Link>
                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5"
                  >
                    Ver servicios <ArrowDown size={15} />
                  </a>
                </div>
              </div>

              <div className="ce-reveal-3 grid grid-cols-3 gap-6 border-t border-white/10 pt-7">
                {[
                  [String(MUNICIPIOS_BAIX_PENEDES.length), "Municipios atendidos"],
                  ["02", "Especialidades técnicas"],
                  ["100%", "Transparencia documental"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <strong className="ce-display block text-[34px] text-white md:text-[42px]">{n}</strong>
                    <small className="mt-1 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{l}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="ce-reveal-2 relative min-h-[480px] overflow-hidden rounded-[28px] border border-white/10 lg:min-h-full">
              <img
                fetchPriority="high"
                decoding="async"
                width={1100}
                height={1400}
                src="https://images.pexels.com/photos/11538226/pexels-photo-11538226.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1100"
                alt="Técnico instalando sistema de conductos de aire acondicionado"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05111f] via-[#05111f]/20 to-transparent lg:bg-gradient-to-r lg:from-[#05111f]/80 lg:via-transparent lg:to-transparent" />
              <div className="ce-scan" />
              <div className="absolute left-5 right-5 top-5 flex items-center justify-between rounded-2xl border border-white/15 bg-[#05111f]/60 px-4 py-3 backdrop-blur-md">
                <span className="ce-eyebrow text-white/70">Agenda de obra</span>
                <span className="flex items-center gap-2 text-[11px] font-bold text-[#c7f35b]">
                  <span className="ce-pulse relative h-2 w-2 rounded-full bg-[#c7f35b]" />
                  ABIERTA
                </span>
              </div>
              <div className="ce-float absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-[#05111f]/70 p-5 backdrop-blur-md">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <small className="ce-eyebrow text-[#c7f35b]">Disponibilidad</small>
                    <p className="mt-2 text-sm font-medium leading-snug text-white/75">
                      Se ofrecen valoraciones técnicas en {BASE_LOCALITY} y en toda la comarca del {BASE_COMARCA}.
                    </p>
                  </div>
                  <span className="ce-display text-2xl text-white/70">{MUNICIPIOS_BAIX_PENEDES.length}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ MARQUESINA DE MARCA (Ultra Slow Technical Ticker) ============ */}
        <div aria-hidden="true" className="relative w-full overflow-hidden border-y border-white/10 bg-[#07182d] py-4">
          <div className="flex w-max animate-[marquee_70s_linear_infinite]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 4 }).flatMap((_, r) =>
                  (["CONDUCTOS ERGUI", "CLIMATIZACIÓN & PLADUR", "EL VENDRELL"] as const).map((t, i) => (
                    <span key={`${copy}-${r}-${i}`} className="flex items-center">
                      <span className="whitespace-nowrap px-6 text-[22px] font-extrabold uppercase tracking-[-1px] text-white/60 md:text-[26px]">{t}</span>
                      <span className="px-2 text-[22px] font-extrabold text-lime-400/60 md:text-[26px]">—</span>
                    </span>
                  ))
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============ ESPECIALIDADES ============ */}
        <section id="servicios" className="relative bg-[#05111f] py-24 md:py-36">
          <div className="ce-grain" />
          <div className="relative mx-auto w-[min(1240px,calc(100%-40px))]">
            <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#c7f35b]" />
                  <span className="ce-eyebrow text-[#c7f35b]">Especialidades</span>
                </div>
                <h2 className="ce-display mt-6 max-w-3xl text-[clamp(2.4rem,5.4vw,5rem)] text-white">
                  Dos especialidades.
                  <br />
                  <span className="serif-it text-white/35">Un solo estándar.</span>
                </h2>
              </div>
              <p className="max-w-sm text-[15px] font-medium leading-[1.7] text-white/55">
                No se abarca todo. El oficio se concentra en dos áreas que exigen precisión, planificación y acabados impecables.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
              <article id="climatizacion" aria-labelledby="climatizacion-titulo" className="ce-card group relative col-span-12 min-h-[620px] scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-[#07182d] lg:col-span-7">
                <img
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1200}
                  src="https://images.pexels.com/photos/33430528/pexels-photo-33430528.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1200"
                  alt="Sistema de conductos de aire acondicionado"
                  className="ce-card-img absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05111f] via-[#05111f]/55 to-[#05111f]/10" />
                <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#c7f35b] text-[#05111f]">
                      <Wind size={22} strokeWidth={2.2} />
                    </span>
                    <span className="ce-eyebrow text-white/50">01 / Aire</span>
                  </div>
                  <div>
                    <h3 id="climatizacion-titulo" className="ce-display text-[clamp(2.2rem,4.4vw,3.6rem)] text-white">Climatización y Conductos</h3>
                    <p className="mt-5 max-w-md text-[15px] font-medium leading-[1.7] text-white/65">
                      Instalación, adaptación, mantenimiento y reparación de redes de distribución de aire en {BASE_LOCALITY} y el {BASE_COMARCA}. Equilibrio de caudales, sustitución de tramos deteriorados y mejoras de eficiencia en sistemas existentes.
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {["Instalación", "Mantenimiento", "Reparación", "Rejillas", "Equilibrado"].map((t) => (
                        <li key={t} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article id="pladur" aria-labelledby="pladur-titulo" className="ce-card group relative col-span-12 min-h-[620px] scroll-mt-24 overflow-hidden rounded-[28px] border border-white/10 bg-[#0b2748] lg:col-span-5">
                <img
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={1200}
                  src="https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
                  alt="Profesional ejecutando trabajos de pladur"
                  className="ce-card-img absolute inset-0 h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05111f] via-[#05111f]/50 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-[#c7f35b] text-[#05111f]">
                      <Ruler size={22} strokeWidth={2.2} />
                    </span>
                    <span className="ce-eyebrow text-white/50">02 / Espacio</span>
                  </div>
                  <div>
                    <h3 id="pladur-titulo" className="ce-display text-[clamp(2.2rem,4.4vw,3.6rem)] text-white">Pladur, Tabiquería y Aislamiento</h3>
                    <p className="mt-5 max-w-md text-[15px] font-medium leading-[1.7] text-white/65">
                      Tabiques, falsos techos, cajones técnicos, trasdosados y aislamiento térmico y acústico en {BASE_LOCALITY} y el {BASE_COMARCA}. Replanteo preciso y acabados listos para pintura o revestimiento.
                    </p>
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {["Tabiques", "Techos", "Aislamiento", "Cajones"].map((t) => (
                        <li key={t} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </div>

            <nav aria-label="Servicios" className="mt-8 flex flex-wrap gap-3">
              {SERVICIOS.map((sv) => (
                <Link
                  key={sv.slug}
                  href={servicioPath(sv.slug)}
                  className="ce-link inline-flex items-center gap-2 rounded-full border border-[#c7f35b]/35 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-[#c7f35b] transition hover:border-[#c7f35b] hover:bg-[#c7f35b]/10"
                >
                  {sv.nombre} <ArrowRight size={14} />
                </Link>
              ))}
            </nav>

            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/temas/conductos" className="ce-link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]">
                Notas sobre conductos <ArrowRight size={14} />
              </Link>
              <Link href="/temas/pladur" className="ce-link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]">
                Notas sobre pladur <ArrowRight size={14} />
              </Link>
              <Link href="/glosario" className="ce-link inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]">
                Glosario técnico <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* ============ METODO ============ */}
        <section id="metodo" className="relative overflow-hidden bg-[#0b2748] py-24 md:py-32">
          <div className="ce-grid absolute inset-0 opacity-40" />
          <span aria-hidden="true" className="ce-outline pointer-events-none absolute -right-10 top-10 select-none text-[clamp(8rem,22vw,22rem)] font-black leading-none">
            03
          </span>
          <div className="relative mx-auto grid w-[min(1240px,calc(100%-40px))] gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#c7f35b]" />
                <span className="ce-eyebrow text-[#c7f35b]">Método</span>
              </div>
              <h2 className="ce-display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] text-white">
                Menos ruido.
                <br />
                <span className="serif-it text-white/35">Más oficio.</span>
              </h2>
              <p className="mt-8 max-w-sm text-[15px] font-medium leading-[1.7] text-white/60">
                Desde el primer contacto se conoce qué ocurrirá a continuación. Sin sorpresas, sin intermediarios, sin ambigüedades.
              </p>
              <div className="mt-10 hidden items-center gap-4 lg:flex">
                <span className="ce-eyebrow text-white/50">Proceso estandarizado</span>
                <span className="h-px flex-1 bg-white/15" />
                <span className="ce-display text-2xl text-[#c7f35b]">III</span>
              </div>
            </div>
            <div>
              {STEPS.map(([n, t, d]) => (
                <div key={n} className="group grid gap-5 border-t border-white/15 py-8 transition hover:border-[#c7f35b]/50 sm:grid-cols-[90px_220px_1fr] sm:gap-8">
                  <span className="ce-display text-[44px] text-[#c7f35b]/80 transition group-hover:text-[#c7f35b]">{n}</span>
                  <h3 className="ce-display text-[26px] text-white">{t}</h3>
                  <p className="max-w-md text-[14.5px] font-medium leading-[1.7] text-white/55">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ COBERTURA ============ */}
        <section id="cobertura" className="relative overflow-hidden bg-[#05111f] py-24 md:py-32">
          <div className="ce-grain" />
          <div className="relative mx-auto grid w-[min(1240px,calc(100%-40px))] items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#c7f35b]" />
                <span className="ce-eyebrow text-[#c7f35b]">Cobertura</span>
              </div>
              <h2 className="ce-display mt-6 text-[clamp(2.4rem,5vw,4.8rem)] text-white">
                {BASE_LOCALITY}
                <br />
                <span className="serif-it text-white/35">y el {BASE_COMARCA}.</span>
              </h2>
              <p className="mt-8 max-w-lg text-[16px] font-medium leading-[1.75] text-white/60">
                Base en {BASE_LOCALITY}, capital del {BASE_COMARCA}; se atienden los municipios de la comarca. La cercanía permite responder con agilidad, coordinar visitas técnicas y conocer la tipología constructiva de la zona.
              </p>
              <div className="mt-10 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <span key={a} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[12px] font-bold text-white/70 transition hover:border-[#c7f35b]/50 hover:text-[#c7f35b]">
                    {a}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-7">
                <div>
                  <strong className="ce-display block text-[36px] text-white">24–48 h</strong>
                  <small className="ce-eyebrow text-white/50">Respuesta inicial</small>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div>
                  <strong className="ce-display block text-[36px] text-white">{MUNICIPIOS_BAIX_PENEDES.length}</strong>
                  <small className="ce-eyebrow text-white/50">Municipios</small>
                </div>
              </div>
            </div>

            <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[540px]">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
                <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1 1.5" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="rgba(199,243,91,0.35)" strokeWidth="0.4" className="ce-ring-pulse" />
                <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(199,243,91,0.55)" strokeWidth="0.4" />
                <g className="ce-ring" style={{ transformOrigin: "50px 50px" }}>
                  <circle cx="50" cy="2" r="0.6" fill="#c7f35b" />
                </g>
              </svg>
              <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#c7f35b] text-[#05111f] shadow-[0_0_80px_rgba(199,243,91,0.35)]">
                <div className="text-center leading-tight">
                  <MapPin size={22} className="mx-auto" strokeWidth={2.4} />
                  <span className="mt-1 block text-[10px] font-black tracking-[0.1em]">EL VENDRELL</span>
                </div>
              </div>
              {PINS.map(([name, x, y, isCenter]) =>
                isCenter ? null : (
                  <div
                    key={name}
                    className="absolute flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-white/55"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                    {name}
                  </div>
                )
              )}
              <span className="absolute left-1/2 top-[6%] -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#c7f35b]/60">N</span>
            </div>
          </div>
        </section>

        {/* ============ GARANTIAS ============ */}
        <section id="garantias" className="relative bg-[#07182d] py-24 md:py-36">
          <div className="mx-auto w-[min(1240px,calc(100%-40px))]">
            <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#c7f35b]" />
                  <span className="ce-eyebrow text-[#c7f35b]">Garantías de servicio</span>
                </div>
                <h2 className="ce-display mt-6 text-[clamp(2.4rem,5vw,5rem)] text-white">
                  Bien hecho también
                  <br />
                  <span className="serif-it text-white/35">significa bien explicado.</span>
                </h2>
              </div>
              <p className="max-w-md text-[15px] font-medium leading-[1.75] text-white/55 lg:pb-4">
                Cuatro compromisos operativos aplicados en cada intervención. No son promesas de marketing; son criterios verificables que se pueden exigir.
              </p>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {GUARANTEES.map(([Icon, t, d], i) => {
                const Cmp = Icon as typeof ShieldCheck;
                return (
                  <div key={t} className="group relative bg-[#07182d] p-8 transition hover:bg-[#0b2748] md:p-12">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-[#c7f35b] transition group-hover:border-[#c7f35b] group-hover:bg-[#c7f35b] group-hover:text-[#05111f]">
                        <Cmp size={20} strokeWidth={2} />
                      </span>
                      <span aria-hidden="true" data-num={`0${i + 1}`} className="ce-display text-[54px] text-white/10 transition before:content-[attr(data-num)] group-hover:text-[#c7f35b]/30" />
                    </div>
                    <h3 className="ce-display mt-8 text-[26px] text-white md:text-[30px]">{t}</h3>
                    <p className="mt-4 max-w-md text-[14.5px] font-medium leading-[1.75] text-white/55">{d}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ GUIAS ============ */}
        <section className="relative bg-[#05111f] py-24 md:py-32">
          <div className="ce-grain" />
          <div className="relative mx-auto w-[min(1240px,calc(100%-40px))]">
            <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-[#c7f35b]" />
                  <span className="ce-eyebrow text-[#c7f35b]">Guías y recomendaciones</span>
                </div>
                <h2 className="ce-display mt-6 max-w-3xl text-[clamp(2.2rem,5vw,4.4rem)] text-white">
                  Notas de oficio,
                  <br />
                  <span className="serif-it text-white/35">para decidir mejor.</span>
                </h2>
              </div>
              <Link href="/guias" className="ce-link inline-flex items-center gap-2 text-sm font-bold text-[#c7f35b]">
                Ver todas las guías <ArrowRight size={16} />
              </Link>
            </div>
            <GuiasExplorer />
          </div>
        </section>

        {/* ============ CTA FINAL ============ */}
        <section id="contacto" aria-labelledby="contacto-titulo" className="relative scroll-mt-20 overflow-hidden bg-[#05111f] py-24 md:py-32">
          <div className="ce-grid absolute inset-0 opacity-50" />
          <div
            aria-hidden="true"
            className="ce-ring pointer-events-none absolute -left-40 top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full border border-white/5"
          />
          <div className="relative mx-auto w-[min(1240px,calc(100%-40px))]">
            <div className="relative overflow-hidden rounded-[36px] border border-[#c7f35b]/25 bg-gradient-to-br from-[#0b2748] via-[#07182d] to-[#05111f] p-10 md:p-16">
              <div className="ce-grain" />
              <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <span className="h-px w-12 bg-[#c7f35b]" />
                    <span className="ce-eyebrow text-[#c7f35b]">Inicio del proyecto</span>
                  </div>
                  <h2 id="contacto-titulo" className="ce-display mt-6 text-[clamp(2.6rem,5vw,5rem)] text-white">
                    Se describe el espacio.
                    <br />
                    <span className="serif-it text-[#c7f35b]">Se determina la solución.</span>
                  </h2>
                  <p className="mt-7 max-w-lg text-[15px] font-medium leading-[1.75] text-white/60">
                    Una conversación técnica clara es el punto de partida. Se recibe una propuesta con alcance definido, plazos y condiciones económicas antes de cualquier intervención.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={`mailto:${EMAIL}`}
                      className="ce-link inline-flex items-center gap-3 py-2 text-sm font-bold text-white/80 hover:text-white"
                    >
                      <Mail size={16} /> {EMAIL}
                    </a>
                    <Link href="/presupuestador" className="ce-link inline-flex items-center gap-2 py-2 text-sm font-bold text-[#c7f35b] sm:ml-6">
                      Presupuestador detallado <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                <ContactoMailto />
              </div>
              <div className="relative mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
                {[
                  [BASE_LOCALITY, "Base operativa"],
                  [BASE_COMARCA, "Área de servicio"],
                  ["24–48 h", "Respuesta técnica"],
                  ["100%", "Documentación clara"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <strong className="ce-display block text-[28px] text-white md:text-[32px]">{n}</strong>
                    <small className="ce-eyebrow mt-1 block text-white/50">{l}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
