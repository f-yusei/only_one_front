import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from './header';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>
          <Header />
          <NextTopLoader initialPosition={0.08} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
