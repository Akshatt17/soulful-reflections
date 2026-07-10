import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Interactive panes lift slightly and brighten on hover. */
  hover?: boolean;
}

/**
 * The approved glass pane the scene shows through — a thin wrapper over the
 * `.glass-panel` / `.glass-panel-hover` classes in index.css (the single source
 * of truth for the treatment; spec in docs/design/theme.md §3). A plain div, so
 * framer-motion variant waves propagate through to children untouched.
 */
const GlassPanel = ({ children, className, hover }: GlassPanelProps) => (
  <div className={cn("glass-panel", hover && "glass-panel-hover", className)}>
    {children}
  </div>
);

export default GlassPanel;
