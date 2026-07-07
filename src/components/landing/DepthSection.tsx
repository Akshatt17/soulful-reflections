import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { stagger } from "@/lib/motion-variants";
import { useWater } from "@/components/water/useWater";

interface DepthSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabel?: string;
}

/**
 * Wraps a landing "depth": the pane is scrubbed by scroll on both edges — it
 * rises in as it enters the viewport, holds, then drifts up and fades as it
 * scrolls away — so the scene breathes in the gaps between sections. It also
 * broadcasts the hidden→show variant wave to stagger inner text reveals, and
 * sends a ripple across the water surface as it settles into view.
 */
const DepthSection = ({ children, className, id, ariaLabel }: DepthSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { spawnRipple } = useWater();
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [56, 0, 0, -56]);

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y2 = 1 - (rect.top + rect.height / 2) / window.innerHeight;
    spawnRipple(x, Math.min(Math.max(y2, 0), 1), 1.2);
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      variants={stagger(0.12)}
      onViewportEnter={handleEnter}
      style={reducedMotion ? { opacity } : { opacity, y }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default DepthSection;
