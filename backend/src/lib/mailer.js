import { Resend } from "resend";
import nodemailer from "nodemailer";
import { env } from "./env.js";

/**
 * Envío de la notificación por correo.
 *
 * Soporta dos proveedores y elige solo:
 *   1. Resend, si hay `RESEND_API_KEY`. Es la opción recomendada: una sola
 *      clave, sin contraseñas de aplicación ni puertos SMTP bloqueados
 *      (Render bloquea el 25 y el 587 saliente en el plan gratuito).
 *   2. SMTP vía Nodemailer, si hay `SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`.
 *      Útil si preferís usar tu propia casilla (Gmail con contraseña de
 *      aplicación, Zoho, el correo del hosting, etc.).
 *
 * Si no hay ninguno configurado, la función no falla: registra el envío en la
 * consola y devuelve `{ enviado: false }`. Así, un problema de correo nunca
 * hace que se pierda un contacto que ya quedó guardado en la base.
 */

let resend = null;
let transporter = null;

function proveedorActivo() {
  if (env.resendApiKey) return "resend";
  if (env.smtp.host && env.smtp.user && env.smtp.pass) return "smtp";
  return "ninguno";
}

/** Escapa texto del usuario antes de meterlo en el HTML del correo. */
function escaparHtml(texto = "") {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function construirMensaje(datos, id) {
  const fecha = new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" });

  const filas = [
    ["Nombre", datos.nombre],
    ["Empresa", datos.empresa || "—"],
    ["Correo", datos.correo],
    ["Teléfono", datos.telefono || "—"],
  ];

  const texto = [
    "Nuevo mensaje desde el formulario de coldevia.com",
    "",
    ...filas.map(([etiqueta, valor]) => `${etiqueta}: ${valor}`),
    "",
    "Mensaje:",
    datos.mensaje,
    "",
    `Recibido: ${fecha} (hora de Colombia)`,
    id ? `Registro #${id}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
  <div style="margin:0;padding:24px;background:#050d1f;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#0b1836;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;">
      <div style="padding:24px 28px;background:linear-gradient(135deg,#102552,#2a57a4);">
        <p style="margin:0;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#7a91e3;">Coldevia</p>
        <h1 style="margin:6px 0 0;font-size:20px;color:#f0f0fa;">Nuevo mensaje de contacto</h1>
      </div>

      <table role="presentation" style="width:100%;border-collapse:collapse;">
        ${filas
          .map(
            ([etiqueta, valor]) => `
        <tr>
          <td style="padding:14px 28px;border-bottom:1px solid rgba(255,255,255,.06);color:#7a91e3;font-size:13px;width:110px;vertical-align:top;">${etiqueta}</td>
          <td style="padding:14px 28px 14px 0;border-bottom:1px solid rgba(255,255,255,.06);color:#f0f0fa;font-size:14px;">${escaparHtml(valor)}</td>
        </tr>`
          )
          .join("")}
      </table>

      <div style="padding:20px 28px;">
        <p style="margin:0 0 8px;color:#7a91e3;font-size:13px;">Mensaje</p>
        <p style="margin:0;color:#f0f0fa;font-size:14px;line-height:1.65;white-space:pre-wrap;">${escaparHtml(datos.mensaje)}</p>
      </div>

      <div style="padding:16px 28px;background:rgba(255,255,255,.03);color:rgba(240,240,250,.45);font-size:12px;">
        Recibido el ${fecha} (hora de Colombia)${id ? ` · Registro #${id}` : ""}
      </div>
    </div>
  </div>`;

  return { texto, html };
}

/**
 * Envía la notificación. Nunca lanza: devuelve el resultado para que la ruta
 * decida qué contarle al usuario.
 */
export async function enviarNotificacion(datos, id) {
  const proveedor = proveedorActivo();
  const { texto, html } = construirMensaje(datos, id);
  const asunto = `Nuevo contacto: ${datos.nombre}${datos.empresa ? ` (${datos.empresa})` : ""}`;

  if (proveedor === "ninguno") {
    console.warn("[mail] Sin proveedor configurado. Contenido del mensaje:\n" + texto);
    return { enviado: false, proveedor };
  }

  try {
    if (proveedor === "resend") {
      resend ??= new Resend(env.resendApiKey);
      const { error } = await resend.emails.send({
        from: env.fromEmail,
        to: env.notifyEmail,
        subject: asunto,
        text: texto,
        html,
        // Responder el correo escribe directo a quien completó el formulario.
        replyTo: datos.correo,
      });
      if (error) throw new Error(error.message ?? JSON.stringify(error));
    } else {
      transporter ??= nodemailer.createTransport({
        host: env.smtp.host,
        port: env.smtp.port,
        secure: env.smtp.secure,
        auth: { user: env.smtp.user, pass: env.smtp.pass },
      });
      await transporter.sendMail({
        from: env.fromEmail,
        to: env.notifyEmail,
        subject: asunto,
        text: texto,
        html,
        replyTo: datos.correo,
      });
    }

    return { enviado: true, proveedor };
  } catch (error) {
    // El contacto ya está guardado en la base: un fallo de correo no se
    // convierte en un error para quien completó el formulario.
    console.error(`[mail] Falló el envío con ${proveedor}:`, error.message);
    return { enviado: false, proveedor, error: error.message };
  }
}
