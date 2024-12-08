import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().max(50),
  password: z.string().max(250),
});

export const registerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string(),
  phoneNumber: z.string().min(1).max(50),
  password: z.string().min(1).max(250),
});
