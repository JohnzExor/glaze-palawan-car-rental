"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@prisma/client";

interface BookingFormProps {
  vehicle: Vehicle;
}

export function BookingForm({ vehicle }: BookingFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your API to create a booking
    console.log("Booking submitted:", {
      vehicleId: vehicle.id,
      startDate,
      endDate,
    });
    // Redirect to a confirmation page or show a success message
    router.push(`/explore/book/${vehicle.id}/booking-confirmation`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <Input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="end-date">End Date</Label>
        <Input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Book Now
      </Button>
    </form>
  );
}
