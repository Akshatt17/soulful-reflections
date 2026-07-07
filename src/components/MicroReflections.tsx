import { motion } from "framer-motion";
import { ArrowRight, Play, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import videoMeditation from "@/assets/video-meditation.jpg";
import videoBreathing from "@/assets/video-breathing.jpg";
import GlassPanel from "@/components/landing/GlassPanel";
import { fadeInUp } from "@/lib/motion-variants";

const audioReflections = [
  {
    title: "Morning Gratitude",
    description: "Start your day with intentional thankfulness",
    duration: "5:32",
  },
  {
    title: "Midday Reset",
    description: "A quick pause to recenter your focus",
    duration: "3:45",
  },
  {
    title: "Evening Wind Down",
    description: "Release the day's tensions peacefully",
    duration: "8:12",
  },
  {
    title: "Body Scan Meditation",
    description: "Tune into each part of your body",
    duration: "6:20",
  },
  {
    title: "Loving Kindness",
    description: "Cultivate compassion for yourself and others",
    duration: "7:05",
  },
];

const videoReflections = [
  {
    title: "Guided Visualization",
    description: "A journey through calming imagery",
    thumbnail: videoMeditation,
  },
  {
    title: "Breath Work Basics",
    description: "Foundation techniques for relaxation",
    thumbnail: videoBreathing,
  },
];

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

        <motion.div
          variants={fadeInUp}
          data-lenis-prevent
          className="scrollbar-thin mt-8 max-h-[220px] space-y-2 overflow-y-auto pr-2"
        >
          {audioReflections.map((audio) => (
            <div
              key={audio.title}
              className="group flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-card/50"
            >
              <button
                aria-label={`Play ${audio.title}`}
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary transition-transform duration-200 group-hover:scale-105"
              >
                <Play className="ml-0.5 h-4 w-4 text-primary-foreground" />
              </button>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-foreground">
                  {audio.title}
                </h4>
                <p className="truncate text-xs text-foreground/70">
                  {audio.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-xs font-medium text-foreground/60">
                {audio.duration}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-6 grid grid-cols-2 gap-4">
          {videoReflections.map((video) => (
            <div
              key={video.title}
              className="group cursor-pointer overflow-hidden rounded-xl"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 transition-transform duration-200 group-hover:scale-110">
                    <PlayCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
              <p className="mt-2 truncate text-xs font-medium text-foreground">
                {video.title}
              </p>
            </div>
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
