import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Chrome } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import candiImg from "@/assets/candi.webp";
import candi2Img from "@/assets/candi2.webp";
import candi3Img from "@/assets/candi3.webp";
import { ImageSlider } from "@/components/ImageSlider";
import batikBg from "@/assets/batik.webp";
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

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Masuk - Kalajawi | Platform Budaya Jawa" },
      {
        name: "description",
        content:
          "Masuk ke akun Kalajawi Anda untuk mengakses fitur pembelajaran budaya Jawa yang lengkap. Login aman dan cepat.",
      },
      { property: "og:title", content: "Masuk - Kalajawi | Platform Budaya Jawa" },
      {
        property: "og:description",
        content:
          "Masuk ke akun Kalajawi Anda untuk mengakses fitur pembelajaran budaya Jawa yang lengkap.",
      },
      { property: "og:url", content: "https://kalajawi.id/login" },
      { property: "og:image", content: "https://kalajawi.id/og-image.webp" },
    ],
  }),
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter").min(1, "Kata sandi harus diisi"),
  remember: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function SlideRevealButton({
  label,
  type = "button",
  disabled = false,
}: {
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group relative w-full cursor-pointer overflow-hidden rounded-lg border-2 border-brand-gold bg-brand-dark px-8 py-3 text-base font-bold uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      <motion.span
        className="absolute inset-0 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: "linear-gradient(to right, #c9953c, #e8c878)",
        }}
      />
      <span className="relative z-10">{label}</span>
      <span className="absolute -top-[3px] -left-[3px] size-5 border-t-2 border-l-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
      <span className="absolute -bottom-[3px] -right-[3px] size-5 border-b-2 border-r-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
    </motion.button>
  );
}

function SocialButton({ icon: Icon, label }: { icon: typeof Chrome; label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-brand-gold/40 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/10"
    >
      <Icon className="size-5" />
      <span>{label}</span>
    </button>
  );
}

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);
  };

  const formVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url(${batikBg})`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          animation: "batik-drift 80s ease-in-out infinite alternate",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <ImageSlider
          images={[
            { src: candiImg, alt: "Candi Jawa 1" },
            { src: candi2Img, alt: "Candi Jawa 2" },
            { src: candi3Img, alt: "Candi Jawa 3" },
          ]}
        />
      </motion.div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-dvh px-4 sm:min-h-0 sm:px-6 sm:py-12 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md mx-auto text-center"
        >
          <div className="rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-6 sm:p-8 lg:p-12 shadow-2xl shadow-brand-gold/10 backdrop-blur-md">
            <div className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-gold">
                Masuk ke Akun
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-brand-gold hover:text-brand-light-gold underline underline-offset-2 transition-colors"
                >
                  Daftar
                </Link>
              </p>
            </div>

            <Form {...form}>
              <motion.form
                onSubmit={form.handleSubmit(onSubmit)}
                variants={formVariants}
                initial="hidden"
                animate="show"
                className="space-y-6 text-left"
              >
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

                <motion.div variants={fieldVariants} className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-brand-gold data-[state=checked]:bg-brand-gold data-[state=checked]:text-brand-dark"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-white/80 cursor-pointer">
                          Ingat saya
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-gold hover:text-brand-light-gold hover:underline underline-offset-2 transition-colors"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <SlideRevealButton label="Masuk" type="submit" />
                </motion.div>

                <motion.div variants={fieldVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-gold/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-brand-dark px-2 text-white/60">Atau masuk dengan</span>
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
        </motion.div>
      </div>
    </div>
  );
}
