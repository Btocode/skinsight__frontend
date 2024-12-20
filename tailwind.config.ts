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
        padding: {
          DEFAULT: "1rem",
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
