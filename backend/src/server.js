import { crearApp } from "./app.js";
import { env, revisarConfiguracion } from "./lib/env.js";
import { cerrarPool, inicializarEsquema } from "./lib/db.js";

/** Punto de entrada del servidor. */

const { hayDb } = revisarConfiguracion();

// Creamos la tabla al arrancar si hay base configurada. Es idempotente, así
// que en Render el primer despliegue deja el esquema listo sin pasos manuales.
if (hayDb) {
  try {
    await inicializarEsquema();
    console.log("[db] Esquema verificado (tabla contact_submissions lista).");
  } catch (error) {
    console.error("[db] No se pudo verificar el esquema:", error.message);
  }
}

const app = crearApp();

const server = app.listen(env.port, () => {
  console.log(`[server] Coldevia API escuchando en http://localhost:${env.port}`);
  console.log(`[server] Orígenes permitidos: ${env.allowedOrigins.join(", ")}`);
});

/** Cierre ordenado: Render envía SIGTERM al redeplegar. */
for (const señal of ["SIGTERM", "SIGINT"]) {
  process.on(señal, () => {
    console.log(`[server] ${señal} recibida, cerrando…`);
    server.close(async () => {
      await cerrarPool();
      process.exit(0);
    });
  });
}
