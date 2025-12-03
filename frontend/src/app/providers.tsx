"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // "disableTransitionOnChange" empêche les couleurs de flasher bizarrement
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={false} disableTransitionOnChange>
      <TimeLogic />
      {children}
    </NextThemesProvider>
  );
}

function TimeLogic() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Calcul immédiat de l'heure
    const hour = new Date().getHours();
    // 17h - 08h = Nuit, sinon Jour
    const targetTheme = (hour >= 17 || hour < 8) ? "dark" : "light";
    
    // On applique le thème
    setTheme(targetTheme);
  }, []);

  return null;
}
