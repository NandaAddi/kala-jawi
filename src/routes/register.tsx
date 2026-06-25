import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SlideRevealButton } from "@/components/SlideRevealButton";
import { SocialButton } from "@/components/SocialButton";
import { FormPageLayout } from "@/components/FormPageLayout";
import { formVariants, fieldVariants } from "@/lib/motion-variants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Daftar Akun Baru - Kalajawi | Gratis" },
      {
        name: "description",
        content:
          "Buat akun Kalajawi gratis dan mulai petualangan belajar budaya Jawa. Daftar sekarang untuk akses fitur lengkap pembelajaran digital.",
      },
      { property: "og:title", content: "Daftar Akun Baru - Kalajawi | Gratis" },
      {
        property: "og:description",
        content: "Buat akun Kalajawi gratis dan mulai petualangan belajar budaya Jawa.",
      },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/register" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: RegisterPage,
});

const registerSchema = z
  .object({
    firstName: z.string().min(1, "Nama depan harus diisi").min(2, "Nama depan minimal 2 karakter"),
    lastName: z
      .string()
      .min(1, "Nama belakang harus diisi")
      .min(2, "Nama belakang minimal 2 karakter"),
    email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
    password: z.string().min(1, "Kata sandi harus diisi").min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi harus diisi"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui Syarat & Ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (_data: RegisterFormValues) => {
    // TODO: Implement API call
  };

  return (
    <FormPageLayout>
      <div className="w-full max-w-md mx-auto text-center">
        <div className="rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-6 sm:p-8 lg:p-12 shadow-2xl shadow-brand-gold/10 backdrop-blur-md">
          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Buat Akun
            </h1>
            <p className="mt-2 text-sm text-white/70">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-brand-gold hover:text-brand-light-gold underline underline-offset-2 transition-colors"
              >
                Masuk
              </Link>
            </p>
          </div>

          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(onSubmit)}
              variants={formVariants}
              initial="hidden"
              animate="show"
              className="space-y-4 sm:space-y-5 text-left"
            >
              <motion.div
                variants={fieldVariants}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Nama Depan</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-brand-gold/60" />
                          <Input
                            type="text"
                            placeholder="Nanda"
                            className="h-11 border-brand-gold/40 bg-transparent pl-11 text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        Nama Belakang
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Addi Wijaya"
                          className="h-11 border-brand-gold/40 bg-transparent text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-brand-gold/60" />
                          <Input
                            type="email"
                            placeholder="nama@email.com"
                            className="h-11 border-brand-gold/40 bg-transparent pl-11 text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">Kata Sandi</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-brand-gold/60" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 border-brand-gold/40 bg-transparent pl-11 pr-11 text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="size-5" />
                            ) : (
                              <Eye className="size-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        Konfirmasi Kata Sandi
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-brand-gold/60" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-11 border-brand-gold/40 bg-transparent pl-11 pr-11 text-white placeholder:text-white/40 focus-visible:border-brand-gold focus-visible:ring-2 focus-visible:ring-brand-gold"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label={
                              showConfirmPassword
                                ? "Sembunyikan konfirmasi kata sandi"
                                : "Tampilkan konfirmasi kata sandi"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gold/60 hover:text-brand-gold transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="size-5" />
                            ) : (
                              <Eye className="size-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5 border-brand-gold data-[state=checked]:bg-brand-gold data-[state=checked]:text-brand-dark"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm text-white/80 cursor-pointer leading-tight">
                          Saya setuju dengan{" "}
                          <Link
                            to="/syarat-ketentuan"
                            className="text-white hover:text-brand-light-gold underline underline-offset-2"
                          >
                            Syarat & Ketentuan
                          </Link>
                        </FormLabel>
                        <FormMessage className="text-red-400" />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <SlideRevealButton label="Daftar" type="submit" />
              </motion.div>

              <motion.div variants={fieldVariants} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-gold/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-brand-dark px-2 text-white/60">Atau daftar dengan</span>
                </div>
              </motion.div>

              <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-3">
                <SocialButton icon={Chrome} label="Google" />
                <SocialButton
                  icon={(props) => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      {...props}
                    >
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                  )}
                  label="Apple"
                />
              </motion.div>
            </motion.form>
          </Form>
        </div>
      </div>
    </FormPageLayout>
  );
}
