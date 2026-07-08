
import { useEffect, useState } from "react";
import { useAuth } from "@/Context/Authcontext/AuthProvider"; 
import { getSalesData, type SalesData } from "./api/getSalesData";
import { SalesStatsGrid } from "./components/SalesStatsGrid";
import { RevenueTrendChart } from "./components/RevenueTrendChart";
import { OrderStatusBreakdown } from "./components/OrderStatusBreakdown";
import { TopProductsCard } from "./components/TopProductsCard";
import { RecentOrdersTable } from "./components/RecentOrdersTable";
import { SalesPageSkeleton } from "./components/SalesPageSkeleton";

export default function SalesPage() {
  const { user } = useAuth();
  const [data, setData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    let active = true;
    setLoading(true);

    getSalesData(user.uid).then((result) => {
      if (active) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [user?.uid]);

  if (loading || !data) {
    return (
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Sales</h1>
          <p className="text-sm text-muted-foreground">
            Revenue and order performance overview.
          </p>
        </div>
        <SalesPageSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground">
          Revenue and order performance overview.
        </p>
      </div>

      <SalesStatsGrid data={data} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueTrendChart data={data.monthlyRevenue} />
        </div>
        <OrderStatusBreakdown data={data.orderStatusSlices} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={data.recentOrders} />
        </div>
        <TopProductsCard products={data.topProducts} />
      </div>
    </div>
  );
}