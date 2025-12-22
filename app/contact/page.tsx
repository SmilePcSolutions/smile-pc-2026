'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, Send, X, CheckCircle, Loader2, Paperclip, ArrowRight, Sparkles } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Panne / Réparation',
    message: '',
    fileUrls: [] as string[]
  })
  const [fileNames, setFileNames] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // --- LOGIQUE UPLOAD ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setIsUploading(true)
    const newUrls: string[] = []
    const newNames: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > 5 * 1024 * 1024) continue
      const fileExt = file.name.split('.').pop()
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      try {
        const { error } = await supabase.storage.from('contact-uploads').upload(uniqueName, file)
        if (error) throw error
        const { data } = supabase.storage.from('contact-uploads').getPublicUrl(uniqueName)
        newUrls.push(data.publicUrl)
        newNames.push(file.name)
      } catch (error) { console.error("Erreur:", error) }
    }
    setFormData(p => ({ ...p, fileUrls: [...p.fileUrls, ...newUrls] }))
    setFileNames(p => [...p, ...newNames])
    setIsUploading(false)
  }

  const removeFile = (idx: number) => {
    const urls = [...formData.fileUrls]; urls.splice(idx, 1)
    const names = [...fileNames]; names.splice(idx, 1)
    setFormData(p => ({ ...p, fileUrls: urls }))
    setFileNames(names)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', type: 'Panne / Réparation', message: '', fileUrls: [] })
        setFileNames([])
      } else setStatus('error')
    } catch { setStatus('error') }
    finally { setLoading(false) }
  }

  return (
    // CONTENEUR SANS SCROLL (h-screen + overflow-hidden)
    <div className="h-screen w-full bg-[#fdfdff] flex items-center justify-center p-6 overflow-hidden relative font-sans">
      
      {/* 1. FOND AURORA SUBTIL (Inspiré Homepage) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-rose-100/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/20 backdrop-blur-[2px]" />
      </div>

      {/* 2. LA CARTE ARCHITECTURALE (Dimensions optimisées pour 32") */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-6xl h-[700px] bg-white/80 backdrop-blur-3xl border border-white rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex overflow-hidden"
      >
        
        {/* BANDEAU GAUCHE : IDENTITÉ (Largeur fixe pour l'équilibre) */}
        <div className="hidden lg:flex w-[380px] bg-[#2563eb] relative flex-col justify-between p-12 text-white shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700" />
          
          <div className="relative z-10">
            <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest inline-block mb-10">
              Expertise 2026
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-6 leading-tight">
              Smile PC<span className="text-blue-200">.</span>
            </h1>
            <p className="text-blue-100/70 text-sm leading-relaxed font-medium">
              Simplifions votre univers numérique avec excellence et proximité.
            </p>
          </div>

          <div className="relative z-10 space-y-10">
             <div className="flex items-center gap-5">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-lg"><Phone className="w-6 h-6"/></div>
               <div><p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Appel</p><p className="font-bold text-base">06 XX XX XX XX</p></div>
             </div>
             <div className="flex items-center gap-5">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 shadow-lg"><Mail className="w-6 h-6"/></div>
               <div><p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email</p><p className="font-bold text-base text-blue-100">contact@smilepc.fr</p></div>
             </div>
          </div>

          <div className="relative z-10 text-[9px] font-black tracking-[0.3em] opacity-40 uppercase">
            © Smile PC Solutions
          </div>
        </div>

        {/* PANNEAU DROIT : FORMULAIRE (Le coeur du design) */}
        <div className="flex-1 bg-white/40 flex flex-col overflow-hidden">
          
          {/* Header fixe */}
          <div className="px-16 pt-16 pb-8 shrink-0">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter flex items-center gap-4">
              Parlons ensemble <Sparkles className="w-8 h-8 text-blue-500 fill-blue-500" />
            </h2>
            <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Une réponse sous 24 heures maximum</p>
          </div>

          {/* Formulaire Grid (Aucun scroll grâce à h-full) */}
          <div className="flex-1 px-16 pb-16 overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-8">
              
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nom Complet</label>
                  <input type="text" required placeholder="John Doe" className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-lg font-bold text-slate-800 placeholder:text-slate-200 focus:border-blue-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Téléphone</label>
                  <input type="tel" placeholder="06..." className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-lg font-bold text-slate-800 placeholder:text-slate-200 focus:border-blue-500 outline-none transition-all" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Adresse Email</label>
                <input type="email" required placeholder="votre-email@exemple.com" className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-lg font-bold text-slate-800 placeholder:text-slate-200 focus:border-blue-500 outline-none transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-10 items-end">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sujet de l'intervention</label>
                  <select className="w-full bg-white border-b-2 border-slate-100 px-1 py-3 text-lg font-bold text-slate-800 cursor-pointer focus:border-blue-500 outline-none transition-all appearance-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option>🛠️ Panne / Réparation</option>
                    <option>💻 Devis Montage PC</option>
                    <option>🚀 Optimisation</option>
                    <option>❓ Autre demande</option>
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                   <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all font-black text-[11px] uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl p-3 hover:border-blue-200">
                     <Paperclip className="w-4 h-4"/> {isUploading ? "Chargement..." : "Joindre des fichiers"}
                   </button>
                   <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                   <div className="flex gap-2 flex-wrap min-h-[24px]">
                      {fileNames.map((name, i) => (
                        <div key={i} className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-1 rounded-md flex items-center gap-1 border border-blue-100">
                          {name.substring(0, 10)}... <X className="w-3 h-3 cursor-pointer" onClick={() => removeFile(i)}/>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              <div className="space-y-3 grow">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Votre Message</label>
                <textarea required rows={2} placeholder="Comment puis-je vous aider ?" className="w-full bg-slate-50/50 rounded-2xl p-5 text-base font-semibold text-slate-700 placeholder:text-slate-300 focus:ring-4 focus:ring-blue-500/5 focus:bg-white outline-none transition-all resize-none border border-slate-100" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>

              <button type="submit" disabled={loading || isUploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-base shadow-2xl shadow-blue-500/30 transition-all flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-[0.99] disabled:opacity-50">
                {loading ? <Loader2 className="w-6 h-6 animate-spin"/> : <>Envoyer ma demande <ArrowRight className="w-6 h-6"/></>}
              </button>

            </form>
          </div>

          {/* OVERLAY SUCCÈS MODERNE */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center z-50 text-center px-10">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-200">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">C'est en route !</h3>
                <p className="text-slate-400 font-bold max-w-sm mb-12">Votre demande a été transmise. Je reviens vers vous par téléphone ou email d'ici quelques heures.</p>
                <button onClick={() => setStatus('idle')} className="bg-blue-600 text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest">Nouveau message</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}