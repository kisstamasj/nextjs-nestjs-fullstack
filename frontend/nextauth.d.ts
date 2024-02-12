import NextAuth, { DefaultSession } from "next-auth";

export interface BackendTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export type ExtendedUser = DefaultSession["user"] & {
  email: string;
  name: string;
  avatar: string;
  backendTokens: BackendTokens;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  interface JWT {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    backendTokens: BackendTokens;
  }
}
