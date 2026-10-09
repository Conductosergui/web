# Validación manual de compromisos del negocio

Afirmaciones que comprometen al negocio (plazos, costes, garantías, procedimientos). Proceden del proyecto
base (ZIP) y **no han sido confirmadas por el titular**. Los motores de IA las citan como hechos, por lo que
cada una necesita una decisión: **Confirmar** (se mantiene/publica), **Corregir** (indicar el texto real) o
**Retirar**.

- Estado «Publicado»: está visible hoy en el sitio (heredado del proyecto base).
- Estado «Retenido»: no se publica hasta su validación (preguntas `pendiente` de `src/data/faqs.ts`).

| ID | Compromiso (texto literal) | Dónde aparece | Estado | Decisión |
|---|---|---|---|---|
| V01 | «La primera revisión de la solicitud y la orientación inicial se ofrecen sin compromiso. Si el proyecto requiere una visita técnica específica o pruebas, se informa previamente de cualquier coste.» | FAQ `coste-valoracion` | Retenido | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V02 | «Una intervención reducida puede resolverse en una jornada; los proyectos con varias fases requieren planificación. El plazo estimado queda reflejado en la propuesta.» | FAQ `duracion-intervencion` | Retenido | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V03 | «Se retiran los residuos generados directamente por el trabajo y se deja la zona recogida…» | FAQ `retirada-residuos` | Retenido | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V04 | «Tras recibir el formulario se indica el modo de envío [de fotografías y planos].» | FAQ `envio-fotos` | Retenido | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V05 | «Se trabaja con administraciones y comunidades; se presenta la documentación requerida y se coordinan los horarios con antelación.» | FAQ `comunidades` | Retenido | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V06 | «Cada seis meses en locales con alto tránsito» (revisión de conductos) | FAQ `frecuencia-locales-seis-meses` | Retenido (además requiere verificación frente al RITE) | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V07 | «24–48 h · Respuesta inicial» / «24–48 h · Respuesta técnica» | Home: cobertura y llamada final | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V08 | «100 % · Transparencia documental» / «100 % · Documentación clara» | Home: cabecera y llamada final | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V09 | «Agenda de obra · ABIERTA» (indicador animado) | Home: imagen de cabecera | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V10 | «Presupuesto claro: alcance, materiales, plazos y condiciones económicas definidos antes del inicio de cualquier intervención.» | Home: Garantías; CTA de las páginas de servicio | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V11 | «Cumplimiento de plazos: planificación comunicada y respeto por los tiempos acordados. Cualquier variación se informa con antelación.» | Home: Garantías | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V12 | «Cuidado del entorno: protección de superficies y zonas de paso. Retiro de los residuos generados durante la intervención.» | Home: Garantías; `/compromiso` | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V13 | «Criterio técnico: recomendación basada en la necesidad real del proyecto, con explicación de las opciones disponibles.» | Home: Garantías | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V14 | Principios de `/compromiso`: claridad desde el inicio, soluciones con criterio, respeto por el espacio, trato directo «sin cadenas de intermediarios ni respuestas automáticas» | `/compromiso` | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V15 | Expectativas de `/compromiso`: valoración comprensible, comunicación ante cambios, comprobación visual y recogida final, «atención posterior ante dudas sobre la intervención» | `/compromiso` | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V16 | «Si es necesario, se coordina una visita a la ubicación.» / «Se recibe una propuesta clara, con alcance y plazos.» | `/presupuestador` | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V17 | «Trabajo conforme al Reglamento de Instalaciones Térmicas en los Edificios (RITE).» | `/servicios/climatizacion` (alcance) | **Publicado** (fuente: `contenido/conductos-aire.md`) | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V19 | «…con una valoración técnica clara y sin compromiso.» (mismo compromiso que V01) | Llamada final de las 6 guías y de los 5 temas | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |
| V18 | Fecha de las páginas legales: «Actualizado el 20 de junio de 2025» | `/legal/*` (`src/components/LegalPage.tsx`) | **Publicado** | ☐ Confirmar ☐ Corregir ☐ Retirar |

Notas:
- V17 está relacionado con el bloqueador B7 (habilitación como empresa instaladora): afirmar cumplimiento del RITE sin registro documentado es un riesgo; si se confirma, conviene acompañarlo del número de registro cuando exista.
- V18 es una fecha heredada del proyecto base; los textos legales además están incompletos (bloqueador B3).
- Al validar una pregunta retenida, cambiar su `estado` a `"publicada"` en `src/data/faqs.ts` (y su texto si se corrige).
