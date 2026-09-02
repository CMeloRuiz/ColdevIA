import express from "express";
import cors from "cors";
import { env, esProduccion } from "./lib/env.js";
import { pingBaseDeDatos } from "./lib/db.js";
import contactoRouter from "./routes/contacto.js";

/**
 * Aplicación Express.
 *
 * Se exporta separada del servidor (`server.js`) para poder importarla en
 * pruebas sin abrir un puerto.
 */
export function crearApp() {
  const app = express();

  // En Render la app corre detrás de un proxy: sin esto, `req.ip` sería
  // siempre la IP del proxy y el rate limit no distinguiría visitantes.
  app.set("trust proxy", 1);

  app.use(express.json({ limit: "64kb" }));

  app.use(
    cors({
      origin(origin, callback) {
        // Sin `Origin` (curl, health checks del propio Render) se permite.
        if (!origin) return callback(null, true);
        if (env.allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error(`Origen no permitido por CORS: ${origin}`));
      },
      methods: ["GET", "POST"],
    })
  );

  /** Estado del servicio. Útil para el health check de Render. */
  app.get("/api/health", async (_req, res) => {
    const baseDeDatos = await pingBaseDeDatos();
    res.json({
      ok: true,
      servicio: "coldevia-backend",
      entorno: env.nodeEnv,
      baseDeDatos: baseDeDatos ? "conectada" : "no disponible",
      correo: env.resendApiKey ? "resend" : env.smtp.host ? "smtp" : "sin configurar",
    });
  });

  app.use("/api", contactoRouter);

  app.use((_req, res) => {
    res.status(404).json({ ok: false, message: "Recurso no encontrado." });
  });

  // Manejador de errores. En producción no se filtra el detalle interno.
  app.use((error, _req, res, _next) => {
    console.error("[error]", error);
    const esCors = /CORS/i.test(error.message ?? "");
    res.status(esCors ? 403 : 500).json({
      ok: false,
      message: esCors
        ? "Origen no autorizado."
        : "Ocurrió un error inesperado. Probá de nuevo en unos minutos.",
      ...(esProduccion ? {} : { detalle: error.message }),
    });
  });

  return app;
}
