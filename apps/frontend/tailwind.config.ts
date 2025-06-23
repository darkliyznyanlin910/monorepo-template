import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@repo/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  darkMode: "class",
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/*.{ts,tsx}",
    "index.html",
  ],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        // Geist: ["Geist", "sans-serif"],
        helvetica: [
          '"Helvetica Neue Custom"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },

      colors: {
        primary: {
          DEFAULT: "#000000", // Primary text color (black)
        },
        secondary: {
          DEFAULT: "#E60100", // Secondary text color (red)
        },
        background: {
          DEFAULT: "#FFFFFF", // Primary background (white)
          accent: "#F9F9F7", // Secondary/accent background
        },
        // Supporting neutral colors
        neutral: {
          50: "#F9F9F7",
          100: "#E6E6E6",
          200: "#CCCCCC",
          300: "#B3B3B3",
          400: "#999999",
          500: "#808080",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#1A1A1A",
        },
        // Preserve existing sidebar colors
        sidebar: "hsl(var(--sidebar))",
        "sidebar-foreground": "hsl(var(--sidebar-foreground))",
        "sidebar-border": "hsl(var(--sidebar-border))",
        "sidebar-accent": "hsl(var(--sidebar-accent))",
        "sidebar-accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        "sidebar-ring": "hsl(var(--sidebar-ring))",
      },
    },
  },
} satisfies Config;
