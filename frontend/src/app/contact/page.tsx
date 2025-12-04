'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, X, ChevronDown, Wrench, ShieldAlert, HardDrive, GraduationCap, FileQuestion, Sparkles } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Fichiers
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Menu Sujet Custom
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-5 h-5 text-blue-400"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-5 h-5 text-green-400"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-5 h-5 text-red-400"/> },
    { value: 'Données', label: 'Récupération de Données (Disque/USB)', icon: <HardDrive className="w-5 h-5 text-purple-400"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-5 h-5 text-yellow-400"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-5 h-5 text-slate-400"/> },
  ];

  const selectedOption = sujets.find(s => s.value === sujet);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 3) { alert("Max 3 fichiers."); return; }
      const names = Array.from(e.target.files).map(f => f.name);
      setFileNames(names);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...fileNames];
    newFiles.splice(index, 1);
    setFileNames(newFiles);
    // Note: On ne vide pas l'input file réel ici pour simplifier l'UX visuelle
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sujet) { setErrorMessage("Choisissez un sujet."); return; }
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      nom: formData.get('nom'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sujet: sujet,
      message: formData.get('message'),
      fileName: fileNames.join(', '),
      _honey: formData.get('_honey')
    };

    try {
      const result = await sendEmail(payload);
      if (result.success || result.data) setIsSuccess(true);
      else setErrorMessage('Erreur envoi.');
    } catch {
      setErrorMessage("Erreur connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-[#0f172a] flex items-center justify-center p-4 font-sans overflow-hidden">
      
      {/* 1. FOND ANIMÉ "VIVANT" */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      {/* 2. LA CARTE EN VERRE (Ultra Centrée & Compacte) */}
      <div className="relative z-10 w-full max-w-lg bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-500">
        
        {isSuccess ? (
          <div className="p-12 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Reçu !</h3>
            <p className="text-slate-400 mb-8">Je vous réponds très rapidement.</p>
            <button onClick={() => setIsSuccess(false)} className="px-6 py-2 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform">
              Nouveau message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
            
            {/* Header Formulaire */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                Smile PC <Sparkles className="w-5 h-5 text-yellow-400" />
              </h2>
              <p className="text-slate-400 text-xs mt-1">Dépannage Informatique & Moyeuvre-Grande</p>
            </div>

            <input type="text" name="_honey" className="hidden" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Nom</label>
                <input required name="nom" className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-sm focus:border-blue-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-600" placeholder="Votre nom" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Téléphone</label>
                <input type="tel" name="phone" className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-sm focus:border-blue-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-600" placeholder="06..." />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Email</label>
              <input required type="email" name="email" className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-sm focus:border-blue-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-600" placeholder="votre@email.com" />
            </div>

            {/* MENU CUSTOM (Pour voir les icônes) */}
            <div className="space-y-1 relative">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Sujet</label>
              <button 
                type="button"
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-left text-sm flex items-center justify-between outline-none text-white hover:border-slate-500 transition-colors"
              >
                {selectedOption ? (
                  <span className="flex items-center gap-3">
                    {selectedOption.icon} 
                    <span className="truncate">{selectedOption.label}</span>
                  </span>
                ) : <span className="text-slate-500">Choisir une demande...</span>}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isSelectOpen && (
                <div className="absolute z-50 mt-2 w-full bg-[#1e293b] rounded-xl shadow-2xl border border-slate-700 overflow-hidden max-h-60 overflow-y-auto">
                  {sujets.map((s) => (
                    <div 
                      key={s.value} 
                      onClick={() => { setSujet(s.value); setIsSelectOpen(false); }}
                      className="px-4 py-3 hover:bg-slate-700 cursor-pointer flex items-center gap-3 text-sm text-slate-200 border-b border-slate-700/50 last:border-0"
                    >
                      {s.icon}
                      <span className="leading-tight">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Message</label>
              <textarea required name="message" rows={3} className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 text-white text-sm resize-none focus:border-blue-500 focus:bg-slate-900 outline-none transition-all placeholder:text-slate-600" placeholder="Comment puis-je vous aider ?"></textarea>
            </div>

            {/* ZONE FICHIERS (Compacte & Claire) */}
            <div>
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="group border border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-900/30 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between"
               >
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-800 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                     <Paperclip className="w-4 h-4" />
                   </div>
                   <div className="text-left">
                     <p className="text-xs font-bold text-slate-300 group-hover:text-white">Joindre des fichiers</p>
                     <p className="text-[10px] text-slate-500">Max 3 • 5 Mo (PDF, JPG...)</p>
                   </div>
                 </div>
                 <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded">Parcourir</span>
                 <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
               </div>

               {/* LISTE DES FICHIERS SÉLECTIONNÉS */}
               {fileNames.length > 0 && (
                 <div className="mt-3 space-y-2">
                   {fileNames.map((name, i) => (
                     <div key={i} className="flex items-center justify-between bg-slate-800/50 px-3 py-2 rounded-lg border border-white/5">
                       <div className="flex items-center gap-2 overflow-hidden">
                         <FileText className="w-3 h-3 text-blue-400 shrink-0" />
                         <span className="text-xs text-slate-300 truncate">{name}</span>
                       </div>
                       <button type="button" onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-400"><X className="w-3 h-3"/></button>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            {errorMessage && <p className="text-red-400 text-xs text-center font-bold bg-red-900/20 p-2 rounded-lg">{errorMessage}</p>}

            <button type="submit" disabled={isSubmitting} className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-[0.98]">
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer</>}
            </button>

            {/* FOOTER DISCRET */}
            <div className="flex justify-center gap-6 pt-2 opacity-60">
                <a href="tel:0600000000" className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"><Phone className="w-3 h-3"/> 06 00 00 00 00</a>
                <a href="mailto:contact@smilepcsolutions.fr" className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"><Mail className="w-3 h-3"/> Email</a>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
