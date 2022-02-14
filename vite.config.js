import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import windiCss from "vite-plugin-windicss";
import svgLoader from "vite-svg-loader";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), windiCss()],
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "/src"),
    },
  },
});
