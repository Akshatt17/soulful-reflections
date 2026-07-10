import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";
import { resolveVideoPoster } from "@/lib/video-assets";
import mediaData from "@/data/media.json";

// Audio reflections are temporarily removed from the site (kept for later):
// const audioReflections = [
//   { title: "Morning Gratitude", description: "Start your day with intentional thankfulness", duration: "5:32" },
//   { title: "Midday Reset", description: "A quick pause to recenter your focus", duration: "3:45" },
//   { title: "Evening Wind Down", description: "Release the day's tensions peacefully", duration: "8:12" },
//   { title: "Body Scan Meditation", description: "Tune into each part of your body", duration: "6:20" },
//   { title: "Loving Kindness", description: "Cultivate compassion for yourself and others", duration: "7:05" },
// ];

// The three newest video reflections, linked to their detail pages.
const videoReflections = mediaData.video.slice(0, 3).map((v) => ({
  slug: v.slug,
  title: v.title,
  poster: v.poster,
}));

/** One compact right-aligned media pane; the full library lives at /media. */
const MicroReflections = () => {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-16 lg:py-24">
      <GlassPanel className="max-w-xl p-8 sm:p-10 md:ml-auto md:mr-[4%]">
        <motion.div variants={fadeInUp}>
          <h2 className="font-serif text-3xl font-bold text-primary sm:text-4xl">
            Micro-Reflections
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            Brief moments of mindfulness to fold into your day.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 grid grid-cols-3 gap-3">
          {videoReflections.map((video) => (
            <Link
              key={video.slug}
              to={`/media/video/${video.slug}`}
              className="group block overflow-hidden rounded-xl"
            >
              <div className="relative aspect-[9/16]">
                <img
                  src={resolveVideoPoster(video.poster)}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-card/90 transition-transform duration-200 group-hover:scale-110">
                    <PlayCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
              <p className="mt-2 truncate text-xs font-medium text-foreground">
                {video.title}
              </p>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-primary transition-colors hover:text-berry"
          >
            Explore the full library <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </GlassPanel>
    </div>
  );
};

export default MicroReflections;
