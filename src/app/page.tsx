import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inicio",
};

// TODO: Contenido de la Home. Ver /arquitectura/silo-web.md y /schema/
// para el marcado JSON-LD (tipos ["HVACContractor", "DrywallContractor"]).
export default function HomePage() {
    return (
          <main>
                <h1>Conductos Ergui</h1>
                <p>Climatización (HVAC) y Pladur en Cunit y comarca.</p></main>

        );
}
