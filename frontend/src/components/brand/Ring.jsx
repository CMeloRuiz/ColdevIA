import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * MOTIVO DE MARCA — el anillo abierto
 * ═══════════════════════════════════════════════════════════════════════
 *
 * El ícono de Coldevia son tres círculos anidados con un hueco que abre
 * hacia la derecha y sugiere una "C". Ese gesto —círculos concéntricos,
 * apertura a la derecha— es lo único verdaderamente propio de la marca, así
 * que se usa como motivo recurrente en todo el sitio: de fondo, enmarcando
 * imágenes, separando secciones y dibujándose con el scroll.
 *
 * La idea es que alguien pueda ver una sección sin el logo y aun así
 * reconocer que es de Coldevia.
 *
 * Convención de geometría: viewBox 100×100, centro en (50,50), y los arcos
 * abren siempre hacia la derecha (hueco centrado en 0°), igual que el ícono.
 */

/** Arco de círculo como path SVG, con hueco angular hacia la derecha. */
function arcPath(radio, huecoGrados) {
  const inicio = (huecoGrados / 2) * (Math.PI / 180);
  const fin = (360 - huecoGrados / 2) * (Math.PI / 180);

  const x1 = 50 + radio * Math.cos(inicio);
  const y1 = 50 + radio * Math.sin(inicio);
  const x2 = 50 + radio * Math.cos(fin);
  const y2 = 50 + radio * Math.sin(fin);

  const arcoLargo = 360 - huecoGrados > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radio} ${radio} 0 ${arcoLargo} 1 ${x2} ${y2}`;
}

/**
 * Anillos anidados decorativos.
 *
 * `rings` acepta [{ r, gap, opacity, width }] para variar la composición
 * según el contexto: en el hero se usan tres muy abiertos, como separador
 * uno solo casi cerrado.
 */
export function Ring({
  className = "",
  rings = [
    { r: 46, gap: 64, opacity: 0.5, width: 0.6 },
    { r: 34, gap: 40, opacity: 0.35, width: 0.5 },
    { r: 22, gap: 96, opacity: 0.22, width: 0.5 },
  ],
  spin = false,
  color = "currentColor",
}) {
  const reduceMotion = useReducedMotion();
  const animar = spin && !reduceMotion;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    >
      {rings.map((anillo, i) => (
        <g
          key={anillo.r}
          // Cada anillo gira a su ritmo y en sentidos alternados: el conjunto
          // respira en vez de girar como un bloque rígido.
          className={
            animar ? (i % 2 === 0 ? "animate-orbit" : "animate-orbit-reverse") : undefined
          }
          style={animar ? { transformOrigin: "50% 50%", animationDuration: `${24 + i * 11}s` } : undefined}
        >
          <path
            d={arcPath(anillo.r, anillo.gap)}
            stroke={color}
            strokeWidth={anillo.width}
            strokeLinecap="round"
            opacity={anillo.opacity}
          />
        </g>
      ))}
    </svg>
  );
}

/**
 * Anillo que se dibuja a medida que entra en pantalla.
 *
 * Es la transición entre secciones que pidió la dirección de diseño: en vez
 * de un `fade + slide-up` más, el motivo de la marca se traza solo con el
 * avance del scroll.
 */
export function DrawnRing({ className = "", radius = 46, gap = 70, width = 0.6 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "center 55%"],
  });
  const trazo = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
        {/* Rastro tenue: marca el recorrido completo del anillo. */}
        <path
          d={arcPath(radius, gap)}
          stroke="currentColor"
          strokeWidth={width}
          strokeLinecap="round"
          opacity={0.12}
        />
        <motion.path
          d={arcPath(radius, gap)}
          stroke="currentColor"
          strokeWidth={width}
          strokeLinecap="round"
          opacity={0.75}
          style={{ pathLength: reduceMotion ? 1 : trazo }}
        />
      </svg>
    </div>
  );
}

/**
 * Separador de sección: un filete que se interrumpe en el centro para dejar
 * pasar un anillo que se dibuja con el scroll.
 */
export function RingDivider({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center py-2 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/12" />
      <DrawnRing className="mx-5 h-9 w-9 shrink-0 text-highlight" radius={40} gap={80} width={4} />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/12" />
    </div>
  );
}

/**
 * Campo de anillos de fondo: composición grande y muy tenue que aparece
 * detrás de secciones clave para darles textura sin robar atención.
 */
export function RingField({ className = "", spin = true }) {
  return (
    <Ring
      className={`absolute -z-10 text-highlight ${className}`}
      spin={spin}
      rings={[
        { r: 49, gap: 52, opacity: 0.16, width: 0.25 },
        { r: 41, gap: 88, opacity: 0.12, width: 0.25 },
        { r: 31, gap: 34, opacity: 0.09, width: 0.3 },
        { r: 19, gap: 120, opacity: 0.07, width: 0.4 },
      ]}
    />
  );
}

/**
 * Marco para imágenes: el arco de la marca abraza la esquina de una foto o
 * ilustración. Se usa en lugar del típico `rounded-2xl` neutro.
 */
export function RingFrame({ className = "" }) {
  return (
    <Ring
      className={`absolute -z-10 text-highlight/40 ${className}`}
      rings={[
        { r: 48, gap: 58, opacity: 0.55, width: 0.35 },
        { r: 40, gap: 100, opacity: 0.3, width: 0.35 },
      ]}
    />
  );
}

/**
 * Viñeta de anillo: el equivalente de marca a un bullet. Reemplaza al ícono
 * genérico de check en listas.
 */
export function RingBullet({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" className={className}>
      <path
        d={arcPath(38, 70)}
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="11" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
