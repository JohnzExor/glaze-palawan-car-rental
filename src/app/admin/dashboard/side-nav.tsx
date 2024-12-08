import Image from "next/image";
import NavLinks from "./nav-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import Logout from "@/components/logout";

const SideNavigations = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex-col gap-4 max-h-screen px-4 py-8 border-r shadow-xl hidden md:flex">
      <div className="flex items-center gap-1">
        <Image src={"/images/icon.png"} alt="logo" width={50} height={50} />
        <div>
          <h1 className="font-bold">Admin Dashboard</h1>
          <span className="text-sm">Glaze Palawan Car Rental</span>
        </div>
      </div>
      <ul className="space-y-4 flex-grow">
        <NavLinks />
      </ul>
      <div className="space-y-2">
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
        <Logout />
      </div>
    </div>
  );
};

export default SideNavigations;
