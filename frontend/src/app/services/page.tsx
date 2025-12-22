import Link from "next/link";
import { 
  GraduationCap, 
  HardDrive, 
  RotateCcw, 
  Zap, 
  Wifi, 
  Settings, 
  Database, 
  MessageCircle, 
  Smartphone, 
  FilePenLine, 
  Headset, 
  Check, 
  ArrowRight 
} from "lucide-react";

export default function Services() {
  return (
    <div className="w-full py-12 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
        
        {/* Titre de la section */}
        <div className="text-center mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Mes Prestations
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium">
            Intervention rapide sur Moyeuvre-Grande et alentours.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-5xl mb-12">
          
          {/* Service 1 */}
          <ServiceCard 
            icon={<GraduationCap className="w-6 h-6" />} 
            title="Cours d’informatique (Débutant à expert)" 
          />
          
          {/* Service 2 */}
          <ServiceCard 
            icon={<HardDrive className="w-6 h-6" />} 
            title="Formatage complet et Réinstallation propre" 
          />

          {/* Service 3 */}
          <ServiceCard 
            icon={<RotateCcw className="w-6 h-6" />} 
            title="Récupération Windows d’usine (Recovery)" 
          />

          {/* Service 4 */}
          <ServiceCard 
            icon={<Zap className="w-6 h-6" />} 
            title="Optimisation performances (Boost PC)" 
          />

          {/* Service 5 */}
          <ServiceCard 
            icon={<Wifi className="w-6 h-6" />} 
            title="Résolution problèmes Internet et Wi-Fi" 
          />

          {/* Service 6 */}
          <ServiceCard 
            icon={<Settings className="w-6 h-6" />} 
            title="Installation logiciels et périphériques" 
          />

          {/* Service 7 */}
          <ServiceCard 
            icon={<Database className="w-6 h-6" />} 
            title="Sauvegarde et Récupération de données" 
          />

          {/* Service 8 */}
          <ServiceCard 
            icon={<MessageCircle className="w-6 h-6" />} 
            title="Conseils personnalisés et Maintenance" 
          />

          {/* Service 9 */}
          <ServiceCard 
            icon={<Smartphone className="w-6 h-6" />} 
            title="Dépannage Smartphones/Tablettes (Logiciel)" 
          />

          {/* Service 10 */}
          <ServiceCard 
            icon={<FilePenLine className="w-6 h-6" />} 
            title="Aide administrative (Opérateurs, Forfaits)" 
          />

          {/* Service 11 */}
          <ServiceCard 
            icon={<Headset className="w-6 h-6" />} 
            title="Assistance contact service client" 
          />

        </div>

        {/* Bloc Appel à l'action en bas */}
        <div className="bg-slate-900 dark:bg-blue-950 rounded-2xl p-8 text-center w-full max-w-3xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600 blur-3xl opacity-20"></div>
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">Besoin d’un devis ?</h2>
          <Link 
            href="/contact" 
            className="relative z-10 inline-flex h-12 items-center justify-center rounded-lg bg-blue-600 px-6 font-bold text-white hover:bg-blue-500 hover:scale-105 shadow-lg transition-all"
          >
            Demander une intervention 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

// Composant pour les cartes (pour éviter de copier-coller 50 fois le code HTML)
function ServiceCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 duration-300 cursor-default transition-all">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-slate-700 dark:text-slate-200 font-bold text-sm md:text-base group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {title}
        </p>
      </div>
      <Check className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
