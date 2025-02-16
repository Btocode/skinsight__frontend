import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1210px",
          xl: "1210px",
          "2xl": "1210px",
        },
        padding: {
          DEFAULT: "1rem",
          sm: "4rem",
        },
      },
      colors: {
        primary: "var(--primary)",
        accent: "var(--accent)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        ["dm-sans"]: ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
