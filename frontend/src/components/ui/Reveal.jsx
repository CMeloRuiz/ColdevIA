import { Children } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * MOVIMIENTO
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Un único `fade + slide-up` aplicado a todo el sitio se nota: todas las
 * secciones entran igual y el movimiento deja de significar algo. Acá hay
 * cuatro gestos distintos, cada uno con su propósito:
 *
 *   Reveal      — prosa y bloques generales. El más discreto.
 *   LineReveal  — titulares. Cada línea sube desde detrás de una máscara,
 *                 como un tipo de imprenta que cae en su lugar.
 *   ClipReveal  — imágenes. Se descubren con un barrido (clip-path), no
 *                 apareciendo por opacidad.
 *   Parallax    — elementos de fondo que se mueven a otra velocidad.
 *
 * Reglas comunes:
 *  · Solo eje Y. Nada entra desde los costados: en mobile eso provoca
 *    scroll horizontal y saltos de layout.
 *  · `viewport.once`: el contenido no se vuelve a animar al subir.
 *  · Si el sistema pide menos movimiento, todo aparece sin animar.
 */

const EASE = [0.22, 0.61, 0.36, 1];

/** Aparición discreta: opacidad + desplazamiento vertical corto. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  duration = 0.62,
  className = "",
  as = "div",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Titulares por línea.
 *
 * Cada hijo es una línea. Se envuelve en una máscara con `overflow:hidden`
 * y sube desde abajo, escalonada. El efecto es más "tipográfico" que un
 * fade y le da peso editorial a los títulos, que es donde vive el carácter
 * de la marca.
 *
 * Uso:
 *   <LineReveal as="h1">
 *     <>Primera línea</>
 *     <>Segunda línea</>
 *   </LineReveal>
 */
export function LineReveal({
  children,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.085,
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as;
  const MotionTag = motion[as] ?? motion.h2;
  const lineas = Children.toArray(children);

  if (reduceMotion) {
    return (
      <Tag className={className} {...props}>
        {lineas.map((linea, i) => (
          <span key={i} className="block">
            {linea}
          </span>
        ))}
      </Tag>
    );
  }

  /**
   * Importante: el observador de viewport va en el titular, NO en las líneas.
   *
   * Cada línea vive dentro de un contenedor con `overflow:hidden` y arranca
   * desplazada hacia abajo, o sea completamente recortada. Un
   * IntersectionObserver tiene en cuenta el recorte de los ancestros, así que
   * una línea en su estado inicial reporta 0% de visibilidad: si el
   * observador estuviera sobre ella, nunca se dispararía y el texto no
   * aparecería jamás. Poniéndolo en el titular —que no está recortado— las
   * líneas se animan por variantes heredadas.
   */
  return (
    <MotionTag
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -60px 0px" }}
      {...props}
    >
      {lineas.map((linea, i) => (
        <span key={i} className="mask-line">
          <motion.span
            className="block"
            variants={{
              oculto: { y: "108%" },
              visible: {
                y: "0%",
                transition: { duration: 0.85, delay: delay + i * stagger, ease: EASE },
              },
            }}
          >
            {linea}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Imágenes que se descubren con un barrido.
 *
 * `direction` controla desde dónde entra la máscara: "up" (por defecto),
 * "down", "left" o "right". Variarlo entre secciones evita que todas las
 * imágenes del sitio se revelen igual.
 */
export function ClipReveal({
  children,
  className = "",
  direction = "up",
  duration = 1.05,
  delay = 0,
  ...props
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const desde = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  }[direction];

  /**
   * El observador va en un envoltorio sin recortar, no en el elemento que
   * lleva el `clip-path`.
   *
   * Chrome tiene en cuenta el recorte al calcular la intersección, así que
   * un elemento con `inset(100% ...)` reporta 0% de visibilidad: si el
   * observador estuviera sobre él, jamás se dispararía y la imagen no
   * aparecería nunca. Es el mismo motivo por el que <LineReveal> observa el
   * titular y no cada línea enmascarada.
   */
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -50px 0px" }}
      {...props}
    >
      <motion.div
        variants={{
          oculto: { clipPath: desde, opacity: 0.35 },
          visible: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration, delay, ease: EASE },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Contenedor que escalona la aparición de sus hijos (<RevealItem>). */
export function RevealGroup({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  as = "div",
  ...props
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/** Hijo de <RevealGroup>. */
export function RevealItem({ children, className = "", y = 22, as = "div", ...props }) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Parallax por scroll.
 *
 * `speed` positivo = se mueve más lento que la página (queda "atrás");
 * negativo = más rápido. Valores chicos: de 40 a 120 px sobra.
 */
export function Parallax({ children, speed = 60, className = "", ...props }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...props}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
