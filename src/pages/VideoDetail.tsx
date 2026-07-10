import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import mediaData from "@/data/media.json";
import { youtubeEmbedUrl } from "@/lib/youtube";

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
      <section className="section-padding">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/media"
              className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Media Library
            </Link>

            {/* Video Player — YouTube embed; frame follows orientation */}
            <div
              className={`mx-auto mb-8 w-full overflow-hidden rounded-2xl shadow-elevated bg-foreground/90 ${
                video.orientation === "portrait"
                  ? "max-w-sm aspect-[9/16]"
                  : "max-w-3xl aspect-video"
              }`}
            >
              <iframe
                src={youtubeEmbedUrl(video.youtubeId)}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Info */}
            <div className="glass-panel p-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-semibold tracking-wider text-forest uppercase">
                  {video.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-foreground/70">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary mb-4">
                {video.title}
              </h1>
              <p className="text-foreground/80 leading-relaxed">
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
