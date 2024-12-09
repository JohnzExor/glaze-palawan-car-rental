import prisma from "@/lib/db";
import { BookingSchema } from "@/types/definitions";
import { z } from "zod";

export const findAllBookings = async () => {
  const data = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const findAllUserBookings = async (email: string) => {
  const data = await prisma.user.findUnique({
    where: { email },
    include: {
      bookings: { include: { vehicle: true }, orderBy: { createdAt: "desc" } },
    },
  });
  return data?.bookings;
};

export const createBooking = async (newBook: z.infer<typeof BookingSchema>) => {
  const { payment, ...bookingData } = newBook;
  console.log(newBook);
  const data = await prisma.booking.create({ data: bookingData });

  if (payment?.create) {
    await prisma.payment.create({
      data: {
        ...payment.create,
        bookingId: data.id, // Link to the created booking
        amount: data.totalAmount,
      },
    });
  }
  return data;
};
