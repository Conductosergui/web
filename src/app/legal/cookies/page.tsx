import { LegalPage } from "@/components/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Preferencias" title="Política de cookies">
      <p>
        Este sitio utiliza almacenamiento local y, si se habilitan en el futuro, cookies para prestar el servicio y conocer de forma agregada cómo se utiliza.
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
      <h2>3. Analítica y marketing</h2>
      <p>
        No se deben activar tecnologías analíticas o publicitarias no esenciales hasta obtener consentimiento. Si se incorporan, esta política y el panel de preferencias deberán actualizarse indicando proveedor, finalidad y duración.
      </p>
      <h2>4. Cómo cambiar la elección</h2>
      <p>
        Se pueden eliminar el almacenamiento y las cookies desde la configuración del navegador. Al borrar la clave de preferencia, el aviso volverá a mostrarse. También se pueden bloquear las cookies, aunque ciertas funciones técnicas podrían verse afectadas.
      </p>
      <h2>5. Contacto</h2>
      <p>Para consultas sobre privacidad y cookies, se puede escribir a conductosergui@gmail.com.</p>
    </LegalPage>
  );
}
