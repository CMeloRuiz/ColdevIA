/**
 * Datos globales del sitio: identidad, contacto, navegación y redes.
 * Edita este archivo para actualizar teléfonos, correo o redes sociales
 * en TODO el sitio de una sola vez.
 */

export const brand = {
  name: "Coldevia",
  tagline: "Construyendo el futuro, una solución a la vez.",
  // Col (Colombia) + dev (desarrollo) + IA (inteligencia artificial)
  meaning: {
    col: "Colombia, el origen",
    dev: "desarrollo, lo que hacemos hoy",
    ia: "inteligencia artificial, hacia dónde vamos",
  },
  logoOnDark: "/assets/coldevia/logo-dark-bg.png",
  logoOnLight: "/assets/coldevia/logo-light-bg.png",
};

export const contact = {
  email: "contacto@coldevia.com",
  // TODO(cristhian): reemplazar el número de USA cuando esté disponible.
  phones: [
    { country: "Colombia", code: "co", flag: "/assets/flags/Flag_of_Colombia.svg", number: "+57 320 829 1613" },
    { country: "Argentina", code: "ar", flag: "/assets/flags/Flag_of_Argentina.svg", number: "+54 9 11 6117-3398" },
    { country: "Estados Unidos", code: "us", flag: "/assets/flags/Flag_of_the_United_States.svg", number: "+1 (XXX) XXX-XXXX" },
  ],
  // Número usado para el botón flotante de WhatsApp (solo dígitos).
  whatsapp: "573208291613",
};

export const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/proyectos" },
  { label: "Acerca de", to: "/acerca-de" },
];

// TODO(cristhian): reemplazar "#" por las URLs reales de cada red.
export const socials = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "X / Twitter", href: "#", icon: "x" },
  { label: "GitHub", href: "#", icon: "github" },
];

/** Barra de métricas debajo del hero. */
export const heroStats = [
  { value: "+25", label: "Proyectos entregados" },
  { value: "100%", label: "Diseño responsive" },
  { value: "24/7", label: "Soporte continuo" },
  { value: "3", label: "Países atendidos" },
];

