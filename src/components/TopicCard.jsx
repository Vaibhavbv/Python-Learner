import { motion } from 'framer-motion'
import { useProgress } from '../hooks/useProgress'
import { useSoundEffects } from '../hooks/useSoundEffects'

const IMP_LABELS = { must: 'must know', high: 'high', medium: 'medium', med: 'medium', low: 'good to have' }

export default function TopicCard({ topic, isExpanded, onExpand }) {
  const { done, toggle } = useProgress()
  const { playPop, playSwoosh } = useSoundEffects()
  const isDone = done.has(topic.id)
  const isLocked = topic.content?.locked

  const handleCheck = (e) => {
    e.stopPropagation()
    playPop()
    toggle(topic.id)
  }

  const handleExpand = (e) => {
    e?.stopPropagation()
    if (!isExpanded) playSwoosh()
    onExpand()
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 500 }}
      onClick={handleExpand}
      className="rounded-lg p-4 cursor-pointer transition-colors duration-200"
      style={{
        background: 'var(--bg-surface)',
        border: `1px solid ${isExpanded ? 'var(--accent)' : 'var(--border)'}`,
        opacity: isDone ? 0.6 : 1,
        borderLeft: isExpanded ? `4px solid var(--${topic.imp})` : undefined,
      }}
    >
      {/* Top row: checkbox + name + badge */}
      <div className="flex items-start gap-2.5 mb-2.5">
        <button
          onClick={handleCheck}
          className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 cursor-pointer"
          style={{
            border: `2px solid ${isDone ? 'var(--green)' : 'var(--text-muted)'}`,
            background: isDone ? 'var(--green)' : 'transparent',
          }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: isDone ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 600, damping: 20 }}
            className="text-white text-xs font-bold"
          >
            ✓
          </motion.span>
        </button>

        <span
          className="font-display text-sm font-bold flex-1"
          style={{
            color: 'var(--text-primary)',
            textDecoration: isDone ? 'line-through' : 'none',
          }}
        >
          {topic.name}
        </span>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold"
            style={{
              background: `color-mix(in srgb, var(--${topic.imp}) 15%, transparent)`,
              color: `var(--${topic.imp})`,
            }}
          >
            {IMP_LABELS[topic.imp] || topic.imp}
          </span>
          {(topic.time || topic.difficulty) && (
            <div className="flex gap-1 mt-1">
              {topic.time && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                  ⏱️ {topic.time}
                </span>
              )}
              {topic.difficulty && (
                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                  🧠 {topic.difficulty}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Subtopics */}
      <ul className="mb-2.5">
        {topic.subtopics.map((sub, i) => (
          <li
            key={i}
            className="font-mono text-[11px] py-0.5 pl-3.5 relative"
            style={{ color: isDone ? 'var(--text-muted)' : 'var(--text-secondary)' }}
          >
            <span className="absolute left-0" style={{ color: 'var(--text-muted)' }}>›</span>
            {sub}
          </li>
        ))}
      </ul>

      {/* Expand button */}
      <button
        onClick={handleExpand}
        className="font-mono text-[11px] transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
        style={{ color: 'var(--accent)' }}
      >
        {isLocked ? '🔒 locked' : isExpanded ? 'collapse ↙' : 'expand ↗'}
      </button>
    </motion.div>
  )
}
