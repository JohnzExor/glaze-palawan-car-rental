import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { VehicleForm } from "./vehicle-form";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";

const AddVehicleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={clsx(buttonVariants())}>
        Add Vehicle
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add a New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new vehicle to the system. Please
            ensure all information is accurate before submitting.
          </DialogDescription>
        </DialogHeader>
        <VehicleForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddVehicleDialog;
