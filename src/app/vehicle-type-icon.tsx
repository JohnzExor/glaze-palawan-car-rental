import { VehicleType } from "@prisma/client";
import {
  CarIcon,
  TruckIcon,
  HomeIcon,
  BikeIcon,
  MountainIcon,
} from "lucide-react"; // Alternative icons

export function VehicleTypeIcon({
  type,
  className,
}: {
  type: VehicleType;
  className: string;
}) {
  switch (type) {
    case "CAR":
      return <CarIcon className={className} />;
    case "SUV":
      return <MountainIcon className={className} />; // SUV alternative icon
    case "VAN":
      return <HomeIcon className={className} />; // Van alternative icon
    case "TRUCK":
      return <TruckIcon className={className} />;
    case "MOTORCYCLE":
      return <BikeIcon className={className} />; // BikeIcon for motorcycle
    default:
      return <CarIcon className={className} />; // Default to car icon
  }
}
