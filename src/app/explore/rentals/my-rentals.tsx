"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { RentalCard } from "./rental-card";
import { Booking, Vehicle } from "@prisma/client";

type BookingsWithVehicle = Booking & {
  vehicle: Vehicle;
};

export function MyRentals({ bookings }: { bookings: BookingsWithVehicle[] }) {
  const { data } = useSession();
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("DATE");
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) {
    return (
      <Alert>
        <AlertDescription>Please log in to view your rentals.</AlertDescription>
      </Alert>
    );
  }

  const filteredAndSortedRentals = bookings
    .filter((rental) => {
      if (filter === "ALL") return true;
      return rental.status === filter;
    })
    .filter((rental) =>
      rental.vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "DATE") {
        return (
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
      } else if (sortBy === "AMOUNT") {
        return (
          (parseFloat(b.totalAmount as string) || 0) -
          (parseFloat(a.totalAmount as string) || 0)
        );
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Input
          placeholder="Search by vehicle name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Rentals</SelectItem>
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DATE">Sort by Date</SelectItem>
              <SelectItem value="AMOUNT">Sort by Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {filteredAndSortedRentals.length === 0 ? (
        <Alert>
          <AlertDescription>
            No rentals found matching your criteria.
          </AlertDescription>
        </Alert>
      ) : (
        filteredAndSortedRentals.map((rental) => (
          <RentalCard key={rental.id} rental={rental} />
        ))
      )}
    </div>
  );
}
