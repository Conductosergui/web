# Backlog técnico y bloqueadores — Conductos Ergui

Documento vivo. Cada entrada indica qué falta, a qué afecta y dónde se aplicará cuando llegue el dato.
Regla del proyecto: ningún dato de negocio se inventa; lo que no consta queda fuera del sitio y del grafo.

## Bloqueadores (requieren datos reales del titular)

| ID | Bloqueador | Estado | Afecta a | Dónde se aplica |
|---|---|---|---|---|
| B1 | `sameAs` de la empresa y del fundador | **Google Business Profile añadido (09/10/2026):** `https://share.google/vw7GEPfgwZeaARWBb` (`sameAs` y `hasMap`). Conviene sustituirlo por la URL canónica de Maps con `cid` cuando se facilite. Pendientes: Instagram (URL exacta), LinkedIn y perfil del fundador | Reconciliación de la entidad en buscadores e IA | `src/lib/schema.ts` → nodo `/#negocio` y `personNode()` |
| B2 | Validación del autor | **Confirmado por el titular (09/10/2026):** Bryan Ergui, fundador y persona física titular, 10 años de experiencia. Pendiente: credenciales y perfil externo | Person, autoría de guías, E-E-A-T | `src/lib/entidad.ts` (`AUTHOR_*`) |
| B3 | Datos legales obligatorios | **Dirección resuelta (09/10/2026):** Carrer Romaní 11, 43700 El Vendrell (`ADDRESS` en `entidad.ts`; visible en footer, `/el-vendrell` y `llms.txt`). Pendientes: NIF, información registral si aplica y coordenadas exactas del local (`GEO` sigue siendo el centroide municipal) | Aviso legal y privacidad (LSSI, RGPD); `legalName`, `taxID`, `vatID`, `address` | `src/app/legal/*`, `src/lib/entidad.ts`, `src/lib/schema.ts` |
| B4 | Fechas de las guías | **Resuelto. Fechas editoriales oficiales y definitivas** (titular, 09/10/2026): publicado 03/07/2026, actualizado 09/10/2026. Actualizar `FECHA_ACTUALIZACION` solo cuando cambie el contenido | `datePublished`/`dateModified`, Open Graph `article:*`, `lastmod` del sitemap | `src/data/guias.ts` |
| B5 | Activos locales reales | Pendientes: reseñas, casos reales, fotos propias de obra, ficha de Google Business Profile | Páginas locales (fase 5), casos de éxito y reseñas (fase 6) | — |
| B7 | Habilitación como empresa instaladora | **Bloqueado** hasta disponer de documentación real (decisión del titular, 09/10/2026). **No publicar** afirmaciones sobre RITE (cumplimiento), RASIC, habilitaciones ni gases fluorados. La mención informativa de la normativa (qué exige el RITE) se mantiene en guías, glosario y FAQ porque no afirma ninguna habilitación del negocio | Credibilidad del servicio de climatización; pregunta `habilitacion-instaladora`; afirmación V17 | `src/lib/schema.ts` (`hasCredential`), `src/data/faqs.ts` |
| B6 | Verificación de identificadores externos | Wikidata y schema.org no accesibles desde el entorno de desarrollo | `sameAs` de conceptos y lugares; subtipo `Legislation` para la normativa | `src/data/conceptos.ts` (`sameAs`), `src/app/guias/[slug]/page.tsx` (`citation`) |

Notas:
- El identificador `Q15367` que figura en `.github/copilot-instructions.md` para Baix Penedès **no está verificado**.
- La etiqueta git `fase-1` no se pudo publicar desde el entorno (el proxy corta el push de tags). Punto de restauración publicado como rama `restauracion/fase-1`.

## Ampliación editorial prioritaria

| Entidad | Motivo | Acción propuesta |
|---|---|---|
| **Servicio Ventilación** (`/servicios/ventilacion`) | Publicada con menor profundidad de contenido que el resto (`profundidad: "limitada"` en `src/data/servicios.ts`): sin guía ni tema propios. La página no muestra guías relacionadas; cuatro guías mencionan la ventilación de forma secundaria y solo constan como `mentions` en el grafo | Redactar al menos una guía propia (ventilación y renovación de aire o extracción de humos en cocinas) cuando exista contenido real del titular |
| Servicio Aislamiento acústico | Comparte la única guía de apoyo con Aislamiento térmico | Guía específica de aislamiento acústico en construcción en seco |
| Servicio Climatización | **Resuelto (09/10/2026):** el titular confirma la instalación de sistemas de climatización por conductos. No asumir otros sistemas (split, cassette, aerotermia) | Borrador `docs/borradores/fases-instalacion-climatizacion-por-conductos.md` pendiente de revisión |

## Tareas técnicas pendientes

| Tarea | Detalle |
|---|---|
| Crédito del pie de página | Implementado sin enlace: «Web creada por Aurora Market Labs» (`src/components/Footer.tsx`). **Pendiente:** convertirlo en enlace a la web oficial de Aurora Market Labs cuando se facilite la URL |
| Imágenes de Pexels | Se cargan en remoto desde `images.pexels.com`; alojarlas en el proyecto u optimizarlas con `next/image` |
| `.github/copilot-instructions.md` | Recomienda tipos inexistentes (`HVACContractor`, `DrywallContractor`), un radio de 50 km y Garraf; alinearlo con la arquitectura actual |
| Página índice `/temas` | No existe; las migas de `/temas/[cluster]` usan Inicio › Guías › Tema. Preparado para insertarla en una línea |

## Fase 3 — GEO, AEO y cobertura temática

| Elemento | Estado |
|---|---|
| Temas con menos de 2 guías | `noindex, follow` y fuera del sitemap (regla `MIN_GUIAS_TEMA_INDEXABLE` en `src/data/guias.ts`); se reindexan solos al publicar más guías |
| Preguntas frecuentes | `src/data/faqs.ts`: solo se publican las de estado `publicada` (con fuente). Las `pendiente` esperan validación |
| Compromisos del negocio | Listado para validación manual: `docs/validacion-compromisos.md` (V01–V19). **Decisión del titular (09/10/2026): todos siguen pendientes; ninguno se presenta como verificado.** V17 (cumplimiento del RITE) retirado del sitio por B7 |
| Guías nuevas | 4 borradores en `docs/borradores/` pendientes de revisión de Bryan Ergui |
| `/llms.txt` | Generado en el build desde las mismas fuentes que el sitio |
| Borradores fuera del área | Archivados en `docs/archivo/` (Sitges y Vilanova i la Geltrú) |

## Fase 4 — Autoridad local (opción A, aprobada por el titular)

| Elemento | Estado |
|---|---|
| `/baix-penedes` y `/el-vendrell` (con sección Coma-ruga) | Publicadas, en sitemap y `llms.txt`, enlazadas desde home y footer |
| `/coma-ruga` | Redirección 308 a `/el-vendrell#coma-ruga` (`next.config.ts`) |
| Páginas por municipio (Calafell, Cunit, L'Arboç, Santa Oliva…) | **Retenidas** hasta disponer de contenido real propio (trabajos documentados). Evita páginas puerta |
| Dirección postal y Google Business Profile | **Incorporados (09/10/2026).** Pendientes: coordenadas exactas y URL canónica de Maps |

## Puntos de restauración

| Rama | Commit | Contenido |
|---|---|---|
| `restauracion/fase-1` | `2e7b620` | Fundación técnica y grafo unificado |
| `restauracion/fase-2` | `5346621` | Capa de conceptos, Service Graph y páginas de servicio |
| `restauracion/fase-3` | `6cbebef` | GEO, AEO y cobertura temática |
