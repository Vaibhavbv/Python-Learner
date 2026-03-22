import { useState } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import Hero from './components/Hero'
import ProgressBar from './components/ProgressBar'
import FilterBar from './components/FilterBar'
import SectionBlock from './components/SectionBlock'
import CommandPalette from './components/CommandPalette'
import ThemeToggle from './components/ThemeToggle'
import { ALL_SECTIONS } from './data'
import { useHotkeys } from 'react-hotkeys-hook'
import { motion } from 'framer-motion'

function AppContent() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [expandedTopic, setExpandedTopic] = useState(null)

  useHotkeys('meta+k, ctrl+k, /', (e) => {
    e.preventDefault()
    setSearchOpen(true)
  })
  useHotkeys('escape', () => {
    if (searchOpen) {
      setSearchOpen(false)
    } else if (expandedTopic) {
      setExpandedTopic(null)
    }
  })

  const handleExpand = (topicId) => {
    setExpandedTopic(prev => prev === topicId ? null : topicId)
  }

  return (
    <div className="min-h-screen">
      <ThemeToggle />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <ProgressBar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
        >
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchFocus={() => setSearchOpen(true)}
          />
        </motion.div>

        <div id="sections-start">
          {ALL_SECTIONS.map((section, idx) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + idx * 0.06, duration: 0.4 }}
            >
              <SectionBlock
                section={section}
                activeFilter={activeFilter}
                searchQuery={searchQuery}
                expandedTopic={expandedTopic}
                onExpandTopic={handleExpand}
                defaultOpen={idx < 3}
              />
            </motion.div>
          ))}
        </div>

        <footer className="text-center py-12 mt-10" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            Built for Vaibhav · Python Mastery Roadmap 🐍
          </p>
          <ResetButton />
        </footer>
      </div>

      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTopic={(topicId) => {
          setSearchOpen(false)
          setExpandedTopic(topicId)
        }}
      />
    </div>
  )
}

function ResetButton() {
  const { useProgress: _ } = {}
  return <ResetButtonInner />
}

function ResetButtonInner() {
  const [confirming, setConfirming] = useState(false)

  const handleReset = () => {
    if (confirming) {
      localStorage.removeItem('py_roadmap_v2')
      window.location.reload()
    } else {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
    }
  }

  return (
    <button
      onClick={handleReset}
      className="mt-4 font-mono text-xs px-5 py-2 rounded-md transition-all duration-200 cursor-pointer"
      style={{
        background: 'transparent',
        border: `1px solid ${confirming ? 'var(--must)' : 'var(--border)'}`,
        color: confirming ? 'var(--must)' : 'var(--text-muted)',
      }}
    >
      {confirming ? 'Click again to confirm reset' : 'Reset All Progress'}
    </button>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ThemeProvider>
  )
}
