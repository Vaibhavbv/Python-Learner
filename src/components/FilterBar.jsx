const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'must', label: 'Must Know' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Good to Have' },
]

export default function FilterBar({ activeFilter, onFilterChange, onSearchFocus }) {
  return (
    <div className="flex items-center gap-3 py-5 flex-wrap">
      <div className="flex gap-2 overflow-x-auto flex-nowrap pb-1">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className="font-mono text-xs px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0"
            style={{
              background: activeFilter === f.key ? 'var(--accent)' : 'var(--bg-surface)',
              color: activeFilter === f.key ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${activeFilter === f.key ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex-1" />
      <button
        onClick={onSearchFocus}
        className="font-mono text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 cursor-pointer"
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        🔍 Search <span className="opacity-50 text-[10px]">( / )</span>
      </button>
    </div>
  )
}
