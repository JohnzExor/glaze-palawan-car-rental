"use client";

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import Logout from "@/components/logout";
import NavigationLinks from "./nav-links";

export function Header({ session }: { session: Session | null }) {
  return (
    <header className="fixed w-full backdrop-blur-3xl border-b">
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
        <ul className="flex items-center gap-4">
          <NavigationLinks />
        </ul>
        {session?.user ? (
          <div className="flex items-center gap-4">
            <div>
              <h1 className="font-bold">
                {session?.user.firstName} {session?.user.lastName}
              </h1>
            </div>
            <Avatar>
              <AvatarFallback>
                {session?.user.firstName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <Logout />
          </div>
        ) : (
          <Link
            href={"/auth/sign-in"}
            className="underline text-primary-foreground"
          >
            Log in your account.
          </Link>
        )}
      </div>
    </header>
  );
}
