import type { Config } from "tailwindcss";

const config: Config = {
  // 1. ACTIVATION DU MODE SOMBRE (Essentiel pour next-themes)
  darkMode: 'class',

  // 2. OÙ CHERCHER LE CODE (Pour générer le CSS uniquement sur ce qui est utilisé)
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 3. PERSONNALISATION DU DESIGN
  theme: {
    extend: {
      // Dégradés de fond personnalisés (utilisés dans le Hero)
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      // Ajout des Animations Personnalisées (Pour ta page d'accueil "Joyeuse")
      animation: {
        blob: "blob 7s infinite", // L'effet des bulles de couleur en fond
        "bounce-slow": "bounce 3s infinite", // Le flottement lent des icônes
        "spin-slow": "spin 3s linear infinite", // Rotation lente si besoin
      },
      
      // Définition des mouvements des animations
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      
      // Couleurs personnalisées (Si un jour tu veux ton propre bleu)
      colors: {
        // Tu peux ajouter tes couleurs ici, mais pour l'instant on utilise le standard Tailwind
      }
    },
  },

  // 4. PLUGINS
  plugins: [
    // Ici on pourra ajouter des plugins si besoin (ex: typographie, formulaires)
    require("tailwindcss-animate"),
  ],
};

export default config;