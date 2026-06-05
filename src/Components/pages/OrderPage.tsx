import OrderHeader from "@/features/Order/OrderHeader";
import OrderListCard from "@/features/Order/OrderListCard";
import OrderSummaryCard from "@/features/Order/OrderSummaryCard";
import { useState } from "react";
import type { OrderObject } from "@/features/Order/OrderListCard";
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

    const [showOrderSummary, setOrderSummary] = useState<OrderObject | null>(null);

    return (
        <div>
            <div className="flex w-full justify-between items-center p-2">
                <h1 className="text-lg-font">Order</h1>
                <div className="text-md-font flex gap-2 ">
                    <button className="p-4 border">Add Order</button>
                    <button className="p-4 border"> Add Contact</button>
                </div>
            </div>

            <OrderHeader />
            <div className="border-2 border-green-400 flex  overflow-x-scroll">
                <div className="border border-orange-500 min-w-full">
                    <OrderListCard orderList={orders} setOrderSummary={setOrderSummary} />
                </div>
                <div className="border border-pink-400 min-w-[500px] bg-red-400">
                    <OrderSummaryCard showSummary={showOrderSummary} />
                </div>
            </div>
        </div>
    )
}

// https://webflow.com/templates/search-v2?q=dashboard