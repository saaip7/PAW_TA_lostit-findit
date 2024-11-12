import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lightBlue1: "#DEE7F9",
        lightBlue2: "#CFDDFB",
        darkBlue1: "#1457D2",
        black: "#0E0E0E",
        gray: "#99A2A5",
        darkGray: "#667479",
        whiteBg: '#fcfcfc'
      },
    },
  },
  plugins: [],
};
export default config;
