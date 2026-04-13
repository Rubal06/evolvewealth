import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        cobalt: "var(--cobalt)",
        "cobalt-dim": "var(--cobalt-dim)",
        mint: "var(--mint)",
        amber: "var(--amber)",
        danger: "var(--danger)",
        obsidian: "var(--obsidian)",
        "obsidian-2": "var(--obsidian-2)",
        "obsidian-3": "var(--obsidian-3)"
      },
      boxShadow: {
        card: "0 20px 60px rgba(0,0,0,0.4)",
        glow: "0 0 30px rgba(27,111,255,0.4)"
      },
      borderRadius: {
        card: "20px"
      },
      transitionTimingFunction: {
        luxe: "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: []
};

export default config;
