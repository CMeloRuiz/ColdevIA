/**
 * PÁGINA "ACERCA DE"
 * ==================
 * Bloque del fundador y contenido institucional.
 *
 * >>> BLOQUE FÁCIL DE EDITAR: `founder` de abajo.
 * >>> Pon tu foto en `frontend/public/assets/coldevia/founder.jpg`
 * >>> (recomendado: cuadrada, mínimo 800x800 px) y actualiza `photo`.
 * >>> Si `photo` es `null`, se muestra un marcador con tus iniciales.
 */

export const founder = {
  name: "Cristhian Melo Ruiz",
  role: "Fundador y desarrollador principal",
  photo: null, // p. ej. "/assets/coldevia/founder.jpg"
  initials: "CM",
  // TODO(cristhian): reemplazar por tu bio real.
  bio: [
    "Soy desarrollador de software y fundador de Coldevia. Empecé resolviendo problemas concretos de negocios pequeños —una web que no vendía, un proceso que se hacía a mano— y descubrí que la tecnología bien aplicada cambia el día a día de una empresa.",
    "Hoy combino desarrollo web, infraestructura e inteligencia artificial para construir soluciones que las empresas realmente usan. Trabajo desde Colombia y Argentina, con clientes en Latinoamérica y Estados Unidos.",
  ],
  links: [
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
};

export const story = {
  heading: "De Colombia al mundo, con la IA como horizonte",
  paragraphs: [
    "Coldevia nace de tres ideas que caben en su nombre: **Col** por Colombia, el lugar donde empieza todo; **dev** por el desarrollo de software, lo que hacemos hoy; e **IA** por la inteligencia artificial, hacia donde vamos.",
    "Empezamos construyendo páginas web para negocios que necesitaban existir en internet. Con el tiempo, los pedidos crecieron: una app, un sistema de gestión, un servidor que no podía caerse, un asistente que respondiera por WhatsApp a cualquier hora.",
    "Ese recorrido nos dejó una convicción: la tecnología no vale por ser moderna, vale por lo que resuelve. Por eso cada proyecto arranca con una conversación sobre tu negocio, no sobre nuestro stack.",
  ],
};

export const mission = {
  mission:
    "Acercar tecnología de nivel profesional a empresas de todos los tamaños, con soluciones a medida que resuelvan problemas reales y generen resultados medibles.",
  vision:
    "Ser el aliado tecnológico de referencia en Latinoamérica para empresas que quieren crecer apoyadas en software e inteligencia artificial.",
};

export const values = [
  {
    icon: "handshake",
    title: "Transparencia",
    description: "Precios claros, plazos realistas y comunicación directa durante todo el proyecto.",
  },
  {
    icon: "target",
    title: "Foco en el negocio",
    description: "Primero entendemos qué necesitas lograr; después decidimos con qué construirlo.",
  },
  {
    icon: "shield",
    title: "Trabajo bien hecho",
    description: "Código mantenible, seguridad desde el diseño y nada de atajos que se paguen después.",
  },
  {
    icon: "bolt",
    title: "Aprendizaje constante",
    description: "Incorporamos herramientas nuevas cuando aportan valor real, no por moda.",
  },
];

/**
 * Línea de tiempo de la empresa.
 * TODO(cristhian): ajustar años y hitos a la historia real.
 */
export const timeline = [
  {
    year: "2023",
    title: "Los primeros proyectos",
    description: "Arrancamos desarrollando sitios web para negocios locales en Colombia.",
  },
  {
    year: "2024",
    title: "Más allá de la web",
    description: "Sumamos aplicaciones móviles, plataformas SaaS e infraestructura TI al catálogo.",
  },
  {
    year: "2025",
    title: "Presencia internacional",
    description: "Clientes en Colombia, Argentina y Estados Unidos, con soporte en toda la región.",
  },
  {
    year: "2026",
    title: "Coldevia y la IA",
    description: "Rebranding a Coldevia y foco en agentes de inteligencia artificial y automatización.",
  },
];

export const trustReasons = [
  {
    icon: "code",
    title: "Hablas directo con quien desarrolla",
    description: "Sin capas intermedias: la persona que construye tu proyecto es la que te explica cómo funciona.",
  },
  {
    icon: "server",
    title: "Del código al servidor",
    description: "Cubrimos desarrollo, despliegue e infraestructura, así no tienes que coordinar tres proveedores.",
  },
  {
    icon: "headset",
    title: "No desaparecemos al entregar",
    description: "El acompañamiento posterior al lanzamiento es parte del trabajo, no un extra.",
  },
];
