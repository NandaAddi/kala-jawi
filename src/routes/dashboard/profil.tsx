import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getMockUser } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Check, X, Eye, EyeOff, Settings, Grid3X3, Shield, User } from "lucide-react";

export const Route = createFileRoute("/dashboard/profil")({
  component: ProfilPage,
});

interface EditState {
  field: string | null;
  value: string;
}

interface ProfileData {
  nama: string;
  email: string;
  sekolah: string;
  foto_profil: string;
}

interface PasswordData {
  password_lama: string;
  password_baru: string;
  konfirmasi_password: string;
}

interface PasswordStrength {
  minLength: boolean;
  hasNumber: boolean;
  hasUppercase: boolean;
}

type TabType = "info" | "keamanan";

function ProfilPage() {
  const user = getMockUser();
  const [profileData, setProfileData] = useState<ProfileData>({
    nama: user?.nama || "",
    email: user?.email || "",
    sekolah: "SMPN 1 Surabaya",
    foto_profil: "",
  });

  const [editState, setEditState] = useState<EditState>({
    field: null,
    value: "",
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    password_lama: "",
    password_baru: "",
    konfirmasi_password: "",
  });

  const [activeTab, setActiveTab] = useState<TabType>("info");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const startEdit = (field: keyof ProfileData) => {
    setEditState({
      field,
      value: profileData[field],
    });
  };

  const saveEdit = () => {
    if (!editState.field) return;

    if (editState.value.trim() === "") {
      toast.error("Field tidak boleh kosong");
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      [editState.field]: editState.value,
    }));

    toast.success("Berhasil diperbarui!");
    setEditState({ field: null, value: "" });
  };

  const cancelEdit = () => {
    setEditState({ field: null, value: "" });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
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

  const getPasswordStrength = (): PasswordStrength => {
    const pwd = passwordData.password_baru;
    return {
      minLength: pwd.length >= 8,
      hasNumber: /\d/.test(pwd),
      hasUppercase: /[A-Z]/.test(pwd),
    };
  };

  const strength = getPasswordStrength();
  const strengthCount = Object.values(strength).filter(Boolean).length;

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-3xl mx-auto">
        {/* HEADER - Avatar & Stats (Instagram Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-start gap-8 md:gap-12 mb-8"
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-20 h-20 md:w-36 md:h-36 border-2 border-brand-gold/40">
              <AvatarImage src={profileData.foto_profil} />
              <AvatarFallback className="bg-brand-gold text-brand-dark text-2xl md:text-4xl font-bold font-display">
                {getInitials(profileData.nama)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {/* Name & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-brand-dark truncate">
                {profileData.nama}
              </h1>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 bg-brand-dark text-brand-cream text-sm font-semibold rounded-lg hover:bg-brand-dark/90 transition-colors">
                  Edit Profil
                </button>
                <button className="p-1.5 border border-brand-gold/30 rounded-lg hover:bg-brand-gold/10 transition-colors">
                  <Settings className="w-5 h-5 text-brand-dark" />
                </button>
              </div>
            </div>

            {/* Stats Row (Instagram Style) */}
            <div className="flex gap-6 md:gap-10 mb-4">
              <div className="text-center">
                <span className="font-bold text-brand-dark">2</span>
                <span className="text-brand-dark/70 ml-1">Kelas</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-brand-dark">60</span>
                <span className="text-brand-dark/70 ml-1">Siswa</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-brand-dark">156</span>
                <span className="text-brand-dark/70 ml-1">Aktivitas</span>
              </div>
            </div>

            {/* Bio */}
            <div className="hidden md:block">
              <p className="font-semibold text-brand-dark text-sm">{profileData.nama}</p>
              <p className="text-sm text-brand-dark/70">{profileData.sekolah}</p>
              <p className="text-sm text-brand-dark/70">{profileData.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Mobile Bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:hidden mb-6 px-1"
        >
          <p className="font-semibold text-brand-dark text-sm">{profileData.nama}</p>
          <p className="text-sm text-brand-dark/70">{profileData.sekolah}</p>
          <p className="text-sm text-brand-dark/70">{profileData.email}</p>
        </motion.div>

        {/* Tab Bar (Instagram Style) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="border-t border-brand-gold/30 mb-6"
        >
          <div className="flex justify-center gap-12">
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider border-t transition-colors ${
                activeTab === "info"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-brand-dark/40 hover:text-brand-dark/60"
              }`}
            >
              <User className="w-4 h-4" />
              Informasi
            </button>
            <button
              onClick={() => setActiveTab("keamanan")}
              className={`flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-wider border-t transition-colors ${
                activeTab === "keamanan"
                  ? "border-brand-dark text-brand-dark"
                  : "border-transparent text-brand-dark/40 hover:text-brand-dark/60"
              }`}
            >
              <Shield className="w-4 h-4" />
              Keamanan
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-brand-gold/30 rounded-xl p-6 shadow-sm shadow-black/5">
                <h3 className="text-lg font-bold text-brand-dark mb-6">Informasi Pribadi</h3>

                <div className="space-y-1">
                  {/* Nama */}
                  <div className="group cursor-pointer py-3" onClick={() => startEdit("nama")}>
                    <label className="text-xs text-brand-dark/50 block mb-1">Nama Lengkap</label>
                    {editState.field === "nama" ? (
                      <div className="flex gap-2 items-center">
                        <input
                          autoFocus
                          type="text"
                          value={editState.value}
                          onChange={(e) =>
                            setEditState((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                          className="flex-1 bg-transparent border-b border-brand-gold text-brand-dark placeholder:text-brand-dark/30 focus:outline-none py-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit();
                          }}
                          className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEdit();
                          }}
                          className="p-1.5 text-brand-dark/40 hover:bg-brand-dark/5 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-brand-dark group-hover:text-brand-gold transition-colors">
                        {profileData.nama}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-brand-gold/20" />

                  {/* Email */}
                  <div className="group cursor-pointer py-3" onClick={() => startEdit("email")}>
                    <label className="text-xs text-brand-dark/50 block mb-1">Email</label>
                    {editState.field === "email" ? (
                      <div className="flex gap-2 items-center">
                        <input
                          autoFocus
                          type="email"
                          value={editState.value}
                          onChange={(e) =>
                            setEditState((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                          className="flex-1 bg-transparent border-b border-brand-gold text-brand-dark placeholder:text-brand-dark/30 focus:outline-none py-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit();
                          }}
                          className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEdit();
                          }}
                          className="p-1.5 text-brand-dark/40 hover:bg-brand-dark/5 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-brand-dark group-hover:text-brand-gold transition-colors">
                        {profileData.email}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-brand-gold/20" />

                  {/* Sekolah */}
                  <div className="group cursor-pointer py-3" onClick={() => startEdit("sekolah")}>
                    <label className="text-xs text-brand-dark/50 block mb-1">Sekolah</label>
                    {editState.field === "sekolah" ? (
                      <div className="flex gap-2 items-center">
                        <input
                          autoFocus
                          type="text"
                          value={editState.value}
                          onChange={(e) =>
                            setEditState((prev) => ({
                              ...prev,
                              value: e.target.value,
                            }))
                          }
                          className="flex-1 bg-transparent border-b border-brand-gold text-brand-dark placeholder:text-brand-dark/30 focus:outline-none py-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            saveEdit();
                          }}
                          className="p-1.5 text-brand-gold hover:bg-brand-gold/10 rounded transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelEdit();
                          }}
                          className="p-1.5 text-brand-dark/40 hover:bg-brand-dark/5 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <p className="text-brand-dark group-hover:text-brand-gold transition-colors">
                        {profileData.sekolah}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "keamanan" && (
            <motion.div
              key="keamanan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white border border-brand-gold/30 rounded-xl p-6 shadow-sm shadow-black/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-brand-dark">Keamanan</h3>
                  {!isChangingPassword && (
                    <p className="text-xs text-brand-dark/50">Terakhir diubah: 14 hari lalu</p>
                  )}
                </div>

                {!isChangingPassword ? (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 bg-brand-dark hover:bg-brand-dark/90 text-brand-cream font-medium text-sm rounded-lg transition-colors"
                  >
                    Ubah Password
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <form onSubmit={handlePasswordChange} className="space-y-5">
                      {/* Password Lama */}
                      <div>
                        <label className="text-xs text-brand-dark/50 block mb-1">
                          Password Lama
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.old ? "text" : "password"}
                            value={passwordData.password_lama}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                password_lama: e.target.value,
                              }))
                            }
                            className="w-full bg-transparent border-b border-brand-gold/30 text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-gold transition-colors pr-8 py-1"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                old: !prev.old,
                              }))
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark transition-colors"
                          >
                            {showPasswords.old ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="h-px bg-brand-gold/20" />

                      {/* Password Baru */}
                      <div>
                        <label className="text-xs text-brand-dark/50 block mb-1">
                          Password Baru
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.password_baru}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                password_baru: e.target.value,
                              }))
                            }
                            className="w-full bg-transparent border-b border-brand-gold/30 text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-gold transition-colors pr-8 py-1"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                new: !prev.new,
                              }))
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark transition-colors"
                          >
                            {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>

                        {/* Strength Requirements */}
                        <div className="mt-3 space-y-2">
                          <div
                            className={`flex items-center gap-2 text-xs transition-colors ${
                              strength.minLength ? "text-green-600" : "text-brand-dark/40"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                strength.minLength
                                  ? "border-green-600 bg-green-50"
                                  : "border-brand-dark/20"
                              }`}
                            >
                              {strength.minLength && <Check size={12} className="text-green-600" />}
                            </div>
                            Minimal 8 karakter
                          </div>

                          <div
                            className={`flex items-center gap-2 text-xs transition-colors ${
                              strength.hasNumber ? "text-green-600" : "text-brand-dark/40"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                strength.hasNumber
                                  ? "border-green-600 bg-green-50"
                                  : "border-brand-dark/20"
                              }`}
                            >
                              {strength.hasNumber && <Check size={12} className="text-green-600" />}
                            </div>
                            Mengandung angka
                          </div>

                          <div
                            className={`flex items-center gap-2 text-xs transition-colors ${
                              strength.hasUppercase ? "text-green-600" : "text-brand-dark/40"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded border flex items-center justify-center ${
                                strength.hasUppercase
                                  ? "border-green-600 bg-green-50"
                                  : "border-brand-dark/20"
                              }`}
                            >
                              {strength.hasUppercase && (
                                <Check size={12} className="text-green-600" />
                              )}
                            </div>
                            Mengandung huruf besar
                          </div>
                        </div>
                      </div>

                      <div className="h-px bg-brand-gold/20" />

                      {/* Konfirmasi */}
                      <div>
                        <label className="text-xs text-brand-dark/50 block mb-1">
                          Konfirmasi Password Baru
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.konfirmasi_password}
                            onChange={(e) =>
                              setPasswordData((prev) => ({
                                ...prev,
                                konfirmasi_password: e.target.value,
                              }))
                            }
                            className="w-full bg-transparent border-b border-brand-gold/30 text-brand-dark placeholder:text-brand-dark/30 focus:outline-none focus:border-brand-gold transition-colors pr-8 py-1"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswords((prev) => ({
                                ...prev,
                                confirm: !prev.confirm,
                              }))
                            }
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-dark/40 hover:text-brand-dark transition-colors"
                          >
                            {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsChangingPassword(false);
                            setPasswordData({
                              password_lama: "",
                              password_baru: "",
                              konfirmasi_password: "",
                            });
                          }}
                          className="px-4 py-2 border border-brand-gold/30 text-brand-dark hover:bg-brand-gold/10 text-sm rounded-lg transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          disabled={strengthCount < 3}
                          className="px-4 py-2 bg-brand-dark hover:bg-brand-dark/90 disabled:opacity-50 disabled:cursor-not-allowed text-brand-cream font-medium text-sm rounded-lg transition-colors"
                        >
                          Ubah Password
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
