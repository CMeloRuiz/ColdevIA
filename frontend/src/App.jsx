import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Proyectos from "./pages/Proyectos";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

/**
 * Rutas del sitio. Todas comparten el mismo <Layout> (header + footer).
 *
 * Para agregar una página nueva: creá el componente en `src/pages`, sumá su
 * <Route> acá y, si tiene que aparecer en el menú, agregala a `navLinks`
 * en `src/data/site.js`.
 */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
