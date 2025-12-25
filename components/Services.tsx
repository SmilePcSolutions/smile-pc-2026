import { Zap, ShieldAlert, Wifi } from "lucide-react";

const featuredServices = [
  { 
    icon: Zap, 
    color: "text-orange-500 bg-orange-100",
    title: "PC Lent & Optimisation", 
    desc: "Votre ordinateur rame ? Je booste votre système Windows pour lui redonner sa vitesse d''origine." 
  },
  { 
    icon: ShieldAlert, 
    color: "text-red-500 bg-red-100",
    title: "Virus & Sécurité", 
    desc: "Suppression de virus, pages de pubs et piratage. Je sécurise vos données personnelles." 
  },
  { 
    icon: Wifi, 
    color: "text-blue-500 bg-blue-100",
    title: "Wi-Fi & Installation", 
    desc: "Problème de connexion internet ? J''installe votre Box, répéteur Wi-Fi et imprimante." 
  },
];

export default function Services() {
  return (
    <section id="services" className="relative -mt-32 pb-20 px-6 z-30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:-translate-y-1 group">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
