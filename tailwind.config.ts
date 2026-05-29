import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 38px rgba(20, 184, 166, 0.16)",
        "violet-glow": "0 0 38px rgba(168, 85, 247, 0.13)"
      },
      backgroundImage: {
        "grain":
          "radial-gradient(circle at 20% 20%, rgba(20,184,166,0.12), transparent 28%), radial-gradient(circle at 82% 12%, rgba(244,114,182,0.1), transparent 24%), radial-gradient(circle at 55% 90%, rgba(56,189,248,0.1), transparent 30%)"
      }
    }
  },
  plugins: []
};

export default config;
