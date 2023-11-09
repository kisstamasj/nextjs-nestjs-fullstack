
import NavBar from '@/components/NavBar';
import SideBarDesktop from '@/components/SideBarDesktop';
import SideBarMobile from '@/components/SideBarMobile';
import { MenuItemType } from '@/components/menu/MenuItem';
import React from 'react';



const SetupLayout = ({ children }: { children: React.ReactNode }) => {

  const menuItems: MenuItemType[] = [
    { id: '1', label: 'Statisztika', href: '/admin', icon: 'pie-chart' },
    { id: '2', label: 'Felhasználók', href: '/admin/users', icon: 'user' },
    { id: '3', label: 'Rendszer', href: '/admin/system', icon: 'server-cog' },
  ];
  return (
    <div className="flex flex-row relative h-full w-full">
      <SideBarDesktop menuItems={menuItems} />
      <SideBarMobile menuItems={menuItems} />
      <div className="flex flex-col w-full">
        <NavBar toggleSideBar={true} />
        {children}
      </div>
    </div>
  );
}

export default SetupLayout;
