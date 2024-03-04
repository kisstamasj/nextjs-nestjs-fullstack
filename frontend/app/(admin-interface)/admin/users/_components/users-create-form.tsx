"use client";

import { FormFooter } from "@/components/form/form-footer";
import { FormInput } from "@/components/form/form-input";
import { Form } from "@/components/ui/form";
import useAxios from "@/hooks/use-axios";
import { handleFormError } from "@/lib/utils";
import {
  CreateUserSchemaType,
  createUserSchema,
} from "@/schemas/admin/user.schema";
import { RequestError, RequestErrorMessage } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UsersCreateFormProps {}

const UsersCreateForm: FC<UsersCreateFormProps> = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<RequestErrorMessage>();
  const { axiosBackend: axios } = useAxios();
  const form = useForm<CreateUserSchemaType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: CreateUserSchemaType) => {
    startTransition(async () => {
      try {
        await axios.post("/users", values);
        toast.success("Felhasználó fiók sikeresen létrehozva.", {
          description: values.name,
        });
        router.push("/admin/users");
      } catch (error) {
        let e = error as RequestError;
        let message = e.response?.data?.message;
        handleFormError(message, form, setError);
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

export default UsersCreateForm;
