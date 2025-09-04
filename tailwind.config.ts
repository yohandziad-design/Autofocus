import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './pages/**/*.{ts,tsx,mdx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem', xl: '2rem', '2xl': '2.5rem' },
      screens: { '2xl': '1280px' }, // landing étroite pour look premium
    },
    extend: {
      colors: {
        primary: { DEFAULT: '#10b981', foreground: '#052e26' }, // vert CTA
        surface: { DEFAULT: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.10)' },
      },
      boxShadow: {
        'inner-top': 'inset 0 1px 0 rgba(255,255,255,.06)',
        'glow-emerald': '0 0 24px rgba(16,185,129,.35)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      backgroundImage: {
        // utilisé par BackgroundFX (optionnel si tu préfères les classes arbitraires)
        'radial-faded':
          'radial-gradient(600px 600px at var(--mx,50%) var(--my,50%), rgba(16,185,129,.15), transparent 60%)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [
    // Ajoute-en si besoin: require('@tailwindcss/forms'), require('@tailwindcss/typography'), etc.
  ],
};

export default config;
