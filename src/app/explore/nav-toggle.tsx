import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignRight } from "lucide-react";
import { Session } from "next-auth";
import NavigationLinks from "./nav-links";
import Logout from "@/components/logout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/theme/mode-toggle";
import clsx from "clsx";
import { Button, buttonVariants } from "@/components/ui/button";
import AuthDialog, { AuthDialogRef } from "@/components/auth/auth-dialog";
import { useRef } from "react";

const NavigationToggle = ({ session }: { session: Session | null }) => {
  const authDialogRef = useRef<AuthDialogRef>(null);

  const handleSignIn = () => {
    authDialogRef.current?.openDialog();
  };
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <AlignRight />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="text-left space-y-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/icon.png"
              alt="Glaze Palawan Car Rental Logo"
              width={40}
              height={40}
            />
            <span className="ml-2 md:text-2xl font-bold text-primary">
              Glaze Palawan Car Rental
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ModeToggle />
            Theme
          </div>
          <ul className="space-y-4">
            <NavigationLinks session={session} />
          </ul>
        </SheetHeader>
        <SheetFooter className="gap-2">
          {session?.user ? (
            <>
              <Logout />
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>
                    {session?.user.firstName.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="font-bold">
                    {session?.user.firstName} {session?.user.lastName}
                  </h1>
                  <span className="text-sm">{session?.user.email}</span>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Button onClick={handleSignIn} className="w-full">
                Sign In
              </Button>
              <AuthDialog ref={authDialogRef} />
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationToggle;
