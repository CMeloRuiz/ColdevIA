import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import Toast from "../ui/Toast";
import { Ring } from "../brand/Ring";
import { enviarContacto } from "../../lib/api";

const CAMPOS_INICIALES = {
  nombre: "",
  empresa: "",
  correo: "",
  telefono: "",
  mensaje: "",
  // Honeypot: queda fuera de pantalla, solo lo completan los bots.
  website: "",
};

/** Validación en el navegador. El backend vuelve a validar todo por su cuenta. */
function validar(valores) {
  const errores = {};

  if (!valores.nombre.trim()) errores.nombre = "Cuéntanos tu nombre.";
  else if (valores.nombre.trim().length < 2) errores.nombre = "El nombre es muy corto.";

  if (!valores.correo.trim()) errores.correo = "Necesitamos un correo para responderte.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valores.correo.trim()))
    errores.correo = "Revisa el formato del correo.";

  if (valores.telefono.trim() && !/^[\d\s()+-]{6,25}$/.test(valores.telefono.trim()))
    errores.telefono = "Revisa el número de teléfono.";

  if (!valores.mensaje.trim()) errores.mensaje = "Cuéntanos brevemente qué necesitas.";
  else if (valores.mensaje.trim().length < 10) errores.mensaje = "Escribe al menos 10 caracteres.";

  return errores;
}

/**
 * Formulario de contacto conectado al backend.
 *
 * Estados: `idle` → `enviando` → `enviado` | error.
 * Al enviarse con éxito el formulario se reemplaza por una confirmación con
 * el anillo de la marca, y además aparece un aviso flotante. Nada de alert().
 */
