import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export type MonthlyDatum = {
  month: string;
  productsAdded: number;
};

type ProductsAddedChartProps = {
  data: MonthlyDatum[];
};

export default function ReusableLineChart({
  data,
}: ProductsAddedChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          left: 0,
          bottom: 8,
        }}
      >
        <CartesianGrid
          strokeDasharray="2 2"
          vertical={false}
          stroke="#e5e7eb"
        />

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280" }}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: "#6b7280" }}
          width={40}
        />

        <Tooltip
          cursor={{
            stroke: "#3b82f6",
            strokeDasharray: "4 4",
          }}
          contentStyle={{
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            fontSize: "13px",
          }}
       formatter={(value) => [
  String(value ?? 0),
  "Products Added",
]}
        />

        <Line
          type="monotone"
          dataKey="productsAdded"
          name="Products Added"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{
            r: 4,
            fill: "#3b82f6",
            strokeWidth: 0,
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}