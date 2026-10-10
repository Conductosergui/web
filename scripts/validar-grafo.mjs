// Validador del grafo y de los invariantes territoriales (ADR-001, docs/adr/).
// Se ejecuta tras `next build` sobre el HTML generado y lee el registro canónico (src/lib/territorio.ts).
// Si algún invariante falla, termina con código 1 y la compilación falla.
//
// Uso: node --experimental-strip-types --no-warnings scripts/validar-grafo.mjs [directorio-de-app]
// (por defecto .next/server/app). Requiere Node 22.6 o superior.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { AREA_SERVIDA, SEDE, TERRITORIOS } from "../src/lib/territorio.ts";

const SITE = "https://conductosergui.es";
const APP = process.argv[2] ?? ".next/server/app";

// Frases que presentan el Baix Penedès como límite del servicio (invariante 9). Se buscan sin distinguir mayúsculas.
const FRASES_PROHIBIDAS = [
  "municipios atendidos",
  "área de servicio: comarca",
  "zona de servicio en el baix penedès",
  "toda la zona de servicio",
  "solo en el baix penedès",
  "únicamente en el baix penedès",
];

const fallos = [];
const falla = (inv, msg) => fallos.push(`[${inv}] ${msg}`);

// ── Lectura del build ───────────────────────────────────────────────
function htmlFiles(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return f.endsWith(".html") ? [p] : [];
  });
}

if (!existsSync(APP)) {
  console.error(`No existe ${APP}. Ejecuta antes "next build".`);
  process.exit(1);
}

const paginas = new Map(); // ruta → { nodos, texto }
for (const f of htmlFiles(APP)) {
  let ruta = "/" + relative(APP, f).replace(/\.html$/, "");
  if (ruta.startsWith("/_")) continue; // _not-found, _global-error
  if (ruta === "/index") ruta = "/";
  const h = readFileSync(f, "utf8");
  const nodos = [...h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(
    (m) => JSON.parse(m[1])["@graph"] ?? [],
  );
  const cuerpo = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "");
  const texto = cuerpo
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
  paginas.set(ruta, { nodos, texto });
}

const leer = (nombre) => {
  const p = join(APP, `${nombre}.body`);
  return existsSync(p) ? readFileSync(p, "utf8") : "";
};
const sitemap = leer("sitemap.xml");
const llms = leer("llms.txt");

// ── Utilidades del grafo ────────────────────────────────────────────
const esRef = (o) => o && typeof o === "object" && !Array.isArray(o) && Object.keys(o).length === 1 && "@id" in o;
function recorrer(o, visita) {
  if (Array.isArray(o)) o.forEach((x) => recorrer(x, visita));
  else if (o && typeof o === "object") {
    visita(o);
    Object.values(o).forEach((x) => recorrer(x, visita));
  }
}
const iguales = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ── G1. Referencias rotas por página y @id con definiciones contradictorias ──
// Una página puede ampliar un nodo común con el mismo @id (p. ej. mainEntityOfPage): JSON-LD fusiona
// las declaraciones. Solo es un error que una misma propiedad tenga valores distintos.
const definiciones = new Map(); // @id → nodo fusionado
let totalNodos = 0;
for (const [ruta, { nodos }] of paginas) {
  const declarados = new Set();
  const referidos = new Set();
  recorrer(nodos, (o) => {
    if (!("@id" in o)) return;
    if (esRef(o)) referidos.add(o["@id"]);
    else {
      declarados.add(o["@id"]);
      const previo = definiciones.get(o["@id"]);
      if (!previo) definiciones.set(o["@id"], { ...o });
      else
        for (const [k, v] of Object.entries(o)) {
          if (!(k in previo)) previo[k] = v;
          else if (!iguales(previo[k], v)) falla("G1", `@id ${o["@id"]}: «${k}» con valores distintos (${ruta})`);
        }
    }
  });
  totalNodos = Math.max(totalNodos, declarados.size);
  for (const id of referidos) if (!declarados.has(id)) falla("G1", `referencia rota en ${ruta}: ${id}`);
}

// ── Registro canónico ───────────────────────────────────────────────
const porClave = new Map(TERRITORIOS.map((t) => [t.clave, t]));
const idDe = (clave) => `${SITE}${porClave.get(clave).idPath}`;
const PRIORITARIOS = TERRITORIOS.filter((t) => t.categoria === "PRIORITARIO" && t.ruta);
const SECUNDARIOS = TERRITORIOS.filter((t) => t.categoria === "SECUNDARIO");

// Unicidad en el registro (invariantes 5 y 6)
const claves = TERRITORIOS.map((t) => t.clave);
const idPaths = TERRITORIOS.map((t) => t.idPath);
if (new Set(claves).size !== claves.length) falla("5", "claves de territorio duplicadas en el registro");
if (new Set(idPaths).size !== idPaths.length) falla("6", "idPath duplicado en el registro");
for (const t of TERRITORIOS) {
  if (t.contenidoEn && !porClave.has(t.contenidoEn)) falla("6", `${t.clave}: contenidoEn desconocido (${t.contenidoEn})`);
}

