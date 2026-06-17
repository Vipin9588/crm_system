"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
export type order = {
    orderId: string,
    customer: string,
    status: string,
    total: number,
    date: string,
}


const getStatusClass = (status: string) => {
    switch (status) {
        case "Completed":
            return " text-success";
        case "Pending":
            return " text-warning";
        case "Cancelled":
            return " text-danger";
        case "Shipped":
            return "text-primary";
        default:
            return "text-gray-700";
    }
};


export const getColumns = (
    setOrderSummary: (order: order) => void,
    setOpenSummary: (open: boolean) => void
): ColumnDef<order>[] => [

        {
            accessorKey: "orderId",
            header: "Order ID"
        },
        {
            accessorKey: "customer",
            header: "Customer",
            cell: ({ row }) => (
                <button
                    className="hover:text-primary hover:underline"
                    onClick={() => {
                        setOrderSummary(row.original);
                        setOpenSummary(true);
                    }}
                >
                    {row.original.customer}
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
            header: "Total"
        }
        ,

        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(order.orderId)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>View</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },

    ]