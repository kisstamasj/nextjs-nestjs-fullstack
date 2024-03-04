"use client";

import { FormInput } from "@/components/form/form-input";
import { ButtonLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAxios from "@/hooks/use-axios";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/auth.schema";
import { RequestError, RequestErrorMessage } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/form/form-error";
import { FormSuccess } from "@/components/form/form-success";

const SignUpForm = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<RequestErrorMessage>();
  const [success, setSuccess] = useState<string | undefined>();
  const { axiosBackend: axios } = useAxios();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpSchemaType) => {
    startTransition(async () => {
      try {
        const { data: user } = await axios.post("/auth/signup", values);
        console.log({ user });
        if (user) {
          return setSuccess(
            `Account created successfully. <br/>Please sign in`
          );
        }

        throw new Error();
      } catch (error) {
        if (error instanceof AxiosError) {
          let e = error as RequestError;
          return setError(e.response?.data?.message);
        }
        console.error(error);
        setError("Something went wrong.");
      }
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          autoComplete="on"
        >
          <div className="space-y-4">
            <FormInput
              form={form}
              name="name"
              label="Name"
              inputProps={{ disabled: isPending, placeholder: "Pop Simon" }}
            />
            <FormInput
              form={form}
              name="email"
              label="Email"
              inputProps={{
                type: "email",
                disabled: isPending,
                placeholder: "example@dotcom.com",
              }}
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              inputProps={{
                type: "password",
                disabled: isPending,
                placeholder: "*********",
              }}
            />
            <FormInput
              form={form}
              name="confirmPassword"
              label="Confirm password"
              inputProps={{
                type: "password",
                disabled: isPending,
                placeholder: "*********",
              }}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending && <ButtonLoader />}
            Sing Up
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
