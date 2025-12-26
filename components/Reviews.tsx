import Link from 'next/link';
import { Star, Quote, MessageCircle } from 'lucide-react';

const reviews = [
  {
    name: "Client à Moyeuvre-Grande",
    role: "Dépannage à domicile",
    content: "Intervention rapide et efficace. Mon PC était bloqué depuis des jours, tout est rentré dans l'ordre en moins d'une heure. Je recommande pour le sérieux.",
    stars: 5,
    date: "Il y a 1 mois"
  },
  {
    name: "Cliente à Rombas",
    role: "Nettoyage Virus",
    content: "Très pédagogue ! Il a pris le temps de m'expliquer comment éviter les virus à l'avenir. Mon ordinateur n'a jamais été aussi rapide.",
    stars: 5,
    date: "Il y a 2 semaines"
  },
  {
    name: "Professionnel Local",
    role: "Installation Réseau",
    content: "Service impeccable. Installation de ma Box et de mon imprimante sans aucun souci. Tarif très correct pour la qualité de la prestation.",
    stars: 5,
    date: "Il y a 3 semaines"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Élément décoratif d'arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* EN-TÊTE */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wide mb-4">
            <Star size={14} fill="currentColor" /> Ils me font confiance
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
            La satisfaction client est ma <span className="text-blue-600">priorité absolue</span>
          </h2>
          <p className="text-lg text-slate-600">
            Parce que la meilleure publicité, c'est un client heureux qui retrouve un ordinateur fonctionnel.
          </p>
        </div>

        {/* GRILLE DES AVIS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm relative hover:shadow-md transition-shadow"
            >
              {/* Guillemets décoratifs */}
              <Quote size={40} className="absolute top-6 right-6 text-blue-100 rotate-12" />
              
              {/* Étoiles */}
              <div className="flex gap-1 mb-4 text-orange-400">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Texte */}
              <p className="text-slate-700 leading-relaxed mb-6 italic relative z-10">
                "{review.content}"
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 mt-auto border-t border-slate-200/60 pt-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOUTON GOOGLE (Lien vers tes futurs avis) */}
        <div className="text-center">
          <Link 
            href="/avis" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-md group"
          >
            <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
            Voir d'autres témoignages
          </Link>
          <p className="mt-4 text-sm text-slate-400">
            Avis vérifiés et authentiques
          </p>
        </div>

      </div>
    </section>
  );
}
