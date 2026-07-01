import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ReflectedProps {
  children: ReactNode;
  className?: string;
  /** Gap between the element and its reflection, in px. */
  gap?: number;
}

/**
 * Renders children with a soft mirrored reflection beneath them, as if sitting
 * on water. The reflection is absolutely positioned (no layout shift), purely
 * decorative, and omitted under reduced motion.
 */
const Reflected = ({ children, className, gap = 6 }: ReflectedProps) => {
  const reduced = useReducedMotion();

  return (
    <div className={cn("relative", className)}>
      {children}
      {!reduced && (
        <div
          aria-hidden="true"
          className="reflection animate-reflection-wobble absolute left-0 right-0 top-full"
          style={{ marginTop: gap }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Reflected;
