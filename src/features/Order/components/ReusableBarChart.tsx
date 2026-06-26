"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

interface ReusableBarChartProps<T extends Record<string, any>> {
    data: T[];
    xKey: keyof T;
    barKey: keyof T;
    height?: number;
}

export default function ReusableBarChart<T extends Record<string, any>>({
    data,
    xKey,
    barKey,
    height = 280,
}: ReusableBarChartProps<T>) {
    return (
        <div className="w-full" style={{ height }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--border)"
                        strokeOpacity={0.5}
                    />
                    <XAxis
                        dataKey={xKey as string}
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            fontSize: 12,
                            borderRadius: 8,
                            border: "0.5px solid var(--border)",
                            background: "var(--card)",
                            color: "var(--card-foreground)",
                        }}
                        cursor={{ fill: "var(--muted)", opacity: 0.3 }}
                    />
                    <Bar
                        dataKey={barKey as string}
                        radius={[6, 6, 0, 0]}
                        fill="var(--chart-blue)"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
