import { createUser, findAllUsers, findEmail } from "@/data-access/user";
import { registerSchema } from "@/types/definitions";
import { hash } from "bcryptjs";
import { z } from "zod";

export const createUserUseCase = async (
  newUser: z.infer<typeof registerSchema>
) => {
  const checkEmail = await findEmail(newUser.email);
  if (checkEmail) throw new Error("Email already exists");
  const hashPWD = await hash(newUser.password, 10);

  const data = await createUser({ ...newUser, password: hashPWD });
  return data;
};

export const findAllUsersUseCase = async () => {
  const data = await findAllUsers();
  return data;
};
