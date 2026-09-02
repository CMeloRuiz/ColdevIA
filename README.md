# Coldevia

Sitio web de **Coldevia** — desarrollo web, aplicaciones móviles, SaaS, infraestructura TI,
agentes de IA y automatización.

> **Col** (Colombia, el origen) + **dev** (desarrollo, lo que hacemos hoy) + **IA**
> (inteligencia artificial, hacia dónde vamos).

---

## Estructura del proyecto

```
coldevia/
├── frontend/            React 19 + Vite + Tailwind CSS 4 + Framer Motion
│   ├── public/assets/   Logo, banderas, íconos de tecnologías, imágenes generadas
│   └── src/
│       ├── components/  Componentes por área (layout, ui, home, contact)
│       ├── data/        TODO EL CONTENIDO EDITABLE (textos, planes, proyectos…)
│       ├── pages/       Una página por ruta
│       └── lib/         Cliente HTTP del backend
│
├── backend/             Node.js + Express + PostgreSQL
│   └── src/
│       ├── routes/      POST /api/contacto
│       └── lib/         Base de datos, correo, configuración
│
├── reference-old-site/  Sitio anterior en HTML/CSS/JS, con sus assets originales
└── reference-design/    Capturas de referencia usadas para el rediseño
```

`reference-old-site/` quedó completo y abrible: conserva sus propios `assets/`, así que
puedes abrir `reference-old-site/index.html` en el navegador y ver el sitio anterior tal
cual estaba. El sitio nuevo no depende de esa carpeta — el frontend tiene sus copias en
`frontend/public/assets/`.

Ambos servicios se despliegan en **Render** con el blueprint [`render.yaml`](render.yaml).
Más adelante el frontend puede moverse a **Hostinger** sin tocar el backend.

---

## Requisitos

- **Node.js 20 o superior** (probado con 22.15)
- npm 10+

---

## Cómo levantar todo en tu máquina

Necesitas **dos terminales**, una para cada parte.

### 1. Backend

```bash
cd backend && npm install && cp .env.example .env && npm run dev
```

Queda escuchando en `http://localhost:4000`.

Sin configurar `.env`, el servidor arranca igual: valida los formularios y responde
correctamente, pero **no guarda en la base de datos ni envía correos** (avisa por consola).
Para dejarlo funcionando de punta a punta, sigue las instrucciones de
[`backend/README.md`](backend/README.md).

### 2. Frontend

```bash
cd frontend && npm install && npm run dev
```

Abre `http://localhost:5173`.

En desarrollo no hace falta configurar nada: Vite redirige todas las llamadas a `/api`
hacia `http://localhost:4000` (ver `server.proxy` en `frontend/vite.config.js`).

---

## Sistema de diseño

Todo vive en [`frontend/src/index.css`](frontend/src/index.css), en un bloque `@theme` de
Tailwind 4. Ese archivo es la fuente de verdad: los componentes no inventan colores.

### Paleta

La marca define seis colores. Trabajar solo con esos seis aplana el diseño —todo termina
siendo el mismo azul sobre el mismo azul—, así que son las **anclas** (◆) de una escala más
amplia, repartida en tres familias con roles distintos:

