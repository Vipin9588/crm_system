import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Customer } from "../types";
import { Button } from "../../../Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../Components/ui/dropdown-menu";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export const getColumns = (
  handleView: (customer: Customer) => void,
  handleEdit: (customer: Customer) => void,
  handleDelete: (customer: Customer) => void
): ColumnDef<Customer>[] => [
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <button
        className="hover:text-primary hover:underline"
        onClick={() => {
          handleView(row.original);
        }}
      >
        {row.original.name}
      </button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => formatDate(row.original.createdAt),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

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
              onClick={() => navigator.clipboard.writeText(customer.customerId)}
            >
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleView(customer)}>
              View Profile
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => handleEdit(customer)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleDelete(customer)}
              className="text-danger focus:text-danger"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];