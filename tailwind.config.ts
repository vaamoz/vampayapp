// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      boxShadow: {
        custom: "0 0 5px 2px var(--card-shadow)",
      },
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-disabled": "var(--text-disabled)",
        "border-color-primary": "var(--border-color-primary)",
        "border-color-secondary": "var(--border-color-secondary)",
        "divider-color": "var(--divider-color)",
        "hover-color": "var(--hover-color)",
        "error-color": "var(--error-color)",
        "success-color": "var(--success-color)",
        "icon-color": "var(--icon-color)",
        "card-border": "var(--card-border-color)",
        "card-shadow": "var(--card-shadow)",
        "hover-border-color": "var(--hover-border-color)",
        "hover-bg-color": "var(--hover-bg-color)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
