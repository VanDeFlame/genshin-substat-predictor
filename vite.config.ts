/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/genshin-substat-predictor/",
  plugins: [react()],
  test: { globals: true, setupFiles: ["@vitest/web-worker"] },
});
