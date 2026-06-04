import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

type SeriesConfig = {
    dataKey: string;
    color: string;
};

type ReusableAreaChartProps<T> = {
    title?: string;
    data: T[];
    xKey: keyof T;
    series: SeriesConfig[];
    showGrid?: boolean;
};

export function ReusableAreaChart<
    T extends Record<string, unknown>
>({
    title,
    data,
    xKey,
    series,
    showGrid = true,
}: ReusableAreaChartProps<T>) {
    return (
        <div className="w-full">
            {title && (
                <h2 className="mb-4 text-center text-lg font-medium">
                    {title}
                </h2>
            )}

            <ResponsiveContainer
                width="100%"
                height={400}
            >
                <AreaChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    {showGrid && (
                        <CartesianGrid strokeDasharray="3 3" />
                    )}

                    <XAxis dataKey={String(xKey)} />

                    <YAxis width="auto" />

                    <Tooltip />

                    {series.map((item) => (
                        <Area
                            key={item.dataKey}
                            type="monotone"
                            dataKey={item.dataKey}
                            stroke={item.color}
                            fill={item.color}
                            fillOpacity={0.3}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}