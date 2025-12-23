import { CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-10 pb-20 px-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">Pourquoi choisir Smile PC ?</h1>
        
        <p className="text-lg text-slate-600 mb-12 leading-relaxed">
          L''informatique ne doit pas être une source de stress. Basé à Moyeuvre-Grande, je propose une approche humaine : 
          pas de jargon compliqué, des tarifs clairs, et surtout, je prends le temps de vous expliquer.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
            <CheckCircle2 className="text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900">Proximité</h3>
              <p className="text-sm text-slate-600">Intervention rapide sur le secteur.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
            <CheckCircle2 className="text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900">Pédagogie</h3>
              <p className="text-sm text-slate-600">Je traduis le langage "geek" en français.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
            <CheckCircle2 className="text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900">Transparence</h3>
              <p className="text-sm text-slate-600">Prix annoncés avant intervention.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
            <CheckCircle2 className="text-green-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900">Garantie</h3>
              <p className="text-sm text-slate-600">Pas de résultat = Pas de facturation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
