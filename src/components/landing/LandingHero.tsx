import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reflected from "@/components/water/Reflected";

const LandingHero = () => (
  <section
    aria-label="Welcome"
    className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
  >
    {/* The live water scene provides the ambient light behind the hero. */}
    <div className="container-custom relative z-10 px-4 py-24 text-center sm:px-6 lg:px-8">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mx-auto mb-10 max-w-3xl text-[10px] uppercase tracking-[0.32em] text-deep-plum-soft sm:text-xs"
      >
        A safe space to put down what you've been carrying
      </motion.p>

      <Reflected gap={10} className="inline-block">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="font-serif leading-[0.92] tracking-tight text-foreground"
        >
          <span className="block font-light italic text-[clamp(2.75rem,11vw,9rem)]">
            Soulful
          </span>
          <span className="block font-bold uppercase tracking-tighter text-primary text-[clamp(2.5rem,12vw,11rem)]">
            Reflections
          </span>
        </motion.h1>
      </Reflected>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55 }}
        className="mt-28 text-xs uppercase tracking-[0.28em] text-deep-plum-soft sm:text-sm"
      >
        Honour the journey. End the silent struggle.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="mt-12 flex justify-center"
      >
        <Link
          to="/tools"
          className="group inline-flex items-center gap-2 rounded-full border border-primary/50 px-10 py-4 text-sm uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Start Here
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default LandingHero;
