import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";

interface SlideRevealButtonBase {
  label: string;
  gradientFrom?: string;
  gradientTo?: string;
}

interface SlideRevealButtonAsButton extends SlideRevealButtonBase {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: never;
}

interface SlideRevealButtonAsLink extends SlideRevealButtonBase {
  href: string;
  type?: never;
  disabled?: never;
  variant?: "primary" | "secondary";
}

type SlideRevealButtonProps = SlideRevealButtonAsButton | SlideRevealButtonAsLink;

export function SlideRevealButton({
  label,
  href,
  type = "button",
  disabled = false,
  variant = "secondary",
  gradientFrom = "#c9953c",
  gradientTo = "#e8c878",
}: SlideRevealButtonProps) {
  const [hovered, setHovered] = useState(false);
  const isLink = Boolean(href);
  const isPrimary = variant === "primary";

  const classes = `group relative cursor-pointer overflow-hidden rounded-lg border-2 border-brand-gold px-8 py-3 text-base font-bold uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50 ${
    isLink
      ? isPrimary
        ? "bg-brand-gold text-brand-dark shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:px-14 sm:py-4 sm:text-xl"
        : "bg-brand-dark/70 backdrop-blur-sm text-white shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:px-14 sm:py-4 sm:text-xl"
      : "w-full bg-brand-dark text-white"
  }`;

  const gradientBackground = (
    <motion.span
      className="absolute inset-0 origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: hovered ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
      }}
    />
  );

  const content = (
    <>
      {!isPrimary && gradientBackground}
      <span className="relative z-10">{label}</span>
      <span className="absolute -top-[3px] -left-[3px] size-5 border-t-2 border-l-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
      <span className="absolute -bottom-[3px] -right-[3px] size-5 border-b-2 border-r-2 border-brand-gold transition-all duration-300 group-hover:size-7 group-hover:border-brand-light-gold" />
    </>
  );

  const motionProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 200, damping: 15 },
  };

  if (isLink) {
    return (
      <Link to={href}>
        <motion.div {...motionProps} className={classes}>
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      {...motionProps}
      className={`${classes} cursor-pointer`}
    >
      {content}
    </motion.button>
  );
}
