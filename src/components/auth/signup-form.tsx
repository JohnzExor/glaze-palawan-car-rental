"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { registerSchema } from "@/types/definitions";
import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { createUserAction } from "./actions";

export function SignupForm({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const { isPending, isSuccess, execute } = useServerAction(createUserAction);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const res = await execute(values);
      console.log(res);
      if (res[1]) {
        if (res[1].message === "Email already exists") {
          return form.setError("email", {
            type: "manual",
            message: res[1].message,
          });
        }
      }
      toast({ description: "Account registered" });
      form.reset();
      setPage(0);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <>
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or{" "}
          <button
            onClick={() => setPage(0)}
            className="font-medium text-primary hover:text-primary/50 duration-300 ease-out"
          >
            log in to your existing account
          </button>
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    type="text"
                    disabled={isPending || isSuccess}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your lastname"
                    type="text"
                    disabled={isPending || isSuccess}
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    disabled={isPending || isSuccess}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+63987654321"
                    type="tel"
                    disabled={isPending || isSuccess}
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
                    placeholder="Enter your password"
                    type="password"
                    disabled={isPending || isSuccess}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isPending || isSuccess}
            className="w-full"
          >
            {isPending || isSuccess ? (
              <LoaderCircle className=" animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
