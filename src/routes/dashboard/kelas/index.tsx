import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KelasGrid } from "@/components/dashboard/KelasGrid";

export const Route = createFileRoute("/dashboard/kelas/")({
  component: KelasPage,
});

function KelasPage() {
  return (
    <DashboardLayout title="Kelas" subtitle="Kelola kelas dan lihat daftar siswa di setiap kelas.">
      <KelasGrid />
    </DashboardLayout>
  );
}
