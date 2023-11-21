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
import { FormError } from "@/lib/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().min(2),
  password: z.string().min(4),
});

const SignInForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", { redirect: false }, values);
      if (res?.status === 401) {
        return setError("Your email or password are wrong!");
      }

      router.refresh()
    } catch (error) {
      let e = error as FormError;
      alert(e);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@dotcom.com" {...field} />
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
          <div className="flex w-full justify-between items-center">
            <Button disabled={loading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sing in
            </Button>
            <div className="flex flex-col items-end">
              <span>{`You don't have an account?`}</span>
              <Link href="/sign-up">Sign Up!</Link>
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

export default SignInForm;
