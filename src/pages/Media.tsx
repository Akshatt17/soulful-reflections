import PageLayout from "@/components/PageLayout";
import { AudioCard, VideoCard } from "@/components/MediaCard";
import mediaData from "@/data/media.json";

const Media = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-muted py-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-primary mb-4">
            Media Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Guided audio reflections and video content to support your mindfulness practice.
          </p>
        </div>
      </section>

      {/* Audio Section */}
      <section className="section-padding bg-card">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">
            Audio Reflections
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {mediaData.audio.map((audio) => (
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

      {/* Video Section */}
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">
            Video Reflections
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaData.video.map((video) => (
              <VideoCard
                key={video.id}
                slug={video.slug}
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail}
              />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Media;
