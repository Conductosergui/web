# ADR-001 · Propuesta de implementación (D3 reabierta)

- **Estado:** Aprobada con D5–D8 (10/10/2026). F1, I2 e I3 implementadas en la rama de trabajo, sin fusionar a `main`. I4–I5 pendientes.
- **Fecha:** 10/10/2026
- **Base:** `ADR-001-territorio-canonico.md` (aprobado como documento base; D1, D2 y D4 cerradas).
- **Dirección indicada por el titular:** sede en El Vendrell; área servida = radio operativo de 50 km; territorio prioritario de autoridad = Baix Penedès.

## 1. Modelo territorial resultante

1. **SEDE**
   - Municipio: El Vendrell (`/#el-vendrell`, `City`).
   - Local: Carrer Romaní 11, 43700 El Vendrell (`ADDRESS`); coordenadas 41,220202; 1,534805 (`GEO`).
   - Núcleo dependiente: Coma-ruga (`/el-vendrell#coma-ruga`, `Place`, `containedInPlace` → El Vendrell). Sin página propia (D4).
2. **AREA_SERVIDA (radio operativo)**
   - Círculo de 50 km con centro en las coordenadas del local (`GEO`), no en el centroide municipal.
   - Se declara como área geométrica, **sin enumerar municipios** en el grafo ni en el código.
3. **TERRITORIOS_PRIORITARIOS (autoridad)**
   - Baix Penedès (`/#baix-penedes`, página `/baix-penedes`).
   - El Vendrell (`/#el-vendrell`, página `/el-vendrell`), con la sección Coma-ruga.
4. **TERRITORIOS_SECUNDARIOS** (D3: resto de territorios atendidos dentro del radio, según la evolución del negocio)
   - Hoy: los 13 municipios del Baix Penedès distintos de El Vendrell. Entidad `City` con `@id` (`/#<clave>`) y `containedInPlace` → Baix Penedès, declarada solo en `/baix-penedes`, sin página propia.
   - Territorios atendidos fuera de la comarca: se incorporan al registro cuando el titular los confirme (hoy no consta ninguno). Mientras D6 siga vigente, no se listan en el sitio; se comunican de forma genérica: "radio de 50 km desde El Vendrell".

## 2. Representación en schema.org

1. **Área servida:** `GeoCircle` con `geoMidpoint` (coordenadas de `GEO`) y `geoRadius` = `50000` (en metros, unidad por defecto de la propiedad en schema.org).
2. **Composición de `areaServed`** (decisión D5), en `/#negocio`, los departamentos y los 6 `Service`:
   - **Opción A (recomendada):** `[GeoCircle 50 km, ref(/#baix-penedes)]`. El círculo expresa el alcance real y la comarca mantiene el vínculo explícito con el territorio prioritario.
   - **Opción B:** solo `[GeoCircle 50 km]`. La prioridad se expresa únicamente con las páginas `/baix-penedes` y `/el-vendrell` (`about`).
3. **Prioridad de autoridad:** se mantiene con `about` y `mainEntity` en `/baix-penedes` y `/el-vendrell`, sin cambios de ruta.
4. **Limitación conocida:** según la referencia del proyecto (`references/google-oficial.md`), Google no documenta `areaServed` entre las propiedades que admite para negocios locales, ni para usarla ni para descartarla. El cambio aporta coherencia para otros consumidores (motores generativos, `llms.txt`), pero no hay respaldo oficial de que Google lo use. El área de servicio que Google muestra se configura en Google Business Profile (acción del titular, ver §6).

## 3. Invariantes definitivos (sustituyen a los del ADR §2.5)

