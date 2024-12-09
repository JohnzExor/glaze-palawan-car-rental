import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { BookingForm } from "./booking-form";
import { Cog, Fuel, Users } from "lucide-react";
import Image from "next/image";
import { fileUrl } from "@/lib/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserDetails } from "./user-details";

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
  });

  if (!vehicle) {
    notFound();
  }

  const formattedRent = vehicle.rentPerDay
    ? parseFloat(vehicle.rentPerDay).toFixed(2)
    : "N/A";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto md:pt-20">
        <h1 className="text-3xl font-bold mb-6">Book {vehicle.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="relative w-full h-64">
              <Image
                src={fileUrl + vehicle.attachments}
                alt={vehicle.name}
                fill
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-semibold">{vehicle.name}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {vehicle.description}
              </p>
              <p className="text-lg font-bold mt-2">₱{formattedRent}/day</p>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  <Fuel className="w-5 h-5 mr-2" />
                  <span>{vehicle.maxFuelCapacity}L</span>
                </div>
                <div className="flex items-center">
                  <Cog className="w-5 h-5 mr-2" />
                  <span>{vehicle.transmission}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  <span>{vehicle.seatingCapacity} seats</span>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">
                Ratings & Comments
              </h3>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
                <span className="ml-2 text-sm text-gray-500">(4.0/5)</span>
              </div>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-700">
                  &quot;Great vehicle, very comfortable and easy to drive.
                  Highly recommend!&quot;
                </p>
                <p className="text-sm text-gray-500 mt-2">- John Doe</p>
              </div>
            </div>
          </div>
          <div>
            <UserDetails session={session} />
            <BookingForm vehicle={vehicle} session={session} />
          </div>
        </div>

        {/* Ratings and Comments Section */}
      </main>
    </div>
  );
}
