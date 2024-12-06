"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Feedback } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Feedback>[] = [
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
    accessorKey: "rating",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Rating
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("rating"),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="shadow-none"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Comment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.getValue("comment") ?? "No comment",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Edit
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
