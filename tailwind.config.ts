import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "bg-primary": "#000957",
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
      },
    },
  },
  plugins: [],
} satisfies Config;
