# Sitio anterior (referencia)

Esta carpeta guarda el sitio original en HTML/CSS/JS vanilla, con sus assets, tal como
estaba antes del rediseño. Se conserva solo como **referencia de contenido**: el sitio
nuevo (`/frontend`) no depende de nada de acá.

Podés abrir `index.html` directamente en el navegador para verlo funcionando.

## Una aclaración sobre `index.html`

Al revisar el proyecto encontramos que el `index.html` de trabajo había perdido tres
secciones que sí existían en el primer commit (`4224e6a`):

- **¿Por qué elegir VortexDev?**
- **Tu proyecto, paso a paso** (el proceso de 6 pasos)
- **Formulario de contacto**

Los archivos `javascript/why-vortexdev.js` y `javascript/process.js` seguían ahí, pero ya
no tenían HTML al que aplicarse. Además, las imágenes `why-vortexdev.png` y
`why-vortexdev2.png` figuraban como borradas.

Para no perder ese copy, la versión completa del primer commit se guardó en:

**`index-completo-original.html`**

De ahí se tomaron los textos de esas tres secciones para el sitio nuevo. Los teléfonos
reales de Colombia y Argentina que aparecían en el formulario también salieron de ese
archivo y hoy viven en `frontend/src/data/site.js`.
