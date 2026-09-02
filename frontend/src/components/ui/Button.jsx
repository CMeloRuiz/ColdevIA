import { Link } from "react-router-dom";
import Icon from "./Icon";

/**
 * Botón del sitio.
 *
 * - `to`   → navega con React Router
 * - `href` → enlace externo (pestaña nueva)
 * - ninguno de los dos → <button>
 *
 * El detalle que lo separa de un botón de plantilla: la flecha vive dentro
 * de un disco propio que se ilumina al pasar el mouse, en lugar de ser un
 * ícono suelto al lado del texto. Es el mismo gesto circular del logo, a
 * escala de componente.
 *
 * Todas las variantes respetan un alto mínimo de 48px: cómodo para el pulgar.
 */

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 font-semibold tracking-tight transition-all duration-400 ease-[var(--ease-out-soft)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-highlight disabled:cursor-not-allowed disabled:opacity-55";

const tamanos = {
  sm: "min-h-[42px] rounded-full px-5 text-[13px]",
  md: "min-h-[50px] rounded-full px-6 text-sm",
  lg: "min-h-[58px] rounded-full px-8 text-[15px]",
};

const variantes = {
  primary:
    "bg-gradient-to-b from-accent-400 to-accent text-ink shadow-[0_14px_34px_-14px_rgb(42_87_164/0.95),inset_0_1px_0_0_rgb(255_255_255/0.18)] hover:-translate-y-[3px] hover:shadow-[0_22px_46px_-14px_rgb(42_87_164/1),inset_0_1px_0_0_rgb(255_255_255/0.28)]",
  secondary:
    "border border-white/14 bg-white/[0.04] text-ink backdrop-blur-sm hover:-translate-y-[3px] hover:border-highlight/45 hover:bg-white/[0.08]",
  quiet:
    "border border-transparent text-ink-dim hover:border-white/12 hover:bg-white/[0.04] hover:text-ink",
  light:
    "bg-ink text-navy-950 shadow-[0_14px_34px_-16px_rgb(240_240_250/0.55)] hover:-translate-y-[3px] hover:bg-white",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  icon,
  iconPosition = "right",
  ...props
}) {
  const classes = `${base} ${tamanos[size] ?? tamanos.md} ${
    variantes[variant] ?? variantes.primary
  } ${className}`;

  /* Disco de la flecha: hereda el color del texto y se enciende en hover. */
  const discoIcono = (
    <span
      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-400 ease-[var(--ease-out-soft)] ${
        variant === "light"
          ? "bg-navy-950/10 group-hover/btn:bg-navy-950/20"
          : "bg-white/12 group-hover/btn:bg-white/22"
      }`}
    >
      <Icon
        name={icon}
        className="h-3.5 w-3.5 transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-[2px]"
      />
    </span>
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? discoIcono : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? discoIcono : null}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

/**
 * Enlace de texto con subrayado que se dibuja de izquierda a derecha.
 * Para acciones secundarias dentro de bloques de contenido, donde un botón
 * sólido pesaría demasiado.
 */
export function TextLink({ children, to, href, className = "", icon = "arrowRight", ...props }) {
  const contenido = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-highlight transition-all duration-400 ease-[var(--ease-out-soft)] group-hover/link:w-full" />
      </span>
      {icon ? (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover/link:translate-x-1"
        />
      ) : null}
    </>
  );

  const classes = `group/link inline-flex w-fit items-center gap-2 text-sm font-semibold text-highlight transition-colors duration-300 hover:text-highlight-100 ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {contenido}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={classes}
      {...props}
    >
      {contenido}
    </a>
  );
}
