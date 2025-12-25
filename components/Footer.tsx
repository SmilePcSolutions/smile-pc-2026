import Link from 'next/link';
import { Laptop, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLONNE 1 : LOGO & DESCRIPTION */}
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <Laptop className="text-blue-500" />
              <span className="font-bold text-xl">Smile PC</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Dépannage informatique à domicile rapide et efficace sur Moyeuvre-Grande et ses alentours.
              Redonnez le sourire à votre ordinateur !
            </p>
          </div>

          {/* COLONNE 2 : LIENS RAPIDES */}
          <div>
            <h3 className="text-white font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">Services & Tarifs</Link></li>
              <li><Link href="/avis" className="hover:text-blue-400 transition-colors">Avis Clients</Link></li>
              <li><Link href="/apropos" className="hover:text-blue-400 transition-colors">À Propos</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* COLONNE 3 : CONTACT */}
          <div>
            <h3 className="text-white font-bold mb-4">Me Contacter</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin size={18} className="text-blue-500" />
                <span>Moyeuvre-Grande & Alentours</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-blue-500" />
                <a href="tel:06XXXXXXXX" className="hover:text-white">06 XX XX XX XX</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-blue-500" />
                <a href="mailto:contact@smilepcsolutions.fr" className="hover:text-white">contact@smilepcsolutions.fr</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} Smile PC Solutions. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
