import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ On utilise Google Fonts (automatique)
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Monitor, Menu } from "lucide-react";

// ✅ Chargement automatique de la police Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smile PC Solutions | Dépannage Informatique Moyeuvre-Grande",
  description: "Réparation PC, Mac, suppression virus à domicile. Intervention rapide 57.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={[
          inter.className, // ✅ Application de la police
          "antialiased",
          "bg-slate-50",
          "dark:bg-slate-900",
          "text-slate-900",
          "dark:text-slate-100",
          "transition-colors",
          "duration-300",
        ].join(" ")}
      >
        <ThemeProvider>
          {/* HEADER */}
          <nav
            className={[
              "fixed top-0 w-full z-50 transition-colors duration-300",
              "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md",
              "border-b border-slate-100 dark:border-slate-800",
            ].join(" ")}
          >
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white group"
              >
                <div className="bg-blue-600 text-white p-1.5 rounded-lg transition-transform group-hover:scale-110">
                  <Monitor size={20} />
                </div>
                <span>
                  Smile<span className="text-blue-600">PC</span>
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
                <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Accueil
                </Link>
                <Link href="/avis" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Avis Clients
                </Link>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                <ThemeToggle />
                <a
                  href="mailto:contact@smilepcsolutions.fr"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full transition shadow-md hover:shadow-lg ml-2"
                >
                  Me Contacter
                </a>
              </div>

              <div className="md:hidden flex items-center gap-4">
                <ThemeToggle />
                <button className="p-2 text-slate-700 dark:text-slate-200">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </nav>

          <main className="pt-20 min-h-screen">{children}</main>

          <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 mt-20 py-12 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
              <p>© {new Date().getFullYear()} Smile PC Solutions. Tous droits réservés.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}