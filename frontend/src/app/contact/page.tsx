'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, X, ChevronDown, Wrench, ShieldAlert, HardDrive, GraduationCap, FileQuestion, Sparkles } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-5 h-5 text-blue-400"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-5 h-5 text-green-400"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-5 h-5 text-red-400"/> },
    { value: 'Données', label: 'Récupération Données', icon: <HardDrive className="w-5 h-5 text-purple-400"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-5 h-5 text-yellow-400"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-5 h-5 text-slate-400"/> },
  ];

  const selectedOption = sujets.find(s => s.value === sujet);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 3) { alert("Max 3 fichiers."); return; }
      const names = Array.from(files).map(f => f.name);
      setFileNames(names);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...fileNames];
    newFiles.splice(index, 1);
    setFileNames(newFiles);
  };

  const handleCustomSelect = (value: string) => {
    setSujet(value);
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sujet) { setErrorMessage("Merci de choisir un sujet."); return; }
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
      else setErrorMessage('Erreur lors de l\'envoi.');
    } catch {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // FOND GLOBAL : Sombre et élégant pour faire ressortir le "verre"
    <div className="min-h-screen w-full relative bg-[#0B1120] flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* ANIMATION DE FOND (Lueurs mouvantes) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      {/* CARTE PRINCIPALE : L'EFFET "FONDU" (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-5xl bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        {/* GAUCHE : INFOS (Transparence sombre) */}
        <div className="md:w-5/12 p-10 flex flex-col justify-between bg-black/20 border-r border-white/5 relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-2">
              Smile PC <Sparkles className="w-5 h-5 text-yellow-400" />
            </h2>
            <p className="text-slate-400 text-sm mb-10 leading-relaxed">
              Une urgence ? Un projet ?<br/>
              Je vous réponds avec le sourire.
            </p>
            
            <div className="space-y-8">
              <a href="tel:+33600000000" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Téléphone</p>
                  <p className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">06 00 00 00 00</p>
                </div>
              </a>

              <a href="mailto:contact@smilepcsolutions.fr" className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-base font-bold text-white group-hover:text-purple-300 transition-colors truncate">contact@smilepcsolutions.fr</p>
                </div>
              </a>

              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Zone</p>
                  <p className="text-lg font-bold text-white">Moyeuvre-Grande</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-sm font-medium">
             <span className="text-slate-400">Lundi - Samedi</span>
             <span className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/5">09h - 19h</span>
          </div>
        </div>

        {/* DROITE : FORMULAIRE (Fond plus clair pour contraste, mais intégré) */}
        <div className="md:w-7/12 p-10 bg-slate-900/40">
          
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-xl shadow-green-900/20">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">Message envoyé !</h3>
              <p className="text-slate-400 mb-8 text-lg">Je vous réponds très vite.</p>
              <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-white/10">
                Envoyer un autre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" name="_honey" className="hidden" style={{display:'none'}} autoComplete="off" />
              
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Nom</label>
                  <input required name="nom" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:border-blue-500 focus:bg-slate-800 outline-none transition-all placeholder:text-slate-600" placeholder="Votre nom" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Téléphone</label>
                  <input type="tel" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:border-blue-500 focus:bg-slate-800 outline-none transition-all placeholder:text-slate-600" placeholder="06..." />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                <input required type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm focus:border-blue-500 focus:bg-slate-800 outline-none transition-all placeholder:text-slate-600" placeholder="votre@email.com" />
              </div>

              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Sujet</label>
                <button 
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left text-sm flex items-center justify-between focus:border-blue-500 focus:bg-slate-800 outline-none transition-all text-white hover:border-slate-600"
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
                  <div className="absolute z-50 mt-2 w-full bg-[#1e293b] rounded-xl shadow-2xl border border-slate-700 overflow-hidden max-h-64 overflow-y-auto">
                    {sujets.map((s) => (
                      <div 
                        key={s.value} 
                        onClick={() => { setSujet(s.value); setIsSelectOpen(false); }}
                        className="px-4 py-3 hover:bg-slate-700/50 cursor-pointer flex items-center gap-3 text-sm text-slate-200 border-b border-slate-700/30 last:border-0 transition-colors"
                      >
                        {s.icon}
                        <span className="leading-tight">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Message</label>
                <textarea required name="message" rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-sm resize-none focus:border-blue-500 focus:bg-slate-800 outline-none transition-all placeholder:text-slate-600" placeholder="Comment puis-je vous aider ?"></textarea>
              </div>

              {/* ZONE FICHIERS (LISTE VERTICALE & LISIBLE) */}
              <div>
                 <div 
                   onClick={() => fileInputRef.current?.click()}
                   className="group border border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between"
                 >
                   <div className="flex items-center gap-3">
                     <div className="p-2 bg-slate-800 rounded-lg text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors shadow-sm">
                       <Paperclip className="w-4 h-4" />
                     </div>
                     <div className="text-left">
                       <p className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">Joindre des fichiers</p>
                       <p className="text-[10px] text-slate-500">Max 3 • 5 Mo (PDF, JPG...)</p>
                     </div>
                   </div>
                   <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg group-hover:border-slate-600 transition-all">Parcourir</span>
                   <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                 </div>

                 {/* LISTE DES FICHIERS (Verticale & Complète) */}
                 {fileNames.length > 0 && (
                   <div className="mt-3 space-y-2">
                     {fileNames.map((name, i) => (
                       <div key={i} className="flex items-center justify-between bg-slate-800 px-3 py-2.5 rounded-lg border border-slate-700/50 animate-in slide-in-from-left-2">
                         <div className="flex items-center gap-3 overflow-hidden">
                           <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                           {/* Ici on affiche le nom en entier avec break-all si besoin */}
                           <span className="text-xs text-slate-200 truncate max-w-[200px] md:max-w-xs">{name}</span>
                         </div>
                         <button type="button" onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-400 p-1 hover:bg-white/5 rounded transition-colors" title="Supprimer">
                           <X className="w-4 h-4"/>
                         </button>
                       </div>
                     ))}
                   </div>
                 )}
              </div>

              {errorMessage && <p className="text-red-400 text-xs text-center font-bold bg-red-500/10 p-2 rounded-lg border border-red-500/20">{errorMessage}</p>}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-[0.98] mt-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer ma demande</>}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
