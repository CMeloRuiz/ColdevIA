import { Link } from "react-router-dom";
import { brand, contact, navLinks, socials } from "../../data/site";
import { services } from "../../data/services";
import Icon from "../ui/Icon";
import { Ring } from "../brand/Ring";

/**
 * Footer.
 *
 * Se abre con una franja donde el motivo de la marca aparece a gran escala
 * junto al eslogan: es el último gesto que ve el visitante y conviene que
 * sea reconocible. Debajo, la información va en columnas de ancho desigual
 * (5/2/3/2) con encabezados en mono, no en cuatro bloques idénticos.
 */
export default function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-abyss/80">
      <Ring
        className="pointer-events-none absolute -bottom-[26rem] left-1/2 h-[52rem] w-[52rem] -translate-x-1/2 text-highlight/20"
        spin
        rings={[
          { r: 48, gap: 56, opacity: 0.35, width: 0.14 },
          { r: 38, gap: 100, opacity: 0.26, width: 0.14 },
          { r: 27, gap: 34, opacity: 0.18, width: 0.18 },
        ]}
      />

      <div className="container-site relative">
        {/* ── Franja de marca ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 border-b border-white/8 py-14 lg:flex-row lg:items-end lg:justify-between lg:py-16">
          <Link to="/" className="w-fit" aria-label="Coldevia — ir al inicio">
            <img
              src={brand.logoOnDark}
              alt="Coldevia"
              className="h-12 w-auto sm:h-14"
              width="220"
              height="72"
            />
          </Link>

          <p className="max-w-md font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold leading-snug tracking-tight text-ink-dim lg:text-right">
            {brand.tagline}
          </p>
        </div>

        {/* ── Columnas de ancho desigual ──────────────────────────────── */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Contacto */}
          <div className="flex flex-col gap-6 sm:col-span-2 lg:col-span-5">
            <h3 className="label-mono">Dónde encontrarnos</h3>

            <ul className="flex flex-col gap-3">
              {contact.phones.map((phone) => (
                <li key={phone.code} className="flex items-center gap-3.5 text-sm">
                  {/* Se piden a 2× el tamaño de pantalla para que las
                      estrellas de la bandera de EE. UU. no se pierdan. */}
                  <img
                    src={phone.flag}
                    alt={`Bandera de ${phone.country}`}
                    className="h-[18px] w-[27px] shrink-0 rounded-[3px] object-cover ring-1 ring-white/20"
                    width="54"
                    height="36"
                    loading="lazy"
                  />
                  <span className="text-ink-dim">{phone.country}</span>
                  <span className="font-mono text-[12px] text-ink-muted">{phone.number}</span>
                </li>
              ))}
            </ul>

            <a
              href={`mailto:${contact.email}`}
              className="group/mail flex w-fit items-center gap-3 font-display text-lg font-semibold text-ink transition-colors duration-300 hover:text-highlight"
            >
              {contact.email}
              <Icon
                name="arrowUpRight"
                className="h-4 w-4 transition-transform duration-400 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5"
              />
            </a>

            <p className="flex items-start gap-2.5 text-sm text-ink-muted">
              <Icon name="globe" className="mt-0.5 h-4 w-4 shrink-0 text-highlight/70" />
              Soluciones tecnológicas para Latinoamérica y Estados Unidos.
            </p>
          </div>

          {/* Navegación */}
          <nav className="lg:col-span-2" aria-label="Navegación del pie de página">
            <h3 className="label-mono">Navegación</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {[...navLinks, { label: "Contacto", to: "/contacto" }].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-highlight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Servicios */}
          <nav className="lg:col-span-3" aria-label="Servicios">
            <h3 className="label-mono">Servicios</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/servicios#${service.id}`}
                    className="text-sm text-ink-muted transition-colors duration-300 hover:text-highlight"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Redes */}
          <div className="lg:col-span-2">
            <h3 className="label-mono">Redes</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5 lg:flex-col lg:gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="group/social flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-muted transition-all duration-400 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-highlight/45 hover:text-highlight lg:h-auto lg:w-auto lg:justify-start lg:gap-3 lg:rounded-none lg:border-0 lg:hover:translate-y-0"
                  >
                    <Icon name={social.icon} className="h-4 w-4 shrink-0" />
                    <span className="hidden text-sm lg:inline">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/8">
        <div className="container-site flex flex-col items-center gap-3 py-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-mono text-[11px] tracking-wide text-steel/70">
            © {anio} Coldevia. Todos los derechos reservados.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-steel/70">
            <span>Política de privacidad</span>
            <span className="opacity-40">·</span>
            <span>Términos y condiciones</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
