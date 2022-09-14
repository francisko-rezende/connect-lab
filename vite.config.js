import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/index.js"),
      "@hooks": path.resolve(__dirname, "./src/hooks/index.js"),
      "@pages": path.resolve(__dirname, "./src/pages/index.js"),
      "@assets": path.resolve(__dirname, "./src/assets/*"),
      "@service": path.resolve(__dirname, "./src/service/index.js"),
    },
  },
});
