"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerAction } from "zsa-react";
import { vehicleSchema } from "@/types/definitions";
import { createVehicleAction } from "./actions";
import { TransmissionType, VehicleType } from "@prisma/client";
import Image from "next/image";
import { Trash, UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import supabase, { fileUrl } from "@/lib/storage";

export const UploadMedia = async (file: File, imageCount: number) => {
  const maxSizeMB = 50;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Check if the file size exceeds the 50MB limit
  if (file.size > maxSizeBytes) {
    throw new Error(`File is too large. Maximum size is ${maxSizeMB}MB.`);
  }
  const { data, error } = await supabase.storage
    .from("attachments")
    .upload(`/${Date.now()}/image-${imageCount}.jpg`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  console.log(error);
  return data;
};

export function VehicleForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const { toast } = useToast();
  const { execute, isPending, isSuccess } =
    useServerAction(createVehicleAction);

  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: "",
      type: "CAR",
      licensePlate: "",
      rentPerDay: "",
      isAvailable: true,
      description: "",
      attachments: [],
      maxFuelCapacity: "",
      transmission: "MANUAL",
      seatingCapacity: "",
      colors: "", // Default empty string for colors
    },
  });

  const handleFileOnchange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIsUploading(true);
      const upload = await UploadMedia(file, uploadedFiles.length);
      if (upload) {
        setUploadedFiles((prev) => {
          const newFiles = [...prev, upload.path];
          form.setValue("attachments", newFiles); // Use the updated files here
          return newFiles; // Return the updated state
        });
      }
    }
    setIsUploading(false);
  };

  const deleteFile = async (file: string) => {
    const { data, error } = await supabase.storage
      .from(`evidences`)
      .remove([file]);
    if (data) {
      setUploadedFiles((prev) => {
        const newFiles = prev.filter((item) => item !== file);
        form.setValue("attachments", newFiles);
        return newFiles;
      });
    }
  };

  async function onSubmit(values: z.infer<typeof vehicleSchema>) {
    try {
      const res = await execute(values);
      console.log(res);
      if (res[1]) {
        toast({ description: res[1].message, variant: "destructive" });
        return;
      }
      setOpen(false);
      setUploadedFiles([]);
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
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={isPending || isSuccess}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(VehicleType).map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {type}
                      </SelectItem>
                    ))}
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

        {/* Colors Field */}
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter available colors (comma-separated)"
                  {...field}
                  disabled={isPending || isSuccess}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL Field */}
        <h1 className="text-sm">Image</h1>
        <div className="grid w-full items-center gap-1.5">
          {uploadedFiles.length > 0 ? (
            <div className=" space-y-4 mb-4">
              <span className="text-sm">
                No. of uploaded files:{" "}
                <span className=" font-bold">{uploadedFiles.length}</span>
              </span>
              <div className=" grid grid-cols-4 gap-4">
                {uploadedFiles.map((path, index) => (
                  <div
                    className="relative rounded-xl border border-primary"
                    key={index}
                  >
                    <Image
                      src={fileUrl + path}
                      width={100}
                      height={100}
                      alt="Rounded picture"
                      className="rounded-xl object-cover"
                    />
                    <button
                      className="absolute bottom-0 right-0 p-1 bg-red-500 rounded-full transform translate-x-1/4 translate-y-1/4"
                      aria-label="Delete"
                      type="button"
                      onClick={() => deleteFile(path)}
                    >
                      <Trash className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <Input
            onChange={handleFileOnchange}
            id="file"
            disabled={isUploading || isPending}
            type="file"
            accept="image/*"
          />
          {isUploading ? (
            <span className="text-xs flex items-center gap-1 ml-auto text-muted-foreground animate-pulse">
              <UploadCloudIcon />
              Uploading
            </span>
          ) : null}
        </div>

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
                    <SelectValue placeholder="Select Transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(TransmissionType).map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {type}
                      </SelectItem>
                    ))}
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

        {/* Is Available Field */}
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {field.value
                    ? "The car is available"
                    : "The car is not available"}
                </FormLabel>
                <FormDescription>
                  {field.value
                    ? "You can proceed with the booking."
                    : "Please check back later or choose another car."}
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || isSuccess}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
