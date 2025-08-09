import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows "describe", "it" without importing
    environment: "jsdom", // browser-like environment for DOM tests
    setupFiles: "./src/setupTests.js", // runs before each test
  },
});
