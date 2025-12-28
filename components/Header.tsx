"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {/* BARRE DE NAVIGATION FIXE (PLEINE LARGEUR) */}
      <header className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm h-20 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
            
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-blue-200 shadow-lg group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              Smile <span className="text-blue-600">PC</span>
            </span>
          </Link>

          {/* NAVIGATION DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Accueil</Link>
            <Link href="/prestations" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Prestations</Link>
            <Link href="/avis" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Avis Clients</Link>
            <Link href="/apropos" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">À propos</Link>
            <Link href="/contact" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2">
              <Phone size={18} /> Me Contacter
            </Link>
          </nav>

          {/* BOUTON MOBILE */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE (PLEIN ÉCRAN) */}
      <div className={`fixed inset-0 z-[50] bg-white md:hidden transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} style={{ paddingTop: "80px" }}>
        <div className="flex flex-col h-full px-6 pb-8">
          <nav className="flex flex-col gap-2 mt-4">
            {[
              { label: "Accueil", href: "/" },
              { label: "Prestations", href: "/prestations" },
              { label: "Avis Clients", href: "/avis" },
              { label: "À propos", href: "/apropos" },
            ].map((link, idx) => (
              <Link key={idx} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center justify-between text-xl font-bold text-slate-900 py-4 border-b border-slate-50 hover:text-blue-600 transition-colors">
                {link.label}
                <ChevronRight size={20} className="text-slate-300" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95">
              <Phone size={24} /> Me Contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}