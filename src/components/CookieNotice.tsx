"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { readConsent, storageAvailable, subscribeConsent, writeConsent, type CookieChoice } from "@/lib/consent";

// El aviso se sincroniza con localStorage como store externo: sin setState dentro de efectos
// y sin desajuste de hidratación (en servidor el aviso no se renderiza).
function pendingChoice() {
  return storageAvailable() && readConsent() === null;
}

/** true si en esta carga de página se aceptó la analítica (y, por tanto, el script ya está cargado). */
function useAnalyticsLoaded() {
  return useSyncExternalStore(
    subscribeConsent,
    () => readConsent() === "all" || document.querySelector('script[src*="googletagmanager.com/gtag"]') !== null,
    () => false,
  );
}

/** Borra las cookies de Google Analytics (_ga, _ga_<ID>) del dominio actual y de su dominio padre. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) =>
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      }),
    );
}

export function CookieNotice() {
  const visible = useSyncExternalStore(subscribeConsent, pendingChoice, () => false);
  // Elección vigente en la carga actual: "Configurar cookies" la borra para reabrir el aviso,
  // así que se recuerda si la analítica llegó a aceptarse en esta página.
  const analyticsAccepted = useAnalyticsLoaded();
  const choose = (value: CookieChoice) => {
    const anterior = analyticsAccepted;
    writeConsent(value);
    // Si se rechaza la analítica tras haberla aceptado, se borran sus cookies y se recarga
    // para descargar el script de Google Analytics ya cargado en la página.
    if (value === "necessary" && anterior) {
      clearAnalyticsCookies();
      window.location.reload();
    }
  };
  if (!visible) return null;
  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-2xl rounded-2xl border border-line bg-white p-5 shadow-[0_20px_70px_rgba(7,24,45,.2)]">
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="font-bold">Privacidad y cookies</p>
          <p className="mt-2 text-xs leading-5 text-lead">
            Se utilizan cookies necesarias y, únicamente con consentimiento, cookies de análisis para mejorar la experiencia. Más información en la{" "}
            <Link href="/legal/cookies" className="font-bold text-blue underline">
              política de cookies
            </Link>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => choose("all")} className="rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-white">
              Aceptar todas
            </button>
            <button onClick={() => choose("necessary")} className="rounded-full border border-line px-5 py-2.5 text-xs font-bold">
              Solo necesarias
            </button>
          </div>
        </div>
        <button
          onClick={() => choose("necessary")}
          aria-label="Cerrar aviso"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mist"
        >
          <X size={15} />
        </button>
      </div>
    </aside>
  );
}
