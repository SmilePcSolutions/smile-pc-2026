import { getAvis } from "@/app/actions";
import AvisForm from "@/components/AvisForm";
import { Star, Quote, Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AvisPage() {
  const allAvis = await getAvis();
  const avisPublies = allAvis.filter(avis => avis.approved);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      
      {/* TITRE PLUS PETIT */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Avis Clients ⭐</h1>
        <p className="text-slate-500 mt-2">Partagez votre expérience Smile PC</p>
      </div>

      {/* FORMULAIRE (Plus compact maintenant) */}
      <AvisForm />

      {/* LISTE DES AVIS */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">
          Derniers avis ({avisPublies.length})
        </h2>
        
        <div className="grid gap-4">
          {avisPublies.length === 0 ? (
            <p className="text-slate-500 italic">Aucun avis validé pour le moment.</p>
          ) : (
            avisPublies.map((avis) => (
              <div key={avis.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                
                {/* 1. HEADER : NOM + DATE */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Rond */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {avis.nom.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      {/* Nom en GRAS et en HAUT */}
                      <h3 className="font-bold text-slate-900 text-base leading-tight">
                        {avis.nom}
                      </h3>
                      {avis.verified && (
                        <span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full inline-block mt-1">
                          Client Vérifié
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Date discrète à droite */}
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={12} />
                    {new Date(avis.created_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                {/* 2. ETOILES */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < avis.note ? "currentColor" : "none"} className={i < avis.note ? "" : "text-slate-200"} />
                    ))}
                  </div>
                  <span className="text-slate-300 text-xs">|</span>
                  <span className="text-slate-600 text-sm font-medium">{avis.note}/5</span>
                </div>

                {/* 3. MESSAGE */}
                <div className="relative bg-slate-50 p-4 rounded-lg">
                  <Quote className="absolute top-2 left-2 text-slate-200 transform -scale-x-100 opacity-50" size={24} />
                  <p className="text-slate-700 italic relative z-10 pl-4 text-sm leading-relaxed">
                    "{avis.message}"
                  </p>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}