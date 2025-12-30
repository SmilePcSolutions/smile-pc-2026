"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={theme === "dark"}
      className="relative p-2 rounded-full transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="relative w-6 h-6">
        <Sun
          className={\bsolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 transform \\}
        />
        <Moon
          className={\bsolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 transform \\}
        />
      </div>
    </button>
  );
}