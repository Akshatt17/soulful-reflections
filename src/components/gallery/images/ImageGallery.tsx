import { useState, useCallback } from "react";
import ImageCard from "./ImageCard";
import ImageViewer from "./ImageViewer";
import { GalleryImage } from "@/types/galleryImage";
import galleryImagesData from "@/data/galleryImages.json";

interface ImageGalleryProps {
  /** Limit number of items shown (for homepage preview) */
  limit?: number;
  /** Grid columns: 2, 3, or 4 */
  columns?: 2 | 3 | 4;
}

const ImageGallery = ({
  limit,
  columns = 3,
}: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images: GalleryImage[] = galleryImagesData.images;
  const displayedImages = limit ? images.slice(0, limit) : images;

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

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
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  }, [selectedIndex, images.length]);

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {displayedImages.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => handleOpen(index)}
          />
        ))}
      </div>

      <ImageViewer
        image={selectedImage}
        isOpen={selectedIndex !== null}
        onClose={handleClose}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedIndex !== null && selectedIndex > 0}
        hasNext={
          selectedIndex !== null && selectedIndex < images.length - 1
        }
      />
    </>
  );
};

export default ImageGallery;
