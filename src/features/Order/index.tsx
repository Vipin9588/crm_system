import Cards from "@/features/Order/components/Cards";
import OrderSummaryCard from "@/features/Order/components/OrderSummaryCard";
import { useState } from "react";
import type { OrderObject } from "@/features/Order/components/OrderListCard";
import { DataTable } from "@/Components/table/data-table";
import { getColumns } from "@/features/Order/components/columns";
import { BarChart } from "lucide-react";
import ReusablePieChart from "./components/PieChart";
export default function OrderPage() {
    const orders = [
        {
            orderId: "ORD-1001",
            customer: "John Doe",
            status: "Pending",
            total: 1250,
            date: "2026-06-05",
        },
        {
            orderId: "ORD-1002",
            customer: "Jane Smith",
            status: "Completed",
            total: 890,
            date: "2026-06-04",
        },
        {
            orderId: "ORD-1003",
            customer: "Michael Brown",
            status: "Cancelled",
            total: 450,
            date: "2026-06-03",
        },
        {
            orderId: "ORD-1004",
            customer: "Emily Davis",
            status: "Shipped",
            total: 2100,
            date: "2026-06-02",
        },

        {
            orderId: "ORD-1001",
            customer: "John Doe",
            status: "Pending",
            total: 1250,
            date: "2026-06-05",
        },
        {
            orderId: "ORD-1002",
            customer: "Jane Smith",
            status: "Completed",
            total: 890,
            date: "2026-06-04",
        },
        {
            orderId: "ORD-1003",
            customer: "Michael Brown",
            status: "Cancelled",
            total: 450,
            date: "2026-06-03",
        },
        {
            orderId: "ORD-1004",
            customer: "Emily Davis",
            status: "Shipped",
            total: 2100,
            date: "2026-06-02",
        },
        {
            orderId: "ORD-1001",
            customer: "John Doe",
            status: "Pending",
            total: 1250,
            date: "2026-06-05",
        },
        {
            orderId: "ORD-1002",
            customer: "Jane Smith",
            status: "Completed",
            total: 890,
            date: "2026-06-04",
        },
        {
            orderId: "ORD-1003",
            customer: "Michael Brown",
            status: "Cancelled",
            total: 450,
            date: "2026-06-03",
        },
        {
            orderId: "ORD-1004",
            customer: "Emily Davis",
            status: "Shipped",
            total: 2100,
            date: "2026-06-02",
        },
    ];

    const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 200 },
  { name: "Group D", value: 100 },
];

    const [showOrderSummary, setOrderSummary] = useState<OrderObject | null>(
        null,
    );
    const [openSummary, setOpenSummary] = useState<boolean>(false);
    const column = getColumns(setOrderSummary, setOpenSummary)
    return (
        <>
            <div className="flex w-full justify-between flex-wrap items-center gap-2  p-2">
                <h1 className="text-xl sm:text-lg-font">Order</h1>
                <div className="text-sm-font sm:text-md-font flex flex-wrap gap-2 ">
                    <button className="p-1.5 sm:p-3 border">Add Order</button>
                    <button className="p-1.5 sm:p-3 border"> Add Contact</button>
                </div>
            </div>

            <div className="grid grid ">
                <Cards /> 
                
                  <div className="p-4">
                    <ReusablePieChart
  title="Orders By Group"
  data={data}
  nameKey="name"
  valueKey="value"
  width="w-[45%]"
 
/>
                  </div>
              
            </div>
            <hr  className="p-4"/>
            <div className="flex mt-1 overflow-hidden sm:ml-4 sm:mr-4">
                <div
                    className={`p-2 w-full `}
                >
                    
                    <DataTable columns={column} data={orders} />

                </div>

                <div
                    className={` overflow-hidden h-full fixed top-0 right-0 transition-all duration-300
          ${openSummary ? "translate-x-0" : "translate-x-full"}
    `}
                >
                    <button onClick={() => setOpenSummary((prev) => !prev)}>close</button>
                    {showOrderSummary && (
                        <OrderSummaryCard showSummary={showOrderSummary} />
                    )}
                </div>
            </div>
        </>
    );
}

