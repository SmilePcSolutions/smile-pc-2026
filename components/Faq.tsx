"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Intervenez-vous uniquement sur Moyeuvre-Grande ?",
    answer: "Je suis basé à Moyeuvre-Grande (57250), mais j'interviens dans un rayon de 20 à 30 km. Cela inclut régulièrement les villes d'Amnéville, Rombas, Joeuf, Homécourt, Briey, Hagondange et Maizières-lès-Metz. Pour des distances plus longues, n'hésitez pas à me contacter pour un devis personnalisé."
  },
  {
    question: "Quels sont vos tarifs pour un dépannage informatique ?",
    answer: "La transparence est ma priorité. Je propose des forfaits clairs pour les interventions courantes (comme le nettoyage de virus ou la réinstallation de Windows) afin d'éviter les surprises. Pour les pannes matérielles complexes, un diagnostic est effectué pour établir un devis précis avant toute réparation. Le déplacement est souvent inclus dans la zone locale."
  },
  {
    question: "Dépannez-vous aussi les Mac et les smartphones ?",
    answer: "Oui, absolument. Bien que le nom soit 'Smile PC', je prends en charge les ordinateurs Apple (MacBook, iMac) pour des problèmes logiciels ou d'optimisation. J'aide également à la configuration et à la prise en main de vos smartphones (Android et iPhone) et tablettes (iPad, Samsung Galaxy...), ainsi qu'à la synchronisation de vos données."
  },
  {
    question: "Combien de temps dure une intervention à domicile ?",
    answer: "La plupart des interventions de dépannage standard durent entre 1h et 1h30. Si la réparation nécessite plus de temps (comme une récupération de données lourde ou une réinstallation complète avec beaucoup de mises à jour), je peux être amené à prendre le matériel en atelier pour vous le ramener une fois réparé, sans surcoût de déplacement."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Questions Fréquentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-800">{faq.question}</span>
                {openIndex === index ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-400" />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}