"use client";

import { updateUserAction } from "@/actions/admin/users/update-user";
import { FormFooter } from "@/components/form/form-footer";
import { FormInput } from "@/components/form/form-input";
import { Form } from "@/components/ui/form";
import { handleFormError } from "@/lib/utils";
import {
  UpdateUserSchemaType,
  updateUserSchema,
} from "@/schemas/admin/user.schema";
import { RequestErrorMessage } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UsersUpdateFormProps {
  defaultValues: UpdateUserSchemaType;
  id: string;
}

const UsersUpdateForm: FC<UsersUpdateFormProps> = ({ id, defaultValues }) => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<RequestErrorMessage>();
  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...defaultValues, password: "" },
  });

  const onSubmit = async (values: UpdateUserSchemaType) => {
    startTransition(async () => {
      const { success, error } = await updateUserAction(id, values);
      if (error) {
        handleFormError(error, form, setError);
      }
      if (success) {
        toast.success("Felhasználó fiók sikeresen frissítve.", {
          description: values.name,
        });
        if (session?.user?.id === id) {
          await update();
        }

        router.push("/admin/users");
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            label="Name"
            name="name"
            form={form}
            inputProps={{ placeholder: "Pop Simon" }}
          />
          <FormInput
            label="Email"
            name="email"
            form={form}
            inputProps={{ placeholder: "example@dotcom.com", type: "email" }}
          />
          <FormInput
            label="Password"
            name="password"
            form={form}
            inputProps={{ placeholder: "*********", type: "password" }}
          />
          <FormFooter
            cancelUrl="/admin/users"
            error={error}
            isPending={isPending}
          />
        </form>
      </Form>
    </>
  );
};

export default UsersUpdateForm;
