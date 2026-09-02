import { useState } from "react";
import Section, { SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { RingBullet } from "../brand/Ring";
import { plans, pricingConfig, pricingIncludes } from "../../data/pricing";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * PLANES
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Las tres tarjetas son idénticas en dimensiones y estructura: mismo ancho
 * (una columna cada una), mismo padding, mismos bloques en el mismo orden
 * (encabezado → precio → prestaciones → incluido en todos → botón).
 *
 * El plan recomendado se distingue **solo por color**: borde de acento,
 * fondo con un degradado tenue, insignia y botón sólido. No cambia de
 * tamaño ni desplaza sus bloques.
 *
 * Para que el botón quede a la misma altura en las tres, la lista de
 * prestaciones lleva `flex-1` y el pie `mt-auto`: la fila de la grilla
 * estira todas las tarjetas a la altura de la más alta y los botones
 * terminan alineados.
 *
 * Lo que antes era un bloque suelto debajo de las tarjetas —las cuatro
 * prestaciones comunes— ahora vive dentro de cada una, bajo su propio
 * subtítulo, porque aplica por igual a los tres planes.
 */
export default function Pricing() {
  const [anual, setAnual] = useState(false);

  return (
    <Section id="planes" tone="raised" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Planes"
        index="05 / 06"
        title={[<>Tu web o tu tienda,</>, <>con <span className="accent-italic">precio claro</span></>]}
        description={`Tres puntos de partida según el tamaño de tu proyecto. Si ninguno encaja, armamos uno a medida. ${pricingConfig.currencyNote}`}
      />

      {pricingConfig.showBillingToggle ? (
        <Reveal className="mt-10 flex justify-center lg:justify-start" delay={0.1}>
          <div
            className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1"
            role="group"
            aria-label="Periodicidad de facturación"
          >
            {[
              { label: "Pago único", value: false },
              { label: "Mensual", value: true },
            ].map((opcion) => (
              <button
                key={opcion.label}
                type="button"
                onClick={() => setAnual(opcion.value)}
                aria-pressed={anual === opcion.value}
                className={`min-h-[40px] rounded-full px-5 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-400 ${
                  anual === opcion.value
                    ? "bg-gradient-to-b from-accent-400 to-accent text-ink"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {opcion.label}
              </button>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* `items-stretch` (por defecto en grid) + `h-full` en la tarjeta hacen
          que las tres midan lo mismo sin fijar alturas a mano. */}
      <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.09} className="h-full">
            <PlanCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Tarjeta de plan. Una sola implementación para los tres: `plan.highlighted`
 * solo altera color, borde e insignia.
 */
function PlanCard({ plan }) {
  const destacado = plan.highlighted;

  return (
    <article
      className={`group flex h-full flex-col rounded-[22px] border p-7 transition-all duration-500 ease-[var(--ease-out-soft)] sm:p-8 ${
        destacado
          ? "border-highlight/45 bg-gradient-to-b from-accent/16 via-white/[0.03] to-transparent shadow-[var(--shadow-panel)]"
          : "border-white/8 bg-white/[0.028] hover:-translate-y-1 hover:border-highlight/30"
      }`}
    >
      {/* ── Encabezado ──────────────────────────────────────────────────
          La franja de la insignia ocupa alto fijo también cuando el plan no
          está destacado, para que los títulos arranquen a la misma altura. */}
      <div className="flex h-6 items-center">
        {destacado ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-400 to-accent px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
            <Icon name="sparkles" className="h-3 w-3" />
            {plan.badge}
          </span>
        ) : null}
      </div>

      <header className="mt-5">
        <h3 className="text-[1.45rem]">{plan.name}</h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel/75">
          {plan.tagline}
        </p>
        <p className="mt-4 text-pretty text-sm leading-relaxed text-ink-muted">
          {plan.description}
        </p>
      </header>

      {/* ── Precio ──────────────────────────────────────────────────────── */}
      <div className="mt-7 border-y border-white/10 py-6">
        <p className="font-display text-[clamp(1.6rem,1.2rem+1vw,2rem)] font-semibold leading-tight text-ink">
          {plan.price}
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-steel/80">
          {plan.priceNote}
        </p>
      </div>

      {/* ── Prestaciones del plan ───────────────────────────────────────── */}
      <ul className="mt-6 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <RingBullet
              className={`mt-[3px] h-3.5 w-3.5 shrink-0 ${
                destacado ? "text-highlight" : "text-highlight/70"
              }`}
            />
            <span className="text-pretty text-[13.5px] leading-relaxed text-ink-dim">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* ── Incluido en todos los planes ────────────────────────────────── */}
      <div className="mt-7 border-t border-white/8 pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel/60">
          Incluido en todos los planes
        </p>
        <ul className="mt-4 flex flex-col gap-2.5">
          {pricingIncludes.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Icon name="check" className="mt-[3px] h-3.5 w-3.5 shrink-0 text-steel-400" />
              <span className="text-pretty text-[13px] leading-relaxed text-ink-muted">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Botón: `mt-auto` lo fija al pie en las tres tarjetas ────────── */}
      <div className="mt-auto pt-8">
        <Button
          to="/contacto"
          variant={destacado ? "primary" : "secondary"}
          className="w-full"
          icon="arrowRight"
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </article>
  );
}
