import { 
  GraduationCap, HardDrive, RefreshCw, Zap, Wifi, 
  Settings, Database, MessageCircle, Smartphone, FileText, Wrench, ShieldCheck, Cpu 
} from 'lucide-react'
import Link from 'next/link'

// Liste des services "en dur" (Plus besoin de base de données complexe)
const services = [
  { icon: <GraduationCap />, title: "Cours d'informatique", desc: "Débutant à avancé, sur mesure." },
  { icon: <HardDrive />, title: "Formatage & Installation", desc: "Remise à neuf complète." },
  { icon: <RefreshCw />, title: "Récupération Windows", desc: "PC bloqué ou écran bleu." },
  { icon: <Zap />, title: "Optimisation PC", desc: "Nettoyage pour un PC plus rapide." },
  { icon: <Wifi />, title: "Réseau & Wi-Fi", desc: "Installation box et répétiteurs." },
  { icon: <Settings />, title: "Installation Logiciels", desc: "Office, Antivirus, etc." },
  { icon: <Database />, title: "Sauvegarde Données", desc: "Sécurisation de vos fichiers." },
  { icon: <Smartphone />, title: "Tablettes & Mobiles", desc: "Configuration et aide." },
  { icon: <FileText />, title: "Aide Administrative", desc: "Démarches en ligne." },
  { icon: <ShieldCheck />, title: "Suppression Virus", desc: "Nettoyage sécurité complet." },
  { icon: <Cpu />, title: "Montage PC", desc: "Assemblage sur mesure." },
  { icon: <Wrench />, title: "Dépannage Divers", desc: "Tout autre problème." },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      
      {/* En-tête */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
          Mes Prestations
        </h1>
        <p className="text-base text-gray-500 mt-3">
          Intervention rapide sur Moyeuvre-Grande et alentours.<br/>
          Tarifs clairs et sans surprise.
        </p>
      </div>

      {/* Grille des services */}
      <div className="max-w-6xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="group flex items-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icône */}
            <div className="shrink-0 mr-4 bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              {/* On clone l'icône pour lui donner la bonne taille */}
              <div className="w-6 h-6">
                {service.icon}
              </div>
            </div>
            
            {/* Texte */}
            <div className="min-w-0">
              <h3 className="text-base font-bold text-gray-800 truncate group-hover:text-blue-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 truncate">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton d'action */}
      <div className="mt-12 text-center">
        <Link 
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          Besoin d'un devis ? Contactez-moi
        </Link>
      </div>
    </div>
  )
}
