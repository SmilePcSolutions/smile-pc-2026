"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Laptop } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50">
      
      {/* 1. BANNIÈRE VERTE UNIQUE */}
      <div className="bg-green-50 text-green-800 py-2 text-center text-sm font-medium border-b border-green-100 px-4">
        ✅ Dépannage à domicile sur Moyeuvre-Grande et alentours
      </div>

      {/* 2. BARRE DE NAVIGATION BLANCHE */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white shadow-sm">
                <Laptop size={20} />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">Smile PC</span>
            </Link>

            {/* MENU PC (Centré) */}
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
              
              <Link 
                href="/contact" 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Me Contacter
              </Link>
            </div>

            {/* BOUTON BURGER (Mobile) */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Ouvrir le menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MENU DÉROULANT MOBILE */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl min-h-screen">
            <div className="flex flex-col p-6 space-y-4">
              <Link href="/" onClick={closeMenu} className="text-lg font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600">
                Accueil
              </Link>
              <Link href="/services" onClick={closeMenu} className="text-lg font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600">
                Services & Tarifs
              </Link>
              <Link href="/avis" onClick={closeMenu} className="text-lg font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600">
                Avis Clients
              </Link>
              <Link href="/apropos" onClick={closeMenu} className="text-lg font-medium text-slate-700 py-3 border-b border-slate-50 hover:text-blue-600">
                À Propos
              </Link>

              <div className="pt-6">
                <Link 
                  href="/contact" 
                  onClick={closeMenu} 
                  className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all active:scale-95"
                >
                  Me Contacter 📞
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
