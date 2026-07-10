export interface GalleryImage {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullText: string;
  imagePath: string;
  category: string;
  publishedDate: string;
}

export interface GalleryImagesData {
  images: GalleryImage[];
}
