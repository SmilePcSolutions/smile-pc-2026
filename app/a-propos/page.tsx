import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">À Propos de Moi 👨‍💻</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Passionné d'informatique au service de Moyeuvre-Grande.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 mb-12">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Mon Engagement</h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Je suis un technicien indépendant localisé à Moyeuvre-Grande. Mon objectif est simple : rendre l'informatique accessible et sans stress pour les particuliers et les petites entreprises locales.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Contrairement aux grandes enseignes, je propose un service de proximité, humain et transparent. Pas de jargon compliqué, juste des solutions qui marchent.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {["Intervention Rapide", "Tarifs Transparents", "Pédagogie"].map((item, i) => (
          <div key={i} className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl flex items-center gap-3">
            <CheckCircle className="text-blue-600" size={24} />
            <span className="font-bold text-slate-800 dark:text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}