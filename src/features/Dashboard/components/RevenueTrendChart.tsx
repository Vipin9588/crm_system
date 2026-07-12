import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import type { MonthRevenue } from "../../Order/api/chartData";

type Props = {
  data: MonthRevenue[];
};

type ChartTheme = {
  primary: string;
  border: string;
  muted: string;
  card: string;
};

export default function RevenueTrendChart({ data }: Props) {
  const [theme, setTheme] = useState<ChartTheme>({
    primary: "#3b82f6",
    border: "#e5e7eb",
    muted: "#64748b",
    card: "#ffffff",
  });

  useEffect(() => {
    const css = getComputedStyle(document.documentElement);

    setTheme({
      primary:
        css.getPropertyValue("--chart-blue").trim() ||
        css.getPropertyValue("--primary").trim(),

      border: css.getPropertyValue("--border").trim(),

      muted: css.getPropertyValue("--muted-foreground").trim(),

      card: css.getPropertyValue("--card").trim(),
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          left: 0,
          bottom: 8,
        }}
      >
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={theme.primary}
              stopOpacity={0.35}
            />

            <stop
              offset="100%"
              stopColor={theme.primary}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <CartesianGrid
          vertical={false}
          stroke={theme.border}
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{
            fill: theme.muted,
            fontSize: 12,
          }}
        />

        <YAxis
          width={60}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: theme.muted,
            fontSize: 12,
          }}
          tickFormatter={(value) =>
            `₹${Number(value).toLocaleString("en-IN")}`
          }
        />

        <Tooltip
          cursor={{
            stroke: theme.primary,
            strokeDasharray: "4 4",
          }}
          contentStyle={{
            backgroundColor: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(0,0,0,.08)",
          }}
          formatter={(value) => [
            `₹${Number(value).toLocaleString("en-IN")}`,
            "Revenue",
          ]}
        />

        <Area
          type="monotone"
          dataKey="revenue"
          stroke={theme.primary}
          strokeWidth={3}
          fill="url(#revenueFill)"
          dot={{
            r: 4,
            fill: theme.primary,
            strokeWidth: 0,
          }}
          activeDot={{
            r: 7,
            fill: theme.primary,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}