import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Al navegar entre páginas, vuelve al inicio del documento.
 * Si la URL trae un hash (#web, #saas...), hace scroll hasta ese bloque
 * compensando la altura del header fijo.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Esperamos un frame a que la página nueva termine de montarse.
      const id = requestAnimationFrame(() => {
        const target = document.querySelector(hash);
        if (target) {
          const headerOffset = window.innerWidth >= 1024 ? 96 : 88;
          const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
      return () => cancelAnimationFrame(id);
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
