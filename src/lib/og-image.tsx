import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BASE_COMARCA, BASE_LOCALITY } from "@/lib/entidad";
import { OG_ALT, OG_SIZE } from "@/lib/seo";

export { OG_ALT, OG_SIZE };

// Imagen social compartida por Open Graph y Twitter: azul marino de la web, acentos verde lima
// y la misma composición tipográfica del H1 (sans en negrita + serif itálica).
// Se genera de forma estática en el build; las fuentes (OFL) están en src/assets/og.

const NAVY = "#05111f";
const NAVY_2 = "#0b2748";
const LIME = "#c7f35b";

async function font(file: string) {
  return readFile(join(process.cwd(), "src/assets/og", file));
}

export async function renderOgImage() {
  const [interBold, serifItalic] = await Promise.all([font("Inter-Bold-latin.otf"), font("InstrumentSerif-Italic.ttf")]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(135deg, ${NAVY_2} 0%, ${NAVY} 60%)`,
          color: "white",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 52 }}>
            <div style={{ width: 10, height: 30, background: LIME }} />
            <div style={{ width: 10, height: 52, background: LIME }} />
            <div style={{ width: 10, height: 38, background: LIME }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, letterSpacing: -0.3 }}>CONDUCTOS ERGUI</div>
            <div style={{ fontSize: 15, letterSpacing: 4, color: "rgba(255,255,255,0.6)" }}>AIRE ACONDICIONADO · PLADUR</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1, letterSpacing: -2.5 }}>Climatización y Pladur</div>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontSize: 72,
              lineHeight: 1.1,
              color: "rgba(255,255,255,0.62)",
              marginTop: 6,
            }}
          >
            {`en ${BASE_LOCALITY} y ${BASE_COMARCA}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 3, background: LIME }} />
          <div style={{ fontSize: 20, letterSpacing: 3, color: LIME }}>CONDUCTOS · VENTILACIÓN · PLADUR · AISLAMIENTO</div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
        { name: "Instrument Serif", data: serifItalic, weight: 400, style: "italic" },
      ],
    },
  );
}
