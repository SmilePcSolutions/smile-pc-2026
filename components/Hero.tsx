import Link from 'next/link';
import { ArrowRight, MapPin, Star, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-white selection:bg-blue-100">
      
      {/* 1. FOND TECHNIQUE (GRID PATTERN) - Texture Pro */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      
      {/* 2. EFFET DE LUMIÈRE (GLOW) - Profondeur */}
      <div className="absolute top-0 left-0 right-0 -z-10 mx-auto h-[500px] w-full max-w-4xl rounded-full bg-blue-100/50 blur-[100px] opacity-70 mix-blend-multiply"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-center">
        
        {/* TOP : PREUVE SOCIALE & LOCALISATION */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Badge Local */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-xs md:text-sm font-semibold shadow-sm">
            <MapPin size={14} className="text-blue-500" /> 
            Moyeuvre-Grande & Alentours
          </div>

          {/* Badge Confiance (Etoiles) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-800 text-xs md:text-sm font-semibold shadow-sm">
            <div className="flex text-orange-500">
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
              <Star size={12} fill="currentColor" />
            </div>
            <span className="text-orange-900/80">Satisfaction Garantie</span>
          </div>
        </div>

        {/* TITRE : PLUS SERRÉ, PLUS IMPACTANT (Leading 1.05) */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 drop-shadow-sm">
          Votre Expert Informatique <br />
          <span className="relative inline-block text-blue-600">
            à Domicile
            {/* Soulignement stylisé */}
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span>
        </h1>

        {/* SOUS-TITRE : EMOTIONNEL & HUMAIN */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          Un problème informatique, c’est toujours au mauvais moment.
          <span className="hidden md:inline"> J'interviens rapidement chez vous pour réparer, sécuriser et optimiser votre matériel.</span>
        </p>

        {/* BOUTONS : ACTION IMMÉDIATE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <Link
            href="/contact"
            className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-[0_10px_20px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_20px_-10px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Prendre Rendez-vous 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg transition-all hover:border-slate-300 flex items-center justify-center"
          >
            Voir les Tarifs
          </Link>
        </div>

        {/* POINTS FORTS (GRID EN BAS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {/* Point 1 */}
          <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-green-100 text-green-700 rounded-xl">
              <MapPin size={24} />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900">Déplacement Inclus</h3>
              <p className="text-sm text-slate-500">Moyeuvre & 20km alentours</p>
            </div>
          </div>

          {/* Point 2 */}
          <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900">Devis Gratuit</h3>
              <p className="text-sm text-slate-500">Aucune mauvaise surprise</p>
            </div>
          </div>

          {/* Point 3 */}
          <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 bg-orange-100 text-orange-700 rounded-xl">
              <Zap size={24} />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900">Intervention Rapide</h3>
              <p className="text-sm text-slate-500">Dépannage sous 24/48h</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
