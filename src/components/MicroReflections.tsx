import { Play, PlayCircle } from "lucide-react";
import videoMeditation from "@/assets/video-meditation.jpg";
import videoBreathing from "@/assets/video-breathing.jpg";
import { ImageReflectionsGallery } from "@/components/micro-reflections/images";
import { useRef } from "react";

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

const MicroReflections = () => {
  const audioScrollRef = useRef<HTMLDivElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="section-padding">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Micro-Reflections
          </h2>
          <p className="text-muted-foreground text-lg">
            Brief moments of mindfulness to integrate into your daily routine.
          </p>
        </div>

        {/* Layout: 2 audio columns + 1 video + 1 image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Audio Reflections */}
          <div>
            <h3 className="font-serif text-xl font-semibold text-primary mb-6">
              Audio Reflections
            </h3>
            <div
              ref={audioScrollRef}
              data-lenis-prevent
              className="max-h-[280px] overflow-y-auto space-y-4 pr-2 scrollbar-thin"
            >
              {audioReflections.map((audio) => (
                <div
                  key={audio.title}
                  className="flex items-center gap-4 bg-muted/50 rounded-xl p-5 hover:bg-muted transition-colors duration-200 cursor-pointer group"
                >
                  <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">
                      {audio.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {audio.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
                    {audio.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Video Reflections — horizontal scroll */}
          <div className="overflow-hidden">
            <h3 className="font-serif text-xl font-semibold text-primary mb-6">
              Video Reflections
            </h3>
            <div
              ref={videoScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-2"
            >
              {videoReflections.map((video) => (
                <div
                  key={video.title}
                  className="min-w-full snap-center rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                      <div className="w-14 h-14 bg-card/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <PlayCircle className="w-9 h-9 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted p-4">
                    <h4 className="font-medium text-foreground mb-1">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Reflections — horizontal scroll */}
          <div className="overflow-hidden">
            <h3 className="font-serif text-xl font-semibold text-primary mb-6">
              Image Reflections
            </h3>
            <div
              ref={imageScrollRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin pb-2"
            >
              <div className="min-w-full snap-center">
                <ImageReflectionsGallery limit={1} columns={2} />
              </div>
              <div className="min-w-full snap-center">
                <ImageReflectionsGallery limit={1} columns={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicroReflections;
