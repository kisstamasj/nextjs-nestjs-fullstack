"use client";

import { FormError } from "@/components/from/form-error";
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
import useAxios from "@/hooks/use-axios";
import { handleFormError } from "@/lib/utils";
import {
  UpdateUserSchemaType,
  updateUserSchema,
} from "@/schemas/admin/user.schema";
import { RequestError, RequestErrorMessage } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UsersUpdateFormProps {
  defaultValues: UpdateUserSchemaType;
  id: string;
}

const UsersUpdateForm: FC<UsersUpdateFormProps> = ({ defaultValues, id }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<RequestErrorMessage>();
  const axios = useAxios();
  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { ...defaultValues, password: "" },
  });

  const onSubmit = async (values: UpdateUserSchemaType) => {
    startTransition(async () => {
      try {
        await axios.patch(`/users/${id}`, {
          ...values,
          password: values.password || undefined,
        });
        toast.success("Felhasználó fiók sikeresen frissítve.", {
          description: values.name,
        })
        router.push("/admin/users");
      } catch (error) {
        let e = error as RequestError;
        console.log(error);
        let message = e.response?.data?.message;
        handleFormError(message, form, setError);
      }
    });
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
          <div className="flex w-full justify-between items-center">
            <Button disabled={isPending} type="submit">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Mentés
            </Button>
            <div className="flex flex-col items-end">
              <Link href="/admin/users">Mégse</Link>
            </div>
          </div>
          <FormError message={error} />
        </form>
      </Form>
    </>
  );
};

export default UsersUpdateForm;
