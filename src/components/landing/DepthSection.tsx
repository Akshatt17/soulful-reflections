import { motion } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { fadeInUp } from "@/lib/motion-variants";
import { useWater } from "@/components/water/useWater";

interface DepthSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * Wraps a landing "depth": reveals it as it enters the viewport and sends a
 * ripple across the water surface as it settles.
 */
const DepthSection = ({ children, className, id, ariaLabel }: DepthSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { spawnRipple } = useWater();

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = 1 - (rect.top + rect.height / 2) / window.innerHeight;
    spawnRipple(x, Math.min(Math.max(y, 0), 1), 1.2);
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
      onViewportEnter={handleEnter}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default DepthSection;
