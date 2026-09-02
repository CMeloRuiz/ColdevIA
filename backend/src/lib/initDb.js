import { cerrarPool, inicializarEsquema } from "./db.js";
import { env } from "./env.js";

/**
 * Script manual para preparar la base de datos: `npm run db:init`.
 * El servidor también verifica el esquema al arrancar, así que esto sirve
 * sobre todo para comprobar la conexión sin levantar la API entera.
 */

if (!env.databaseUrl) {
  console.error("Falta DATABASE_URL. Copiá .env.example a .env y completá la cadena de conexión.");
  process.exit(1);
}

try {
  await inicializarEsquema();
  console.log("✓ Tabla `contact_submissions` lista.");
} catch (error) {
  console.error("✗ No se pudo preparar la base de datos:", error.message);
  process.exitCode = 1;
} finally {
  await cerrarPool();
}
