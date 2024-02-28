import UserInterfaceWrapper from "@/components/UserInterfaceWrapper";
import UserNavBar from "@/components/nav-bar/UserNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learningage v2",
  description: "Learningage v2",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserInterfaceWrapper>
        <UserNavBar />
        <div className="flex items-center justify-center pt-20">
          {children}
        </div>
      </UserInterfaceWrapper>
    </>
  );
}
