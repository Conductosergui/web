import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas sobre conductos de aire acondicionado y pladur en El Vendrell y el Baix Penedès.",
};

const faqs: [string, string][] = [
  [
    "¿En qué localidades se presta el servicio?",
    "La base se encuentra en El Vendrell y se atienden proyectos en la comarca del Baix Penedès: Calafell, Cunit, Santa Oliva, Bellvei, Albinyana, L'Arboç, Banyeres del Penedès, La Bisbal del Penedès, Llorenç del Penedès, Bonastre, Sant Jaume dels Domenys, Masllorenç y El Montmell. La cobertura se confirma al recibir cada solicitud.",
  ],
  [
    "¿La valoración tiene coste?",
    "La primera revisión de la solicitud y la orientación inicial se ofrecen sin compromiso. Si el proyecto requiere una visita técnica específica o pruebas, se informa previamente de cualquier coste.",
  ],
  [
    "¿Se atiende a particulares y a empresas?",
    "Sí. Se atienden viviendas, locales comerciales, oficinas y comunidades. La planificación se adapta para reducir molestias y coordinar horarios cuando el espacio se encuentra en uso.",
  ],
  [
    "¿Qué trabajos se realizan en conductos de aire acondicionado?",
    "Instalación y adaptación de redes, reparación de tramos, mantenimiento, revisión de rejillas y mejoras de distribución para un aire acondicionado más eficiente. El alcance definitivo depende del sistema existente y del acceso disponible.",
  ],
  [
    "¿Qué soluciones de pladur se ofrecen?",
    "Tabiques, trasdosados, falsos techos, cajones técnicos, aislamiento y soluciones a medida. Se valoran la humedad, el soporte, el uso del espacio y las necesidades acústicas antes de recomendar el sistema.",
  ],
  [
    "¿Cuánto tarda una intervención?",
    "Depende del acceso, las dimensiones y los acabados. Una intervención reducida puede resolverse en una jornada; los proyectos con varias fases requieren planificación. El plazo estimado queda reflejado en la propuesta.",
  ],
  [
    "¿Se retiran los residuos al terminar?",
    "Se retiran los residuos generados directamente por el trabajo y se deja la zona recogida, salvo que la propuesta indique condiciones diferentes por volumen o por gestión especial.",
  ],
  [
    "¿Se pueden enviar fotografías o planos?",
    "Sí. Tras recibir el formulario se indica el modo de envío. Las fotografías generales y de detalle, las medidas aproximadas y los planos ayudan a preparar una valoración más precisa.",
  ],
  [
    "¿Qué diferencia existe entre mantenimiento y reparación de conductos?",
    "El mantenimiento es preventivo y periódico: limpieza y revisión para evitar fallos. La reparación es correctiva: se actúa cuando algún elemento deja de funcionar correctamente.",
  ],
  [
    "¿Con qué frecuencia conviene revisar los conductos de aire?",
    "Depende del uso y del tipo de instalación. Como referencia, una revisión anual suele ser suficiente en viviendas; en locales con alto tránsito, cada seis meses.",
  ],
  [
    "¿El pladur utilizado es resistente a la humedad?",
    "Sí. Se trabaja con placas de yeso laminado y masas de fibra de yeso especializadas para zonas húmedas, siempre que el soporte lo permita.",
  ],
  [
    "¿Se puede coordinar con la comunidad de vecinos?",
    "Sí. Se trabaja con administraciones y comunidades; se presenta la documentación requerida y se coordinan los horarios con antelación.",
  ],
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-sky py-20 md:py-28">
        <div className="shell">
          <p className="eyebrow text-blue">Antes de comenzar</p>
          <h1 className="heading mt-6">
            Preguntas claras.
            <br />
            Respuestas también.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-lead">
            Lo esencial sobre cobertura, plazos, presupuestos y el método de trabajo.
          </p>
        </div>
      </section>
      <section className="shell py-20">
        <div className="mx-auto max-w-4xl">
          {faqs.map(([q, a], i) => (
            <details key={q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-lg font-bold tracking-[-0.02em] md:text-xl">
                <span>
                  <small className="mr-5 text-xs text-blue">{String(i + 1).padStart(2, "0")}</small>
                  {q}
                </span>
                <Plus className="shrink-0 transition group-open:rotate-45" />
              </summary>
              <p className="max-w-3xl pb-8 pl-0 leading-7 text-lead md:pl-11">{a}</p>
            </details>
          ))}
        </div>
        <div className="mx-auto mt-16 flex max-w-4xl flex-col justify-between gap-6 rounded-2xl bg-ink p-7 text-white md:flex-row md:items-center">
          <div>
            <p className="font-bold">¿No figura la respuesta?</p>
            <p className="mt-1 text-sm text-white/55">Puede enviarse una consulta y se ofrecerá orientación.</p>
          </div>
          <Link href="/presupuestador" className="flex items-center gap-5 rounded-full bg-accent px-5 py-3 text-sm font-bold text-ink">
            Enviar consulta <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
