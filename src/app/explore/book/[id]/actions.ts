"use server";

import { createBooking } from "@/data-access/booking";
import { BookingSchema } from "@/types/definitions";
import { createServerAction } from "zsa";

export const createBookingAction = createServerAction()
  .input(BookingSchema)
  .handler(async ({ input }) => {
    const data = await createBooking(input);
    return data;
  });
