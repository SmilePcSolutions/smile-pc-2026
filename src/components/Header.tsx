"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Monitor, User, Briefcase, MessageSquare, Star } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Accueil", href: "/", icon: <Monitor className="w-4 h-4" /> },
    { name: "À propos", href: "/apropos", icon: <User className="w-4 h-4" /> },
    { name: "Prestations", href: "/prestations", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Avis Clients", href: "/avis", icon: <Star className="w-4 h-4" /> },
    { name: "Contact", href: "/contact", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-white/85 backdrop-blur-lg border border-white/40 shadow-xl shadow-blue-900/5 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl relative z-50">
        
        <Link href="/" className="font-bold text-xl tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            S
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-slate-900 text-sm">Smile PC</span>
            <span className="text-blue-600 text-xs uppercase tracking-widest">Solutions</span>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 px-4 py-2 rounded-full transition-all duration-300 ease-out"
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <button 
          className="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors active:scale-95"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-4 md:hidden border border-white/50 overflow-hidden ring-1 ring-slate-900/5"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all active:scale-98"
                >
                  <div className="p-2 bg-blue-100/50 text-blue-600 rounded-lg">
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
