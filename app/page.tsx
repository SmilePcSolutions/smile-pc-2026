import Link from "next/link";
import { Wrench, ShieldCheck, Wifi, ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 -z-10" />
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-full text-sm font-bold mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Disponible aujourd'hui à Moyeuvre-Grande
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            Réparation PC & <br />
            <span className="text-blue-600">Assistance Informatique</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Votre ordinateur est lent, bloqué ou infecté ? J'interviens à domicile pour réparer, optimiser et sécuriser votre matériel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-slate-900 dark:bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition shadow-xl flex items-center justify-center gap-2">
              Demander un dépannage <ArrowRight size={18} />
            </Link>
            <Link href="/prestations" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center">
              Voir les prestations
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES RAPIDES */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center mb-6"><Wrench size={28}/></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">PC lent & optimisation</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Nettoyage complet, suppression des virus et accélération de Windows pour retrouver un PC comme neuf.</p>
            </div>
            <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mb-6"><ShieldCheck size={28}/></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Sécurité & Données</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Récupération de données perdues, configuration de sauvegardes et installation d'antivirus.</p>
            </div>
            <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Wifi size={28}/></div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Wi-Fi & Installation</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Installation de Box Internet, imprimantes, et résolution des problèmes de connexion Wi-Fi.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}