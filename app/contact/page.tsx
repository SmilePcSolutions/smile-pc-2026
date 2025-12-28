"use client";

import { useMemo, useRef, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";

const MAX_FILES = 3;
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
];

function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} Mo`;
}

function extOf(name: string) {
  const p = name.split(".").pop();
  return (p ? p.toUpperCase() : "FILE").slice(0, 6);
}

export default function ContactPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const helperText = useMemo(() => {
    return `Formats : PDF, JPG, PNG • ${MAX_FILES} fichiers max • ${formatBytes(
      MAX_FILE_SIZE
    )} / fichier`;
  }, []);

  const openFilePicker = () => fileInputRef.current?.click();

  const addFiles = (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;
    setErrorMessage("");

    const incoming = Array.from(picked);

    if (files.length + incoming.length > MAX_FILES) {
      setErrorMessage(`Maximum ${MAX_FILES} fichiers autorisés.`);
      return;
    }

    for (const f of incoming) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setErrorMessage(`Format non supporté : ${f.name}`);
        return;
      }
      if (f.size > MAX_FILE_SIZE) {
        setErrorMessage(`Fichier trop lourd : ${f.name} (max ${formatBytes(MAX_FILE_SIZE)})`);
        return;
      }
    }

    setFiles((prev) => [...prev, ...incoming]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    files.forEach((f) => formData.append("files", f));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Erreur lors de l'envoi");
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      setFiles([]);
      form.reset();
      
      setTimeout(() => setIsSuccess(false), 5000);

    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err?.message || "Oups ! Une erreur est survenue.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] pt-14 pb-20 relative">
      {/* Fond doux (Style Sauvegarde Vercel) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-slate-50 to-white" />
      <div className="absolute inset-0 -z-10 opacity-70 [background:radial-gradient(900px_500px_at_30%_20%,rgba(59,130,246,0.10),transparent_60%),radial-gradient(700px_450px_at_70%_35%,rgba(99,102,241,0.10),transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* COLONNE GAUCHE (Infos & Style) */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
              <ShieldCheck size={16} />
              RÉPONSE SOUS 24H
            </div>

            <h1 className="mt-5 text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Contact
              <span className="text-blue-600"> Sécurisé</span>.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Vos informations sont traitées uniquement pour répondre à votre demande.
              Vous pouvez joindre des photos ou un PDF pour expliquer le problème.
            </p>

            <div className="mt-8 space-y-3 max-w-xl">
              <div className="flex items-center gap-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Urgence / Appel</p>
                  <p className="font-semibold text-slate-900">06 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Email Pro</p>
                  <p className="font-semibold text-slate-900">contact@smilepcsolutions.fr</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/80 border border-slate-100 shadow-sm px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[11px] uppercase font-bold text-slate-400">Zone d’intervention</p>
                  <p className="font-semibold text-slate-900">Moyeuvre-Grande (+20 km)</p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE (Formulaire Design) */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-[2.25rem] border border-slate-100 shadow-xl p-6 sm:p-8">
              
              {/* Message de succès */}
              {isSuccess && (
                <div className="absolute inset-0 z-20 rounded-[2.25rem] bg-white/95 flex flex-col items-center justify-center text-center px-8">
                  <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <CheckCircle size={40} />
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900">Message envoyé !</p>
                  <p className="mt-2 text-slate-600">Je reviens vers vous rapidement.</p>
                </div>
              )}

              <div className="text-sm font-extrabold text-slate-900 mb-6">Votre demande</div>

              {errorMessage && (
                <div className="mb-5 p-4 rounded-2xl bg-red-50 text-red-700 border border-red-100 flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5" />
                  <p className="text-sm leading-relaxed">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot Invisible */}
                <input type="text" name="honeypot_company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Prénom *</label>
                    <input name="prenom" required className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Nom *</label>
                    <input name="nom" required className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Dupont" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Téléphone</label>
                    <input name="telephone" className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="06 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Email *</label>
                    <input name="email" type="email" required className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="jean@email.com" />
                  </div>
                </div>

                {/* ✅ SUJET (AJOUTÉ) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Sujet de la demande *</label>
                  <div className="relative">
                    <select name="sujet" required className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 pr-10 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/20">
                      <option value="Panne / Réparation">🛠️ Panne / Réparation</option>
                      <option value="Demande de Devis">📄 Demande de Devis</option>
                      <option value="Virus / Lenteur">🦠 Virus / Lenteur</option>
                      <option value="Récup. Données">💾 Récup. Données</option>
                      <option value="Autre demande">❓ Autre demande</option>
                    </select>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">▼</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Votre message *</label>
                  <textarea name="message" required rows={4} className="w-full rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="Comment puis-je vous aider ?" />
                </div>

                {/* Upload Fichiers */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">Pièce jointe</label>
                  <input ref={fileInputRef} type="file" multiple className="hidden" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(e) => { addFiles(e.target.files); e.currentTarget.value = ""; }} />
                  
                  <button type="button" onClick={openFilePicker} className="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-white hover:bg-slate-50 transition-colors px-4 py-4 flex items-center justify-center gap-2 text-slate-700">
                    <UploadCloud size={18} className="text-blue-600" />
                    <span className="text-sm font-semibold">Cliquez pour ajouter un fichier</span>
                  </button>
                  <p className="mt-2 text-xs text-slate-500">{helperText}</p>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((f, idx) => (
                        <div key={idx} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="shrink-0 text-[11px] font-extrabold text-blue-600 bg-white border border-blue-100 px-2 py-1 rounded-lg">{extOf(f.name)}</span>
                            <div className="min-w-0"><p className="text-sm font-semibold text-slate-800 truncate">{f.name}</p><p className="text-xs text-slate-500">{formatBytes(f.size)}</p></div>
                          </div>
                          <button type="button" onClick={() => removeFile(idx)} className="shrink-0 p-2 rounded-lg hover:bg-red-50 text-red-500"><X size={16} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button disabled={isSubmitting} className="w-full rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold py-4.5 px-5 flex items-center justify-center gap-2 transition-colors disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}