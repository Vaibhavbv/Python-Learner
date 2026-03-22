import { motion } from 'framer-motion'
import { useProgress } from '../hooks/useProgress'

export default function ProgressBar() {
  const { count } = useProgress()
  const pct = (count / 60) * 100

  return (
    <div className="py-6 sticky top-0 z-30" style={{ background: 'var(--bg-base)' }}>
      <p className="font-mono text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
        overall progress
      </p>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          <span style={{ color: 'var(--accent)' }}>{count}</span> / 60
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          topics complete
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--accent), #9f5afd)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>
    </div>
  )
}
