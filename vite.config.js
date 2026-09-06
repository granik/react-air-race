import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config
export default defineConfig({
  root: "demo",
  publicDir: false,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist"),
    emptyOutDir: true,
    lib: {
      // Путь к вашему главному компоненту
      entry: path.resolve(__dirname, "./src/components/MapExplorer.jsx"),
      // Имя глобальной переменной (нужно для UMD-сборки)
      name: "MapExplorer",
      formats: ["es", "cjs"],
      // output filenames
      fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
      cssFileName: "style",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
