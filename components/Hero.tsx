import Link from "next/link";
import { Check } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-32 px-6 overflow-hidden">
      {/* Les fameux effets de lumière (Blobs) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse"></div>
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>

      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-white shadow-sm text-slate-600 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
          Disponible aujourd''hui sur Moyeuvre-Grande
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-slate-900">
          Réparation PC & <br />
          <span className="text-gradient">Assistance Informatique.</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Votre ordinateur est lent ou bloqué ? Pas de panique. 
          J''interviens à domicile pour réparer, optimiser et sécuriser votre matériel.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
          <Link href="/contact" className="bg-slate-900 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Demander un dépannage
          </Link>
          <Link href="/services" className="bg-white text-slate-700 hover:text-blue-600 font-bold py-4 px-8 rounded-full border border-slate-200 hover:border-blue-200 transition-all shadow-sm hover:shadow-md">
            Voir mes tarifs
          </Link>
        </div>
      </div>
    </section>
  );
}
