'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, X, ChevronDown, Wrench, ShieldAlert, HardDrive, GraduationCap, FileQuestion } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-4 h-4 text-blue-400"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-4 h-4 text-green-400"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-4 h-4 text-red-400"/> },
    { value: 'Données', label: 'Récupération Données', icon: <HardDrive className="w-4 h-4 text-purple-400"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-4 h-4 text-yellow-400"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-4 h-4 text-slate-400"/> },
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

  const handleCustomSelect = (value: string) => {
    setSujet(value);
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sujet) { setErrorMessage("Sélectionnez un sujet"); return; }
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
    } catch (error) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // 1. HAUTEUR FIXE (h-screen) et OVERFLOW HIDDEN pour interdire le scroll
    <div className="h-screen w-full relative bg-slate-950 flex items-center justify-center overflow-hidden font-sans p-2">
      
      {/* --- ARRIÈRE-PLAN ANIMÉ --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/30 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] bg-indigo-500/20 rounded-full blur-[80px] animate-bounce duration-[10s]"></div>
      </div>

      {/* --- CARTE COMPACTE (max-h-[95vh]) --- */}
      <div className="relative z-10 w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[95vh]">
        
        {/* GAUCHE : INFOS COMPACTES */}
        <div className="md:w-4/12 p-6 flex flex-col justify-between bg-black/20 border-b md:border-b-0 md:border-r border-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Contact</h2>
            <p className="text-slate-400 text-xs mb-6">Réponse dans la journée.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Téléphone</p>
                  <a href="tel:+33600000000" className="text-slate-200 text-sm font-medium hover:text-white transition-colors">06 00 00 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Email</p>
                  <a href="mailto:contact@smilepcsolutions.fr" className="text-slate-200 text-sm font-medium hover:text-white transition-colors truncate block">contact@smilepcsolutions.fr</a>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase">Zone</p>
                  <p className="text-slate-200 text-sm font-medium">Moyeuvre-Grande</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Lun - Sam</span>
              <span className="text-white font-bold">09h - 19h</span>
            </div>
          </div>
        </div>

        {/* DROITE : FORMULAIRE COMPACT */}
        <div className="md:w-8/12 p-6 bg-white/80 dark:bg-slate-900/80">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Envoyé !</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Je reviens vers vous très vite.</p>
              <button onClick={() => setIsSuccess(false)} className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-xs">
                Nouveau message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="_honey" className="hidden" style={{ display: 'none' }} autoComplete="off" />
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Nom</label>
                  <input required name="nom" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none text-xs dark:text-white" placeholder="Votre nom" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Téléphone</label>
                  <input type="tel" name="phone" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none text-xs dark:text-white" placeholder="06..." />
                </div>
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <input required type="email" name="email" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none text-xs dark:text-white" placeholder="votre@email.com" />
              </div>

              <div className="space-y-0.5 relative">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Sujet</label>
                <button type="button" onClick={() => setIsSelectOpen(!isSelectOpen)} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left text-xs flex items-center justify-between outline-none dark:text-white h-9">
                  {selectedOption ? <span className="flex items-center gap-2">{selectedOption.icon} {selectedOption.label}</span> : <span className="text-slate-400">Choisir...</span>}
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
                {isSelectOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden max-h-40 overflow-y-auto">
                    {sujets.map((s) => (
                      <div key={s.value} onClick={() => handleCustomSelect(s.value)} className="px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                        {s.icon} <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-0.5">
                <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Message</label>
                <textarea required name="message" rows={3} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 resize-none focus:border-blue-500 outline-none text-xs dark:text-white" placeholder="Votre message..."></textarea>
              </div>

              <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50/10 transition-all text-center group">
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                <div className="flex items-center justify-center gap-2">
                  <Paperclip className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">
                    {fileNames.length > 0 ? `${fileNames.length} fichiers` : "Ajouter fichiers"}
                  </span>
                </div>
                {fileNames.length > 0 ? (
                   <div className="mt-1 flex flex-wrap justify-center gap-1">{fileNames.map((n, i) => <span key={i} className="text-[9px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded truncate max-w-[80px]">{n}</span>)}</div>
                ) : (
                   <p className="text-[8px] text-slate-400 mt-0.5">Max 3 • 5 Mo</p>
                )}
              </div>

              {errorMessage && <p className="text-red-500 text-[10px] text-center font-bold">{errorMessage}</p>}

              <button type="submit" disabled={isSubmitting} className="w-full h-9 bg-slate-900 dark:bg-blue-600 hover:opacity-90 text-white font-bold rounded-lg shadow-md flex items-center justify-center gap-2 text-xs transition-all mt-1">
                {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Send className="w-3 h-3" /> Envoyer</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
