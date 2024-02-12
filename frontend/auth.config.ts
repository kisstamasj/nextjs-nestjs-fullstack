import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "@/schemas/auth.schema";
import { createAxiosServerSide } from "./lib/axios";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const axios = await createAxiosServerSide({ withCredentials: false });

          try {
            const { data } = await axios.post("/auth/signin", {
              email,
              password,
            });

            return data;
          } catch (error) {
            return null;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
