import {
  createVehicle,
  deleteVehicle,
  findAllVehicles,
} from "@/data-access/vehicle";
import { vehicleSchema } from "@/types/definitions";
import { z } from "zod";

export const findAllVehiclesUseCase = async () => {
  const data = await findAllVehicles();
  return data;
};
export const deleteVehicleUseCase = async (id: string) => {
  const data = await deleteVehicle(id);
  if (!data) {
    throw new Error("Error Deleting Record");
  }
  return data;
};

export const createVehicleUseCAse = async (
  newVehicle: z.infer<typeof vehicleSchema>
) => {
  const data = await createVehicle(newVehicle);
  return data;
};
