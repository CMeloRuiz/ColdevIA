import { useState } from "react";
import { ClipReveal } from "./Reveal";
import { RingFrame } from "../brand/Ring";

/**
 * Marco de imagen con tratamiento de marca.
 *
 * Resuelve tres cosas a la vez:
 *
 * 1. COLOR. Las ilustraciones generadas viran al cyan, que está fuera de la
 *    paleta. Se desaturan y se les aplica un tinte navy encima, de modo que
 *    todas las imágenes del sitio se lean como una familia. Con fotos o
 *    capturas reales, usar `saturation={1}` las respeta tal cual.
 *
 * 2. CARGA. Mientras la imagen no llegó, se ve un bloque con un barrido
 *    suave en vez de un hueco vacío. La imagen entra con una transición de
 *    opacidad, así que no aparece de golpe.
 *
 * 3. ENCUADRE. `ring` agrega el arco del logo abrazando una esquina, para
 *    que el marco sea reconociblemente de Coldevia y no un `rounded-2xl`
 *    neutro más.
 */
export default function MediaFrame({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  saturation = 0.4,
  overlay = "from-void/75 via-accent/12 to-accent/28",
  rounded = "rounded-[18px]",
  ring = false,
  reveal = true,
  revealDirection = "up",
  children,
  loading = "lazy",
}) {
  const [cargada, setCargada] = useState(false);

  const contenido = (
    <div className={`relative overflow-hidden border border-white/10 ${rounded} ${className}`}>
      {/* Marcador de carga: se desvanece cuando la imagen resuelve. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-navy-900 transition-opacity duration-700 ${
          cargada ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.04] via-white/[0.07] to-transparent" />
      </div>

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={() => setCargada(true)}
        // Si la imagen ya estaba en caché el evento onLoad puede haber
        // ocurrido antes de montar: este callback lo detecta al vuelo.
        ref={(nodo) => {
          if (nodo?.complete) setCargada(true);
        }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          cargada ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        /**
         * Duotono de marca por filtros, sin `mix-blend-mode`.
         *
         * Las ilustraciones generadas viran al cyan/turquesa, que está fuera
         * de la paleta. La cadena desatura primero, tiñe con sepia para tener
         * un color plano sobre el que trabajar, rota el matiz hasta el azul de
         * Coldevia y recupera algo de intensidad. El resultado es que todas
         * las imágenes se leen como una familia.
         *
         * Con `saturation = 1` (capturas o fotos reales) no se aplica nada:
         * la imagen se muestra tal cual.
         */
        style={
          saturation >= 1
            ? undefined
            : {
                // `grayscale` neutraliza el color original, `sepia` deja un
                // tono plano al que agarrarse, `hue-rotate` lo lleva del ámbar
                // del sepia (~40°) al azul de marca (~217°) y `saturate`
                // decide cuánta fuerza tiene el tinte. `saturation` gradúa ese
                // último paso: 0.4 es el valor habitual del sitio.
                filter: `grayscale(1) sepia(1) hue-rotate(177deg) saturate(${
                  1.1 + saturation * 2.2
                }) brightness(${0.9 + saturation * 0.12})`,
              }
        }
      />

      {/* Tinte de marca sobre la imagen ya desaturada */}
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-tr ${overlay}`} />

      {children}
    </div>
  );

  const conAnillo = ring ? (
    <div className="relative">
      <RingFrame className="-right-10 -top-10 h-40 w-40 lg:-right-14 lg:-top-14 lg:h-52 lg:w-52" />
      {contenido}
    </div>
  ) : (
    contenido
  );

  if (!reveal) return conAnillo;

  return <ClipReveal direction={revealDirection}>{conAnillo}</ClipReveal>;
}
