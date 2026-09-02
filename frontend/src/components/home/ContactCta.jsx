import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../ui/Section";
import { LineReveal, Reveal } from "../ui/Reveal";
import Button from "../ui/Button";
import { Ring } from "../brand/Ring";
import { contact } from "../../data/site";

/**
 * Cierre del home.
 *
 * Es el CTA principal del sitio, así que tiene el mayor peso visual de la
 * página: panel a sangre completa, anillos de marca girando detrás del
 * titular y tipografía al tamaño del hero.
 *
 * El campo de correo no es decorativo: lo que se escriba acá viaja hasta
 * /contacto y aparece precargado en el formulario completo, para no pedir
 * el mismo dato dos veces.
 */
export default function ContactCta() {
  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    navigate("/contacto", { state: { correo: correo.trim() } });
  };

  return (
    <Section className="pb-24 sm:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-highlight/18 bg-gradient-to-br from-navy-800/70 via-navy-900/60 to-abyss/85 px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
          {/* Los anillos del logo, grandes, centrados detrás del titular */}
          <Ring
            className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 text-highlight/25"
            spin
            rings={[
              { r: 48, gap: 54, opacity: 0.4, width: 0.16 },
              { r: 39, gap: 96, opacity: 0.3, width: 0.16 },
              { r: 29, gap: 30, opacity: 0.22, width: 0.2 },
              { r: 18, gap: 118, opacity: 0.16, width: 0.28 },
            ]}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-accent/28 blur-[110px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-highlight/16 blur-[110px]"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal>
              <span className="label-mono text-highlight/85">¿Listo para empezar?</span>
            </Reveal>

            <LineReveal as="h2" className="mt-7" delay={0.05}>
              {[<>Tu próximo proyecto</>, <>empieza con <span className="accent-italic">una idea</span></>]}
            </LineReveal>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-base">
                Déjanos tu correo y te escribimos para conocer qué necesitas. Sin compromiso y sin
                vueltas.
              </p>
            </Reveal>

            <Reveal delay={0.28} className="w-full">
              <form onSubmit={onSubmit} className="mt-10 flex w-full flex-col gap-3 sm:flex-row">
                <label htmlFor="cta-correo" className="sr-only">
                  Tu correo electrónico
                </label>
                <input
                  id="cta-correo"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={correo}
                  onChange={(event) => setCorreo(event.target.value)}
                  placeholder="tunombre@empresa.com"
                  className="min-h-[58px] flex-1 rounded-full border border-white/14 bg-white/[0.06] px-6 text-sm text-ink transition-colors duration-400 placeholder:text-ink-muted/70 focus:border-highlight/60 focus:bg-white/[0.1] focus:outline-none"
                />
                <Button type="submit" size="lg" icon="arrowRight" className="shrink-0">
                  Hablemos
                </Button>
              </form>
            </Reveal>

            <Reveal delay={0.34}>
              <p className="mt-6 font-mono text-[11px] tracking-wide text-steel/80">
                o escríbenos a{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-highlight underline-offset-4 transition-colors hover:text-highlight-100 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
