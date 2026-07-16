import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getMockUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { User, Lock } from "lucide-react";

export const Route = createFileRoute("/dashboard/profil")({
  component: ProfilPage,
});

function ProfilPage() {
  const user = getMockUser();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    nama: user?.nama || "",
    email: user?.email || "",
    sekolah: "SMPN 1 Surabaya",
    foto_profil: "",
  });

  const [passwordData, setPasswordData] = useState({
    password_lama: "",
    password_baru: "",
    konfirmasi_password: "",
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil berhasil diperbarui!");
    setIsEditingProfile(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.password_baru !== passwordData.konfirmasi_password) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }

    if (passwordData.password_baru.length < 8) {
      toast.error("Password baru minimal 8 karakter!");
      return;
    }

    toast.success("Password berhasil diubah!");
    setPasswordData({
      password_lama: "",
      password_baru: "",
      konfirmasi_password: "",
    });
    setIsChangingPassword(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DashboardLayout
      title="Profil Guru"
      subtitle="Kelola informasi pribadi dan keamanan akun Anda."
    >
      <div className="max-w-3xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-lg border border-brand-gold/30 bg-brand-dark/90 p-8 shadow-lg shadow-brand-gold/10 backdrop-blur-sm">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-2 border-brand-gold/40">
                <AvatarImage src={profileData.foto_profil} />
                <AvatarFallback className="bg-brand-gold text-brand-dark text-3xl font-bold font-display">
                  {getInitials(profileData.nama)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-brand-cream font-display mb-1">
                  {profileData.nama}
                </h2>
                <p className="text-brand-cream/70 mb-3">{profileData.email}</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="text-brand-cream/60">Guru • {profileData.sekolah}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-brand-gold/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-brand-gold" />
                <CardTitle>Informasi Pribadi</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="border-brand-gold/30"
              >
                {isEditingProfile ? "Batal" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input
                      id="nama"
                      value={profileData.nama}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, nama: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sekolah">Sekolah</Label>
                    <Input
                      id="sekolah"
                      value={profileData.sekolah}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, sekolah: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="foto_profil">URL Foto Profil (GitHub/jsDelivr)</Label>
                    <Input
                      id="foto_profil"
                      type="url"
                      placeholder="https://..."
                      value={profileData.foto_profil}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, foto_profil: e.target.value }))
                      }
                    />
                    <p className="text-xs text-brand-dark/50">
                      Upload foto ke GitHub repository Anda dan gunakan jsDelivr URL
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark"
                    >
                      Simpan Perubahan
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-brand-dark/60">Nama</p>
                    <p className="font-medium">{profileData.nama}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-brand-dark/60">Email</p>
                    <p className="font-medium">{profileData.email}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-brand-dark/60">Sekolah</p>
                    <p className="font-medium">{profileData.sekolah}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="border-brand-gold/30">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-brand-gold" />
                <CardTitle>Keamanan</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="border-brand-gold/30"
              >
                {isChangingPassword ? "Batal" : "Ubah Password"}
              </Button>
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password_lama">Password Lama</Label>
                    <Input
                      id="password_lama"
                      type="password"
                      value={passwordData.password_lama}
                      onChange={(e) =>
                        setPasswordData((prev) => ({ ...prev, password_lama: e.target.value }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password_baru">Password Baru</Label>
                    <Input
                      id="password_baru"
                      type="password"
                      value={passwordData.password_baru}
                      onChange={(e) =>
                        setPasswordData((prev) => ({ ...prev, password_baru: e.target.value }))
                      }
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-brand-dark/50">Minimal 8 karakter</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="konfirmasi_password">Konfirmasi Password Baru</Label>
                    <Input
                      id="konfirmasi_password"
                      type="password"
                      value={passwordData.konfirmasi_password}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          konfirmasi_password: e.target.value,
                        }))
                      }
                      required
                      minLength={8}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsChangingPassword(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-brand-gold hover:bg-brand-gold/80 text-brand-dark"
                    >
                      Ubah Password
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-sm text-brand-dark/60">
                  Klik "Ubah Password" untuk mengubah kata sandi Anda
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
