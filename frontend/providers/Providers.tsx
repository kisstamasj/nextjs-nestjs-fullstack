import React, { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";

const Providers = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
          <Toaster />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
