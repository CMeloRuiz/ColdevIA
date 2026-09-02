/**
 * PROYECTOS / PORTAFOLIO
 * ======================
 * Todos los proyectos de abajo son PLACEHOLDERS con imágenes generadas por IA.
 *
 * >>> PARA CARGAR UN PROYECTO REAL:
 * >>> 1. Pon una captura del proyecto en `frontend/public/assets/projects/`
 * >>>    (recomendado: 1600x900 px, .webp o .jpg).
 * >>> 2. Actualiza `image`, `title`, `client`, `description`, `tech` y `url`.
 * >>> 3. Cambia `placeholder: true` a `placeholder: false` — así desaparece
 * >>>    el sello "Ejemplo" de la tarjeta.
 *
 * `featured: true` marca los proyectos que aparecen en el home (mostramos 3).
 */

export const projectCategories = ["Todos", "Web", "Tienda", "SaaS", "Móvil", "IA"];

export const projects = [
  {
    id: "tienda-moda",
    title: "Tienda de moda online",
    client: "Proyecto de ejemplo",
    category: "Tienda",
    description:
      "Tienda virtual con catálogo, carrito, pasarela de pago y panel de administración para gestionar productos y pedidos.",
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "/assets/generated/project-ecommerce.webp",
    url: null,
    featured: true,
    placeholder: true,
  },
  {
    id: "dashboard-saas",
    title: "Plataforma SaaS de gestión",
    client: "Proyecto de ejemplo",
    category: "SaaS",
    description:
      "Sistema multiusuario con roles y permisos, dashboards en tiempo real y facturación recurrente por suscripción.",
    tech: ["React", "Express", "PostgreSQL", "Docker"],
    image: "/assets/generated/project-saas.webp",
    url: null,
    featured: true,
    placeholder: true,
  },
  {
    id: "sitio-corporativo",
    title: "Sitio corporativo",
    client: "Proyecto de ejemplo",
    category: "Web",
    description:
      "Sitio institucional multi-página con blog, formularios de contacto y SEO técnico optimizado para posicionamiento local.",
    tech: ["React", "Tailwind", "Vite", "SEO"],
    image: "/assets/generated/project-corporate.webp",
    url: null,
    featured: true,
    placeholder: true,
  },
  {
    id: "app-delivery",
    title: "App móvil de pedidos",
    client: "Proyecto de ejemplo",
    category: "Móvil",
    description:
      "Aplicación para Android e iOS con seguimiento de pedidos en tiempo real, notificaciones push y panel administrativo.",
    tech: ["React Native", "Node.js", "Firebase"],
    image: "/assets/generated/project-mobile.webp",
    url: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "agente-whatsapp",
    title: "Agente de IA para WhatsApp",
    client: "Proyecto de ejemplo",
    category: "IA",
    description:
      "Asistente conversacional conectado a la base de conocimiento del negocio, con derivación a un agente humano cuando hace falta.",
    tech: ["Python", "OpenAI", "WhatsApp API", "PostgreSQL"],
    image: "/assets/generated/project-chatbot.webp",
    url: null,
    featured: false,
    placeholder: true,
  },
  {
    id: "automatizacion-procesos",
    title: "Automatización de procesos",
    client: "Proyecto de ejemplo",
    category: "SaaS",
    description:
      "Flujos automáticos que conectan CRM, correo y planillas, con notificaciones y reportes generados sin intervención manual.",
    tech: ["Node.js", "n8n", "APIs REST", "Docker"],
    image: "/assets/generated/project-automation.webp",
    url: null,
    featured: false,
    placeholder: true,
  },
];
