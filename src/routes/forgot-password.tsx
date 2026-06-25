import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SlideRevealButton } from "@/components/SlideRevealButton";
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
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/forgot-password" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.jpg" },
    ],
  }),
  component: ForgotPasswordPage,
});

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (_data: ForgotPasswordFormValues) => {
    // TODO: Implement API call
  };

  return (
    <FormPageLayout>
      <div className="w-full max-w-md mx-auto text-center">
        <div className="rounded-xl border border-brand-gold/40 bg-brand-dark/95 p-6 sm:p-8 lg:p-12 shadow-2xl shadow-brand-gold/10 backdrop-blur-md">
          <div className="mb-8">
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
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
                  className="flex items-center justify-center gap-2 text-sm text-white hover:text-brand-light-gold transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  <span>Kembali ke Masuk</span>
                </Link>
              </motion.div>
            </motion.form>
          </Form>
        </div>
      </div>
    </FormPageLayout>
  );
}
