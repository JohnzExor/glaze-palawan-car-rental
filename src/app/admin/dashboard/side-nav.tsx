import Image from "next/image";
import NavLinks from "./nav-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideNavigations = () => {
  return (
    <div className="flex flex-col gap-4 max-h-screen px-4 py-8 border-r shadow-xl">
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
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">Johnzyll Jimeno</h1>
          <span className="text-sm">202180030@psu.palawan.edu.ph</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavigations;
