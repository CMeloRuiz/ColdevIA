import Section, { SectionHeading } from "../ui/Section";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import ProjectCard from "../ui/ProjectCard";
import { TextLink } from "../ui/Button";
import { projects } from "../../data/projects";

/**
 * Anticipo del portafolio en el home.
 *
 * El primer proyecto marcado como `featured` se muestra en panel ancho y
 * los dos siguientes como fichas compactas debajo. Un portafolio donde
 * todos los proyectos ocupan el mismo espacio no orienta al visitante:
 * acá queda claro cuál mirar primero.
 */
export default function ShowcasePreview() {
  const destacados = projects.filter((project) => project.featured);
  const [principal, ...secundarios] = destacados;

  if (!principal) return null;

  return (
    <Section id="proyectos" tone="sunken" className="scroll-mt-24">
      <SectionHeading
        eyebrow="Proyectos"
        title={[<>Trabajo que habla</>, <>por <span className="accent-italic">sí solo</span></>]}
        description="Una muestra de lo que construimos: sitios, tiendas y plataformas pensados para el negocio de cada cliente."
        action={<TextLink to="/proyectos">Ver todo el portafolio</TextLink>}
      />

      <div className="mt-14 flex flex-col gap-5 lg:mt-20">
        <Reveal>
          <ProjectCard project={principal} variant="feature" />
        </Reveal>

        <RevealGroup className="grid gap-5 md:grid-cols-2" stagger={0.1}>
          {secundarios.slice(0, 2).map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
