import prisma from "@/lib/db";

export const findAllPayments = async () => {
  const data = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};
