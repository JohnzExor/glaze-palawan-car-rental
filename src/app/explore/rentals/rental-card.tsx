import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CarIcon, CreditCardIcon } from "lucide-react";
import { Booking } from "@prisma/client";

export function RentalCard({
  rental,
}: {
  rental: Booking & { vehicle?: { name: string } };
}) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const getDuration = (start: Date, end: Date) => {
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${days} day${days > 1 ? "s" : ""}`;
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "PENDING":
        return "text-blue-600";
      case "CONFIRMED":
        return "text-green-600";
      case "CANCELLED":
        return "text-red-600";
      case "COMPLETED":
        return "text-gray-600";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {rental.vehicle?.name || "Unknown Vehicle"}
            </h2>
            <p className={`font-medium ${getStatusColor(rental.status)}`}>
              {rental.status}
            </p>
          </div>
          <p className="text-2xl font-bold">
            ₱{rental.totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span>
              {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <CarIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span>
              Duration: {getDuration(rental.startDate, rental.endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <CreditCardIcon className="w-5 h-5 mr-2 text-gray-500" />
            <span>Total: ₱{rental.totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-6">
        {rental.status === "PENDING" && (
          <Button variant="outline" className="w-full">
            Modify Rental
          </Button>
        )}
        {rental.status === "CONFIRMED" && (
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>
        )}
        {rental.status === "COMPLETED" && (
          <Button variant="outline" className="w-full">
            Leave a Review
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
