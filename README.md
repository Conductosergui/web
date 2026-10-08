# Conductos Ergui

## Ficha técnica de la entidad

**Nombre:** Conductos Ergui
**Ubicación:** El Vendrell, Tarragona (Cataluña, España)
**Área de servicio:** comarca del Baix Penedès
**Dominio canónico:** https://conductosergui.es
**Contacto:** conductosergui@gmail.com

### Municipios atendidos (Baix Penedès)

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

- `src/lib/entidad.ts` — Fuente única de los datos de la entidad (NAP, coordenadas, municipios, IDs del grafo).
- `src/app/layout.tsx` — Metadatos globales y grafo JSON-LD (`@graph`) inyectado en el `<head>`.
- `src/app/page.tsx` — Home con los dos silos (`#climatizacion`, `#pladur`), cobertura y contacto.
- `src/components/ContactoMailto.tsx` — Formulario que compone un enlace `mailto:` según la selección del usuario.
- `src/app/guias/`, `src/app/temas/`, `src/app/glosario/` — Contenido técnico enlazado a cada silo.
- `src/app/robots.ts`, `src/app/sitemap.ts` — Rastreo e indexación.
- `/arquitectura/` — Documentación de la arquitectura de información (silos, jerarquía de URLs).
- `/schema/` — Copia de referencia del grafo JSON-LD publicado.
- `/contenido/` — Borradores de contenido por servicio.

### Desarrollo

```bash
npm install
npm run dev        # entorno local
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # build de producción
```

### Datos pendientes

- Dirección postal y código postal del local: no constan. Las coordenadas actuales corresponden al centroide del municipio de El Vendrell (41,22043; 1,53501).
- Horario de atención: no consta.

---

*Documento generado como base técnica del proyecto web de Conductos Ergui.*
