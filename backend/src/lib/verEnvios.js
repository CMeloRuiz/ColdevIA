import { cerrarPool, ultimosEnvios } from "./db.js";
import { env } from "./env.js";

/**
 * Muestra por consola los últimos mensajes recibidos: `npm run db:latest`.
 * Sirve para revisar la bandeja sin abrir el panel de Neon o Supabase.
 *
 * Uso: npm run db:latest        (últimos 10)
 *      npm run db:latest -- 25  (últimos 25)
 */

if (!env.databaseUrl) {
  console.error("Falta DATABASE_URL. Completá el archivo .env.");
  process.exit(1);
}

const limite = Number(process.argv[2] ?? 10);

try {
  const envios = await ultimosEnvios(Number.isFinite(limite) ? limite : 10);

  if (envios.length === 0) {
    console.log("Todavía no hay mensajes recibidos.");
  } else {
    for (const envio of envios) {
      const fecha = new Date(envio.created_at).toLocaleString("es-CO", {
        timeZone: "America/Bogota",
      });
      console.log("─".repeat(64));
      console.log(`#${envio.id} · ${fecha}`);
      console.log(`${envio.nombre}${envio.empresa ? ` · ${envio.empresa}` : ""}`);
      console.log(`${envio.correo}${envio.telefono ? ` · ${envio.telefono}` : ""}`);
      console.log("");
      console.log(envio.mensaje);
    }
    console.log("─".repeat(64));
    console.log(`${envios.length} mensaje(s).`);
  }
} catch (error) {
  console.error("No se pudieron leer los mensajes:", error.message);
  process.exitCode = 1;
} finally {
  await cerrarPool();
}
