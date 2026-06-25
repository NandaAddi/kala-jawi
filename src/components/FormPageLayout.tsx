import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ImageSlider } from "@/components/ImageSlider";
import candiImg from "@/assets/candi.webp";
import candi2Img from "@/assets/candi2.webp";
import candi3Img from "@/assets/candi3.webp";
import batikBg from "@/assets/batik.webp";

interface FormPageLayoutProps {
  children: ReactNode;
}

export function FormPageLayout({ children }: FormPageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-tan to-brand-medium" />
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
            { src: candiImg, alt: "Candi Prambanan relief arca dewa" },
            { src: candi2Img, alt: "Candi Borobudur stupa Buddha" },
            { src: candi3Img, alt: "Candi Jawa gerbang masuk utama" },
          ]}
        />
      </motion.div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center min-h-dvh px-4 sm:min-h-0 sm:px-6 sm:py-12 lg:p-12">
        {children}
      </div>
    </div>
  );
}
