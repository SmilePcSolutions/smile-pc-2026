'use client';

import { useState } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { MapPin, Phone, Mail, Clock, Send, Paperclip, CheckCircle, Loader2, FileText, X, Sparkles } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
    else setFileName('');
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
      if (result.success || result.data) setIsSuccess(true);
      else setErrorMessage(typeof result.error === 'string' ? result.error : 'Une erreur est survenue.');
    } catch (error) {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // FOND AVEC "VIE" (Dégradés subtils en arrière-plan)
    <div className="min-h-screen relative bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* Formes d'ambiance (Blobs) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[20%] w-72 h-72 bg-pink-500/10 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* CARTE PRINCIPALE */}
      <div className="relative z-10 w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-visible border border-white/20">
        
        {/* COLONNE GAUCHE : VISUEL VIBRANT */}
        <div className="lg:w-5/12 bg-gradient-to-br from-blue-700 via-blue-600 to-purple-700 text-white p-10 flex flex-col justify-between relative rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none overflow-hidden">
          {/* Motif de fond */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 flex items-center gap-2">
              Smile PC <Sparkles className="w-6 h-6 text-yellow-300" />
            </h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed">
              Une urgence ? Un projet ?<br/>
              Je vous réponds avec le sourire.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Appelez-moi</p>
                  <a href="tel:+33600000000" className="text-lg font-bold hover:text-white transition-colors">06 00 00 00 00</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Écrivez-moi</p>
                  <a href="mailto:contact@smilepcsolutions.fr" className="text-lg font-bold hover:text-white transition-colors truncate block">contact@smilepcsolutions.fr</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Zone</p>
                  <p className="text-lg font-bold">Moyeuvre-Grande</p>
                </div>
              </div>
            </div>
          </div>

          {/* Horaires intégrés */}
          <div className="relative z-10 mt-10 bg-black/20 p-4 rounded-2xl backdrop-blur-md border border-white/5">
             <div className="flex items-center gap-2 mb-2 text-blue-200">
               <Clock className="w-4 h-4" /> <span className="text-sm font-bold uppercase">Disponibilités</span>
             </div>
             <div className="text-sm flex justify-between items-center text-white/90">
               <span>Lundi - Samedi</span>
               <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">09h - 19h</span>
             </div>
          </div>
        </div>

        {/* COLONNE DROITE : FORMULAIRE PROPRE */}
        <div className="lg:w-7/12 p-8 md:p-12 bg-white dark:bg-slate-900">
          
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in py-10">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3">Reçu 5/5 !</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-sm text-lg">
                Votre message est bien arrivé. Je regarde ça et je reviens vers vous rapidement.
              </p>
              <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-slate-900 dark:bg-blue-600 text-white rounded-xl font-bold hover:scale-105 transition-transform">
                Envoyer un autre
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
                Envoyer un message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Nom</label>
                    <input required className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all" placeholder="Votre nom" name="nom"/>
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Téléphone</label>
                    <input type="tel" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all" placeholder="06..." name="phone"/>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Email</label>
                  <input required type="email" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all" placeholder="votre@email.com" name="email"/>
                </div>

                <div className="group relative">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Sujet</label>
                  <select name="sujet" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-medium focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none appearance-none cursor-pointer">
                    <option value="Panne">🛠️ Panne / Réparation</option>
                    <option value="Devis">📝 Demande de Devis</option>
                    <option value="Virus">🦠 Virus / Lenteur</option>
                    <option value="Données">�� Récup. Données (Disque/USB)</option>
                    <option value="Autre">❓ Autre demande</option>
                  </select>
                  <div className="absolute right-4 top-[3.2rem] pointer-events-none text-slate-400">▼</div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-blue-600 transition-colors">Message</label>
                  <textarea required name="message" rows={4} className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-medium resize-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all" placeholder="Dites-moi tout..."></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                   <label className="cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-5 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors w-full sm:w-auto justify-center border-2 border-transparent hover:border-blue-200">
                      <Paperclip className="w-4 h-4" /> Joindre un fichier
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                   </label>
                   
                   {fileName && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-100 w-full sm:w-auto">
                        <FileText className="w-4 h-4 shrink-0" />
                        <span className="truncate">{fileName}</span>
                        <button type="button" onClick={() => setFileName('')} className="ml-auto hover:text-red-500"><X className="w-4 h-4"/></button>
                      </div>
                   )}

                   <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 text-base transition-all transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Envoyer</>}
                  </button>
                </div>

                {errorMessage && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{errorMessage}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
