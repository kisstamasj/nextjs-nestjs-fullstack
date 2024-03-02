import { auth } from "@/lib/auth";
import { Session } from "next-auth";

export const currentUser = async () => {
  const session = await auth();
  return extractUser(session);
};

export const extractUser = (session: Session | null) => session?.user;
