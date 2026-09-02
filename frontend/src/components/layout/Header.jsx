import { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { brand, navLinks } from "../../data/site";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

/**
 * Header fijo.
 *
 * Detalles que lo sacan del molde:
 *  · Los enlaces van en mono y versalitas, con un punto de anillo que marca
 *    la página activa en lugar del subrayado de siempre.
 *  · Una barra finísima al pie del header muestra el avance de lectura de
 *    la página. Es información útil, no adorno.
 *  · El menú móvil ocupa la pantalla completa y numera los enlaces en mono,
 *    como un índice.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cerrarMenu = useCallback(() => setMenuOpen(false), []);

  const { scrollYProgress } = useScroll();
  const avance = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Bloquea el scroll del documento mientras el menú está abierto. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Atrás/adelante del navegador: el menú no debe quedar abierto encima. */
  useEffect(() => {
    window.addEventListener("popstate", cerrarMenu);
    return () => window.removeEventListener("popstate", cerrarMenu);
  }, [cerrarMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && cerrarMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, cerrarMenu]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-out-soft)] ${
        scrolled || menuOpen
          ? "border-b border-white/8 bg-abyss/82 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-4 lg:h-[84px]">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Coldevia — ir al inicio">
          <img
            src={brand.logoOnDark}
            alt="Coldevia"
            className="h-9 w-auto transition-opacity duration-300 hover:opacity-85 sm:h-10 lg:h-11"
            width="220"
            height="72"
          />
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `group/nav relative flex items-center gap-2 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-highlight" : "text-ink-muted hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Punto de anillo: la marca señalando dónde estás */}
                  <span
                    aria-hidden="true"
                    className={`h-1 w-1 rounded-full transition-all duration-400 ${
                      isActive
                        ? "bg-highlight shadow-[0_0_0_3px_rgb(122_145_227/0.2)]"
                        : "bg-transparent group-hover/nav:bg-steel"
                    }`}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* La visibilidad la decide el contenedor: `hidden` sobre el propio
              Button perdería contra el `inline-flex` de su clase base. */}
          <div className="hidden lg:block">
            <Button to="/contacto" size="sm" icon="arrowRight">
              Contacto
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((abierto) => !abierto)}
            aria-expanded={menuOpen}
            aria-controls="menu-movil"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-ink transition-colors duration-300 hover:border-highlight/45 hover:bg-white/[0.08] lg:hidden"
          >
            <span className="relative block h-4 w-[18px]">
              <span
                className={`absolute left-0 block h-px w-[18px] bg-current transition-all duration-400 ease-[var(--ease-out-soft)] ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-px w-[18px] -translate-y-1/2 bg-current transition-all duration-300 ${
                  menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-[18px] bg-current transition-all duration-400 ease-[var(--ease-out-soft)] ${
                  menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Progreso de lectura */}
      <motion.div
        aria-hidden="true"
        className="h-px origin-left bg-gradient-to-r from-accent via-highlight to-accent-300"
        style={{ scaleX: avance }}
      />

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="menu-movil"
            key="menu-movil"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-white/8 bg-abyss/96 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              className="container-site flex flex-col py-4"
              aria-label="Navegación móvil"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={cerrarMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-5 border-b border-white/6 py-5 transition-colors duration-300 ${
                        isActive ? "text-highlight" : "text-ink/85 hover:text-ink"
                      }`
                    }
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-steel/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {link.label}
                    </span>
                    <Icon name="arrowRight" className="ml-auto h-4 w-4 opacity-40" />
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                className="pb-2 pt-6"
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                <Button
                  to="/contacto"
                  size="lg"
                  className="w-full"
                  icon="arrowRight"
                  onClick={cerrarMenu}
                >
                  Contacto
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
