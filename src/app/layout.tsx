import type { Metadata } from "next";
import "./globals.css";

// Root layout del App Router (Next.js).
// Metadatos base del sitio. Ajustar/ampliar por página con `export const metadata`.
export const metadata: Metadata = {
    metadataBase: new URL("https://conductosergui.es"),
    title: {
      default: "Conductos Ergui | Climatización y Pladur en Cunit",
          template: "%s | Conductos Ergui",
    },
    description:
          "Instalación y mantenimiento de conductos de aire (HVAC) y pladur en Cunit, con cobertura en un radio de 50 km (Baix Penedès, Garraf, Alt Penedès, Tarragonès, Baix Llobregat).",
};

export default function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    return (
          <html lang="es">
                <body>{children}</body>
          </html>
        );
}
