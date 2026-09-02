import { useEffect } from "react";
import PageHero from "../components/ui/PageHero";
import Section, { Eyebrow, SectionHeading } from "../components/ui/Section";
import { ClipReveal, LineReveal, Parallax, Reveal, RevealGroup, RevealItem } from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import Button from "../components/ui/Button";
import { Ring, RingDivider } from "../components/brand/Ring";
import { brand } from "../data/site";
import { founder, mission, story, timeline, trustReasons, values } from "../data/about";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * ACERCA DE
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Es la página donde el motivo de marca tiene más sentido: los tres anillos
 * del logo son literalmente las tres partes del nombre. Acá se despliegan a
 * gran escala junto al desglose Col · dev · IA, y esa idea sostiene toda la
 * narrativa de la página.
 */
export default function AcercaDe() {
  useEffect(() => {
    document.title = "Acerca de | Coldevia";
  }, []);

  return (
    <>
      <PageHero
        breadcrumb="Acerca de"
        title={[<>Somos <span className="accent-word">Coldevia</span></>]}
        description="Una empresa de desarrollo de software nacida en Colombia, que construye hoy con las herramientas de hoy y se prepara para lo que viene con inteligencia artificial."
      />

      {/* ── Historia + el nombre ────────────────────────────────────────── */}
      <Section className="pt-0">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <LineReveal as="h2">
              {[<>De Colombia al mundo,</>, <>con la <span className="accent-italic">IA</span> como horizonte</>]}
            </LineReveal>

            <div className="mt-8 flex flex-col gap-6">
              {story.paragraphs.map((paragraph, index) => (
                <Reveal key={index} delay={0.08 * index}>
                  <p
                    className="max-w-xl text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-[17px]"
                    // El copy usa **negritas** al estilo markdown para destacar
                    // las tres partes del nombre.
                    dangerouslySetInnerHTML={{
                      __html: paragraph.replace(
                        /\*\*(.+?)\*\*/g,
                        '<strong class="font-semibold text-highlight">$1</strong>'
                      ),
                    }}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          {/* El nombre, desglosado sobre los anillos de la marca */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <div className="relative">
              <Ring
                className="pointer-events-none absolute -right-10 -top-16 h-72 w-72 text-highlight/30"
                spin
                rings={[
                  { r: 47, gap: 58, opacity: 0.45, width: 0.4 },
                  { r: 36, gap: 104, opacity: 0.3, width: 0.4 },
                  { r: 25, gap: 34, opacity: 0.2, width: 0.4 },
                ]}
              />

              <div className="relative">
                <Eyebrow>El nombre</Eyebrow>

                <dl className="mt-7 flex flex-col divide-y divide-white/8 border-y border-white/8">
                  {[
                    { part: "Col", meaning: brand.meaning.col },
                    { part: "dev", meaning: brand.meaning.dev },
                    { part: "IA", meaning: brand.meaning.ia, destacado: true },
                  ].map((item) => (
                    <div key={item.part} className="flex items-baseline gap-6 py-5">
                      <dt
                        className={`w-16 shrink-0 font-display text-[1.75rem] font-semibold tracking-tight ${
                          item.destacado ? "accent-word" : "text-ink"
                        }`}
                      >
                        {item.part}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink-muted">{item.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── El planeta, girando sobre su eje ───────────────────────────
            La máscara radial vive en el contenedor y la imagen rota dentro:
            como la máscara es simétrica, las esquinas del cuadrado nunca
            asoman y el giro se lee como un planeta y no como una foto
            girando. 120 s por vuelta: presente pero nunca protagonista. */}
        <div className="mt-16 flex justify-center lg:mt-24">
          <Parallax speed={26}>
            <ClipReveal>
              <div className="relative mx-auto aspect-square w-[min(78vw,30rem)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-[6%] rounded-full bg-accent/22 blur-[70px]"
                />

                {/* Anillos de marca en órbita, en sentido contrario */}
                <Ring
                  className="absolute inset-[-9%] h-[118%] w-[118%] text-highlight/35"
                  spin
                  rings={[{ r: 48, gap: 62, opacity: 0.5, width: 0.3 }]}
                />

                <div
                  className="relative h-full w-full overflow-hidden"
                  style={{
                    // Los porcentajes van sobre la distancia a la esquina, no
                    // al borde: el planeta ocupa ~60% de ese radio, así que
                    // queda nítido hasta ahí y solo se disuelven las esquinas.
                    maskImage: "radial-gradient(circle at 50% 50%, black 58%, transparent 72%)",
                    WebkitMaskImage:
                      "radial-gradient(circle at 50% 50%, black 58%, transparent 72%)",
                  }}
                >
                  <img
                    src="/assets/generated/about-globe.webp"
                    alt="Planeta con las conexiones de Coldevia entre América Latina y Estados Unidos"
                    width="1100"
                    height="1100"
                    loading="lazy"
                    className="h-full w-full animate-globe object-cover"
                    style={{ filter: "saturate(0.85) brightness(1.05)" }}
                  />
                </div>
              </div>
            </ClipReveal>
          </Parallax>
        </div>
      </Section>

      {/* ── Misión y visión ─────────────────────────────────────────────── */}
      <Section tone="sunken">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {[
            { label: "Misión", texto: mission.mission, indice: "01" },
            { label: "Visión", texto: mission.vision, indice: "02" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-steel/60">
                    {item.indice}
                  </span>
                  <h2 className="text-[clamp(1.6rem,1.3rem+1vw,2.2rem)]">{item.label}</h2>
                </div>
                <p className="text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-[17px]">
                  {item.texto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── Valores ─────────────────────────────────────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="Valores"
          title={[<>Cómo</>, <><span className="accent-word">trabajamos</span></>]}
          description="Cuatro cosas que no negociamos, sin importar el tamaño del proyecto."
        />

        <RevealGroup
          className="mt-14 grid border-t border-white/8 sm:grid-cols-2 lg:mt-16"
          stagger={0.07}
        >
          {values.map((value, i) => (
            <RevealItem
              key={value.title}
              className={`group flex gap-5 border-b border-white/8 py-8 transition-colors duration-500 hover:bg-white/[0.02] ${
                i % 2 === 1 ? "sm:border-l sm:pl-10" : "sm:pr-10"
              }`}
            >
              <span className="mt-1 font-mono text-[11px] tracking-[0.2em] text-steel/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-highlight/85 transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:bg-accent/22 group-hover:text-highlight">
                <Icon name={value.icon} className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[1.15rem]">{value.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-muted">
                  {value.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ── Línea de tiempo ─────────────────────────────────────────────── */}
      <Section tone="sunken">
        <SectionHeading
          eyebrow="Recorrido"
          title={[<>De una web a una</>, <>empresa de <span className="accent-word">tecnología</span></>]}
        />

        <RevealGroup className="mt-14 lg:mt-16" stagger={0.1}>
          {timeline.map((item, i) => (
            <RevealItem
              key={item.year}
              className="group grid gap-4 border-t border-white/8 py-8 transition-colors duration-500 hover:bg-white/[0.02] sm:grid-cols-12 sm:gap-8"
            >
              <span className="font-display text-[clamp(1.75rem,1.4rem+1.4vw,2.5rem)] font-semibold leading-none tracking-tight text-highlight/85 sm:col-span-3">
                {item.year}
              </span>
              <h3 className="text-[1.2rem] sm:col-span-4 sm:pt-1">{item.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-ink-muted sm:col-span-5 sm:pt-1.5">
                {item.description}
              </p>
              {i === timeline.length - 1 ? (
                <span className="hidden sm:col-span-12 sm:block" />
              ) : null}
            </RevealItem>
          ))}
          <div className="border-t border-white/8" />
        </RevealGroup>
      </Section>

      {/* ── Fundador — bloque fácil de editar (ver data/about.js) ───────── */}
      <Section>
        <RingDivider className="mb-16" />

        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="relative mx-auto w-full max-w-[300px] lg:max-w-none">
              <Ring
                className="pointer-events-none absolute -inset-6 text-highlight/25"
                spin
                rings={[{ r: 48, gap: 60, opacity: 0.5, width: 0.4 }]}
              />
              <div className="relative aspect-square overflow-hidden rounded-full border border-white/12">
                {founder.photo ? (
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    width="800"
                    height="800"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-navy-800 to-abyss">
                    <span className="font-display text-[3.5rem] font-semibold leading-none text-highlight/70">
                      {founder.initials}
                    </span>
                    {/* Recordatorio visible solo mientras no haya foto cargada */}
                    <span className="px-8 text-center font-mono text-[9px] leading-relaxed tracking-wide text-steel/60">
                      Agregá tu foto en
                      <br />
                      data/about.js → founder.photo
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-8">
            <Reveal>
              <Eyebrow>El fundador</Eyebrow>
            </Reveal>

            {founder.bio.map((paragraph, index) => (
              <Reveal key={index} delay={0.08 * (index + 1)}>
                <p className="max-w-2xl text-pretty font-display text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] font-medium leading-relaxed text-ink-dim">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <div className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{founder.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-highlight/80">
                    {founder.role}
                  </p>
                </div>
                <div className="flex gap-2.5">
                  {founder.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-white/12 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted transition-all duration-400 hover:-translate-y-0.5 hover:border-highlight/45 hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Por qué confiar ─────────────────────────────────────────────── */}
      <Section tone="sunken" className="pb-24 sm:pb-28">
        <SectionHeading
          eyebrow="Confianza"
          title={[<>Por qué trabajar</>, <>con <span className="accent-word">nosotros</span></>]}
          action={
            <Button to="/contacto" icon="arrowRight">
              Hablemos de tu proyecto
            </Button>
          }
          description="Tres razones concretas, más allá de la lista de tecnologías."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-16" stagger={0.09}>
          {trustReasons.map((reason, i) => (
            <RevealItem
              key={reason.title}
              className={`group surface flex h-full flex-col gap-4 p-7 transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-highlight/35 ${
                // Alturas escalonadas: la fila deja de ser un bloque rígido.
                i === 1 ? "md:mt-8" : i === 2 ? "md:mt-16" : ""
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-highlight transition-transform duration-500 group-hover:scale-110">
                <Icon name={reason.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-[1.15rem]">{reason.title}</h3>
              <p className="text-pretty text-sm leading-relaxed text-ink-muted">
                {reason.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
    </>
  );
}
