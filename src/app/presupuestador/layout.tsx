import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { pageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// La página es un componente de cliente y no puede exportar metadatos: se declaran aquí.
const DESCRIPTION =
  "Solicita una valoración de climatización por conductos o pladur en El Vendrell y el Baix Penedès. El formulario prepara el mensaje para enviarlo por correo o WhatsApp.";

export const metadata: Metadata = buildMetadata({ title: "Solicitar presupuesto", description: DESCRIPTION, path: "/presupuestador" });

const graph = [
  pageNode({ path: "/presupuestador", name: "Solicitar presupuesto", description: DESCRIPTION, type: "ContactPage", withBreadcrumb: false }),
];

export default function PresupuestadorLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd graph={graph} />
      {children}
    </>
  );
}
