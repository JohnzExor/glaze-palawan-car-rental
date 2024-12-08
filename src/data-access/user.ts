import prisma from "@/lib/db";
import { registerSchema } from "@/types/definitions";
import { compare } from "bcryptjs";
import { z } from "zod";

export const findEmail = async (email: string) => {
  const data = await prisma.user.findUnique({ where: { email } });
  return data;
};

export const createUser = async (newUser: z.infer<typeof registerSchema>) => {
  const data = await prisma.user.create({ data: newUser });
  return data;
};

export const findAllUsers = async () => {
  const data = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Email not found");
  }

  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new Error("Invalid Password");
  }

  return user;
};
