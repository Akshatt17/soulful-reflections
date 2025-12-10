import { Link } from "react-router-dom";
import { Play, PlayCircle } from "lucide-react";

interface AudioCardProps {
  slug: string;
  title: string;
  description: string;
  duration: string;
}

export const AudioCard = ({ slug, title, description, duration }: AudioCardProps) => {
  return (
    <Link
      to={`/media/audio/${slug}`}
      className="flex items-center gap-4 bg-muted/50 rounded-xl p-5 hover:bg-muted transition-colors duration-200 cursor-pointer group"
    >
      <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
        <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
      </button>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground truncate">{title}</h4>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-sm font-medium text-muted-foreground flex-shrink-0">
        {duration}
      </span>
    </Link>
  );
};

interface VideoCardProps {
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
}

export const VideoCard = ({ slug, title, description, thumbnail }: VideoCardProps) => {
  return (
    <Link
      to={`/media/video/${slug}`}
      className="rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer group block"
    >
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
          <div className="w-16 h-16 bg-card/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <PlayCircle className="w-10 h-10 text-primary" />
          </div>
        </div>
      </div>
      <div className="bg-muted p-5">
        <h4 className="font-medium text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};
