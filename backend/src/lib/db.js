import pg from "pg";
import { env } from "./env.js";
import { CREAR_INDICE, CREAR_TABLA, INSERTAR_ENVIO, ULTIMOS_ENVIOS } from "./sql.js";

/**
 * Conexión a PostgreSQL.
 *
 * Usamos el driver `pg` con SQL plano en lugar de un ORM: el backend tiene
 * una sola tabla, así que un ORM sumaría dependencias sin aportar nada.
 *
 * Como hablamos Postgres estándar, la misma `DATABASE_URL` sirve para Neon,
 * Supabase o el Postgres gestionado de Render, sin tocar el código.
 */

const { Pool } = pg;

let pool = null;

export function obtenerPool() {
  if (!env.databaseUrl) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: env.databaseUrl,
      // Los Postgres gestionados usan certificados propios; `rejectUnauthorized:false`
      // acepta la cadena sin exigir el CA local.
      ssl: env.databaseSsl ? { rejectUnauthorized: false } : false,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });

    // Un error en un cliente ocioso no debe tumbar el proceso.
    pool.on("error", (error) => {
      console.error("[db] Error en el pool de conexiones:", error.message);
    });
  }

  return pool;
}

/** Crea la tabla y el índice si todavía no existen. Es idempotente. */
export async function inicializarEsquema() {
  const pool = obtenerPool();
  if (!pool) throw new Error("DATABASE_URL no está configurada.");

  await pool.query(CREAR_TABLA);
  await pool.query(CREAR_INDICE);
}

/** Guarda un envío del formulario y devuelve la fila creada. */
export async function guardarEnvio(datos) {
  const pool = obtenerPool();
  if (!pool) return null;

  const { rows } = await pool.query(INSERTAR_ENVIO, [
      datos.nombre,
      datos.empresa || null,
      datos.correo,
      datos.telefono || null,
      datos.mensaje,
      datos.ip || null,
      datos.userAgent || null,
    ]
  );

  // El driver `pg` devuelve BIGSERIAL como string para no perder precisión
  // con números mayores a 2^53. Los ids de esta tabla nunca llegan ahí, así
  // que lo normalizamos a número y la API expone JSON limpio.
  const fila = rows[0];
  return fila ? { ...fila, id: Number(fila.id) } : null;
}

/** Devuelve los últimos envíos recibidos. Útil para revisarlos a mano. */
export async function ultimosEnvios(limite = 20) {
  const pool = obtenerPool();
  if (!pool) return [];

  const { rows } = await pool.query(ULTIMOS_ENVIOS, [limite]);
  return rows;
}

/** Comprueba que la base responde. Se usa en `/api/health`. */
export async function pingBaseDeDatos() {
  const pool = obtenerPool();
  if (!pool) return false;

  try {
    await pool.query("SELECT 1");
    return true;
  } catch (error) {
    console.error("[db] Ping fallido:", error.message);
    return false;
  }
}

export async function cerrarPool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
