import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "BH-primary": "#000957",
      "white-primary": "#ffffff",
      "grey-primary": "#EFF3EA",
      "grey-secondary": "#D0DDD0",
      "grey-tertiary": "#BBC6BB",
      "red-error": "#F93827",
    },
    fontFamily: {
      "pixel-bold": "pixelify-sans-bold",
      "pixel-regular": "pixelify-sans-regular",
      "pixel-medium": "pixelify-sans-medium",
      "pixel-semibold": "pixelify-sans-semibold",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
