import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import mediaData from "@/data/media.json";

const VideoDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const video = mediaData.video.find((v) => v.slug === slug);

  if (!video) {
    return (
      <PageLayout>
        <div className="section-padding text-center">
          <h1 className="font-serif text-3xl font-bold text-primary mb-4">
            Video Not Found
          </h1>
          <Link to="/media">
            <Button variant="hero">Back to Media</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="section-padding bg-background">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Media Library
            </Link>

            {/* Video Player */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-elevated mb-8">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="bg-card rounded-2xl shadow-card p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-semibold tracking-wider text-sage uppercase">
                  {video.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                {video.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default VideoDetail;
