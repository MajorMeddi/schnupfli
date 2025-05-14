import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./index.html", 
    "./client/index.html",
    "./client/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Custom nature color palette
        sage: {
          light: "#CAD2C5", // Light Sage
          medium: "#84A98C", // Medium Sage
          dark: "#52796F",   // Dark Sage
          forest: "#354F52", // Forest Green
          deep: "#2F3E46",   // Deep Forest
        },
        
        primary: {
          DEFAULT: "#84A98C", // Medium Sage
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#52796F", // Dark Sage
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#CAD2C5", // Light Sage
          foreground: "#2F3E46", // Deep Forest
        },
        accent: {
          DEFAULT: "#354F52", // Forest Green
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2F3E46", // Deep Forest
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2F3E46", // Deep Forest
        },
        chart: { // Added chart colors referencing CSS variables
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: { // Added sidebar colors referencing CSS variables
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)", // Consider using fixed rem values or simpler fractions of --radius
        sm: "calc(var(--radius) - 4px)", // e.g., md: '0.5rem', sm: '0.25rem' if --radius is 0.75rem
      },
      fontFamily: { // Added modern font stack
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Added custom animations from your CSS
        "fade-in": { // Renamed to avoid conflict with potential future Tailwind defaults
          "from": { opacity: "0", transform: "translateY(5px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": { // Renamed
          "from": { transform: "translateY(25px)", opacity: "0" },
          "to": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-scale": { // Renamed
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Added custom animations from your CSS
        "fade-in": "fade-in 0.5s ease-in-out forwards",
        "slide-up": "slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
        "pulse-scale": "pulse-scale 2s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
