import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

export type OrderObject = {
  orderId: string;
  customer: string;
  status: string;
  total: number;
  date: string;
};

type Props = {
  orderList: OrderObject[];
  setOrderSummary: React.Dispatch<
    React.SetStateAction<OrderObject | null>
  >;
  setOpenSummary: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrderTable({
  orderList,
  setOrderSummary,
  setOpenSummary,
}: Props) {
  const columns = React.useMemo<ColumnDef<OrderObject>[]>(
    () => [
      {
        accessorKey: "orderId",
        header: "Order ID",
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
            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(
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
        cell: ({ row }) => `₹${row.original.total}`,
      },
      {
        accessorKey: "date",
        header: "Date",
      },
    ],
    [setOrderSummary, setOpenSummary]
  );

  const table = useReactTable({
    data: orderList,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No Orders Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}