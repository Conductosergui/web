"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { BASE_LOCALITY, EMAIL, MUNICIPIOS_BAIX_PENEDES } from "@/lib/entidad";

// Contacto sin base de datos, sin API y sin Server Actions:
// el formulario compone un enlace mailto: con asunto y cuerpo según la selección del usuario.
// Sin JavaScript, el atributo action="mailto:" actúa como respaldo (cuerpo en texto plano).

const SERVICIOS = {
  "climatizacion-instalacion": { silo: "Climatización", label: "Instalación de climatización por conductos" },
  "climatizacion-mantenimiento": { silo: "Climatización", label: "Mantenimiento o reparación de conductos" },
  "climatizacion-ventilacion": { silo: "Climatización", label: "Ventilación y extracción" },
  "pladur-tabiqueria": { silo: "Pladur", label: "Tabiquería y trasdosados de pladur" },
  "pladur-techos": { silo: "Pladur", label: "Falsos techos continuos o registrables" },
  "pladur-aislamiento": { silo: "Aislamiento", label: "Aislamiento térmico y acústico" },
  integral: { silo: "Proyecto integral", label: "Conductos + pladur en una sola obra" },
} as const;

type ServicioKey = keyof typeof SERVICIOS;

const INMUEBLES = ["Vivienda", "Local comercial", "Oficina", "Nave industrial", "Otro"] as const;

export function buildMailto(data: {
  servicio: ServicioKey;
  inmueble: string;
  municipio: string;
  nombre: string;
  telefono: string;
  mensaje: string;
}): string {
  const s = SERVICIOS[data.servicio];
  const subject = `[${s.silo}] ${s.label} · ${data.municipio}`;
  const body = [
    "Solicitud de presupuesto · Conductos Ergui",
    "",
    `Servicio: ${s.label}`,
    `Tipo de inmueble: ${data.inmueble}`,
    `Municipio: ${data.municipio}`,
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono || "No indicado"}`,
    "",
    "Descripción:",
    data.mensaje || "Sin descripción adicional.",
  ].join("\r\n");
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactoMailto() {
  const [href, setHref] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const mailto = buildMailto({
      servicio: get("servicio") as ServicioKey,
      inmueble: get("inmueble"),
      municipio: get("municipio"),
      nombre: get("nombre"),
      telefono: get("telefono"),
      mensaje: get("mensaje"),
    });
    setHref(mailto);
    window.location.href = mailto;
  }

  return (
    <form
      action={`mailto:${EMAIL}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      className="grid gap-5 rounded-[24px] bg-white p-6 text-ink shadow-[0_30px_80px_-40px_rgba(7,24,45,.55)] md:grid-cols-2 md:p-8"
      aria-describedby="contacto-nota"
    >
      <label className="md:col-span-2">
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Servicio</span>
        <select name="servicio" required defaultValue="" className="field mt-2">
          <option value="" disabled>
            Selecciona un servicio
          </option>
          <optgroup label="Climatización y conductos">
            <option value="climatizacion-instalacion">{SERVICIOS["climatizacion-instalacion"].label}</option>
            <option value="climatizacion-mantenimiento">{SERVICIOS["climatizacion-mantenimiento"].label}</option>
            <option value="climatizacion-ventilacion">{SERVICIOS["climatizacion-ventilacion"].label}</option>
          </optgroup>
          <optgroup label="Pladur y aislamiento">
            <option value="pladur-tabiqueria">{SERVICIOS["pladur-tabiqueria"].label}</option>
            <option value="pladur-techos">{SERVICIOS["pladur-techos"].label}</option>
            <option value="pladur-aislamiento">{SERVICIOS["pladur-aislamiento"].label}</option>
          </optgroup>
          <option value="integral">{SERVICIOS.integral.label}</option>
        </select>
      </label>

      <label>
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Tipo de inmueble</span>
        <select name="inmueble" required defaultValue={INMUEBLES[0]} className="field mt-2">
          {INMUEBLES.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Municipio</span>
        <select name="municipio" required defaultValue={BASE_LOCALITY} className="field mt-2">
          {MUNICIPIOS_BAIX_PENEDES.map(([m]) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      <label>
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Nombre</span>
        <input name="nombre" required autoComplete="name" className="field mt-2" />
      </label>

      <label>
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Teléfono (opcional)</span>
        <input name="telefono" type="tel" autoComplete="tel" inputMode="tel" className="field mt-2" />
      </label>

      <label className="md:col-span-2">
        <span className="text-xs font-bold uppercase tracking-[.14em] text-plomo">Describe el trabajo</span>
        <textarea
          name="mensaje"
          rows={4}
          placeholder="Superficie aproximada, estado actual, plazos…"
          className="field mt-2 resize-y"
        />
      </label>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p id="contacto-nota" className="max-w-md text-xs leading-relaxed text-plomo">
          Al enviar se abrirá tu aplicación de correo con el mensaje preparado para {EMAIL}. No se almacena ningún dato en
          este sitio.
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-3 rounded-full bg-navy px-6 py-4 text-sm font-bold text-white transition hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          <Mail size={17} /> Preparar correo <ArrowUpRight size={17} />
        </button>
      </div>

      {href && (
        <p role="status" className="text-sm text-plomo md:col-span-2">
          ¿No se abrió tu correo?{" "}
          <a href={href} className="font-bold text-navy underline underline-offset-4">
            Abrir el mensaje manualmente
          </a>{" "}
          o escribe a{" "}
          <a href={`mailto:${EMAIL}`} className="font-bold text-navy underline underline-offset-4">
            {EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
