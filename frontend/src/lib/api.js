/**
 * Cliente HTTP del backend de Coldevia.
 *
 * En desarrollo, `VITE_API_URL` puede quedar vacío: Vite proxea `/api` hacia
 * `http://localhost:4000` (ver vite.config.js).
 *
 * En producción (frontend en Hostinger, backend en Render) hay que definir
 * VITE_API_URL=https://tu-backend.onrender.com en el archivo `.env`
 * ANTES de correr `npm run build`.
 */
const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

/**
 * Envía el formulario de contacto.
 * Devuelve `{ ok: true }` o `{ ok: false, message, fieldErrors }`.
 */
export async function enviarContacto(datos) {
  try {
    const response = await fetch(`${API_URL}/api/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    // El backend siempre responde JSON, incluso ante un error de validación.
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        message:
          payload.message ??
          "No pudimos enviar tu mensaje. Probá de nuevo en unos minutos.",
        fieldErrors: payload.errors ?? {},
      };
    }

    return { ok: true, message: payload.message ?? "¡Mensaje enviado!" };
  } catch {
    // Error de red: el backend no responde o no hay conexión.
    return {
      ok: false,
      message:
        "No pudimos conectarnos con el servidor. Revisa tu conexión o escríbenos por WhatsApp.",
      fieldErrors: {},
    };
  }
}
