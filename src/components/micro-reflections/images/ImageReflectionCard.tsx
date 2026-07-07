import { ImageReflection } from "@/types/imageReflection";
import { cn } from "@/lib/utils";

// Import all reflection images
import insomniaImg from "@/assets/reflections/insomnia-disorder.jpg";
import bddImg from "@/assets/reflections/body-dysmorphic-disorder.jpg";
import bipolarImg from "@/assets/reflections/bipolar-disorder.jpg";
import ptsdImg from "@/assets/reflections/ptsd.jpg";
import anxietyImg from "@/assets/reflections/anxiety-disorders.jpg";
import ocdImg from "@/assets/reflections/ocd.jpg";

// Map image paths to imports
const imageMap: Record<string, string> = {
  "insomnia-disorder.jpg": insomniaImg,
  "body-dysmorphic-disorder.jpg": bddImg,
  "bipolar-disorder.jpg": bipolarImg,
  "ptsd.jpg": ptsdImg,
  "anxiety-disorders.jpg": anxietyImg,
  "ocd.jpg": ocdImg,
};

interface ImageReflectionCardProps {
  reflection: ImageReflection;
  onClick: () => void;
  className?: string;
}

const ImageReflectionCard = ({
  reflection,
  onClick,
  className,
}: ImageReflectionCardProps) => {
  const imageSrc = imageMap[reflection.imagePath] || "";

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-panel glass-panel-hover group cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={reflection.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-card/90 text-primary rounded-full">
            {reflection.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-serif font-semibold text-foreground mb-2 line-clamp-1">
          {reflection.title}
        </h4>
        <p className="text-sm text-foreground/75 line-clamp-2">
          {reflection.description}
        </p>
      </div>
    </div>
  );
};

export default ImageReflectionCard;
