import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Calendar, Phone, Car } from "lucide-react";
import Link from "next/link";

export default function BookingConfirmationPage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow container mx-auto md:px-4 md:py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="text-center bg-primary text-white rounded-t-lg">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold">
              Booking Confirmed!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <p className="text-xl text-center text-gray-700">
              Thank you for choosing Glaze Palawan Car Rental.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={<Calendar className="w-6 h-6 text-primary" />}
                title="Next Steps"
                description="We'll contact you soon with pickup details and any additional information."
              />
              <InfoCard
                icon={<Phone className="w-6 h-6 text-primary" />}
                title="Need Help?"
                description="Our customer service team is ready to assist you with any questions."
              />
              <InfoCard
                icon={<Car className="w-6 h-6 text-primary" />}
                title="Your Rental"
                description="You can view or modify your booking details in your account."
              />
              <InfoCard
                icon={<CheckCircle className="w-6 h-6 text-primary" />}
                title="All Set!"
                description="You're all set for your trip. We hope you enjoy your rental experience!"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 p-6 bg-gray-100 rounded-b-lg">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/explore/rentals">View Booking</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/explore">Explore More</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
