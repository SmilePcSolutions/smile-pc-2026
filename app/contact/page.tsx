"use client";
import { Phone, Mail, MapPin, Send, X, Plus, Loader2, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactPage() {
  // ✅ Ces lignes doivent être PRÉSENTES pour corriger tes erreurs rouges
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
        body: formData, // Envoi en mode FormData pour les pièces jointes
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
              <p>Le mail avec votre pièce jointe est en route.</p>
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
              <input name="prenom" required className="px-5 py-4 rounded-2xl bg-slate-50 outline-none" placeholder="Prénom" />
              <input name="nom" required className="px-5 py-4 rounded-2xl bg-slate-50 outline-none" placeholder="Nom" />
            </div>
            <input name="email" required type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none" placeholder="Email" />
            <textarea name="message" required rows={4} className="w-full px-5 py-4 rounded-2xl bg-slate-50 outline-none" placeholder="Votre problème..."></textarea>

            <div className="space-y-3">
              <div 
                className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:bg-slate-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleAddFiles} />
                <Plus className="mx-auto mb-2 text-blue-600" />
                <p className="text-sm text-slate-600">Ajouter des documents ({files.length})</p>
              </div>

              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-xl">
                  <span className="text-sm font-medium truncate">{file.name}</span>
                  <button type="button" onClick={() => removeFile(index)} className="text-red-500"><X size={18} /></button>
                </div>
              ))}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              {isSubmitting ? "Envoi..." : "Envoyer ma demande"}
            </button>
          </form>
        </div>

        {/* Coordonnées à droite */}
        <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem]">
                <h3 className="text-2xl font-bold mb-6">Coordonnées</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-4"><Phone /> 06 XX XX XX XX</div>
                    <div className="flex items-center gap-4"><Mail /> contact@smilepc.fr</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}