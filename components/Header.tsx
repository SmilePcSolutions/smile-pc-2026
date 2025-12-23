"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Computer } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Accueil", href: "/" },
    { name: "Services & Tarifs", href: "/services" },
    { name: "Avis Clients", href: "/avis" },
    { name: "À Propos", href: "/apropos" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Computer size={24} />
          </div>
          <span>Smile PC</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/60 p-1.5 rounded-full border border-white/50 shadow-sm backdrop-blur-md">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${pathname === link.href ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:text-blue-600 hover:bg-white/50"}`}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
           <Link href="/contact" className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Contact
          </Link>
        </div>

        <button className="md:hidden text-slate-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="p-4 text-slate-700 font-medium hover:bg-slate-50 rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
