import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageReflection } from "@/types/imageReflection";

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

interface ImageReflectionViewerProps {
  reflection: ImageReflection | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const ImageReflectionViewer = ({
  reflection,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ImageReflectionViewerProps) => {
  if (!reflection) return null;

  const imageSrc = imageMap[reflection.imagePath] || "";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && hasPrevious) {
      onPrevious();
    } else if (e.key === "ArrowRight" && hasNext) {
      onNext();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{reflection.title}</DialogTitle>
        </DialogHeader>

        {/* Image Section */}
        <div className="relative bg-foreground/5">
          <img
            src={imageSrc}
            alt={reflection.title}
            className="w-full max-h-[50vh] object-contain"
          />

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="h-12 w-12 rounded-full bg-card/80 hover:bg-card ml-2 disabled:opacity-30"
              aria-label="Previous reflection"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              disabled={!hasNext}
              className="h-12 w-12 rounded-full bg-card/80 hover:bg-card mr-2 disabled:opacity-30"
              aria-label="Next reflection"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {reflection.category}
            </span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
            {reflection.title}
          </h2>
          <ScrollArea className="max-h-[25vh]">
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line pr-4">
              {reflection.fullText}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageReflectionViewer;
