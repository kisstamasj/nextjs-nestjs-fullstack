import AdminInterfaceWrapper from "@/components/AdminInterfaceWrapper";
import AdminNavBar from "@/components/nav-bar/AdminNavBar";
import { MenuItemType } from "@/components/sidebar/menu-item";
import SideBar from "@/components/sidebar/side-bar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learningage v2",
  description: "Learningage v2",
};

/**
 * Force dynamic rendering to prevent server-side cache
 * source: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
// export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuItems: MenuItemType[] = [
    {
      id: "1",
      label: "Statisztika",
      href: "/admin/statistics",
      icon: "PieChart",
    },
    { id: "2", label: "Felhasználók", href: "/admin/users", icon: "User" },
    { id: "3", label: "Rendszer", href: "/admin/system", icon: "ServerCog" },
  ];

  return (
    <AdminInterfaceWrapper>
      <div className="flex h-dvh">
        <SideBar menuItems={menuItems} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <AdminNavBar />
          <main className="h-full">{children}</main>
        </div>
      </div>
    </AdminInterfaceWrapper>
  );
}
