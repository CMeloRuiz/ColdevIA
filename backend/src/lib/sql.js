/**
 * Sentencias SQL del backend, en un único lugar.
 *
 * Están separadas de `db.js` para poder validarlas sin abrir una conexión
 * real (ver la nota sobre pg-mem en el README del backend).
 */

export const CREAR_TABLA = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id          BIGSERIAL PRIMARY KEY,
    nombre      TEXT        NOT NULL,
    empresa     TEXT,
    correo      TEXT        NOT NULL,
    telefono    TEXT,
    mensaje     TEXT        NOT NULL,
    ip          TEXT,
    user_agent  TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

/** Acelera "ver los últimos envíos", que es la consulta habitual. */
export const CREAR_INDICE = `
  CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
    ON contact_submissions (created_at DESC);
`;

export const INSERTAR_ENVIO = `
  INSERT INTO contact_submissions (nombre, empresa, correo, telefono, mensaje, ip, user_agent)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING id, created_at
`;

/** Últimos envíos recibidos. Pensada para revisar la bandeja a mano. */
export const ULTIMOS_ENVIOS = `
  SELECT id, nombre, empresa, correo, telefono, mensaje, created_at
  FROM contact_submissions
  ORDER BY created_at DESC
  LIMIT $1
`;
