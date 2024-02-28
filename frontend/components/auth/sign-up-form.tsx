"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAxios from "@/hooks/use-axios";
import { RequestError, RequestErrorMessage } from "@/types/errors";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../from/form-error";
import { AxiosError } from "axios";
import { FormSuccess } from "../from/form-success";

const SignUpForm = ({}) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<RequestErrorMessage>();
  const [success, setSuccess] = useState<string | undefined>();
  const axios = useAxios();
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={field.name}
                      disabled={isPending}
                      placeholder="Pop Simon"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete={field.name}
                      disabled={isPending}
                      type="email"
                      placeholder="example@dotcom.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sing Up
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
