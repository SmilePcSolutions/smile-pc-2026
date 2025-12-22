import Link from "next/link";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-none">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-lg text-slate-900 dark:text-white">Smile PC Solutions</span>
          <p className="text-sm text-slate-500 dark:text-slate-400">Dépannage informatique & Moyeurve-Grande</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <p>© 2025 Tous droits réservés</p>
          <Link href="/mentions-legales" className="hover:text-blue-600 transition-colors">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-blue-600 transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
