import { Car, Truck } from "lucide-react";
import { VehicleType } from "@prisma/client";

interface VehicleTypeIconProps {
  type: VehicleType;
  className?: string;
}

export function VehicleTypeIcon({ type, className }: VehicleTypeIconProps) {
  switch (type) {
    case "CAR":
      return <Car className={className} />;
    case "SUV":
      return <Truck className={className} />;
    case "VAN":
      return <Truck className={className} />;
    case "TRUCK":
      return <Truck className={className} />;
    default:
      return null;
  }
}
