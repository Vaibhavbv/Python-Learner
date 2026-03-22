/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: 'var(--accent)',
        must: 'var(--must)',
        high: 'var(--high)',
        med: 'var(--med)',
        low: 'var(--low)',
        green: 'var(--green)',
        'bg-base': 'var(--bg-base)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      borderColor: {
        DEFAULT: 'var(--border)',
        hover: 'var(--border-hover)',
      },
    },
  },
  plugins: [],
}
