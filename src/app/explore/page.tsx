import { Header } from "./header";
import prisma from "@/lib/db";
import { VehicleCard } from "./vehicle-card";
import { Filters } from "./filters";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ExplorePage() {
  const session = await getServerSession(authOptions);
  const vehicles = await prisma.vehicle.findMany();

  const transmissionTypes = Array.from(
    new Set(vehicles.map((v) => v.transmission))
  );
  const seatingCapacities = Array.from(
    new Set(vehicles.map((v) => v.seatingCapacity))
  ).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto md:pt-20">
        <h1 className="text-3xl font-bold mb-6">Explore Our Vehicles</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Filters
            transmissionTypes={transmissionTypes}
            seatingCapacities={seatingCapacities}
          />
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isLoggedIn={session?.user ? true : false}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
