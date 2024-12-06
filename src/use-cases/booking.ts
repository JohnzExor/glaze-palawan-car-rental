import { findAllBookings } from "@/data-access/booking";

export const findAllBookingsUseCase = async () => {
  const data = await findAllBookings();
  return data;
};