// ── 1. Una única SEDE con dirección y coordenadas ───────────────────
const geoSede = { "@type": "GeoCoordinates", latitude: SEDE.geo.latitude, longitude: SEDE.geo.longitude };
const negocio = definiciones.get(`${SITE}/#negocio`);
if (!negocio) falla("1", "no existe el nodo /#negocio");
else {
  if (negocio.address?.streetAddress !== SEDE.direccion.streetAddress) falla("1", "/#negocio sin la dirección de la SEDE");
  if (negocio.address?.addressLocality !== porClave.get(SEDE.municipio).nombre) falla("1", "localidad de /#negocio distinta del municipio de la SEDE");
  if (!iguales(negocio.geo, geoSede)) falla("1", "geo de /#negocio distinto de las coordenadas de la SEDE");
}
const direcciones = new Set();
const geos = new Set();
for (const n of definiciones.values()) {
  if (n.address) direcciones.add(JSON.stringify(n.address));
  if (n.geo) geos.add(JSON.stringify(n.geo));
}
if (direcciones.size !== 1) falla("1", `hay ${direcciones.size} direcciones distintas en el grafo (debe haber 1)`);
if (geos.size !== 1) falla("1", `hay ${geos.size} coordenadas distintas en el grafo (debe haber 1)`);

// ── 2. AREA_SERVIDA = un único GeoCircle centrado en la SEDE ────────
const circulos = [...definiciones.values()].filter((n) => n["@type"] === "GeoCircle");
if (circulos.length !== 1) falla("2", `hay ${circulos.length} GeoCircle (debe haber 1)`);
const circulo = circulos[0];
if (circulo) {
  if (!iguales(circulo.geoMidpoint, geoSede)) falla("2", "el centro del GeoCircle no es la SEDE");
  if (circulo.geoRadius !== AREA_SERVIDA.radioKm * 1000) falla("2", `geoRadius ${circulo.geoRadius} ≠ ${AREA_SERVIDA.radioKm * 1000}`);
}

// ── 7. areaServed = GeoCircle + territorios prioritarios declarados ─
const areaEsperada = [circulo?.["@id"], ...AREA_SERVIDA.prioritariosEnAreaServed.map(idDe)];
let conArea = 0;
for (const n of definiciones.values()) {
  recorrer(n, (o) => {
    if (!("areaServed" in o)) return;
    conArea++;
    const ids = [].concat(o.areaServed).map((x) => x?.["@id"]);
    if (!iguales(ids, areaEsperada)) falla("7", `areaServed inesperado en ${n["@id"]}: ${ids.join(", ")}`);
  });
}
if (conArea === 0) falla("7", "ningún nodo declara areaServed");
for (const c of AREA_SERVIDA.prioritariosEnAreaServed) {
  if (porClave.get(c)?.categoria !== "PRIORITARIO") falla("7", `${c} está en areaServed y no es prioritario`);
}

// ── 3 y 8. Solo los prioritarios tienen página indexable, sitemap y llms.txt ─
for (const t of PRIORITARIOS) {
  const p = paginas.get(t.ruta);
  if (!p) {
    falla("3", `${t.nombre}: falta la página ${t.ruta}`);
    continue;
  }
  if (!sitemap.includes(`<loc>${SITE}${t.ruta}</loc>`)) falla("8", `${t.ruta} no está en el sitemap`);
  if (!llms.includes(`${SITE}${t.ruta})`)) falla("8", `${t.ruta} no está en llms.txt`);
  const pagina = p.nodos.find((n) => n["@id"] === `${SITE}${t.ruta}#webpage`);
  const about = [].concat(pagina?.about ?? []).map((x) => x["@id"]);
  if (!about.includes(idDe(t.clave))) falla("3", `${t.ruta}: la página no declara about → ${idDe(t.clave)}`);
}
for (const t of TERRITORIOS) {
  if (t.categoria !== "PRIORITARIO" && t.ruta) falla("8", `${t.clave} tiene ruta propia y no es prioritario`);
}

// ── 4 y 5. Secundarios: sin página propia, dentro del registro, nodo con containedInPlace ─
for (const t of SECUNDARIOS) {
  if (paginas.has(`/${t.clave}`)) falla("4", `${t.nombre} tiene página propia (/${t.clave})`);
  if (sitemap.includes(`<loc>${SITE}/${t.clave}</loc>`)) falla("8", `${t.nombre} aparece en el sitemap`);
  const nodo = definiciones.get(idDe(t.clave));
  if (nodo && !nodo.containedInPlace) falla("4", `${t.nombre}: nodo sin containedInPlace`);
}

// Todo nodo de lugar con @id del dominio pertenece al registro
for (const [id, n] of definiciones) {
  const tipos = [].concat(n["@type"]);
  if (!tipos.some((x) => ["City", "Place", "AdministrativeArea"].includes(x))) continue;
  if (!idPaths.some((p) => `${SITE}${p}` === id)) falla("6", `lugar ${id} no está en el registro canónico`);
}

// ── 9. Ningún texto presenta el Baix Penedès como límite del servicio ──
for (const [ruta, { texto }] of paginas) {
  const t = texto.toLowerCase();
  for (const f of FRASES_PROHIBIDAS) if (t.includes(f)) falla("9", `${ruta}: «${f}»`);
}
for (const f of FRASES_PROHIBIDAS) if (llms.toLowerCase().includes(f)) falla("9", `llms.txt: «${f}»`);

// ── Informe ─────────────────────────────────────────────────────────
console.log(
  `Grafo: ${paginas.size} páginas, ${definiciones.size} nodos con @id (máx. ${totalNodos} por página), ` +
    `${TERRITORIOS.length} territorios en el registro (${PRIORITARIOS.length} prioritarios con página, ${SECUNDARIOS.length} secundarios).`,
);
if (fallos.length) {
  console.error(`\n✖ ${fallos.length} fallo(s) de invariantes (ADR-001):`);
  for (const f of fallos) console.error("  " + f);
  process.exit(1);
}
console.log("✓ Invariantes ADR-001 (1–9) y referencias del grafo: correctos.");
