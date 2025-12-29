"use client";
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Star, Upload, CheckCircle, Loader2, Send } from "lucide-react";

export default function AvisForm() {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget; 
    const formData = new FormData(form);
    
    formData.append('note', rating.toString());
    if (file) formData.append('files', file);

    try {
      const res = await fetch('/api/avis', { method: 'POST', body: formData });
      if (!res.ok) throw new Error("Erreur lors de l'envoi");
      
      setIsSuccess(true);
      setFile(null);
      setRating(5);
      form.reset();
    } catch (err) {
      alert("Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 rounded-2xl p-8 border border-green-100 mb-12 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Merci pour votre avis !</h3>
        <p className="text-green-600 text-sm">Il sera publié après validation.</p>
        <button onClick={() => setIsSuccess(false)} className="mt-6 text-sm font-bold text-green-700 hover:underline">Envoyer un autre avis</button>
      </div>
    );
  }

  return (
    // J'ai réduit le padding (p-6) et la marge du bas (mb-12 au lieu de 24)
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 mb-12 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="text" name="b_check" className="hidden" />
        
        {/* ETOILES COMPACTES */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <label className="font-bold text-slate-700 text-sm uppercase tracking-wide">Votre note</label>
          <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" className="transition-transform hover:scale-110 focus:outline-none p-1"
                onClick={() => setRating(star)} onMouseEnter={() => setHover(star)}>
                <Star size={32} className={`${star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* CHAMPS CÔTE À CÔTE */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input required name="nom" className="w-full p-3 bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Prénom / Pseudo" />
          </div>
          <div>
            <input name="email" type="email" className="w-full p-3 bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Email (Privé)" />
          </div>
        </div>

        <div>
          <textarea required name="message" rows={3} className="w-full p-3 bg-slate-50 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Votre expérience..."></textarea>
        </div>

        {/* UPLOAD COMPACT */}
        <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-slate-300 rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 text-sm text-slate-500">
          <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
          {file ? (
            <span className="text-green-600 font-bold flex items-center gap-2"><CheckCircle size={16} /> {file.name}</span>
          ) : (
            <><Upload size={16}/> Ajouter une photo (Optionnel)</>
          )}
        </div>

        <button disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all">
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />} Envoyer
        </button>
      </form>
    </div>
  );
}