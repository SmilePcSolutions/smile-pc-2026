import { Star, Quote } from 'lucide-react';

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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            La satisfaction client avant tout
          </h2>
          <div className="flex justify-center gap-1 text-orange-400 mb-2">
            <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 border border-slate-100 relative">
              <Quote size={24} className="text-blue-200 mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6 italic text-sm md:text-base">
                "{review.content}"
              </p>
              <div className="flex items-center gap-3 mt-auto border-t border-slate-200 pt-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
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
      </div>
    </section>
  );
}