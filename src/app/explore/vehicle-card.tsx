import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Vehicle, Category } from "@prisma/client";
import Link from "next/link";
import { Fuel, Cog, Users } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle & {
    category: Category;
  };
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={vehicle.imageUrl || "/placeholder.svg"}
        alt={vehicle.name}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{vehicle.name}</h2>
        <p className="text-gray-600 mb-2">{vehicle.category.name}</p>
        <p className="text-sm text-gray-500 mb-4">{vehicle.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Fuel className="w-4 h-4 mr-1" />
            <span className="text-sm">{vehicle.maxFuelCapacity}L</span>
          </div>
          <div className="flex items-center">
            <Cog className="w-4 h-4 mr-1" />
            <span className="text-sm">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{vehicle.seatingCapacity} seats</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">
            ₱{vehicle.rentPerDay.toFixed(2)}/day
          </p>
          <p
            className={`text-sm ${
              vehicle.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {vehicle.isAvailable ? "Available" : "Not Available"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-50">
        <Button asChild className="w-full">
          <Link href={`/explore/book/${vehicle.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