1. Existe exactamente una SEDE con dirección y coordenadas.
2. AREA_SERVIDA es un único `GeoCircle` centrado en las coordenadas de la SEDE.
3. TERRITORIOS_PRIORITARIOS = {Baix Penedès, El Vendrell}; cambiar la lista exige una decisión registrada en el ADR.
4. Todo TERRITORIO_SECUNDARIO está dentro de AREA_SERVIDA, no tiene página propia y figura en el registro solo con confirmación del titular.
5. TERRITORIOS_PRIORITARIOS ∩ TERRITORIOS_SECUNDARIOS = ∅.
6. Todo territorio con nodo en el grafo tiene un único `@id` estable.
7. `areaServed` solo contiene el `GeoCircle` de AREA_SERVIDA y, según D5, territorios prioritarios.
8. Solo los TERRITORIOS_PRIORITARIOS tienen ruta indexable propia y entrada en sitemap y `llms.txt`.
9. Ningún texto publicado presenta el Baix Penedès como límite del servicio.

## 4. Inventario de textos afectados (evidencia, commit `a2801de`)

### 4.1 Pasan a ser falsos o incompletos con el radio de 50 km (cambio obligatorio)

| Archivo | Texto actual | Problema |
|---|---|---|
| `src/app/page.tsx` (cabecera) | "14 · Municipios atendidos" | Se atiende más que 14 municipios |
| `src/app/page.tsx` (cobertura) | "14 · Municipios" | Ídem |
| `src/components/Footer.tsx` | "Área de servicio: Comarca del Baix Penedès · 14 municipios" | Declara la comarca como área de servicio |
| `src/app/el-vendrell/page.tsx` (ficha) | "Área de servicio: Comarca del Baix Penedès" | Ídem |
| `src/app/el-vendrell/page.tsx` (respuesta rápida) | "…se atienden todo el municipio… y el resto de la comarca" | Omite el radio |
| `src/app/el-vendrell/page.tsx` (cercanos) | "Desde El Vendrell se atienden los 14 municipios del Baix Penedès" | Sugiere límite comarcal |
| `src/app/llms.txt/route.ts` | "Área de servicio: comarca del Baix Penedès (…)" | Declara la comarca como área de servicio |
| `src/data/faqs.ts` (pregunta de zona, línea 599) | "En El Vendrell… y en la comarca del Baix Penedès: [14 municipios]" | Respuesta incompleta a "¿dónde trabaja?" |
| `src/lib/entidad.ts` (WhatsApp) | "…para un proyecto en el Baix Penedès" / "…en la zona del Baix Penedès" | Mensaje inexacto para un cliente fuera de la comarca (D7) |

### 4.2 Siguen siendo verdaderos (enfoque de autoridad; sin cambio)

- Títulos, H1 y descripciones "en El Vendrell y Baix Penedès" (`servicios/[slug]`, `servicios`, `SITE_DESCRIPTION`, `keywords`, metas `geo.*`).
- Descripciones de los 6 servicios (`src/data/servicios.ts`, 9 cadenas) y FAQ de la línea 233.
- Página `/baix-penedes`: su pregunta se limita a la comarca ("¿En qué municipios del Baix Penedès…?").
- Sección Cobertura de la home y frase "en toda la comarca del Baix Penedès": verdaderas, aunque se completarán con la mención del radio.

### 4.3 Documentación

- `README.md`: "Área de servicio: comarca del Baix Penedès".
- `arquitectura/silo-web.md` y `docs/knowledge-graph.md`: `areaServed` descrito como comarca.
- `docs/backlog.md`: añadir D3 y la acción de Google Business Profile.
- `.github/copilot-instructions.md`: ya habla de 50 km, pero también del Garraf y de tipos inexistentes; se alinea con el ADR.

## 5. Fases de implementación y esfuerzo estimado

La estimación es de ejecución técnica, a partir del número de archivos y cadenas; no incluye el tiempo de revisión del titular.

| Fase | Contenido | Archivos | Estimación |
|---|---|---|---|
| I0 | Cerrar D5–D8 y aprobar esta propuesta | — | Titular |
| I1 | Registro territorial canónico (`territorio.ts` o sección de `entidad.ts`) con las 5 capas; las constantes actuales se derivan de él, sin cambio visible | 1–2 | 1–2 h |
| I2 | Grafo: `GeoCircle` en `areaServed` (D5), 13 municipios secundarios con `@id` en `/baix-penedes`, `schema/home.jsonld` regenerado | 3 | 1,5–2,5 h |
| I3 | Textos obligatorios de §4.1 (cifras "14", footer, ficha, respuesta rápida, `llms.txt`, FAQ de zona, WhatsApp según D7) | 6 | 1,5–3 h |
| I4 | Validación: invariantes 1–9 en la compilación | 1 | 1–2 h |
| I5 | Documentación de §4.3 | 4–5 | 1–1,5 h |
| **Total** | | **≈15** | **6–11 h** |

