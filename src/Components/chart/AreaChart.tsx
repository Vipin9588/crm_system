import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const monthlyProductsAdded = [
  {
    month: "Jan",
    productsAdded: 18,
  },
  {
    month: "Feb",
    productsAdded: 24,
  },
  {
    month: "Mar",
    productsAdded: 31,
  },
  {
    month: "Apr",
    productsAdded: 27,
  },
  {
    month: "May",
    productsAdded: 42,
  },
  {
    month: "Jun",
    productsAdded: 38,
  },
  {
    month: "Jul",
    productsAdded: 46,
  },
  {
    month: "Aug",
    productsAdded: 53,
  },
  {
    month: "Sep",
    productsAdded: 49,
  },
  {
    month: "Oct",
    productsAdded: 61,
  },
  {
    month: "Nov",
    productsAdded: 58,
  },
  {
    month: "Dec",
    productsAdded: 72,
  },
];

export default function ReusableLineChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={monthlyProductsAdded}>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
        />

        <Tooltip />

        <Legend />

        <Line
          type="linear"
          dataKey="productsAdded"
          stroke="var(--chart-blue)"
          strokeWidth={5}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}