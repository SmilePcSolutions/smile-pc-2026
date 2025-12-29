"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Star, Upload, CheckCircle, Loader2, Send, Video, Quote } from "lucide-react";

// 👇 CONFIGURATION : Tes avis validés (Facile à éditer et scalable)
// C'est ici que tu ajoutes les nouveaux avis, sans toucher au reste du code.
const AVIS_CLIENTS = [
  {
    nom: "Annie",
    date: "Il y a quelques heures",
    note: 5,
    message: "Franchement je vois la différence depuis que j'ai été chez Smile PC. Mon ordinateur est plus rapide, plus stable, c'est à recommander les yeux fermés.",
    verified: true
  },
  // Copie le bloc { ... }, pour ajouter le prochain avis ici !
];

export default function AvisPage() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  // 🛡️ TYPAGE STRICT (Niveau Senior)
  // On utilise les vrais types React pour éviter tout bug invisible.
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // currentTarget assure qu'on cible bien le formulaire
    const formData = new FormData(e.currentTarget);
    formData.append('note', rating.toString());
    
    if (file) {
      formData.append('files', file);
    }

    try {
      const res = await fetch('/api/avis', { 
        method: 'POST', 
        body: formData 
      });

      // Gestion d'erreur robuste
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'envoi");
      }
      
      // Succès
      setIsSuccess(true);
      setFile(null);
      setRating(5);
      
      // Reset du formulaire via l'API HTML native
      e.currentTarget.reset();

    } catch (err: unknown) {
      // Gestion d'erreur typée (on vérifie si c'est bien une Erreur standard)
      const message = err instanceof Error ? err.message : "Une erreur inconnue est survenue";
      alert("Oups : " + message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🛡️ TYPAGE STRICT pour l'upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Votre avis compte ! ⭐</h1>
        <p className="text-slate-600">Aidez-nous à nous améliorer et partagez votre expérience.</p>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 mb-24">
        
        {isSuccess ? (
          <div className="text-center py-12 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Merci pour votre avis !</h3>
            <p className="text-slate-600">Nous avons bien reçu votre commentaire.</p>
            <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-600 font-bold hover:underline">Envoyer un autre avis</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* 🛡️ HONEYPOT : Nom "b_check" pour éviter l'autofill iPhone */}
            <input type="text" name="b_check" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            
            {/* SÉLECTEUR D'ÉTOILES */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <label className="font-bold text-slate-700">Quelle note donnez-vous ?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="transition-transform hover:scale-110 focus:outline-none"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <Star 
                      size={40} 
                      className={`${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`} 
                      fill={star <= (hover || rating) ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-blue-600 min-h-[20px]">
                {rating === 5 ? "Génial ! 😍" : rating === 4 ? "Très bien 🙂" : rating === 3 ? "Moyen 😐" : "Pas satisfait 😞"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Prénom ou Pseudo</label>
                <input required name="nom" className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Ex: Jojo du 57" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email (Reste privé • Non affiché)</label>
                <input name="email" type="email" className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="jean@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Votre Commentaire</label>
              <textarea required name="message" rows={4} className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Racontez votre expérience..."></textarea>
            </div>

            {/* UPLOAD */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Une photo ou vidéo du résultat ? (Optionnel)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all"
              >
                <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
                {file ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle size={20} />
                    {file.name}
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2 mb-2">
                      <Upload className="text-slate-400" />
                      <Video className="text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-500">Cliquez pour ajouter une image ou une vidéo courte</span>
                  </>
                )}
              </div>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              Envoyer mon avis
            </button>
          </form>
        )}
      </div>

      {/* ✅ LISTE DES AVIS (Automatique via la constante AVIS_CLIENTS) */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">Ce que disent mes clients</h2>
        
        <div className="grid gap-6">
          {AVIS_CLIENTS.map((avis, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-yellow-400">
                    {/* Génération dynamique des étoiles selon la note */}
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < avis.note ? "currentColor" : "none"} className={i < avis.note ? "" : "text-slate-200"} />
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">• {avis.date}</span>
                </div>
                
                <div className="relative pl-6 mb-4">
                  <Quote className="absolute top-0 left-0 text-blue-100 transform -scale-x-100" size={20} />
                  <p className="text-slate-700 italic leading-relaxed">"{avis.message}"</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                    {avis.nom.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{avis.nom}</p>
                    {avis.verified && <p className="text-xs text-blue-600 font-semibold">Client vérifié</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}