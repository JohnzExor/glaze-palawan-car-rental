"use client";

import clsx from "clsx";
import {
  MapPinned,
  User,
  Car,
  Tag,
  Calendar,
  CreditCard,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigations = [
  {
    groupName: "Dashboard",
    links: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: MapPinned,
      },
    ],
  },
  {
    groupName: "Management",
    links: [
      {
        name: "Users",
        path: "/admin/dashboard/users",
        icon: User,
      },
      {
        name: "Vehicles",
        path: "/admin/dashboard/vehicles",
        icon: Car,
      },
      {
        name: "Categories",
        path: "/admin/dashboard/categories",
        icon: Tag,
      },
    ],
  },
  {
    groupName: "Transactions",
    links: [
      {
        name: "Bookings",
        path: "/admin/dashboard/bookings",
        icon: Calendar,
      },
      {
        name: "Payments",
        path: "/admin/dashboard/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    groupName: "Feedback",
    links: [
      {
        name: "Feedback",
        path: "/admin/dashboard/feedbacks",
        icon: Star,
      },
    ],
  },
];

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {navigations.map(({ groupName, links }, index) => (
        <li key={index} className="space-y-2 text-sm">
          <h1>{groupName}</h1>
          {links.map(({ icon: Icon, name, path }, index) => (
            <Link
              href={path}
              key={index}
              className={clsx(
                "flex items-center gap-2 rounded-lg p-3 duration-200",
                {
                  "bg-primary font-medium":
                    // Match exactly for `/admin/dashboard`
                    (path === "/admin/dashboard" &&
                      pathname === "/admin/dashboard") ||
                    // Match startsWith for other paths
                    (path !== "/admin/dashboard" && pathname.startsWith(path)),
                  " hover:bg-muted": !pathname.startsWith(path),
                }
              )}
            >
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </li>
      ))}
    </>
  );
};

export default NavLinks;
