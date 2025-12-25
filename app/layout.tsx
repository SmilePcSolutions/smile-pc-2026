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
        {/* Le Header contient déjà la bannière verte, inutile de la mettre ici */}
        <Header />
        <main className="min-h-screen pt-24 md:pt-28">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

