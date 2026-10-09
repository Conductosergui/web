# Borradores de guías — flujo borrador → revisión de Bryan Ergui → publicación

Estos textos **no se publican** ni forman parte del build. Se publicarán firmados por Bryan Ergui
solo después de su revisión, porque atribuirle textos no revisados sería una falsa autoría.

Para publicar una guía aprobada:
1. Corregir el texto y resolver todas las marcas `[VERIFICAR]` (o eliminar la frase).
2. Añadirla a `src/data/guias.ts` con su `respuestaRapida`, `conceptos` y `menciona`.
3. Si su tema alcanza 2 guías, el tema se reindexa automáticamente (`MIN_GUIAS_TEMA_INDEXABLE`).

| Borrador | Concepto principal | Servicio que refuerza | Prioridad |
|---|---|---|---|
| `ventilacion-y-renovacion-de-aire.md` | Ventilación | Ventilación (profundidad limitada) | Alta |
| `extraccion-de-humos-en-cocinas.md` | Extracción de humos | Ventilación (profundidad limitada) | Alta |
| `aislamiento-acustico-en-construccion-en-seco.md` | Aislamiento acústico | Aislamiento acústico | Media |
| `fases-instalacion-climatizacion-por-conductos.md` | Climatización | Climatización (instalación) | Media |
