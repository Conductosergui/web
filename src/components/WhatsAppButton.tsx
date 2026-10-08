import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waText = encodeURIComponent("Solicitud de atención urgente en El Vendrell.");
  const href = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}?text=${waText}`
    : "mailto:conductosergui@gmail.com?subject=Solicitud%20urgente";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacto de urgencias por WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-ink p-2.5 pr-4 text-white shadow-[0_12px_40px_rgba(7,24,45,.3)] transition hover:-translate-y-1 hover:bg-navy"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-ink">
        <MessageCircle size={20} />
      </span>
      <span className="hidden text-left text-[11px] font-bold leading-tight sm:block">
        <small className="block font-medium text-white/50">Urgencias · WhatsApp</small>
        Atención inmediata
      </span>
    </a>
  );
}
