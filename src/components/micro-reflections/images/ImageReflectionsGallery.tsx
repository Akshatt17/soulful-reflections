import { useState, useCallback } from "react";
import ImageReflectionCard from "./ImageReflectionCard";
import ImageReflectionViewer from "./ImageReflectionViewer";
import { ImageReflection } from "@/types/imageReflection";
import imageReflectionsData from "@/data/imageReflections.json";

interface ImageReflectionsGalleryProps {
  /** Limit number of items shown (for homepage preview) */
  limit?: number;
  /** Grid columns: 2, 3, or 4 */
  columns?: 2 | 3 | 4;
}

const ImageReflectionsGallery = ({
  limit,
  columns = 3,
}: ImageReflectionsGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const reflections: ImageReflection[] = imageReflectionsData.imageReflections;
  const displayedReflections = limit ? reflections.slice(0, limit) : reflections;

  const selectedReflection =
    selectedIndex !== null ? reflections[selectedIndex] : null;

  const handleOpen = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrevious = useCallback(() => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null && selectedIndex < reflections.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, reflections.length]);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {displayedReflections.map((reflection, index) => (
          <ImageReflectionCard
            key={reflection.id}
            reflection={reflection}
            onClick={() => handleOpen(index)}
          />
        ))}
      </div>

      <ImageReflectionViewer
        reflection={selectedReflection}
        isOpen={selectedIndex !== null}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
        hasNext={
          selectedIndex !== null && selectedIndex < reflections.length - 1
        }
      />
    </>
  );
};

export default ImageReflectionsGallery;
