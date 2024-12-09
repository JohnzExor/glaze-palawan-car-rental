import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                View Rental
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Rental Details</h3>
              <p className="text-sm">
                Here are the details of your pending rental. You can review the
                information below.
              </p>
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Vehicle Name:</span>
                  <span>{rental.vehicle?.name || "Unknown Vehicle"}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Rental Period:</span>
                  <span>
                    {formatDate(rental.startDate)} -{" "}
                    {formatDate(rental.endDate)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total Amount:</span>
                  <span>₱{rental.totalAmount.toLocaleString()}</span>
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant={"secondary"} className="w-full">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {rental.status === "CONFIRMED" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Contact Support</h3>
              <p className="text-sm">
                If you have any questions or need assistance, please reach out
                to our support team. You can contact us via email or phone, or
                use the form below to send a message.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Support Contact:</h4>
                <p>Email: support@rentalservice.com</p>
                <p>Phone: +1-800-123-4567</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Close</Button>
                <Button>Contact Support</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {rental.status === "COMPLETED" && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Leave a Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <h3 className="text-lg font-semibold">Leave a Review</h3>
              <p className="text-sm">
                We&quot;d love to hear your feedback! Please share your
                experience with us to help improve our services.
              </p>
              <div className="mt-4">
                <textarea
                  className="w-full h-24 p-2 border border-gray-300 rounded"
                  placeholder="Write your review here..."
                />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
