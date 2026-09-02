import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import { LineReveal, Parallax, Reveal, RevealGroup, RevealItem } from "../components/ui/Reveal";
import ContactForm from "../components/contact/ContactForm";
import Icon from "../components/ui/Icon";
import MediaFrame from "../components/ui/MediaFrame";
import { RingBullet } from "../components/brand/Ring";
import { contact, socials } from "../data/site";

const beneficios = [
  "Soluciones personalizadas",
  "Tecnología moderna",
  "Calidad y seguridad",
  "Soporte continuo",
  "Escalabilidad",
  "Resultados orientados al negocio",
];

/**
 * ═══════════════════════════════════════════════════════════════════════
 * CONTACTO
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Reparto 5/7: la información de contacto ocupa menos que el formulario,
 * que es la acción que importa. Los teléfonos van como una lista con filetes
 * en vez de tres tarjetas iguales.
 *
 * Si el visitante llegó desde el banner del home, el correo que escribió
 * allá viaja en `location.state` y aparece precargado.
 */
export default function Contacto() {
  const location = useLocation();
  const correoInicial = location.state?.correo ?? "";

  useEffect(() => {
    document.title = "Contacto | Coldevia";
  }, []);

  return (
    <>
      <PageHero
        breadcrumb="Contacto"
        title={[<>Cada gran proyecto</>, <>empieza con <span className="accent-italic">una conversación</span></>]}
        description="Cuéntanos tu idea, tus objetivos o los desafíos de tu negocio, y descubre cómo podemos ayudarte a convertirlos en resultados reales."
      />

      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ── Información (5/12) ───────────────────────────────────────── */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            <Reveal>
              <p className="max-w-md text-pretty text-[15px] leading-relaxed text-ink-dim">
                Respondemos todas las consultas, normalmente dentro de las 24 horas hábiles. Si
                prefieres algo más rápido, escríbenos por WhatsApp.
              </p>
            </Reveal>

            {/* Teléfonos: lista con filetes, no tarjetas */}
            <div>
              <h2 className="label-mono">Teléfonos</h2>
              <RevealGroup className="mt-5 flex flex-col border-t border-white/8" stagger={0.07}>
                {contact.phones.map((phone) => (
                  <RevealItem
                    key={phone.code}
                    className="group flex items-center gap-4 border-b border-white/8 py-4 transition-colors duration-400 hover:bg-white/[0.02]"
                  >
                    <img
                      src={phone.flag}
                      alt=""
                      className="h-[22px] w-[33px] shrink-0 rounded-[3px] object-cover ring-1 ring-white/20"
                      width="28"
                      height="20"
                      loading="lazy"
                    />
                    <span className="text-sm text-ink-dim">{phone.country}</span>
                    <span className="ml-auto font-mono text-[13px] text-ink-muted transition-colors duration-400 group-hover:text-highlight">
                      {phone.number}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Correo, en grande */}
            <Reveal delay={0.1}>
              <h2 className="label-mono">Correo</h2>
              <a
                href={`mailto:${contact.email}`}
                className="group/mail mt-4 flex w-fit items-center gap-3 font-display text-[clamp(1.2rem,1rem+0.8vw,1.6rem)] font-semibold tracking-tight text-ink transition-colors duration-400 hover:text-highlight"
              >
                {contact.email}
                <Icon
                  name="arrowUpRight"
                  className="h-5 w-5 transition-transform duration-400 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5"
                />
              </a>
            </Reveal>

            {/* Qué obtiene el cliente */}
            <Reveal delay={0.14}>
              <h2 className="label-mono">Con Coldevia obtienes</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2.5">
                    <RingBullet className="mt-0.5 h-3.5 w-3.5 shrink-0 text-highlight/80" />
                    <span className="text-sm text-ink-muted">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Redes */}
            <Reveal delay={0.18}>
              <h2 className="label-mono">Síguenos</h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all duration-400 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-highlight/45 hover:text-highlight"
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ── Formulario (7/12) ───────────────────────────────────────── */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm correoInicial={correoInicial} />
          </Reveal>
        </div>
      </Section>

      {/* ── Cobertura geográfica ────────────────────────────────────────── */}
      <Section tone="sunken" className="pb-24 sm:pb-28 overflow-hidden">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Reveal>
              <span className="label-mono text-highlight/80">Dónde estamos</span>
            </Reveal>

            <LineReveal as="h2">
              {[<>Trabajamos en remoto,</>, <>en tres <span className="accent-word">husos horarios</span></>]}
            </LineReveal>

            <Reveal delay={0.12}>
              <p className="max-w-xl text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-base">
                Nuestro equipo opera desde Colombia y Argentina, y atendemos clientes en toda
                Latinoamérica y Estados Unidos. Coordinamos reuniones en tu horario, no en el
                nuestro.
              </p>
            </Reveal>

            <RevealGroup className="flex flex-wrap gap-x-8 gap-y-3" stagger={0.08}>
              {contact.phones.map((phone) => (
                <RevealItem key={phone.code} className="flex items-center gap-2.5">
                  <img
                    src={phone.flag}
                    alt=""
                    className="h-[17px] w-[26px] rounded-[3px] object-cover ring-1 ring-white/20"
                    width="20"
                    height="14"
                    loading="lazy"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    {phone.country}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* La imagen desborda por la derecha */}
          <div className="lg:col-span-6 lg:-mr-14 xl:-mr-24">
            <Parallax speed={30}>
              <MediaFrame
                src="/assets/generated/contact-nodes.webp"
                alt="Nodos de conversación conectados por trazos de luz azul"
                width="1100"
                height="825"
                rounded="rounded-[26px]"
                saturation={0.8}
                revealDirection="left"
                ring
              />
            </Parallax>
          </div>
        </div>
      </Section>
    </>
  );
}
