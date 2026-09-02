import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

/**
 * Estructura común a todas las páginas: header fijo, contenido y footer.
 * `pt-[72px]` compensa la altura del header fijo para que el contenido
 * no quede tapado.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* `overflow-x-clip` (y no `hidden`) recorta los halos decorativos que
          se salen del viewport sin crear un contenedor de scroll, así
          `position: sticky` y los anclajes siguen funcionando. */}
      <main className="flex-1 overflow-x-clip pt-[72px] lg:pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
