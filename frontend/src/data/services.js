/**
 * Los 6 servicios de Coldevia.
 * `summary` + `items` se usan en el home; `detail` y `items` en /servicios.
 * El copy proviene del sitio original (ver /reference-old-site).
 */

export const services = [
  {
    id: "web",
    number: "01",
    icon: "code",
    title: "Desarrollo Web",
    shortTitle: "Desarrollo Web",
    summary:
      "Diseñamos y desarrollamos páginas web modernas, rápidas y optimizadas para convertir visitantes en clientes. Creamos experiencias digitales que reflejan la identidad de tu marca, mejoran tu presencia online y generan nuevas oportunidades de negocio.",
    detail:
      "Cada sitio se construye pensando en velocidad de carga, posicionamiento y conversión. Trabajamos con arquitecturas modernas, diseño responsive y buenas prácticas de SEO técnico para que tu web no solo se vea bien: también rinda.",
    items: ["Landing Pages", "Sitios Corporativos", "Tiendas Online", "SEO Técnico", "Diseño Responsive"],
  },
  {
    id: "mobile",
    number: "02",
    icon: "mobile",
    title: "Aplicaciones Móviles",
    shortTitle: "Apps Móviles",
    summary:
      "Desarrollamos aplicaciones móviles intuitivas, escalables y enfocadas en la experiencia del usuario. Soluciones para Android e iOS que conectan a las empresas con sus clientes, optimizan procesos y ofrecen servicios desde cualquier lugar.",
    detail:
      "Desde la definición del flujo hasta la publicación en las tiendas. Integramos tu app con las APIs y sistemas que ya usas, y sumamos panel administrativo y notificaciones para que puedas operar sin depender de nosotros.",
    items: ["Android", "iOS", "Integración con APIs", "Push Notifications", "Panel Administrativo"],
  },
  {
    id: "saas",
    number: "03",
    icon: "cloud",
    title: "SaaS",
    shortTitle: "SaaS",
    summary:
      "Construimos plataformas SaaS seguras y escalables, preparadas para crecer junto a tu negocio. Diseñamos sistemas accesibles desde cualquier dispositivo que facilitan la gestión de usuarios, servicios, suscripciones y operaciones empresariales.",
    detail:
      "Multiusuario desde el día uno: roles y permisos, dashboards con datos reales, facturación recurrente y despliegue en la nube. Pensado para que sumar clientes no signifique rehacer el sistema.",
    items: ["Multiusuario", "Roles y Permisos", "Dashboards", "Facturación", "Cloud Hosting"],
  },
  {
    id: "infra",
    number: "04",
    icon: "server",
    title: "Infraestructura TI",
    shortTitle: "Infraestructura TI",
    summary:
      "Implementamos y administramos entornos tecnológicos confiables que garantizan disponibilidad, seguridad y rendimiento. Construimos una infraestructura sólida que soporta tu crecimiento y reduce riesgos operativos.",
    detail:
      "Servidores Linux y Windows, virtualización, políticas de backup verificadas, monitoreo con alertas y endurecimiento de seguridad. Para que tu operación no se detenga y sepas siempre en qué estado está.",
    items: ["Linux y Windows", "Virtualización", "Backups", "Monitoreo", "Seguridad"],
  },
  {
    id: "ai",
    number: "05",
    icon: "robot",
    title: "Agentes de IA y Chatbots",
    shortTitle: "IA y Chatbots",
    summary:
      "Integramos asistentes inteligentes capaces de atender consultas, automatizar tareas y mejorar la experiencia del cliente. Usamos inteligencia artificial para optimizar tiempos de respuesta y aumentar la eficiencia de los procesos.",
    detail:
      "Agentes conectados a tu base de conocimiento, que responden en WhatsApp y en tu web con el tono de tu marca, derivan a una persona cuando hace falta y dejan registro de cada conversación.",
    items: [
      "Agentes de IA",
      "Chatbots IA",
      "WhatsApp",
      "Automatización Conversacional",
      "Bases de Conocimiento",
      "Atención al Cliente",
    ],
  },
  {
    id: "automation",
    number: "06",
    icon: "gears",
    title: "Automatización",
    shortTitle: "Automatización",
    summary:
      "Automatizamos procesos repetitivos para que tu equipo pueda enfocarse en actividades de mayor valor. Diseñamos flujos de trabajo inteligentes que reducen errores, mejoran la productividad y optimizan la operación diaria.",
    detail:
      "Conectamos las herramientas que ya usas —CRM, planillas, correo, mensajería— en flujos que se ejecutan solos, con notificaciones cuando algo requiere atención humana.",
    items: ["Workflows", "Integraciones", "Ventas", "Notificaciones", "Procesos Empresariales"],
  },
];
