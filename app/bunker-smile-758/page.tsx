import { getAvis, toggleAvis, deleteAvis, loginAdmin, logout } from "@/app/actions";
import { cookies } from "next/headers";
import { CheckCircle, XCircle, Trash2, LogOut, ShieldCheck, Lock, Mail, Star } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const store = await cookies();
  const isAuth = store.get("admin_session")?.value === "true";

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
          <div className="text-center mb-8"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} /></div><h1 className="text-2xl font-bold text-slate-900">Admin Sécurisé</h1></div>
          <form action={async (formData) => { "use server"; await loginAdmin(formData); }} className="space-y-4">
            <input type="password" name="password" placeholder="Mot de passe..." required className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg">Déverrouiller</button>
          </form>
        </div>
      </div>
    );
  }

  const list = await getAvis();
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10"><h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3"><ShieldCheck className="text-blue-600"/> Panneau de Contrôle</h1><form action={logout}><button className="flex gap-2 text-slate-500 font-bold bg-white px-4 py-2 rounded-xl shadow-sm"><LogOut size={20} /> Déconnexion</button></form></div>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-slate-500 font-bold text-sm uppercase">Total</h3><p className="text-4xl font-bold text-blue-600 mt-2">{list.length}</p></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-slate-500 font-bold text-sm uppercase">En attente</h3><p className="text-4xl font-bold text-orange-500 mt-2">{list.filter(a => !a.approved).length}</p></div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-slate-500 font-bold text-sm uppercase">Visible</h3><p className="text-4xl font-bold text-green-500 mt-2">{list.filter(a => a.approved).length}</p></div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left"><thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase"><tr><th className="p-6">Date</th><th className="p-6">Client</th><th className="p-6">Note</th><th className="p-6">Message</th><th className="p-6 text-center">État</th><th className="p-6 text-right">Actions</th></tr></thead>
          <tbody className="divide-y divide-slate-50">{list.map(a => (
            <tr key={a.id} className="hover:bg-slate-50/50"><td className="p-6 text-sm text-slate-500">{new Date(a.created_at).toLocaleDateString()}</td><td className="p-6 font-bold">{a.nom}<br/><span className="text-xs text-slate-400 font-normal">{a.email}</span></td><td className="p-6 text-yellow-400">{"★".repeat(a.note)}</td><td className="p-6 text-sm italic">"{a.message}"</td><td className="p-6 text-center">{a.approved?<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Visible</span>:<span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">En attente</span>}</td><td className="p-6 text-right flex justify-end gap-2"><form action={toggleAvis.bind(null, a.id, a.approved)}><button className="p-2 border rounded-lg text-green-600 border-green-200 hover:bg-green-50"><CheckCircle size={20}/></button></form><form action={deleteAvis.bind(null, a.id)}><button className="p-2 border rounded-lg text-red-400 border-slate-200 hover:bg-red-50"><Trash2 size={20}/></button></form></td></tr>
          ))}</tbody></table>
        </div>
      </div>
    </div>
  );
}