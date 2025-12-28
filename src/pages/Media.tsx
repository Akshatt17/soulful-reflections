import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { AudioCard, VideoCard } from "@/components/MediaCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import mediaData from "@/data/media.json";

type MediaType = "all" | "audio" | "video";

const Media = () => {
  const [mediaType, setMediaType] = useState<MediaType>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");

  // Extract unique categories
  const categories = useMemo(() => {
    const audioCategories = mediaData.audio.map((a) => a.category);
    const videoCategories = mediaData.video.map((v) => v.category);
    return [...new Set([...audioCategories, ...videoCategories])];
  }, []);

  // Filter media
  const filteredAudio = useMemo(() => {
    if (mediaType === "video") return [];
    return mediaData.audio.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (durationFilter !== "all") {
        const mins = parseInt(item.duration.split(":")[0]);
        if (durationFilter === "short" && mins >= 5) return false;
        if (durationFilter === "medium" && (mins < 5 || mins >= 15)) return false;
        if (durationFilter === "long" && mins < 15) return false;
      }
      return true;
    });
  }, [mediaType, categoryFilter, durationFilter]);

  const filteredVideo = useMemo(() => {
    if (mediaType === "audio") return [];
    return mediaData.video.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      if (durationFilter !== "all") {
        const mins = parseInt(item.duration.split(":")[0]);
        if (durationFilter === "short" && mins >= 5) return false;
        if (durationFilter === "medium" && (mins < 5 || mins >= 15)) return false;
        if (durationFilter === "long" && mins < 15) return false;
      }
      return true;
    });
  }, [mediaType, categoryFilter, durationFilter]);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
            Audio & Video Reflections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in guided audio reflections and calming video content designed to support your mindfulness journey.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Type Filter */}
            <div className="flex gap-2">
              <Button
                variant={mediaType === "all" ? "hero" : "outline"}
                size="sm"
                onClick={() => setMediaType("all")}
              >
                All
              </Button>
              <Button
                variant={mediaType === "audio" ? "hero" : "outline"}
                size="sm"
                onClick={() => setMediaType("audio")}
              >
                Audio
              </Button>
              <Button
                variant={mediaType === "video" ? "hero" : "outline"}
                size="sm"
                onClick={() => setMediaType("video")}
              >
                Video
              </Button>
            </div>

            {/* Category & Duration Filters */}
            <div className="flex gap-3 items-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="all">All Topics</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
              >
                <option value="all">Any Duration</option>
                <option value="short">Under 5 min</option>
                <option value="medium">5-15 min</option>
                <option value="long">15+ min</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Section */}
      {filteredAudio.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-8">
              Audio Reflections
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredAudio.map((audio) => (
                <AudioCard
                  key={audio.id}
                  slug={audio.slug}
                  title={audio.title}
                  description={audio.description}
                  duration={audio.duration}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {filteredVideo.length > 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-8">
              Video Reflections
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideo.map((video) => (
                <VideoCard
                  key={video.id}
                  slug={video.slug}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredAudio.length === 0 && filteredVideo.length === 0 && (
        <section className="section-padding bg-background">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">No media matches your current filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setMediaType("all");
                setCategoryFilter("all");
                setDurationFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default Media;
