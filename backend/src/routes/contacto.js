import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { guardarEnvio } from "../lib/db.js";
import { enviarNotificacion } from "../lib/mailer.js";

/**
 * POST /api/contacto
 *
 * Flujo: validar -> guardar en la base -> notificar por correo -> responder.
 * El correo se envía después de guardar, y su fallo no invalida la respuesta:
 * lo importante es no perder el contacto.
 */

const router = Router();

/** Máximo 5 envíos cada 15 minutos por IP. */
const limitador = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Recibimos varios mensajes desde tu conexión. Probá de nuevo en unos minutos.",
  },
});

const esquema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre es muy corto.")
    .max(120, "El nombre es demasiado largo."),
  empresa: z.string().trim().max(160, "El nombre de la empresa es demasiado largo.").optional().default(""),
  correo: z
    .string()
    .trim()
    .min(1, "Necesitamos un correo para responderte.")
    .max(180, "El correo es demasiado largo.")
    .email("Revisá el formato del correo."),
  telefono: z
    .string()
    .trim()
    .max(30, "El teléfono es demasiado largo.")
    .regex(/^[\d\s()+-]*$/, "Revisá el número de teléfono.")
    .optional()
    .default(""),
  mensaje: z
    .string()
    .trim()
    .min(10, "Contanos un poco más: al menos 10 caracteres.")
    .max(5000, "El mensaje es demasiado largo."),
  // Campo trampa para bots: los humanos nunca lo ven ni lo completan.
  // Acá se acepta cualquier valor a propósito; el descarte se hace más abajo
  // respondiendo 200, para no revelarle al bot que existe la trampa.
  website: z.string().max(500).optional().default(""),
});

router.post("/contacto", limitador, async (req, res) => {
  const resultado = esquema.safeParse(req.body ?? {});

  if (!resultado.success) {
    // Convertimos los errores de Zod a { campo: "mensaje" }, que es lo que
    // el formulario del frontend sabe mostrar debajo de cada input.
    const errors = {};
    for (const issue of resultado.error.issues) {
      const campo = issue.path[0];
      if (campo && !errors[campo]) errors[campo] = issue.message;
    }

    return res.status(400).json({
      ok: false,
      message: "Revisá los datos del formulario.",
      errors,
    });
  }

  const datos = resultado.data;

  // Honeypot completado = bot. Respondemos como si todo hubiera salido bien
  // para no darle pistas, pero no guardamos ni enviamos nada.
  if (datos.website) {
    return res.status(200).json({ ok: true, message: "Mensaje recibido." });
  }

  const contexto = {
    ...datos,
    ip: req.ip,
    userAgent: req.get("user-agent") ?? "",
  };

  let registro = null;
  try {
    registro = await guardarEnvio(contexto);
    if (!registro) {
      console.warn("[contacto] Sin base de datos configurada: el envío no se guardó.");
    }
  } catch (error) {
    console.error("[contacto] No se pudo guardar en la base:", error.message);
    return res.status(500).json({
      ok: false,
      message:
        "Tuvimos un problema al registrar tu mensaje. Probá de nuevo o escribinos por WhatsApp.",
    });
  }

  const correo = await enviarNotificacion(contexto, registro?.id);

  return res.status(201).json({
    ok: true,
    message: "¡Mensaje enviado! Te respondemos a la brevedad.",
    id: registro?.id ?? null,
    // Útil para depurar en desarrollo; no expone nada sensible.
    notificado: correo.enviado,
  });
});

export default router;
