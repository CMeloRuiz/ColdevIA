import Section, { SectionHeading } from "../ui/Section";
import { RevealGroup, RevealItem } from "../ui/Reveal";
import Icon from "../ui/Icon";
import { quickSteps } from "../../data/process";

/**
 * "De la idea a un sitio en vivo" — versión corta del proceso.
 *
 * En lugar de tres tarjetas iguales en fila, los pasos van escalonados en
 * vertical: cada uno baja un poco más que el anterior (`lg:mt-*`), de modo
 * que la vista recorre una diagonal descendente.
 *
 * Cada paso lleva un solo elemento gráfico —el ícono en un círculo de marca—
 * más el numeral grande de fondo. Nada de adornos encimados.
 */
export default function HowItWorks() {
  /* Desplazamiento creciente: crea la diagonal en desktop. */
  const escalon = ["lg:mt-0", "lg:mt-16", "lg:mt-32"];

  return (
    <Section className="scroll-mt-24">
      <SectionHeading
        eyebrow="Cómo trabajamos"
        index="02 / 06"
        title={[
          <>De la idea a un</>,
          <>
            <span className="accent-italic">sitio en vivo</span>
          </>,
        ]}
        description="Un proceso simple y previsible, para que sepas siempre en qué etapa está tu proyecto."
      />

      <RevealGroup className="mt-14 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-8" stagger={0.14}>
        {quickSteps.map((step, index) => (
          <RevealItem key={step.title} className={`relative ${escalon[index]}`}>
            <div className="group relative">
              {/* Numeral grande en serif, detrás del contenido */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-8 select-none font-display text-[6.5rem] font-semibold leading-none text-white/[0.045] transition-colors duration-700 group-hover:text-white/[0.07]"
              >
                {index + 1}
              </span>

              {/* Un solo elemento gráfico por paso: el ícono dentro de un
                  círculo con los colores de la marca. Antes había además un
                  anillo trazado encima que ensuciaba la lectura. */}
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-highlight/25 bg-accent/15 text-highlight transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:border-highlight/50 group-hover:bg-accent/25">
                <Icon name={step.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 text-[1.35rem]">{step.title}</h3>

              <p className="mt-3 max-w-xs text-pretty text-[15px] leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
