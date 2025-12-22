import Link from "next/link";
import { ArrowRight, CheckCircle, ShieldCheck, Zap, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* HERO */}
      <section className="text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm backdrop-blur">
          <span className="mr-2 flex h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
          Nouveau site version 2026
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          Dépannage informatique <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            rapide, clair, efficace.
          </span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-xl">
          Je suis à Moyeuvre-Grande et j’aide les particuliers (et pros) :
          PC lent, virus, réinstallations, réseaux Internet, sauvegardes…
          <span className="font-semibold text-slate-700"> toujours avec le sourire.</span>
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:shadow-blue-500/35"
          >
            Prendre rendez-vous <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/prestations"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/80 px-7 py-4 text-base font-semibold text-slate-800 shadow-sm ring-1 ring-slate-900/10 transition hover:bg-white"
          >
            Voir les prestations
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4" />
          Moyeuvre-Grande (Moselle) + alentours
        </div>
      </section>

      {/* TRUST CARDS */}
      <section className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
          <h3 className="mt-3 font-bold text-slate-900">Sécurité & confidentialité</h3>
          <p className="mt-1 text-sm text-slate-600">
            Manipulation soigneuse, conseils clairs, et protection de vos données.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <Zap className="h-7 w-7 text-amber-500" />
          <h3 className="mt-3 font-bold text-slate-900">Intervention rapide</h3>
          <p className="mt-1 text-sm text-slate-600">
            Diagnostic précis, solutions durables, et optimisation si besoin.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <CheckCircle className="h-7 w-7 text-emerald-600" />
          <h3 className="mt-3 font-bold text-slate-900">Multi-plateformes</h3>
          <p className="mt-1 text-sm text-slate-600">
            Windows 11, macOS et Linux. Réseau, logiciels, périphériques, etc.
          </p>
        </div>
      </section>

      {/* PRESTATIONS QUICK LIST */}
      <section className="mt-10 rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur md:p-10">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Mes prestations</h2>
        <p className="mt-2 text-sm text-slate-600 md:text-base">
          Voici les demandes les plus fréquentes (et je m’adapte à ton besoin) :
        </p>

        <ul className="mt-5 grid list-none grid-cols-1 gap-3 md:grid-cols-2">
          {[
            "Cours d’informatique (débutant à avancé).",
            "Formatage complet + réinstallation + mises à jour.",
            "Récupération du Windows d’usine (HP, Lenovo, Dell).",
            "Optimisation des performances (PC plus fluide).",
            "Problèmes Internet / Wi-Fi / réseau + optimisation.",
            "Installation & configuration logiciels / OS / périphériques.",
            "Sauvegarde et récupération de données importantes.",
            "Tablettes et smartphones (hors soudure et écran).",
            "Inscription opérateur Internet/mobile + aide démarches.",
            "Contact opérateur si difficulté de compréhension.",
          ].map((t) => (
            <li key={t} className="flex gap-3 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-900/5">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
              <span className="text-sm text-slate-700">{t}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Me contacter
          </Link>

          <Link
            href="/prestations"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 transition hover:bg-slate-50"
          >
            Détails des prestations
          </Link>
        </div>
      </section>
    </div>
  );
}

