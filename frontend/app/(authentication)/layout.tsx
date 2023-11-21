import UserNavBar from "@/components/NavBar/UserNavbar";
import WithOutAuth from "@/components/auth/withOutAuth";
import { ThemeProvider } from "@/providers/ThemeProvider";
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
      <ThemeProvider attribute="class" enableSystem={false}>
        <UserNavBar className="fixed" />
        <div className="flex items-center justify-center h-full">
          <WithOutAuth>{children}</WithOutAuth>
        </div>
      </ThemeProvider>
    </>
  );
}
