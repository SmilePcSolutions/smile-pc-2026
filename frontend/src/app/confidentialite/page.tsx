import { Shield, FileText, Lock, Eye } from "lucide-react";

export default function Confidentialite() {
  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold mb-6">
            <Shield className="w-4 h-4" />
            <span>Protection des données (RGPD)</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Chez Smile PC Solutions, la confidentialité de vos données est une priorité.
          </p>
        </div>

        {/* Les 3 blocs d'info */}
        <div className="space-y-6">
          
          {/* Bloc 1 : Collecte */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Collecte des données</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Les seules informations que je recueille sont celles que vous me transmettez via le formulaire. Elles servent uniquement à <strong>traiter votre demande</strong>.
            </p>
          </section>

          {/* Bloc 2 : Conservation */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Durée de conservation</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Vos données sont conservées le temps du traitement. Si vous ne devenez pas client, elles sont supprimées au bout de <strong>3 ans maximum</strong>.
            </p>
          </section>

          {/* Bloc 3 : Partage */}
          <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Partage et Cookies</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Je ne revends jamais vos données.</strong> Ce site n'utilise pas de cookies publicitaires intrusifs.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
