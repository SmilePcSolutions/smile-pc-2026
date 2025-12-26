import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smile PC Solutions - Dépannage Informatique',
  description: 'Dépannage informatique à domicile sur Moyeuvre-Grande et alentours.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* LE HEADER FIXE (Hors du flux) */}
        <Header />
        
        {/* LE SPACER MAGIQUE (Dans le flux) */}
        {/* Il pousse physiquement le contenu de 120px vers le bas */}
        <div className="h-[120px] w-full" aria-hidden="true"></div>

        {/* LE CONTENU (Commence après le spacer) */}
        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
