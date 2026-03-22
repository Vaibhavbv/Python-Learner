import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ALL_SECTIONS, TOPICS_MAP } from '../data'

export default function SearchModal({ isOpen, onClose, onSelectTopic }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const results = query.trim().length > 0
    ? Object.values(TOPICS_MAP).filter(t => {
        const q = query.toLowerCase()
        return t.name.toLowerCase().includes(q) ||
          t.subtopics.some(s => s.toLowerCase().includes(q))
      })
    : []

  // Group by section
  const grouped = results.reduce((acc, t) => {
    if (!acc[t.sectionId]) acc[t.sectionId] = { title: t.sectionTitle, topics: [] }
    acc[t.sectionId].topics.push(t)
    return acc
  }, {})

  const handleSelect = (topicId) => {
    onSelectTopic(topicId)
    // Scroll to the section containing this topic
    const topic = TOPICS_MAP[topicId]
    if (topic) {
      setTimeout(() => {
        document.getElementById(topic.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-full max-w-lg mx-4 rounded-xl overflow-hidden"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="p-4 flex items-center gap-3" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search topics..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-sm"
                style={{ color: 'var(--text-primary)' }}
              />
              <button
                onClick={onClose}
                className="font-mono text-[10px] px-2 py-1 rounded cursor-pointer"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[50vh] overflow-y-auto p-3">
              {query.trim() && results.length === 0 && (
                <p className="text-center font-mono text-xs py-8" style={{ color: 'var(--text-muted)' }}>
                  No topics found for "{query}"
                </p>
              )}
              {Object.entries(grouped).map(([sectionId, group]) => (
                <div key={sectionId} className="mb-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider px-2 py-1" style={{ color: 'var(--text-muted)' }}>
                    {group.title}
                  </p>
                  {group.topics.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleSelect(t.id)}
                      className="w-full text-left px-3 py-2 rounded-md transition-colors duration-150 cursor-pointer flex items-center gap-2"
                      style={{ color: 'var(--text-primary)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-surface)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span className="font-display text-sm font-bold">{t.name}</span>
                      <span
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded-full uppercase"
                        style={{ color: `var(--${t.imp})`, background: `color-mix(in srgb, var(--${t.imp}) 15%, transparent)` }}
                      >
                        {t.imp}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
              {!query.trim() && (
                <p className="text-center font-mono text-xs py-8" style={{ color: 'var(--text-muted)' }}>
                  Type to search 60 topics...
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
