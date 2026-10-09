# Backlog técnico y bloqueadores — Conductos Ergui

Documento vivo. Cada entrada indica qué falta, a qué afecta y dónde se aplicará cuando llegue el dato.
Regla del proyecto: ningún dato de negocio se inventa; lo que no consta queda fuera del sitio y del grafo.

## Bloqueadores (requieren datos reales del titular)

| ID | Bloqueador | Estado | Afecta a | Dónde se aplica |
|---|---|---|---|---|
| B1 | `sameAs` de la empresa y del fundador | Pendiente. Instagram: falta la URL exacta. Resto de perfiles (Google Business Profile, LinkedIn…) pendientes | Reconciliación de la entidad en buscadores e IA | `src/lib/schema.ts` → nodo `/#negocio` y `personNode()` |
| B2 | Validación del autor | **Resuelto parcialmente.** Autor real: Bryan Ergui, fundador y persona física titular, 10 años de experiencia. Pendiente: credenciales (p. ej. carné RITE) y perfil externo | Person, autoría de guías, E-E-A-T | `src/lib/entidad.ts` (`AUTHOR_*`) |
| B3 | Datos legales obligatorios | Pendiente: NIF, dirección completa definitiva, información registral si aplica | Aviso legal y privacidad (LSSI, RGPD); `legalName`, `taxID`, `vatID`, `address` | `src/app/legal/*`, `src/lib/entidad.ts`, `src/lib/schema.ts` |
| B4 | Fechas reales de las guías | Pendiente de validación. Las guías muestran fechas de 2025 heredadas del proyecto base | `datePublished`/`dateModified`, Open Graph `article:*` | `src/data/guias.ts` |
| B5 | Activos locales reales | Pendientes: reseñas, casos reales, fotos propias de obra, ficha de Google Business Profile | Páginas locales (fase 5), casos de éxito y reseñas (fase 6) | — |
| B6 | Verificación de identificadores externos | Wikidata y schema.org no accesibles desde el entorno de desarrollo | `sameAs` de conceptos y lugares; subtipo `Legislation` para la normativa | `src/data/conceptos.ts` (`sameAs`), `src/app/guias/[slug]/page.tsx` (`citation`) |

Notas:
- El identificador `Q15367` que figura en `.github/copilot-instructions.md` para Baix Penedès **no está verificado**.
- La etiqueta git `fase-1` no se pudo publicar desde el entorno (el proxy corta el push de tags). Punto de restauración publicado como rama `restauracion/fase-1`.

## Ampliación editorial prioritaria

| Entidad | Motivo | Acción propuesta |
|---|---|---|
| **Servicio Ventilación** (`/servicios/ventilacion`) | Publicada con menor profundidad de contenido que el resto (`profundidad: "limitada"` en `src/data/servicios.ts`): sin guía ni tema propios. La página no muestra guías relacionadas; cuatro guías mencionan la ventilación de forma secundaria y solo constan como `mentions` en el grafo | Redactar al menos una guía propia (ventilación y renovación de aire o extracción de humos en cocinas) cuando exista contenido real del titular |
| Servicio Aislamiento acústico | Comparte la única guía de apoyo con Aislamiento térmico | Guía específica de aislamiento acústico en construcción en seco |
| Servicio Climatización | El alcance no confirma si se instalan equipos (máquinas) además de la red de distribución | Confirmar con el titular antes de ampliar el contenido |

## Tareas técnicas pendientes

| Tarea | Detalle |
|---|---|
| Crédito del pie de página | Implementado sin enlace: «Web creada por Aurora Market Labs» (`src/components/Footer.tsx`). **Pendiente:** convertirlo en enlace a la web oficial de Aurora Market Labs cuando se facilite la URL |
| Imágenes de Pexels | Se cargan en remoto desde `images.pexels.com`; alojarlas en el proyecto u optimizarlas con `next/image` |
| `.github/copilot-instructions.md` | Recomienda tipos inexistentes (`HVACContractor`, `DrywallContractor`), un radio de 50 km y Garraf; alinearlo con la arquitectura actual |
| Página índice `/temas` | No existe; las migas de `/temas/[cluster]` usan Inicio › Guías › Tema. Preparado para insertarla en una línea |
