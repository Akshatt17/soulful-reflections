/** Helpers for embedding YouTube videos by id (no self-hosted files). */

/** 16:9 thumbnail that always exists for a public video. */
export const youtubeThumb = (id: string): string =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

/** Privacy-enhanced embed URL (no cookies until play, no related-video spam). */
export const youtubeEmbedUrl = (id: string): string =>
  `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
