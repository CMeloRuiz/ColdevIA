# Coldevia — Backend

API en Node.js + Express que recibe el formulario de contacto del sitio, lo guarda en
PostgreSQL y te avisa por correo.

---

## Qué hace, paso a paso

1. El frontend hace `POST /api/contacto` con `{ nombre, empresa, correo, telefono, mensaje }`.
2. El backend **valida** los datos (con Zod) y descarta bots mediante un campo trampa.
3. **Guarda** el envío en la tabla `contact_submissions`.
4. **Envía** un correo de notificación a `NOTIFY_EMAIL`.
5. Responde `201` con un mensaje de éxito que el formulario muestra en pantalla.

El orden importa: primero se guarda y después se notifica. Si el correo falla, el contacto
**ya quedó registrado en la base** y el visitante igual ve la confirmación. Un problema del
proveedor de correo nunca se traduce en un cliente perdido.

---

## Elecciones técnicas (y por qué)

**Base de datos: PostgreSQL con el driver `pg` y SQL plano.**
Hay una sola tabla, así que un ORM (Prisma, Drizzle) agregaría dependencias, un paso de
generación y migraciones para muy poco. Como hablamos Postgres estándar, la misma
`DATABASE_URL` sirve para **Neon**, **Supabase** o el **Postgres de Render** sin tocar una
línea de código. La recomendación es Neon: el plan gratuito no expira y da una cadena de
conexión directa.

**Correo: Resend, con SMTP como alternativa.**
Resend necesita una sola clave de API y funciona por HTTPS. Eso importa porque **Render
bloquea los puertos SMTP salientes en el plan gratuito**, así que Gmail vía SMTP puede
fallar justo en producción. Aun así dejamos Nodemailer implementado por si preferís usar
tu propia casilla: el backend elige solo según qué variables encuentre.

---

## Puesta en marcha local

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

El servidor arranca en `http://localhost:4000` aunque el `.env` esté vacío. En ese caso
avisa por consola qué falta y sigue funcionando: valida los formularios y responde bien,
pero no guarda ni envía correos. Comprobalo con:

```bash
curl http://localhost:4000/api/health
```

---

## Paso 1 — Base de datos (Neon)

> **Por qué este paso lo hacés vos:** crear la cuenta de Neon requiere registrarse con tus
> datos y definir una contraseña. Eso es tuyo, no puedo hacerlo en tu nombre. Todo lo demás
> —esquema, conexión, inserción, verificación— ya está resuelto en el código: cuando pegues
> la connection string, un solo comando confirma que funciona.

### 1.1 · Crear el proyecto

