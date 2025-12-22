import Link from "next/link";
import { Star, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const reviews = [
  {
    name: "Thomas D.",
    role: "Particulier",
    content: "Mon PC était devenu inutilisable à cause des pubs. En 1h, tout était nettoyé. Explications claires. Je recommande !",
    stars: 5,
  },
  {
    name: "Sarah L.",
    role: "Indépendante",
    content: "Installation box + imprimante pro. Très patient et pédagogue. Tout fonctionne nickel.",
    stars: 5,
  },
  {
    name: "Marc R.",
    role: "Gamer",
    content: "Optimisation au top : PC plus stable, moins de chauffe, et meilleurs FPS. Tarif honnête pour le travail fait.",
    stars: 4,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? "text-amber-500" : "text-slate-300"}`} fill={i < n ? "currentColor" : "none"} />
      ))}
    </div>
  );
}

export default function AvisPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <header className="rounded-3xl border border-white/70 bg-white/70 p-8 shadow-sm backdrop-blur md:p-12">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-blue-800 shadow-sm">
          Avis
        </div>

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          Des clients
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
            rassurés, et des PC sauvés.
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          Le but : que tu comprennes ce qui se passe, que ça marche, et que ça reste stable.
        </p>

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
          <ShieldCheck className="h-7 w-7 text-emerald-600" />
          <h3 className="mt-3 font-bold text-slate-900">Confiance</h3>
          <p className="mt-1 text-sm text-slate-600">Transparence + explications simples.</p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <Zap className="h-7 w-7 text-amber-500" />
          <h3 className="mt-3 font-bold text-slate-900">Résultats</h3>
          <p className="mt-1 text-sm text-slate-600">Stabilité, rapidité, et solutions durables.</p>
        </div>
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
          <Star className="h-7 w-7 text-blue-600" />
          <h3 className="mt-3 font-bold text-slate-900">Satisfaction</h3>
          <p className="mt-1 text-sm text-slate-600">Objectif : “ça marche et c’est clair”.</p>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <article key={r.name} className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <Stars n={r.stars} />
            <p className="mt-4 text-sm leading-relaxed text-slate-700">“{r.content}”</p>
            <div className="mt-4 text-sm font-semibold text-slate-900">{r.name}</div>
            <div className="text-xs text-slate-600">{r.role}</div>
          </article>
        ))}
      </section>
    </div>
  );
}