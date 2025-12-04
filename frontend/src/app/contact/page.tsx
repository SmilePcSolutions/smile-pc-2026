'use client';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail'; // Connexion au serveur
import { MapPin, Phone, Mail, Clock, Send, Upload, Loader2, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    // Conversion des données pour notre action serveur
    const payload = {
      nom: formData.get('nom'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      sujet: formData.get('sujet'),
      message: formData.get('message'),
    };

    try {
      const result = await sendEmail(payload);
      if (result.success || result.data) {
        setIsSuccess(true);
      } else {
        setErrorMessage(typeof result.error === 'string' ? result.error : 'Une erreur est survenue.');
      }
    } catch (error) {
      setErrorMessage("Erreur de connexion. Réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* EN-TÊTE */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Contactez-moi
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Une question ? Un dépannage ? Je vous réponds dans la journée.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* COLONNE GAUCHE : INFOS */}
          <div className="flex flex-col gap-6">
            {/* Carte Coordonnées */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informations</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Téléphone</p>
                    <a href="tel:+33600000000" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">06 00 00 00 00</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</p>
                    <a href="mailto:contact@smilepcsolutions.fr" className="text-lg font-semibold text-slate-900 dark:text-white hover:text-blue-600 transition-colors">contact@smilepcsolutions.fr</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Zone d'intervention</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">Moyeuvre-Grande et alentours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Horaires */}
            <div className="bg-slate-900 dark:bg-blue-950 p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-700 group-hover:bg-blue-400/30"></div>
              
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <Clock className="w-7 h-7 text-blue-400" />
                <h3 className="text-2xl font-bold">Horaires</h3>
              </div>
              
              <ul className="space-y-4 relative z-10 text-slate-300">
                <li className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                  <span>Lun - Ven</span>
                  <span className="font-bold text-white bg-slate-800 px-3 py-1 rounded-full text-sm">09h - 19h</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                  <span>Samedi</span>
                  <span className="font-bold text-white bg-slate-800 px-3 py-1 rounded-full text-sm">09h - 18h</span>
                </li>
                <li className="flex justify-between items-center pt-2">
                  <span>Dimanche</span>
                  <span className="text-blue-200 font-bold bg-blue-900/50 px-3 py-1 rounded-full text-sm border border-blue-700/50">Urgences</span>
                </li>
              </ul>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE */}
          <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            
            {isSuccess ? (
              // VUE SUCCÈS
              <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Message envoyé !</h3>
                <p className="text-slate-600 dark:text-slate-300 max-w-xs mx-auto mb-8">
                  Merci de m'avoir contacté. Je vous répondrai sur votre adresse email très rapidement.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full font-medium transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              // VUE FORMULAIRE
              <>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Envoyer un message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Nom</label>
                      <input required className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Votre nom" name="nom"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Téléphone</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" placeholder="06..." name="phone"/>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" placeholder="email@exemple.com" name="email"/>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Objet</label>
                    <div className="relative">
                      <select name="sujet" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none appearance-none cursor-pointer text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all">
                        <option value="Devis">📝 Demande de Devis</option>
                        <option value="Panne">🛠️ Panne / Réparation</option>
                        <option value="Virus">🦠 Virus / Lenteur</option>
                        <option value="Données">💾 Récupération Données</option>
                        <option value="Cours">🎓 Cours Informatique</option>
                        <option value="Autre">❓ Autre demande</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Message</label>
                    <textarea required name="message" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Expliquez-moi votre problème..."></textarea>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
