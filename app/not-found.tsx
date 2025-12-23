import Link from "next/link";
import { ArrowRight, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mt-6 rounded-3xl border border-white/70 bg-white/70 p-8 shadow-sm backdrop-blur md:p-12 w-full text-center sm:text-left">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm">
          Erreur 404
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Page introuvable
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            mais on peut te remettre sur la bonne route.
          </span>
        </h1>

        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Le lien n’existe pas (ou plus). Utilise les boutons ci-dessous pour retrouver ton chemin.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row justify-center sm:justify-start">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" /> Accueil <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 transition hover:bg-slate-50"
          >
            <Search className="h-4 w-4" /> Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
