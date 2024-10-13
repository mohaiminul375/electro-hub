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
        primary: "#081621",  // Deep Blue
        secondary: "#FFFFF", // Silver
        accent: "#EF4A23",    // Electric Blue
        background: "#F5F5F5", // Light Gray
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
