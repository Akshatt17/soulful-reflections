export interface ImageReflection {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullText: string;
  imagePath: string;
  category: string;
  publishedDate: string;
}

export interface ImageReflectionsData {
  imageReflections: ImageReflection[];
}