| Familia | Tokens | Para qué |
|---|---|---|
| **Superficies** | `abyss` `#030812` · `void` `#050d1f` · `navy-950` ◆ `#08152F` · `navy-900` ◆ `#0B1836` · `navy-850` `#0e1e45` · `navy-800` ◆ `#102552` · `navy-700` `#16336d` · `navy-600` `#1c4189` | Del casi-negro con dejo azul al navy claro. Permite que cada sección tenga su propio fondo sin salirse de la familia. |
| **Azul de marca** | `accent-700` ◆ `#1a3978` · `accent-600` `#23498c` · `accent` ◆ `#2a57a4` · `accent-400` `#3b6bc0` · `accent-300` `#5480d4` | Acciones, énfasis y luz. |
| **Neutros del logo** | `graphite` ◆ `#3a3a3a` · `graphite-600` `#55565a` · `steel` ◆ `#5b7290` · `steel-400` `#8296ae` · `steel-200` `#b3c1d1` | El gris y el azul grisáceo del ícono, ascendidos a color de pleno derecho. Son el contrapunto desaturado que rompe la monotonía azul. |
| **Luz** | `highlight` ◆ `#7a91e3` · `highlight-200` `#a3b3ec` · `highlight-100` `#cdd6f6` | Palabras destacadas, viñetas, estados activos. |
| **Tinta** | `ink` ◆ `#f0f0fa` · `ink-dim` `#c4cade` · `ink-muted` `#8b93ad` | Tres niveles de texto, no uno con opacidades sueltas. |

Nunca hay negro plano: el tono más profundo (`abyss`) conserva un dejo azul. Y el fondo no
es un degradado limpio — lleva una capa de grano (`body::after`) que le da textura de
impresión y esconde el banding de los halos.

### Tipografía

| Uso | Fuente | Por qué |
|---|---|---|
| Titulares | **Fraunces** (serif variable) | Outfit es correcta pero neutra en tamaños grandes: cualquier SaaS la usa. Fraunces aporta el contraste entre trazos gruesos y finos que da autoridad editorial, y su eje óptico ajusta el dibujo según el tamaño, así que un `h1` no es un `h3` agrandado. Su cursiva aparece una sola vez por titular, como firma. |
| Lectura e interfaz | **Outfit** | Es la voz que la marca ya tenía. Se mantiene para todo el texto corrido y los botones: garantiza continuidad. |
| Etiquetas y numerales | **JetBrains Mono** | Le da al sitio una voz técnica acorde a una empresa de software y separa visualmente "dato" de "prosa". |

### El motivo de marca

El ícono de Coldevia son tres círculos anidados con un hueco abierto a la derecha. Ese gesto
es lo único verdaderamente propio de la marca, así que se usa en todo el sitio —de fondo,
enmarcando imágenes, como viñeta de las listas, como separador de secciones y dibujándose
con el scroll. Vive en [`components/brand/Ring.jsx`](frontend/src/components/brand/Ring.jsx):

| Componente | Dónde aparece |
|---|---|
| `<Ring>` | Anillos decorativos; con `spin` giran a distinto ritmo y sentido |
| `<RingField>` | Composición grande y tenue detrás de los heroes |
| `<DrawnRing>` | Se traza a medida que entra en pantalla (usado por `RingDivider`) |
| `<RingDivider>` | Separador entre bloques de la página de Servicios |
| `<RingFrame>` | Abraza la esquina de una imagen |
| `<RingBullet>` | Viñeta de lista, en lugar del check genérico |

La idea: si alguien ve una sección sin el logo, tiene que reconocer que es de Coldevia.

### Movimiento

Cuatro gestos distintos según el contenido, en vez de un `fade + slide-up` para todo
([`components/ui/Reveal.jsx`](frontend/src/components/ui/Reveal.jsx)):

- **`Reveal`** — prosa y bloques generales. El más discreto.
- **`LineReveal`** — titulares. Cada línea sube desde detrás de una máscara.
- **`ClipReveal`** — imágenes. Se descubren con un barrido (`clip-path`), no por opacidad.
- **`Parallax`** — elementos que se mueven a otra velocidad que la página.

> ⚠️ **Cuidado al tocar `LineReveal` o `ClipReveal`.** En ambos, el observador de viewport
> va en un elemento envolvente, **nunca** en el elemento recortado. Un `IntersectionObserver`
> tiene en cuenta el recorte (`overflow:hidden` del ancestro o el `clip-path` propio), así
> que un elemento en su estado inicial reporta 0% de visibilidad: si el observador estuviera
> encima, no se dispararía nunca y el contenido quedaría invisible para siempre. Además, las
> imágenes con `loading="lazy"` dentro de un contenedor totalmente recortado tampoco empiezan
> a descargarse.

