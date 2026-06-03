import {
    Pie,
    PieChart,
    PieLabelRenderProps,
    PieSectorShapeProps,
    Sector,
    Tooltip,
} from "recharts";

type PieChartData = {
    name: string;
    value: number;
};

type CustomPieChartProps = {
    data: PieChartData[];
    colors?: string[];
    isAnimationActive?: boolean;
    title: string
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: PieLabelRenderProps) => {
    if (
        cx == null ||
        cy == null ||
        innerRadius == null ||
        outerRadius == null
    ) {
        return null;
    }

    const radius =
        innerRadius + (outerRadius - innerRadius) * 0.5;

    const x =
        Number(cx) +
        radius * Math.cos(-(midAngle ?? 0) * RADIAN);

    const y =
        Number(cy) +
        radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > Number(cx) ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${((percent ?? 0) * 100).toFixed(0)}%`}
        </text>
    );
};

export default function CustomPieChart({
    data,
    colors = [
        "#0088FE",
        "#00C49F",
        "#FFBB28",
        "#FF8042",
    ],
    isAnimationActive = true,
    title
}: CustomPieChartProps) {
    const MyCustomPie = (
        props: PieSectorShapeProps
    ) => (
        <Sector
            {...props}
            fill={colors[props.index % colors.length]}
        />
    );

    return (
        <div className="grid ">
            <h1 className=" text-center p-2 text-md-font">{title}</h1>
            <PieChart
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    aspectRatio: 1,
                }}
                responsive
            >
                <Pie
                    data={data}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    shape={MyCustomPie}
                    isAnimationActive={isAnimationActive}
                />

                <Tooltip />
            </PieChart>
        </div>
    );
}