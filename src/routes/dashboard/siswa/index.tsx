import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SiswaGrid } from "@/components/dashboard/SiswaGrid";

export const Route = createFileRoute("/dashboard/siswa/")({
  component: SiswaPage,
});

function SiswaPage() {
  return (
    <DashboardLayout
      title="Daftar Siswa"
      subtitle="Lihat daftar semua siswa dan pantau progress pembelajaran mereka."
    >
      <SiswaGrid />
    </DashboardLayout>
  );
}
