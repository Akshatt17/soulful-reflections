import { motion } from "framer-motion";
import {
  fadeInLeft,
  fadeInRight,
  fadeInUp,
  staggerContainer,
} from "@/lib/motion-variants";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";

const pillars = [
  {
    label: "My Mission",
    body: "To bridge the gap between psychiatric care and lived experience — making mental health feel less clinical and more human.",
  },
  {
    label: "My Philosophy",
    body: "I believe that the mind deserves the same tenderness, curiosity and care as any other part of us.",
  },
  {
    label: "My Guidance",
    body: "To provide the perspective to recognise psychiatric health as you can stop suffering alone, and start reflecting with support.",
  },
] as const;

const FounderSection = () => {
  return (
    // Terracotta-toned band mirrors the reference image's founder strip.
    <section className="section-padding bg-terracotta/[0.12]">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[auto,1fr] gap-12 lg:gap-16 items-center">
          {/* Left — circular portrait with vertical "The Founder" label */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative flex items-center justify-center lg:justify-start gap-6"
          >
            <span className="hidden lg:block font-serif text-2xl tracking-[0.3em] text-primary [writing-mode:vertical-rl] rotate-180 uppercase">
              The Founder
            </span>
            <div className="relative">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-elevated ring-4 ring-card">
                <img
                  src={drNiharika}
                  alt="Dr. Niharika Bhaskar, founder of Soulful Reflections"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -z-10 -bottom-3 -right-3 w-full h-full rounded-full bg-primary/10" />
            </div>
          </motion.div>

          {/* Right — intro + three pillars */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-6"
          >
            <motion.span
              variants={fadeInRight}
              className="block text-xs uppercase tracking-[0.2em] text-sage font-medium lg:hidden"
            >
              The Founder
            </motion.span>

            <motion.h2
              variants={fadeInRight}
              className="font-serif text-3xl sm:text-4xl text-primary leading-tight text-balance"
            >
              Meet Dr. Niharika Bhaskar
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground leading-relaxed max-w-2xl"
            >
              Practising psychiatrist and the founder of Soulful Reflections.
              She built this hub to bring professional psychiatric oversight to
              the journey of self-reflection.
            </motion.p>

            <motion.div
              variants={staggerContainer}
              className="grid sm:grid-cols-3 gap-4 pt-2"
            >
              {pillars.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  variants={fadeInUp}
                  className="bg-card rounded-xl p-5 shadow-soft"
                >
                  <h3 className="font-serif text-base font-semibold text-primary mb-2">
                    {pillar.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
