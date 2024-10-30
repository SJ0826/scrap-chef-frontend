import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        pastel: {
          pink: '#FFD1DC',
          blue: '#BFEFFF',
          yellow: '#FFFACD',
          green: '#98FB98',
          orange: '#FFD8B1',
          lightorange: '#FFE8D6',
          darkorange: '#FFA500',
        },
      },
    },
  },
  plugins: [],
};
export default config;
