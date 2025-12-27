import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Identité */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Smile <span className="text-blue-500">PC</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Votre expert informatique à domicile. Dépannage, assistance et formation sur Moyeuvre-Grande et alentours.
            </p>
            <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
              <ShieldCheck size={16} /> Intervention Garantie
            </div>
          </div>

          {/* Col 2: Navigation (CORRIGÉE) */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                {/* LE LIEN EST CORRIGÉ ICI 👇 */}
                <Link href="/prestations" className="hover:text-blue-400 transition-colors">
                  Prestations
                </Link>
              </li>
              <li>
                <Link href="/avis" className="hover:text-blue-400 transition-colors">
                  Avis Clients
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="hover:text-blue-400 transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Me Contacter</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-blue-500 shrink-0" />
                <span>Moyeuvre-Grande<br/>& 20km alentours</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <Link href="/contact" className="hover:text-white transition-colors">
                  M'envoyer un message
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Action */}
          <div>
            <h4 className="font-bold text-white mb-4">Besoin d'aide ?</h4>
            <p className="text-sm text-slate-400 mb-4">
              Réponse rapide sous 24h. Devis gratuit et sans engagement.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              Prendre Rendez-vous
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Smile PC Solutions. Tous droits réservés.</p>
          <div className="flex gap-6">
            <span>Site sécurisé & moderne</span>
            <span>Made in Grand Est</span>
          </div>
        </div>
      </div>
    </footer>
  );
}