import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { BookingForm } from "./booking-form";
import { Cog, Fuel, Users } from "lucide-react";
import Image from "next/image";

export default async function BookingPage({
  params,
}: {
  params: { id: string };
}) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: params.id },
    include: { category: true },
  });

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-bold mb-6">Book {vehicle.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Image
              src={vehicle.imageUrl || "/placeholder.svg"}
              alt={vehicle.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{vehicle.name}</h2>
              <p className="text-gray-600">{vehicle.category.name}</p>
              <p className="text-sm text-gray-500 mt-2">
                {vehicle.description}
              </p>
              <p className="text-lg font-bold mt-2">
                ₱{vehicle.rentPerDay.toFixed(2)}/day
              </p>
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
          </div>
          <BookingForm vehicle={vehicle} />
        </div>
      </main>
    </div>
  );
}
