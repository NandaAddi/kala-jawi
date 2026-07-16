import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { motion } from "motion/react";

interface DistribusiNilaiData {
  range: string;
  jumlah: number;
}

interface DistribusiNilaiChartProps {
  data: DistribusiNilaiData[];
}

const rangeColors = {
  "0-50": { bg: "rgb(239, 68, 68)", label: "bg-red-500" },
  "51-60": { bg: "rgb(249, 115, 22)", label: "bg-orange-500" },
  "61-70": { bg: "rgb(234, 179, 8)", label: "bg-yellow-500" },
  "71-80": { bg: "rgb(132, 204, 22)", label: "bg-lime-500" },
  "81-90": { bg: "rgb(34, 197, 94)", label: "bg-green-500" },
  "91-100": { bg: "rgb(22, 163, 74)", label: "bg-green-600" },
};

const getBarColor = (range: string): string => {
  return rangeColors[range as keyof typeof rangeColors]?.bg || "rgb(201, 149, 60)";
};

const getBarGradientId = (range: string): string => {
  return `gradient-${range.replace("-", "")}`;
};

export function DistribusiNilaiChart({ data }: DistribusiNilaiChartProps) {
  const totalSiswa = data.reduce((sum, item) => sum + item.jumlah, 0);

  const siswaLulus = data
    .filter((item) => ["71-80", "81-90", "91-100"].includes(item.range))
    .reduce((sum, item) => sum + item.jumlah, 0);

  const tingkatKelulusan = totalSiswa > 0 ? ((siswaLulus / totalSiswa) * 100).toFixed(1) : "0";

  const sortedData = [...data].sort((a, b) => b.jumlah - a.jumlah);
  const rataRataRange = sortedData.length > 0 ? sortedData[0].range : "-";

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: DistribusiNilaiData }>;
  }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      const percentage = totalSiswa > 0 ? ((item.jumlah / totalSiswa) * 100).toFixed(1) : "0";

      return (
        <div className="rounded-lg border border-brand-gold bg-brand-dark/95 p-4 shadow-lg backdrop-blur-sm">
          <p className="text-sm font-semibold text-brand-cream mb-2">Rentang Nilai: {item.range}</p>
          <div className="space-y-1">
            <p className="text-xs text-brand-cream/80">
              Jumlah: <span className="font-bold text-brand-light-gold">{item.jumlah} siswa</span>
            </p>
            <p className="text-xs text-brand-cream/80">
              Persentase: <span className="font-bold text-brand-light-gold">{percentage}%</span>
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
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">Total Siswa</p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{totalSiswa}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">
            Distribusi Terbanyak
          </p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{rataRataRange}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col"
        >
          <p className="text-xs text-brand-cream/60 uppercase tracking-wider">Tingkat Kelulusan</p>
          <p className="text-2xl font-bold text-brand-light-gold mt-1">{tingkatKelulusan}%</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full h-96"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap="15%"
          >
            <defs>
              {data.map((item) => {
                const color = getBarColor(item.range);
                const gradientId = getBarGradientId(item.range);
                return (
                  <linearGradient key={gradientId} id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                );
              })}
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-brand-tan"
              opacity={0.2}
              vertical={false}
            />

            <XAxis
              dataKey="range"
              className="stroke-brand-cream"
              tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
              tickLine={{ stroke: "oklch(0.97 0.02 85)" }}
            />

            <YAxis
              className="stroke-brand-cream"
              tick={{ fill: "oklch(0.97 0.02 85)", fontSize: 14 }}
              tickLine={{ stroke: "oklch(0.97 0.02 85)" }}
              label={{
                value: "Jumlah Siswa",
                angle: -90,
                position: "insideLeft",
                fill: "oklch(0.97 0.02 85)",
                fontSize: 14,
              }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201, 149, 60, 0.1)" }} />

            <Bar dataKey="jumlah" radius={[12, 12, 0, 0]} animationDuration={800}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${getBarGradientId(entry.range)})`}
                  stroke={getBarColor(entry.range)}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="flex items-center gap-2 px-2">
        <div className="flex items-center gap-2 text-xs text-brand-cream/70">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span>0-50</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-orange-500" />
            <span>51-60</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-yellow-500" />
            <span>61-70</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-lime-500" />
            <span>71-80</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <span>81-90</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-green-600" />
            <span>91-100</span>
          </div>
        </div>
        <div className="ml-auto text-xs text-brand-cream/60">
          <span className="font-semibold text-brand-light-gold">71+</span> = Zona Kelulusan
        </div>
      </div>
    </div>
  );
}
