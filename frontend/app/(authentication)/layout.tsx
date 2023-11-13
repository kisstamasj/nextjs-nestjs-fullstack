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
    <div className="flex w-full h-full items-center justify-center">
      {children}
    </div>
  );
}
