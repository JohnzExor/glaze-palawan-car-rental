import { findAllBookings, findAllUserBookings } from "@/data-access/booking";

export const findAllBookingsUseCase = async () => {
  const data = await findAllBookings();
  return data;
};

export const findAllUserBookingsUseCase = async (
  email: string | undefined | null
) => {
  if (!email) {
    throw new Error("No user");
  }
  const data = await findAllUserBookings(email);
  return data;
};
