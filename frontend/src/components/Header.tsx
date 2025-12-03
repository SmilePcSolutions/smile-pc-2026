import Link from 'next/link';
import { MonitorSmartphone, Menu, Home } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO - CORRECTION : Le texte commence par Smile PC pour matcher le visuel */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Smile PC Solutions - Retour à l'accueil">
          <div className="bg-blue-600 rounded-lg p-1.5 text-white shadow-md group-hover:rotate-3 transition-transform duration-300">
            <MonitorSmartphone className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">Smile PC</span>
        </Link>

        {/* MENU BUREAU */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Accueil</Link>
            <Link href="/services" className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Services</Link>
            <Link href="/about" className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">À Propos</Link>
            <Link href="/reviews" className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Avis Clients</Link>
            <Link href="/contact" className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-slate-600 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800">Contact</Link>
          </nav>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
          <ThemeToggle />
        </div>

        {/* MENU MOBILE - CORRECTION : Ajout de aria-label explicite */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button 
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
}
