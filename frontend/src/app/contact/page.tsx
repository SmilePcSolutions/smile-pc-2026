"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock, Upload, Send, ChevronDown, AlertCircle, CheckCircle } from "lucide-react";
import { sendEmail } from "../actions/sendEmail"; 

// Règles de sécurité pour les fichiers (stricte)
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 Mo
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];

const formSchema = z.object({
  nom: z.string().min(2, { message: "Nom trop court." }),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, { message: "Numéro invalide." }),
  email: z.string().email({ message: "Email invalide." }),
  sujet: z.string().min(1, { message: "Choisissez un motif." }),
  message: z.string().min(10, { message: "Message trop court." }),
  files: z
    .any()
    .refine((files) => files?.[0] ? files?.[0]?.size <= MAX_FILE_SIZE : true, 'Taille max : 5 Mo.')
    .refine((files) => files?.[0] ? ACCEPTED_FILE_TYPES.includes(files?.[0]?.type) : true, "Seuls .jpg, .png et .pdf sont acceptés.")
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  
  // Fonction qui gère l'encodage du fichier
  const encodeFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    let fileData = undefined;
    let finalFileName = fileName;

    // 1. Gérer le fichier et l'encoder si présent
    const file = data.files?.[0];
    if (file) {
      try {
        fileData = await encodeFileToBase64(file);
        finalFileName = file.name;
      } catch (error) {
        setErrorMessage("Erreur de lecture du fichier.");
        setIsSubmitting(false);
        return;
      }
    }
    
    // 2. Préparer les données pour l'action serveur
    const payload = {
      ...data,
      fileName: finalFileName,
      fileData: fileData,
    };

    // 3. Appel au serveur
    const result = await sendEmail(payload);
    
    if (result.success) {
      setIsSuccess(true);
      reset();
      setFileName(""); // Effacer le nom du fichier
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setErrorMessage("Échec de l'envoi. Vérifiez le mot de passe Vercel ou votre connexion OVH.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Contactez-moi</h1>
          <p className="text-base text-slate-600 dark:text-slate-400 font-medium">Une réponse rapide assurée.</p>
          <p className="text-sm text-red-500 mt-2">Le formulaire ne fonctionne pas en ligne si vous n'avez pas redéployé avec les variables SMTP de Vercel.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Infos */}
          <div className="flex flex-col gap-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Informations</h3>
              <div className="space-y-4">
                <ContactItem icon={<Phone className="w-5 h-5" />} label="Téléphone" value="06 00 00 00 00" href="tel:+33600000000" />
                <ContactItem icon={<Mail className="w-5 h-5" />} label="Email" value="contact@smilepcsolutions.fr" href="mailto:contact@smilepcsolutions.fr" />
                <ContactItem icon={<MapPin className="w-5 h-5" />} label="Zone" value="Moyeuvre-Grande et alentours" />
              </div>
            </div>
            <div className="bg-slate-900 dark:bg-blue-950 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <Clock className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold">Horaires</h3>
              </div>
              <ul className="space-y-2 relative z-10 text-slate-300 text-sm">
                <li className="flex justify-between border-b border-slate-800 pb-1"><span>Lun - Ven</span><span className="font-bold text-white">09h - 19h</span></li>
                <li className="flex justify-between border-b border-slate-800 pb-1"><span>Samedi</span><span className="font-bold text-white">09h - 18h</span></li>
                <li className="flex justify-between pt-1"><span>Dimanche</span><span className="text-blue-400 font-bold">Urgences</span></li>
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
            
            {/* Message de succès */}
            {isSuccess && (
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/95 flex flex-col items-center justify-center z-20 backdrop-blur-sm animate-in fade-in zoom-in">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Demande Envoyée !</h3>
                <p className="text-slate-600 dark:text-slate-400">Une confirmation vous a été envoyée par mail.</p>
              </div>
            )}

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Envoyer un message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Nom</label>
                  <input {...register("nom")} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm dark:text-white focus:border-blue-500" placeholder="Votre nom" />
                  {errors.nom && <p className="text-red-500 text-xs">{errors.nom.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Téléphone</label>
                  <input {...register("phone")} type="tel" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm dark:text-white focus:border-blue-500" placeholder="06..." />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email</label>
                <input {...register("email")} type="email" className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm dark:text-white focus:border-blue-500" placeholder="email@exemple.com" />
                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              </div>
              <div className="space-y-1 relative">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Objet</label>
                <div className="relative">
                  <select {...register("sujet")} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none appearance-none cursor-pointer text-slate-700 dark:text-white text-sm focus:border-blue-500">
                    <option value="">Choisir...</option>
                    <option value="Panne">🛠️ Panne / Réparation</option>
                    <option value="Virus">🦠 Virus / Lenteur</option>
                    <option value="Données">💾 Récupération Données</option>
                    <option value="Cours">🎓 Cours Informatique</option>
                    <option value="Autre">❓ Autre demande</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.sujet && <p className="text-red-500 text-xs">{errors.sujet.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message</label>
                <textarea {...register("message")} rows={3} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-sm resize-none dark:text-white focus:border-blue-500" placeholder="Votre message..."></textarea>
                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
              </div>

              {/* Pièce Jointe - UI et Sécurité */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Pièce Jointe (Optionnel)</label>
                <div className="relative">
                  <input
                    type="file"
                    {...register("files")}
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFileName(file.name);
                      } else {
                        setFileName("");
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="border-2 border-dashed border-blue-200 dark:border-slate-700 rounded-lg bg-blue-50/30 dark:bg-slate-800/50 p-3 text-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors">
                    {fileName ? (
                      <span className="text-blue-600 dark:text-blue-300 font-bold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" /> {fileName}
                      </span>
                    ) : (
                      <span className="text-xs text-blue-700 dark:text-blue-300 font-bold flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Parcourir... (Max 5Mo - JPG, PNG, PDF)
                      </span>
                    )}
                  </div>
                </div>
                {errors.files && <p className="text-red-500 text-xs">{String(errors.files.message)}</p>}
              </div>

              {errorMessage && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{errorMessage}</div>}

              <button type="submit" disabled={isSubmitting} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-70 transition-all">
                {isSubmitting ? "Envoi en cours..." : <>Envoyer <Send className="w-4 h-4" /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: any, label: string, value: string, href?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0">{icon}</div>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-white">{label}</p>
        {href ? <a href={href} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-sm transition-colors">{value}</a> : <p className="text-slate-600 dark:text-slate-400 text-sm">{value}</p>}
      </div>
    </div>
  );
}

