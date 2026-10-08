import { LegalPage } from "@/components/LegalPage";

export default function PrivacidadPage() {
  return (
    <LegalPage eyebrow="Protección de datos" title="Política de privacidad">
      <p>
        Esta política explica cómo se tratan los datos personales enviados a través de Conductos Ergui, dedicada a la instalación, mantenimiento y reparación de conductos de aire acondicionado y a la ejecución de obras de pladur.
      </p>
      <h2>1. Responsable</h2>
      <p>
        Los datos de identidad fiscal, domicilio y NIF/CIF del responsable deberán completarse antes de la publicación. Contacto para privacidad: conductosergui@gmail.com.
      </p>
      <h2>2. Datos tratados</h2>
      <ul>
        <li>Nombre y datos de contacto.</li>
        <li>Localidad, tipo de inmueble y servicio solicitado.</li>
        <li>Información incluida voluntariamente en mensajes, fotografías o documentación.</li>
        <li>Datos técnicos básicos necesarios para seguridad y funcionamiento.</li>
      </ul>
      <h2>3. Finalidades y base jurídica</h2>
      <p>
        Los datos se tratan para responder consultas, preparar valoraciones, gestionar una relación contractual y cumplir obligaciones legales. Las bases son el consentimiento, las medidas precontractuales solicitadas y, cuando proceda, el cumplimiento de un contrato u obligación legal.
      </p>
      <h2>4. Conservación</h2>
      <p>
        Las consultas sin contratación se conservan durante el tiempo necesario para atenderlas y, como referencia, no más de doce meses. La documentación contractual y fiscal se conserva durante los plazos legalmente exigibles.
      </p>
      <h2>5. Destinatarios</h2>
      <p>
        No se venden datos personales. Pueden acceder proveedores técnicos bajo contrato —alojamiento, correo, infraestructura o gestoría— y administraciones cuando exista obligación legal. El despliegue previsto utiliza Vercel y Cloudflare; antes de publicar deberán revisarse sus acuerdos de tratamiento y mecanismos de transferencia internacional.
      </p>
      <h2>6. Derechos</h2>
      <p>
        Se puede solicitar el acceso, la rectificación, la supresión, la oposición, la limitación o la portabilidad escribiendo al correo indicado y acreditando la identidad. También se puede presentar una reclamación ante la Agencia Española de Protección de Datos.
      </p>
      <h2>7. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas proporcionadas al riesgo. Ningún sistema es invulnerable, pero se revisan los accesos y se minimizan los datos solicitados.
      </p>
    </LegalPage>
  );
}
