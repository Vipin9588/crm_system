
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/Context/Authcontext/AuthProvider";
import orderStatus, { type OrderStatus, type OrderItem } from "@/features/Order/api/orderStatus";
import Cards from "@/features/Order/components/Cards";
import OrderListCard, { type OrderObject } from "@/features/Order/components/OrderListCard";
import OrderSummaryCard from "@/features/Order/components/OrderSummaryCard";
import ReusablePieChart from "@/features/Order/components/ReusablePieChart";
import ReusableBarChart from "@/features/Order/components/ReusableBarChart";
import { toStatusSlices, toMonthlyRevenue } from "@/features/Order/api/chartData";

const EMPTY_STATUS: OrderStatus = {
  pending: 0,
  processing: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
  totalOrders: 0,
  orders: [],
};

export default function OrdersDashboardPage() {
  const { user } = useAuth();

  const [status, setStatus] = useState<OrderStatus>(EMPTY_STATUS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<OrderObject | null>(null);

  const loadOrders = useCallback(async () => {
    if (!user?.uid) {
      setStatus(EMPTY_STATUS);
      setLoading(false);
      return;
    }
    setLoading(true);
    const result = await orderStatus(user.uid);
    setStatus(result);
    setLoading(false);
  }, [user?.uid]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const selectedItems: OrderItem[] =
    status.orders.find((o) => o.orderId === selected?.orderId)?.items ?? [];

  const statusSlices = toStatusSlices(status.orders);
  const monthlyRevenue = toMonthlyRevenue(status.orders, 6);

  if (!user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-8">
        <p className="text-sm text-muted-foreground">Sign in to view your orders dashboard.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col gap-6 bg-background p-4 sm:p-6">
      <Cards status={status} loading={loading} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-foreground">Orders by status</h3>
          {statusSlices.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No orders yet.
            </p>
          ) : (
            <ReusablePieChart
              data={statusSlices}
              nameKey="status"
              valueKey="count"
            />
          )}
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <h3 className="mb-2 text-sm font-semibold text-foreground">
            Revenue by month (delivered orders)
          </h3>
          <ReusableBarChart data={monthlyRevenue} xKey="month" barKey="revenue" />
        </div>
      </div>

      <div className="grid min-h-[600px] grid-cols-1 gap-4 overflow-hidden rounded-2xl border lg:grid-cols-[380px_1fr]">
        <div className="border-b lg:border-b-0 lg:border-r">
          <OrderListCard
            orders={status.orders}
            selectedOrderId={selected?.orderId ?? null}
            onSelect={setSelected}
            loading={loading}
          />
        </div>

        <OrderSummaryCard showSummary={selected} items={selectedItems} />
      </div>
    </div>
  );
}
