import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smile PC Solutions | Dépannage Informatique à Moyeuvre-Grande",
  description:
    "Dépannage, maintenance, optimisation, récupération de données et assistance PC/Mac/Linux à Moyeuvre-Grande et alentours.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f7f9ff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen antialiased text-slate-900`}>
        <Header />
        <main className="min-h-screen pt-28 pb-14 px-4 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
