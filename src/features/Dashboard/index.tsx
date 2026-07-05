import { useEffect, useState } from "react";
import { useAuth } from "@/Context/Authcontext/AuthProvider";
import { getDashboardData, type DashboardData } from "./api/dashboardService";
import { checkStatus } from "@/features/product/api/getProducts";

import StatCard from "./components/StatCard";
import DashboardSkeleton from "./components/Dashboardskeleton";
import RevenueTrendChart from "./components/RevenueTrendChart";
import RecentOrdersTable from "./components/RecentOrdersTable";
import LowStockTable from "./components/LowStockTable";

import ReusableLineChart from "@/Components/chart/AreaChart";
import CustomPieChart from "@/Components/chart/PieChart";

export default function Dashboard() {
  const { user } = useAuth();

  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const DEFAULT_COLORS = [
  "var(--chart-blue)",
  "var(--chart-green)",
  "var(--chart-orange)",
  "var(--chart-red)",
  "var(--chart-purple)",
];

  const load = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const result = await getDashboardData(user.uid);

      setData(result);
    } catch (err) {
      console.error(err);
      setError("Couldn't load the dashboard. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <p className="text-sm font-medium text-danger">
          {error}
        </p>

        <button
          onClick={load}
          className="
            rounded-lg
            bg-primary
            px-5
            py-2.5
            text-sm
            font-medium
            text-primary-foreground
            transition-all
            hover:opacity-90
            active:scale-95
          "
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const lowStockProducts = data.productStatus.products.filter(
    (p: any) => checkStatus(Number(p.stock) || 0) !== "In Stock"
  );

  return (
    <div className="space-y-6 bg-background p-6 text-foreground">
      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Live overview of your store's performance
          </p>
        </div>

        <button
          onClick={load}
          className="
            rounded-xl
            border
            border-border
            bg-card
            px-4
            py-2
            text-sm
            font-medium
            text-muted-foreground
            shadow-sm
            transition-all
            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          Refresh
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          label="Total Revenue"
          value={`₹${data.totalRevenue.toLocaleString("en-IN")}`}
          icon="💰"
          tone="success"
          hint="From delivered orders"
        />

        <StatCard
          label="Total Orders"
          value={data.totalOrders}
          icon="🧾"
          tone="primary"
        />

        <StatCard
          label="Total Products"
          value={data.productStatus.totalProducts}
          icon="📦"
          tone="warning"
          hint={`${data.productStatus.lowStock} low on stock`}
        />

        <StatCard
          label="Total Customers"
          value={data.customerCount}
          icon="👥"
          tone="danger"
        />
      </div>
            {/* Charts Section */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trend */}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-card-foreground">
              Revenue Trend
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Revenue generated from delivered orders over the last six months.
            </p>
          </div>

          <RevenueTrendChart data={data.monthlyRevenue} />
        </div>

        {/* Products Added */}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-card-foreground">
              Products Added
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Monthly product additions.
            </p>
          </div>

          <ReusableLineChart
            data={data.productStatus.monthlyAnalytic}
          />
        </div>
      </div>

      {/* Pie Charts */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <CustomPieChart
          colors={DEFAULT_COLORS}
            title="Orders by Status"
            data={data.orderStatusSlices.map((status) => ({
              name: status.status,
              value: status.count,
            }))}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <CustomPieChart
            colors={DEFAULT_COLORS}
            title="Products by Category"
            data={data.productStatus.categories}
          />
        </div>

      </div>

      {/* Tables */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <RecentOrdersTable
            orders={data.recentOrders}
          />
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-sm">
          <LowStockTable
            products={lowStockProducts}
          />
        </div>

      </div>
    </div>
  );
}