import { defineConfig } from "vite-plugin-windicss";
import lineClamp from "windicss/plugin/line-clamp";

export default defineConfig({
  preflight: false,
  corePlugins: {
    container: false,
  },
  theme: {
    screens: { normal: "800px" },
    boxShadow: {
      high: "var(--high-shadow-elevation)",
      medium: "var(--medium-shadow-elevation)",
      low: "var(--low-shadow-elevation)",
    },
  },
  plugins: [lineClamp],
});
