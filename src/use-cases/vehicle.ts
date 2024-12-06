import { findAllVehicles } from "@/data-access/vehicle";

export const findAllVehiclesUseCase = async () => {
  const data = await findAllVehicles();
  return data;
};
