"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronRight, MapPin } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      {/* BARRE DE NAVIGATION FLOTTANTE (ISLAND DESIGN) */}
      <header className="fixed top-6 left-0 right-0 z-[60] flex justify-center px-4 pointer-events-none">
        <div 
          className={`w-full max-w-5xl rounded-full transition-all duration-300 pointer-events-auto border ${
            isScrolled || isOpen
              ? "bg-white/90 backdrop-blur-xl shadow-lg border-white/20 py-2" 
              : "bg-white/80 backdrop-blur-md shadow-sm border-white/40 py-3"
          }`}
        >
          <div className="px-6 flex justify-between items-center">
            
            <Link href="/" className="flex items-center gap-2 group relative z-[70]" onClick={() => setIsOpen(false)}>
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-blue-200 shadow-md group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900">
                Smile <span className="text-blue-600">PC</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Accueil</Link>
              <Link href="/prestations" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Prestations</Link>
              <Link href="/avis" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Avis Clients</Link>
              <Link href="/apropos" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">À propos</Link>
              <Link href="/contact" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <Phone size={16} /> Me Contacter
              </Link>
            </nav>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-1 text-slate-900 hover:text-blue-600 transition-colors relative z-[70]">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* MENU MOBILE */}
      <div className={`fixed inset-0 z-[50] bg-white md:hidden transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} style={{ top: "0px", paddingTop: "110px" }}>
        <div className="flex flex-col h-full px-6 pb-8">
          <nav className="flex flex-col gap-1 mt-4">
            {[
              { label: "Accueil", href: "/" },
              { label: "Prestations", href: "/prestations" },
              { label: "Avis Clients", href: "/avis" },
              { label: "À propos", href: "/apropos" },
            ].map((link, idx) => (
              <Link key={idx} href={link.href} onClick={() => setIsOpen(false)} className="group flex items-center justify-between text-2xl font-bold text-slate-900 py-5 border-b border-slate-100 hover:text-blue-600 transition-colors">
                {link.label}
                <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors"><ChevronRight size={18} /></span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 active:bg-blue-700 text-white rounded-2xl font-bold text-xl shadow-lg shadow-blue-200 transition-transform active:scale-95">
              <Phone size={24} /> Me Contacter
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}