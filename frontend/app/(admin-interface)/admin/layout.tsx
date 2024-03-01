import AdminInterfaceWrapper from "@/components/AdminInterfaceWrapper";
import Overlay from "@/components/Overlay";
import { MenuItemType } from "@/components/sidebar/menu-item";
import AdminNavBar from "@/components/nav-bar/AdminNavBar";
import type { Metadata } from "next";
import SideBar from "@/components/sidebar/side-bar";

export const metadata: Metadata = {
  title: "Learningage v2",
  description: "Learningage v2",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems: MenuItemType[] = [
    { id: "1", label: "Statisztika", href: "/admin/statistics", icon: "PieChart" },
    { id: "2", label: "Felhasználók", href: "/admin/users", icon: "User" },
    { id: "3", label: "Rendszer", href: "/admin/system", icon: "ServerCog" },
  ];

  return (
    <AdminInterfaceWrapper>
      <div className="flex h-dvh">
        <Overlay />
        <SideBar menuItems={menuItems} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <AdminNavBar />
          <main className="h-full">{children}</main>
        </div>
      </div>
    </AdminInterfaceWrapper>
  );
}
