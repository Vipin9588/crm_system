"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

interface ReusablePieChartProps<T> {
  data: T[];
  title?: string;
  nameKey: keyof T;
  valueKey: keyof T;
  width?: string;
  height?: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

export default function ReusablePieChart<T extends Record<string, any>>({
  data,
  title,
  nameKey,
  valueKey,
  width = "w-full",
  height = "h-[300px]",
}: ReusablePieChartProps<T>) {
  return (
    <div className={`${width} ${height} rounded-lg border p-4 bg-card `}>
      {title && (
        <h3 className="mb-4 text-md font-semibold">
          {title}
        </h3>
      )}

      <div className="h-[90%] flex justify-center items-center p-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey={String(valueKey)}
              nameKey={String(nameKey)}
              outerRadius={70}
              innerRadius={40}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}