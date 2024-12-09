"use client";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Heart, Home, Navigation } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    path: "/",
    icon: Home,
    requiredSession: false,
  },
  {
    name: "Explore",
    path: "/explore",
    icon: Navigation,
    requiredSession: false,
  },
  {
    name: "My Rentals",
    path: "/explore/rentals",
    icon: Heart,
    requiredSession: true,
  },
];

const NavigationLinks = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();

  return (
    <>
      {links
        .filter(({ requiredSession }) => !requiredSession || session) // Only show if session exists or it's not required
        .map(({ name, path, icon: Icon }, index) => (
          <li key={index}>
            <Link
              href={path}
              className={clsx(
                "flex items-center gap-2 px-4 py-3 md:px-0 md:py-0 rounded-xl text-sm md:text-base",
                {
                  "bg-primary text-background md:bg-transparent md:text-current md:font-bold":
                    pathname === path,
                }
              )}
            >
              <Icon />
              <h1>{name}</h1>
            </Link>
          </li>
        ))}
    </>
  );
};

export default NavigationLinks;
