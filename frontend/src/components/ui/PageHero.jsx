import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RingField } from "../brand/Ring";

const EASE = [0.22, 0.61, 0.36, 1];

/**
 * Encabezado de las páginas internas.
 *
 * Mantiene el lenguaje del hero del home —titular en serif que sube desde
 * una máscara, miga de pan en mono, anillos de fondo— pero más compacto y
 * asimétrico: el título ocupa las primeras siete columnas y la bajada baja
 * a la derecha, en lugar de apilarse centrada.
 */
export default function PageHero({ breadcrumb, title, description, children }) {
  const lineas = Array.isArray(title) ? title : [title];

  return (
    <section className="relative overflow-hidden pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
      <RingField className="-right-[30%] -top-[70%] h-[80rem] w-[80rem] max-w-none opacity-60" />

      <div className="container-site">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Ruta de navegación"
          className="flex items-center gap-2.5"
        >
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.24em] text-steel transition-colors hover:text-highlight"
          >
            Inicio
          </Link>
          <span className="h-px w-4 bg-white/15" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-highlight">
            {breadcrumb}
          </span>
        </motion.nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 className="lg:col-span-7">
            {lineas.map((linea, i) => (
              <span key={i} className="mask-line">
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

          {description ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
              className="text-pretty text-[15px] leading-relaxed text-ink-muted sm:text-base lg:col-span-5 lg:mb-2"
            >
              {description}
            </motion.p>
          ) : null}
        </div>

        {children ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
            className="mt-10"
          >
            {children}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
