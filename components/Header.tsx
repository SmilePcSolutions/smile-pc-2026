"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight, MapPin } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 1. Détection du Scroll pour effet Glass
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. SCROLL LOCK (NORME 2027) : Bloque totalement le site derrière
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Bloque le scroll
    } else {
      document.body.style.overflow = "unset"; // Débloque le scroll
    }
    // Nettoyage de sécurité
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {/* --- BARRE DE NAVIGATION FIXE --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled || isOpen 
            ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-white/20" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-20">
            
            {/* LOGO */}
            <Link 
              href="/" 
              className="flex items-center gap-2 group relative z-[70]"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Smile <span className="text-blue-600">PC</span>
              </span>
            </Link>

            {/* NAVIGATION DESKTOP (Cachée sur mobile) */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Accueil</Link>
              <Link href="/services" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Services & Tarifs</Link>
              <Link href="/avis" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Avis Clients</Link>
              <Link href="/apropos" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">À propos</Link>
              
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Phone size={16} /> Me Contacter
              </Link>
            </nav>

            {/* BOUTON BURGER (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-900 hover:text-blue-600 transition-colors relative z-[70]"
              aria-label="Menu Principal"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      {/* --- MENU MOBILE IMMERSIF (PLEIN ÉCRAN) --- */}
      <div
        className={`fixed inset-0 z-[50] bg-white md:hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ top: "0px", paddingTop: "80px" }}
      >
        <div className="flex flex-col h-full px-6 pb-8">
          
          {/* LIENS DE NAVIGATION (Gros pour le tactile) */}
          <nav className="flex flex-col gap-1 mt-4">
            {[
              { label: "Accueil", href: "/" },
              { label: "Services & Tarifs", href: "/services" },
              { label: "Avis Clients", href: "/avis" },
              { label: "À propos", href: "/apropos" },
            ].map((link, idx) => (
              <Link 
                key={idx}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between text-2xl font-bold text-slate-900 py-5 border-b border-slate-100 hover:text-blue-600 transition-colors"
              >
                {link.label}
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ChevronRight size={18} />
                </span>
              </Link>
            ))}
          </nav>

          {/* ZONE DU BAS (Mise en avant Contact - Thumb Zone) */}
          <div className="mt-auto">
            <div className="bg-slate-50 rounded-2xl p-6 mb-6 text-center">
                 <p className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-2">
                    <MapPin size={16} /> Moyeuvre-Grande & Alentours
                 </p>
                 <p className="font-bold text-slate-900">Intervention Rapide 24/48h</p>
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 active:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-transform active:scale-95"
            >
              <Phone size={24} /> Me Contacter
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
