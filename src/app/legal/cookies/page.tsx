import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalPage } from "@/components/LegalPage";
import { pageNode } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description: "Uso de almacenamiento local y cookies en el sitio de Conductos Ergui y cómo gestionar las preferencias.",
  path: "/legal/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Preferencias" title="Política de cookies">
      <JsonLd graph={[pageNode({ path: "/legal/cookies", name: "Política de cookies", withBreadcrumb: false })]} />
      <p>
        Este sitio utiliza almacenamiento local y cookies para prestar el servicio y, solo con consentimiento, conocer de forma agregada cómo se utiliza.
      </p>
      <h2>1. Qué son las cookies</h2>
      <p>
        Son pequeños archivos o identificadores almacenados en el dispositivo. Algunas son necesarias para el funcionamiento; otras permiten medir el uso o personalizar contenidos.
      </p>
      <h2>2. Tecnologías actuales</h2>
      <h3>Preferencia de consentimiento</h3>
      <p>
        Se guarda localmente la opción elegida en el aviso de privacidad bajo el identificador <strong>ct-cookie-choice</strong>. Su finalidad es recordar la elección y evitar mostrar el aviso en cada visita. No se utiliza para publicidad.
      </p>
      <h3>Cookies técnicas de infraestructura</h3>
      <p>
        Vercel o Cloudflare pueden utilizar identificadores estrictamente necesarios para seguridad, equilibrio de carga y protección frente a abuso. Su duración y alcance dependen de la configuración del despliegue.
      </p>
      <h2>3. Analítica</h2>
      <h3>Google Analytics 4</h3>
      <p>
        Solo si se pulsa <strong>Aceptar todas</strong> en el aviso de privacidad se carga Google Analytics 4, servicio de Google, para medir de forma agregada las visitas y el uso del sitio. Utiliza las cookies <strong>_ga</strong> y <strong>_ga_&lt;ID&gt;</strong>, con una duración predeterminada de hasta 2 años. Con la opción <strong>Solo necesarias</strong>, o sin elección, no se carga ni se envía ningún dato a Google.
      </p>
      <p>No se utilizan cookies publicitarias ni de marketing.</p>
      <h2>4. Cómo cambiar la elección</h2>
      <p>
        En cualquier momento se puede cambiar o retirar el consentimiento con el enlace <strong>Configurar cookies</strong> del pie de página. Al elegir <strong>Solo necesarias</strong> se eliminan las cookies de Google Analytics de este sitio. También se pueden eliminar o bloquear el almacenamiento y las cookies desde la configuración del navegador, aunque ciertas funciones técnicas podrían verse afectadas.
      </p>
      <h2>5. Contacto</h2>
      <p>Para consultas sobre privacidad y cookies, se puede escribir a conductosergui@gmail.com.</p>
    </LegalPage>
  );
}
