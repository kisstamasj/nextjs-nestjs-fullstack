"use server";

import { createAxiosServerSide } from "@/lib/axios";
import { updateUserSchema } from "@/schemas/admin/user.schema";
import { RequestError } from "@/types/errors";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateUserAction = async (
  id: string,
  values: z.infer<typeof updateUserSchema>
) => {
  const { axiosBackend: axios } = await createAxiosServerSide({
    withCredentials: true,
  });
  try {
    await axios.patch(`/users/${id}`, {
      ...values,
      password: values.password || undefined,
    });
    revalidatePath(`/admin/users/${id}`);
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    let e = error as RequestError;
    console.log(error);
    let message = e.response?.data?.message;
    return { error: message, success: false };
  }
};
