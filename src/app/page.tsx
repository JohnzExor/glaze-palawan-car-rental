import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleType } from "@prisma/client";
import { PhoneIcon as WhatsappIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { VehicleTypeIcon } from "./vehicle-type-icon";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/icon.png"
              alt="Glaze Palawan Car Rental Logo"
              width={40}
              height={40}
            />
            <span className="ml-2 text-2xl font-bold text-gray-900">
              Glaze Palawan Car Rental
            </span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Explore Palawan in Style
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Rent your perfect ride with Glaze Palawan Car Rental and
                discover the beauty of Puerto Princesa.
              </p>
              <div className="mt-10 flex justify-center">
                <Button size="lg" asChild>
                  <Link href="/explore">Browse Vehicles</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Our Vehicle Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.values(VehicleType).map((type) => (
                <Card key={type}>
                  <CardContent className="flex flex-col items-center p-6">
                    <VehicleTypeIcon
                      type={type}
                      className="w-16 h-16 text-blue-600 mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2">{type}</h3>
                    <p className="text-center text-gray-600">
                      {getVehicleTypeDescription(type)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Why Choose Glaze Palawan Car Rental
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                title="Convenient Location"
                description="Located just outside Puerto Princesa City Airport for easy pick-up and drop-off."
                icon="🚗"
              />
              <FeatureCard
                title="Explore Palawan"
                description="Discover the beautiful beaches, underground river, and more with our reliable vehicles."
                icon="🏝️"
              />
              <FeatureCard
                title="24/7 Support"
                description="Contact us via Whatsapp or Viber for assistance anytime during your rental period."
                icon="🛠️"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ContactCard
                icon={<WhatsappIcon className="w-8 h-8 text-green-500" />}
                title="Whatsapp/Viber"
                content="09159212806"
              />
              <ContactCard
                icon={<PhoneIcon className="w-8 h-8 text-blue-500" />}
                title="Phone"
                content="09159212806"
              />
              <ContactCard
                icon={<MapPinIcon className="w-8 h-8 text-red-500" />}
                title="Address"
                content="Purok Kilos-Agad Brgy. San Miguel, Puerto Princesa City - Palawan"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">
                Glaze Palawan Car Rental
              </h3>
              <p className="text-gray-400">
                Your trusted partner for exploring Palawan.
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Vehicles
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-400">
                Purok Kilos-Agad Brgy. San Miguel, Puerto Princesa City -
                Palawan
              </p>
              <p className="text-gray-400">
                Located just outside Puerto Princesa City - Airport
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Glaze Palawan Car Rental. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        <span className="text-4xl mb-4">{icon}</span>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-center text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function ContactCard({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center p-6">
        {icon}
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-center text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
}

function getVehicleTypeDescription(type: VehicleType): string {
  switch (type) {
    case "CAR":
      return "Comfortable and efficient for city exploration.";
    case "SUV":
      return "Spacious and versatile for family adventures in Palawan.";
    case "VAN":
      return "Perfect for group travel to Palawan's attractions.";
    case "TRUCK":
      return "Powerful and capable for off-road Palawan experiences.";
  }
}
