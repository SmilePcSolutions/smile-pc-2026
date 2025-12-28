"use client";

import {
  Laptop,
  Wifi,
  ShieldCheck,
  Smartphone,
  Database,
  HelpCircle,
} from "lucide-react";

type Service = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: <Laptop size={24} />,
    title: "Maintenance & Optimisation PC",
    description:
      "Réinstallation Windows, mises à jour, nettoyage, optimisation des performances et conseils pour garder un PC stable et rapide.",
  },
  {
    icon: <Wifi size={24} />,
    title: "Réseau, Internet & Box",
    description:
      "Dépannage Wi-Fi / Ethernet, pertes de connexion, configuration de box Internet, imprimantes et équipements réseau.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Sécurité & Nettoyage",
    description:
      "Suppression de virus, publicités et malwares, sécurisation de base et bonnes pratiques pour éviter les infections.",
  },
  {
    icon: <Database size={24} />,
    title: "Données & Sauvegardes",
    description:
      "Sauvegarde de vos données importantes et tentative de récupération de fichiers supprimés ou perdus.",
  },
  {
    icon: <Smartphone size={24} />,
    title: "Smartphones, Tablettes & Montres",
    description:
      "Aide à la prise en main, réglages logiciels, comptes, sauvegardes et accompagnement numérique.",
  },
  {
    icon: <HelpCircle size={24} />,
    title: "Accompagnement & Assistance",
    description:
      "Cours d’informatique personnalisés, aide administrative numérique et contact avec votre opérateur si besoin.",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Titre */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Mes prestations
          </h1>
          <p className="text-lg text-slate-600">
            Des services clairs, utiles et adaptés à vos besoins réels.
          </p>
        </div>

        {/* Liste épurée */}
        <div className="space-y-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex items-start gap-6 group"
            >
              {/* Icône */}
              <div className="flex-shrink-0 p-4 rounded-2xl bg-slate-50 text-blue-600 group-hover:bg-blue-50 transition-colors">
                {service.icon}
              </div>

              {/* Texte */}
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="mt-16 rounded-xl border border-orange-100 bg-orange-50/50 p-6 text-sm text-orange-900/80 leading-relaxed">
          <strong>⚠️ Important :</strong> Je ne réalise pas de réparations matérielles
          (écrans cassés, batteries, micro-soudure) sur les smartphones, tablettes
          ou montres connectées.
          <p className="mt-2">
            👉 J’interviens uniquement sur la partie{" "}
            <strong>logicielle, configuration et accompagnement</strong>.
          </p>
        </div>

      </div>
    </section>
  );
}
