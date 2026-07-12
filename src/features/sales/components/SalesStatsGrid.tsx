import { IndianRupee, TrendingUp, TrendingDown, Wallet,Package  } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { formatCurrency } from "../utils/format";
import type { SalesData } from "../api/getSalesData";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
}

function StatCard({ label, value, icon, trend }: StatCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  return (
    <Card className="border-border">
      <CardContent className="flex items-start justify-between p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {trend !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                isPositive ? "text-success" : "text-danger"
              }`}
            >
              {isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{Math.abs(trend).toFixed(1)}% vs last month</span>
            </div>
          )}
        </div>
        <div className="rounded-xl bg-accent p-2.5 text-accent-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

export function SalesStatsGrid({ data }: { data: SalesData }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Total Revenue"
        value={formatCurrency(data.totalRevenue)}
        icon={<IndianRupee className="h-5 w-5" />}
        trend={data.revenueGrowth}
      />
      <StatCard
        label="Total Orders"
        value={data.totalOrders.toLocaleString("en-IN")}
        icon={<Package   className="h-5 w-5" />}
      />
      <StatCard
        label="Avg. Order Value"
        value={formatCurrency(data.avgOrderValue)}
        icon={<Wallet className="h-5 w-5" />}
      />
      <StatCard
        label="Delivered Orders"
        value={data.recentOrders
          .filter((o) => o.status === "delivered")
          .length.toLocaleString("en-IN")}
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  );
}