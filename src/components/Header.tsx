"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { WHATSAPP_URGENCIA_URL, ZONA_COMARCA_PATH, ZONA_SEDE_PATH } from "@/lib/entidad";

const links: [string, string][] = [
  ["Inicio", "/"],
  ["Servicios", "/servicios"],
  ["Método", "/#metodo"],
  ["Cobertura", ZONA_COMARCA_PATH],
  ["Garantías", "/compromiso"],
  ["Guías", "/guias"],
  ["FAQ", "/faq"],
];

// Secciones de la home que se resaltan al hacer scroll. Solo "metodo" tiene entrada propia en el menú;
// el resto se observa para que "Inicio" deje de marcarse mientras se lee Método.
const SECTION_IDS = ["servicios", "metodo", "cobertura", "garantias", "contacto"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // En la cabecera de la home no hay sección observada: vuelve a marcarse "Inicio".
      if (window.scrollY < 200) setActiveId(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const pageMatch = (href: string) => {
    if (!pathname) return false;
    if (href === "/faq") return pathname === "/faq";
    if (href === "/guias") return pathname.startsWith("/guias");
    if (href === "/servicios") return pathname.startsWith("/servicios");
    if (href === ZONA_COMARCA_PATH) return pathname === ZONA_COMARCA_PATH || pathname === ZONA_SEDE_PATH;
    if (href === "/compromiso") return pathname === "/compromiso";
    return false;
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && activeId !== "metodo";
    if (href.startsWith("/#")) return pathname === "/" && activeId === href.replace("/#", "");
    return pageMatch(href);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-white/10 bg-[#05111f]/95 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.65)]"
          : "border-white/5 bg-[#05111f]/80"
      }`}
    >
      <div className="shell flex h-[76px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <svg
            width="26"
            height="26"
            viewBox="0 0 34 34"
            aria-hidden="true"
            className="shrink-0 transition-transform duration-300 group-hover:scale-110"
          >
            <rect x="2" y="10" width="4" height="14" fill="#c7f35b" />
            <rect x="10" y="4" width="4" height="26" fill="#c7f35b" />
            <rect x="18" y="8" width="4" height="18" fill="#c7f35b" />
          </svg>
          <span className="leading-none">
            <strong className="block text-[15px] font-extrabold tracking-[-0.01em] text-white">CONDUCTOS ERGUI</strong>
            <small className="mt-1 block text-[9px] font-bold tracking-[0.22em] text-white/55 transition-colors duration-300 group-hover:text-white/70">
              AIRE ACONDICIONADO · PLADUR
            </small>
            <span className="sr-only"> (inicio)</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {links.map(([label, href]) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "true" : undefined}
                className={`group relative text-[13.5px] font-medium transition-colors duration-200 ${
                  active ? "text-white" : "text-white/65 hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left bg-lime transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5 lg:hidden">
          <a
            href={WHATSAPP_URGENCIA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Urgencias por WhatsApp"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-navy px-3 py-2 text-[10.5px] font-bold tracking-[0.12em] text-white transition hover:bg-lime hover:text-ink"
          >
            <Phone size={13} className="shrink-0" strokeWidth={2.5} />
            URGENCIAS
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-[#c7f35b]/40 text-[#c7f35b] transition hover:bg-[#c7f35b]/10"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#05111f] px-5 py-6 lg:hidden" aria-label="Navegación móvil">
          <div className="shell flex flex-col">
            {links.map(([label, href]) => {
              const active = isActive(href);
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "true" : undefined}
                  className={`flex items-center justify-between border-b border-white/10 py-4 text-lg font-medium transition-colors ${
                    active ? "text-lime" : "text-white/90 hover:text-lime"
                  }`}
                >
                  {label}
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-lime" />}
                </Link>
              );
            })}
            <Link
              href="/presupuestador"
              onClick={() => setOpen(false)}
              className="mt-6 flex items-center justify-between rounded-xl bg-lime p-4 font-bold text-ink"
            >
              Solicitar presupuesto <ArrowUpRight size={18} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
