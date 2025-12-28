import Link from 'next/link';
import { ArrowRight, MapPin, ShieldCheck, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-50">
      
      {/* Fond avec forme arrondie douce en bas */}
      <div className="absolute inset-0 bg-white rounded-b-[3rem] shadow-sm -z-10 h-[90%] w-full"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Badge Zone */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 shadow-sm border border-blue-100">
          <MapPin size={16} /> Moyeuvre-Grande & Alentours
        </div>

        {/* Titre Centré & Impactant */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
          Votre Expert Informatique <br />
          <span className="text-blue-600">Proche de Vous</span>
        </h1>

        {/* Sous-titre clair */}
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Dépannage, assistance et conseils à domicile, en atelier ou à distance.
          Une solution simple et rapide pour tous vos soucis numériques.
        </p>

        {/* UN SEUL BOUTON PRINCIPAL */}
        <div className="flex justify-center mb-16">
          <Link
            href="/contact"
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            Me Contacter
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Arguments (Icônes simples et centrées) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-green-100 text-green-700 rounded-2xl mb-2">
              <MapPin size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Déplacement Inclus</h3>
            <p className="text-sm text-slate-500">Moyeuvre & 20km alentours</p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl mb-2">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Pas de Surprise</h3>
            <p className="text-sm text-slate-500">Devis clair avant intervention</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-orange-100 text-orange-700 rounded-2xl mb-2">
              <Zap size={28} />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Rapide & Efficace</h3>
            <p className="text-sm text-slate-500">Intervention sous 24/48h</p>
          </div>
        </div>

      </div>
    </section>
  );
}