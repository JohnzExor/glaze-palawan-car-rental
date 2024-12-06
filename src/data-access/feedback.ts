import prisma from "@/lib/db";

export const findAllFeedbacks = async () => {
  const data = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};
