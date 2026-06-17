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


