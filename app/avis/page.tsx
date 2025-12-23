import { Star } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    { name: "Martine D.", city: "Moyeuvre-Grande", txt: "Mon PC portable était devenu inutilisable tellement il était lent. Après l''intervention, c''est le jour et la nuit ! Super explications en plus." },
    { name: "Pierre L.", city: "Rombas", txt: "J''ai cru avoir perdu toutes mes photos de vacances. Récupération réussie et sauvegarde mise en place. Un grand merci pour le sérieux." },
    { name: "Lucas M.", city: "Joeuf", txt: "Installation de mon nouveau PC gamer et transfert des données. Tout est nickel, câbles bien rangés, et Windows optimisé." },
    { name: "Sophie T.", city: "Amnéville", txt: "Très patient pour m''expliquer comment utiliser ma nouvelle tablette. Je recommande vivement." },
  ];

  return (
    <div className="pt-10 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-16">Vos retours sont ma plus belle récompense</h1>
      
      <div className="grid gap-8">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="bg-blue-50 text-blue-600 font-bold text-2xl w-16 h-16 rounded-full flex items-center justify-center shrink-0">
              {r.name.substring(0,1)}
            </div>
            <div>
              <div className="flex text-yellow-400 mb-2">
                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
              </div>
              <p className="text-lg text-slate-700 italic mb-4">"{r.txt}"</p>
              <div className="font-bold text-slate-900">{r.name} <span className="text-slate-400 font-normal text-sm ml-2">- {r.city}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
