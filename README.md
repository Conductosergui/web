# Conductos Ergui

## Ficha técnica de la entidad

**Nombre:** Conductos Ergui
**Dirección:** Carrer Romaní 11, 43700 El Vendrell, Tarragona (Cataluña, España)
**Google Business Profile:** https://share.google/vw7GEPfgwZeaARWBb
**Área de servicio:** radio operativo de 50 km desde El Vendrell (ADR-001)
**Zona principal (autoridad):** comarca del Baix Penedès y El Vendrell
**Dominio canónico:** https://conductosergui.es
**Contacto:** conductosergui@gmail.com · +34 622 36 89 99 (teléfono y WhatsApp)

### Municipios de la zona principal (Baix Penedès)

El Vendrell (base), Calafell, Santa Oliva, Bellvei, Albinyana, Llorenç del Penedès, Banyeres del Penedès, La Bisbal del Penedès, L'Arboç, Bonastre, Cunit, Sant Jaume dels Domenys, Masllorenç y El Montmell.

### Servicios (silos semánticos)

1. **Climatización, instalación y mantenimiento de conductos**
   - Instalación de conductos de climatización
   - Mantenimiento y reparación de sistemas de aire acondicionado
   - Diseño e instalación de redes de ventilación
2. **Pladur, tabiquería y aislamiento**
   - Trasdosados y tabiquería en pladur
   - Techos técnicos y decorativos
   - Aislamiento acústico y térmico con placas de yeso laminado

### Estructura del proyecto

Next.js 16 (App Router), React 19 y Tailwind CSS 4. Sitio 100 % estático: sin base de datos, sin API y sin Server Actions.

- `src/lib/territorio.ts` — Registro territorial canónico (ADR-001): sede, área servida (radio de 50 km), territorios prioritarios y secundarios.
- `src/lib/entidad.ts` — Fuente única de los datos de la entidad (NAP, coordenadas, IDs del grafo); deriva el territorio de `territorio.ts`.
- `src/data/servicios.ts` — Service Graph: 6 servicios con URL propia (`/servicios/*`), alcance y relaciones.
- `src/data/conceptos.ts` — Capa de conceptos: 9 conceptos con definición visible en `/glosario#{concepto}`.
- `src/app/layout.tsx` — Metadatos globales y nodos comunes del grafo JSON-LD inyectados en el `<head>`.
- `src/lib/schema.ts` — Constructores del grafo: entidad raíz, autor, páginas y breadcrumbs, enlazados por `@id`.
- `src/lib/seo.ts` — `buildMetadata()`: canónica, Open Graph y Twitter homogéneos por ruta.
- `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx` — Imagen social generada con `next/og` (fuentes en `src/assets/og`).
- `src/app/page.tsx` — Home con los dos silos (`#climatizacion`, `#pladur`), cobertura y contacto.
- `src/components/ContactoMailto.tsx` — Formulario que compone un enlace `mailto:` según la selección del usuario.
- `src/app/servicios/` — Índice y páginas de servicio.
- `src/app/guias/`, `src/app/temas/`, `src/app/glosario/` — Contenido técnico enlazado a servicios y conceptos.
- `src/app/robots.ts`, `src/app/sitemap.ts` — Rastreo e indexación.
- `/arquitectura/` — Documentación de la arquitectura de información (silos, jerarquía de URLs).
- `/schema/` — Copia de referencia del grafo JSON-LD publicado.
- `src/data/faqs.ts` — Preguntas frecuentes con fuente y estado (solo se publican las verificadas).
- `src/components/RespuestaRapida.tsx` — Bloque de respuesta directa (AEO).
- `src/app/llms.txt/route.ts` — `/llms.txt` generado desde los mismos datos que el sitio.
- `scripts/validar-grafo.mjs` — Validación del grafo y de los invariantes territoriales de ADR-001; se ejecuta en cada `npm run build`.
- `/docs/adr/` — Decisiones de arquitectura (ADR-001: territorio canónico y su propuesta de implementación).
- `/docs/` — Knowledge Graph (`knowledge-graph.md`), backlog y bloqueadores (`backlog.md`), compromisos pendientes de validación (`validacion-compromisos.md`), borradores de guías sin publicar (`borradores/`) y archivo (`archivo/`).
- `/contenido/` — Textos fuente del proyecto base (El Vendrell, conductos, pladur), citados como fuente en `src/data/servicios.ts`.

### Desarrollo

```bash
npm install
npm run dev        # entorno local
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # build de producción + validación del grafo (falla si algún invariante no se cumple)
npm run validate:grafo  # solo la validación, sobre un build existente
```

Requisito: Node 22.6 o superior (la validación importa `src/lib/territorio.ts` con `--experimental-strip-types`).

### Datos pendientes

- Horario de atención: no consta.

---

*Documento generado como base técnica del proyecto web de Conductos Ergui.*
