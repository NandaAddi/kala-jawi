import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DistribusiNilaiData {
  range: string;
  jumlah: number;
}

interface DistribusiNilaiChartProps {
  data: DistribusiNilaiData[];
}

export function DistribusiNilaiChart({ data }: DistribusiNilaiChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9b482" opacity={0.3} />
          <XAxis dataKey="range" stroke="#4a2c1a" tick={{ fill: "#4a2c1a" }} />
          <YAxis stroke="#4a2c1a" tick={{ fill: "#4a2c1a" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fdf4e3",
              border: "1px solid #c9953c",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="jumlah" fill="#c9953c" name="Jumlah Siswa" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
