"use server";

import { registerSchema } from "@/types/definitions";
import { createServerAction } from "zsa";
import { createUserUseCase } from "@/use-cases/user";

export const createUserAction = createServerAction()
  .input(registerSchema)
  .handler(async ({ input }) => {
    const data = await createUserUseCase(input);
    return data;
  });
