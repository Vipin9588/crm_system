import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
<<<<<<< HEAD
import { Button } from "@/components/ui/button";
=======
import { Button } from "../../../Components/ui/button";
>>>>>>> 72bc422 (fixing imports)
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../../Components/ui/dropdown-menu";
import type { productDatatype } from "../productStructer";

type ColumnActions = {
    onView: (product: productDatatype) => void;
    onEdit: (product: productDatatype) => void;
    onDelete: (product: productDatatype) => void;
}

export const getColumns = ({ onView, onEdit, onDelete }: ColumnActions): ColumnDef<productDatatype>[] => [
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const image = row.original.images?.[0];
            const imageSrc = typeof image === "string" ? image : image?.preview;

            return imageSrc ? (
                <img
                    src={imageSrc}
                    alt={row.original.name}
                    className="h-12 w-12 rounded-md object-cover"
                />
            ) : (
                <div className="h-12 w-12 rounded-md bg-muted" />
            );
        },
    },
    {
        accessorKey: "name",
        header: "Product Name",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "costPrice",
        header: "Cost",
    },
    {
        accessorKey: "salePrice",
        header: "Price",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;

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
                                navigator.clipboard.writeText(product.name)
                            }
                        >
                            Copy Name
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => {onEdit(product)

                        }}>
                            Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => onDelete(product)}>
                            Delete
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => {onView(product);
                            console.log("View details clicked for product:", product)
                        }}>
                            View Details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];