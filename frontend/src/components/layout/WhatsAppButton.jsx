import { contact } from "../../data/site";
import Icon from "../ui/Icon";

/**
 * Botón flotante de WhatsApp.
 *
 * Usa el glifo oficial de la marca y su verde característico (#25D366), que
 * es como los usuarios reconocen el canal al instante. El ícono va centrado
 * con `grid place-items-center` y a un tamaño proporcional al botón.
 *
 * Respeta el área segura de los teléfonos con notch
 * (`env(safe-area-inset-bottom)`).
 */
export default function WhatsAppButton() {
  const mensaje = encodeURIComponent("Hola Coldevia, me gustaría consultar por un proyecto.");

  return (
    <a
      href={`https://wa.me/${contact.whatsapp}?text=${mensaje}`}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-5 z-40 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-110 sm:right-8"
      style={{
        // Verde oficial de WhatsApp.
        backgroundColor: "#25D366",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Anillo que pulsa para llamar la atención sin ser invasivo */}
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full animate-pulse-ring"
        style={{ backgroundColor: "rgba(37,211,102,0.55)" }}
      />
      <Icon name="whatsapp" className="h-7 w-7" />
    </a>
  );
}
