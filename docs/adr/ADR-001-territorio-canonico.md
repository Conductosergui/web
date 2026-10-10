# ADR-001 — Territorio canónico

- **Estado:** Aprobado (10/10/2026). D1–D8 cerradas. Implementación en `ADR-001-propuesta-implementacion.md`.
- **Fecha:** 10/10/2026
- **Ámbito:** datos de entidad (`src/lib/entidad.ts`), grafo JSON-LD (`src/lib/schema.ts`), páginas, rutas generadas y documentación.

## 1. Contexto (evidencia del repositorio, commit `a2801de`)

El territorio está definido en varios sitios y con significados mezclados:

1. `BASE_LOCALITY` ("El Vendrell") se usa a la vez como **ubicación del local** (dirección, `geo`, metas `geo.position`/`ICBM`) y como **zona de servicio** (`areaServed`, textos "en El Vendrell y Baix Penedès").
2. `MUNICIPIOS_BAIX_PENEDES` (14 municipios con distancia) actúa de facto como **área servida**, pero no está declarado como tal: `areaServed` solo contiene `/#el-vendrell` y `/#baix-penedes`.
3. Solo 5 lugares tienen `@id` en el grafo (El Vendrell, Baix Penedès, Provincia de Tarragona, Cataluña y Coma-ruga). Los otros 13 municipios aparecen solo como nombres (ItemList de `/baix-penedes`, chips `AREAS` y pines `PINS` de la home).
4. `src/app/page.tsx` define `PINS` con 8 municipios y coordenadas de dibujo escritas a mano, fuera de la fuente única.
5. Hay 21 cadenas con "El Vendrell", "Baix Penedès" o "Tarragona" escritas directamente en 7 archivos de `src/` (`layout.tsx`, `page.tsx`, `faq/page.tsx`, `presupuestador/*`, `data/servicios.ts`, `data/faqs.ts`), sin pasar por las constantes.
6. Documentos con alcances contradictorios:
   - Sitio y `README.md`: comarca del Baix Penedès, 14 municipios.
   - Skill del proyecto (`references/municipios-50km.csv`): radio de 50 km desde El Vendrell, 200 municipios de Tarragona, Barcelona y Lleida.
   - `.github/copilot-instructions.md`: radio de 50 km e incluye el Garraf.
   - `docs/archivo/`: borradores de Sitges y Vilanova i la Geltrú, fuera de la comarca.

Consecuencia: no hay una definición única de "dónde está la empresa", "dónde trabaja" y "qué territorios tienen presencia propia en la web". Sin ella, cualquier página o entidad local nueva puede contradecir el grafo.

## 2. Decisión

El territorio se modela en **cuatro categorías canónicas**, definidas en una sola fuente de datos. Ninguna página, componente ni nodo del grafo declara un territorio fuera de ella.

### 2.1 SEDE

- **Definición:** ubicación física del negocio. Hay exactamente una.
- **Datos:** dirección postal (`ADDRESS`), coordenadas (`GEO`), municipio (El Vendrell) y cadena administrativa (Baix Penedès → Provincia de Tarragona → Cataluña → España).
- **Schema.org:** `address`, `geo` y `hasMap` en `/#negocio` y en los departamentos. El municipio de la sede es un `City` con `containedInPlace`.
- **Núcleos de la sede:** los núcleos de población del municipio de la sede (hoy Coma-ruga) se modelan como `Place` con `containedInPlace` → municipio de la sede. No son territorios independientes (ver D4).

### 2.2 AREA_SERVIDA

- **Definición:** radio operativo de 50 km desde la sede (D3, cerrada 10/10/2026).
- **Valor:** círculo de 50 km centrado en las coordenadas del local. No enumera municipios.
- **Schema.org:** `areaServed` de `/#negocio`, de los departamentos y de los `Service` = `GeoCircle` de 50 km + Baix Penedès (D5, opción A).

### 2.3 TERRITORIOS_PRIORITARIOS

- **Definición:** territorio dentro de AREA_SERVIDA con página indexable y estrategia de autoridad (D1).
- **Valor:** Baix Penedès (`/baix-penedes`) y El Vendrell (`/el-vendrell`, con su núcleo Coma-ruga) (D2, D4).
- **Schema.org:** `City`/`AdministrativeArea` con `@id` propio, `sameAs` verificado y página con `about` → territorio.

