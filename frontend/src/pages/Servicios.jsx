import { useEffect } from "react";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import { LineReveal, Parallax, Reveal, RevealGroup, RevealItem } from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Button, { TextLink } from "../components/ui/Button";
import MediaFrame from "../components/ui/MediaFrame";
import { Ring, RingBullet, RingDivider } from "../components/brand/Ring";
import Technologies from "../components/home/Technologies";
import { services } from "../data/services";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * SERVICIOS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Seis bloques idénticos uno debajo del otro cansan la vista. Acá el
 * reparto de columnas alterna entre bloques (5/7 y 7/5) y el numeral
 * gigante en serif cambia de lado, de modo que la página tiene ritmo
 * lateral aunque el contenido de cada servicio sea estructuralmente igual.
 *
 * Se conserva la navegación rápida por píldoras del sitio original, que
 * ancla a cada bloque.
 */
export default function Servicios() {
  useEffect(() => {
    document.title = "Servicios | Coldevia";
  }, []);

  return (
    <>
      <PageHero
        breadcrumb="Servicios"
        title={[<>Soluciones que</>, <>impulsan <span className="accent-italic">tu negocio</span></>]}
        description="Desde tu primera página web hasta sistemas de automatización e inteligencia artificial. Elige el servicio que necesitas y hablemos de tu proyecto."
      >
        <nav aria-label="Ir a un servicio" className="flex flex-wrap gap-2">
          {services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="group inline-flex min-h-[38px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-all duration-400 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-highlight/45 hover:text-ink"
            >
              <Icon
                name={service.icon}
                className="h-3.5 w-3.5 text-highlight/70 transition-colors group-hover:text-highlight"
              />
              {service.shortTitle}
            </a>
          ))}
        </nav>
      </PageHero>

      <Section className="pt-0" containerClassName="flex flex-col gap-20 lg:gap-28">
        {services.map((service, index) => {
          const invertido = index % 2 === 1;

          return (
            <article key={service.id} id={service.id} className="scroll-mt-28">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                {/* Columna del numeral e ícono */}
                <div
                  className={`relative lg:col-span-4 ${
                    invertido ? "lg:order-2 lg:col-start-9" : ""
                  }`}
                >
                  <Reveal>
                    <div className="relative">
                      <Ring
                        className="absolute -left-8 -top-10 h-40 w-40 text-highlight/25 lg:-left-12 lg:h-52 lg:w-52"
                        rings={[
                          { r: 47, gap: 60, opacity: 0.5, width: 0.5 },
                          { r: 35, gap: 110, opacity: 0.3, width: 0.5 },
                        ]}
                      />

                      <span className="relative block font-display text-[clamp(3.5rem,2.5rem+4vw,6rem)] font-semibold leading-none tracking-tighter text-white/[0.09]">
                        {service.number}
                      </span>

                      <span className="relative mt-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-highlight/20 bg-accent/15 text-highlight">
                        <Icon name={service.icon} className="h-6 w-6" />
                      </span>
                    </div>
                  </Reveal>
                </div>

                {/* Columna de contenido */}
                <div
                  className={`flex flex-col gap-6 lg:col-span-8 ${
                    invertido ? "lg:order-1 lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <LineReveal as="h2" className="text-[clamp(1.8rem,1.3rem+1.8vw,2.75rem)]">
                    {[service.title]}
                  </LineReveal>

                  <Reveal delay={0.08}>
                    <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-[17px]">
                      {service.summary}
                    </p>
                  </Reveal>

                  <Reveal delay={0.14}>
                    <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-muted">
                      {service.detail}
                    </p>
                  </Reveal>

                  <RevealGroup className="grid max-w-2xl gap-x-8 gap-y-3 sm:grid-cols-2" stagger={0.05}>
                    {service.items.map((item) => (
                      <RevealItem key={item} className="flex items-center gap-3">
                        <RingBullet className="h-3.5 w-3.5 shrink-0 text-highlight/80" />
                        <span className="text-sm text-ink-dim">{item}</span>
                      </RevealItem>
                    ))}
                  </RevealGroup>

                  <Reveal delay={0.1}>
                    <TextLink to="/contacto">Solicitar cotización</TextLink>
                  </Reveal>
                </div>
              </div>

              {index < services.length - 1 ? <RingDivider className="mt-16 lg:mt-24" /> : null}
            </article>
          );
        })}
      </Section>

      {/* Cómo se combinan los servicios */}
      <Section tone="sunken">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <LineReveal as="h2">
              {[<>Casi nunca es</>, <>un <span className="accent-word">solo servicio</span></>]}
            </LineReveal>

            <Reveal delay={0.1}>
              <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-base">
                Una tienda online necesita web, infraestructura y automatización de pedidos. Un
                sistema de gestión necesita SaaS, base de datos y quizás un agente que responda a
                los clientes. Nosotros armamos la combinación y tú tratas con un solo equipo.
              </p>
            </Reveal>

            <RevealGroup className="flex flex-col divide-y divide-white/8 border-y border-white/8" stagger={0.08}>
              {[
                "Un único interlocutor de principio a fin",
                "Presupuesto integrado, sin proveedores cruzados",
                "Decisiones técnicas coherentes entre las partes",
              ].map((item) => (
                <RevealItem key={item} className="flex items-center gap-3.5 py-4">
                  <RingBullet className="h-3.5 w-3.5 shrink-0 text-highlight" />
                  <span className="text-sm text-ink-dim">{item}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.1}>
              <Button to="/contacto" icon="arrowRight">
                Cuéntanos qué necesitas
              </Button>
            </Reveal>
          </div>

          {/* La imagen se sale del contenedor por la derecha */}
          <div className="lg:col-span-6 lg:-mr-14 xl:-mr-24">
            <Parallax speed={34}>
              <MediaFrame
                src="/assets/generated/services-infra.webp"
                alt="Visualización de infraestructura tecnológica conectada"
                width="1600"
                height="900"
                rounded="rounded-[26px]"
                saturation={0.75}
                revealDirection="left"
                ring
              />
            </Parallax>
          </div>
        </div>
      </Section>

      <Technologies />
    </>
  );
}
