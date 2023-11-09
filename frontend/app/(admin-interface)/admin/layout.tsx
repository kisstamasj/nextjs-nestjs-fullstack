import Providers from '@/providers/Providers';
import '../../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Learningage v2',
  description: 'Learningage v2',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="h-full w-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
