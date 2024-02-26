import { ZodType, z } from "zod";

export type SignInType = {
    email: string;
    password: string;
}

export const SignInSchema: ZodType<SignInType> = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export type SignUpType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type SignUpSchemaType = z.infer<typeof SignUpSchema>