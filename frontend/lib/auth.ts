import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "../schemas/auth.schema";
import { BackendTokens } from "../types/nextauth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes-rules";
import { getBackendUrl } from "./utils";

const refreshToken = async (refreshToken: string) => {
  try {
    console.log("Refreshing token...", new Date());
    const res = await fetch(getBackendUrl() + "/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const data = await res.json();

    if (data.statusCode === 403) return false;

    return data;
  } catch (error) {
    console.log("Error when refreshing token!");
    return null;
  }
};

export const authConfig = {
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
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.image = token.image as string;
      session.user.backendTokens = token.backendTokens as BackendTokens;
      return session;
    },
    async jwt({ token, user, trigger, session, account, profile }) {
      if (!token.sub) return token;

      let backendTokens: BackendTokens;
      if (user) {
        backendTokens = user.backendTokens;
      } else {
        backendTokens = token.backendTokens as BackendTokens;
      }

      // Token rotation - not working yet
      // if (new Date().getTime() > backendTokens.expiresIn) {
      //   console.log("Token expired!", new Date());
      //   // Refresh token
      //   backendTokens = (await refreshToken(
      //     backendTokens.refreshToken
      //   )) as BackendTokens;
      //   if (!backendTokens) {
      //     throw new Error("Failed to refresh token");
      //   }
      //   console.log("Token refreshed!", new Date());
      // }

      const res = await fetch(getBackendUrl() + "/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${backendTokens.accessToken}`,
        },
      });

      const existingUser = await res.json();
      token.id = existingUser.id;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.image = existingUser.image;
      token.backendTokens = backendTokens;

      return token;
    },
    async authorized({ auth, request }) {
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);

      if (isApiAuthRoute) {
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          console.log('Redirecting to "' + DEFAULT_LOGIN_REDIRECT + '"...');
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return true;
      }

      if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        console.log(
          "Redirecting to /auth/sign-in?callbackUrl=" + encodedCallbackUrl
        );
        return Response.redirect(
          new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
        );
      }

      return true;
    },
  },
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          try {
            const res = await fetch(getBackendUrl() + "/auth/signin", {
              method: "POST",
              body: JSON.stringify({ email, password }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (res.ok) {
              const data = await res.json();
              return data;
            }

            return null;
          } catch (error) {
            return null;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
