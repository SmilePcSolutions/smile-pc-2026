"use client";
import { Phone, Mail, MapPin, Send, X, Plus, Loader2, CheckCircle, AlertCircle, Wrench } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.target);
    
    // Ajout des fichiers au formulaire
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFiles([]);
      e.target.reset();
      
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (error: any) {
      console.error("Erreur formulaire:", error);
      setIsSubmitting(false);
      setErrorMessage("Oups ! Une erreur est survenue lors de l'envoi.");
    }
  };

  const handleAddFiles = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as File[];
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      e.target.value = "";
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const getExtension = (filename: string) => {
    return filename.split(".").pop()?.toUpperCase() || "FILE";
  };

  return (
    <div className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Parlons de votre projet</h1>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
          
          {isSuccess && (
            <div className="absolute inset-0 bg-white/95 z-50 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Envoyé !</h3>
              <p>Nous avons bien reçu votre demande.</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3">
              <AlertCircle size={24} />
              <p>{errorMessage}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Prénom <span className="text-red-500">*</span></label>
                <input name="prenom" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Jean" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nom <span className="text-red-500">*</span></label>
                <input name="nom" required className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Dupont" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Téléphone</label>
                <input name="telephone" className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="06 XX XX XX XX" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-red-500">*</span></label>
                <input name="email" required type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="jean@email.com" />
              </div>
            </div>

            {/* ✅ MENU DÉROULANT SUJET PRÉSENT */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Sujet de la demande <span className="text-red-500">*</span></label>
              <div className="relative">
                <select name="sujet" className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option value="Panne / Réparation">🛠️ Panne / Réparation</option>
                  <option value="Demande de Devis">📄 Demande de Devis</option>
                  <option value="Virus / Lenteur">🦠 Virus / Lenteur</option>
                  <option value="Récup. Données">💾 Récup. Données</option>
                  <option value="Autre demande">❓ Autre demande</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  ▼
                </div>
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Votre Message <span className="text-red-500">*</span></label>
                <textarea name="message" required rows={4} className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Décrivez votre problème en détail..."></textarea>
            </div>

            <div className="space-y-3">
              <div 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" ref={fileInputRef} className="hidden" onChange={handleAddFiles} />
                <Plus className="mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-slate-600">Ajouter des documents / photos ({files.length})</p>
              </div>

              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="bg-white p-1 rounded font-bold text-xs text-blue-600 uppercase border">{getExtension(file.name)}</div>
                    <span className="text-sm font-medium truncate text-slate-700">{file.name}</span>
                  </div>
                  <button type="button" onClick={() => removeFile(index)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-full"><X size={18} /></button>
                </div>
              ))}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-200"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Coordonnées</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Phone size={20}/></div>
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Téléphone</p>
                            <p className="font-semibold">06 XX XX XX XX</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center"><Mail size={20}/></div>
                         <div>
                            <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                            {/* ✅ ADRESSE EMAIL CORRIGÉE ICI */}
                            <p className="font-semibold">contact@smilepcsolutions.fr</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
