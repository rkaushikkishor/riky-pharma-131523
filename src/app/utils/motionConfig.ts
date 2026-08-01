import type { Variants, Transition } from "motion/react";

// Spring presets
export const springs = {
  gentle: { type: "spring", stiffness: 120, damping: 14 } as Transition,
  snappy: { type: "spring", stiffness: 300, damping: 28 } as Transition,
  bouncy: { type: "spring", stiffness: 400, damping: 17 } as Transition,
  slow: { type: "spring", stiffness: 80, damping: 20 } as Transition,
  swift: { type: "spring", stiffness: 500, damping: 35 } as Transition,
};

// Easing curves
export const easings = {
  out: [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  in: [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
  inOut: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  spring: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
};

// Shared page transition
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.out, when: "beforeChildren" },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: easings.in } },
};

// Stagger container — use as `variants` on a parent
export const staggerContainer: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

// Stagger item — pair with staggerContainer
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: springs.snappy },
};

// Card hover — apply via whileHover
export const cardHover = {
  y: -6,
  boxShadow:
    "0 20px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)",
  transition: springs.snappy,
};

// Subtle card hover (less lift)
export const cardHoverSubtle = {
  y: -3,
  boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
  transition: springs.swift,
};

// Button hover / tap
export const btnHover = { scale: 1.03, transition: springs.swift };
export const btnTap = { scale: 0.97, transition: springs.swift };

// Modal backdrop
export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Modal panel
export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.93, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: springs.bouncy },
  exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.18 } },
};

// Slide in from left
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0, transition: springs.snappy },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
};

// Slide in from right
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: springs.snappy },
  exit: { opacity: 0, x: 20, transition: { duration: 0.15 } },
};

// Scale in for badges, chips
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transition: springs.bouncy },
  exit: { opacity: 0, scale: 0, transition: { duration: 0.15 } },
};

// Fade only
export const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

// Input focus ring animation config
export const inputFocusTransition: Transition = {
  duration: 0.18,
  ease: easings.out,
};

// Error shake (use as animate when errors appear)
export const shakeVariants: Variants = {
  idle: { x: 0 },
  shake: {
    x: [0, -8, 8, -6, 6, -4, 4, 0],
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

// Dropdown / menu
export const dropdownVariants: Variants = {
  initial: { opacity: 0, scale: 0.96, y: -6 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...springs.snappy, staggerChildren: 0.04 },
  },
  exit: { opacity: 0, scale: 0.97, y: -4, transition: { duration: 0.14 } },
};

export const dropdownItem: Variants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
};

// Scroll reveal (apply once = true in viewport)
export const scrollReveal: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: springs.gentle },
};

// Counter animation helper (use with useSpring or motion values)
export const counterTransition: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

// Success check morph
export const successVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: easings.out, delay: 0.2 },
  },
};

// Floating / pulsing (empty state illustrations)
export const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

// Notification pulse ring
export const pulseRing = {
  animate: {
    scale: [1, 1.4, 1],
    opacity: [0.6, 0, 0.6],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};
