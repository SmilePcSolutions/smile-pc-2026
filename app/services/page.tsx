import { Monitor, Cpu, Wifi, ShieldCheck, Smartphone, HardDrive, Wrench, Clock } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: Monitor, title: "Réparation PC & Mac", price: "Sur devis", desc: "Diagnostic panne, écran noir, clavier cassé, changement de batterie." },
    { icon: Cpu, title: "Montage & Upgrade", price: "Dès 49€", desc: "Assemblage PC Gamer, ajout de RAM, changement disque dur vers SSD (x10 vitesse)." },
    { icon: Wifi, title: "Réseau & Internet", price: "Dès 39€", desc: "Installation Box, résolution problèmes Wi-Fi, configuration imprimante réseau." },
    { icon: ShieldCheck, title: "Désinfection Virus", price: "Forfait 59€", desc: "Nettoyage complet, suppression publicités, malwares et sécurisation données." },
    { icon: HardDrive, title: "Récupération Données", price: "Sur devis", desc: "Photos perdues, disque dur qui claque, fichiers effacés par erreur." },
    { icon: Smartphone, title: "Formation & Mobile", price: "39€ /heure", desc: "Apprendre à utiliser son PC, tablette ou smartphone sans stress." },
  ];

  return (
    <div className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Mes Prestations & Tarifs</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Des tarifs clairs, sans surprise. Le déplacement est inclus sur Moyeuvre-Grande.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <s.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{s.title}</h3>
            <div className="text-blue-600 font-bold text-lg mb-4">{s.price}</div>
            <p className="text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
