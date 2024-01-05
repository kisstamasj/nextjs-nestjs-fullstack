import AdminInterfaceWrapper from "@/components/AdminInterfaceWrapper";
import SideBar from "@/components/SideBar";
import WithAuth from "@/components/auth/withAuth";
import { MenuItemType } from "@/components/menu/MenuItem";
import AdminNavBar from "@/components/nav-bar/AdminNavBar";
import type { Metadata } from "next";

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
    { id: "1", label: "Statisztika", href: "/admin", icon: "pie-chart" },
    { id: "2", label: "Felhasználók", href: "/admin/users", icon: "user" },
    { id: "3", label: "Rendszer", href: "/admin/system", icon: "server-cog" },
  ];

  return (
    <WithAuth>
      <AdminInterfaceWrapper>
        <div className="flex h-dvh">
          <SideBar menuItems={menuItems} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <AdminNavBar />
            <main>{children}</main>
          </div>
        </div>
      </AdminInterfaceWrapper>
    </WithAuth>
  );
}
