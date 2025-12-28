import Link from "next/link";
import { MapPin, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden bg-white">

      {/* 🌫️ FOND DOUX (STYLE SAUVEGARDE VERCEL) */}
      <div className="absolute inset-0 -z-10">
        {/* Halo gauche TRÈS doux */}
        <div className="absolute top-[-10%] left-[15%] w-[520px] h-[520px] rounded-full 
          bg-indigo-100/40 blur-[120px]" />

        {/* Halo droit TRÈS doux */}
        <div className="absolute top-[-5%] right-[15%] w-[520px] h-[520px] rounded-full 
          bg-blue-100/40 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">

        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
          bg-white border border-slate-200 shadow-sm 
          text-slate-600 text-sm font-semibold mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Disponible aujourd’hui à Moyeuvre-Grande
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
          Réparation PC & <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text 
            bg-gradient-to-r from-blue-600 to-indigo-600">
            Assistance Informatique
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Votre ordinateur est lent, bloqué ou infecté ?
          J’interviens à domicile pour réparer, optimiser et sécuriser votre matériel.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
          <Link
            href="/contact"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 
              text-white rounded-full font-bold text-lg 
              shadow-lg transition-transform hover:-translate-y-0.5"
          >
            Demander un dépannage
          </Link>

          <Link
            href="/prestations"
            className="px-8 py-4 bg-white hover:bg-slate-50 
              text-slate-900 border border-slate-200 
              rounded-full font-bold text-lg shadow-sm"
          >
            Voir les prestations
          </Link>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">

          <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-4">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">PC lent & optimisation</h3>
            <p className="text-sm text-slate-500">
              Nettoyage, accélération Windows et réglages pour un PC fluide.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Virus & sécurité</h3>
            <p className="text-sm text-slate-500">
              Suppression de virus et sécurisation des données.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Wi-Fi & installation</h3>
            <p className="text-sm text-slate-500">
              Box, Wi-Fi, imprimantes et équipements à domicile.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
