import Link from "next/link";
import { MapPin, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden">

      {/* 🌈 FOND PREMIUM (DÉGRADÉS + HALOS) */}
      <div className="absolute inset-0 -z-10 bg-white">
        {/* Halo violet */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 mix-blend-multiply opacity-70 animate-blob" />
        {/* Halo bleu */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply opacity-70 animate-blob" />
        {/* Texture douce */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">

        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-sm font-semibold mb-8 animate-fade-in-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Disponible aujourd’hui à Moyeuvre-Grande
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
          Réparation PC & <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
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
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-lg shadow-xl shadow-slate-200 hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Demander un dépannage
          </Link>

          <Link
            href="/prestations"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 rounded-full font-bold text-lg shadow-sm hover:shadow-md transition-all"
          >
            Voir les prestations
          </Link>
        </div>

        {/* Cartes arguments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">

          <div className="p-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 mb-4">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">PC lent & optimisation</h3>
            <p className="text-sm text-slate-500">
              Accélération Windows, nettoyage et réglages pour retrouver un PC fluide.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Virus & sécurité</h3>
            <p className="text-sm text-slate-500">
              Suppression de virus, publicités et sécurisation de vos données.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Wi-Fi & installation</h3>
            <p className="text-sm text-slate-500">
              Box Internet, Wi-Fi, imprimantes et équipements à domicile.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
