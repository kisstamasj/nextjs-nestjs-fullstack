import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AlertDialogProvider } from "./alert-dialog-provider";
import { ConfirmDialogProvider } from "./confirm-dialog-provider";

const Providers = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
          <Toaster richColors />
          <AlertDialogProvider />
          <ConfirmDialogProvider />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
