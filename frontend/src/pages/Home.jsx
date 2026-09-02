import { useEffect } from "react";
import Hero from "../components/home/Hero";
import StatsBar from "../components/home/StatsBar";
import ServicesGrid from "../components/home/ServicesGrid";
import HowItWorks from "../components/home/HowItWorks";
import Technologies from "../components/home/Technologies";
import WhyColdevia from "../components/home/WhyColdevia";
import Pricing from "../components/home/Pricing";
import Process from "../components/home/Process";
import ShowcasePreview from "../components/home/ShowcasePreview";
import ContactCta from "../components/home/ContactCta";

/**
 * Home.
 *
 * Orden narrativo: qué hacemos -> cómo lo hacemos -> con qué -> por qué
 * nosotros -> cuánto cuesta -> el proceso completo -> pruebas -> llamada a la
 * acción. Los planes van después de "por qué elegirnos": llegan cuando el
 * visitante ya entendió el valor, y justo antes del detalle del proceso que
 * responde el "¿y cómo sigue?" que dispara un precio.
 */
export default function Home() {
  useEffect(() => {
    document.title = "Coldevia | Desarrollo web, software e inteligencia artificial";
  }, []);

  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <HowItWorks />
      <Technologies />
      <WhyColdevia />
      <Pricing />
      <Process />
      <ShowcasePreview />
      <ContactCta />
    </>
  );
}
