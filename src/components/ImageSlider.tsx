import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ImageSliderProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export function ImageSlider({ images, interval = 4000 }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasSlid, setHasSlid] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setHasSlid(true);
    setPrev(current);
    setCurrent((p) => (p + 1) % images.length);
  }, [current, isAnimating, images.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[prev].src}
        alt={images[prev].alt}
        className="absolute inset-0 w-full h-full object-cover"
        suppressHydrationWarning
      />

      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          initial={hasSlid ? { clipPath: "inset(0 100% 0 0)" } : false}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          suppressHydrationWarning
        />
      </AnimatePresence>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimating || i === current) return;
              setIsAnimating(true);
              setHasSlid(true);
              setPrev(current);
              setCurrent(i);
            }}
            className={`size-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-brand-gold w-6" : "bg-brand-cream/40 hover:bg-brand-cream/60"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
