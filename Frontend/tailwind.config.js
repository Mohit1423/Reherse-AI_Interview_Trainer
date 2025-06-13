/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tw-animate-css")
  ],
  daisyui: {
    themes: [{
      mytheme: {
        primary: "oklch(var(--primary))",
        "primary-content": "oklch(var(--primary-foreground))",
        secondary: "oklch(var(--secondary))",
        accent: "oklch(var(--accent))",
        neutral: "oklch(var(--muted))",
      },
    }],
  }
}