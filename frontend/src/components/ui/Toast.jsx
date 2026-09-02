import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

/**
 * Aviso flotante para confirmar o reportar el envío del formulario.
 * Se cierra solo a los 6 segundos, o con el botón de cerrar.
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  const isError = toast?.type === "error";

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md sm:inset-x-auto sm:right-8 sm:bottom-28 sm:mx-0 sm:w-96"
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl ${
              isError
                ? "border-red-400/30 bg-red-950/70"
                : "border-highlight/30 bg-navy-900/90"
            }`}
          >
            <span
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isError ? "bg-red-500/20 text-red-300" : "bg-accent/25 text-highlight"
              }`}
            >
              <Icon name={isError ? "alert" : "check"} className="h-4 w-4" strokeWidth="2.2" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{toast.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink/65">{toast.message}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar aviso"
              className="-m-1 shrink-0 rounded-full p-1 text-ink/45 transition-colors hover:text-ink"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
