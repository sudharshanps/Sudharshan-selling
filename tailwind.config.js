/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: '#FFFFFF',
          softWhite: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E2E8F0',
          borderDark: '#CBD5E1',
          blue: '#155EEF',       // Royal Blue Primary
          blueHover: '#1049B8',  // Deep Royal Blue
          blueLight: '#EFF4FF',  // Soft Blue Tint
          secondaryBlue: '#2878F0',
          red: '#E53935',        // Accent Red
          redHover: '#C62828',
          redLight: '#FFF1F0',   // Light Red Tint
          charcoal: '#172033',   // Primary Dark Charcoal Text
          slate: '#475569',      // Secondary Slate Text
          muted: '#64748B',      // Muted Text
          lightBorder: '#F1F5F9'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 12px 24px -4px rgba(15, 23, 42, 0.1), 0 4px 8px -2px rgba(15, 23, 42, 0.05)',
        'blue-glow': '0 8px 25px -4px rgba(21, 94, 239, 0.25)',
        'red-glow': '0 8px 25px -4px rgba(229, 57, 53, 0.25)',
      }
    },
  },
  plugins: [],
}