Todo respeta `prefers-reduced-motion`: si el sistema pide menos movimiento, el contenido
aparece sin animarse.

### Jerarquía

Tres niveles de superficie, y se usan por significado, no por decoración:

- `.surface-sunken` — soporte, casi se funde con el fondo (servicios secundarios, planes alternativos)
- `.surface` — contenido estándar
- `.surface-raised` — el protagonista de cada sección (plan recomendado, proyecto destacado, formulario)

En los planes, en cambio, las tres tarjetas comparten dimensiones y estructura a propósito:
la comparación entre ellas tiene que ser directa. El plan recomendado se distingue solo por
color —borde de acento, fondo con degradado, insignia y botón sólido—, nunca por tamaño.

---

## Dónde se edita cada cosa

Todo el contenido vive en `frontend/src/data/`, separado de los componentes. Para cambiar
textos no hace falta tocar JSX:

| Archivo | Qué contiene |
|---|---|
| `data/site.js` | Teléfonos, correo, redes sociales, menú, métricas del hero |
| `data/services.js` | Los 6 servicios (título, resumen, detalle, etiquetas) |
| `data/pricing.js` | **Los 3 planes y sus precios** (hoy son placeholders) |
| `data/projects.js` | Portafolio (hoy son ejemplos con imágenes generadas) |
| `data/about.js` | Historia, misión/visión, valores, línea de tiempo y **bloque del fundador** |
| `data/process.js` | Proceso de 3 y de 6 pasos, y la propuesta de valor |
| `data/technologies.js` | Logos de los carruseles de tecnologías |

### Pendientes marcados en el código

Están señalados con `TODO(cristhian)` o con un bloque `>>>` de instrucciones:

- **Precios reales** → `data/pricing.js` (`price`, `priceNote`, plazos de entrega)
- **Proyectos reales** → `data/projects.js` (pon las capturas en `public/assets/projects/`
  y cambia `placeholder: true` a `false`)
- **Foto y bio del fundador** → `data/about.js` (`founder.photo`, `founder.bio`)
- **URLs de redes sociales** → `data/site.js` (hoy apuntan a `#`)
- **Teléfono de Estados Unidos** → `data/site.js`
- **Años de la línea de tiempo** → `data/about.js`

Búscalos todos con:

```bash
grep -rn "TODO(cristhian)" frontend/src
```

---

## Comandos disponibles

### Frontend (`cd frontend`)

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitio en `dist/` |
| `npm run preview` | Sirve el `dist/` ya construido, para probarlo antes de publicar |
| `npm run lint` | Revisa el código con oxlint |

### Backend (`cd backend`)

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor con reinicio automático (nodemon) |
| `npm start` | Servidor en modo producción |
| `npm run db:init` | Crea la tabla en la base de datos y verifica la conexión |
| `npm run db:latest` | Muestra por consola los últimos mensajes recibidos |

---

## Publicar el sitio

El repositorio incluye [`render.yaml`](render.yaml), un **blueprint de Render** que define
los dos servicios de una sola vez. Es la vía recomendada para tener el sitio en línea
mientras se define el dominio definitivo en Hostinger.

| Servicio | Qué es | Carpeta | Comando de build | Se publica |
|---|---|---|---|---|
| `coldevia-api` | Backend Express (Node) | `backend` | `npm ci` | `npm start` |
| `coldevia-web` | Frontend React ya construido (sitio estático) | `frontend` | `npm ci && npm run build` | `dist/` |

### Paso a paso en Render

1. **New + → Blueprint** y conectá este repositorio. Render lee `render.yaml` y propone
   crear `coldevia-api` y `coldevia-web`.

