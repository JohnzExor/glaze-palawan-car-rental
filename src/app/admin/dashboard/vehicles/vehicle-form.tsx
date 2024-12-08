"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";
import { LoaderCircle } from "lucide-react";
import { vehicleSchema } from "@/types/definitions";
import { createVehicleAction } from "./actions";

// Define schema using Zod

export function VehicleForm() {
  const { toast } = useToast();
  const { execute, isPending, isSuccess } =
    useServerAction(createVehicleAction);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      type: "",
      categoryId: "",
      licensePlate: "",
      rentPerDay: 0,
      isAvailable: true,
      description: "",
      imageUrl: "",
      maxFuelCapacity: 0,
      transmission: "",
      seatingCapacity: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    try {
      const res = await execute(values);
      if (res[1]) {
        toast({ description: res[1].message, variant: "destructive" });
        return;
      }
      toast({ description: "Vehicle created successfully" });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({ description: "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Vehicle Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter vehicle name"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Type Field */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter vehicle type"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Field */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={isPending || isSuccess}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Category 1</SelectItem>
                    <SelectItem value="2">Category 2</SelectItem>
                    {/* Replace with dynamic categories */}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* License Plate Field */}
        <FormField
          control={form.control}
          name="licensePlate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Plate</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter license plate"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rent Per Day Field */}
        <FormField
          control={form.control}
          name="rentPerDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent Per Day</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter rent per day"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Available Field */}
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available</FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL Field */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter image URL"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Maximum Fuel Capacity Field */}
        <FormField
          control={form.control}
          name="maxFuelCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Fuel Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter fuel capacity"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Transmission Field */}
        <FormField
          control={form.control}
          name="transmission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transmission</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={isPending || isSuccess}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Seating Capacity Field */}
        <FormField
          control={form.control}
          name="seatingCapacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seating Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter seating capacity"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isSuccess}
        >
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Create Vehicle"
          )}
        </Button>
      </form>
    </Form>
  );
}
