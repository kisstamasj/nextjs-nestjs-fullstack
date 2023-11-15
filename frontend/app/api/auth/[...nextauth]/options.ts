// https://github.com/nextauthjs/next-auth/issues/8254
// https://github.com/vahid-nejad/Refresh-Token-Next-Auth/tree/main

import axiosClient from "@/lib/axios";
import { BACKEND_URL } from "@/lib/constants";
import type { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Bearer ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  console.log("refreshed", response);

  return {
    ...token,
    backendTokens: response,
  };
}

const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (typeof req.query === "undefined") return null;
        try {
          const { data } = await axiosClient.post("/auth/signin", req.query);
          return { ...data };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 604800 /* TODO: 7 days -> get from the env */,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
    async jwt({ token, user, account }) {
      console.log('jwt callback')
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      return await refreshToken(token);
    },
  },
  events: {
    async signOut({ session, token }) {
      await axiosClient.get("/auth/logout");
    },
  },
};



export default options;
