"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Espace réservé invisible
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none"
      aria-label="Changer le thème"
    >
      {theme === "dark" ? (
        // Icône Lune (Mode Sombre) - Apparaît doucement
        <Moon className="w-5 h-5 text-blue-500 transition-opacity duration-200" />
      ) : (
        // Icône Soleil (Mode Clair) - Apparaît doucement
        <Sun className="w-5 h-5 text-orange-500 transition-opacity duration-200" />
      )}
    </button>
  );
}
