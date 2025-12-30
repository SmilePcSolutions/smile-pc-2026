"use client";
import { useState, useRef } from "react";
import { Star, Upload, CheckCircle, Loader2, Send } from "lucide-react";

export default function AvisForm() {
  const [rate, setRate] = useState(5);
  const [hover, setHover] = useState(0);
  const [load, setLoad] = useState(false);
  const [ok, setOk] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File|null>(null);

  const sub = async (e: any) => {
    e.preventDefault(); setLoad(true);
    const fd = new FormData(e.currentTarget);
    fd.append("note", rate.toString());
    if (file) fd.append("files", file);
    try {
      const r = await fetch("/api/avis", { method: "POST", body: fd });
      if(!r.ok) throw new Error();
      setOk(true); setFile(null); setRate(5); e.target.reset();
    } catch { alert("Erreur."); } finally { setLoad(false); }
  };

  if (ok) return <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl text-center border border-green-100 dark:border-green-900"><h3 className="text-xl font-bold text-green-800 dark:text-green-400">Merci !</h3><button onClick={()=>setOk(false)} className="mt-4 text-green-700 dark:text-green-500 font-bold underline">Nouveau message</button></div>;

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 max-w-3xl mx-auto mb-12 transition-colors">
      <form onSubmit={sub} className="space-y-6">
        <input name="b_check" className="hidden" />
        <div className="flex flex-col items-center gap-2">
          <label className="font-bold text-slate-700 dark:text-slate-300 text-sm uppercase">Votre note</label>
          <div className="flex gap-1" onMouseLeave={()=>setHover(0)}>{[1,2,3,4,5].map(s=><button key={s} type="button" onClick={()=>setRate(s)} onMouseEnter={()=>setHover(s)} className="p-1"><Star size={32} className={s<=(hover||rate)?"fill-yellow-400 text-yellow-400":"text-slate-200 dark:text-slate-600"}/></button>)}</div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <input required name="nom" className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nom" />
            <input name="email" type="email" className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email (Privé)" />
        </div>
        <textarea required name="message" rows={3} className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500" placeholder="Votre message..."></textarea>
        
        <div onClick={()=>fileRef.current?.click()} className="border border-dashed border-slate-300 dark:border-slate-600 p-3 rounded-lg flex justify-center items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-500 dark:text-slate-400 text-sm">
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>e.target.files&&setFile(e.target.files[0])} />
            {file?<span className="text-green-600 dark:text-green-400 font-bold flex gap-2"><CheckCircle size={16}/> {file.name}</span>:<><Upload size={16}/> Photo (Optionnel)</>}
        </div>
        
        <button disabled={load} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition shadow-md">{load?<Loader2 className="animate-spin"/>:<Send size={18}/>} Envoyer</button>
      </form>
    </div>
  );
}