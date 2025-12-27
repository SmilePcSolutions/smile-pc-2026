import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd"; // ✅ On importe le JSON-LD

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Smile PC Solutions",
    default: "Smile PC Solutions - Dépannage Informatique à Moyeuvre-Grande",
  },
  description: "Expert en dépannage informatique à domicile, maintenance PC/Mac, suppression de virus et formation. Intervention rapide sur Moyeuvre-Grande (57) et alentours.",
  metadataBase: new URL("https://www.smilepcsolutions.fr"),
  alternates: {
    canonical: "https://www.smilepcsolutions.fr/",
  },
  openGraph: {
    title: "Smile PC Solutions - Dépannage Informatique à Domicile",
    description: "Besoin d'aide avec votre PC ? Je me déplace chez vous à Moyeuvre-Grande et alentours. Devis gratuit.",
    url: "https://www.smilepcsolutions.fr",
    siteName: "Smile PC Solutions",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-slate-900 bg-white`}>
        <JsonLd /> {/* ✅ On l'active ici */}
        <Header />
        <main className="min-h-screen flex flex-col pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}