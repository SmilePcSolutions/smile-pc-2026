import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smile PC Solutions | Dépannage Informatique Moyeuvre-Grande",
  description: "Réparation PC & Assistance Informatique rapide à domicile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* Barre verte sans l'icône qui buggait */}
        <div className="bg-green-50 text-green-800 text-sm py-2 text-center flex justify-center items-center gap-2 font-medium border-b border-green-100">
          ✅ Dépannage à domicile sur Moyeuvre-Grande et alentours
        </div>

        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
