import prisma from "@/lib/db";

export const findAllUsers = async () => {
  const data = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
  return data;
};
