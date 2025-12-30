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
    // Si l'utilisateur a cliqué manuellement, on arrête le cycle solaire
    if (manual) return;

    let timeoutId: NodeJS.Timeout;

    const checkSolar = () => {
      const now = new Date();
      // Coordonnées Moyeuvre-Grande (approx)
      const times = SunCalc.getTimes(now, 49.2, 6.0);

      const isNight = now > times.sunset || now < times.sunrise;
      setTheme(isNight ? "dark" : "light");

      // Calcul du prochain événement (Lever ou Coucher)
      const nextEvent = isNight ? times.sunrise : times.sunset;
      let delay = nextEvent.getTime() - now.getTime();

      // Sécurité : si le calcul donne un délai négatif (ex: juste après minuit), on réessaie dans 10 min
      if (delay <= 0) delay = 1000 * 60 * 10;

      // On programme la prochaine vérification récursivement
      timeoutId = setTimeout(checkSolar, delay);
    };

    // Lancement immédiat
    checkSolar();

    // Nettoyage propre lors du démontage ou changement de mode
    return () => clearTimeout(timeoutId);
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