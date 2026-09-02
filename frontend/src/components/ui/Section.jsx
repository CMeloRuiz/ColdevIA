import { LineReveal, Reveal } from "./Reveal";
import { RingBullet } from "../brand/Ring";

/**
 * Envoltura de sección.
 *
 * `tone` cambia el fondo para que dos secciones seguidas no se sientan
 * calcadas. Alternarlos a lo largo de la página crea ritmo vertical sin
 * necesidad de agregar adornos:
 *
 *   base    — transparente, deja ver los halos del fondo global
 *   sunken  — un escalón más oscuro, para secciones densas
 *   raised  — panel con borde, para el momento más importante de la página
 */
const tonos = {
  base: "",
  sunken: "bg-abyss/60",
  raised: "bg-gradient-to-b from-navy-950/50 via-navy-900/30 to-transparent",
};

export default function Section({
  id,
  tone = "base",
  className = "",
  containerClassName = "",
  children,
}) {
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-32 ${tonos[tone] ?? ""} ${className}`}
    >
      <div className={`container-site ${containerClassName}`}>{children}</div>
    </section>
  );
}

/**
 * Etiqueta de sección.
 *
 * Mono, versalitas y muy espaciada, con el anillo de la marca como viñeta.
 * Es deliberadamente distinta de la píldora con borde y fondo que usa
 * cualquier landing: acá el dato técnico se lee como dato técnico.
 */
export function Eyebrow({ children, index, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <RingBullet className="h-3 w-3 shrink-0 text-highlight" />
      <span className="label-mono">{children}</span>
      {index ? (
        <>
          <span className="h-px w-6 bg-white/15" />
          <span className="font-mono text-[10px] font-medium tracking-[0.2em] text-steel/70">
            {index}
          </span>
        </>
      ) : null}
    </span>
  );
}

/**
 * Encabezado de sección.
 *
 * Alineado a la izquierda por defecto: centrar todos los títulos es una de
 * las marcas del diseño de plantilla. `align="center"` queda disponible para
 * los pocos momentos que lo justifican.
 *
 * `title` se pasa como array de líneas para que el revelado tipográfico
 * funcione línea por línea.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className = "",
  action,
}) {
  const centrado = align === "center";
  const lineas = Array.isArray(title) ? title : [title];

  return (
    <div
      className={`flex flex-col gap-6 ${
        centrado ? "items-center text-center" : "items-start"
      } ${className}`}
    >
      {eyebrow ? (
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}

      {/* En layouts anchos el título ocupa dos tercios y la bajada queda a un
          costado: una asimetría simple que rinde más que apilar todo. */}
      <div
        className={`flex w-full flex-col gap-6 ${
          centrado ? "items-center" : "lg:flex-row lg:items-end lg:justify-between lg:gap-14"
        }`}
      >
        <LineReveal
          as="h2"
          className={centrado ? "max-w-3xl" : "max-w-[19ch] lg:max-w-[16ch] lg:flex-1"}
        >
          {lineas}
        </LineReveal>

        {description ? (
          <Reveal
            delay={0.12}
            className={
              centrado
                ? "max-w-2xl text-center"
                : "max-w-md text-pretty lg:mb-2 lg:max-w-sm lg:shrink-0"
            }
          >
            <p className="text-[15px] leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>
            {action ? <div className="mt-6">{action}</div> : null}
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
