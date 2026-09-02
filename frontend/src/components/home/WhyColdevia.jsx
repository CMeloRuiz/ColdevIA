import Section, { Eyebrow } from "../ui/Section";
import { LineReveal, Parallax, Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import Icon from "../ui/Icon";
import MediaFrame from "../ui/MediaFrame";
import { valueProps } from "../../data/process";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * ¿POR QUÉ ELEGIR COLDEVIA?
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Dos rupturas deliberadas de la retícula:
 *
 * 1. La imagen se sale del contenedor por la derecha (`lg:-mr-14 xl:-mr-24`)
 *    y se monta sobre la columna de texto. El encuadre deja de ser una caja
 *    perfecta y la sección gana tensión.
 * 2. Las seis propuestas de valor dejan de ser tarjetas. Van como una lista
 *    de definiciones separada por filetes: dos columnas, numeradas en mono.
 *    Sacar las cajas es lo que más hace por que la página no se sienta
 *    plantilla.
 */
export default function WhyColdevia() {
  return (
    <Section id="por-que-coldevia" className="scroll-mt-24 overflow-hidden">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* ── Texto (5/12) ─────────────────────────────────────────────── */}
        <div className="relative z-10 flex flex-col gap-7 lg:col-span-5">
          <Reveal>
            <Eyebrow index="04 / 06">Por qué nosotros</Eyebrow>
          </Reveal>

          <LineReveal as="h2">
            {[<>¿Por qué elegir</>, <><span className="accent-word">Coldevia</span>?</>]}
          </LineReveal>

          <Reveal delay={0.12}>
            <p className="max-w-md text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-base">
              Elegir el aliado tecnológico adecuado puede marcar la diferencia entre adaptarse al
              mercado o liderarlo. Nuestro compromiso es comprender la visión de tu negocio y
              transformarla en soluciones innovadoras, escalables y orientadas a generar resultados
              reales.
            </p>
          </Reveal>

          {/* Dato de confianza, sin caja: solo un filete y jerarquía. */}
          <Reveal delay={0.2}>
            <div className="flex max-w-sm items-start gap-4 border-l-2 border-highlight/40 py-1 pl-5">
              <div>
                <p className="font-display text-lg font-semibold text-ink">
                  Tu proyecto queda a tu nombre
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  Código propio, sin dependencias ocultas ni licencias atadas a nosotros.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Imagen (7/12), desbordando el contenedor ─────────────────── */}
        <div className="lg:col-span-7 lg:-mr-14 xl:-mr-24">
          <Parallax speed={38}>
            <MediaFrame
              src="/assets/generated/why-coldevia.webp"
              alt="Ciudad de datos futurista: la infraestructura que construye Coldevia"
              width="1200"
              height="900"
              rounded="rounded-[26px]"
              revealDirection="left"
              ring
            />
          </Parallax>
        </div>
      </div>

      {/* ── Propuestas de valor, como lista y no como tarjetas ─────────── */}
      <RevealGroup
        className="mt-20 grid border-t border-white/8 sm:grid-cols-2 lg:mt-24"
        stagger={0.06}
      >
        {valueProps.map((prop, i) => (
          <RevealItem
            key={prop.title}
            className={`group flex gap-5 border-b border-white/8 py-7 transition-colors duration-500 hover:bg-white/[0.02] sm:py-8 ${
              // Filete vertical solo entre columnas, no en el borde exterior.
              i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"
            }`}
          >
            <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-steel/60">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-highlight/85 transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:bg-accent/22 group-hover:text-highlight">
              <Icon name={prop.icon} className="h-4 w-4" />
            </span>

            <div className="min-w-0">
              <h3 className="text-[1.05rem] leading-snug">{prop.title}</h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ink-muted">
                {prop.description}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
