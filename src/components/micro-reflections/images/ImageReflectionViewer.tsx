import { ChevronLeft, ChevronRight } from "lucide-react";
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
        className="max-w-4xl w-[95vw] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{reflection.title}</DialogTitle>
        </DialogHeader>

        {/* Scrollable container for entire content */}
        <ScrollArea className="flex-1 h-full">
          <div className="flex flex-col">
            {/* Image Section with gradient overlay for visual appeal */}
            <div className="relative bg-gradient-to-br from-primary/5 via-sage/10 to-accent/5">
              <div className="relative">
                <img
                  src={imageSrc}
                  alt={reflection.title}
                  className="w-full max-h-[45vh] object-contain"
                />
                {/* Decorative gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Navigation Buttons - floating style */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  className="h-14 w-14 rounded-full bg-card/90 hover:bg-card shadow-elevated ml-3 disabled:opacity-30 backdrop-blur-sm border border-border/50"
                  aria-label="Previous reflection"
                >
                  <ChevronLeft className="h-7 w-7 text-primary" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNext}
                  disabled={!hasNext}
                  className="h-14 w-14 rounded-full bg-card/90 hover:bg-card shadow-elevated mr-3 disabled:opacity-30 backdrop-blur-sm border border-border/50"
                  aria-label="Next reflection"
                >
                  <ChevronRight className="h-7 w-7 text-primary" />
                </Button>
              </div>
            </div>

            {/* Content Section with enhanced styling */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-card to-muted/30">
              {/* Category badge with decorative elements */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent max-w-12" />
                <span className="inline-flex items-center px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-primary/15 to-sage/15 text-primary rounded-full border border-primary/20">
                  {reflection.category}
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent max-w-12" />
              </div>

              {/* Title with decorative underline */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
                {reflection.title}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-primary via-sage to-accent rounded-full mx-auto mb-6" />

              {/* Full text content with styled paragraphs */}
              <div className="prose prose-lg max-w-none">
                {reflection.fullText.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-muted-foreground leading-relaxed mb-4 last:mb-0 text-base sm:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Decorative footer element */}
              <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
                <div className="w-2 h-2 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ImageReflectionViewer;
