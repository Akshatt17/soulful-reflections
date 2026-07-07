import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";
import articleYoga from "@/assets/article-yoga.jpg";
import articleJournaling from "@/assets/article-journaling.jpg";
import articleNature from "@/assets/article-nature.jpg";

const articles = [
  {
    image: articleYoga,
    category: "Mindfulness",
    title: "5 Morning Rituals for a Centered Day",
    description: "Transform your mornings with simple practices that set a positive tone for the entire day ahead.",
    link: "#",
  },
  {
    image: articleJournaling,
    category: "Self-Care",
    title: "The Power of Journaling for Mental Clarity",
    description: "Discover how putting pen to paper can unlock insights and promote emotional well-being.",
    link: "#",
  },
  {
    image: articleNature,
    category: "Wellness",
    title: "Nature's Role in Mental Health",
    description: "Explore the healing benefits of spending time outdoors and reconnecting with the natural world.",
    link: "#",
  },
];

/** Right-aligned reading list; the settling brain keeps the left of the frame. */
const LatestArticles = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <div className="max-w-xl md:ml-auto md:mr-[4%]">
        <motion.div variants={fadeInUp} className="radial-tint mb-8 py-4">
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
            Latest Articles
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            Insights and guidance to support your personal growth journey.
          </p>
        </motion.div>

        <div className="space-y-4">
          {articles.map((article) => (
            <motion.div key={article.title} variants={fadeInUp}>
              <GlassPanel hover className="group overflow-hidden">
                <a href={article.link} className="flex items-stretch gap-0">
                  <div className="h-auto w-28 flex-shrink-0 overflow-hidden sm:w-36">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-forest">
                      {article.category}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground/80">
                      {article.description}
                    </p>
                  </div>
                </a>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-8 text-right">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-berry"
          >
            View all articles <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default LatestArticles;