Cada fase en su propio commit en la rama de trabajo, con diff para aprobación. Sin fusión a `main` hasta indicación expresa.

## 6. Acciones fuera del repositorio (titular)

- Google Business Profile: configurar las zonas de servicio para que coincidan con el radio declarado. Las restricciones de Google sobre la extensión de la zona de servicio no están verificadas en las referencias del proyecto; comprobarlas en la ayuda oficial antes de configurarlas.

## 7. Decisiones (10/10/2026)

- **D5 — APROBADA: opción A.** `areaServed` = `GeoCircle` de 50 km + Baix Penedès.
- **D6 — APROBADA.** No se listan por ahora municipios fuera de la comarca; se usa una referencia genérica al radio operativo.
- **D7 — APROBADA.** Mensajes predefinidos de WhatsApp sin mención territorial.
- **D8 — APROBADA.** Se elimina la métrica "14 municipios atendidos" y se sustituye por un mensaje descriptivo de cobertura sin cifras.

## 8. Registro de ejecución

- **I3 — Contenido visible (10/10/2026):** textos de cobertura alineados con el ADR (D3, D6, D7, D8) mediante la constante `RADIO_OPERATIVO` de `entidad.ts`: métrica "14 municipios atendidos" sustituida por "Local · Servicio de proximidad" (cabecera y Cobertura) y cifra "14" sin etiqueta retirada de la tarjeta "Disponibilidad"; "Área de servicio" = radio operativo + zona principal Baix Penedès (pie, ficha de `/el-vendrell`, `llms.txt`); FAQ de cobertura y de climatización; respuesta rápida de `/el-vendrell` y `/servicios`; textos de enlaces "Zona de servicio" → "Zona principal" (destinos sin cambios); WhatsApp sin mención territorial; opción "Otra localidad (radio operativo de 50 km)" en el formulario de contacto. Sin cambios en títulos, metaetiquetas, H1, sitemap ni destinos de enlaces (verificado). Validador: 0 problemas.
- **I2 — Grafo (10/10/2026):** `areaServed` = `GeoCircle` de 50 km (`/#area-servida`, centro en las coordenadas del local) + Baix Penedès en `/#negocio`, los departamentos y los 6 `Service`. Los 13 municipios secundarios se publican como `City` (`/#<clave>`, `containedInPlace` → Baix Penedès) solo en `/baix-penedes`, y su `ItemList` los referencia por `@id`. Nodos de territorio de `schema.ts` leídos del registro. Sin cambios en títulos, descripciones, H1, sitemap, texto visible ni enlaces (verificado). Validador: 149 → 163 nodos con `@id`, 377 → 402 aristas, 0 problemas, 0 referencias rotas.
- **D3 cerrada (10/10/2026):** definición de TERRITORIOS_SECUNDARIOS ampliada al resto de territorios atendidos dentro del radio. En el registro, el `@id` de los secundarios pasa a `/#<clave>` (antes `/baix-penedes#<clave>`), válido también para territorios fuera de la comarca. Aún no se publican, así que el cambio no afecta a la salida.
- **F1 / I1 — Registro canónico (10/10/2026):** `src/lib/territorio.ts` (territorios, `SEDE`, `AREA_SERVIDA`) y `src/lib/entidad.ts` derivando de él `BASE_*`, `ADDRESS`, `GEO`, `MUNICIPIOS_BAIX_PENEDES`, rutas de zona y `@id` de territorio (nueva función `territorioId`). Verificación: la salida compilada (texto, metadatos, enlaces, JSON-LD, sitemap, `llms.txt`, `robots.txt` de las 30 rutas) es idéntica antes y después del cambio. `AREA_SERVIDA` y los `@id` de los municipios secundarios quedan definidos pero aún no se publican (I2).
