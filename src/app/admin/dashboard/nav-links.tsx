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
        path: "/admin/dashboard/feedback",
        icon: Star,
      },
    ],
  },
];

const NavLinks = () => {
  return (
    <>
      {navigations.map(({ groupName, links }, index) => (
        <li key={index}>
          <h1>{groupName}</h1>
          {links.map(({ icon: Icon, name, path }, index) => (
            <Link href={path} key={index} className="flex items-center gap-1">
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
