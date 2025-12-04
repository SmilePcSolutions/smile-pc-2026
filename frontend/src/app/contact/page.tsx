'use client';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { MapPin, Phone, Mail, Clock, Send, Paperclip, CheckCircle, Loader2, FileText, X, Sparkles } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // On récupère les noms de tous les fichiers
      const names = Array.from(files).map(f => f.name);
      setFileNames(names);
    } else {
      setFileNames([]);
    }
  };

  const clearFiles = () => {
    setFileNames([]);
    // Note: Pour vider l'input file réellement, il faudrait une référence, 
    // mais pour l'affichage visuel cette méthode suffit pour l'instant.
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      nom: formData.get('nom'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sujet: formData.get('sujet'),
      message: formData.get('message'),
      // On envoie la liste des fichiers sous forme de texte
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
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden font-sans">
      
      {/* FOND ANIMÉ SUBTIL */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-[100px] opacity-40 animate-pulse animation-delay-2000"></div>
      </div>

      {/* CARTE PRINCIPALE (Plus compacte: max-w-4xl) */}
      <div className="relative z-10 w-full max-w-4xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white/40 dark:border-white/10 ring-1 ring-black/5">
        
        {/* COLONNE GAUCHE : IDENTITÉ VISUELLE */}
        <div className="md:w-5/12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Motif discret */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 flex items-center gap-2 tracking-tight">
              Smile PC <Sparkles className="w-5 h-5 text-yellow-300" />
            </h2>
            <p className="text-blue-100 text-sm mb-8 leading-relaxed font-medium opacity-90">
              Expertise technique & bonne humeur.<br/>
              Intervention rapide à domicile.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Appelez-moi</p>
                  <a href="tel:+33600000000" className="text-base font-bold hover:text-blue-200 transition-colors">06 00 00 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Écrivez-moi</p>
                  <a href="mailto:contact@smilepcsolutions.fr" className="text-base font-bold hover:text-blue-200 transition-colors truncate block">contact@smilepcsolutions.fr</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">Zone</p>
                  <p className="text-base font-bold">Moyeuvre-Grande</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
             <div className="flex items-center gap-2 mb-2 text-blue-100">
               <Clock className="w-4 h-4" /> <span className="text-xs font-bold uppercase">Horaires</span>
             </div>
             <div className="text-xs flex justify-between items-center text-white/90 font-medium">
               <span>Lun - Sam</span>
               <span className="bg-white/20 px-2 py-0.5 rounded">09h - 19h</span>
             </div>
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE ÉPURÉ */}
        <div className="md:w-7/12 p-8 bg-transparent">
          
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in py-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Message envoyé !</h3>
              <p className="text-sm text-slate-500 dark:text-slate-300 mb-6">
                Merci de votre confiance. Je vous réponds très vite.
              </p>
              <button onClick={() => setIsSuccess(false)} className="px-6 py-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
                Nouveau message
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Envoyer un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nom</label>
                    <input required className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Votre nom" name="nom"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Téléphone</label>
                    <input type="tel" className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="06..." name="phone"/>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
                  <input required type="email" className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="votre@email.com" name="email"/>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sujet</label>
                  <div className="relative">
                    <select name="sujet" className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer">
                      <option value="Panne">🛠️ Panne / Réparation</option>
                      <option value="Devis">📝 Demande de Devis</option>
                      <option value="Virus">🦠 Virus / Lenteur</option>
                      <option value="Données">💾 Récup. Données</option>
                      <option value="Autre">❓ Autre demande</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">▼</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Message</label>
                  <textarea required name="message" rows={3} className="w-full px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Votre message..."></textarea>
                </div>

                {/* ZONE FICHIERS MULTIPLES */}
                <div className="pt-1">
                   <div className="flex items-center gap-3">
                     <label className="cursor-pointer bg-slate-100 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-colors border border-transparent hover:border-blue-200 shadow-sm">
                        <Paperclip className="w-3.5 h-3.5" /> Joindre des fichiers
                        <input type="file" multiple className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                     </label>
                     <span className="text-[10px] text-slate-400 italic">Max 5 Mo</span>
                   </div>
                   
                   {/* LISTE VERTICALE DES FICHIERS */}
                   {fileNames.length > 0 && (
                      <div className="mt-3 space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
                        {fileNames.map((name, index) => (
                          <div key={index} className="flex items-center justify-between text-xs text-blue-700 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-md border border-blue-100 dark:border-blue-800 animate-in slide-in-from-left-2">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <FileText className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{name}</span>
                            </div>
                            {/* Le bouton croix vide juste la liste pour l'instant pour simplifier l'UX */}
                            <button type="button" onClick={clearFiles} className="text-slate-400 hover:text-red-500 ml-2" title="Tout effacer">
                              <X className="w-3.5 h-3.5"/>
                            </button>
                          </div>
                        ))}
                      </div>
                   )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 text-sm transition-all transform hover:-translate-y-0.5 mt-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer</>}
                </button>
                
                {errorMessage && <p className="text-red-500 text-xs font-bold text-center mt-2">{errorMessage}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
