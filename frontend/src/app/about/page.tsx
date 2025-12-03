import { Smile, Briefcase, Award, CircleCheckBig, MapPin } from "lucide-react";

export default function About() {
  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950">
      
      {/* SECTION PRÉSENTATION */}
      <section className="py-12 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <Smile className="w-3 h-3" />
                <span>L’Humain avant tout</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Votre expert voisin <br/>
                <span className="text-blue-600 dark:text-blue-500">à Moyeuvre-Grande.</span>
              </h1>
              <div className="space-y-3 text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                <p>Bonjour ! Fondateur de <strong>Smile PC Solutions</strong>, je suis un passionné au service de ma ville.</p>
                <p>Mon parcours est <strong>Autodidacte et Terrain</strong>. J’ai appris en résolvant des milliers de pannes réelles, ce qui me permet de diagnostiquer n'importe quel problème en un clin d'œil.</p>
                <p className="p-3 bg-white dark:bg-slate-900 border-l-4 border-blue-600 rounded-r-lg shadow-sm italic text-slate-800 dark:text-slate-200 text-sm md:text-base">
                  "Mon objectif : réparer votre ordinateur et vous redonner le sourire."
                </p>
              </div>
            </div>

            <div className="flex-1 w-full max-w-sm lg:max-w-full relative">
              <div className="absolute top-0 right-0 -z-10 w-60 h-60 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-xl rotate-2 hover:rotate-0 duration-500 border border-slate-100 dark:border-slate-800 transition-all">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl aspect-square flex items-center justify-center p-6">
                  <div className="text-center">
                    <Briefcase className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                    {/* CORRECTION CONTRASTE : text-slate-600 au lieu de 400 (plus foncé) */}
                    <p className="text-slate-600 dark:text-slate-400 font-bold text-sm">Votre Expert Dédié</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION VALEURS */}
      <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 ">
        <div className="container mx-auto px-4 md:px-6">
          {/* CORRECTION SÉMANTIQUE : Ajout du H2 manquant pour structurer la page */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Pourquoi me choisir ?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transparence</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Pas de surprise sur la facture. J'explique tout avant d'agir.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-green-200 dark:hover:border-green-900 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                  <CircleCheckBig className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Résultat Garanti</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Si je ne peux pas réparer, je ne vous facture pas l’intervention complète.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Proximité</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Intervention rapide à Moyeuvre-Grande en cas d’urgence.</p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
