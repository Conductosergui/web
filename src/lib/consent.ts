// Consentimiento de cookies compartido por el aviso (CookieNotice) y la analítica (Analytics).
// Se guarda en localStorage y se expone como store externo para useSyncExternalStore.

export type CookieChoice = "all" | "necessary";

const STORAGE_KEY = "ct-cookie-choice";
const CHANGE_EVENT = "ct-cookie-choice-change";

export function subscribeConsent(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

/** Elección guardada, o null si el visitante aún no ha decidido (o el almacenamiento está bloqueado). */
export function readConsent(): CookieChoice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "all" || v === "necessary" ? v : null;
  } catch {
    return null;
  }
}

export function storageAvailable(): boolean {
  try {
    localStorage.getItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function writeConsent(value: CookieChoice | null) {
  try {
    if (value === null) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Almacenamiento bloqueado: el cambio solo dura la sesión actual.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
