import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";

/** Leans left while the dewdrop drifts down the right side of the scene. */
const QuoteOfWeek = () => (
  <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
    <GlassPanel className="max-w-xl p-8 sm:p-10 md:ml-[4%]">
      <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-3">
        <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        <p className="text-[11px] uppercase tracking-[0.32em] text-primary">
          Quote of the week
        </p>
      </motion.div>
      <motion.p
        variants={fadeInUp}
        className="font-serif text-2xl italic leading-snug text-foreground sm:text-3xl"
      >
        "You are allowed to be a work in progress and still be proud of how far
        you've come."
      </motion.p>
      <motion.p
        variants={fadeInUp}
        className="mt-6 text-xs uppercase tracking-[0.2em] text-deep-plum-soft"
      >
        — Dr. Niharika Bhaskar
      </motion.p>
    </GlassPanel>
  </div>
);

export default QuoteOfWeek;
