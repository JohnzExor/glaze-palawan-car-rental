"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/types/definitions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { LoginUserAction } from "./login-action";

export function LoginForm({
  setPage,
  setIsOpen,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { execute, isPending, isSuccess } = useServerAction(LoginUserAction);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const res = await execute(values);
      if (res[1]) {
        if (res[1].message === "Email not found") {
          return form.setError("email", {
            type: "manual",
            message: res[1].message,
          });
        }
        return form.setError("password", {
          type: "manual",
          message: res[1].message,
        });
      }
      window.location.reload();
      setIsOpen(false);
      toast({ description: "Sign in success" });
      router.push("/explore");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <button
            onClick={() => setPage(1)}
            className="font-medium text-primary hover:text-primary/50"
          >
            create a new account
          </button>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                    disabled={isPending || isSuccess}
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
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                    disabled={isPending || isSuccess}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isPending || isSuccess}
          >
            {isPending || isSuccess ? (
              <LoaderCircle className=" animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
