import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-8 border border-blue-100">
            <CheckCircle2 size={16} />
            <span>Dépannage à domicile sur Moyeuvre-Grande et alentours</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Vos problèmes informatiques <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              ont enfin une solution
            </span>
          </h1>

          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Votre ordinateur est lent ou bloqué ? Pas de panique. 
            J'interviens à domicile pour réparer, optimiser et sécuriser votre matériel.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* BOUTON 1 : Lien vers Contact -> Texte "Me Contacter" */}
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Me Contacter
              <ArrowRight size={20} />
            </Link>

            {/* BOUTON 2 : Lien vers Services -> Texte "Voir les Prestations" */}
            <Link 
              href="/services" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Voir les Prestations
            </Link>

          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Réponse rapide
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Devis transparent
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}