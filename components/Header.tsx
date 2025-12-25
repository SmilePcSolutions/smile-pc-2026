"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Laptop } from 'lucide-react';

export default function Header() {
  // État pour savoir si le menu est ouvert ou fermé
  const [isOpen, setIsOpen] = useState(false);

  // ✅ LA FONCTION MAGIQUE : Ferme le menu quand on l'appelle
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO (Ferme le menu aussi si on clique dessus) */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
              <Laptop size={20} />
            </div>
            <span className="font-bold text-xl text-slate-900">Smile PC</span>
          </Link>

          {/* --- MENU ORDINATEUR (Caché sur mobile) --- */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Accueil
            </Link>
            <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Services & Tarifs
            </Link>
            <Link href="/avis" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Avis Clients
            </Link>
            <Link href="/apropos" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              À Propos
            </Link>
            
            {/* Bouton Contact PC */}
            <Link 
              href="/contact" 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg"
            >
              Me Contacter
            </Link>
          </div>

          {/* --- BOUTON BURGER (Les 3 traits noirs) --- */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            aria-label="Ouvrir le menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MENU MOBILE (Ce qui s'ouvre sur ton iPhone) --- */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-slate-100 shadow-xl min-h-screen">
          <div className="flex flex-col p-6 space-y-6 text-lg">
            
            {/* ✅ SUR CHAQUE LIEN : J'ai ajouté onClick={closeMenu} */}
            
            <Link href="/" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600 block py-2 border-b border-slate-50">
              Accueil
            </Link>
            
            <Link href="/services" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600 block py-2 border-b border-slate-50">
              Services & Tarifs
            </Link>
            
            <Link href="/avis" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600 block py-2 border-b border-slate-50">
              Avis Clients
            </Link>
            
            <Link href="/apropos" onClick={closeMenu} className="text-slate-600 font-medium hover:text-blue-600 block py-2 border-b border-slate-50">
              À Propos
            </Link>

            {/* ✅ LE BOUTON CONTACT (Spécial Mobile) */}
            <div className="pt-4">
              <Link 
                href="/contact" 
                onClick={closeMenu} // Lui aussi ferme le menu !
                className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all active:scale-95"
              >
                Me Contacter 📞
              </Link>
            </div>

          </div>
        </div>
      )}
    </nav>
  );
}
