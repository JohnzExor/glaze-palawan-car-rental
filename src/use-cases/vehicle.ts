import { findAllVehicles } from "@/data-access/vehicle";

export const findAllVehicleUseCase = async () => {
  const data = await findAllVehicles();
  return data;
};
