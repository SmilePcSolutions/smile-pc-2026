import Link from "next/link";
import {
  Cpu,
  Wifi,
  HardDrive,
  Smartphone,
} from "lucide-react";

type Category = {
  title: string;
  icon: React.ReactNode;
  items: string[];
  note?: string;
};

const categories: Category[] = [
  {
    title: "Maintenance & PC",
    icon: <Cpu size={24} aria-hidden="true" />,
    items: [
      "Réinstallation complète (Windows, pilotes, logiciels).",
      "Optimisation pour un PC plus rapide.",
      "Restauration système constructeur.",
      "Conseils pour garder un ordinateur stable.",
    ],
  },
  {
    title: "Réseau & Box",
    icon: <Wifi size={24} aria-hidden="true" />,
    items: [
      "Dépannage Wi-Fi / Ethernet et lenteurs.",
      "Installation Box Internet et réseau.",
      "Configuration imprimante en Wi-Fi.",
      "Optimisation de la connexion.",
    ],
  },
  {
    title: "Données & Sécurité",
    icon: <HardDrive size={24} aria-hidden="true" />,
    items: [
      "Sauvegarde de vos documents importants.",
      "Tentative de récupération de fichiers perdus.",
      "Nettoyage virus, pubs et malwares.",
      "Installation de périphériques (scanners, etc.).",
    ],
  },
  {
    title: "Mobiles & Accompagnement",
    icon: <Smartphone size={24} aria-hidden="true" />,
    items: [
      "Cours d'informatique et aide à la prise en main.",
      "Réglages comptes, mails et mots de passe.",
      "Assistance opérateur (je les appelle pour vous).",
      "Configuration Montres et Objets connectés.",
    ],
    note: "Important : Je ne change PAS les écrans ni les batteries (Smartphones, Tablettes, Montres). Logiciel uniquement.",
  },
];

export default function Services() {
  return (
    <section className="relative py-20 bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl mb-4">
            Mes prestations <span className="text-blue-600">sur mesure</span>
          </h2>
          <p className="text-lg text-slate-600">
            Des solutions claires et fiables, sans jargon inutile.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{cat.title}</h3>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 text-sm md:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {cat.note ? (
                <div className="mt-6 rounded-lg bg-orange-50 px-4 py-3 text-sm text-orange-800 border border-orange-100">
                  {cat.note}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}