### 2.4 TERRITORIOS_SECUNDARIOS

- **Definición:** resto de territorios atendidos dentro del radio operativo, según la evolución del negocio (D3, cerrada 10/10/2026). No tienen página propia.
- **Valor vigente:** los 13 municipios del Baix Penedès distintos de El Vendrell. Los territorios atendidos fuera de la comarca se añaden al registro solo cuando el titular los confirme; hoy no consta ninguno y no se listan en el sitio (D6).
- **Schema.org:** `City` con `@id` propio (`/#<clave>`), `containedInPlace` → territorio que lo contiene y `sameAs` cuando se verifique. Se declaran solo en la página que los cita, no en el grafo común.
- **Promoción:** un territorio secundario pasa a prioritario cuando cumple el criterio D1. El cambio es un único dato en la fuente canónica.

### 2.5 Invariantes (comprobables en la compilación)

Sustituidos por los invariantes definitivos de `ADR-001-propuesta-implementacion.md` §3.

### 2.6 Modelo de datos propuesto (no implementado)

Un registro por territorio en una única fuente (`src/lib/territorio.ts` o una sección de `entidad.ts`; ubicación por decidir en la implementación):

- `id`, `nombre`, `slug`
- `tipo`: municipio | núcleo | comarca | provincia | comunidad
- `categoria`: SEDE | AREA_SERVIDA | PRIORITARIO | SECUNDARIO
- `contenidoEn`: territorio padre (`containedInPlace`)
- `distanciaKm` (desde la sede; hoy entre centroides)
- `sameAs` (opcional; solo si está verificado)
- `ruta` (solo prioritarios)

Las constantes actuales (`BASE_LOCALITY`, `BASE_COMARCA`, `MUNICIPIOS_BAIX_PENEDES`, `ID.vendrell`, `ID.comarca`, `ID.comaRuga`…) pasan a derivarse de este registro, para no romper a los consumidores existentes durante la migración.

## 3. Decisiones

- **D1. Criterio de prioridad — CERRADA (10/10/2026):** prioritario = territorio con página indexable y estrategia de autoridad.
- **D2. Lista de prioritarios — CERRADA (10/10/2026):** Baix Penedès y El Vendrell. Coma-ruga pertenece a El Vendrell.
- **D3. Alcance de AREA_SERVIDA — CERRADA (10/10/2026):** el titular confirma servicio habitual fuera del Baix Penedès.
  - SEDE: El Vendrell.
  - ÁREA SERVIDA: radio operativo de 50 km desde la sede.
  - TERRITORIOS PRIORITARIOS: Baix Penedès y El Vendrell.
  - TERRITORIOS SECUNDARIOS: resto de territorios atendidos dentro del radio operativo, según la evolución del negocio.
- **D5–D8 — CERRADAS (10/10/2026):** detalle en `ADR-001-propuesta-implementacion.md` §7.
- **D4. Núcleos — CERRADA (10/10/2026):** Coma-ruga se modela como núcleo dependiente de El Vendrell (`Place`, `containedInPlace` → El Vendrell; sección de `/el-vendrell`, sin página propia).

## 4. Consecuencias

- **Positivas:** una sola definición del territorio para el texto, el grafo, las rutas y la documentación. Promover un territorio es un cambio de datos, no de código. Los invariantes evitan contradicciones al crecer.
- **Negativas y costes:** migración de 17 archivos de código y 13 documentos. Las cadenas escritas a mano (21 en 7 archivos) deben revisarse una a una. Los `@id` de los lugares existentes (`/#el-vendrell`, `/#baix-penedes`) deben conservarse para no romper referencias.
- **Riesgos:** si D3 adopta el radio de 50 km, el cambio deja de ser de estructura y pasa a ser de posicionamiento, con impacto en títulos, descripciones y contenido.

## 5. Referencias

- `docs/backlog.md` (fase 4, opción A; bloqueadores B3 y B5)
- `arquitectura/silo-web.md` (páginas de zona)
- `docs/knowledge-graph.md` (desactualizado desde la fase 3)
- Skill del proyecto: `references/municipios-50km.csv` y `references/municipios-50km-metodo.md`
