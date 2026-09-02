import { cerrarPool, guardarEnvio, inicializarEsquema, obtenerPool } from "./db.js";
import { enviarNotificacion } from "./mailer.js";
import { env } from "./env.js";

/**
 * `npm run db:verify`
 *
 * Comprueba de punta a punta que la integración funciona contra la base de
 * datos y el proveedor de correo REALES que tengas configurados en `.env`:
 *
 *   1. Conecta a PostgreSQL.
 *   2. Crea la tabla si falta.
 *   3. Inserta una fila de prueba y la vuelve a leer.
 *   4. Envía el correo de notificación.
 *   5. Borra la fila de prueba para no ensuciar la bandeja.
 *
 * Es el mismo camino que recorre un envío del formulario. Corrélo después de
 * pegar la connection string de Neon: si termina en verde, el formulario del
 * sitio va a funcionar.
 *
 * Para dejar la fila de prueba en la tabla (y verla en el panel de Neon):
 *   npm run db:verify -- --conservar
 */

const conservar = process.argv.includes("--conservar");

let fallos = 0;
const paso = (nombre, ok, detalle = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${nombre}${detalle ? ` — ${detalle}` : ""}`);
  if (!ok) fallos += 1;
};

console.log("\nVerificando la integración de Coldevia\n");

if (!env.databaseUrl) {
  console.error("  ✗ Falta DATABASE_URL en el archivo .env.");
  console.error("    Copiá .env.example a .env y pegá la connection string de Neon.\n");
  process.exit(1);
}

const anfitrion = (() => {
  try {
    return new URL(env.databaseUrl).host;
  } catch {
    return "(no se pudo leer el host)";
  }
})();

console.log(`  Base de datos : ${anfitrion}`);
console.log(
  `  Correo        : ${env.resendApiKey ? "Resend" : env.smtp.host ? `SMTP (${env.smtp.host})` : "sin configurar"}`
);
console.log(`  Notificar a   : ${env.notifyEmail}\n`);

const datosPrueba = {
  nombre: "Prueba de integración",
  empresa: "Coldevia",
  correo: "verificacion@coldevia.com",
  telefono: "+57 000 000 0000",
  mensaje:
    "Fila generada por `npm run db:verify`. Si la ves en la tabla, la conexión con la base de datos funciona.",
  ip: "127.0.0.1",
  userAgent: "coldevia-db-verify",
};

let idCreado = null;

try {
  /* 1 · Conexión */
  const pool = obtenerPool();
  await pool.query("SELECT 1");
  paso("Conexión con PostgreSQL establecida", true);

  /* 2 · Esquema */
  await inicializarEsquema();
  const { rows: columnas } = await pool.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_name = 'contact_submissions' ORDER BY ordinal_position`
  );
  const presentes = columnas.map((c) => c.column_name);
  const requeridas = ["id", "nombre", "empresa", "correo", "telefono", "mensaje", "created_at"];
  const faltantes = requeridas.filter((c) => !presentes.includes(c));
  paso(
    "Tabla contact_submissions lista",
    faltantes.length === 0,
    faltantes.length ? `faltan: ${faltantes.join(", ")}` : presentes.join(", ")
  );

  /* 3 · Escritura y lectura */
  const creado = await guardarEnvio(datosPrueba);
  idCreado = creado?.id ?? null;
  paso("Fila insertada", Boolean(idCreado), `id = ${idCreado}`);

  const { rows: leidas } = await pool.query(
    `SELECT id, nombre, empresa, correo, telefono, mensaje, created_at
     FROM contact_submissions WHERE id = $1`,
    [idCreado]
  );
  const fila = leidas[0];
  paso("La fila se lee de vuelta con los mismos datos", fila?.nombre === datosPrueba.nombre);

  console.log("\n  ── Fila guardada en la base ─────────────────────────────");
  console.log(
    JSON.stringify({ ...fila, created_at: fila?.created_at?.toISOString?.() }, null, 2)
      .split("\n")
      .map((linea) => `  ${linea}`)
      .join("\n")
  );
  console.log("  ─────────────────────────────────────────────────────────\n");

  /* 4 · Correo */
  const correo = await enviarNotificacion(datosPrueba, idCreado);
  paso(
    `Correo de notificación enviado a ${env.notifyEmail}`,
    correo.enviado,
    correo.enviado ? `vía ${correo.proveedor}` : (correo.error ?? "sin proveedor configurado")
  );

  /* 5 · Limpieza */
  if (idCreado && !conservar) {
    await pool.query("DELETE FROM contact_submissions WHERE id = $1", [idCreado]);
    paso("Fila de prueba eliminada", true, "usá --conservar para dejarla");
  } else if (idCreado) {
    paso("Fila de prueba conservada en la tabla", true, `id = ${idCreado}`);
  }
} catch (error) {
  console.error(`\n  ✗ ${error.message}\n`);
  fallos += 1;
} finally {
  await cerrarPool();
}

if (fallos === 0) {
  console.log("\n✅ Todo listo. El formulario del sitio va a guardar y notificar correctamente.\n");
} else {
  console.log(`\n❌ ${fallos} paso(s) fallaron. Revisá el README del backend.\n`);
  process.exitCode = 1;
}
