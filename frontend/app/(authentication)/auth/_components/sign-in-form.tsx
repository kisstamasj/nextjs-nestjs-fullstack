"use client";

import { signInAction } from "@/actions/sign-in";
import { FormInput } from "@/components/from/form-input";
import { ButtonLoader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import { SignInSchema, SignInSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/components/from/form-error";

const SignInForm = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInSchemaType) => {
    startTransition(async () => {
      signInAction(values, callbackUrl).then((res) => {
        if (res?.error) {
          setError(res.error);
        }
      });
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
              name="email"
              label="Email"
              inputProps={{ placeholder: "example@dotcom.com" }}
            />
            <FormInput
              form={form}
              name="password"
              label="Password"
              inputProps={{
                type: "password",
                placeholder: "*********",
                autoComplete: "current-password",
              }}
            />
          </div>
          <FormError message={error} />
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending && <ButtonLoader />}
            Sing in
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
