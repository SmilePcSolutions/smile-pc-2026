"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Laptop, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    // CONTENEUR GLOBAL FIXE - HAUTEUR STRICTE 120px (40 + 80)
    <div className="fixed top-0 left-0 right-0 z-50 h-[120px] bg-white">
      
      {/* 1. BANDEAU VERT (Hauteur 40px / h-10) */}
      <div className="h-10 bg-green-50 text-green-800 flex items-center justify-center text-sm font-medium border-b border-green-100 px-2 text-center">
        ✅ Dépannage à domicile sur Moyeuvre-Grande et alentours
      </div>

      {/* 2. MENU PRINCIPAL (Hauteur 80px / h-20) */}
      <header className="h-20 flex items-center px-4 shadow-md bg-white/95 backdrop-blur-md">
        <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-full text-white">
              <Laptop size={20} />
            </div>
            <span className="font-bold text-xl text-slate-900">
              Smile PC
            </span>
          </Link>

          {/* MENU PC */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/services" label="Services & Tarifs" />
            <NavLink href="/avis" label="Avis Clients" />
            <NavLink href="/apropos" label="À propos" />
          </div>

          {/* BOUTON CONTACT */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-transform hover:scale-105"
            >
              <Phone size={16} />
              Me Contacter
            </Link>
          </div>

          {/* BOUTON MOBILE */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir le menu"
            className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* MENU MOBILE DÉROULANT (Hors flux) */}
      {isOpen && (
        <div className="absolute top-[120px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-5">
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
      className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-50 transition-colors"
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
