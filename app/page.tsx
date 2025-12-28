import Hero from "@/components/Hero";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      {/* On a supprimé Reviews et Prestations d'ici car c'est redondant */}
      <Faq />
    </>
  );
}