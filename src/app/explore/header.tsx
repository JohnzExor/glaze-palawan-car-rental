import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/icon.png"
            alt="Glaze Palawan Car Rental Logo"
            width={40}
            height={40}
          />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            Glaze Palawan Car Rental
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/explore"
                className="text-gray-600 hover:text-gray-900"
              >
                Explore
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
        <Button asChild>
          <Link href="/explore">Book Now</Link>
        </Button>
      </div>
    </header>
  );
}
