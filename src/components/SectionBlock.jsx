import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProgress } from '../hooks/useProgress'
import TopicCard from './TopicCard'
import ContentPanel from './ContentPanel'

const IMP_LABELS = { must: 'must know', high: 'high', medium: 'medium', med: 'medium', low: 'good to have' }

export default function SectionBlock({ section, activeFilter, searchQuery, expandedTopic, onExpandTopic, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const { done } = useProgress()

  const sectionDone = section.topics.filter(t => done.has(t.id)).length
  const normalizeImp = (imp) => imp === 'med' ? 'medium' : imp

  const filteredTopics = useMemo(() => {
    return section.topics.filter(t => {
      const impMatch = activeFilter === 'all' || normalizeImp(t.imp) === activeFilter
      const query = searchQuery.toLowerCase().trim()
      const searchMatch = !query ||
        t.name.toLowerCase().includes(query) ||
        t.subtopics.some(s => s.toLowerCase().includes(query))
      return impMatch && searchMatch
    })
  }, [section.topics, activeFilter, searchQuery])

  if (filteredTopics.length === 0) return null

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center gap-3 px-5 py-4 rounded-lg transition-all duration-200 cursor-pointer"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
        }}
      >
        <span className="font-mono text-sm font-bold" style={{ color: 'var(--accent)', minWidth: '28px' }}>
          {section.num}
        </span>
        <span className="font-display text-base font-bold flex-1 text-left" style={{ color: 'var(--text-primary)' }}>
          {section.title}
        </span>
        <span
          className="font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold"
          style={{
            background: `color-mix(in srgb, var(--${section.badge === 'med' ? 'med' : section.badge}) 15%, transparent)`,
            color: `var(--${section.badge === 'med' ? 'med' : section.badge})`,
          }}
        >
          {IMP_LABELS[section.badge] || section.badge}
        </span>
        <span className="font-mono text-xs min-w-[50px] text-right" style={{ color: 'var(--text-muted)' }}>
          {sectionDone}/{section.topics.length}
        </span>
        <motion.svg
          className="w-5 h-5 shrink-0"
          style={{ color: 'var(--text-muted)' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredTopics.map(topic => (
                <TopicCardWrapper
                  key={topic.id}
                  topic={topic}
                  expandedTopic={expandedTopic}
                  onExpandTopic={onExpandTopic}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TopicCardWrapper({ topic, expandedTopic, onExpandTopic }) {
  const isExpanded = expandedTopic === topic.id

  return (
    <>
      <TopicCard
        topic={topic}
        isExpanded={isExpanded}
        onExpand={() => onExpandTopic(topic.id)}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{ overflow: 'hidden' }}
          >
            <ContentPanel topic={topic} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
