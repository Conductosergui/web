# Instrucciones de Desarrollo - Conductos Ergui (Web Semántica)

## 🎯 Contexto del Proyecto

Este repositorio contiene el código fuente y la arquitectura de datos para la web de Conductos Ergui, una empresa de servicios locales (climatización por conductos, pladur y aislamiento) con sede en El Vendrell (Tarragona, España).

Territorio (ADR-001, `docs/adr/`):

- Sede: El Vendrell (Coma-ruga, núcleo dependiente).
- Área servida: radio operativo de 50 km desde la sede.
- Territorios prioritarios (página indexable y estrategia de autoridad): Baix Penedès y El Vendrell.
- Territorios secundarios: territorios atendidos dentro del radio y confirmados por el titular, sin página propia.

## 🛠️ Estándares de Código y Arquitectura

### 1. Datos Estructurados (Schema.org)

- El JSON-LD se genera en código (`src/lib/schema.ts`) a partir de `src/lib/entidad.ts`, `src/lib/territorio.ts` y `src/data/*`. La carpeta `/schema/` solo guarda una copia de referencia de la home.
- Entidad raíz: `["Organization", "LocalBusiness", "HomeAndConstructionBusiness"]` (`/#negocio`), con los departamentos `HVACBusiness` (`/#climatizacion`) y `GeneralContractor` (`/#pladur`). No usar tipos que no existen en schema.org.
- `areaServed` = GeoCircle de 50 km (`/#area-servida`) + Baix Penedès. Todo lugar sale del registro `src/lib/territorio.ts`; no declarar lugares fuera de él.
- `@id` estables: no cambiar los ya publicados. Una página puede ampliar un nodo común, nunca contradecir sus valores.
- `sameAs` solo con URIs verificadas. No usar identificadores de Wikidata sin comprobarlos uno a uno.
- `npm run build` ejecuta `scripts/validar-grafo.mjs` y falla si se rompe algún invariante del grafo o del territorio.

### 2. Estructura de Contenido y URLs (Silo Web)

- Respetar la jerarquía definida en `/arquitectura/silo-web.md`.
- Las URLs deben seguir una estructura limpia y optimizada para búsquedas GEO/AEO.
- No crear páginas por municipio sin contenido real propio y sin decisión registrada en el ADR.
- No inventar datos del negocio: lo que no consta queda fuera del sitio y del grafo (`docs/backlog.md`).
- El contenido debe redactarse bajo criterios E-E-A-T, evitando texto de relleno y priorizando especificaciones técnicas de materiales (lana de roca, chapa galvanizada, placas hidrófugas) asociados al contexto local.

### 3. Pautas de Programación Web

- Mantener el HTML semántico limpio y accesible.
- Asegurar que las inyecciones de scripts JSON-LD se realicen correctamente en el `<head>` del sitio final sin romper la sintaxis general.
