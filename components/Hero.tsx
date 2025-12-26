import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Fond subtil très léger pour casser le blanc pur */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* BADGE RASSURANT (Zone d'intervention) */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs md:text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <MapPin size={14} /> Intervention sur Moyeuvre-Grande & environs
        </div>

        {/* TITRE PRINCIPAL : Impactant mais pas lourd */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.15] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Votre Expert Informatique <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            à Domicile
          </span>
        </h1>

        {/* SOUS-TITRE : Clair, lisible et rassurant */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          PC lent ? Virus ? Besoin d'assistance ? <br className="hidden sm:block" />
          Je répare et optimise votre matériel directement chez vous. <br />
          <span className="text-slate-900 font-medium">Simple. Rapide. Efficace.</span>
        </p>

        {/* BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Prendre Rendez-vous <ArrowRight size={20} />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-lg transition-colors flex items-center justify-center hover:shadow-sm"
          >
            Voir les Tarifs
          </Link>
        </div>

        {/* PREUVES SOCIALES (Points de confiance) */}
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-500 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
            <CheckCircle2 size={16} className="text-green-500" /> Déplacement inclus
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
            <CheckCircle2 size={16} className="text-green-500" /> Devis gratuit
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full">
            <CheckCircle2 size={16} className="text-green-500" /> Service agréé
          </div>
        </div>
      </div>
    </section>
  );
}
