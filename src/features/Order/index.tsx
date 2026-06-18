import Cards from "@/features/Order/components/Cards";
import OrderSummaryCard from "@/features/Order/components/OrderSummaryCard";
import { useState } from "react";
import type { OrderObject } from "@/features/Order/components/OrderListCard";
import { DataTable } from "@/Components/table/data-table";
import { getColumns } from "@/features/Order/components/columns";
import ReusablePieChart from "./components/PieChart";
import ReusableBarChart from "./components/Barchart";

export default function OrderPage() {
    const orders = [
        { orderId: "ORD-1001", customer: "John Doe", status: "Pending", total: 1250, date: "2026-06-05" },
        { orderId: "ORD-1002", customer: "Jane Smith", status: "Completed", total: 890, date: "2026-06-04" },
        { orderId: "ORD-1003", customer: "Michael Brown", status: "Cancelled", total: 450, date: "2026-06-03" },
        { orderId: "ORD-1004", customer: "Emily Davis", status: "Shipped", total: 2100, date: "2026-06-02" },
        { orderId: "ORD-1005", customer: "Sarah Lee", status: "Pending", total: 680, date: "2026-06-01" },
        { orderId: "ORD-1006", customer: "David Kim", status: "Completed", total: 1540, date: "2026-05-31" },
        { orderId: "ORD-1007", customer: "Rachel Green", status: "Shipped", total: 990, date: "2026-05-30" },
        { orderId: "ORD-1008", customer: "Tom Hanks", status: "Cancelled", total: 320, date: "2026-05-29" },
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

    const [showOrderSummary, setOrderSummary] = useState<OrderObject | null>(null);
    const [openSummary, setOpenSummary] = useState<boolean>(false);
    const column = getColumns(setOrderSummary, setOpenSummary);

    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* Top Bar */}
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

            {/* Slide-over Summary Panel */}
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

            {/* Backdrop */}
            {openSummary && (
                <div
                    className="fixed inset-0 z-40 bg-black/20"
                    onClick={() => setOpenSummary(false)}
                />
            )}
        </div>
    );
}