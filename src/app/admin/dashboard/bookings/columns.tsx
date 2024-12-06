"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "vehicleId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Vehicle ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(row.getValue("startDate")).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        End Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(row.getValue("endDate")).toLocaleDateString(),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Amount
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `$${(row.getValue("totalAmount") as number).toFixed(2)}`,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          View
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
