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
import { useMemo, useEffect, useState } from "react";
import { PaymentMethod, Vehicle } from "@prisma/client";
import { BookingSchema } from "@/types/definitions";
import { useServerAction } from "zsa-react";
import { createBookingAction } from "./actions";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { Label } from "@/components/ui/label";
import { Loader, LoaderCircle } from "lucide-react";

export function BookingForm({
  vehicle,
  session,
}: {
  vehicle: Vehicle;
  session: Session | null;
}) {
  const { execute, isPending, isSuccess } =
    useServerAction(createBookingAction);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      userId: session?.user.id,
      vehicleId: vehicle.id,
      vehicleColor: "",
      startDate: undefined,
      endDate: undefined,
      totalAmount: "",
      payment: {
        create: {
          bookingId: "",
          amount: "",
          paymentMethod: "CASH", // Default value for `PaymentMethodEnum`
        },
      },
    },
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const colors = useMemo(
    () => (vehicle.colors ? vehicle.colors.split(",") : []),
    [vehicle.colors]
  );

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const calculateTotalAmount = (startDate: Date, endDate: Date) => {
    if (endDate > startDate) {
      const days = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return days * parseFloat(vehicle.rentPerDay || "0");
    }
    return 0;
  };

  useEffect(() => {
    const subscription = form.watch((values) => {
      const { startDate, endDate } = values;
      if (startDate && endDate) {
        setTotalAmount(
          calculateTotalAmount(new Date(startDate), new Date(endDate))
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [form, vehicle.rentPerDay]);

  async function onSubmit(values: z.infer<typeof BookingSchema>) {
    if (values.startDate === values.endDate) {
      return toast({
        title: "Booking error",
        description: "The start and end date are the same",
      });
    }

    try {
      const res = await execute({
        ...values,
        totalAmount: totalAmount.toString(),
      });
      console.log(res);
      if (res[1]) {
        return toast({
          description: "Error",
        });
      }
      toast({
        description: `Booking confirmed for ${vehicle.name}. Total: $${totalAmount}`,
      });
      router.push(`/explore/book/${vehicle.id}/booking-confirmation`);
    } catch (error) {
      console.error(error);
    }
  }

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
                  min={today}
                  placeholder="Select start date"
                  disabled={isPending || isSuccess}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
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
                  disabled={isPending || isSuccess}
                  min={
                    form.getValues("startDate")
                      ? new Date(form.getValues("startDate"))
                          .toISOString()
                          .split("T")[0]
                      : today
                  }
                  placeholder="Select end date"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Color */}
        <FormField
          control={form.control}
          name="vehicleColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Color</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending || isSuccess}
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

        {/* Payment Method */}
        <FormField
          control={form.control}
          name="payment.create.paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <FormControl>
                <Select
                  disabled={isPending || isSuccess}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PaymentMethod).map((methods, key) => (
                      <SelectItem value={methods} key={key}>
                        {methods}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Submit your valid id</Label>
          <Input disabled={isPending || isSuccess} id="picture" type="file" />
        </div>

        {/* Total Amount */}
        <div>
          <p className="text-lg font-medium">
            Total Amount: ${totalAmount.toFixed(2)}
          </p>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isSuccess}
        >
          {isPending || isSuccess ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Book Now"
          )}
        </Button>
      </form>
    </Form>
  );
}
