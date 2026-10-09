"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { readConsent, subscribeConsent } from "@/lib/consent";

// ID de medición de Google Analytics 4 (facilitado por el titular).
export const GA_MEASUREMENT_ID = "G-HMX7K95LQ";

// GA4 solo se carga si el visitante acepta las cookies de análisis ("Aceptar todas").
// En servidor no se renderiza nada: ninguna petición a Google antes del consentimiento.
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  if (consent !== "all") return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
