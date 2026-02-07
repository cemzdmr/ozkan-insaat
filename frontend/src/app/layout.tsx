import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SplashScreen from '@/components/ui/SplashScreen';
import ConditionalLayout from '@/components/layout/ConditionalLayout';

export const metadata: Metadata = {
  title: 'Özkan İnşaat - Construction & Excavation Group',
  description: 'Leading construction and excavation company delivering excellence in infrastructure and building projects.',
  keywords: ['construction', 'excavation', 'infrastructure', 'building', 'Turkey'],
  metadataBase: new URL('https://www.ozkan-insaat.com'),
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.ozkan-insaat.com',
    siteName: 'Özkan İnşaat',
  },
  alternates: {
    canonical: 'https://www.ozkan-insaat.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
