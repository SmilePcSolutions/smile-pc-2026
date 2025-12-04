'use client';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { MapPin, Phone, Mail, Clock, Send, Paperclip, CheckCircle, Loader2, FileText, X } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  // Gestion de l'affichage du fichier sélectionné
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
      // Note: L'envoi réel du fichier binaire nécessiterait une conversion Base64
      // Pour l'instant on envoie le nom du fichier pour indiquer qu'il y a une PJ
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
    <div className="w-full py-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* EN-TÊTE COMPACT */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">
            Contactez-moi
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
            Réponse rapide assurée sur Moyeuvre-Grande et alentours.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          
          {/* COLONNE GAUCHE (4/12) : INFOS */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Carte Coordonnées */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Mes Coordonnées</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Téléphone</p>
                    <a href="tel:+33600000000" className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600">06 00 00 00 00</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Email</p>
                    <a href="mailto:contact@smilepcsolutions.fr" className="text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 truncate block">contact@smilepcsolutions.fr</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Zone</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Moyeuvre-Grande</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Horaires Compacte */}
            <div className="bg-slate-900 dark:bg-blue-950 p-5 rounded-2xl shadow-lg text-white">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">Horaires</h3>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Lun - Ven</span><span className="text-white font-bold">09h - 19h</span></li>
                <li className="flex justify-between border-b border-slate-700/50 pb-1"><span>Samedi</span><span className="text-white font-bold">09h - 18h</span></li>
                <li className="flex justify-between pt-1"><span>Dimanche</span><span className="text-blue-300 font-bold">Urgences</span></li>
              </ul>
            </div>
          </div>

          {/* COLONNE DROITE (8/12) : FORMULAIRE */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
            
            {isSuccess ? (
              <div className="h-64 flex flex-col items-center justify-center text-center animate-in fade-in py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message envoyé !</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">Je vous réponds très vite.</p>
                <button onClick={() => setIsSuccess(false)} className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg text-sm font-medium">Nouveau message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">NOM</label>
                    <input required className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Votre nom" name="nom"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">TÉLÉPHONE</label>
                    <input type="tel" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="06..." name="phone"/>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">EMAIL</label>
                    <input required type="email" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="votre@email.com" name="email"/>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">SUJET</label>
                    <select name="sujet" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer">
                      <option value="Panne">🛠️ Panne / Réparation</option>
                      <option value="Devis">📝 Demande de Devis</option>
                      <option value="Virus">🦠 Virus / Lenteur</option>
                      <option value="Données">💾 Récupération Données</option>
                      <option value="Autre">❓ Autre demande</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">MESSAGE</label>
                  <textarea required name="message" rows={3} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm resize-none focus:ring-1 focus:ring-blue-500 outline-none" placeholder="Comment puis-je vous aider ?"></textarea>
                </div>

                {/* ZONE PIÈCE JOINTE AMÉLIORÉE */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">PIÈCE JOINTE (Optionnel)</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors border border-slate-200 dark:border-slate-700">
                      <Paperclip className="w-4 h-4" />
                      Parcourir...
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                    </label>
                    
                    {fileName ? (
                      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-md border border-blue-100 dark:border-blue-800">
                        <FileText className="w-4 h-4" />
                        <span className="truncate max-w-[200px]">{fileName}</span>
                        <button type="button" onClick={() => setFileName('')} className="ml-1 hover:text-red-500"><X className="w-3 h-3"/></button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Aucun fichier choisi</span>
                    )}
                  </div>
                </div>

                {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-70 transition-all mt-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
