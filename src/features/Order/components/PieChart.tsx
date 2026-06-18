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
    height = "h-[280px]",
}: ReusablePieChartProps<T>) {
    return (
        <div className={`${width} ${height}`}>
            {title && (
                <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                    {title}
                </h3>
            )}
            <div className="h-full flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={String(valueKey)}
                            nameKey={String(nameKey)}
                            outerRadius={80}
                            innerRadius={45}
                            label={false}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                fontSize: 12,
                                borderRadius: 8,
                                border: "0.5px solid var(--border)",
                                background: "var(--card)",
                                color: "var(--card-foreground)",
                            }}
                        />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ fontSize: 12 }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}