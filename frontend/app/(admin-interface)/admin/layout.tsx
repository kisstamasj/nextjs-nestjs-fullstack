import AdminInterfaceWrapper from "@/components/AdminInterfaceWrapper";
import WithAuth from "@/components/auth/withAuth";
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
    <WithAuth>
      <AdminInterfaceWrapper>
        <div className="h-full w-full">{children}</div>
      </AdminInterfaceWrapper>
    </WithAuth>
  );
}
