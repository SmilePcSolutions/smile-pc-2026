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
        <Header />
        
        {/* SPACER 100px - NE PAS TOUCHER */}
        <div className="h-[100px] w-full block" aria-hidden="true"></div>

        <main className="min-h-screen">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
