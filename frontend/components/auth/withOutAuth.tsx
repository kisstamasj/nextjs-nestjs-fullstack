import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface withOutAuthProps {
  children: React.ReactNode;
}

const WithOutAuth: FC<withOutAuthProps> = async ({ children }) => {
  const session = await getServerSession(options);
  if (session) {
    return redirect("/");
  }
  return <>{children}</>;
};

export default WithOutAuth;
