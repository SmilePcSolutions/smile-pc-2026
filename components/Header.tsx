"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Laptop, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    // CONTENEUR FIXE - HAUTEUR TOTALE 100px (36 + 64)
    <div className="fixed top-0 left-0 right-0 z-50 h-[100px]">
      
      {/* 1. BANDEAU VERT FIN (h-9 = 36px) - Style précis */}
      <div className="h-9 bg-green-50/95 backdrop-blur text-green-800 flex items-center justify-center text-xs md:text-sm font-medium border-b border-green-200 px-4 text-center z-50 relative">
        ✅ Dépannage à domicile sur Moyeuvre-Grande et alentours
      </div>

      {/* 2. MENU PRINCIPAL (h-16 = 64px) - Effet Vitre + Bordure Bleutée Premium */}
      {/* Border-blue-100/50 : La touche subtile validée */}
      <header className="h-16 w-full bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border-b border-blue-100/50">
        <nav className="w-full max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-6">
          
          {/* LOGO */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-full text-white shadow-sm group-hover:scale-110 transition-transform">
              <Laptop size={18} />
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Smile PC
            </span>
          </Link>

          {/* MENU PC (Centré et aéré) */}
          <div className="hidden md:flex items-center gap-1 bg-slate-50/50 rounded-full px-2 py-1 border border-slate-100">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/services" label="Services & Tarifs" />
            <NavLink href="/avis" label="Avis Clients" />
            <NavLink href="/apropos" label="À propos" />
          </div>

          {/* BOUTON CONTACT (Style Premium) */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md transition-all hover:scale-105 hover:shadow-lg"
            >
              <Phone size={16} />
              Me Contacter
            </Link>
          </div>

          {/* BOUTON MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir le menu"
            className="md:hidden p-2 rounded-full hover:bg-blue-50 text-slate-600 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* MENU MOBILE DÉROULANT */}
      {/* Positionné pile sous le header (top-[100px]) */}
      {isOpen && (
        <div className="absolute top-[100px] left-0 right-0 bg-white/98 backdrop-blur-xl border-b border-blue-100 shadow-2xl p-4 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-2 z-40">
          <MobileLink href="/" onClick={closeMenu}>Accueil</MobileLink>
          <MobileLink href="/services" onClick={closeMenu}>Services & Tarifs</MobileLink>
          <MobileLink href="/avis" onClick={closeMenu}>Avis Clients</MobileLink>
          <MobileLink href="/apropos" onClick={closeMenu}>À propos</MobileLink>
          <div className="h-px bg-slate-100 my-2"></div>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
          >
            <Phone size={18} /> Me Contacter
          </Link>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-full text-sm font-semibold text-slate-600 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all"
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
