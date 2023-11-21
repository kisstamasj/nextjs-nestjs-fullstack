import UserNavBar from '@/components/NavBar/UserNavbar';
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
    <div>
      <UserNavBar/>
      {children}
    </div>
  );
}
