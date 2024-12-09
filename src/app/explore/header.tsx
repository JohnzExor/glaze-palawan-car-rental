"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import Logout from "@/components/logout";
import NavigationLinks from "./nav-links";
import NavigationToggle from "./nav-toggle";
import { ModeToggle } from "@/components/theme/mode-toggle";
import AuthDialog, { AuthDialogRef } from "@/components/auth/auth-dialog";
import { Button } from "@/components/ui/button";

export function Header({ session }: { session: Session | null }) {
  const authDialogRef = useRef<AuthDialogRef>(null);

  const handleSignIn = () => {
    authDialogRef.current?.openDialog();
  };

  return (
    <header className="md:fixed w-full backdrop-blur-3xl border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/explore" className="flex items-center">
          <Image
            src="/images/icon.png"
            alt="Glaze Palawan Car Rental Logo"
            width={40}
            height={40}
          />
          <span className="ml-2 md:text-xl font-bold text-primary">
            Glaze Palawan Car Rental
          </span>
        </Link>
        <ul className="items-center gap-8 hidden lg:flex">
          <NavigationLinks session={session} />
        </ul>
        <NavigationToggle session={session} />
        {session?.user ? (
          <div className="items-center gap-4 hidden lg:flex">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <h1 className="font-bold flex items-center">
                  {session?.user.firstName}
                </h1>
                <h1 className="font-bold flex items-center">
                  {session?.user.lastName}
                </h1>
              </div>
              <span className="text-sm">{session.user.email}</span>
            </div>

            <Avatar>
              <AvatarFallback>
                {session?.user.firstName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div>
              <ModeToggle />
            </div>
            <Logout />
          </div>
        ) : (
          <div className="hidden md:block">
            <Button onClick={handleSignIn}>Sign In</Button>
            <AuthDialog ref={authDialogRef} />
          </div>
        )}
      </div>
    </header>
  );
}
