"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { StatusSlice } from "@/features/Order/api/chartData";

const STATUS_COLORS: Record<string, string> = {
  Pending: "var(--chart-3)",
  Processing: "var(--chart-purple)",
  Shipped: "var(--chart-1)",
  Delivered: "var(--chart-2)",
  Cancelled: "var(--chart-4)",
};

export function OrderStatusBreakdown({ data }: { data: StatusSlice[] }) {
  const hasData = data.some((d) => d.count > 0);

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-base font-medium">Order status</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="status"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.status}
                    fill={STATUS_COLORS[entry.status] ?? "var(--chart-5)"}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--popover-foreground)",
                  fontSize: 13,
                }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 12, color: "var(--muted-foreground)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No orders yet
          </div>
        )}
      </CardContent>
    </Card>
  );
}