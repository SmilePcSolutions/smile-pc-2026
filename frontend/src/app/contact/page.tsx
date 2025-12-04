'use client';
// Version Finale 15:56:03

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { sendEmail } from '../actions/sendEmail';
import { Phone, Mail, MapPin, Send, Paperclip, CheckCircle, Loader2, FileText, ChevronDown, Wrench, ShieldAlert, HardDrive, GraduationCap, FileQuestion } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sujet, setSujet] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  
  const sujets = [
    { value: 'Panne', label: 'Panne / Réparation', icon: <Wrench className="w-5 h-5 text-blue-600"/> },
    { value: 'Devis', label: 'Demande de Devis', icon: <FileText className="w-5 h-5 text-green-600"/> },
    { value: 'Virus', label: 'Virus / Lenteur', icon: <ShieldAlert className="w-5 h-5 text-red-600"/> },
    { value: 'Données', label: 'Récupération Données', icon: <HardDrive className="w-5 h-5 text-purple-600"/> },
    { value: 'Cours', label: 'Cours / Formation', icon: <GraduationCap className="w-5 h-5 text-yellow-600"/> },
    { value: 'Autre', label: 'Autre demande', icon: <FileQuestion className="w-5 h-5 text-slate-600"/> },
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

  const resetForm = () => {
    setFileNames([]);
    setSujet('');
    setErrorMessage('');
    setIsSuccess(false);
    if (formRef.current) formRef.current.reset();
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
      if (result.success || result.data) {
        setIsSuccess(true);
        // On vide le formulaire uniquement SI c'est un succès
        if (formRef.current) formRef.current.reset();
        setFileNames([]);
        setSujet('');
      } else {
        setErrorMessage(typeof result.error === 'string' ? result.error : 'Erreur serveur.');
      }
    } catch {
      setErrorMessage("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-800">
      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] border border-slate-100">
        
        {/* COLONNE GAUCHE */}
        <div className="md:w-5/12 bg-blue-700 text-white p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-10">Contactez-moi</h2>
            <div className="space-y-8">
              <div className="group">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Téléphone</p>
                <a href="tel:0600000000" className="flex items-center gap-3 text-3xl font-bold hover:text-blue-200 transition-colors">
                  <Phone className="w-8 h-8" /> 06 00 00 00 00
                </a>
              </div>
              <div className="group">
                <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:contact@smilepcsolutions.fr" className="flex items-center gap-3 text-xl font-bold hover:text-blue-200 transition-colors break-all">
                  <Mail className="w-6 h-6 flex-shrink-0" /> contact@smilepcsolutions.fr
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-200 uppercase tracking-wider mb-1">Zone d'intervention</p>
                <div className="flex items-center gap-3 text-xl font-bold">
                  <MapPin className="w-6 h-6" /> Moyeuvre-Grande
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 pt-6 border-t border-white/20 mt-auto flex justify-between items-center">
            <span className="text-sm font-medium text-blue-100">Du Lundi au Samedi</span>
            <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-bold">09h - 19h</span>
          </div>
        </div>

        {/* COLONNE DROITE */}
        <div className="md:w-7/12 p-8 md:p-12 bg-white overflow-y-auto">
          {isSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">Message envoyé !</h3>
              <p className="text-slate-500 mb-8 text-lg">Je vous réponds très rapidement.</p>
              <button onClick={() => setIsSuccess(false)} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-transform hover:scale-105">
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col justify-center">
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-slate-800">Envoyer un message</h3>
                <p className="text-slate-500">Remplissez le formulaire ci-dessous.</p>
              </div>
              <input type="text" name="_honey" className="hidden" style={{display:'none'}} autoComplete="off" />
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom</label>
                  <input required name="nom" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 transition-all font-medium" placeholder="Votre nom" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Téléphone</label>
                  <input type="tel" name="phone" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 transition-all font-medium" placeholder="06..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                <input required type="email" name="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-900 transition-all font-medium" placeholder="votre@email.com" />
              </div>

              <div className="space-y-2 relative z-50">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sujet</label>
                <button type="button" onClick={() => setIsSelectOpen(!isSelectOpen)} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 font-medium">
                  {selectedOption ? <span className="flex items-center gap-2">{selectedOption.icon} {selectedOption.label}</span> : <span className="text-slate-400">Choisir...</span>}
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </button>
                {isSelectOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-[100] max-h-60 overflow-y-auto">
                    {sujets.map((s) => (
                      <div key={s.value} onClick={() => handleCustomSelect(s.value)} className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-2 text-sm text-slate-700 border-b border-slate-100 last:border-0">
                        {s.icon} <span>{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                <textarea required name="message" rows={3} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium" placeholder="Comment puis-je vous aider ?"></textarea>
              </div>

              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all text-center group">
                <input type="file" multiple ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" name="file" />
                <div className="flex items-center justify-center gap-2">
                  <Paperclip className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-blue-700">
                    {fileNames.length > 0 ? ${fileNames.length} fichiers ajoutés : "Ajouter des pièces jointes"}
                  </span>
                </div>
                {fileNames.length > 0 && <div className="mt-3 flex flex-wrap justify-center gap-2">{fileNames.map((n, i) => <span key={i} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium truncate max-w-[150px]">{n}</span>)}</div>}
              </div>

              {errorMessage && <p className="text-red-500 text-sm text-center font-bold bg-red-50 p-3 rounded-xl">{errorMessage}</p>}

              <button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-lg transition-all transform active:scale-[0.98]">
                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Send className="w-5 h-5" /> Envoyer le message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}