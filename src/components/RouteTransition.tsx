"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const initialState = prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.992 };
  const animateState = { opacity: 1, y: 0, scale: 1 };
  const transitionState = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1] as const,
      };

  return (
    <motion.div
      key={pathname}
      initial={initialState}
      animate={animateState}
      transition={transitionState}
      style={prefersReducedMotion ? undefined : { willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}