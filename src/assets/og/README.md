# Fuentes para la imagen social (Open Graph / Twitter)

Solo las usa `src/lib/og-image.tsx` durante el build; no se sirven al navegador.

| Archivo | Origen | Licencia |
|---|---|---|
| `Inter-Bold-latin.otf` | Inter Bold (rsms/inter), subconjunto latino generado con fontTools | SIL Open Font License 1.1 |
| `InstrumentSerif-Italic.ttf` | Instrument Serif Italic, Google Fonts | SIL Open Font License 1.1 |

Motivo: la fuente por defecto de `next/og` producía espacios irregulares entre palabras.
Instrument Serif es la misma serif que usa la web (`.serif-it`).
