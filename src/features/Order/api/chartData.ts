import type { Order } from "@/services/orderStatus";

export interface StatusSlice {
  status: string;
  count: number;
}

export interface MonthRevenue {
  month: string;
  revenue: number;
}

const STATUS_LABELS: Record<Order["status"], string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

/** One slice per status, only including statuses that actually have orders. */
export function toStatusSlices(orders: Order[]): StatusSlice[] {
  const counts: Record<string, number> = {};
  for (const o of orders) {
    counts[o.status] = (counts[o.status] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([status, count]) => ({ status: STATUS_LABELS[status as Order["status"]] ?? status, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Revenue from delivered orders, grouped by month, for the last `monthsBack` months
 * (including the current month), oldest first.
 */
export function toMonthlyRevenue(orders: Order[], monthsBack = 6): MonthRevenue[] {
  const now = new Date();
  const buckets: MonthRevenue[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({
      month: d.toLocaleDateString("en-IN", { month: "short" }),
      revenue: 0,
    });
  }

  const startOfWindow = new Date(now.getFullYear(), now.getMonth() - (monthsBack - 1), 1);

  for (const o of orders) {
    if (o.status !== "delivered") continue;
    const d = new Date(o.createdAt);
    if (Number.isNaN(d.getTime()) || d < startOfWindow) continue;

    const offset =
      (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    const idx = monthsBack - 1 - offset;
    if (idx >= 0 && idx < buckets.length) {
      buckets[idx].revenue += o.total ?? 0;
    }
  }

  return buckets;
}
