import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Wifi,
  HardDrive,
  Smartphone,
  ShieldCheck,
  Wrench,
} from "lucide-react";

type Category = {
  title: string;
  icon: React.ReactNode;
  items: string[];
  note?: string;
};

const categories: Category[] = [
  {
    title: "Maintenance & performances PC",
    icon: <Cpu size={22} aria-hidden="true" />,
    items: [
      "Réinstallation complète (formatage, Windows, pilotes, mises à jour, logiciels essentiels).",
      "Optimisation des performances pour un PC plus fluide et plus rapide.",
      "Restauration système constructeur (Recovery HP, Lenovo, Dell…).",
      "Conseils personnalisés pour garder un ordinateur stable et fiable.",
    ],
  },
  {
    title: "Réseau, Internet & Box",
    icon: <Wifi size={22} aria-hidden="true" />,
    items: [
      "Dépannage Wi-Fi / Ethernet, pertes de connexion, lenteurs, instabilité.",
      "Installation et configuration de box Internet et équipements réseau.",
      "Configuration imprimante réseau, partage, accès multi-appareils.",
      "Optimisation Internet (réglages, diagnostic, vérifications).",
    ],
  },
  {
    title: "Données & sécurité",
    icon: <HardDrive size={22} aria-hidden="true" />,
    items: [
      "Sauvegarde et mise en sécurité des données importantes.",
      "Récupération / tentative de récupération de fichiers perdus ou effacés.",
      "Nettoyage, suppression de publicités, malwares, durcissement de base.",
      "Installation et configuration de périphériques (imprimantes, scanners, etc.).",
    ],
  },
  {
    title: "Accompagnement & mobile",
    icon: <Smartphone size={22} aria-hidden="true" />,
    items: [
      "Cours d’informatique (PC, tablette, smartphone) adaptés à votre niveau.",
      "Aide à la prise en main, réglages, comptes, sauvegardes, transfert de données.",
      "Assistance opérateur Internet / mobile : inscription, compréhension, accompagnement.",
      "Prise de contact avec votre opérateur si vous êtes bloqué(e).",
    ],
    note: "Note : tablettes & smartphones — hors micro-soudure et remplacement d’écrans.",
  },
];

export default function Services() {
  return (
    <section className="relative py-20 md:py-24">
      {/* Fond discret, moderne, sans “effet carte cliquable” */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
            <ShieldCheck size={16} aria-hidden="true" />
            Services clairs • Explications simples • Sans jargon inutile
          </p>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            Mes prestations <span className="text-blue-600">sur mesure</span>
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Dépannage, optimisation et accompagnement informatique à Moyeuvre-Grande et alentours.
            Je privilégie la clarté, la pédagogie et des solutions fiables.
          </p>
        </div>

        {/* Liste moderne (stable, non cliquable) */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
              // Important : pas de hover/transition/cursor pour ne pas “faire cliquable”
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
                  <p className="text-sm text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Wrench size={14} aria-hidden="true" />
                      Intervention & accompagnement
                    </span>
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500/70" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {cat.note ? (
                <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm italic text-slate-600">
                  {cat.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        {/* CTA sobre (optionnel) */}
        <div className="mt-14 text-center">
          <p className="text-slate-600">
            Un besoin spécifique ou une question rapide ?
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            Me contacter
            <ArrowRight size={18} aria-hidden="true" />
          </Link>

          <p className="mt-3 text-xs text-slate-500">
            (Aucun tarif affiché ici : on voit ensemble selon le besoin.)
          </p>
        </div>
      </div>
    </section>
  );
}