import vue from "@vitejs/plugin-vue"
import path from "path"
import { defineConfig } from "vite"
import svgLoader from "vite-svg-loader"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      "/@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    proxy: {
      "^/api/.*": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
