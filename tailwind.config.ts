import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        accent: {
          DEFAULT: "#0066FF",
          hover: "#0052CC",
          light: "#E6F0FF",
          muted: "#0066FF1a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
