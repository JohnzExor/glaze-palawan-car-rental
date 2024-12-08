import prisma from "@/lib/db";

export const findAllBookings = async () => {
  const data = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findAllUserBookings = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: { email },
    include: { bookings: { include: { vehicle: true } } },
  });
  return data?.bookings;
};
