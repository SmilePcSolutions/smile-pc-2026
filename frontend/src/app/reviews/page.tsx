import Link from "next/link";
import { User, Star, MessageSquarePlus } from "lucide-react";

export default function Reviews() {
  return (
    <div className="flex-1 flex flex-col w-full py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-6 flex-1 flex flex-col">
        
        {/* Titre */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Vos avis comptent
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">
            Voici les derniers retours de mes clients à Moyeuvre-Grande.
          </p>
        </div>

        {/* Grille des Avis */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          
          {/* Avis 1 */}
          <ReviewCard 
            name="Marie L." 
            date="Il y a 2 sem." 
            text="Intervention rapide et efficace ! Tout est rentré dans l ordre en moins d une heure." 
          />

          {/* Avis 2 */}
          <ReviewCard 
            name="Marc Dupont" 
            date="Il y a 1 mois" 
            text="Un vrai magicien ! Merci encore pour votre patience et vos explications claires." 
          />

          {/* Avis 3 */}
          <ReviewCard 
            name="Sophie & Thomas" 
            date="Il y a 2 mois" 
            text="Super prestation pour l installation du Wi-Fi. Tarif très correct et travail soigné." 
          />

          {/* Avis 4 */}
          <ReviewCard 
            name="Cabinet Dr. H." 
            date="Il y a 3 mois" 
            text="Technicien de confiance, discret et très compétent. Une valeur sûre à Moyeuvre." 
          />

          {/* Avis 5 */}
          <ReviewCard 
            name="Annie" 
            date="Aujourd'hui" 
            text="Super rien à redire je recommande. Mon PC portable revit !" 
          />

        </div>

        {/* Bloc Bleu en bas (Appel à l'action) */}
        <div className="mt-auto bg-blue-600 dark:bg-blue-800 rounded-2xl p-6 text-center shadow-lg shadow-blue-900/20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <div className="text-left">
            <h2 className="text-lg font-bold text-white">Votre avis est précieux</h2>
            <p className="text-blue-50 text-sm">Il m aide à m améliorer chaque jour.</p>
          </div>
          <div className="flex gap-3">
            <a href="#" className="inline-flex h-10 items-center justify-center rounded-lg bg-white text-blue-600 dark:text-blue-800 font-bold px-4 text-sm hover:bg-slate-50 transition-colors shadow-sm">
              <Star className="w-4 h-4 mr-2" /> Google
            </a>
            <Link href="/contact" className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-700 dark:bg-blue-900 text-white font-bold px-4 text-sm border border-blue-500 hover:bg-blue-800 transition-colors">
              <MessageSquarePlus className="w-4 h-4 mr-2" /> Déposer un avis
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// Composant Carte Avis (pour ne pas répéter le code HTML)
function ReviewCard({ name, date, text }: { name: string, date: string, text: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative transition-colors hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 dark:text-white text-sm">{name}</h2>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{date}</span>
      </div>
      <p className="text-slate-600 dark:text-slate-300 text-sm italic leading-relaxed">
        "{text}"
      </p>
    </div>
  );
}
