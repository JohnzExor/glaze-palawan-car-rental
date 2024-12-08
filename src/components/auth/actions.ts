"use server";

import { loginSchema, registerSchema } from "@/types/definitions";
import { createServerAction } from "zsa";
import { signIn } from "next-auth/react";
import { createUserUseCase } from "@/use-cases/user";

export const createUserAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const data = await createUserUseCase(input);
    return data;
  });
