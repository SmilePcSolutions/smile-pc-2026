"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import SunCalc from "suncalc";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ 
  theme: "light", 
  toggleTheme: () => {} 
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;

    const calculateSolar = () => {
      const now = new Date();
      // Coordonnées approximatives Grand Est (Metz)
      const times = SunCalc.getTimes(now, 49.1, 6.1);

      const isNight = now > times.sunset || now < times.sunrise;
      setTheme(isNight ? "dark" : "light");

      const nextChange = isNight ? times.sunrise : times.sunset;
      
      // Sécurité temporelle (si le changement est passé, on revérifie dans 1h)
      if (nextChange <= now) {
         const fallbackTimer = setTimeout(calculateSolar, 60 * 60 * 1000);
         return () => clearTimeout(fallbackTimer);
      }

      const delay = nextChange.getTime() - now.getTime();
      
      if (delay > 0) {
        const timer = setTimeout(() => {
          setTheme(isNight ? "light" : "dark");
        }, delay);
        return () => clearTimeout(timer);
      }
    };

    calculateSolar();
  }, [manual]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setManual(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}