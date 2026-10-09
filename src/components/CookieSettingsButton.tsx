"use client";

import { writeConsent } from "@/lib/consent";

/** Vuelve a mostrar el aviso de cookies para cambiar o retirar el consentimiento. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => writeConsent(null)} className={className}>
      Configurar cookies
    </button>
  );
}
