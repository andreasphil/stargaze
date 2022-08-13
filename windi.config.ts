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
      high: "var(--shadow-elevation-high)",
      medium: "var(--shadow-elevation-medium)",
      low: "var(--shadow-elevation-low)",
    },
  },
  plugins: [lineClamp],
});
