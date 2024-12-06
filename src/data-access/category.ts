import prisma from "@/lib/db";

export const findAllCategories = async () => {
  const data = await prisma.category.findMany({});
  return data;
};
