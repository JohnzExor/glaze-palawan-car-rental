"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Vehicle } from "@prisma/client";

const bookingSchema = z.object({
  startDate: z.string().nonempty("Start date is required"),
  endDate: z.string().nonempty("End date is required"),
  color: z.string().nonempty("Please select a color"),
});

type BookingFormInputs = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  vehicle: Vehicle;
}

export function BookingForm({ vehicle }: BookingFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<BookingFormInputs>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      color: "",
    },
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const colors = useMemo(
    () => (vehicle.colors ? vehicle.colors.split(",") : []),
    [vehicle.colors]
  );

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const calculateTotalAmount = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end > start) {
      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return days * parseFloat(vehicle.rentPerDay || "0");
    }

    return 0;
  };

  useEffect(() => {
    const subscription = form.watch((values) => {
      const { startDate, endDate } = values;
      if (startDate && endDate) {
        setTotalAmount(calculateTotalAmount(startDate, endDate));
      }
    });

    return () => subscription.unsubscribe();
  }, [form, vehicle.rentPerDay]);

  async function onSubmit(values: BookingFormInputs) {
    toast({
      description: `Booking confirmed for ${vehicle.name}. Total: $${totalAmount}`,
    });
    router.push(`/explore/book/${vehicle.id}/booking-confirmation`);
  }

  const startDateValue = form.watch("startDate");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Start Date */}
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={today} // Restrict past dates
                  {...field}
                  placeholder="Select start date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* End Date */}
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={startDateValue || today} // Use memoized or current start date
                  {...field}
                  placeholder="Select end date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Selection */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Color</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors.map((color, index) => (
                      <SelectItem key={index} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Total Amount */}
        <div>
          <p className="text-lg font-medium">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Book Now
        </Button>
      </form>
    </Form>
  );
}
