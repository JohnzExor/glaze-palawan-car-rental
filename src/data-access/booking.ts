import prisma from "@/lib/db";

export const findAllBookings = async () => {
  const data = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};
