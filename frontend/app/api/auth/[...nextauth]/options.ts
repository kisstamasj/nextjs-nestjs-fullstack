// https://github.com/nextauthjs/next-auth/issues/8254
// https://github.com/vahid-nejad/Refresh-Token-Next-Auth/tree/main

import axiosBase, { createAxios } from "@/lib/axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (typeof req.query === "undefined") return null;
        try {
          const { data } = await axiosBase.post("/auth/signin", req.query);
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
    updateAge: 0
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) return { ...token, ...user };

      return token;
    },
  },
  events: {
    async signOut({ session, token }) {
      const axios = createAxios();
      const res = await axios.get('/auth/logout', {headers: {Authorization: `Bearer ${token.backendTokens.accessToken}`}})
    },
  },
};

export default options;
