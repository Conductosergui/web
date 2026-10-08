import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Fan,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { ContactoMailto } from "@/components/ContactoMailto";
import { clusterSlug, getGuiasPorCluster, type Cluster } from "@/data/guias";
import { BASE_COMARCA, BASE_LOCALITY, EMAIL, MUNICIPIOS_BAIX_PENEDES } from "@/lib/entidad";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

type Silo = {
  id: "climatizacion" | "pladur";
  numero: string;
  Icon: typeof Wind;
  titulo: string;
  enunciado: string;
  respuesta: string;
  servicios: [string, string][];
  materiales: string[];
  clusters: Cluster[];
};

const SILOS: Silo[] = [
  {
    id: "climatizacion",
    numero: "01",
    Icon: Wind,
    titulo: "Climatización, instalación y mantenimiento de conductos",
    enunciado: "Redes de distribución de aire diseñadas, montadas y mantenidas conforme al RITE.",
    respuesta:
      "Conductos Ergui instala y mantiene sistemas de climatización por conductos en El Vendrell y el Baix Penedès: conductos de fibra de vidrio preaislada para viviendas y locales, y conductos de acero galvanizado para ventilación y extracción en naves y cocinas industriales.",
    servicios: [
      ["Instalación de conductos de climatización", "Diseño, dimensionado y montaje de la red de impulsión y retorno."],
      ["Mantenimiento y reparación", "Revisión, limpieza de conductos y corrección de fugas o pérdidas de caudal."],
      ["Ventilación y extracción", "Redes de renovación de aire, extracción de humos y ventilación forzada."],
      ["Difusión y regulación", "Rejillas, difusores lineales y compuertas integrados en techos técnicos."],
    ],
    materiales: ["Fibra de vidrio preaislada (Climaver)", "Acero galvanizado helicoidal y rectangular", "Aislamiento elastomérico exterior"],
    clusters: ["Conductos", "HVAC", "Mantenimiento"],
  },
  {
    id: "pladur",
    numero: "02",
    Icon: Layers,
    titulo: "Pladur, tabiquería y aislamiento",
    enunciado: "Construcción en seco pensada para convivir con las instalaciones de climatización.",
    respuesta:
      "Conductos Ergui ejecuta tabiquería y trasdosados de pladur, falsos techos continuos y registrables para ocultar conductos y aislamiento térmico y acústico con lana de roca en El Vendrell y el Baix Penedès, conforme al Código Técnico de la Edificación.",
    servicios: [
      ["Tabiquería y trasdosados", "Distribución de espacios y mejora de cerramientos con placa de yeso laminado."],
      ["Falsos techos técnicos", "Continuos y registrables, con accesos para el mantenimiento de equipos y conductos."],
      ["Aislamiento térmico y acústico", "Lana de roca y fibra de vidrio en trasdosados y plenum del falso techo."],
      ["Zonas húmedas y técnicas", "Placa hidrófuga en baños y cocinas; placa ignífuga en salas de maquinaria."],
    ],
    materiales: ["Placa hidrófuga", "Placa ignífuga", "Lana de roca de alta densidad"],
    clusters: ["Pladur", "Aislamiento"],
  },
];

const PASOS = [
  ["01", "Recepción", "Recepción de la solicitud con el alcance, la ubicación y los antecedentes técnicos del espacio."],
  ["02", "Evaluación", "Revisión técnica, definición de la solución y entrega de una propuesta con alcance detallado."],
  ["03", "Ejecución", "Intervención con protección del entorno, verificación del resultado y entrega documentada."],
] as const;

const GARANTIAS = [
  [ShieldCheck, "Presupuesto claro", "Alcance, materiales, plazos y condiciones económicas definidos antes del inicio de cualquier intervención."],
  [Clock3, "Cumplimiento de plazos", "Planificación comunicada y respeto por los tiempos acordados. Cualquier variación se informa con antelación."],
  [Sparkles, "Cuidado del entorno", "Protección de superficies y zonas de paso. Retiro de los residuos generados durante la intervención."],
  [Fan, "Criterio técnico", "Recomendación basada en la necesidad real del proyecto, con explicación de las opciones disponibles."],
] as const;

