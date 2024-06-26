module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
  theme: {
    extend: {
      rotate: {
        '19': '19deg',
      }
    }
  }
};
