import Link from 'next/link';
import { ArrowRight, Monitor, ShieldAlert, Wifi, HardDrive, Cpu, BookOpen } from 'lucide-react';

const services = [
  {
    icon: <Monitor size={32} />,
    title: "Dépannage & Réparation",
    description: "Votre PC ne démarre plus ou fait du bruit ? Je diagnostique et répare la panne, qu'elle soit matérielle ou logicielle.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200"
  },
  {
    icon: <ShieldAlert size={32} />,
    title: "Virus & Sécurité",
    description: "Publicités intempestives, piratage ou lenteurs suspectes ? Je nettoie intégralement votre système et sécurise vos données.",
    color: "text-red-600",
    bg: "bg-red-50",
    border: "group-hover:border-red-200"
  },
  {
    icon: <Cpu size={32} />,
    title: "Optimisation & Vitesse",
    description: "Un ordinateur lent n'est pas forcément foutu. Je lui redonne une seconde jeunesse (nettoyage, SSD, RAM).",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200"
  },
  {
    icon: <Wifi size={32} />,
    title: "Internet & Wi-Fi",
    description: "Problème de connexion, Box qui clignote ou Wi-Fi qui ne passe pas ? J'installe et configure votre réseau domestique.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200"
  },
  {
    icon: <HardDrive size={32} />,
    title: "Récupération de Données",
    description: "Photos perdues, disque dur illisible ? Je tente la récupération de vos fichiers précieux avant qu'il ne soit trop tard.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "group-hover:border-emerald-200"
  },
  {
    icon: <BookOpen size={32} />,
    title: "Formation & Conseil",
    description: "Besoin d'apprendre à utiliser Windows, envoyer des mails ou classer vos photos ? J'offre une assistance pédagogique et patiente.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "group-hover:border-violet-200"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Comment puis-je vous <span className="text-blue-600">aider</span> ?
          </h2>
          <p className="text-lg text-slate-600">
            Des solutions claires pour chaque problème. Pas de jargon technique, juste des résultats.
          </p>
        </div>

        {/* GRILLE DES SERVICES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 ${service.border} relative overflow-hidden`}
            >
              {/* Effet de lueur au survol */}
              <div className={`absolute top-0 right-0 w-24 h-24 ${service.bg} rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform duration-500`}></div>

              {/* Icône */}
              <div className={`w-14 h-14 ${service.bg} ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>

              {/* Contenu */}
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA BAS DE PAGE */}
        <div className="mt-16 text-center">
          <Link 
            href="/services" 
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors text-lg group"
          >
            Voir tous les tarifs détaillés 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
