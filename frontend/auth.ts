import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { createAxiosServerSide } from "./lib/axios";
import { BackendTokens } from "./nextauth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow OAuth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      // Prevent sing in without email verification
      return true;
    },
    async session({ token, session }) {
      // console.log("------ SESSION CALLBACK ------");
      // console.log({ token, session });
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.backendTokens = token.backendTokens as BackendTokens;
      return session;
    },
    async jwt({ token, user, trigger, session, account, profile }) {
      // console.log(" ------ JWT CALLBACK ------ ");
      // console.log({ token, user, trigger, session, account, profile });

      if (!token.sub) return token;

      let accessToken: string;
      if (user) {
        accessToken = user.backendTokens.accessToken;
      } else {
        let backendTokens = token.backendTokens as BackendTokens;
        accessToken = backendTokens.accessToken;
      }

      const axios = await createAxiosServerSide({
        withCredentials: true,
        accessToken,
      });
      const { data: existingUser } = await axios.get("/users/profile");
      token.id = existingUser.id;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.image = existingUser.image;
      if (user) {
        token.backendTokens = user.backendTokens;
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
