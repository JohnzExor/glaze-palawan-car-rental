"use server";

import { vehicleSchema } from "@/types/definitions";
import { createServerAction } from "zsa";

export const createVehicleAction = createServerAction()
  .input(vehicleSchema)
  .handler(({ input }) => {
    console.log(input);
  });
