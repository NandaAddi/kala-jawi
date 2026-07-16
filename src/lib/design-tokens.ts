export const colorPalette = {
  primary: {
    main: "rgb(37 99 235)",
    light: "rgb(239 246 255)",
    dark: "rgb(29 78 216)",
  },
  success: {
    main: "rgb(16 185 129)",
    light: "rgb(236 253 245)",
    dark: "rgb(5 150 105)",
  },
  warning: {
    main: "rgb(245 158 11)",
    light: "rgb(254 252 232)",
    dark: "rgb(217 119 6)",
  },
  accent: {
    main: "rgb(6 182 212)",
    light: "rgb(236 254 255)",
    dark: "rgb(14 116 144)",
  },
  purple: {
    main: "rgb(168 85 247)",
    light: "rgb(250 245 255)",
    dark: "rgb(126 34 206)",
  },
  danger: {
    main: "rgb(239 68 68)",
    light: "rgb(254 242 242)",
    dark: "rgb(220 38 38)",
  },
  neutral: {
    50: "rgb(248 250 252)",
    100: "rgb(241 245 249)",
    200: "rgb(226 232 240)",
    300: "rgb(203 213 225)",
    400: "rgb(148 163 184)",
    500: "rgb(100 116 139)",
    600: "rgb(71 85 105)",
    700: "rgb(51 65 85)",
    800: "rgb(30 41 59)",
    900: "rgb(15 23 42)",
  },
};

export const glassEffects = {
  container: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  },
  hover: {
    background: "rgba(255, 255, 255, 0.9)",
    transform: "translateY(-2px)",
    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.12)",
  },
  premiumShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.15)",
  glowCyan: "0 0 24px rgba(6, 182, 212, 0.3)",
  glowPurple: "0 0 24px rgba(168, 85, 247, 0.3)",
  glowBlue: "0 0 24px rgba(37, 99, 235, 0.3)",
};

export const gradients = {
  text: {
    blueCyan: "linear-gradient(to right, rgb(37 99 235), rgb(6 182 212))",
    purplePink: "linear-gradient(to right, rgb(168 85 247), rgb(236 72 153))",
    blueEmerald: "linear-gradient(to right, rgb(37 99 235), rgb(16 185 129))",
  },
  background: {
    lightBlue: "linear-gradient(to bottom right, rgb(239 246 255), rgb(236 254 255))",
    lightPurple: "linear-gradient(to bottom right, rgb(250 245 255), rgb(254 242 255))",
    subtle: "linear-gradient(to bottom right, rgb(248 250 252), rgb(241 245 249))",
  },
  card: {
    blue: "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)",
    purple: "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.05) 100%)",
    emerald: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)",
    amber: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)",
  },
};

export const animationConfig = {
  spring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    type: "tween" as const,
    duration: 0.3,
    ease: "easeInOut" as const,
  },
  slow: {
    type: "tween" as const,
    duration: 0.6,
    ease: "easeInOut" as const,
  },
  stagger: {
    staggerChildren: 0.1,
    delayChildren: 0.1,
  },
};

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  hoverLift: {
    scale: 1.02,
    y: -4,
    transition: { duration: 0.2 },
  },
  hoverGlow: {
    boxShadow: "0 0 24px rgba(37, 99, 235, 0.3)",
    transition: { duration: 0.3 },
  },
};

export const spacing = {
  sidebarExpanded: 256,
  sidebarCollapsed: 80,
  headerHeight: 72,
  cardPadding: 24,
  sectionGap: 32,
};
