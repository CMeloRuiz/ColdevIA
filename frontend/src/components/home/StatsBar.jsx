import { RevealGroup, RevealItem } from "../ui/Reveal";
import { heroStats } from "../../data/site";

/**
 * Banda de métricas bajo el hero.
 *
 * Sin cajas: los números viven en la página, separados por filetes
 * verticales, con la cifra en serif y la etiqueta en mono. Una barra de
 * cuatro tarjetas iguales era exactamente el patrón de plantilla que había
 * que sacar; esto se lee como la ficha técnica de una publicación.
 *
 * El ancho de las columnas no es uniforme (`lg:grid-cols-[...]`): el ritmo
 * irregular es intencional.
 */
export default function StatsBar() {
  return (
    <div className="container-site">
      <div className="rule" />

      <RevealGroup
        className="grid grid-cols-2 gap-y-9 py-10 sm:py-12 lg:grid-cols-[1.15fr_1fr_1fr_0.95fr] lg:gap-y-0"
        stagger={0.1}
      >
        {heroStats.map((stat, i) => (
          <RevealItem
            key={stat.label}
            className={`flex flex-col gap-2 px-1 sm:px-2 lg:px-8 ${
              // Filete a la izquierda salvo en la primera columna de cada fila.
              i % 2 === 1 ? "border-l border-white/8" : ""
            } ${i > 0 ? "lg:border-l lg:border-white/8" : "lg:border-l-0 lg:pl-0"}`}
          >
            <span className="font-display text-[clamp(2.1rem,1.5rem+1.8vw,3.1rem)] font-semibold leading-none tracking-tight text-ink">
              {stat.value}
            </span>
            <span className="label-mono">{stat.label}</span>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="rule" />
    </div>
  );
}
