import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { motion } from "motion/react";

interface KemampuanLineChartProps {
  data: Record<string, number>;
}

interface ChartDataPoint {
  materi: string;
  nilai: number;
}

export function KemampuanLineChart({ data }: KemampuanLineChartProps) {
  const chartData: ChartDataPoint[] = Object.entries(data).map(([name, value]) => ({
    materi: name,
    nilai: value,
  }));

  const nilaiArray = chartData.map((d) => d.nilai);
  const rataRata =
    nilaiArray.length > 0
      ? (nilaiArray.reduce((a, b) => a + b, 0) / nilaiArray.length).toFixed(1)
      : "0";
  const tertinggi = nilaiArray.length > 0 ? Math.max(...nilaiArray) : 0;
  const terendah = nilaiArray.length > 0 ? Math.min(...nilaiArray) : 0;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; payload: ChartDataPoint }>;
  }) => {
    if (active && payload && payload.length) {
      const nilai = payload[0].value;
      const status = nilai >= 75 ? "Tuntas" : "Belum Tuntas";
      const statusColor = nilai >= 75 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)";

      return (
        <div className="rounded-xl border border-brand-gold bg-brand-dark/95 p-4 shadow-lg backdrop-blur-sm">
          <p className="text-sm font-semibold text-brand-cream mb-2">{payload[0].payload.materi}</p>
          <div className="space-y-1">
            <p className="text-xs text-brand-cream/80">
              Nilai: <span className="font-bold text-brand-light-gold">{nilai}</span>
            </p>
            <p className="text-xs text-brand-cream/80">
              Status:{" "}
              <span className="font-bold" style={{ color: statusColor }}>
                {status}
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-6 px-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">Rata-rata</p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{rataRata}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">Tertinggi</p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{tertinggi}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col"
        >
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">Terendah</p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{terendah}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full h-96"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <defs>
              <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(201, 149, 60)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(201, 149, 60)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-brand-tan"
              opacity={0.2}
              vertical={false}
            />

            <XAxis
              dataKey="materi"
              className="stroke-brand-cream"
              tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
              angle={-15}
              textAnchor="end"
              height={80}
            />

            <YAxis
              className="stroke-brand-cream"
              tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip content={<CustomTooltip />} />

            <ReferenceLine
              y={75}
              className="stroke-brand-light-gold"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: "Target Ketuntasan (75)",
                position: "right",
                fill: "oklch(0.89 0.17 70)",
                fontSize: 12,
              }}
            />

            <Area
              type="monotone"
              dataKey="nilai"
              stroke="none"
              fill="url(#colorNilai)"
              animationDuration={1000}
              animationBegin={0}
            />

            <Line
              type="monotone"
              dataKey="nilai"
              className="stroke-brand-gold"
              strokeWidth={3}
              dot={{
                fill: "rgb(201, 149, 60)",
                r: 6,
                strokeWidth: 2,
                stroke: "oklch(0.97 0.02 85)",
              }}
              activeDot={{
                r: 9,
                fill: "oklch(0.89 0.17 70)",
                stroke: "oklch(0.97 0.02 85)",
                strokeWidth: 2,
              }}
              animationDuration={1000}
              animationBegin={0}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
