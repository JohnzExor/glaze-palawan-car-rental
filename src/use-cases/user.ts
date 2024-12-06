import { findAllUsers } from "@/data-access/user";

export const findAllUsersUseCase = async () => {
  const data = await findAllUsers();
  return data;
};
