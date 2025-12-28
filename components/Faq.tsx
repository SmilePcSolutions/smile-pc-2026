"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Comment ça se passe pour les réparations (atelier, domicile ou à distance) ?",
    answer:
      "Ça dépend de la panne, tout simplement. Pour les gros travaux qui prennent du temps (formatage complet, PC très lent, récupération de données), le plus pratique est l’atelier, car ça peut durer plusieurs heures voire 1 à 2 jours. Pour les petits soucis (bugs, Wi-Fi, imprimante, configuration), je peux intervenir à domicile ou prendre la main à distance. On en discute ensemble et on choisit la solution la plus simple."
  },
  {
    question: "Intervenez-vous sur les box Internet, TV, Apple TV et opérateurs ?",
    answer:
      "Oui. Je configure les box Internet, télévisions, Apple TV, décodeurs, imprimantes et objets connectés (montres, etc.). Et si vous avez un souci avec votre opérateur (Free, Orange, SFR…), je peux les contacter à votre place et gérer la partie technique avec eux."
  },
  {
    question: "Faites-vous des réparations matérielles (écran, batterie) ?",
    answer:
      "Non, je ne change pas les écrans ni les batteries des smartphones, tablettes ou montres connectées. En revanche, je m’occupe de tout le côté logiciel : configuration, remise à zéro, synchronisation, transfert de données, mises à jour et explications."
  },
  {
    question: "Quelle est votre zone d’intervention ?",
    answer:
      "Je suis basé à Moyeuvre-Grande. J’interviens régulièrement sur Moyeuvre-Petite, Froidcul, Rosselange, Rombas, Amnéville et alentours. Pour Metz ou plus loin, ça dépend du problème. Le plus simple est de m’appeler et on voit ensemble."
  },
  {
    question: "Pourquoi choisir Smile PC Solutions ?",
    answer:
      "Parce que je fais les choses simplement, sans jargon compliqué ni factures abusives. Les tarifs sont attractifs, je prends le temps d’expliquer et le but est que votre matériel reparte propre, fonctionnel et prêt à l’emploi."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Questions Fréquentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-800">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-slate-400" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 pb-4 pt-4 text-slate-600 leading-relaxed border-t border-slate-100">
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
