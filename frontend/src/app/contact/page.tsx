'use client';

import { useState, useRef } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, X, ChevronDown, HardDrive, Wrench, ShieldAlert, FileQuestion, GraduationCap } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Gestion Fichiers
  const [fileNames, setFileNames] = useState([]);
  const fileInputRef = useRef(null);

  // Gestion Menu Sujet
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-4 h-4 text-blue-600"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-4 h-4 text-green-600"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-4 h-4 text-red-600"/> },
    { value: 'Données', label: 'Récupération Données', icon: <HardDrive className="w-4 h-4 text-purple-600"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-4 h-4 text-yellow-600"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-4 h-4 text-slate-600"/> },
  ];

  const selectedOption = sujets.find(s => s.value === sujet);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const names = Array.from(files).map(f => f.name);
      setFileNames(names);
    }
  };

  const handleCustomSelect = (value) => {
    setSujet(value);
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e) => {
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
    } catch (error) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 font-sans">
      
      {/* CADRE PRINCIPAL : SPLIT SCREEN (Gauche Couleur / Droite Blanc) */}
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* COLONNE GAUCHE : LE VISUEL FORT (Bleu Solide) */}
        <div className="md:w-5/12 bg-blue-600 text-white p-10 flex flex-col justify-between relative">
          {/* Cercle déco subtil */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Contactez-moi</h2>
            <p className="text-blue-100 text-lg mb-12 font-medium">
              Une question technique ?<br/>
              Besoin d'un devis ?<br/>
              Je vous réponds rapidement.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Téléphone</p>
                  <a href="tel:+33600000000" className="text-xl font-bold hover:text-blue-200 transition-colors">06 00 00 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contact@smilepcsolutions.fr" className="text-lg font-bold hover:text-blue-200 transition-colors truncate block">contact@smilepcsolutions.fr</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Zone</p>
                  <p className="text-lg font-bold">Moyeuvre-Grande</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-10 pt-6 border-t border-white/20 flex justify-between items-center text-sm font-medium">
             <span>Lundi - Samedi</span>
             <span className="bg-white text-blue-700 px-3 py-1 rounded-full font-bold shadow-sm">09h - 19h</span>
          </div>
        </div>

        {/* COLONNE DROITE : LE FORMULAIRE NET (Fond Blanc) */}
        <div className="md:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-900 flex flex-col justify-center">
          
          {isSuccess ? (
            <div className="flex flex-col items-center text-center animate-in fade-in zoom-in">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message envoyé !</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
                C'est noté. Je reviens vers vous très vite.
              </p>
              <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                Envoyer un autre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Envoyer un message</h3>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nom</label>
                  <input required name="nom" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Votre nom" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Téléphone</label>
                  <input type="tel" name="phone" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="06..." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                <input required type="email" name="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="votre@email.com" />
              </div>

              {/* MENU DÉROULANT SOLIDE */}
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-slate-500 uppercase">Sujet</label>
                <button 
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-left text-sm flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  {selectedOption ? (
                    <span className="flex items-center gap-2 text-slate-800 font-medium">
                      {selectedOption.icon}
                      <span>{selectedOption.label}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Choisir un sujet...</span>
                  )}
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isSelectOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-1">
                    {sujets.map((s) => (
                      <div 
                        key={s.value}
                        onClick={() => handleCustomSelect(s.value)}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm text-slate-700 transition-colors"
                      >
                        {s.icon}
                        <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">Message</label>
                <textarea required name="message" rows={3} className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Je vous écoute..."></textarea>
              </div>

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 rounded-lg p-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center group"
              >
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                <div className="flex items-center justify-center gap-2">
                  <Paperclip className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-600 group-hover:text-blue-600">
                    {fileNames.length > 0 ? `${fileNames.length} fichier(s) sélectionné(s)` : "Ajouter des pièces jointes"}
                  </span>
                </div>
                {fileNames.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {fileNames.map((name, i) => (
                      <span key={i} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-md border border-blue-200 truncate max-w-[150px]">{name}</span>
                    ))}
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg text-center border border-red-100">
                  {errorMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-[0.98] mt-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer</>}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
