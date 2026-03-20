/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        amber: "#f59e0b",
        rust: "#ef4444",
        obsidian: "#0a0a0f",
        charcoal: "#111115",
        slate: "#1a1a20",
        silver: "#e4e4e7",
        dim: "#71717a",
        muted: "#3f3f46",
        border: "#27272a",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui"],
        mono: ['"DM Mono"', "ui-monospace", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "spin-slow": "spin 2s linear infinite",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        glow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(245, 158, 11, 0.15)",
        amber:
          "0 0 0 1px rgba(245, 158, 11, 0.3), 0 0 15px rgba(245, 158, 11, 0.1)",
      },
    },
  },
  plugins: [],
};
