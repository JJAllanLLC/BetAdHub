import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        betting: {
          green: "#00ff88",
          dark: "#0a0a0a",
          darker: "#050505",
          red: "#ff4444",
          gold: "#ffd700",
        },
      },
    },
  },
  plugins: [],
};
export default config;

