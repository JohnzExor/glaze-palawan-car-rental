import prisma from "@/lib/db";
import { vehicleSchema } from "@/types/definitions";
import { TypeOf, z } from "zod";

export const findAllVehicles = async () => {
  const data = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};

export const deleteVehicle = async (id: string) => {
  const data = await prisma.vehicle.delete({
    where: { id },
    include: { bookings: true, feedback: true },
  });
  return data;
};

export const createVehicle = async (
  newVehicle: z.infer<typeof vehicleSchema>
) => {
  const data = await prisma.vehicle.create({ data: newVehicle });
  return data;
};
