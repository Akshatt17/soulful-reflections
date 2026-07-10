import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";

/** Compact founder pane, kept left so the scene stays open on the right. */
const AboutFounder = () => (
  <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
    <GlassPanel className="max-w-xl p-8 sm:p-10 md:ml-[4%]">
      <motion.p
        variants={fadeInUp}
        className="mb-6 text-[11px] uppercase tracking-[0.32em] text-primary"
      >
        About Soulful Reflections
      </motion.p>

      <motion.p
        variants={fadeInUp}
        className="font-serif text-xl leading-snug text-foreground sm:text-2xl"
      >
        A clinical sanctuary for those who have been carrying a heavy weight in
        silence — where your struggle finally meets understanding.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center"
      >
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-card/80">
          <img
            src={drNiharika}
            alt="Dr. Niharika Bhaskar"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-primary sm:text-3xl">
            Dr. Niharika Bhaskar
          </h2>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-accent-foreground">
            Practicing Psychiatrist · Founder, SR
          </p>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-6 space-y-4">
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
          <span className="font-semibold text-foreground">My Mission:</span> To
          bridge the gap between deep soul-searching and clinical care, so no one
          has to navigate their mental health alone.
        </p>
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
          <span className="font-semibold text-foreground">My Philosophy:</span>{" "}
          The mind deserves the same care as the body — gently, precisely, and
          without shame.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="mt-8">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-berry"
        >
          Read her story <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </GlassPanel>
  </div>
);

export default AboutFounder;
