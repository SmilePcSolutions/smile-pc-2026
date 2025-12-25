"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Laptop, Phone } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* BANNIÈRE VERTE */}
      <div className="bg-green-50 text-green-800 py-2 text-center text-sm font-medium border-b border-green-100 px-4 relative z-40">
        ✅ Dépannage à domicile sur Moyeuvre-Grande et alentours
      </div>

      {/* CAPSULE FLOTTANTE */}
      <header className="absolute md:fixed top-12 left-0 right-0 z-50 px-4 transition-all duration-300 pointer-events-none">
        <nav
          className={`mx-auto max-w-6xl rounded-full px-5 py-2.5 transition-all duration-300 pointer-events-auto border
          ${scrolled
            ? "bg-white/95 shadow-lg backdrop-blur-md border-slate-200/50"
            : "bg-white/80 backdrop-blur-sm border-white/20"}
        `}
        >
          <div className="flex items-center justify-between">
            
            {/* LOGO */}
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-full text-white shadow-sm group-hover:scale-110 transition-transform">
                <Laptop size={18} />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">Smile PC</span>
            </Link>

            {/* MENU ORDI (TEXTE AGRANDI) */}
            <div className="hidden md:flex items-center bg-slate-100/80 rounded-full px-3 py-1.5 gap-2 border border-slate-200/50">
              <NavLink href="/" label="Accueil" />
              <NavLink href="/services" label="Services & Tarifs" />
              <NavLink href="/avis" label="Avis Clients" />
              <NavLink href="/apropos" label="À propos" />
            </div>

            {/* BOUTON CONTACT (TAILLE RÉDUITE) */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-bold shadow-md transition-all hover:scale-105 hover:shadow-lg text-sm"
              >
                <Phone size={16} />
                Me Contacter
              </Link>
            </div>

            {/* BOUTON MOBILE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* MENU MOBILE DÉROULANT */}
          {isOpen && (
            <div className="md:hidden mt-4 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
              <MobileLink href="/" onClick={closeMenu}>Accueil</MobileLink>
              <MobileLink href="/services" onClick={closeMenu}>Services & Tarifs</MobileLink>
              <MobileLink href="/avis" onClick={closeMenu}>Avis Clients</MobileLink>
              <MobileLink href="/apropos" onClick={closeMenu}>À propos</MobileLink>
              <div className="h-px bg-slate-100 my-2"></div>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform"
              >
                <Phone size={18} /> Me Contacter
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 rounded-full text-sm font-semibold text-slate-700 hover:text-blue-700 hover:bg-white hover:shadow-sm transition-all"
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
      className="px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

