"use client";
import { Phone, Mail, MapPin, Upload, Send, Calendar, X, Plus, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Pour afficher les erreurs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(""); // Reset erreur

    // 1. On récupère les données du formulaire
    const formData = new FormData(e.target);
    
    // On prépare le paquet pour le serveur
    const payload = {
      nom: `${formData.get('prenom')} ${formData.get('nom')}`, // On combine Prénom + Nom
      email: formData.get('email'),
      telephone: formData.get('telephone'),
      message: formData.get('message')
    };

    try {
      // 2. LA VRAIE CONNEXION (C'est ici que ça se joue !)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      // 3. Si tout est bon :
      setIsSubmitting(false);
      setIsSuccess(true);
      setFiles([]);
      e.target.reset();
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (error: any) {
      // 4. Si ça plante :
      console.error("Erreur formulaire:", error);
      setIsSubmitting(false);
      setErrorMessage("Oups ! Une erreur est survenue. Vérifiez votre connexion ou réessayez.");
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
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Remplissez le formulaire ci-dessous. Réponse garantie sous 24h.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* GAUCHE : Formulaire */}
        <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white/50 relative overflow-hidden">
          
          {/* Message de Succès */}
          {isSuccess && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Envoyé !</h3>
              <p className="text-slate-600">Merci de m'avoir contacté. Je reviens vers vous très vite.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          )}

          {/* Message d'Erreur */}
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
                {/* J'ai ajouté name="prenom" */}
                <input name="prenom" required type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="Jean" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Nom <span className="text-red-500">*</span></label>
                {/* J'ai ajouté name="nom" */}
                <input name="nom" required type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="Dupont" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Téléphone <span className="text-slate-400 font-normal text-xs">(Optionnel)</span></label>
                {/* J'ai ajouté name="telephone" */}
                <input name="telephone" type="tel" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="06 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email <span className="text-red-500">*</span></label>
                {/* J'ai ajouté name="email" */}
                <input name="email" required type="email" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="jean@email.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Votre Message <span className="text-red-500">*</span></label>
              {/* J'ai ajouté name="message" */}
              <textarea name="message" required rows={4} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none" placeholder="Décrivez votre problème..."></textarea>
            </div>

            {/* Zone Upload */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Ajouter des photos / documents ({files.length})
              </label>
              <div 
                className="relative border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  multiple 
                  ref={fileInputRef}
                  className="hidden" 
                  onChange={handleAddFiles} 
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <div className="text-slate-600 font-medium text-sm group-hover:text-blue-600 transition-colors">
                    {files.length > 0 ? "Cliquez pour ajouter d'autres fichiers" : "Cliquez ici pour déposer vos fichiers"}
                  </div>
                </div>
              </div>

              {files.length > 0 && (
                <div className="grid gap-2 mt-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 bg-blue-50/50 border border-blue-100 p-2 pr-4 rounded-xl animate-in fade-in slide-in-from-bottom-2 group hover:bg-white hover:shadow-sm transition-all">
                      <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shrink-0 border border-slate-100 shadow-sm text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                        {getExtension(file.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-700 break-all leading-snug">{file.name}</p>
                        <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} Ko</p>
                      </div>
                      <button onClick={() => removeFile(index)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              disabled={isSubmitting}
              className={`w-full font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                isSubmitting 
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-[1.02] shadow-blue-600/20"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Envoyer ma demande
                </>
              )}
            </button>
          </form>
        </div>

        {/* DROITE : Infos */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
              <h3 className="text-2xl font-bold mb-6 relative z-10">Coordonnées</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Phone size={24} /></div>
                  <div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">Téléphone</div>
                    <div className="text-lg font-semibold">06 XX XX XX XX</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"><Mail size={24} /></div>
                  <div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">Email</div>
                    <div className="text-lg font-semibold">contact@smilepc.fr</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm"><MapPin size={24} /></div>
                  <div>
                    <div className="text-slate-400 text-sm font-bold uppercase tracking-wider">Zone</div>
                    <div className="text-lg font-semibold">Moyeuvre-Grande + 20km</div>
                  </div>
                </div>
             </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg text-center">
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Horaires d'ouverture</h3>
             <p className="text-slate-600 mb-1">Lundi - Vendredi : 9h - 19h</p>
             <p className="text-slate-600">Samedi : 9h - 12h</p>
          </div>
        </div>

      </div>
    </div>
  );
}