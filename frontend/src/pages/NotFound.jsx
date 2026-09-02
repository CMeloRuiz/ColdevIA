import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import { Ring } from "../components/brand/Ring";
import { navLinks } from "../data/site";

const EASE = [0.22, 0.61, 0.36, 1];

/**
 * Página 404 con identidad propia.
 *
 * El motivo de la marca sirve al mensaje: el anillo de Coldevia está abierto
 * por diseño, y acá esa apertura se lee como el hueco de la página que
 * falta. Debajo, un índice de las secciones reales para que el visitante no
 * quede en un callejón sin salida.
 */
export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada | Coldevia";
  }, []);

  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden py-20">
      <Ring
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 text-highlight/25"
        spin
        rings={[
          { r: 48, gap: 58, opacity: 0.4, width: 0.18 },
          { r: 38, gap: 100, opacity: 0.3, width: 0.18 },
          { r: 27, gap: 34, opacity: 0.2, width: 0.22 },
        ]}
      />

      <div className="container-site relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="label-mono text-highlight/85"
            >
              Error 404
            </motion.span>

            <h1 className="mt-6">
              {["Esta página", "no existe"].map((linea, i) => (
                <span key={linea} className="mask-line">
                  <motion.span
                    className="block"
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.08 + i * 0.09, ease: EASE }}
                  >
                    {linea}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
              className="mt-7 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base"
            >
              Puede que el enlace esté desactualizado o que la dirección tenga un error. Te dejamos
              el camino de vuelta.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button to="/" size="lg" icon="arrowRight">
                Volver al inicio
              </Button>
              <Button to="/contacto" variant="secondary" size="lg">
                Contactarnos
              </Button>
            </motion.div>
          </div>

          {/* Índice de secciones reales */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            aria-label="Secciones del sitio"
            className="lg:col-span-5"
          >
            <span className="label-mono">O ir directo a</span>
            <ul className="mt-5 flex flex-col border-t border-white/10">
              {[...navLinks, { label: "Contacto", to: "/contacto" }].map((link, index) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-5 border-b border-white/10 py-4 transition-colors duration-400 hover:bg-white/[0.03]"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-steel/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg font-semibold tracking-tight text-ink-dim transition-colors duration-400 group-hover:text-highlight">
                      {link.label}
                    </span>
                    <span className="ml-auto h-px w-6 bg-white/20 transition-all duration-400 group-hover:w-10 group-hover:bg-highlight" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </div>
    </section>
  );
}