function SiloSection({ silo }: { silo: Silo }) {
  const oscuro = silo.id === "climatizacion";
  const guias = silo.clusters.flatMap(getGuiasPorCluster);
  return (
    <section
      id={silo.id}
      aria-labelledby={`${silo.id}-titulo`}
      className={oscuro ? "bg-navy text-white" : "bg-white text-ink"}
    >
      <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_1fr]">
        <header>
          <p className={`eyebrow flex items-center gap-3 ${oscuro ? "text-accent" : "text-plomo"}`}>
            <silo.Icon size={16} aria-hidden="true" /> Silo {silo.numero}
          </p>
          <h2 id={`${silo.id}-titulo`} className="heading mt-6">
            {silo.titulo}
          </h2>
          <p className={`mt-6 max-w-xl text-lg leading-relaxed ${oscuro ? "text-white/70" : "text-plomo"}`}>
            {silo.enunciado}
          </p>
          <p
            className={`mt-8 max-w-xl border-l-2 pl-5 text-[15px] leading-relaxed ${
              oscuro ? "border-accent text-white/85" : "border-navy text-ink/85"
            }`}
          >
            {silo.respuesta}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Materiales">
            {silo.materiales.map((m) => (
              <li
                key={m}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                  oscuro ? "border-white/20 text-white/80" : "border-line text-plomo"
                }`}
              >
                {m}
              </li>
            ))}
          </ul>
        </header>

        <div>
          <ul className={`divide-y ${oscuro ? "divide-white/15 border-y border-white/15" : "divide-line border-y border-line"}`}>
            {silo.servicios.map(([titulo, detalle]) => (
              <li key={titulo} className="flex gap-4 py-6">
                <Check size={18} className={`mt-1 shrink-0 ${oscuro ? "text-accent" : "text-navy"}`} aria-hidden="true" />
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{titulo}</h3>
                  <p className={`mt-1 text-[15px] leading-relaxed ${oscuro ? "text-white/65" : "text-plomo"}`}>{detalle}</p>
                </div>
              </li>
            ))}
          </ul>

          {guias.length > 0 && (
            <nav aria-label={`Guías técnicas: ${silo.titulo}`} className="mt-10">
              <p className={`eyebrow ${oscuro ? "text-white/50" : "text-plomo"}`}>Guías técnicas relacionadas</p>
              <ul className="mt-4 grid gap-2">
                {guias.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/guias/${g.slug}`}
                      className={`group flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        oscuro ? "border-white/15 hover:border-accent hover:bg-white/5" : "border-line hover:border-navy hover:bg-mist"
                      }`}
                    >
                      {g.title}
                      <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[.12em]">
                {silo.clusters.map((c) => (
                  <Link key={c} href={`/temas/${clusterSlug(c)}`} className={`ce-link ${oscuro ? "text-accent" : "text-navy"}`}>
                    Tema: {c}
                  </Link>
                ))}
              </p>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <section aria-labelledby="hero-titulo" className="grid-noise relative overflow-hidden bg-ink text-white">
        <div className="shell grid gap-14 py-20 md:py-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <header className="reveal">
            <p className="eyebrow flex items-center gap-2 text-accent">
              <MapPin size={14} aria-hidden="true" /> {BASE_LOCALITY} · {BASE_COMARCA} · Tarragona
            </p>
            <h1 id="hero-titulo" className="display mt-8">
              Climatización por conductos y pladur
              <span className="serif-it block text-white/55"> en {BASE_LOCALITY}.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
              Un mismo equipo para instalar y mantener conductos de aire acondicionado y para ejecutar la tabiquería, los
              falsos techos y el aislamiento que los integran en una sola fase de obra.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center justify-between gap-6 rounded-full bg-white px-6 py-4 text-sm font-bold text-ink transition hover:bg-accent"
              >
                Solicitar presupuesto <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-between gap-6 rounded-full border border-white/25 px-6 py-4 text-sm font-bold text-white transition hover:border-white"
              >
                Ver servicios <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </header>

          <dl className="reveal grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 text-sm">
            {[
              ["Base operativa", BASE_LOCALITY],
              ["Área de servicio", `Comarca del ${BASE_COMARCA}`],
              ["Especialidades", "Climatización · Pladur · Aislamiento"],
              ["Contacto", EMAIL],
            ].map(([k, v]) => (
              <div key={k} className="bg-ink/95 px-6 py-5">
                <dt className="eyebrow text-white/45">{k}</dt>
                <dd className="mt-2 text-base font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="servicios" aria-labelledby="servicios-titulo" className="bg-mist">
        <div className="shell py-16 md:py-20">
          <p className="eyebrow text-plomo">Servicios</p>
          <h2 id="servicios-titulo" className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.04em] text-ink md:text-5xl">
            Dos especialidades que se resuelven juntas.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {SILOS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group flex h-full items-start justify-between gap-6 rounded-[20px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-navy"
                >
                  <span>
                    <span className="eyebrow text-plomo">Silo {s.numero}</span>
                    <span className="mt-3 block text-xl font-semibold tracking-[-0.03em] text-ink">{s.titulo}</span>
                  </span>
                  <s.Icon size={26} className="shrink-0 text-navy" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {SILOS.map((s) => (
        <SiloSection key={s.id} silo={s} />
      ))}

      <section id="metodo" aria-labelledby="metodo-titulo" className="bg-mist text-ink">
        <div className="shell py-20 md:py-28">
          <p className="eyebrow text-plomo">Método de trabajo</p>
          <h2 id="metodo-titulo" className="heading mt-4 max-w-3xl">
            Tres fases, <span className="serif-it text-plomo">un responsable.</span>
          </h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {PASOS.map(([n, t, d]) => (
              <li key={n} className="rounded-[20px] border border-line bg-white p-7">
                <span className="text-sm font-bold text-plomo">{n}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-plomo">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="garantias" aria-labelledby="garantias-titulo" className="bg-white text-ink">
        <div className="shell py-20 md:py-28">
          <p className="eyebrow text-plomo">Garantías</p>
          <h2 id="garantias-titulo" className="heading mt-4 max-w-3xl">
            Compromisos <span className="serif-it text-plomo">por escrito.</span>
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2">
            {GARANTIAS.map(([Icon, t, d]) => (
              <li key={t} className="bg-white p-8">
                <Icon size={22} className="text-navy" aria-hidden="true" />
                <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em]">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-plomo">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="cobertura" aria-labelledby="cobertura-titulo" className="bg-plomo text-white">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.3fr]">
          <header>
            <p className="eyebrow text-white/60">Área de servicio</p>
            <h2 id="cobertura-titulo" className="heading mt-4">
              {BASE_LOCALITY} y el {BASE_COMARCA}.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/75">
              Base en {BASE_LOCALITY}, capital del {BASE_COMARCA}. Se atienden los municipios de la comarca; la cobertura se
              confirma al recibir cada solicitud.
            </p>
          </header>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] bg-white/15 sm:grid-cols-2">
            {MUNICIPIOS_BAIX_PENEDES.map(([m, km]) => (
              <li key={m} className="flex items-center justify-between bg-plomo px-5 py-4">
                <span className="font-semibold">{m}</span>
                <span className="text-xs text-white/60">{km === 0 ? "Base" : `≈ ${km.toLocaleString("es-ES")} km`}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contacto" aria-labelledby="contacto-titulo" className="bg-navy text-white">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <header>
            <p className="eyebrow text-accent">Contacto</p>
            <h2 id="contacto-titulo" className="heading mt-4">
              Pide tu presupuesto <span className="serif-it text-white/55">por correo.</span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">
              Elige el servicio y el municipio: el formulario prepara un correo con el asunto y los datos ordenados para que
              la respuesta sea directa.
            </p>
            <a href={`mailto:${EMAIL}`} className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-accent">
              <Mail size={17} aria-hidden="true" /> {EMAIL}
            </a>
          </header>
          <ContactoMailto />
        </div>
      </section>
    </>
  );
}
