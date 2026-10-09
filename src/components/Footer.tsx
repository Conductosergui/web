import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { CLUSTERS, clusterSlug } from "@/data/guias";
import {
  AUTHOR_NAME,
  AUTHOR_PATH,
  AUTHOR_YEARS_EXPERIENCE,
  BASE_COMARCA,
  BASE_LOCALITY,
  BASE_PROVINCE,
  EMAIL,
  MUNICIPIOS_BAIX_PENEDES,
} from "@/lib/entidad";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <span className="eyebrow text-lime">Oficio técnico · trato directo</span>
            <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1] tracking-[-0.045em] md:text-6xl">
              Cada espacio,
              <br />
              <span className="serif-it text-white/45">resuelto como corresponde.</span>
            </h2>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-white/50">Secciones</p>
            <div className="grid gap-3 text-sm">
              <Link href="/servicios">Servicios</Link>
              <Link href="/#metodo">Método de trabajo</Link>
              <Link href="/guias">Guías</Link>
              <Link href="/glosario">Glosario técnico</Link>
              <Link href="/compromiso">Compromiso</Link>
              <Link href="/faq">Preguntas frecuentes</Link>
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-white/50">Temas</p>
            <div className="grid gap-3 text-sm">
              {CLUSTERS.map((c) => (
                <Link key={c} href={`/temas/${clusterSlug(c)}`}>{c}</Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.14em] text-white/50">Empresa</p>
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[.12em] text-white/50">Fundador</dt>
                <dd className="mt-1">
                  <Link href={AUTHOR_PATH}>{AUTHOR_NAME}</Link>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[.12em] text-white/50">Experiencia</dt>
                <dd className="mt-1">{AUTHOR_YEARS_EXPERIENCE} años</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[.12em] text-white/50">Base</dt>
                <dd className="mt-1">
                  {BASE_LOCALITY} ({BASE_PROVINCE})
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[.12em] text-white/50">Área de servicio</dt>
                <dd className="mt-1">
                  Comarca del {BASE_COMARCA} · {MUNICIPIOS_BAIX_PENEDES.length} municipios
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold uppercase tracking-[.12em] text-white/50">Contacto</dt>
                <dd className="mt-1 min-w-0 break-words">
                  <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2">
                    <Mail size={16} aria-hidden="true" /> {EMAIL}
                  </a>
                </dd>
              </div>
            </dl>
            <Link href="/presupuestador" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-lime">
              Solicitar valoración <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6 pt-8 text-[11px] text-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Conductos Ergui. Todos los derechos reservados.</p>
            {/* Backlog: convertir en enlace a la web oficial de Aurora Market Labs cuando se facilite la URL. */}
            <p>Web creada por Aurora Market Labs</p>
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/legal/terminos">Términos y condiciones</Link>
            <Link href="/legal/privacidad">Privacidad</Link>
            <Link href="/legal/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
