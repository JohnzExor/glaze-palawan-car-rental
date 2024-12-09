"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/components_hero-section";
import { VehicleTypesSection } from "@/components/components_vehicle-types-section";
import { FeaturesSection } from "@/components/components_features-section";
import { GallerySection } from "@/components/components_gallery-section";
import { TestimonialsSection } from "@/components/components_testimonials-section";
import { ContactSection } from "@/components/components_contact-section";
import { useRouter } from "next/navigation";

const links = [
  { name: "Vehicles", path: "/explore" },
  { name: "About", path: "#about" },
  { name: "Gallery", path: "#gallery" },
  { name: "Contact", path: "#contact" },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/images/icon.png"
              alt="Glaze Palawan Car Rental Logo"
              width={50}
              height={50}
              className="rounded-full bg-primary p-1"
            />
            <span className="ml-2 text-xl md:text-2xl font-bold text-primary">
              Glaze Palawan Car Rental
            </span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {links.map(({ path, name }, index) => (
                <li key={index}>
                  <Link
                    href={path}
                    className="text-gray-600 hover:text-primary transition duration-300"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => router.push("/explore")}
          >
            Book Now
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        <HeroSection />
        <VehicleTypesSection />
        <FeaturesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Glaze Palawan Car Rental
              </h3>
              <p className="text-blue-100">
                Your trusted partner for exploring Palawan.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {links.map(({ path, name }, index) => (
                  <li key={index}>
                    <Link
                      href={path}
                      className="text-blue-100 hover:text-white transition duration-300"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <p className="text-blue-100 mb-2">
                Purok Kilos-Agad Brgy. San Miguel, Puerto Princesa City -
                Palawan
              </p>
              <p className="text-blue-100">
                Located just outside Puerto Princesa City - Airport
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-blue-500 pt-8 text-center">
            <p className="text-blue-100">
              &copy; 2024 Glaze Palawan Car Rental. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
