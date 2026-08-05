import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: Number(process.env.PORT) || 8080,
  },
  plugins: [react()],
  // Project-site path on GitHub Pages; must match the repo name.
  // On a custom domain this becomes "/" — see "Deployment" in README.md.
  base: mode === "production" ? "/the-velvet-mind/" : "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
