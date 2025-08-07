/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'quantum-pulse': 'quantumPulse 2s infinite',
        'neural-scan': 'neuralScan 2s infinite linear',
        'data-stream': 'dataStream 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        quantumPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.7)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 0 20px rgba(6, 182, 212, 0)',
            transform: 'scale(1.05)',
          },
        },
        neuralScan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        dataStream: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(-100%)', opacity: '0' },
        },
      },
      fontFamily: {
        'quantum': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.text-quantum': {
          background: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)',
          backgroundSize: '300% 300%',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          animation: 'gradient-shift 3s ease infinite',
        },
        '.glass-morphism': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.cyber-grid': {
          backgroundImage: 
            'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        },
        '.neural-bg': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.neural-bg::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 20% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          animation: 'neural-drift 20s ease-in-out infinite',
        },
      });
    },
  ],
};
