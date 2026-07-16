import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getSiswaList, getKelasList } from "@/lib/api/dashboard";
import { getMockUser } from "@/lib/auth";
import type { Siswa } from "@/types/dashboard";

type SortField = "nama" | "progress_persen" | "nilai_rata";
type SortOrder = "asc" | "desc";

export function SiswaTable() {
  const [search, setSearch] = useState("");
  const [selectedKelas, setSelectedKelas] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("nama");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const user = getMockUser();

  const { data: kelasList } = useQuery({
    queryKey: ["kelas", user?.id],
    queryFn: () => getKelasList(user?.id || ""),
  });

  const { data: siswaList, isLoading } = useQuery({
    queryKey: ["siswa", selectedKelas === "all" ? undefined : selectedKelas],
    queryFn: () => getSiswaList(selectedKelas === "all" ? undefined : selectedKelas),
  });

  const filteredAndSortedSiswa = siswaList
    ?.filter((siswa) => siswa.nama.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const modifier = sortOrder === "asc" ? 1 : -1;

      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal) * modifier;
      }

      return ((aVal as number) - (bVal as number)) * modifier;
    });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-dark/40 w-4 h-4" />
          <Input
            placeholder="Cari siswa berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedKelas} onValueChange={setSelectedKelas}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Pilih Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelas</SelectItem>
            {kelasList?.map((kelas) => (
              <SelectItem key={kelas.id} value={kelas.id}>
                {kelas.nama_kelas}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border border-brand-gold/20">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => toggleSort("nama")}
                  className="flex items-center gap-1 hover:text-brand-gold"
                >
                  Nama
                  {sortField === "nama" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("progress_persen")}
                  className="flex items-center gap-1 hover:text-brand-gold"
                >
                  Progress
                  {sortField === "progress_persen" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort("nilai_rata")}
                  className="flex items-center gap-1 hover:text-brand-gold"
                >
                  Nilai Rata-rata
                  {sortField === "nilai_rata" && (sortOrder === "asc" ? " ↑" : " ↓")}
                </button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedSiswa && filteredAndSortedSiswa.length > 0 ? (
              filteredAndSortedSiswa.map((siswa) => (
                <TableRow key={siswa.id}>
                  <TableCell className="font-medium">{siswa.nama}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={siswa.progress_persen} className="w-24" />
                      <span className="text-sm text-brand-dark/60">{siswa.progress_persen}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-brand-gold">{siswa.nilai_rata}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={siswa.status === "Aktif" ? "default" : "secondary"}
                      className={
                        siswa.status === "Aktif"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {siswa.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to="/dashboard/siswa/$siswaId" params={{ siswaId: siswa.id }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-gold hover:text-brand-gold/80"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-brand-dark/50 py-8">
                  {search
                    ? "Tidak ada siswa yang sesuai dengan pencarian."
                    : "Belum ada siswa di kelas ini."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedSiswa && filteredAndSortedSiswa.length > 0 && (
        <div className="text-sm text-brand-dark/60">
          Menampilkan {filteredAndSortedSiswa.length} dari {siswaList?.length} siswa
        </div>
      )}
    </div>
  );
}
