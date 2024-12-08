import { findAllUserBookingsUseCase } from "@/use-cases/booking";
import { MyRentals } from "./my-rentals";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Booking } from "@prisma/client";

export default async function MyRentalsPage() {
  const session = await getServerSession(authOptions);
  let bookings;

  try {
    bookings = await findAllUserBookingsUseCase(session?.user.email);
  } catch (error) {
    console.error(error);
  }
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 md:pt-20">
        <h1 className="text-3xl font-bold mb-6">My Rentals</h1>
        {bookings ? (
          bookings.length > 1 ? (
            <MyRentals bookings={bookings} />
          ) : (
            <p>No Bookings</p>
          )
        ) : (
          <p>No Data</p>
        )}
      </main>
    </div>
  );
}
