"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fuel, Cog, Users } from "lucide-react";
import { Vehicle } from "@prisma/client";
import AuthDialog, { AuthDialogRef } from "@/components/auth/auth-dialog";
import { useRouter } from "next/navigation";
import { fileUrl } from "@/lib/storage";

interface VehicleCardProps {
  vehicle: Vehicle;
  isLoggedIn: boolean; // Pass the login state
}

export function VehicleCard({ vehicle, isLoggedIn }: VehicleCardProps) {
  const router = useRouter();
  const authDialogRef = useRef<AuthDialogRef>(null);

  const handleBookNow = () => {
    if (!isLoggedIn) {
      authDialogRef.current?.openDialog();
    } else {
      // Navigate to booking page
      router.push(`/explore/book/${vehicle.id}`);
    }
  };

  const formattedRent = vehicle.rentPerDay
    ? parseFloat(vehicle.rentPerDay).toFixed(2)
    : "N/A";

  return (
    <>
      <Card className="overflow-hidden flex flex-col">
        <Image
          src={fileUrl + vehicle.attachments}
          alt={vehicle.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
        <CardContent className="p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-2 text-primary">
            {vehicle.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            {vehicle.description}
          </p>
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
            <p className="text-lg font-bold">₱{formattedRent}/day</p>
            <p
              className={`text-sm ${
                vehicle.isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {vehicle.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 bg-muted mt-auto">
          <Button className="w-full" onClick={handleBookNow}>
            Book Now
          </Button>
        </CardFooter>
      </Card>
      <AuthDialog ref={authDialogRef} />
    </>
  );
}
