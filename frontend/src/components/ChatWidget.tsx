"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation"; // Pour savoir sur quelle page on est
import { MessageCircle, X, Send, Loader2, User, ShieldCheck, Paperclip, FileText, Trash2, RotateCcw, Lock } from "lucide-react";

export default function ChatWidget() {
  const pathname = usePathname(); // On récupère l'adresse actuelle
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mountTime, setMountTime] = useState(0);
  
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMountTime(Date.now()); }, []);

  // 🛑 RÈGLE D'OR : SI ON EST SUR LA PAGE CONTACT, ON CACHE LE CHAT
  if (pathname === "/contact") {
    return null;
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setErrorMsg("");
    if (f) {
      if (!["image/jpeg", "image/png", "application/pdf"].includes(f.type)) {
        setErrorMsg("Format interdit (PDF, JPG, PNG)."); return;
      }
      if (f.size > 10 * 1024 * 1024) {
        setErrorMsg("Max 10 Mo."); return;
      }
      setFile(f);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const data = new FormData();
      data.append("name", formData.name || "Via Chat");
      data.append("contact", formData.contact);
      data.append("message", "🔴 MESSAGE CHAT : " + formData.message);
      data.append("time_start", mountTime.toString());
      if (file) data.append("file", file);
      
      const res = await fetch("/api/send", { method: "POST", body: data });
      const json = await res.json();

      if (res.ok) {
        setStep(2);
        setFormData(prev => ({ ...prev, message: "" }));
        setFile(null);
      } else {
        setErrorMsg(json.error || "Erreur serveur.");
      }
    } catch (err) {
      setErrorMsg("Erreur connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 animate-in fade-in zoom-in duration-500">
      {isOpen && (
        <div className="w-[350px] bg-white/90 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col max-h-[85vh] ring-1 ring-black/5">
          
          {/* HEADER */}
          <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">S</div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-orange-500 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <p className="font-bold text-sm flex items-center gap-1">Smile PC <Lock className="w-3 h-3 text-green-400"/></p>
                <p className="text-[10px] text-slate-300">Actuellement en intervention</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-4 bg-slate-50/80 flex-1 overflow-y-auto flex flex-col gap-4 relative">
            
            {/* MESSAGE ACCUEIL */}
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1"><User className="w-4 h-4"/></div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none text-sm text-slate-600 shadow-sm border border-slate-100">
                Bonjour ! 👋 Je suis sûrement en clientèle. Laissez-moi votre message (et une photo si besoin), je le reçois sur ma montre connectée !
              </div>
            </div>

            {step === 0 && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1">
                <input required className="p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" placeholder="Votre Nom" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}/>
                <input required className="p-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500" placeholder="Email ou Tél" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})}/>
                <div className="relative">
                  <textarea required rows={3} className="w-full p-3 pb-10 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-blue-500 resize-none" placeholder="Votre message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}/>
                  <div className="absolute bottom-2 left-2">
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Joindre (Max 10Mo)"><Paperclip className="w-4 h-4" /></button>
                  </div>
                </div>

                {file && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-2 rounded-lg text-xs animate-in fade-in">
                    <div className="flex items-center gap-2 overflow-hidden"><FileText className="w-4 h-4 text-blue-600 shrink-0" /><span className="truncate max-w-[180px] font-medium text-blue-800">{file.name}</span></div>
                    <button type="button" onClick={() => {setFile(null); if(fileInputRef.current) fileInputRef.current.value=""}} className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )}

                {errorMsg && <p className="text-xs text-red-500 font-bold text-center bg-red-50 p-2 rounded-lg">{errorMsg}</p>}

                <button disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin"/> : <><Send className="w-4 h-4"/> Envoyer</>}
                </button>
                <p className="text-[10px] text-center text-slate-400 flex justify-center items-center gap-1 mt-1"><ShieldCheck className="w-3 h-3 text-green-600"/> Upload crypté & Sécurisé</p>
              </form>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4 animate-in fade-in zoom-in">
                <div className="flex gap-3 items-start justify-end">
                  <div className="bg-slate-800 text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-md text-center">
                    <p className="font-bold text-lg mb-1">Bien reçu ! ✅</p>
                    <p className="opacity-80">Je vous recontacte très vite.</p>
                  </div>
                </div>
                <button onClick={() => setStep(0)} className="mx-auto flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm">
                  <RotateCcw className="w-3 h-3" /> Nouveau message
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="group h-14 w-14 bg-slate-900 hover:bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-white/20">
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
        {!isOpen && <span className="absolute top-0 right-0 flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span></span>}
      </button>
    </div>
  );
}
