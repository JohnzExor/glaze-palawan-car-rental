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
import { LoginUserAction } from "./actions";
import { useServerAction } from "zsa-react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export function LoginForm() {
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
      toast({ description: "Sign in success" });
      router.push("/explore");
    } catch (error) {
      console.error(error);
    }
  }

  return (
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
  );
}
