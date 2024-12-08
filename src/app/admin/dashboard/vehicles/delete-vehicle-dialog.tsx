"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { Trash } from "lucide-react";

import React, { useState } from "react";
import { useServerAction } from "zsa-react";
import { deleteVehicleAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

const DeleteVehicleDialog = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { execute, isPending } = useServerAction(deleteVehicleAction);

  const handleDelete = async () => {
    try {
      const res = await execute({ id });
      if (res[1]) {
        toast({
          title: "Error deleting record",
          description: "It may still have active booking",
        });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={clsx(buttonVariants({ variant: "destructive" }))}
      >
        <Trash />
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            <Trash />
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteVehicleDialog;
