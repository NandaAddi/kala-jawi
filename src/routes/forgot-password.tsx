import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowLeft } from "lucide-react";
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

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Lupa Kata Sandi - Kalajawi | Reset Password" },
      {
        name: "description",
        content:
          "Lupa kata sandi Kalajawi? Reset password akun Anda dengan mudah. Masukkan email untuk menerima link reset kata sandi.",
      },
      { property: "og:title", content: "Lupa Kata Sandi - Kalajawi | Reset Password" },
      {
        property: "og:description",
        content: "Lupa kata sandi Kalajawi? Reset password akun Anda dengan mudah.",
      },
      { property: "og:url", content: "https://kalajawi.id/forgot-password" },
      { property: "og:image", content: "https://kalajawi.id/og-image.webp" },
    ],
  }),
  component: ForgotPasswordPage,
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email harus diisi"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

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

function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password data:", data);
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
                Lupa Kata Sandi?
              </h1>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Masukkan email Anda dan kami akan mengirimkan link untuk mereset kata sandi Anda.
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
                  <SlideRevealButton label="Kirim Link Reset" type="submit" />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-sm text-brand-gold hover:text-brand-light-gold transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                    <span>Kembali ke Masuk</span>
                  </Link>
                </motion.div>
              </motion.form>
            </Form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
