'use client';
import { useState, useRef } from 'react';
import { Star, Upload, X, Send, Video, Image as ImageIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Temoigner() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (files.length + newFiles.length > 3) { alert("Maximum 3 fichiers."); return; }
      
      const isTooBig = newFiles.some(file => file.size > 10 * 1024 * 1024);
      if (isTooBig) { alert("Vidéo trop lourde (Max 10Mo)."); return; }

      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  async function handleSubmit(e: any) {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setStatus('Envoi...');

    const formData = new FormData(e.target);
    formData.delete('files');
    files.forEach((f) => formData.append('files', f));
    
    const nom = formData.get('nom');
    // On construit le sujet et le message proprement
    formData.append('sujet', `⭐ NOUVEL AVIS (${rating}/5) de ${nom}`);
    formData.append('message', `Note : ${rating}/5\n\n` + formData.get('message'));

    if (formData.get('website_check')) { setIsSubmitting(false); return; }

    try {
      const res = await fetch('/api/send', { method: 'POST', body: formData });
      if (res.ok) { setStatus('success'); e.target.reset(); setFiles([]); setRating(5); } 
      else { setStatus('error'); }
    } catch { setStatus('error'); }
    setIsSubmitting(false);
  }

  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950 min-h-screen  flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-2xl">
        
        <Link href="/reviews" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-6 ">
            <ChevronLeft className="w-4 h-4 mr-1" /> Retour aux avis
        </Link>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 text-center">
            Laisser un témoignage
          </h1>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Votre avis m'aide énormément. Merci de votre confiance !
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="website_check" className="hidden" autoComplete="off" />

            {/* ÉTOILES CORRIGÉES */}
            <div className="flex flex-col items-center gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Votre note</label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="transition-transform hover:scale-110 focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star 
                                className={`w-10 h-10 ${
                                    star <= (hoverRating || rating) 
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "text-slate-300 dark:text-slate-700"
                                }`} 
                            />
                        </button>
                    ))}
                </div>
                <p className="text-sm font-bold text-yellow-500">{rating}/5</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Votre Prénom</label>
                <input type="text" name="nom" required placeholder="Ex: Jean" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 outline-none dark:text-white" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email (Resté privé)</label>
                <input type="email" name="email" required placeholder="Votre email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 outline-none dark:text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Votre message</label>
              <textarea name="message" rows={4} required placeholder="Racontez votre expérience..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 outline-none dark:text-white resize-none"></textarea>
            </div>

            {/* UPLOAD */}
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-blue-200 dark:border-slate-700 rounded-xl bg-blue-50/30 dark:bg-slate-800/50 p-6 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800  group"
            >
                <div className="flex justify-center gap-4 mb-2">
                    <ImageIcon className="w-8 h-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <Video className="w-8 h-8 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 font-bold">Ajouter une photo ou une petite vidéo</p>
                <p className="text-xs text-slate-500">(Max 3 fichiers - Max 10Mo)</p>
                <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" />
            </div>

            {files.length > 0 && (
                <ul className="grid grid-cols-1 gap-2">
                    {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-sm dark:text-white">
                            <span className="truncate">{file.name}</span>
                            <button type="button" onClick={() => removeFile(index)} className="text-red-500"><X className="w-4 h-4" /></button>
                        </li>
                    ))}
                </ul>
            )}

            {status === 'success' && <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center font-bold animate-in zoom-in">Merci ! Votre avis a bien été envoyé.</div>}
            {status === 'error' && <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center">Erreur lors de l'envoi.</div>}

            <button type="submit" disabled={isSubmitting} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg  active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? 'Envoi en cours...' : <>Envoyer mon avis <Send className="w-5 h-5" /></>}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
