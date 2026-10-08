"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(localStorage.getItem("ct-cookie-choice") === null), []);
  const choose = (value: string) => {
    localStorage.setItem("ct-cookie-choice", value);
    setVisible(false);
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
