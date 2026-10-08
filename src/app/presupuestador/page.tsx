"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Copy, Mail, MapPin, MessageCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "34652551861";
const CONTACT_EMAIL = "conductosergui@gmail.com";
const EMAIL_SUBJECT = "Nueva solicitud · Conductos Ergui";
const SERVICE_LABELS: Record<string, string> = {
  conductos: "Conductos de aire acondicionado",
  pladur: "Pladur y trasdosados",
  ambos: "Conductos de aire acondicionado y pladur",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { summary: string; waHref: string; mailHref: string };

function buildSummary(value: (k: string) => string) {
  const service = (SERVICE_LABELS[value("serviceType")] ?? value("serviceType")) || "No especificado";
  return [
    "NUEVA SOLICITUD · CONDUCTOS ERGUI",
    "",
    `Servicio: ${service}`,
    `Ubicación: ${value("location") || "—"}`,
    `Inmueble: ${value("property") || "—"}`,
    `Plazo estimado: ${value("timing") || "—"}`,
    "",
    `Nombre: ${value("name")}`,
    `Teléfono: ${value("phone") || "—"}`,
    `Email: ${value("email")}`,
    "",
    "Descripción del proyecto:",
    value("message") || "—",
  ].join("\n");
}

export default function PresupuestadorPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [payload, setPayload] = useState<Payload | null>(null);
  const [copied, setCopied] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const value = (k: string) => String(fd.get(k) ?? "").trim();

    const name = value("name");
    const email = value("email");
    const location = value("location");
    const serviceType = value("serviceType");

    if (name.length < 2 || !EMAIL_RE.test(email) || !location || !SERVICE_LABELS[serviceType]) {
      setError("Se deben verificar el nombre, el correo, la ubicación y el tipo de servicio.");
      return;
    }

    const summary = buildSummary(value);
    const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
    const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(summary)}`;

    setPayload({ summary, waHref, mailHref });
    setError(null);
    setSent(true);
    setCopied(false);

    window.open(waHref, "_blank", "noopener,noreferrer");
  }

  async function copySummary() {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload.summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="bg-mist py-16 md:py-24">
      <div className="shell">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow text-blue">Cotización inicial</p>
          <h1 className="heading mt-5">
            Solicitud de
            <br />
            valoración técnica.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-lead">
            Con esta información se puede evaluar la solicitud y ofrecer una primera orientación técnica.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-[28px] border border-line bg-white p-6 md:p-10">
            {sent && payload ? (
              <div className="grid min-h-[520px] place-items-center text-center">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime">
                    <Check size={28} />
                  </span>
                  <h2 className="mt-7 text-3xl font-medium tracking-[-0.04em]">Solicitud enviada</h2>
                  <p className="mx-auto mt-4 max-w-md leading-7 text-lead">
                    El mensaje ha sido recibido. La información será revisada y se establecerá contacto a la brevedad.
                  </p>

                  <div className="mx-auto mt-8 max-w-md rounded-2xl border border-line bg-mist/60 p-5 text-left">
                    <p className="eyebrow text-blue">Canales de envío</p>
                    <p className="mt-2 text-sm leading-6 text-lead">
                      El resumen se abre en WhatsApp. Si se prefiere, puede enviarse por correo o copiarse el texto para pegarlo donde resulte más cómodo.
                    </p>
                    <div className="mt-4 flex flex-col gap-2.5">
                      <a
                        href={payload.waHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink transition hover:brightness-95"
                      >
                        <MessageCircle size={16} /> Abrir WhatsApp
                      </a>
                      <a
                        href={payload.mailHref}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-blue"
                      >
                        <Mail size={16} /> Enviar por email
                      </a>
                      <button
                        type="button"
                        onClick={copySummary}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-bold text-ink transition hover:border-blue"
                      >
                        {copied ? <Check size={16} className="text-blue" /> : <Copy size={16} />}
                        {copied ? "Resumen copiado" : "Copiar resumen"}
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white"
                  >
                    Regresar al inicio <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-7">
                {error && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
                <fieldset>
                  <legend className="mb-4 text-sm font-bold">1. Servicio requerido</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["conductos", "Aire Acondicionado"],
                      ["pladur", "Pladur"],
                      ["ambos", "Ambos servicios"],
                    ].map(([v, l], i) => (
                      <label key={v} className="cursor-pointer">
                        <input type="radio" name="serviceType" value={v} defaultChecked={i === 0} className="peer sr-only" />
                        <span className="block rounded-xl border border-line p-4 text-center text-sm font-medium transition peer-checked:border-blue peer-checked:bg-sky">
                          {l}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-4 text-sm font-bold">2. Detalles del inmueble</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-bold text-lead">
                      UBICACIÓN / CIUDAD
                      <input name="location" required placeholder="Ej. El Vendrell" className="field mt-2 text-ink" />
                    </label>
                    <label className="text-xs font-bold text-lead">
                      TIPO DE PROPIEDAD
                      <select name="property" className="field mt-2 text-ink">
                        <option>Vivienda</option>
                        <option>Local comercial</option>
                        <option>Oficina</option>
                        <option>Edificio / Comunidad</option>
                        <option>Otro</option>
                      </select>
                    </label>
                    <label className="text-xs font-bold text-lead sm:col-span-2">
                      PLAZO ESTIMADO
                      <select name="timing" className="field mt-2 text-ink">
                        <option>Inmediato</option>
                        <option>Próximo mes</option>
                        <option>De 1 a 3 meses</option>
                        <option>Solo información técnica</option>
                      </select>
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-4 text-sm font-bold">3. Datos de contacto</legend>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="text-xs font-bold text-lead">
                      NOMBRE COMPLETO
                      <input name="name" required minLength={2} placeholder="Nombre" className="field mt-2 text-ink" />
                    </label>
                    <label className="text-xs font-bold text-lead">
                      TELÉFONO
                      <input name="phone" type="tel" placeholder="000 000 000" className="field mt-2 text-ink" />
                    </label>
                    <label className="text-xs font-bold text-lead sm:col-span-2">
                      CORREO ELECTRÓNICO
                      <input name="email" type="email" required placeholder="correo@ejemplo.com" className="field mt-2 text-ink" />
                    </label>
                    <label className="text-xs font-bold text-lead sm:col-span-2">
                      DESCRIPCIÓN DEL PROYECTO
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Dimensiones, problemas técnicos, requerimientos específicos..."
                        className="field mt-2 resize-y text-ink"
                      />
                    </label>
                  </div>
                </fieldset>
                <label className="flex items-start gap-3 text-xs leading-5 text-lead">
                  <input type="checkbox" required className="mt-1 accent-blue" />
                  Aceptación de la <a href="/legal/privacidad" className="font-bold text-blue underline">política de privacidad</a>.
                </label>
                <button className="flex items-center justify-between rounded-full bg-ink px-7 py-4 text-sm font-bold text-white transition hover:bg-blue">
                  Enviar solicitud <ArrowRight size={18} />
                </button>
              </form>
            )}
          </div>

          <aside className="h-fit rounded-[28px] bg-ink p-7 text-white lg:sticky lg:top-28">
            <p className="eyebrow text-lime">Qué ocurre después</p>
            <div className="mt-7 grid gap-6">
              {([
                [Check, "Se recibe la solicitud al instante por WhatsApp o correo."],
                [Mail, "Se amplían los detalles si hace falta alguna precisión técnica."],
                [MapPin, "Si es necesario, se coordina una visita a la ubicación."],
                [ShieldCheck, "Se recibe una propuesta clara, con alcance y plazos."],
              ] as const).map(([Icon, text], i) => {
                const Cmp = Icon as typeof Check;
                return (
                  <div key={i} className="flex gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs text-lime">{i + 1}</span>
                    <p className="pt-1 text-sm text-white/70">{text}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 border-t border-white/15 pt-7">
              <small className="text-white/50">Contacto directo</small>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 block text-sm font-bold">
                {CONTACT_EMAIL}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 flex items-center gap-2 text-sm font-bold text-lime"
              >
                <MessageCircle size={14} /> +34 652 55 18 61
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
