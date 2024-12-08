import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "../header";

export default function BookingConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for choosing Glaze Palawan Car Rental.
        </p>
        <Button asChild>
          <Link href="/explore">Explore More Vehicles</Link>
        </Button>
      </main>
    </div>
  );
}