2. Al aplicar, Render pide los valores que **no** se versionan (van marcados como
   `sync: false` porque son secretos o dependen del entorno):

   | Servicio | Variable | Valor |
   |---|---|---|
   | `coldevia-api` | `DATABASE_URL` | Cadena de conexión de Neon (la del **pooler**) |
   | `coldevia-api` | `RESEND_API_KEY` | Clave de API de Resend |
   | `coldevia-api` | `ALLOWED_ORIGINS` | Provisional: `https://coldevia-web.onrender.com` |
   | `coldevia-web` | `VITE_API_URL` | Provisional: `https://coldevia-api.onrender.com` |

   El resto ya viene definido en el blueprint: `NODE_ENV`, `DATABASE_SSL`, `NOTIFY_EMAIL`
   y `FROM_EMAIL`.

   > **No definas `PORT`.** Render la inyecta sola y el servidor la lee de `process.env`.

3. Cuando terminen los dos despliegues, Render muestra las URLs reales. Si difieren de las
   provisionales, corregí las dos variables cruzadas y **volvé a desplegar `coldevia-web`**:
   Vite fija `VITE_API_URL` en el momento del build, no en tiempo de ejecución.

4. Comprobá que la API quedó bien:

   ```bash
   curl https://coldevia-api.onrender.com/api/health
   ```

   Tiene que responder `"baseDeDatos":"conectada"` y `"correo":"resend"`.

5. Probá el formulario desde el sitio publicado y verificá que la fila llegó:

   ```bash
   cd backend && npm run db:latest
   ```

### Detalles que ya resuelve el blueprint

- **Rutas del SPA.** El sitio usa React Router, así que `coldevia-web` reescribe cualquier
  ruta a `index.html`. Sin eso, entrar directo a `/servicios` daría 404.
- **Caché de assets.** Los archivos de `/assets/*` llevan hash en el nombre, así que se
  sirven con `Cache-Control: immutable` por un año.
- **Health check.** Render vigila `/api/health` y reinicia el backend si deja de responder.
- **Versión de Node.** Fijada en `.node-version` y en `engines` de cada `package.json`.

> ⚠️ **Plan gratuito de Render:** el backend se duerme tras 15 minutos sin tráfico y el
> primer pedido después tarda ~30-50 segundos. Para un formulario de contacto es tolerable;
> si querés respuesta inmediata hay que pasar al plan pago. El sitio estático no se duerme.

### Más adelante: frontend en Hostinger

Cuando el dominio esté listo, el frontend puede moverse a Hostinger sin tocar el backend:

1. En `frontend/.env`, poné `VITE_API_URL=https://coldevia-api.onrender.com`.
2. `cd frontend && npm run build`.
3. Subí el **contenido** de `frontend/dist/` a `public_html/`.
4. Creá `public_html/.htaccess` para que las rutas del SPA funcionen:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. Agregá el dominio final a `ALLOWED_ORIGINS` en Render, o el navegador va a bloquear el
   formulario por CORS.

Los pasos de base de datos y correo están en [`backend/README.md`](backend/README.md).

---

## Imágenes

Las ilustraciones de `frontend/public/assets/generated/` se generaron con IA y están
optimizadas a WebP (todo el conjunto pesa menos de 700 KB).

Se muestran a través del componente `MediaFrame`, que las desatura y les aplica un tinte
azul de marca para que se lean como una familia coherente. Cuando reemplaces una imagen
por una foto o captura real, pásale `saturation={1}` para que se vea con sus colores
originales (en las tarjetas de proyecto eso ya pasa solo al poner `placeholder: false`).

---

## Notas de accesibilidad y rendimiento

- Las animaciones respetan `prefers-reduced-motion`: si el sistema pide menos movimiento,
  el contenido aparece sin animarse.
- Los íconos son SVG en línea, sin depender del CDN de Font Awesome que usaba el sitio anterior.
- Tipografías y espaciados escalan con `clamp()`.
- Verificado sin desbordamiento horizontal en 390 px (mobile), 820 px (tablet) y 1440 px (desktop).
