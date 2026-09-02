import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import { LineReveal, Reveal, RevealGroup, RevealItem } from "../components/ui/Reveal";
import ProjectCard from "../components/ui/ProjectCard";
import Button from "../components/ui/Button";
import { Ring } from "../components/brand/Ring";
import { projectCategories, projects } from "../data/projects";

/**
 * ═══════════════════════════════════════════════════════════════════════
 * PROYECTOS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * El primer proyecto de la selección se muestra en panel ancho y el resto
 * en fichas: un portafolio donde todo ocupa el mismo espacio no le dice al
 * visitante por dónde empezar a mirar.
 *
 * Los proyectos salen de `data/projects.js`. Hoy son ejemplos con imágenes
 * generadas; ese archivo explica paso a paso cómo reemplazarlos.
 */
export default function Proyectos() {
  const [categoria, setCategoria] = useState("Todos");

  useEffect(() => {
    document.title = "Proyectos | Coldevia";
  }, []);

  const visibles = useMemo(
    () => (categoria === "Todos" ? projects : projects.filter((p) => p.category === categoria)),
    [categoria]
  );

  const [principal, ...resto] = visibles;
  const hayEjemplos = projects.some((project) => project.placeholder);

  return (
    <>
      <PageHero
        breadcrumb="Proyectos"
        title={[<>Proyectos que resuelven</>, <><span className="accent-italic">problemas reales</span></>]}
        description="Cada uno empezó con una conversación sobre un negocio, no sobre tecnología. Mira el tipo de trabajo que hacemos."
      >
        <nav aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoria(cat)}
              aria-pressed={categoria === cat}
              className={`min-h-[38px] rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-400 ease-[var(--ease-out-soft)] ${
                categoria === cat
                  ? "border-transparent bg-gradient-to-b from-accent-400 to-accent text-ink"
                  : "border-white/10 bg-white/[0.03] text-ink-muted hover:-translate-y-0.5 hover:border-highlight/45 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </PageHero>

      <Section className="pt-0">
        {hayEjemplos ? (
          <Reveal className="mb-12 flex items-start gap-4 border-l-2 border-highlight/40 py-1 pl-5">
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted">
              Los proyectos marcados como <strong className="font-semibold text-ink">Ejemplo</strong>{" "}
              ilustran el tipo de trabajo que realizamos. Estamos preparando los casos reales con
              sus resultados —{" "}
              <a
                href="/contacto"
                className="text-highlight underline-offset-4 transition-colors hover:underline"
              >
                escríbenos
              </a>{" "}
              si quieres ver trabajos concretos de tu sector.
            </p>
          </Reveal>
        ) : null}

        {/* La grilla se re-anima al cambiar de filtro */}
        <AnimatePresence mode="wait">
          <motion.div
            key={categoria}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {principal ? <ProjectCard project={principal} variant="feature" /> : null}

            {resto.length > 0 ? (
              <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
                {resto.map((project) => (
                  <RevealItem key={project.id}>
                    <ProjectCard project={project} />
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {visibles.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <Ring className="h-16 w-16 text-highlight/30" />
            <p className="text-sm text-ink-muted">
              Todavía no cargamos proyectos en esta categoría.
            </p>
            <button
              type="button"
              onClick={() => setCategoria("Todos")}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight transition-colors hover:text-highlight-100"
            >
              Ver todos
            </button>
          </div>
        ) : null}
      </Section>

      {/* Cierre */}
      <Section tone="sunken" className="pb-24 sm:pb-28">
        <div className="relative overflow-hidden rounded-[28px] border border-highlight/18 bg-gradient-to-br from-navy-800/60 to-abyss/80 px-6 py-16 sm:px-12 sm:py-20">
          <Ring
            className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 text-highlight/25"
            spin
            rings={[
              { r: 48, gap: 56, opacity: 0.35, width: 0.2 },
              { r: 37, gap: 104, opacity: 0.25, width: 0.2 },
            ]}
          />

          <div className="relative mx-auto flex max-w-xl flex-col items-center gap-7 text-center">
            <LineReveal as="h2">
              {[<>¿Tu proyecto puede ser</>, <>el <span className="accent-italic">próximo</span>?</>]}
            </LineReveal>

            <Reveal delay={0.15}>
              <p className="text-pretty text-[15px] leading-relaxed text-ink-dim sm:text-base">
                Cuéntanos qué tienes en mente y armamos juntos una propuesta concreta, con alcance y
                plazos claros.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <Button to="/contacto" size="lg" icon="arrowRight">
                Empezar mi proyecto
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
