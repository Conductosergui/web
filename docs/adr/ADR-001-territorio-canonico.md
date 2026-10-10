# ADR-001 — Territorio canónico

- **Estado:** Aprobado como documento base (10/10/2026). D1, D2 y D4 cerradas; D3 reabierta (ver `ADR-001-propuesta-implementacion.md`).
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

- **Definición:** conjunto completo de territorios donde se presta el servicio.
- **Valor vigente:** comarca del Baix Penedès, con sus 14 municipios, según el sitio publicado y las decisiones de las fases 2–4.
- **Schema.org:** `areaServed` de `/#negocio`, de los departamentos y de los `Service`. Solo puede referenciar territorios de esta categoría.
- **No adoptado:** el radio de 50 km (200 municipios) de la skill y de `copilot-instructions.md`. Queda como decisión abierta D3.

### 2.3 TERRITORIOS_PRIORITARIOS

- **Definición:** subconjunto de AREA_SERVIDA con presencia propia e indexable en la web (página dedicada).
- **Valor vigente:** El Vendrell (`/el-vendrell`, municipio de la sede) y Baix Penedès (`/baix-penedes`, comarca).
- **Criterio de entrada:** pendiente (D1). La referencia aprobada en la fase 4 es disponer de contenido real propio del territorio (umbral de trabajos documentados; valor exacto no consta).
- **Schema.org:** `City`/`AdministrativeArea` con `@id` propio, `sameAs` verificado y página con `about` → territorio.

### 2.4 TERRITORIOS_SECUNDARIOS

- **Definición:** territorios de AREA_SERVIDA sin página propia. Se citan en la página de la comarca y existen como entidad.
- **Valor vigente:** los 13 municipios del Baix Penedès distintos de El Vendrell.
- **Schema.org:** `City` con `@id` propio, `containedInPlace` → comarca y `sameAs` cuando se verifique. Se declaran solo en la página que los cita, no en el grafo común.
- **Promoción:** un territorio secundario pasa a prioritario cuando cumple el criterio D1. El cambio es un único dato en la fuente canónica.

### 2.5 Invariantes (comprobables en la compilación)

1. Existe exactamente una SEDE y su municipio pertenece a AREA_SERVIDA.
2. TERRITORIOS_PRIORITARIOS ∩ TERRITORIOS_SECUNDARIOS = ∅.
3. Los municipios de TERRITORIOS_PRIORITARIOS ∪ TERRITORIOS_SECUNDARIOS son exactamente los municipios de AREA_SERVIDA.
4. Todo territorio tiene un único `@id` estable.
5. `areaServed` solo referencia territorios de AREA_SERVIDA.
6. Solo los TERRITORIOS_PRIORITARIOS tienen ruta indexable propia y entrada en sitemap y `llms.txt`.
7. Ningún texto, nodo ni ruta publicada nombra un territorio fuera de AREA_SERVIDA como zona de servicio.

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
- **D3. Alcance de AREA_SERVIDA — REABIERTA (10/10/2026):** el titular confirma servicio habitual fuera del Baix Penedès. Dirección indicada: sede en El Vendrell, área servida = radio operativo de 50 km, territorio prioritario de autoridad = Baix Penedès. Propuesta de implementación en `docs/adr/ADR-001-propuesta-implementacion.md`. Mientras no se apruebe, rige el valor vigente (comarca, 14 municipios) y los invariantes 3 y 7 se revisarán con esa propuesta.
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
