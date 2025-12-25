"use client";
import { useState, useRef } from "react";
import { Star, Upload, CheckCircle, Loader2, Send } from "lucide-react";

export default function AvisPage() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('note', rating.toString());
    if (file) {
      formData.append('files', file);
    }

    try {
      const res = await fetch('/api/avis', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Erreur envoi");
      setIsSuccess(true);
      setFile(null);
      e.target.reset();
      setRating(5);
    } catch (err) {
      alert("Erreur lors de l'envoi de l'avis.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: any) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Votre avis compte ! ⭐</h1>
        <p className="text-slate-600">Aidez-nous à nous améliorer et partagez votre expérience.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
        {isSuccess ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Merci pour votre avis !</h3>
            <p className="text-slate-600">Nous avons bien reçu votre commentaire.</p>
            <button onClick={() => setIsSuccess(false)} className="mt-8 text-blue-600 font-bold hover:underline">Envoyer un autre avis</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* ÉTOILES */}
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
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold text-blue-600">
                {rating === 5 ? "Génial ! 😍" : rating === 4 ? "Très bien 🙂" : rating === 3 ? "Moyen 😐" : "Pas satisfait 😞"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Votre Nom</label>
                <input required name="nom" className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Jean Dupont" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email (ne sera pas publié)</label>
                <input name="email" type="email" className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="jean@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Votre Commentaire</label>
              <textarea required name="message" rows={4} className="w-full p-4 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all outline-none" placeholder="Racontez votre expérience..."></textarea>
            </div>

            {/* PHOTO */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Une photo du résultat ? (Optionnel)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 hover:border-blue-300 transition-all"
              >
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                {file ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle size={20} />
                    {file.name}
                  </div>
                ) : (
                  <>
                    <Upload className="text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500">Cliquez pour ajouter une image</span>
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
    </div>
  );
}