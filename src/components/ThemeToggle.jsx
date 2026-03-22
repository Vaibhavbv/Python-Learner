import { useTheme } from '../hooks/useTheme'
import { motion, AnimatePresence } from 'framer-motion'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      className="fixed top-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            ☀️
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            🌙
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
