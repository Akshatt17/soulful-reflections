// Static hero-image imports so Vite fingerprints them and they resolve under the
// GitHub Pages base path. `articles.json` stores only the filename (the map key),
// mirroring the imageReflections.json -> imagePath convention.
import emotionsUnleashed from "@/assets/articles/emotions-unleashed.jpeg";
import redefiningLove from "@/assets/articles/redefining-love.jpeg";
import whenTheHealerNeedsHealing from "@/assets/articles/when-the-healer-needs-healing.jpeg";
import rowingThroughExpectations from "@/assets/articles/rowing-through-expectations.jpeg";
import theCage from "@/assets/articles/the-cage.jpeg";
import drNiharika from "@/assets/dr-niharika-bhaskar.jpg";

const articleImageMap: Record<string, string> = {
  "emotions-unleashed.jpeg": emotionsUnleashed,
  "redefining-love.jpeg": redefiningLove,
  "when-the-healer-needs-healing.jpeg": whenTheHealerNeedsHealing,
  "rowing-through-expectations.jpeg": rowingThroughExpectations,
  "the-cage.jpeg": theCage,
};

const authorAvatarMap: Record<string, string> = {
  "dr-niharika-bhaskar.jpg": drNiharika,
};

/** Resolve a hero-image filename from articles.json to a bundled asset URL. */
export const resolveArticleImage = (filename: string): string =>
  articleImageMap[filename] ?? "";

/** Resolve an author-avatar filename from articles.json to a bundled asset URL. */
export const resolveAuthorAvatar = (filename: string): string =>
  authorAvatarMap[filename] ?? "";
