import Cards from "@/features/Order/components/Cards";
import OrderSummaryCard from "@/features/Order/components/OrderSummaryCard";
import { useState } from "react";
import { Order } from "@/features/Order/components/columns";
import { DataTable } from "@/Components/table/data-table";
import { getColumns } from "@/features/Order/components/columns";
import ReusablePieChart from "./components/PieChart";
import ReusableBarChart from "./components/Barchart";

export default function OrderPage() {
  const orders = [
  {
    orderID: "ORD001",
    customerID: "CUS001",
    userId: "gdhsghgdhsgh",
    products: ["223565", "dfgd2323d"],
    total: "7699",
    status: "pending",
    createdAt: "2026-06-24",
    deliveryDate: "2026-06-28",
  },
  {
    orderID: "ORD002",
    customerID: "CUS002",
    userId: "gdhsghgdhsgh",
    products: ["ewe2323", "ewerwer3r23"],
    total: "70000",
    status: "processing",
    createdAt: "2026-06-24",
    deliveryDate: "2026-06-30",
  },
  {
    orderID: "ORD003",
    customerID: "CUS003",
    userId: "gdhsghgdhsgh",
    products: ["1782240027177"],
    total: "6000",
    status: "shipped",
    createdAt: "2026-06-23",
    deliveryDate: "2026-06-27",
  },
  {
    orderID: "ORD004",
    customerID: "CUS004",
    userId: "gdhsghgdhsgh",
    products: ["sdfsewe322ddf"],
    total: "8500",
    status: "delivered",
    createdAt: "2026-06-20",
    deliveryDate: "2026-06-25",
  },
  {
    orderID: "ORD005",
    customerID: "CUS005",
    userId: "gdhsghgdhsgh",
    products: ["223565", "sdfsewe322ddf", "dfgd2323d"],
    total: "16199",
    status: "cancelled",
    createdAt: "2026-06-22",
    deliveryDate: "2026-06-29",
  },
  {
    orderID: "ORD006",
    customerID: "CUS006",
    userId: "gdhsghgdhsgh",
    products: ["ewerwer3r23", "1782240027177"],
    total: "11000",
    status: "pending",
    createdAt: "2026-06-24",
    deliveryDate: "2026-06-30",
  },
  {
    orderID: "ORD007",
    customerID: "CUS007",
    userId: "gdhsghgdhsgh",
    products: ["223565"],
    total: "699",
    status: "delivered",
    createdAt: "2026-06-18",
    deliveryDate: "2026-06-22",
  },
  {
    orderID: "ORD008",
    customerID: "CUS008",
    userId: "gdhsghgdhsgh",
    products: ["dfgd2323d", "223565"],
    total: "7699",
    status: "processing",
    createdAt: "2026-06-24",
    deliveryDate: "2026-06-29",
  },
  {
    orderID: "ORD009",
    customerID: "CUS009",
    userId: "gdhsghgdhsgh",
    products: ["ewe2323"],
    total: "65000",
    status: "pending",
    createdAt: "2026-06-24",
    deliveryDate: "2026-07-01",
  },
  {
    orderID: "ORD010",
    customerID: "CUS010",
    userId: "gdhsghgdhsgh",
    products: ["223565", "1782240027177", "sdfsewe322ddf"],
    total: "15199",
    status: "shipped",
    createdAt: "2026-06-24",
    deliveryDate: "2026-06-30",
  },
];
    const pieData = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 200 },
        { name: "Group D", value: 100 },
    ];

    const barData = [
        { month: "Jan", orders: 120 },
        { month: "Feb", orders: 145 },
        { month: "Mar", orders: 180 },
        { month: "Apr", orders: 165 },
        { month: "May", orders: 210 },
        { month: "Jun", orders: 195 },
        { month: "Jul", orders: 240 },
        { month: "Aug", orders: 225 },
        { month: "Sep", orders: 260 },
        { month: "Oct", orders: 280 },
        { month: "Nov", orders: 310 },
        { month: "Dec", orders: 350 },
    ];

    const [showOrderSummary, setOrderSummary] = useState<Order | null>(null);
    const [openSummary, setOpenSummary] = useState<boolean>(false)       ;
    const column = getColumns(setOrderSummary, setOpenSummary);
  
   

    return (
        <div className="flex flex-col w-full min-h-screen">
            <div className="flex w-full justify-between items-center flex-wrap gap-2 px-4 py-3 border-b border-border">
                <h1 className="text-xl font-semibold">Orders</h1>
                <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                        Add Order
                    </button>
                    <button className="px-4 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors">
                        Add Contact
                    </button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="px-4 pt-4">
                <Cards />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4">
                <div className="border border-border rounded-xl bg-card p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Orders by group</h3>
                    <ReusablePieChart
                        title=""
                        data={pieData}
                        nameKey="name"
                        valueKey="value"
                        width="w-full"
                        height="h-[280px]"
                    />
                </div>
                <div className="border border-border rounded-xl bg-card p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Monthly orders</h3>
                    <ReusableBarChart
                        data={barData}
                        xKey="month"
                        barKey="orders"
                        height={280}
                    />
                </div>
            </div>

            <hr className="mx-4 border-border" />

            {/* Orders Table */}
            <div className="px-4 py-4">
                <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
                    <h2 className="text-sm font-medium">Recent orders</h2>
                </div>
                <DataTable columns={column} data={orders} />
            </div>

            <div
                className={`overflow-hidden h-full fixed top-0 right-0 z-50 transition-all duration-300 bg-background shadow-lg w-80
                    ${openSummary ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                    <span className="text-sm font-medium">Order summary</span>
                    <button
                        onClick={() => setOpenSummary(false)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Close
                    </button>
                </div>
                {showOrderSummary && (
                    <OrderSummaryCard showSummary={showOrderSummary} />
                )}
            </div>

            {openSummary && (
                <div
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={() => setOpenSummary(false)}
                />
            )}
        </div>
    );
}