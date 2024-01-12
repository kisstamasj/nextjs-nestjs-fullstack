"use server"

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { SignInSchema } from "@/schemas/auth.schema"
import { AuthError } from "next-auth";
import { z } from "zod"

export const signInAction = async (values: z.infer<typeof SignInSchema>, callbackUrl?: string | null) => {
    const validatedValues = SignInSchema.safeParse(values);
    if(!validatedValues.success){
        return {error: "Invalid credentials"};
    }

    const { email, password } = validatedValues.data;

    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        });
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials" };
            default:
              return { error: "Something went wrong" };
          }
        }
        throw error;
      }   
}