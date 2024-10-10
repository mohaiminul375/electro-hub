import { nextui } from '@nextui-org/react';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003366",  // Deep Blue
        secondary: "#C0C0C0", // Silver
        accent: "#00AFFF",    // Electric Blue
        background: "#F7F7F7", // Light Gray
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
