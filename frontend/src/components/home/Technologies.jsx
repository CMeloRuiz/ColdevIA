import Section, { SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { backendTech, frontendTech } from "../../data/technologies";

/**
 * Carrusel de tecnologías.
 *
 * Dos cambios respecto de la versión anterior:
 *
 * 1. Fuera las tarjetas. Cada logo va sobre un riel de filete fino, con la
 *    etiqueta en mono: se lee como un índice técnico, no como otra grilla
 *    de cajas más.
 * 2. Los logos entran desaturados y recuperan su color al pasar el mouse.
 *    Nueve logos a todo color rompen la paleta navy; en gris se integran, y
 *    el color aparece como recompensa a la interacción.
 *
 * El bucle infinito duplica la lista y desplaza el contenedor un -50%. La
 * copia lleva `aria-hidden` para que un lector de pantalla no lea todo dos
 * veces.
 */
export default function Technologies() {
  return (
    <Section id="tecnologias" tone="sunken" className="scroll-mt-24 overflow-hidden">
      <SectionHeading
        eyebrow="Stack"
        index="03 / 06"
        title={[<>Las herramientas</>, <>con las que <span className="accent-word">construimos</span></>]}
        description="Tecnologías maduras y probadas, elegidas según lo que cada proyecto necesita — no según la moda del momento."
      />

      <div className="mt-14 flex flex-col gap-12 lg:mt-20">
        <Riel titulo="Backend" items={backendTech} />
        <Riel titulo="Frontend" items={frontendTech} reverse />
      </div>
    </Section>
  );
}

function Riel({ titulo, items, reverse = false }) {
  return (
    <Reveal className="flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <span className="label-mono shrink-0">{titulo}</span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
      </div>

      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        }}
      >
        <div
          className={`flex w-max items-end ${
            reverse ? "animate-marquee-reverse" : "animate-marquee"
          } group-hover:[animation-play-state:paused]`}
        >
          {[items, items].map((grupo, indiceGrupo) => (
            <ul
              key={indiceGrupo}
              className="flex shrink-0 items-end"
              aria-hidden={indiceGrupo === 1 ? "true" : undefined}
            >
              {grupo.map((tech) => (
                <li
                  key={`${indiceGrupo}-${tech.name}`}
                  className="group/tech mx-4 flex w-[92px] shrink-0 flex-col items-center gap-3 sm:mx-7 sm:w-[104px]"
                >
                  <img
                    src={tech.icon}
                    alt=""
                    width="40"
                    height="40"
                    loading="lazy"
                    className="h-8 w-8 object-contain opacity-55 grayscale transition-all duration-500 ease-[var(--ease-out-soft)] group-hover/tech:-translate-y-1 group-hover/tech:opacity-100 group-hover/tech:grayscale-0 sm:h-9 sm:w-9"
                  />
                  <span className="font-mono text-[10px] tracking-wide text-ink-muted transition-colors duration-500 group-hover/tech:text-ink">
                    {tech.name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
