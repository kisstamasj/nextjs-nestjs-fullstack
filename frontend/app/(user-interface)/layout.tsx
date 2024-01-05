
import UserInterfaceWrapper from "@/components/UserInterfaceWrapper";
import UserNavBar from "@/components/nav-bar/UserNavbar";
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
  return (
    <>
      <UserInterfaceWrapper>
        <UserNavBar />
        {children}
      </UserInterfaceWrapper>
    </>
  );
}
