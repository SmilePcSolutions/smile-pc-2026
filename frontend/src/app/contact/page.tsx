'use client';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { MapPin, Phone, Mail, Clock, Send, Paperclip, CheckCircle, Loader2, FileText, X, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
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
      fileName: fileName 
    };

    try {
      const result = await sendEmail(payload);
      if (result.success || result.data) {
        setIsSuccess(true);
      } else {
        setErrorMessage(typeof result.error === 'string' ? result.error : 'Une erreur est survenue.');
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8">
      
      {/* CADRE PRINCIPAL UNIFIÉ (Style Carte Premium) */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-200 dark:border-slate-800">
        
        {/* COLONNE GAUCHE (Panneau Sombre Infos) */}
        <div className="lg:w-5/12 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Effet de fond subtil */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Contactez-moi</h2>
            <p className="text-slate-300 mb-8 font-medium">Une réponse rapide et un service de qualité sur Moyeuvre-Grande.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Téléphone</p>
                  <a href="tel:+33600000000" className="text-lg font-semibold hover:text-blue-400 transition-colors">06 00 00 00 00</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contact@smilepcsolutions.fr" className="text-lg font-semibold hover:text-blue-400 transition-colors truncate block">contact@smilepcsolutions.fr</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Zone</p>
                  <p className="text-lg font-semibold">Moyeuvre-Grande & alentours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12 bg-white/5 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-lg">Horaires</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex justify-between border-b border-white/10 pb-1"><span>Lun - Ven</span><span className="text-white font-bold">09h - 19h</span></li>
              <li className="flex justify-between border-b border-white/10 pb-1"><span>Samedi</span><span className="text-white font-bold">09h - 18h</span></li>
              <li className="flex justify-between pt-1"><span>Dimanche</span><span className="text-blue-300 font-bold">Urgences</span></li>
            </ul>
          </div>
        </div>

        {/* COLONNE DROITE (Formulaire Blanc) */}
        <div className="lg:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-900">
          
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in py-10">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message envoyé !</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-sm">
                Merci de votre confiance. Je prends connaissance de votre demande et vous réponds rapidement.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="group px-6 py-3 bg-slate-900 dark:bg-slate-700 hover:bg-blue-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
              >
                Envoyer un autre message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                Envoyer un message <span className="text-blue-600">.</span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Nom</label>
                    <input required className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Votre nom" name="nom"/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Téléphone</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="06..." name="phone"/>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Email</label>
                  <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="votre@email.com" name="email"/>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Sujet</label>
                  <div className="relative">
                    <select name="sujet" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer appearance-none">
                      <option value="Panne">🛠️ Panne / Réparation</option>
                      <option value="Devis">📝 Demande de Devis</option>
                      <option value="Virus">🦠 Virus / Lenteur</option>
                      <option value="Données">�� Récupération Données</option>
                      <option value="Autre">❓ Autre demande</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Message</label>
                  <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Comment puis-je vous aider ?"></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Pièce Jointe</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm font-bold border-2 border-slate-100 dark:border-slate-700 flex items-center gap-2 transition-all hover:border-blue-200 group shadow-sm">
                      <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      Parcourir...
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                    </label>
                    
                    {fileName ? (
                      <div className="flex items-center gap-2 text-xs font-medium text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800 animate-in slide-in-from-left-2">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">{fileName}</span>
                        <button type="button" onClick={() => setFileName('')} className="ml-1 hover:text-red-500 p-0.5 rounded-full hover:bg-blue-100 transition-colors"><X className="w-3 h-3"/></button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium ml-1">Aucun fichier</span>
                    )}
                  </div>
                </div>

                {errorMessage && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg border border-red-100">{errorMessage}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 text-sm disabled:opacity-70 transition-all transform active:scale-[0.99] mt-2"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer le message</>}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
