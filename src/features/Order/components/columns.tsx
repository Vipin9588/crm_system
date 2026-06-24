"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export type Order = {
  orderID: string;
  customerID: string;
  userId: string;
  products: string[];
  total: string;
  status: string;
  createdAt: string;
  deliveryDate: string;
};

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-success";
    case "pending":
      return "text-warning";
    case "cancelled":
      return "text-danger";
    case "shipped":
      return "text-primary";
    default:
      return "text-gray-700";
  }
};

export const getColumns = (
  setOrderSummary: (order: Order) => void,
  setOpenSummary: (open: boolean) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "orderID",
    header: "Order ID",
  },
  {
    accessorKey: "customerID",
    header: "Customer",
    cell: ({ row }) => (
      <button
        className="hover:text-primary hover:underline"
        onClick={() => {
          setOrderSummary(row.original);
          setOpenSummary(true);
        }}
      >
        {row.original.customerID}
      </button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 text-xs font-medium ${getStatusClass(
          row.original.status
        )}`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(order.orderID)
              }
            >
              Copy Order ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];