export default function ContactForm({ className = "", correoInicial = "" }) {
  // `correoInicial` llega desde el banner del home: si el visitante ya
  // escribió su correo allá, aparece cargado y no tiene que repetirlo.
  const [valores, setValores] = useState({ ...CAMPOS_INICIALES, correo: correoInicial });
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState("idle");
  const [toast, setToast] = useState(null);

  const actualizar = (campo) => (event) => {
    setValores((prev) => ({ ...prev, [campo]: event.target.value }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (estado === "enviando") return;

    const nuevosErrores = validar(valores);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setEstado("enviando");
    const resultado = await enviarContacto(valores);

    if (resultado.ok) {
      setEstado("enviado");
      setValores(CAMPOS_INICIALES);
      setErrores({});
      setToast({
        type: "success",
        title: "¡Mensaje enviado!",
        message: "Te vamos a responder al correo que dejaste, normalmente dentro de las 24 horas.",
      });
    } else {
      setEstado("idle");
      setErrores(resultado.fieldErrors ?? {});
      setToast({ type: "error", title: "No pudimos enviarlo", message: resultado.message });
    }
  };

  return (
    <>
      <div className={`surface-raised relative overflow-hidden p-7 sm:p-9 lg:p-10 ${className}`}>
        <Ring
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 text-highlight/25"
          spin
          rings={[
            { r: 47, gap: 60, opacity: 0.45, width: 0.35 },
            { r: 36, gap: 108, opacity: 0.28, width: 0.35 },
          ]}
        />

        <AnimatePresence mode="wait">
          {estado === "enviado" ? (
            <motion.div
              key="exito"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="relative flex flex-col items-center gap-5 py-14 text-center sm:py-20"
            >
              <span className="relative flex h-20 w-20 items-center justify-center">
                <Ring
                  className="absolute inset-0 h-full w-full text-highlight"
                  rings={[{ r: 46, gap: 62, opacity: 0.7, width: 2.5 }]}
                />
                <Icon name="check" className="h-8 w-8 text-highlight" strokeWidth="2" />
              </span>

              <h3 className="text-[1.6rem]">Recibimos tu mensaje</h3>

              <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink-muted">
                Gracias por escribirnos. Vamos a revisar tu consulta y te respondemos por correo,
                normalmente dentro de las 24 horas.
              </p>

              <Button variant="secondary" size="sm" onClick={() => setEstado("idle")} className="mt-2">
                Enviar otro mensaje
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="formulario"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={onSubmit}
              noValidate
              className="relative flex flex-col gap-6"
            >
              <div>
                <span className="label-mono text-highlight/80">Consulta gratuita</span>
                <h3 className="mt-3 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">
                  Cuéntanos sobre tu proyecto
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Completa el formulario y te contactamos para entender qué necesitas.
                </p>
              </div>

              {/* Trampa para bots: fuera de pantalla y del orden de tabulación.
                  A propósito no usa display:none, que los bots detectan. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={valores.website}
                onChange={actualizar("website")}
                className="pointer-events-none absolute -left-[9999px] h-px w-px opacity-0"
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <Campo
                  id="nombre"
                  label="Nombre"
                  placeholder="Tu nombre y apellido"
                  value={valores.nombre}
                  onChange={actualizar("nombre")}
                  error={errores.nombre}
                  autoComplete="name"
                  required
                />
                <Campo
                  id="empresa"
                  label="Empresa"
                  placeholder="Opcional"
                  value={valores.empresa}
                  onChange={actualizar("empresa")}
                  error={errores.empresa}
                  autoComplete="organization"
                />
                <Campo
                  id="correo"
                  label="Correo"
                  type="email"
                  inputMode="email"
                  placeholder="tunombre@empresa.com"
                  value={valores.correo}
                  onChange={actualizar("correo")}
                  error={errores.correo}
                  autoComplete="email"
                  required
                />
                <Campo
                  id="telefono"
                  label="Teléfono"
                  type="tel"
                  inputMode="tel"
                  placeholder="+57 300 000 0000"
                  value={valores.telefono}
                  onChange={actualizar("telefono")}
                  error={errores.telefono}
                  autoComplete="tel"
                />
              </div>

              <Campo
                id="mensaje"
                label="Mensaje"
                as="textarea"
                rows={5}
                placeholder="Qué necesitas, para cuándo, y cualquier detalle que nos ayude a entender el proyecto."
                value={valores.mensaje}
                onChange={actualizar("mensaje")}
                error={errores.mensaje}
                required
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* `shrink-0` es necesario: al lado del texto legal, el flex
                    comprimía el botón y partía la etiqueta en dos líneas. */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={estado === "enviando"}
                  className="shrink-0 whitespace-nowrap"
                  icon={estado === "enviando" ? undefined : "arrowRight"}
                >
                  {estado === "enviando" ? (
                    <>
                      <Icon name="spinner" className="h-4 w-4 animate-spin" />
                      Enviando…
                    </>
                  ) : (
                    "Enviar mensaje"
                  )}
                </Button>

                <p className="max-w-[22rem] font-mono text-[10px] leading-relaxed tracking-wide text-steel/70">
                  Usamos tus datos únicamente para responder tu consulta. Nunca los compartimos.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </>
  );
}

/**
 * Campo de formulario reutilizable (input o textarea).
 *
 * La etiqueta va en mono y versalitas, y el foco se marca con un filete
 * inferior que se ilumina, no con un borde completo: se lee más cercano a
 * un formulario impreso que a un widget de librería.
 * Alto mínimo de 48px, cómodo de tocar con el pulgar.
 */
function Campo({ id, label, as = "input", error, className = "", ...props }) {
  const Tag = as;
  const base =
    "w-full rounded-xl border bg-white/[0.035] px-4 py-3.5 text-sm text-ink transition-all duration-400 placeholder:text-ink-muted/55 focus:bg-white/[0.06] focus:outline-none";
  const borde = error
    ? "border-red-400/60 focus:border-red-400"
    : "border-white/10 focus:border-highlight/60";

  return (
    <div className={`flex flex-col gap-2.5 ${as === "textarea" ? "sm:col-span-2" : ""} ${className}`}>
      <label
        htmlFor={id}
        className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-steel-400"
      >
        {label}
        {props.required ? <span className="ml-1 text-highlight">*</span> : null}
      </label>

      <Tag
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${base} ${borde} ${as === "textarea" ? "min-h-[140px] resize-y" : "min-h-[48px]"}`}
        {...props}
      />

      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-xs text-red-300">
          <Icon name="alert" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
