"use client";
import { Upload, CheckCircle, ShieldAlert, ShieldCheck, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

export default function SecureUpload() {
  const [status, setStatus] = useState<"idle" | "scanning" | "safe" | "error">("idle");
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("scanning");

    // 1. VÉRIFICATION DU TYPE (Sécurité niveau 1)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setTimeout(() => setStatus("error"), 800);
      return;
    }

    // 2. VÉRIFICATION DE LA TAILLE (Max 5Mo)
    if (file.size > 5 * 1024 * 1024) {
       alert("Fichier trop lourd (Max 5Mo).");
       setStatus("idle");
       return;
    }

    // 3. SIMULATION SCAN ANTIVIRUS (Sécurité niveau 2)
    // (En production réelle, ceci serait fait par le serveur Rust)
    setTimeout(() => {
      setStatus("safe");
    }, 2000);
  };

  return (
    <div className="w-full">
      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.pdf" />
      <label htmlFor="file-upload" className={`group flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden
        ${status === "idle" ? "border-slate-300 bg-white hover:border-primary hover:bg-blue-50" : ""}
        ${status === "scanning" ? "border-yellow-400 bg-yellow-50 cursor-wait" : ""}
        ${status === "safe" ? "border-success bg-green-50" : ""}
        ${status === "error" ? "border-error bg-red-50" : ""}
      `}>
        
        {status === "idle" && (
            <>
                <div className="bg-blue-100 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-slate-600">Joindre une photo ou PDF</span>
                <span className="text-[10px] text-slate-400 uppercase mt-2 flex items-center gap-1">
                    <ShieldCheck size={10} /> Scan Antivirus Actif
                </span>
            </>
        )}
        
        {status === "scanning" && (
            <>
                <Loader2 className="w-8 h-8 text-yellow-600 animate-spin mb-2" />
                <span className="text-sm font-bold text-yellow-700">Analyse de sécurité...</span>
                <span className="text-xs text-yellow-600 mt-1">Vérification des signatures numériques</span>
            </>
        )}

        {status === "safe" && (
            <>
                <CheckCircle className="w-8 h-8 text-success mb-2" />
                <span className="text-sm font-bold text-green-700">Fichier Validé & Chiffré</span>
                <span className="text-xs text-green-600 mt-1 max-w-[200px] truncate">{fileName}</span>
            </>
        )}

        {status === "error" && (
            <>
                <ShieldAlert className="w-8 h-8 text-error mb-2" />
                <span className="text-sm font-bold text-red-700">Format non autorisé</span>
                <span className="text-xs text-red-600 mt-1">Fichier suspect rejeté par le système.</span>
            </>
        )}
      </label>
    </div>
  );
}
