/**
 * PLANES DE PRECIOS
 * =================
 * Los precios de abajo son PLACEHOLDERS.
 *
 * >>> ANTES DE PUBLICAR: reemplazar `price`, `priceNote` y `deliveryTime`
 * >>> de cada plan por los montos y plazos reales.
 *
 * `billing` controla el toggle mensual/anual. Hoy los tres planes son
 * pago único, así que el toggle está desactivado por defecto
 * (ver `pricingConfig.showBillingToggle`).
 */

export const pricingConfig = {
  // Poner en `true` cuando existan precios recurrentes que mostrar.
  showBillingToggle: false,
  currencyNote: "Precios en pesos colombianos (COP). Consúltanos por USD o ARS.",
};

export const plans = [
  {
    id: "esencial",
    name: "Plan Esencial",
    tagline: "Landing page o sitio de presentación",
    description:
      "Ideal para lanzar tu presencia digital rápido, con una página que comunique bien y capte contactos.",
    price: "Desde $XXX.000",
    priceNote: "COP · pago único",
    highlighted: false,
    ctaLabel: "Quiero este plan",
    features: [
      "1 página (landing) o hasta 3 secciones",
      "Diseño responsive en todos los dispositivos",
      "Formulario de contacto conectado a tu correo",
      "SEO básico (títulos, metadatos, velocidad)",
      "1 ronda de revisiones",
      "Entrega en X días hábiles",
    ],
  },
  {
    id: "profesional",
    name: "Plan Profesional",
    tagline: "Sitio multi-página o tienda pequeña",
    description:
      "El equilibrio entre alcance y presupuesto: más páginas, catálogo y las integraciones que realmente usas.",
    price: "Desde $X.XXX.000",
    priceNote: "COP · pago único",
    highlighted: true,
    badge: "Más popular",
    ctaLabel: "Quiero este plan",
    features: [
      "Hasta 6 páginas o tienda con catálogo (~30 productos)",
      "Panel de administración simple",
      "Pasarela de pago integrada (si es tienda)",
      "SEO técnico completo",
      "Integración con redes sociales y WhatsApp",
      "2 rondas de revisiones",
      "Soporte post-lanzamiento (X semanas)",
    ],
  },
  {
    id: "empresarial",
    name: "Plan Empresarial",
    tagline: "Tienda virtual completa o plataforma a medida",
    description:
      "Para operaciones que necesitan crecer sin límites, con automatización e inteligencia artificial incluidas.",
    price: "Cotización personalizada",
    priceNote: "Según alcance del proyecto",
    highlighted: false,
    ctaLabel: "Solicitar cotización",
    features: [
      "Páginas y productos ilimitados",
      "Panel de administración avanzado",
      "Automatizaciones o agente de IA / chatbot básico",
      "Infraestructura y hosting optimizado",
      "SEO avanzado + analítica",
      "Rondas de revisión ilimitadas durante el proyecto",
      "Soporte prioritario continuo",
    ],
  },
];

/**
 * Prestaciones que aplican por igual a los tres planes.
 * Se renderizan DENTRO de cada tarjeta, bajo el subtítulo "Incluido en todos
 * los planes", no como un bloque suelto debajo de la sección.
 */
export const pricingIncludes = [
  "Dominio y hosting asesorados (o gestionados por nosotros)",
  "Certificado SSL y sitio seguro por HTTPS",
  "Capacitación para que puedas administrar tu contenido",
  "Código propio: el proyecto queda a tu nombre",
];
