"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Explore",
    path: "/explore",
  },
  {
    name: "My Rentals",
    path: "/rentals",
  },
];

const NavigationLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {links.map(({ name, path }, index) => (
        <li key={index}>
          <Link href={path}>
            <h1 className={clsx({ "font-bold": pathname === path })}>{name}</h1>
          </Link>
        </li>
      ))}
    </>
  );
};

export default NavigationLinks;
