import Icon from "./Icon";
import MediaFrame from "./MediaFrame";
import { TextLink } from "./Button";

/**
 * Tarjeta de proyecto, en dos tamaños.
 *
 *   variant="feature" — panel ancho con la imagen a un lado y el texto al
 *                       otro. Reservado al proyecto más importante.
 *   variant="compact" — ficha vertical con marco de navegador.
 *
 * La distinción importa: un portafolio donde todos los proyectos se ven
 * igual no le dice al visitante cuál mirar primero.
 *
 * `project.placeholder` muestra el sello "Ejemplo" y activa el tratamiento
 * de color de marca. Con capturas reales (`placeholder: false`) la imagen se
 * respeta tal cual.
 */

/** Barra de navegador dibujada en CSS: enmarca la captura como un sitio. */
function BarraNavegador() {
  return (
    <div className="flex items-center gap-2 border-b border-white/8 bg-navy-950/70 px-3.5 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
      </span>
      <span className="ml-1 h-4 flex-1 rounded-full bg-white/[0.05]" aria-hidden="true" />
    </div>
  );
}

/** Insignias que van sobre la imagen. */
function Insignias({ project }) {
  return (
    <>
      {/* Velo superior: garantiza contraste aunque la imagen sea clara. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-void/70 to-transparent"
      />

      {project.placeholder ? (
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-void/85 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-ink-muted backdrop-blur-sm">
          Ejemplo
        </span>
      ) : null}

      <span className="absolute right-3 top-3 rounded-full border border-highlight/25 bg-accent/30 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-highlight-100 backdrop-blur-sm">
        {project.category}
      </span>
    </>
  );
}

export default function ProjectCard({ project, variant = "compact" }) {
  const Wrapper = project.url ? "a" : "article";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noreferrer noopener" }
    : {};

  /* ───────────────────────────────── Proyecto destacado */
  if (variant === "feature") {
    return (
      <Wrapper
        {...wrapperProps}
        className="group surface-raised relative grid overflow-hidden transition-all duration-600 ease-[var(--ease-out-soft)] hover:border-highlight/40 lg:grid-cols-12"
      >
        <div className="relative lg:col-span-7">
          <MediaFrame
            src={project.image}
            alt={`Vista del proyecto ${project.title}`}
            width="1200"
            height="675"
            rounded="rounded-none"
            className="aspect-[16/10] border-0 lg:h-full lg:aspect-auto"
            imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
            saturation={project.placeholder ? 0.4 : 1}
            overlay="from-void/80 via-void/10 to-accent/22"
            reveal={false}
          >
            <Insignias project={project} />
          </MediaFrame>
        </div>

        <div className="flex flex-col justify-center gap-5 p-7 sm:p-9 lg:col-span-5">
          <span className="label-mono text-highlight/80">Proyecto destacado</span>

          <div>
            <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)]">{project.title}</h3>
            <p className="mt-1.5 font-mono text-[11px] tracking-wide text-steel/75">
              {project.client}
            </p>
          </div>

          <p className="text-pretty text-[15px] leading-relaxed text-ink-dim">
            {project.description}
          </p>

          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.url ? <TextLink href={project.url} icon="arrowUpRight">Ver el proyecto</TextLink> : null}
        </div>
      </Wrapper>
    );
  }

  /* ───────────────────────────────── Ficha compacta */
  return (
    <Wrapper
      {...wrapperProps}
      className="group surface flex h-full flex-col overflow-hidden transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 hover:border-highlight/35 hover:bg-white/[0.05]"
    >
      <div className="relative overflow-hidden">
        <BarraNavegador />
        <MediaFrame
          src={project.image}
          alt={`Vista del proyecto ${project.title}`}
          width="1200"
          height="675"
          rounded="rounded-none"
          className="aspect-video border-0"
          imgClassName="transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          saturation={project.placeholder ? 0.4 : 1}
          overlay="from-void/85 via-void/10 to-accent/20"
          reveal={false}
        >
          <Insignias project={project} />
        </MediaFrame>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[1.05rem] leading-snug">{project.title}</h3>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-steel/70">
              {project.client}
            </p>
          </div>
          {project.url ? (
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-highlight transition-all duration-500 group-hover:border-highlight/50 group-hover:bg-accent/25">
              <Icon name="arrowUpRight" className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </div>

        <p className="text-pretty text-[13.5px] leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
