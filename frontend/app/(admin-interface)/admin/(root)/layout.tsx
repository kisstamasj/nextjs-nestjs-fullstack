
import AdminNavBar from '@/components/NavBar/AdminNavBar';
import SideBarDesktop from '@/components/SideBarDesktop';
import SideBarMobile from '@/components/SideBarMobile';
import { MenuItemType } from '@/components/menu/MenuItem';
import { ThemeProvider } from '@/providers/ThemeProvider';
import React from 'react';



const SetupLayout = ({ children }: { children: React.ReactNode }) => {

  const menuItems: MenuItemType[] = [
    { id: '1', label: 'Statisztika', href: '/admin', icon: 'pie-chart' },
    { id: '2', label: 'Felhasználók', href: '/admin/users', icon: 'user' },
    { id: '3', label: 'Rendszer', href: '/admin/system', icon: 'server-cog' },
  ];
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <div className="flex flex-row relative h-full w-full">
      <SideBarDesktop menuItems={menuItems} />
      <SideBarMobile menuItems={menuItems} />
      <div className="flex flex-col w-full">
        <AdminNavBar />
        {children}
      </div>
    </div>
    </ThemeProvider>
  );
}

export default SetupLayout;
