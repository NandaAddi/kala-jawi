import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

interface KemampuanRadarChartProps {
  data: Record<string, number>;
}

export function KemampuanRadarChart({ data }: KemampuanRadarChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#d9b482" opacity={0.3} />
          <PolarAngleAxis
            dataKey="name"
            stroke="#4a2c1a"
            tick={{ fill: "#4a2c1a", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            stroke="#4a2c1a"
            tick={{ fill: "#4a2c1a" }}
          />
          <Radar
            name="Kemampuan"
            dataKey="value"
            stroke="#c9953c"
            fill="#c9953c"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
