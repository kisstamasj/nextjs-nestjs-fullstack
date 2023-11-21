"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import Link from "@/components/ui/link";
import useAxios from "@/hooks/use-axios";
import { FormError } from "@/lib/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().min(2),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine(
    (values) => {
      return values.confirmPassword === values.password;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

const SignUpForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const axios = useAxios()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await axios.post("/auth/signup", values);
      await signIn(
        "credentials",
        { redirect: true },
        values
      );
    } catch (error) {
      let e = error as FormError;
      console.log(error)
      setError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pop Simon" {...field} />
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
                  <Input type="password" placeholder="*********" {...field} />
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
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between items-center">
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sing Up
            </Button>
            <div className="flex flex-col items-end">
              <span>You already have an account?</span>
              <Link href="/sign-in">Sign in!</Link>
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
