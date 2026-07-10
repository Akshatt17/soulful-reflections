import { motion } from "framer-motion";
import { Heart, Brain, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";

const tools = [
  {
    icon: Heart,
    id: "phq9",
    title: "PHQ-9 Questionnaire",
    description: "A brief set of questions to help you reflect on how you've been feeling emotionally over the past two weeks.",
    link: "Start Assessment →",
  },
  {
    icon: Brain,
    id: "gad7",
    title: "GAD-7: A Gentle Check-In for Anxiety",
    description: "A short self-reflection tool to help you notice how often anxiety-related feelings and thoughts have been showing up.",
    link: "Start Assessment →",
  },
  {
    icon: Activity,
    id: "pss",
    title: "PSS — Perceived Stress Scale",
    description: "A reflective tool to help you notice how stressful life has felt recently over the last month.",
    link: "Start Assessment →",
  },
];

/** A slim left-aligned stack of glass cards; the scene keeps the right half. */
const AssessmentTools = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <div className="max-w-xl md:ml-[4%]">
        <motion.div variants={fadeInUp} className="radial-tint mb-8 py-4">
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
            Self-Assessment Tools
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            Thoughtfully designed check-ins to support your journey of
            self-discovery.
          </p>
        </motion.div>

        <div className="space-y-4">
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={fadeInUp}>
              <GlassPanel hover className="flex items-start gap-5 p-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sage/25">
                  <tool.icon className="h-5 w-5 text-forest" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold leading-snug text-primary">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                    {tool.description}
                  </p>
                  <Link
                    to={`/tools/${tool.id}`}
                    className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 transition-all duration-200 hover:underline"
                  >
                    {tool.link}
                  </Link>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentTools;
