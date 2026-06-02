import { ImageReflection } from "@/types/imageReflection";
import { cn } from "@/lib/utils";

// Import all reflection images
import insomniaImg from "@/assets/Micro_Image/insomnia-disorder.jpg";
import bddImg from "@/assets/Micro_Image/body-dysmorphic-disorder.jpg";
import bipolarImg from "@/assets/Micro_Image/bipolar-disorder.jpg";
import ptsdImg from "@/assets/Micro_Image/ptsd.jpg";
import anxietyImg from "@/assets/Micro_Image/anxiety-disorders.jpg";
import ocdImg from "@/assets/Micro_Image/ocd.jpg";

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
        "group cursor-pointer rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300",
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
      <div className="bg-muted p-4">
        <h4 className="font-serif font-semibold text-foreground mb-2 line-clamp-1">
          {reflection.title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {reflection.description}
        </p>
      </div>
    </div>
  );
};

export default ImageReflectionCard;
