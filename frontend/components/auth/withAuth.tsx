import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { FC } from "react";

interface withAuthProps {
  children: React.ReactNode;
}

const WithAuth: FC<withAuthProps> = async ({ children }) => {
  const session = await getServerSession(options);
  if (!session) {
    return redirect("/sign-in");
  }
  return <>{children}</>;
};

export default WithAuth;
