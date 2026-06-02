import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/lib/motion-variants";
// NOTE: spec referenced sr-logo.png but the asset placed in the repo is sr-logo.jpeg.
import srLogo from "@/assets/sr-logo.jpeg";

const AboutSection = () => {
  return (
    <section className="bg-card section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column — logo inside a soft circle so a smaller asset still feels intentional */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-muted flex items-center justify-center shadow-card overflow-hidden">
                <img
                  src={srLogo}
                  alt="Soulful Reflections monogram"
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-full bg-terracotta/10" />
              <div className="absolute -z-20 -bottom-8 -right-8 w-full h-full rounded-full bg-sage/10" />
            </div>
          </motion.div>

          {/* Right column — copy block, staggered children */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-5"
          >
            <motion.span
              variants={fadeInRight}
              className="block text-xs uppercase tracking-[0.2em] text-sage font-medium"
            >
              About Soulful Reflections
            </motion.span>

            <motion.h2
              variants={fadeInRight}
              className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-primary leading-tight text-balance"
            >
              Where Your Struggle Finally Meets Understanding
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              Soulful Reflections is a clinical sanctuary for those who have been
              carrying a heavy weight in silence. Here, your struggle finally
              meets understanding.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              We bridge the gap between deep self-searching and psychiatric
              precision &mdash; offering a safe space to explore the &ldquo;why&rdquo;
              behind your mental health.
            </motion.p>

            <motion.div variants={fadeInUp} className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
              >
                Learn more about us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
