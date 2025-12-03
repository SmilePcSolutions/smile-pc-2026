import Link from "next/link";
import { Smile, Zap, ShieldCheck, Wifi, CheckCircle2, HelpCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* SECTION HERO (Le haut avec les taches de couleurs) */}
      <section className="relative w-full py-20 lg:py-32 flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* Les formes d'arrière-plan (Blobs) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-300 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          
          {/* Badge "Dépannage à domicile" */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-300 text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Dépannage à domicile sur Moyeuvre-Grande</span>
          </div>

          {/* Titre Principal */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            Réparation PC & <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Assistance Informatique.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Votre ordinateur est lent ou bloqué ? Pas de stress. J'interviens chez vous pour le dépannage, la suppression des virus et l'installation de votre Box Internet.
          </p>

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/contact" 
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 px-8 font-bold text-white transition-all hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
            >
              <Smile className="mr-2 h-5 w-5" />
              Demander un dépannage
            </Link>
            <Link 
              href="/services" 
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-8 font-bold text-slate-700 dark:text-white transition-all hover:bg-white dark:hover:bg-slate-800 active:scale-95"
            >
              Voir mes tarifs
            </Link>
          </div>

          {/* Les 3 Cartes (Services) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
            
            {/* Carte 1 : PC Lent */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">PC Lent & Optimisation</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Votre ordinateur rame ? Je booste votre système Windows pour lui redonner sa vitesse.</p>
            </div>

            {/* Carte 2 : Virus */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Virus & Sécurité</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Suppression de virus, pages de pubs et piratage. Je sécurise vos données personnelles.</p>
            </div>

            {/* Carte 3 : WiFi */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-white/50 dark:border-slate-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wifi className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Wi-Fi & Installation</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Problème de connexion internet ? J'installe votre Box, répéteur Wi-Fi et imprimante.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION "POURQUOI MOI" */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-left">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Pourquoi faire appel à un professionnel ?</h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-400 leading-relaxed">
            <div>
              <p className="mb-4">L'informatique peut vite devenir un casse-tête. Un ordinateur qui plante, une connexion Wi-Fi instable ou la peur de perdre ses photos sont des sources de stress inutiles. Faire appel à <strong>Smile PC Solutions</strong>, c'est choisir la tranquillité d'esprit avec un expert local.</p>
              <p>Je me déplace directement à votre domicile à <strong>Moyeuvre-Grande, Rombas, Gandrange</strong> et les environs. Plus besoin de débrancher tout votre matériel ni de le transporter en magasin : je viens à vous avec le matériel nécessaire.</p>
            </div>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Diagnostic précis :</strong> Je trouve la cause réelle de la panne (matériel ou logiciel) avant de réparer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Pédagogie :</strong> J'explique ce que je fais avec des mots simples pour que vous compreniez votre outil.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span><strong>Transparence :</strong> Tarifs clairs, devis avant intervention, pas de mauvaise surprise.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FAQ (Style Original) */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            Questions Fréquentes
          </h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">💰 Le devis est-il gratuit ?</h3>
              <p className="text-slate-600 dark:text-slate-400">Oui, je fournis une estimation gratuite avant toute intervention. Si la réparation nécessite des pièces coûteuses, vous êtes libre d'accepter ou non.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">🚗 Dans quelles villes intervenez-vous ?</h3>
              <p className="text-slate-600 dark:text-slate-400">Je suis basé à Moyeuvre-Grande et je me déplace dans un rayon de 20km : Rombas, Gandrange, Amnéville, Hagondange, Joeuf, Homécourt, etc.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">⏱️ Combien de temps dure une intervention ?</h3>
              <p className="text-slate-600 dark:text-slate-400">La plupart des pannes logicielles sont résolues en moins d'une heure. Pour les réinstallations complètes, cela peut être plus long, mais tout se fait chez vous.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
