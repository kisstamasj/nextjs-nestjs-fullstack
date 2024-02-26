import { ZodType, z } from "zod";

export type CreateUserType = {
    name: string;
    email: string;
    password: string;
}

export const createUserSchema: ZodType<CreateUserType> = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
  password: z.string().min(4),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>

export type UpdateUserType = {
    name: string;
    email: string;
    password?: string;
}

export const updateUserSchema: ZodType<UpdateUserType> = z.object({
  name: z.string().min(2),
  email: z.string().email().min(2),
  password: z.string().optional(),
});

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>
