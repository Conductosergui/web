import { serializeGraph } from "@/lib/schema";

/** Inyecta un @graph JSON-LD. Los nodos referencian la entidad raíz por @id. */
export function JsonLd({ graph }: { graph: Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeGraph(graph) }} />;
}
