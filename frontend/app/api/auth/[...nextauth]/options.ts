// https://github.com/nextauthjs/next-auth/issues/8254
// https://github.com/vahid-nejad/Refresh-Token-Next-Auth/tree/main

import axiosBase, { createAxios } from "@/lib/axios";
import { BACKEND_URL } from "@/lib/constants";
import type { NextAuthOptions } from "next-auth";
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

  let error = '';
  if(response.statusCode == 403){
    error = "RefreshTokenError";
  }

  console.log("refreshed", response);

  return {
    ...token,
    backendTokens: response,
    error: error
  };
}

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
      session.error = token.error;

      return session;
    },
    async jwt({ token, user, account }) {
      if (user) return { ...token, ...user };

      // if (new Date().getTime() < token.backendTokens.expiresIn)
      //   return token;

      // token = await refreshToken(token);

      // if(token.error){
      //   throw new Error('Unable to refresh token')
      // }

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
