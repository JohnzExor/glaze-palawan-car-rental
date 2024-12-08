import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().max(50),
  password: z.string().max(250),
});

export const registerSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: z.string(),
  phoneNumber: z.string().min(1).max(50),
  password: z.string().min(1).max(250),
});

export const vehicleSchema = z.object({
  name: z.string().min(1, "Vehicle name is required"),
  type: z.enum(["CAR", "SUV", "VAN", "MOTORCYCLE"]), // Add VehicleType validation if enum is available
  // Add VehicleType validation if enum is available
  licensePlate: z.string().optional(),
  rentPerDay: z
    .string()
    .min(0, "Rent per day must be greater than or equal to 0"),
  isAvailable: z.boolean(),
  description: z.string().optional(),
  attachments: z.array(z.string()),
  maxFuelCapacity: z
    .string()
    .min(0, "Fuel capacity must be greater than or equal to 0"),
  transmission: z.enum(["MANUAL", "AUTOMATIC"]), // Add TransmissionType validation if enum is available
  seatingCapacity: z.string().min(1, "Seating capacity must be at least 1"),
  colors: z.string().min(1, "Colors must be at least 1"),
});
