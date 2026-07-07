import { useState, useMemo } from "react";
import PageLayout from "@/components/PageLayout";
import { AudioCard, VideoCard } from "@/components/MediaCard";
import { Button } from "@/components/ui/button";
import mediaData from "@/data/media.json";
import { ImageReflectionsGallery } from "@/components/micro-reflections/images";

type MediaType = "all" | "audio" | "video" | "images";

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
    if (mediaType === "video" || mediaType === "images") return [];
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
    if (mediaType === "audio" || mediaType === "images") return [];
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

  const showImages = mediaType === "all" || mediaType === "images";

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <div className="radial-tint mx-auto max-w-2xl py-6">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
              Micro Reflections
            </h1>
            <p className="text-lg text-foreground/80">
              Brief moments of mindfulness through audio, video, and visual content designed to support your daily wellbeing.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="glass border-b border-border/40">
        <div className="container-custom px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
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
              <Button
                variant={mediaType === "images" ? "hero" : "outline"}
                size="sm"
                onClick={() => setMediaType("images")}
              >
                Images
              </Button>
            </div>

            {/* Category & Duration Filters (hidden for images) */}
            {mediaType !== "images" && (
              <div className="flex gap-3 items-center">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border/60 bg-card/60 text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="all">All Topics</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border/60 bg-card/60 text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                >
                  <option value="all">Any Duration</option>
                  <option value="short">Under 5 min</option>
                  <option value="medium">5-15 min</option>
                  <option value="long">15+ min</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Audio Section */}
      {filteredAudio.length > 0 && (
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="radial-tint inline-block font-serif text-2xl font-bold text-primary mb-8 px-4 py-2">
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
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="radial-tint inline-block font-serif text-2xl font-bold text-primary mb-8 px-4 py-2">
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

      {/* Image Reflections Section */}
      {showImages && (
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <h2 className="radial-tint inline-block font-serif text-2xl font-bold text-primary mb-8 px-4 py-2">
              Image Reflections
            </h2>
            <ImageReflectionsGallery columns={3} />
          </div>
        </section>
      )}

      {/* Empty State */}
      {filteredAudio.length === 0 && filteredVideo.length === 0 && !showImages && (
        <section className="section-padding">
          <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-foreground/80">No media matches your current filters.</p>
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
