import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Section, { SectionHeading } from "../ui/Section";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import Icon from "../ui/Icon";
import { processSteps } from "../../data/process";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * TU PROYECTO, PASO A PASO
 * ═══════════════════════════════════════════════════════════════════════
 *
 * La versión anterior era una grilla de 3×2 con seis celdas idénticas: no
 * comunicaba avance, que es justamente de lo que trata un proceso.
 *
 * Acá los pasos bajan en escalera —cada uno entra un poco más a la derecha
 * que el anterior— junto a una línea vertical que se llena a medida que se
 * hace scroll. La lectura sigue el mismo movimiento que el proyecto:
 * avanza y progresa.
 */
export default function Process() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  /* El muelle evita que la línea siga el scroll de forma mecánica. */
  const avance = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <Section id="proceso" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Proceso"
        index="06 / 06"
        title={[<>Tu proyecto,</>, <><span className="accent-word">paso a paso</span></>]}
        description="Sin sorpresas ni cajas negras: sabes qué pasa en cada etapa y cuándo te toca participar."
      />

      <div ref={ref} className="relative mt-14 lg:mt-20">
        {/* Riel: rastro tenue + progreso que se llena con el scroll */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[26px] top-0 w-px bg-white/8 sm:left-[34px]"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[26px] top-0 w-px origin-top bg-gradient-to-b from-highlight via-accent to-transparent sm:left-[34px]"
          style={{
            height: "100%",
            scaleY: reduceMotion ? 1 : avance,
          }}
        />

        <RevealGroup className="flex flex-col" stagger={0.1}>
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.number}
              className="group relative flex gap-6 py-7 sm:gap-9 sm:py-9"
            >
              {/* Nodo sobre el riel */}
              <div className="relative z-10 shrink-0">
                <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-abyss font-mono text-[13px] font-medium text-highlight transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:border-highlight/50 group-hover:bg-navy-900 sm:h-[68px] sm:w-[68px] sm:text-sm">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border border-highlight/0 transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:inset-[-7px] group-hover:border-highlight/25"
                />
              </div>

              {/* Escalera: el texto entra progresivamente más a la derecha en
                  cada paso. El nodo no se mueve, para que siga alineado con el
                  riel vertical. */}
              <div
                className="min-w-0 pt-1.5 transition-[padding] duration-500 sm:pt-3"
                style={{ paddingLeft: `calc(${index} * 1.15rem)` }}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={step.icon}
                    className="h-4 w-4 shrink-0 text-highlight/70 transition-colors duration-500 group-hover:text-highlight"
                  />
                  <h3 className="text-[1.15rem] sm:text-[1.4rem]">{step.title}</h3>
                </div>
                <p className="mt-2.5 max-w-md text-pretty text-[15px] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
