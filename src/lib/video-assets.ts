// Static video + poster imports so Vite fingerprints them and they resolve under
// the GitHub Pages base path. `media.json` stores only the filename (the map key),
// mirroring the article-images.ts convention. Vite treats .mp4 as a default static
// asset, so the import resolves to a URL string.
import anhedonia from "@/assets/video/anhedonia.mp4";
import maleDepression from "@/assets/video/male-depression.mp4";
import ocd from "@/assets/video/ocd.mp4";
import anhedoniaPoster from "@/assets/video/posters/anhedonia.jpg";
import maleDepressionPoster from "@/assets/video/posters/male-depression.jpg";
import ocdPoster from "@/assets/video/posters/ocd.jpg";

const videoFileMap: Record<string, string> = {
  "anhedonia.mp4": anhedonia,
  "male-depression.mp4": maleDepression,
  "ocd.mp4": ocd,
};

const videoPosterMap: Record<string, string> = {
  "anhedonia.jpg": anhedoniaPoster,
  "male-depression.jpg": maleDepressionPoster,
  "ocd.jpg": ocdPoster,
};

/** Resolve a video filename from media.json to a bundled asset URL. */
export const resolveVideoFile = (filename: string): string =>
  videoFileMap[filename] ?? "";

/** Resolve a poster-image filename from media.json to a bundled asset URL. */
export const resolveVideoPoster = (filename: string): string =>
  videoPosterMap[filename] ?? "";
