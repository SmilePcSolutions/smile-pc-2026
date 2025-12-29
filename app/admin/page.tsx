import { getAvis, toggleAvis, deleteAvis, loginAdmin, logout } from "@/app/actions";
import { cookies } from "next/headers";
import { CheckCircle, XCircle, Trash2, LogOut, ShieldCheck, Lock, Mail, Star } from "lucide-react";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "true";

  // --- ECRAN DE CONNEXION ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Espace Admin</h1>
            <p className="text-slate-500 mt-2">Veuillez vous identifier</p>
          </div>
          
          {/* Correction TypeScript : On utilise une fonction async wrapper */}
          <form 
            action={async (formData) => {
              "use server";
              await loginAdmin(formData);
            }} 
            className="space-y-4"
          >
            <input 
              type="password" name="password" placeholder="Mot de passe..." required 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all">
              Déverrouiller
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- TABLEAU DE BORD ---
  const avisList = await getAvis();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <ShieldCheck className="text-blue-600" size={32} />
              Panneau de Contrôle
            </h1>
            <p className="text-slate-500 mt-1">Gérez les avis de vos clients en temps réel.</p>
          </div>
          <form action={logout}>
            <button className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-semibold bg-white px-5 py-3 rounded-xl shadow-sm hover:shadow-md transition-all">
              <LogOut size={20} />
              Déconnexion
            </button>
          </form>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wide">Total Avis</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{avisList.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wide">En attente</h3>
            <p className="text-4xl font-bold text-orange-500 mt-2">{avisList.filter(a => !a.approved).length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 font-semibold text-sm uppercase tracking-wide">En ligne</h3>
            <p className="text-4xl font-bold text-green-500 mt-2">{avisList.filter(a => a.approved).length}</p>
          </div>
        </div>

        {/* TABLEAU */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-6">Date</th>
                  <th className="p-6">Client</th>
                  <th className="p-6">Note</th>
                  <th className="p-6 w-1/3">Message</th>
                  <th className="p-6 text-center">État</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {avisList.map((avis) => (
                  <tr key={avis.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 text-sm text-slate-500 whitespace-nowrap">
                      {new Date(avis.created_at).toLocaleDateString('fr-FR')}
                      <br/>
                      <span className="text-xs text-slate-400">{new Date(avis.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-slate-900 text-base">{avis.nom}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <Mail size={12} /> {avis.email}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={16} fill={i < avis.note ? "currentColor" : "none"} className={i < avis.note ? "" : "text-slate-200"} />
                        ))}
                      </div>
                    </td>
                    <td className="p-6 text-slate-600 text-sm italic leading-relaxed">
                      "{avis.message}"
                    </td>
                    
                    <td className="p-6 text-center">
                      {avis.approved ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                          <CheckCircle size={12} /> Visible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200 animate-pulse">
                          En attente
                        </span>
                      )}
                    </td>

                    <td className="p-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle */}
                        <form action={toggleAvis.bind(null, avis.id, avis.approved)}>
                          <button 
                            className={`p-2 rounded-lg transition-colors border ${avis.approved ? 'border-orange-200 text-orange-600 hover:bg-orange-50' : 'border-green-200 text-green-600 hover:bg-green-50'}`}
                            title={avis.approved ? "Masquer cet avis" : "Valider cet avis"}
                          >
                            {avis.approved ? <XCircle size={20} /> : <CheckCircle size={20} />}
                          </button>
                        </form>

                        {/* Supprimer */}
                        <form action={deleteAvis.bind(null, avis.id)}>
                          <button 
                            className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                            title="Supprimer définitivement"
                          >
                            <Trash2 size={20} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {avisList.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-400 bg-slate-50/30">
                      Aucun avis pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}