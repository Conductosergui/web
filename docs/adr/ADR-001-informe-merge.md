# ADR-001 · Informe final de merge y procedimiento de rollback

- **Fecha:** 10/10/2026
- **Aprobación:** titular (ADR-001, F1 e I2–I5 aprobados; despliegues Preview revisados; Node 24.x configurado en Vercel).
- **Rama:** `claude/amazing-darwin-pqm9r1` → `main`, merge en avance rápido (fast-forward), sin commits de merge ni conflictos.
- **`main` antes del merge:** `a2801de` (Corrige el ID de medición de GA4).
- **Punto de restauración:** rama `restauracion/pre-adr-001` → `a2801de`.

## 1. Contenido del merge

| Commit | Fase | Alcance |
|---|---|---|
| `ce651c4` | ADR | ADR-001 propuesto |
| `5c31eee` | ADR | D1, D2 y D4 cerradas; propuesta de implementación |
| `851151e` | F1 | Registro territorial canónico (`src/lib/territorio.ts`); `entidad.ts` deriva de él. Salida idéntica |
| `8941e2f` | ADR | D3 cerrada; secundarios ampliados; `@id` `/#<clave>`. Salida idéntica |
| `356989a` | I2 | `areaServed` = GeoCircle 50 km + Baix Penedès; 13 municipios secundarios como `City` en `/baix-penedes` |
| `697711c` | I3 | Textos visibles alineados con el radio operativo; WhatsApp sin territorio; métrica "14 municipios" retirada |
| `feeed74` | I4 | `scripts/validar-grafo.mjs` en `npm run build` (invariantes 1–9 y referencias) |
| `9bdb865` | I5 | Documentación (README, silo-web, knowledge-graph, backlog, copilot-instructions) |
| este informe | — | Informe de merge y rollback |

Total: 22 archivos de código y documentación (+895 / −252 líneas antes de este informe).

## 2. Verificaciones realizadas

| Verificación | Resultado |
|---|---|
| Tipos (`tsc --noEmit`) y lint | 0 errores (3 avisos previos por `<img>`) |
| `npm run build` (incluye validación) | Correcto: 38 rutas generadas; invariantes ADR-001 1–9 y referencias del grafo correctos |
| Validación negativa (I4) | 8 infracciones inyectadas, 8 detectadas |
| Grafo | 149 → 163 nodos con `@id`; 377 → 402 aristas; 0 referencias rotas; ningún `@id` publicado eliminado ni modificado |
| Títulos, metaetiquetas, H1, sitemap | Sin cambios (comparación antes/después de la compilación) |
| Destinos de enlaces | Sin cambios; solo cambia el texto prerrellenado de los 2 enlaces de WhatsApp |
| Despliegues Preview | Revisados por el titular |
| Node en Vercel | 24.x (el validador requiere 22.6 o superior) |

## 3. Efectos esperados tras el despliegue

- JSON-LD: `areaServed` con GeoCircle `/#area-servida` (radio 50 000 m, centro 41,220202; 1,534805) + `/#baix-penedes` en la empresa, los departamentos y los servicios.
- `/baix-penedes`: 13 nodos `City` nuevos (`/#calafell`, `/#cunit`…).
- Textos de cobertura con "radio operativo de 50 km" y "zona principal: Baix Penedès".
- `npm run build` falla si un cambio futuro rompe un invariante del ADR-001.

## 4. Procedimiento de rollback

Elegir según la urgencia. Ninguna opción requiere reescribir el historial de `main`.

### Opción A — Inmediata, sin tocar el repositorio (Vercel)

1. Vercel → proyecto → Deployments.
2. Localizar el último despliegue de producción anterior al merge (commit `a2801de`).
3. Usar la acción de Vercel para volver a ese despliegue (Instant Rollback / Promote to Production; el nombre exacto depende de la versión del panel, verificar en Vercel).
4. Efecto: la web vuelve al estado anterior en segundos. `main` sigue conteniendo los cambios; el siguiente push a `main` volvería a publicarlos, así que hay que completar después la opción B si el rollback debe ser permanente.

### Opción B — Permanente, revirtiendo commits (recomendada si el rollback es definitivo)

```bash
git checkout main
git pull origin main
git revert --no-edit a2801de..HEAD   # crea commits que deshacen el merge, del más reciente al más antiguo
npm run build                        # debe compilar; ya sin la validación de ADR-001 si se revierte también I4
git push origin main
```

- Si solo hay que deshacer una fase, revertir únicamente su commit (por ejemplo `git revert 697711c` para I3). Orden de dependencias: I4 depende del registro (F1) y del grafo (I2); I3 usa `RADIO_OPERATIVO` (F1). Revertir una fase base exige revertir antes las que dependen de ella.

### Opción C — Restaurar el código exacto de antes del merge

```bash
git checkout main
git pull origin main
git restore --source restauracion/pre-adr-001 --staged --worktree .
git commit -m "Rollback: restaura el estado de main anterior a ADR-001 (a2801de)"
git push origin main
```

Deja `main` con el mismo contenido que `a2801de` en un commit nuevo, conservando el historial.

### Comprobación tras cualquier rollback

- La home vuelve a mostrar "14 · Municipios atendidos" y el JSON-LD vuelve a `areaServed` = El Vendrell + Baix Penedès.
- `npm run build` termina sin errores.

## 5. Tareas posteriores al merge (fuera de este alcance)

1. **Google Business Profile** (titular): revisar la ficha y configurar las zonas de servicio acordes con el radio operativo de 50 km. Las restricciones de Google sobre la extensión de la zona de servicio no están verificadas en las referencias del proyecto.
2. **Install-scripts de `sharp` y `unrs-resolver`**: aprobar su ejecución. El proyecto usa npm (`package-lock.json`); ambos son dependencias transitivas (no figuran en `package.json`). El origen exacto del aviso no se ha visto desde el entorno de desarrollo; confirmar en el registro de compilación de Vercel o en el gestor de paquetes que lo emite.
3. **GA4 a variables de entorno** (tarea posterior): mover `G-HMX7KK95LQ` de `src/components/Analytics.tsx` a una variable `NEXT_PUBLIC_*` en Vercel.
4. Observación no bloqueante: revisar la redacción de las menciones repetidas a "radio operativo de 50 km".
