import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coy: {
          pink: "#FF3D81",
          "pink-strong": "#D81E63",
          "pink-soft": "#FFE4EF",
          yellow: "#FFE45C",
          lilac: "#E7E0FF",
          mint: "#CBF4E0",
          sky: "#D7ECFF",
          peach: "#FFE1CF",
          whatsapp: "#25D366",
          ok: "#0E8F48",
          danger: "#D92D3A",
          text: "#15121D",
          muted: "#6D6979",
          "muted-on-dark": "#B9B4C6",
          soft: "#F6F4FA",
          line: "#ECE9F2",
          bg: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-bricolage)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        pop: "3px 3px 0 #15121D",
        "pop-hover": "4px 4px 0 #15121D",
        "pop-active": "1px 1px 0 #15121D",
        "pop-lg": "5px 5px 0 #15121D",
        "pop-xl": "8px 8px 0 #15121D",
        "pop-card": "6px 6px 0 #15121D",
      },
      borderRadius: {
        "coy-card": "26px",
        "coy-pill": "999px",
        "coy-btn": "999px",
      },
      borderWidth: {
        coy: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
