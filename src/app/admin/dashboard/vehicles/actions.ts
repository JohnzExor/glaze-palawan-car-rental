"use server";

import { vehicleSchema } from "@/types/definitions";
import {
  createVehicleUseCAse,
  deleteVehicleUseCase,
} from "@/use-cases/vehicle";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerAction } from "zsa";

export const createVehicleAction = createServerAction()
  .input(vehicleSchema)
  .handler(async ({ input }) => {
    const data = await createVehicleUseCAse(input);
    if (data) {
      revalidatePath("/admin/dashboard/vehicles");
    }
    return data;
  });
export const deleteVehicleAction = createServerAction()
  .input(z.object({ id: z.string() }))
  .handler(async ({ input }) => {
    const data = await deleteVehicleUseCase(input.id);
    if (data) {
      revalidatePath("/admin/dashboard/vehicles");
    }
    return data;
  });
