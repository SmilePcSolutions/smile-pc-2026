"use client";
import { motion } from "framer-motion";
import { Home, User, Wrench, MessageSquare, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const links = [
  { title: "Accueil", icon: <Home size={20} />, href: "/" },
  { title: "À Propos", icon: <User size={20} />, href: "/about" },
  { title: "Prestations", icon: <Wrench size={20} />, href: "/services" },
  { title: "Avis", icon: <MessageSquare size={20} />, href: "/reviews" },
  { title: "Contact", icon: <Mail size={20} />, href: "/contact" },
];
export default function FloatingDock() {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4">
      <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl">
        {links.map((link, index) => (
          <Link key={link.title} href={link.href}>
            <motion.div 
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer hover:bg-white/10 text-white/80 hover:text-blue-400 transition-colors"
              onHoverStart={() => setHoveredIndex(index)} onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}
            >
              {hoveredIndex === index && <div className="absolute top-full mt-2 px-2 py-1 bg-white text-black text-xs rounded font-bold whitespace-nowrap">{link.title}</div>}
              {link.icon}
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
