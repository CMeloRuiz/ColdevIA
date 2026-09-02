import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { Ring, RingField } from "../brand/Ring";

/** Palabra que rota en el titular (venía del sitio original). */
const PALABRAS = ["modernas", "eficientes", "escalables", "innovadoras", "memorables"];

const EASE = [0.22, 0.61, 0.36, 1];

/**
 * ═══════════════════════════════════════════════════════════════════════
 * HERO
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Estructura: texto a la izquierda (7 de 12 columnas), ilustración a la
 * derecha (5), desbordando levemente el contenedor para romper la simetría.
 *
 * · Titular en serif de alto contraste y caja mixta. La palabra que rota
 *   entra en cursiva: es el único momento del sitio con ese recurso.
 * · La ilustración es un recorte con fondo transparente, así que se apoya
 *   directamente sobre el fondo de la página: no hay caja ni borde que
 *   delate un rectángulo.
 * · Los anillos del logo la enmarcan y se mueven con parallax a distinta
 *   velocidad que la imagen.
 */
export default function Hero() {
  const [indice, setIndice] = useState(0);
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yEsfera = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const yAnillos = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const opacidadTexto = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setIndice((i) => (i + 1) % PALABRAS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pb-6 pt-10 sm:pt-14 lg:pb-10 lg:pt-16">
      <RingField className="-right-[28%] -top-[35%] h-[110vw] w-[110vw] max-w-none opacity-70 lg:-right-[12%] lg:-top-[60%] lg:h-[85rem] lg:w-[85rem]" />

      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-6">
          {/* ─────────────────────────── Texto (7/12) */}
          <motion.div
            className="relative z-10 lg:col-span-7 lg:pr-8"
            style={reduceMotion ? undefined : { opacity: opacidadTexto }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex items-center gap-3"
            >
              <span className="h-px w-9 bg-gradient-to-r from-transparent to-highlight/60" />
              <span className="label-mono text-highlight/85">
                Desarrollo de software · Inteligencia artificial
              </span>
            </motion.div>

            <h1 className="mt-7">
              {["Desarrollamos", "páginas web"].map((linea, i) => (
                <span key={linea} className="mask-line">
                  <motion.span
                    className="block"
                    initial={{ y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {linea}
                  </motion.span>
                </span>
              ))}

              {/* Alto reservado para que el titular no salte al cambiar la
                  palabra. Sin `mode="wait"`: si la que sale tuviera que
                  terminar antes de que entre la siguiente, el titular quedaría
                  incompleto medio segundo en cada cambio. */}
              <span className="relative mt-1 block h-[1.16em] overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={PALABRAS[indice]}
                    initial={reduceMotion ? false : { y: "112%" }}
                    animate={{ y: "0%" }}
                    exit={reduceMotion ? { opacity: 0 } : { y: "-112%" }}
                    transition={{ duration: 0.62, ease: EASE }}
                    className="accent-italic absolute inset-x-0 top-0 block"
                  >
                    {PALABRAS[indice]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-8 max-w-lg text-pretty text-base leading-relaxed text-ink-dim sm:text-[17px]"
            >
              Cada detalle importa cuando el objetivo es destacar, conectar con tus clientes y
              fortalecer tu presencia digital.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button to="/contacto" size="lg" icon="arrowRight">
                Creamos tu web
              </Button>
              <Button to="/proyectos" variant="secondary" size="lg" icon="arrowUpRight">
                Ver portafolio
              </Button>
            </motion.div>
          </motion.div>

          {/* ─────────────────────────── Ilustración (5/12) */}
          <div className="relative lg:col-span-5">
            {/* Escala contenida: con un desborde mayor, el anillo derecho de
                la esfera quedaba cortado por el borde del viewport. */}
            <div className="relative mx-auto aspect-square w-full max-w-[25rem] lg:max-w-none lg:translate-x-2 lg:scale-[1.04]">
              {/* Anillos de marca, a otra velocidad de parallax */}
              <motion.div
                className="absolute inset-0"
                style={reduceMotion ? undefined : { y: yAnillos }}
              >
                <Ring
                  className="absolute inset-[-12%] h-[124%] w-[124%] text-highlight/40"
                  spin
                  rings={[
                    { r: 48, gap: 56, opacity: 0.5, width: 0.26 },
                    { r: 39, gap: 104, opacity: 0.3, width: 0.26 },
                  ]}
                />
              </motion.div>

              <motion.div
                className="relative flex h-full w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
                style={reduceMotion ? undefined : { y: yEsfera }}
              >
                {/* Halo que apoya la esfera sobre el fondo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-[14%] rounded-full bg-accent/25 blur-[80px]"
                />

                {/* La imagen ya viene recortada con transparencia: no necesita
                    máscara ni contenedor con borde. */}
                <motion.img
                  src="/assets/generated/hero-orbit.webp"
                  alt="Esfera de Coldevia rodeada por dos anillos luminosos"
                  width="1100"
                  height="842"
                  fetchPriority="high"
                  className="relative w-[92%] object-contain drop-shadow-[0_30px_60px_rgba(3,8,18,0.8)]"
                  animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
