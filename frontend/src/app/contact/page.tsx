'use client';

import { useState, useRef } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, X, ChevronDown, HardDrive, Wrench, ShieldAlert, FileQuestion, GraduationCap } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Gestion Fichiers
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion Menu Sujet
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-4 h-4 text-blue-500"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-4 h-4 text-green-500"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-4 h-4 text-red-500"/> },
    { value: 'Données', label: 'Récupération Données', icon: <HardDrive className="w-4 h-4 text-purple-500"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-4 h-4 text-yellow-500"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-4 h-4 text-slate-500"/> },
  ];

  // Trouve l'option sélectionnée pour l'affichage
  const selectedOption = sujets.find(s => s.value === sujet);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const names = Array.from(files).map(f => f.name);
      setFileNames(names);
    }
  };

  const handleCustomSelect = (value: string) => {
    setSujet(value);
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sujet) {
      setErrorMessage("Merci de sélectionner un sujet.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      nom: formData.get('nom'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sujet: sujet,
      message: formData.get('message'),
      fileName: fileNames.join(', ') 
    };

    try {
      const result = await sendEmail(payload);
      if (result.success || result.data) setIsSuccess(true);
      else setErrorMessage(typeof result.error === 'string' ? result.error : 'Une erreur est survenue.');
    } catch (error: any) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-6 font-sans relative overflow-hidden">
      
      {/* FOND D'AMBIANCE */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
      </div>

      {/* CONTENEUR CENTRAL */}
      <div className="relative z-10 w-full max-w-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 dark:border-white/5 flex flex-col overflow-visible">
        
        {/* EN-TÊTE */}
        <div className="text-center pt-10 pb-6 px-8 border-b border-slate-100 dark:border-slate-800/50">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">Contactez-moi</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Réponse rapide assurée sur Moyeuvre-Grande.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a href="tel:+33600000000" className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-blue-500" /> 06 00 00 00 00
            </a>
            <a href="mailto:contact@smilepcsolutions.fr" className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-400 transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-500" /> contact@smilepcsolutions.fr
            </a>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-blue-500" /> Moyeuvre-Grande
            </span>
          </div>
        </div>

        {/* CORPS DU FORMULAIRE */}
        <div className="p-8 md:p-10">
          {isSuccess ? (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in py-10">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">C'est envoyé !</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs">
                Merci. Je reviens vers vous très vite.
              </p>
              <button onClick={() => setIsSuccess(false)} className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Nom</label>
                  <input required name="nom" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="Votre nom" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Téléphone</label>
                  <input type="tel" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="06..." />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                <input required type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="votre@email.com" />
              </div>

              {/* MENU DÉROULANT SÉCURISÉ */}
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Sujet</label>
                <button 
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                >
                  {selectedOption ? (
                    <span className="flex items-center gap-2 text-slate-900 dark:text-white">
                      {selectedOption.icon}
                      <span>{selectedOption.label}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Choisir un sujet...</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSelectOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {sujets.map((s) => (
                      <div 
                        key={s.value}
                        onClick={() => handleCustomSelect(s.value)}
                        className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Message</label>
                <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="Je vous écoute..."></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Fichiers (Optionnel)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-center group"
                >
                  <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef}
                    className="hidden" 
                    onChange={handleFileChange} 
                    accept=".jpg,.jpeg,.png,.pdf" 
                    name="file" 
                  />
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-full group-hover:scale-110 transition-transform">
                      <Paperclip className="w-5 h-5 text-blue-500" />
                    </div>
                    {fileNames.length > 0 ? (
                      <div className="text-left w-full space-y-1">
                        {fileNames.map((name, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-blue-600 bg-white dark:bg-slate-800 px-2 py-1 rounded border border-blue-100 dark:border-slate-700 shadow-sm">
                            <FileText className="w-3 h-3 shrink-0" />
                            <span className="truncate">{name}</span>
                          </div>
                        ))}
                        <p className="text-[10px] text-center text-slate-400 mt-2">Cliquez pour changer</p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        Cliquez ici pour ajouter des fichiers <br/>
                        <span className="text-[10px] font-normal opacity-70">(Max 5 Mo • JPG, PNG, PDF)</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg text-center">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer ma demande</>}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