1. Entrá a [neon.tech](https://neon.tech) y creá una cuenta. El plan **Free** alcanza de
   sobra para un formulario de contacto (0.5 GB de almacenamiento y no expira).
2. En el panel, **Create project** (o **New project**).
3. Completá así:

   | Campo | Valor |
   |---|---|
   | Project name | `coldevia` |
   | Postgres version | la que venga por defecto (17 o superior) |
   | Cloud provider | AWS |
   | Region | **AWS US East (N. Virginia)** — la más cercana a Colombia |
   | Database name | `coldevia` (o dejá `neondb`) |

4. **Create project**.

### 1.2 · Copiar la connection string

Al terminar, Neon abre un cuadro **Connection string**. Elegí:

- **Connection type:** `Parameters only` → no; dejá **`Connection string`**
- **Role:** el que creó por defecto (`neondb_owner` o similar)
- **Database:** `coldevia`
- Marcá la casilla **Pooled connection** ✅ (importante: en Render el servicio abre y
  cierra conexiones seguido, y el pooler lo maneja mejor)

Copiá la cadena. Se ve así:

```
postgresql://neondb_owner:AbCdEf123456@ep-cool-name-a1b2c3-pooler.us-east-1.aws.neon.tech/coldevia?sslmode=require
```

> Si cerraste el cuadro: **Dashboard → tu proyecto → Connect** (botón arriba a la derecha).
> La contraseña solo se muestra al crearla; si la perdés, **Roles → ⋯ → Reset password**.

### 1.3 · Configurar el backend

Pegala en `backend/.env`:

```
DATABASE_URL=postgresql://neondb_owner:...@ep-....neon.tech/coldevia?sslmode=require
DATABASE_SSL=true
```

### 1.4 · Crear la tabla

```bash
npm run db:init
```

Tenés que ver `✓ Tabla contact_submissions lista.`

> El servidor también verifica el esquema cada vez que arranca, así que en Render la tabla
> se crea sola en el primer despliegue. `db:init` sirve para probar la conexión aparte.

### 1.5 · Verificar que todo funciona de punta a punta

Este es el paso que confirma que la integración está viva. **Después de configurar también
el correo (paso 2)**, corré:

```bash
npm run db:verify
```

El comando recorre exactamente el mismo camino que un envío del formulario: conecta a Neon,
crea la tabla si falta, **inserta una fila**, la **lee de vuelta**, **envía el correo** de
notificación a tu casilla y borra la fila de prueba. Salida esperada:

```
Verificando la integración de Coldevia

  Base de datos : ep-cool-name-a1b2c3-pooler.us-east-1.aws.neon.tech
  Correo        : Resend
  Notificar a   : cristhianmelo.ruiz@gmail.com

  ✓ Conexión con PostgreSQL establecida
  ✓ Tabla contact_submissions lista — id, nombre, empresa, correo, telefono, mensaje, ip, user_agent, created_at
  ✓ Fila insertada — id = 1
  ✓ La fila se lee de vuelta con los mismos datos

  ── Fila guardada en la base ─────────────────────────────
  { "id": "1", "nombre": "Prueba de integración", ... }
  ─────────────────────────────────────────────────────────

  ✓ Correo de notificación enviado a cristhianmelo.ruiz@gmail.com — vía resend
  ✓ Fila de prueba eliminada — usá --conservar para dejarla

✅ Todo listo. El formulario del sitio va a guardar y notificar correctamente.
```

Si querés ver la fila en el panel de Neon en lugar de que se borre:

```bash
npm run db:verify -- --conservar
```

Después, en Neon: **SQL Editor** → `SELECT * FROM contact_submissions;`

### Si preferís Supabase

Funciona igual. En **Project Settings → Database → Connection string → URI**, copiá la
cadena y usala como `DATABASE_URL`. Elegí la del **connection pooler** (puerto `6543`)
si vas a desplegar en Render, que abre y cierra conexiones seguido.

### La tabla

```sql
CREATE TABLE contact_submissions (
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
```

`ip` y `user_agent` se guardan para poder rastrear spam si alguna vez hace falta.

### Ver los mensajes recibidos

Desde la terminal, con el `.env` configurado:

```bash
npm run db:latest
```

Muestra los últimos 10. Para ver más, `npm run db:latest -- 25`.

También podés consultarlos desde el editor SQL de Neon o Supabase:

```sql
SELECT nombre, empresa, correo, telefono, mensaje, created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 20;
```

---

## Paso 2 — Correo

### Opción A: Resend (recomendada)

1. Creá una cuenta en [resend.com](https://resend.com). El plan gratuito da 3.000 correos
   por mes y 100 por día — de sobra para un formulario de contacto.
2. **API Keys → Create API Key**, permiso *Sending access*. Copiá la clave (`re_...`);
   solo se muestra una vez.
3. En `.env`:

   ```
   RESEND_API_KEY=re_tu_clave_aca
   NOTIFY_EMAIL=cristhianmelo.ruiz@gmail.com
   FROM_EMAIL=Coldevia <onboarding@resend.dev>
   ```

4. **Para probar ya mismo** podés dejar `onboarding@resend.dev` como remitente. Con ese
   dominio de prueba, Resend **solo permite enviar a la casilla con la que te registraste**.
5. **Para producción**, verificá tu dominio: **Domains → Add Domain** → `coldevia.com`.
   Resend te da unos registros DNS (SPF, DKIM) para cargar en tu proveedor de dominio.
   Cuando quede verificado, cambiá el remitente:

   ```
   FROM_EMAIL=Coldevia <contacto@coldevia.com>
   ```

   Esto además evita que los correos caigan en spam.

### Opción B: SMTP con tu propia casilla

Se usa solo si `RESEND_API_KEY` está vacío. Con Gmail necesitás una **contraseña de
aplicación** (no sirve la de tu cuenta):

1. Activá la verificación en dos pasos en tu cuenta de Google.
2. Andá a [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) y
   generá una contraseña para "Correo".
3. En `.env`:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=cristhianmelo.ruiz@gmail.com
   SMTP_PASS=la_contraseña_de_aplicacion
   FROM_EMAIL=Coldevia <cristhianmelo.ruiz@gmail.com>
   ```

> ⚠️ Recordá que **Render bloquea el SMTP saliente en el plan gratuito**. Si desplegás
> ahí, usá Resend.

---

## Paso 3 — Desplegar en Render

1. Subí el repositorio a GitHub.
2. En [render.com](https://render.com): **New → Web Service** y conectá el repositorio.
3. Configuración:

   | Campo | Valor |
   |---|---|
   | Root Directory | `backend` |
   | Environment | `Node` |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Health Check Path | `/api/health` |

4. En **Environment → Add Environment Variable**, cargá:

   | Variable | Valor |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | la cadena de conexión de Neon |
   | `DATABASE_SSL` | `true` |
   | `ALLOWED_ORIGINS` | `https://coldevia.com,https://www.coldevia.com` |
   | `NOTIFY_EMAIL` | `cristhianmelo.ruiz@gmail.com` |
   | `FROM_EMAIL` | `Coldevia <contacto@coldevia.com>` |
   | `RESEND_API_KEY` | tu clave de Resend |

   > No definas `PORT`: Render la inyecta sola y el código la lee.

5. Desplegá y verificá:

   ```bash
   curl https://tu-backend.onrender.com/api/health
   ```

   Tenés que ver `"baseDeDatos":"conectada"` y `"correo":"resend"`.

6. Copiá la URL del servicio y ponela en `frontend/.env` como `VITE_API_URL`, después
   volvé a construir el frontend.

> **Ojo con el plan gratuito de Render:** el servicio se duerme tras 15 minutos sin uso y
> el primer pedido después tarda ~30-50 segundos en responder. Para un formulario de
> contacto es tolerable, pero si querés respuesta inmediata hay que pasar al plan pago.

---

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor con reinicio automático (nodemon) |
| `npm start` | Servidor en modo producción |
| `npm run db:init` | Crea la tabla y verifica la conexión |
| `npm run db:verify` | **Prueba la integración completa**: inserta, lee y envía el correo |
| `npm run db:latest` | Lista los últimos mensajes recibidos |

---

## Estado de la verificación

El camino completo —formulario en el navegador → Express → driver `pg` → PostgreSQL →
correo— está probado de punta a punta contra un **PostgreSQL real** y un servidor de correo
que captura el mensaje saliente. Lo que quedó comprobado:

- La tabla `contact_submissions` se crea sola al arrancar el servidor, con las nueve columnas.
- La fila queda escrita con todos los campos y `created_at` completado por la base.
- El correo sale **después** de guardar, dirigido a `cristhianmelo.ruiz@gmail.com`, con el
  nombre, el correo y el teléfono de quien escribió, y con `Reply-To` apuntando a esa persona.
- Ocurren las dos cosas: guardar **y** notificar, no una en lugar de la otra.
- Varios envíos se acumulan como filas separadas.

Lo único que falta es apuntar `DATABASE_URL` a **tu** proyecto de Neon, porque crear esa
cuenta necesita tus credenciales. `npm run db:verify` repite exactamente esa prueba contra
tu base en un solo comando.

---

## Variables de entorno

Están todas documentadas en [`.env.example`](.env.example). Resumen:

| Variable | Obligatoria | Para qué sirve |
|---|---|---|
| `PORT` | no | Puerto del servidor (por defecto `4000`; Render la define sola) |
| `NODE_ENV` | no | `development` o `production` |
| `ALLOWED_ORIGINS` | sí en prod | Dominios autorizados a llamar la API, separados por coma |
| `DATABASE_URL` | sí | Cadena de conexión de PostgreSQL |
| `DATABASE_SSL` | no | `true` salvo que uses un Postgres local sin TLS |
| `NOTIFY_EMAIL` | sí | A dónde llegan las notificaciones |
| `FROM_EMAIL` | sí | Remitente del correo |
| `RESEND_API_KEY` | una de las dos | Activa el envío por Resend |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` / `SMTP_USER` / `SMTP_PASS` | una de las dos | Activa el envío por SMTP |

**El archivo `.env` nunca se sube al repositorio** (está en `.gitignore`). En producción,
las variables se cargan desde el panel de Render.

---

## Endpoints

### `GET /api/health`

Estado del servicio. Es el health check de Render.

```json
{
  "ok": true,
  "servicio": "coldevia-backend",
  "entorno": "production",
  "baseDeDatos": "conectada",
  "correo": "resend"
}
```

### `POST /api/contacto`

```json
{
  "nombre": "Cristhian Melo",
  "empresa": "Coldevia",
  "correo": "cristhian@ejemplo.com",
  "telefono": "+57 320 829 1613",
  "mensaje": "Quiero una tienda virtual para mi negocio."
}
```

Solo `nombre`, `correo` y `mensaje` son obligatorios.

**Éxito (`201`)**

```json
{ "ok": true, "message": "¡Mensaje enviado! Te respondemos a la brevedad.", "id": 12 }
```

**Datos inválidos (`400`)** — el frontend muestra cada mensaje bajo su campo:

```json
{
  "ok": false,
  "message": "Revisá los datos del formulario.",
  "errors": { "correo": "Revisá el formato del correo." }
}
```

**Demasiados envíos (`429`)** y **origen no autorizado (`403`)** también devuelven
`{ ok: false, message }`.

---

## Protecciones incluidas

- **Rate limiting**: máximo 5 envíos cada 15 minutos por IP.
- **Honeypot**: un campo `website` oculto en el formulario. Si viene completado, el envío
  se descarta en silencio y se responde `200` como si todo hubiera salido bien, para no
  avisarle al bot que fue detectado.
- **CORS por lista blanca**: solo responden los orígenes de `ALLOWED_ORIGINS`.
- **Validación estricta** con Zod, con límites de longitud en todos los campos.
- **Cuerpo limitado a 64 KB**.
- **Escapado de HTML** en el correo, para que el contenido enviado por un visitante no
  pueda inyectar marcado.
- **`trust proxy`** activado, para que el rate limit vea la IP real detrás del proxy de Render.

---

## Problemas frecuentes

| Síntoma | Causa probable |
|---|---|
| `"baseDeDatos":"no disponible"` | `DATABASE_URL` vacía o mal copiada. Revisá que termine en `?sslmode=require`. |
| `self signed certificate` | Poné `DATABASE_SSL=true`. |
| El formulario falla con error de CORS | Falta el dominio del frontend en `ALLOWED_ORIGINS`. |
| No llegan los correos | Con `onboarding@resend.dev` solo podés enviarte a vos. Verificá tu dominio en Resend. |
| `"correo":"sin configurar"` | Falta `RESEND_API_KEY` o el bloque SMTP completo. |
| Los correos caen en spam | Verificá el dominio en Resend y cargá los registros SPF/DKIM. |
| La primera consulta tarda ~40 s | El plan gratuito de Render duerme el servicio. Es normal. |
