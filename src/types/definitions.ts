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
  type: z.string().min(1, "Vehicle type is required"), // Add VehicleType validation if enum is available
  categoryId: z.string().min(1, "Category is required"),
  licensePlate: z.string().optional(),
  rentPerDay: z
    .number()
    .min(0, "Rent per day must be greater than or equal to 0"),
  isAvailable: z.boolean(),
  description: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  maxFuelCapacity: z
    .number()
    .min(0, "Fuel capacity must be greater than or equal to 0"),
  transmission: z.string().min(1, "Transmission is required"), // Add TransmissionType validation if enum is available
  seatingCapacity: z.number().min(1, "Seating capacity must be at least 1"),
});
