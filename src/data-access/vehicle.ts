import prisma from "@/lib/db";

export const findAllVehicles = async () => {
  const data = await prisma.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });
  return data;
};
