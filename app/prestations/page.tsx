import { Monitor, Wifi, ShieldCheck, Database, Smartphone, HelpCircle } from "lucide-react";

export default function Prestations() {
  const services = [
    {
      icon: <Monitor size={32} />,
      title: "Maintenance & Optimisation PC",
      desc: "Réinstallation Windows, mises à jour, nettoyage, optimisation des performances et conseils pour garder un PC stable et rapide."
    },
    {
      icon: <Wifi size={32} />,
      title: "Réseau, Internet & Box",
      desc: "Dépannage Wi-Fi / Ethernet, pertes de connexion, configuration de box Internet, imprimantes et équipements réseau."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Sécurité & Nettoyage",
      desc: "Suppression de virus, publicités et malwares, sécurisation de base et bonnes pratiques pour éviter les infections."
    },
    {
      icon: <Database size={32} />,
      title: "Données & Sauvegardes",
      desc: "Sauvegarde de vos données importantes et tentative de récupération de fichiers supprimés ou perdus."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Smartphones, Tablettes & Montres",
      desc: "Aide à la prise en main, réglages logiciels, comptes, sauvegardes et accompagnement numérique."
    },
    {
      icon: <HelpCircle size={32} />,
      title: "Accompagnement & Assistance",
      desc: "Cours d'informatique personnalisés, aide administrative numérique et contact avec votre opérateur si besoin."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Mes Prestations 🛠️</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">Des services clairs, utiles et adaptés à vos besoins réels.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div key={i} className="flex gap-6 p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl hover:shadow-md transition border border-slate-100 dark:border-slate-700">
              <div className="text-blue-600 dark:text-blue-400 shrink-0">
                {s.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-900/50 text-center">
          <p className="text-orange-800 dark:text-orange-200 font-medium text-sm">
            ⚠️ Important : Je ne réalise pas de réparations matérielles (écrans cassés, batteries, micro-soudure) sur les smartphones, tablettes ou montres connectées.
            <br />
            👉 J'interviens uniquement sur la partie logicielle, configuration et accompagnement.
          </p>
        </div>
      </div>
    </div>
  );
}