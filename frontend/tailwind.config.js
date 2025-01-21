/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        "primary-text": "rgba(var(--primary-text))",
        "secondary-text": "rgba(var(--secondary-text))",
        keywords: "rgba(var(--keywords))",
        "navbar-background": "rgba(var(--navbar-background))",
        "navbar-text": "rgba(var(--navbar-text))",
        "navbar-button-bg": "rgba(var(--navbar-button-bg))",
        "navbar-button-text": "rgba(var(--navbar-button-text))",
        "navbar-button-bg-hover": "rgba(var(--navbar-button-bg-hover))",
        "navbar-button-text-hover": "rgba(var(--navbar-button-text-hover))",
        "navbar-button-bg-active": "rgba(var(--navbar-button-bg-active))",
        "navbar-button-text-active": "rgba(var(--navbar-button-text-active))",
        "navbar-button-bg-disabled": "rgba(var(--navbar-button-bg-disabled))",
        "navbar-button-text-disabled": "rgba(var(--navbar-button-text-disabled))",
        
      }
    },
  },
  plugins: [],
}

