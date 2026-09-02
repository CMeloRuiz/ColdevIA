import "dotenv/config";

/**
 * Configuración leída del entorno.
 *
 * Ningún valor sensible vive en el código: todo sale de `.env` en desarrollo
 * y de las variables de entorno del servicio (Render) en producción.
 * Ver `.env.example` para la lista completa.
 */

const bool = (value, porDefecto = false) =>
  value === undefined ? porDefecto : /^(1|true|yes|si|sí)$/i.test(value);

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),

  // Base de datos PostgreSQL (Neon, Supabase, Render Postgres...).
  databaseUrl: process.env.DATABASE_URL ?? "",
  // Los Postgres gestionados exigen TLS; en un Postgres local suele sobrar.
  databaseSsl: bool(process.env.DATABASE_SSL, true),

  // Orígenes permitidos por CORS, separados por coma.
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),

  // A dónde llegan las notificaciones de cada envío del formulario.
  notifyEmail: process.env.NOTIFY_EMAIL ?? "cristhianmelo.ruiz@gmail.com",
  // Remitente. Con Resend debe ser un dominio verificado (o onboarding@resend.dev
  // mientras probás). Con SMTP, normalmente la misma casilla que autentica.
  fromEmail: process.env.FROM_EMAIL ?? "Coldevia <onboarding@resend.dev>",

  // Opción A de correo: Resend (recomendada).
  resendApiKey: process.env.RESEND_API_KEY ?? "",

  // Opción B de correo: SMTP clásico vía Nodemailer.
  smtp: {
    host: process.env.SMTP_HOST ?? "",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: bool(process.env.SMTP_SECURE, false),
    user: process.env.SMTP_USER ?? "",
    pass: process.env.SMTP_PASS ?? "",
  },
};

export const esProduccion = env.nodeEnv === "production";

/**
 * Avisa por consola qué piezas faltan configurar.
 * No corta el arranque: el servidor tiene que poder levantar para que
 * `/api/health` responda aunque falte una credencial.
 */
export function revisarConfiguracion() {
  const avisos = [];

  if (!env.databaseUrl) {
    avisos.push("DATABASE_URL no está definida: los envíos no se van a guardar en la base de datos.");
  }

  const hayResend = Boolean(env.resendApiKey);
  const haySmtp = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass);
  if (!hayResend && !haySmtp) {
    avisos.push(
      "Sin RESEND_API_KEY ni credenciales SMTP: no se van a enviar correos de notificación."
    );
  }

  for (const aviso of avisos) console.warn(`[config] ${aviso}`);

  return { hayResend, haySmtp, hayDb: Boolean(env.databaseUrl) };
}
