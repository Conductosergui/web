"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "ct-cookie-choice";
const CHANGE_EVENT = "ct-cookie-choice-change";

// El aviso se sincroniza con localStorage como store externo: sin setState dentro de efectos
// y sin desajuste de hidratación (en servidor el aviso no se renderiza).
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function pendingChoice() {
  try {
    return localStorage.getItem(STORAGE_KEY) === null;
  } catch {
    return false;
  }
}

export function CookieNotice() {
  const visible = useSyncExternalStore(subscribe, pendingChoice, () => false);
  const choose = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Almacenamiento bloqueado: el aviso se cierra igualmente durante la sesión.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
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
