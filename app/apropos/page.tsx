import Link from "next/link";
import { ShieldCheck, Zap, MapPin, ArrowRight, Clock } from "lucide-react";

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-sm backdrop-blur md:p-12">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm">
          À propos
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Smile PC Solutions
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            dépannage informatique local, clair et rassurant.
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          Objectif : te remettre un PC propre, stable et rapide, sans blabla.
          Diagnostic, explications simples, et solutions durables (Windows, macOS, Linux).
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-900/10">
            <MapPin className="h-4 w-4" /> Moyeuvre-Grande (Moselle) + alentours
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 ring-1 ring-slate-900/10">
            <Clock className="h-4 w-4" /> Intervention sur RDV
          </span>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
          >
            Me contacter <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/prestations"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 transition hover:bg-slate-50"
          >
            Voir les prestations
          </Link>
        </div>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <ShieldCheck className="h-7 w-7 text-blue-600" />
          <h3 className="mt-3 font-bold text-slate-900">Données & confidentialité</h3>
          <p className="mt-1 text-sm text-slate-600">
            Respect de tes fichiers + bonnes pratiques (sauvegardes, sécurité, conseils).
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <Zap className="h-7 w-7 text-amber-500" />
          <h3 className="mt-3 font-bold text-slate-900">Rapide & efficace</h3>
          <p className="mt-1 text-sm text-slate-600">
            Diagnostic précis, puis action : nettoyage, optimisation, réinstall si besoin.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <MapPin className="h-7 w-7 text-emerald-600" />
          <h3 className="mt-3 font-bold text-slate-900">Local</h3>
          <p className="mt-1 text-sm text-slate-600">
            Service de proximité, explications simples, et suivi après intervention.
          </p>
        </div>
      </section>
    </div>
  );
}