import { Wind, Layers, Volume2, MapPin, PhoneCall, Mail } from "lucide-react";

export const metadata = {
  title: "Inicio",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-bold text-slate-900">Conductos Ergui</span>
          <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#especialidades" className="hover:text-slate-900">Especialidades</a>
            <a href="#cobertura" className="hover:text-slate-900">Zona de cobertura</a>
            <a href="#contacto" className="hover:text-slate-900">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Pedir presupuesto
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="mb-4 inline-block rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-600">
          Cunit · Tarragona · 50 km a la redonda
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Aire que fluye, espacios que respiran
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Instalación y mantenimiento de climatización, ventilación y sistemas de pladur para hogares y negocios en la comarca del Baix Penedès y alrededores.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contacto"
            className="rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-700"
          >
            Solicitar presupuesto gratis
          </a>
          <a
            href="#especialidades"
            className="rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500"
          >
            Ver especialidades
          </a>
        </div>
      </section>

      <section id="especialidades" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">Dos especialidades, un mismo equipo</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Cubrimos todo el proceso, desde el diseño de la instalación hasta el acabado final.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <Wind className="h-10 w-10 text-slate-700" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Climatización y conductos de aire</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>Instalación de conductos de climatización</li>
                <li>Mantenimiento y reparación de aire acondicionado</li>
                <li>Diseño e instalación de redes de ventilación</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
              <Layers className="h-10 w-10 text-slate-700" />
              <h3 className="mt-4 text-xl font-semibold text-slate-900">Pladur (yeso laminado)</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>Trasdosados y tabiquería en pladur</li>
                <li>Techos técnicos y decorativos</li>
                <li>Aislamiento acústico y térmico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 sm:grid-cols-2">
          <div>
            <Volume2 className="h-10 w-10 text-slate-700" />
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Menos ruido, más confort</h2>
            <p className="mt-4 text-slate-600">
              Nuestras soluciones de aislamiento acústico con placas de yeso laminado reducen el ruido entre estancias y con el exterior, creando ambientes más silenciosos para vivir y trabajar.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-8 ring-1 ring-slate-100">
            <p className="text-slate-600">
              Combinamos trasdosados acústicos, materiales aislantes y un montaje cuidado para minimizar la transmisión de sonido entre viviendas, oficinas y locales.
            </p>
          </div>
        </div>
      </section>

      <section id="cobertura" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center">
            <MapPin className="h-10 w-10" />
            <h2 className="mt-4 text-3xl font-bold">50 km alrededor de Cunit</h2>
            <p className="mt-3 max-w-xl text-slate-300">
              Trabajamos en toda la comarca y en las zonas limítrofes, con desplazamiento incluido.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Comarcas cubiertas</h3>
              <ul className="mt-4 space-y-2 text-slate-200">
                <li>Baix Penedès</li>
                <li>Garraf</li>
                <li>Alt Penedès</li>
                <li>Tarragonès</li>
                <li>Baix Llobregat</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Zonas destacadas</h3>
              <ul className="mt-4 space-y-2 text-slate-200">
                <li>Cunit</li>
                <li>Vilanova i la Geltrú</li>
                <li>El Vendrell</li>
                <li>Sitges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900">¿Hablamos de tu proyecto?</h2>
          <p className="mt-4 text-slate-600">
            Cuéntanos qué necesitas y te preparamos un presupuesto sin compromiso.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+34000000000"
              className="flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              <PhoneCall className="h-4 w-4" />
              Llamar ahora
            </a>
            <a
              href="mailto:info@conductosergui.es"
              className="flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3 text-sm font-semibold text-slate-700 hover:border-slate-500"
            >
              <Mail className="h-4 w-4" />
              Escribir un email
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
          <span>© {new Date().getFullYear()} Conductos Ergui — Cunit, Tarragona</span>
          <span>Climatización · Ventilación · Pladur</span>
        </div>
      </footer>
    </main>
  );
}
