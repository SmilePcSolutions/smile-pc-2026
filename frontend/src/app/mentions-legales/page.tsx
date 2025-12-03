export default function MentionsLegales() {
  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-8">
          Mentions Légales
        </h1>
        
        <div className="space-y-8 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-slate-700 dark:text-slate-300 leading-relaxed transition-colors">
          
          {/* Section 1 : Éditeur */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">1. Éditeur du site</h2>
            <p className="leading-loose">
              Le site <strong>Smile PC Solutions</strong> est édité par :<br />
              <strong>Responsable :</strong> Direction Smile PC<br />
              <strong>Statut :</strong> Entrepreneur Individuel (Micro-Entreprise)<br />
              <strong>Localisation :</strong> 57250 Moyeuvre-Grande<br />
              <strong>SIRET :</strong> En cours d'immatriculation<br />
              <strong>Contact :</strong> contact@smilepcsolutions.fr
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Section 2 : Hébergement */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">2. Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133 Walnut, CA 91789, USA.
            </p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Section 3 : Propriété intellectuelle */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">3. Propriété intellectuelle</h2>
            <p>
              L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>
          
        </div>
      </div>
    </div>
  );
}
