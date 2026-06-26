"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Order } from "@/features/Order/api/orderStatus";
export interface OrderObject {
  orderId: string;
  customer: string;
  date: string;
  status: string;
  total: number;
}

interface OrderListCardProps {
  orders: Order[];
  customerNameById?: Record<string, string>;
  selectedOrderId?: string | null;
  onSelect: (order: OrderObject) => void;
  loading?: boolean;
}

const STATUS_DOT: Record<string, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function toOrderObject(order: Order, customerName?: string): OrderObject {
  return {
    orderId: order.orderId,
    customer: customerName ?? order.customerId,
    date: formatDate(order.createdAt),
    status: order.status,
    total: order.total,
  };
}

export default function OrderListCard({
  orders,
  customerNameById = {},
  selectedOrderId,
  onSelect,
  loading = false,
}: OrderListCardProps) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const customerName = customerNameById[o.customerId] ?? o.customerId;
      const matchesQuery =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        customerName.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter, customerNameById]);

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="sticky top-0 z-10 flex flex-col gap-3 border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Orders</h2>
          <span className="text-sm text-muted-foreground">{filtered.length} of {orders.length}</span>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order ID or customer…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col gap-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-1 p-8 text-center">
            <p className="text-sm font-medium text-foreground">No orders found</p>
            <p className="text-xs text-muted-foreground">Try a different search or filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((order) => {
              const customerName = customerNameById[order.customerId] ?? order.customerId;
              const isSelected = order.orderId === selectedOrderId;
              return (
                <li key={order.orderId}>
                  <button
                    type="button"
                    onClick={() => onSelect(toOrderObject(order, customerName))}
                    className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${
                      isSelected ? "bg-accent" : "hover:bg-muted/50"
                    }`}
                  >
                    <span
                      className={`size-2 shrink-0 rounded-full ${
                        STATUS_DOT[order.status] ?? "bg-gray-400"
                      }`}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium text-foreground">{order.orderId}</span>
                        <span className="shrink-0 text-sm font-semibold text-foreground">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-xs text-muted-foreground">{customerName}</span>
                        <span className="shrink-0 text-xs capitalize text-muted-foreground">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
