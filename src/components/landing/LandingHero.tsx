import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reflected from "@/components/water/Reflected";

const LandingHero = () => {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 560], [1, 0]);
  const y = useTransform(scrollY, [0, 560], [0, -72]);

  return (
    <section
      aria-label="Welcome"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
    >
      {/* The live water scene provides the ambient light behind the hero; the
          content drifts up and fades as scroll begins so the descent takes over. */}
      <motion.div
        style={reducedMotion ? { opacity } : { opacity, y }}
        className="container-custom relative z-10 px-4 py-24 text-center sm:px-6 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mb-10 max-w-3xl text-[10px] uppercase tracking-[0.32em] text-deep-plum-soft sm:text-xs"
        >
          A safe space to put down what you've been carrying
        </motion.p>

        <div className="radial-tint px-6 py-4">
          <Reflected gap={10} className="inline-block">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
              className="font-serif leading-[0.92] tracking-tight text-foreground"
            >
              <span className="block text-[clamp(2.75rem,11vw,9rem)] font-light italic">
                The Velvet
              </span>
              <span className="block text-[clamp(4rem,18vw,16rem)] font-bold uppercase tracking-tight text-primary">
                Mind
              </span>
            </motion.h1>
          </Reflected>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-24 text-xs uppercase tracking-[0.28em] text-deep-plum-soft sm:text-sm"
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
            className="group inline-flex items-center gap-2 rounded-full border border-primary/50 bg-card/40 px-10 py-4 text-sm uppercase tracking-[0.2em] text-primary backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Start Here
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingHero;
