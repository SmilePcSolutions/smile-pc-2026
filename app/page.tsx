import Hero from "@/components/Hero";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Faq from "@/components/Faq"; // ✅ On importe le composant que tu viens de créer

export default function Home() {
  return (
    <main>
      <Hero />
      <Reviews />
      <About />
      <Faq /> {/* ✅ On l'affiche ici, juste avant le footer */}
    </main>
  );
}