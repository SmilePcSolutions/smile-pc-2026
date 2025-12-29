import { getAvis } from "@/app/actions";
import AvisForm from "@/components/AvisForm";
import { Star, Quote, Calendar } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function P() {
  const all = await getAvis();
  const list = all.filter(a => a.approved);
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8"><h1 className="text-3xl font-bold text-slate-900">Avis Clients ⭐</h1><p className="text-slate-500 mt-2">Votre avis compte pour nous</p></div>
      <AvisForm />
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Derniers avis ({list.length})</h2>
        <div className="grid gap-4">{list.length===0?<p className="text-slate-500 italic">Aucun avis pour le moment.</p>:list.map(a=>(
          <div key={a.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">{a.nom[0].toUpperCase()}</div><div><h3 className="font-bold text-slate-900">{a.nom}</h3>{a.verified&&<span className="text-[10px] uppercase font-bold text-green-600 bg-green-50 px-2 rounded-full">Client Vérifié</span>}</div></div>
              <div className="flex items-center gap-1 text-xs text-slate-400"><Calendar size={12}/> {new Date(a.created_at).toLocaleDateString()}</div>
            </div>
            <div className="flex text-yellow-400 mb-3">{[...Array(5)].map((_,i)=><Star key={i} size={16} fill={i<a.note?"currentColor":"none"} className={i<a.note?"":"text-slate-200"}/>)}</div>
            <div className="bg-slate-50 p-4 rounded-lg relative"><Quote className="absolute top-2 left-2 text-slate-200 -scale-x-100 opacity-50"/><p className="text-slate-700 italic relative z-10 pl-4">"{a.message}"</p></div>
          </div>
        ))}</div>
      </div>
    </div>
  );
}