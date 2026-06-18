import {
  Pie,
  PieChart,
  PieLabelRenderProps,
  PieSectorShapeProps,
  ResponsiveContainer,
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
  title: string;
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
  if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
    return null;
  }

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = Number(cx) + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = Number(cy) + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={12}
      fontWeight={600}
      textAnchor={x > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 0) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CustomPieChart({
  data,
  colors = ["var(--chart-blue)", "var(--chart-teal)", "var(--chart-amber)", "var(--chart-coral)"],
  isAnimationActive = true,
  title,
}: CustomPieChartProps) {
  const MyCustomPie = (props: PieSectorShapeProps & { index?: number }) => (
    <Sector {...props} fill={colors[(props.index ?? 0) % colors.length]} />
  );

  return (
    <div style={{ display: "grid", gap: 4 }}>
      <h3
        style={{
          textAlign: "center",
          padding: "4px 0",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--ink-secondary)",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={90}
            label={renderCustomizedLabel}
            labelLine={false}
            shape={MyCustomPie}
            isAnimationActive={isAnimationActive}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface-card)",
              border: "1px solid var(--line-soft)",
              borderRadius: 10,
              boxShadow: "var(--shadow-card)",
              fontSize: 13,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", padding: 0, margin: 0, listStyle: "none" }}>
        {data.map((entry, i) => (
          <li key={entry.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "var(--ink-secondary)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: colors[i % colors.length] }} />
            {entry.name}
          </li>
        ))}
      </ul>
    </div>
  );
}