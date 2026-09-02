import { Link } from "react-router-dom";
import Section, { SectionHeading } from "../ui/Section";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import Icon from "../ui/Icon";
import { TextLink } from "../ui/Button";
import { services } from "../../data/services";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * LO QUE HACEMOS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Las seis tarjetas comparten tamaño y estructura interna: ícono y numeral
 * arriba, título, descripción y etiquetas. `h-full` sobre la tarjeta y
 * `mt-auto` sobre el bloque de etiquetas hacen que todas las celdas de una
 * misma fila terminen a la misma altura y con las etiquetas alineadas,
 * aunque las descripciones tengan largos distintos.
 *
 * La grilla va de una columna en mobile a dos en `sm` y tres en `lg`.
 */
export default function ServicesGrid() {
  return (
    <Section id="servicios" tone="sunken" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Lo que hacemos"
        index="01 / 06"
        title={[
          <>Todo lo que tu negocio necesita,</>,
          <>
            bajo un <span className="accent-word">mismo techo</span>
          </>,
        ]}
        description="Seis servicios que se combinan según lo que estés construyendo: desde tu primera página web hasta plataformas con inteligencia artificial."
      />

      <RevealGroup
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3"
        stagger={0.07}
      >
        {services.map((service) => (
          <RevealItem key={service.id} className="h-full">
            <Link
              to={`/servicios#${service.id}`}
              className="group surface relative flex h-full flex-col overflow-hidden p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-highlight/35 hover:bg-white/[0.05]"
            >
              {/* Resplandor que aparece al pasar el mouse */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/22 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-highlight/20 bg-accent/15 text-highlight transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-110">
                  <Icon name={service.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[11px] tracking-[0.2em] text-steel/60">
                  {service.number}
                </span>
              </div>

              <h3 className="relative mt-6 text-[1.3rem]">{service.title}</h3>

              <p className="relative mt-3.5 text-pretty text-[14.5px] leading-relaxed text-ink-muted">
                {service.summary}
              </p>

              {/* `mt-auto` empuja las etiquetas al pie: quedan alineadas entre
                  tarjetas aunque las descripciones midan distinto. */}
              <div className="relative mt-auto pt-7">
                <ul className="flex flex-wrap gap-1.5">
                  {service.items.slice(0, 4).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                  {service.items.length > 4 ? (
                    <li className="rounded-full border border-white/8 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] tracking-wide text-steel/70">
                      +{service.items.length - 4}
                    </li>
                  ) : null}
                </ul>

                <span className="mt-5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-steel/60 transition-colors duration-500 group-hover:text-highlight">
                  Ver más
                  <Icon
                    name="arrowRight"
                    className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-12 flex justify-center lg:justify-start" delay={0.1}>
        <TextLink to="/servicios">Ver los seis servicios en detalle</TextLink>
      </Reveal>
    </Section>
  );
}
